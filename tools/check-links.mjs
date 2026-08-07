#!/usr/bin/env node
/* ALTER — on-demand link checker.
 *
 * HEAD-requests every product `url` and hotlinked `img` in data.js (WARDROBE_DATA + SHOP),
 * follows redirects, and flags anything that isn't reachable. Owned items don't lose their
 * ownership when a link dies — this just tells you which reference links have gone stale
 * (so the "View" button can be greyed) and which hotlinked images still need localizing.
 *
 * RUN LOCALLY (needs open network egress — will NOT work inside the Cowork sandbox, whose
 * proxy blocks arbitrary domains):
 *
 *     node tools/check-links.mjs                # check everything
 *     node tools/check-links.mjs --only=img     # just the hotlinked images
 *     node tools/check-links.mjs --only=url     # just the product pages
 *     node tools/check-links.mjs --concurrency=6 --timeout=12000
 *     node tools/check-links.mjs --json         # machine-readable dump to stdout too
 *
 * Writes tools/link-report.json (full detail) + tools/link-report.md (readable summary).
 * Requires Node 18+ (global fetch). No dependencies.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, "..");

// ---- args ---------------------------------------------------------------
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true];
  })
);
const ONLY = args.only || "all";               // all | url | img
const CONCURRENCY = Math.max(1, parseInt(args.concurrency || "8", 10));
const TIMEOUT = Math.max(1000, parseInt(args.timeout || "10000", 10));
const EMIT_JSON = !!args.json;

// ---- load the data arrays out of data.js via a sandboxed vm -------------
// data.js declares top-level `const WARDROBE_DATA = [...]` etc. and defines functions that
// reference browser globals — but those bodies never execute at load, so stub globals + a
// capture line are all we need. (const is script-scoped, so we append an explicit capture.)
function loadData() {
  const src = readFileSync(join(REPO, "data.js"), "utf8");
  const captured = {};
  const sandbox = {
    __OUT: captured,
    console: { log() {}, warn() {}, error() {} },
    document: {}, window: {}, navigator: {}, location: {},
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    setTimeout() {}, clearTimeout() {}, fetch: () => Promise.reject(new Error("no net at load")),
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  const capture = `
    ;try { __OUT.WARDROBE_DATA = typeof WARDROBE_DATA !== "undefined" ? WARDROBE_DATA : null; } catch(e) {}
    ;try { __OUT.SHOP = typeof SHOP !== "undefined" ? SHOP : null; } catch(e) {}
  `;
  try {
    new vm.Script(src + capture, { filename: "data.js" }).runInContext(sandbox, { timeout: 5000 });
  } catch (e) {
    console.error("Could not evaluate data.js:", e.message);
    process.exit(1);
  }
  return {
    wardrobe: Array.isArray(captured.WARDROBE_DATA) ? captured.WARDROBE_DATA : [],
    shop: Array.isArray(captured.SHOP) ? captured.SHOP : [],
  };
}

const isHttp = (s) => typeof s === "string" && /^https?:\/\//i.test(s);

// Flatten every image reference an item might carry now or later.
function itemImages(it) {
  const imgs = [];
  if (it.img) imgs.push(it.img);
  if (Array.isArray(it.images)) imgs.push(...it.images);
  return imgs;
}

// ---- collect the targets ------------------------------------------------
function collectTargets({ wardrobe, shop }) {
  const items = [
    ...wardrobe.map((it) => ({ ...it, _source: "wardrobe" })),
    ...shop.map((it) => ({ ...it, _source: "shop" })),
  ];
  // unique URL -> { url, kind, items:[{id,name,brand,source}] }
  const targets = new Map();
  const localImages = []; // already localized (filename, not http) — reported, not fetched

  for (const it of items) {
    const ref = { id: it.id, name: it.name, brand: it.brand, source: it._source };
    if (ONLY !== "img" && isHttp(it.url)) {
      addTarget(targets, it.url, "url", ref);
    }
    if (ONLY !== "url") {
      for (const img of itemImages(it)) {
        if (isHttp(img)) addTarget(targets, img, "img", ref);
        else if (img) localImages.push({ ...ref, img });
      }
    }
  }
  return { targets, localImages, itemCount: items.length };
}

function addTarget(map, url, kind, ref) {
  if (!map.has(url)) map.set(url, { url, kind, items: [] });
  map.get(url).items.push(ref);
}

// ---- fetch with timeout + HEAD→GET fallback -----------------------------
async function probe(url) {
  const attempt = async (method) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
    try {
      const r = await fetch(url, {
        method,
        redirect: "follow",
        signal: ctrl.signal,
        headers: { "user-agent": "Mozilla/5.0 (compatible; AlterLinkCheck/1.0)" },
      });
      return { status: r.status, finalUrl: r.url, ok: r.ok };
    } finally {
      clearTimeout(timer);
    }
  };
  try {
    let res = await attempt("HEAD");
    // Some servers reject/΄405 HEAD — retry once with GET before trusting the failure.
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      try { res = await attempt("GET"); } catch { /* keep HEAD result */ }
    }
    const redirected = res.finalUrl && res.finalUrl.replace(/\/$/, "") !== url.replace(/\/$/, "");
    let state = "ok";
    if (res.status >= 400) state = "dead";
    else if (res.status >= 300) state = "redirect";
    return { state, status: res.status, finalUrl: res.finalUrl, redirected };
  } catch (e) {
    const reason = e.name === "AbortError" ? "timeout" : (e.cause && (e.cause.code || e.cause.message)) || e.message;
    return { state: "unreachable", status: 0, reason: String(reason) };
  }
}

async function runPool(targets, onDone) {
  const list = [...targets.values()];
  let i = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (i < list.length) {
      const t = list[i++];
      const result = await probe(t.url);
      Object.assign(t, result);
      onDone(t, i, list.length);
    }
  });
  await Promise.all(workers);
  return list;
}

// ---- reporting ----------------------------------------------------------
function buildReport(list, localImages, meta) {
  const by = (state) => list.filter((t) => t.state === state);
  const dead = [...by("dead"), ...by("unreachable")].sort((a, b) => a.kind.localeCompare(b.kind));
  const redirects = by("redirect");
  const httpImgs = list.filter((t) => t.kind === "img");
  const summary = {
    generatedAt: new Date().toISOString(),
    scope: ONLY,
    items: meta.itemCount,
    checked: list.length,
    ok: by("ok").length,
    redirect: redirects.length,
    dead: by("dead").length,
    unreachable: by("unreachable").length,
    hotlinkedImages: httpImgs.length,
    localImages: localImages.length,
  };
  return { summary, list, dead, redirects, httpImgs, localImages };
}

function toMarkdown(rep) {
  const { summary: s, dead, redirects, httpImgs, localImages } = rep;
  const L = [];
  L.push(`# Link report`);
  L.push(``);
  L.push(`_${s.generatedAt} · scope: ${s.scope}_`);
  L.push(``);
  L.push(`| | count |`);
  L.push(`|---|---:|`);
  L.push(`| Items scanned | ${s.items} |`);
  L.push(`| URLs checked | ${s.checked} |`);
  L.push(`| ✅ OK | ${s.ok} |`);
  L.push(`| ↪️ Redirect | ${s.redirect} |`);
  L.push(`| ❌ Dead (4xx/5xx) | ${s.dead} |`);
  L.push(`| ⛔ Unreachable | ${s.unreachable} |`);
  L.push(`| 🖼️ Hotlinked images (need localizing) | ${s.hotlinkedImages} |`);
  L.push(`| 📁 Already-local images | ${s.localImages} |`);
  L.push(``);

  const itemList = (t) => t.items.map((i) => `${i.name} (${i.brand}, ${i.id}, ${i.source})`).join("; ");

  if (dead.length) {
    L.push(`## ❌ Dead / unreachable — needs attention`);
    L.push(``);
    for (const t of dead) {
      L.push(`- **[${t.kind}] ${t.status || t.state}${t.reason ? " · " + t.reason : ""}** — ${t.url}`);
      L.push(`  - used by: ${itemList(t)}`);
    }
    L.push(``);
  } else {
    L.push(`## ❌ Dead / unreachable\n\nNone. 🎉\n`);
  }

  if (redirects.length) {
    L.push(`## ↪️ Redirects (still resolve, but the stored URL moved)`);
    L.push(``);
    for (const t of redirects) {
      L.push(`- ${t.url} → ${t.finalUrl} — ${itemList(t)}`);
    }
    L.push(``);
  }

  if (httpImgs.length) {
    L.push(`## 🖼️ Hotlinked images still to localize (${httpImgs.length})`);
    L.push(``);
    L.push(`These \`img\` values point at remote CDNs and will break when the listing rotates.`);
    L.push(``);
    for (const t of httpImgs) {
      L.push(`- [${t.state}${t.status ? " " + t.status : ""}] ${t.url} — ${itemList(t)}`);
    }
    L.push(``);
  }

  if (localImages.length) {
    L.push(`## 📁 Already local (safe) — ${localImages.length}`);
    L.push(``);
    for (const i of localImages) L.push(`- ${i.img} — ${i.name} (${i.brand}, ${i.id})`);
    L.push(``);
  }
  return L.join("\n");
}

// ---- main ---------------------------------------------------------------
const NET = !(args["dry-run"] || args.dryRun); // --dry-run skips fetching (verify plumbing without egress)
const data = loadData();
const { targets, localImages, itemCount } = collectTargets(data);

console.log(
  `Loaded ${data.wardrobe.length} wardrobe + ${data.shop.length} shop items → ` +
  `${targets.size} unique link${targets.size === 1 ? "" : "s"} to check ` +
  `(${localImages.length} already local).`
);

let list;
if (NET && targets.size) {
  process.stdout.write("Checking");
  list = await runPool(targets, (_t, done, total) => {
    if (done % 5 === 0 || done === total) process.stdout.write(` ${done}/${total}`);
  });
  process.stdout.write("\n");
} else {
  // dry-run / nothing to check: mark every target "skipped" so the report still renders.
  list = [...targets.values()].map((t) => ({ ...t, state: NET ? "ok" : "skipped", status: 0 }));
  if (!NET) console.log("(--dry-run: no network calls made)");
}

const rep = buildReport(list, localImages, { itemCount });
writeFileSync(join(__dirname, "link-report.json"), JSON.stringify(rep, null, 2));
writeFileSync(join(__dirname, "link-report.md"), toMarkdown(rep));

console.log(
  `\nDone. ok:${rep.summary.ok}  redirect:${rep.summary.redirect}  ` +
  `dead:${rep.summary.dead}  unreachable:${rep.summary.unreachable}  ` +
  `hotlinked-img:${rep.summary.hotlinkedImages}\n` +
  `Report → tools/link-report.md (+ .json)`
);
if (EMIT_JSON) console.log(JSON.stringify(rep.summary, null, 2));
