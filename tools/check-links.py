#!/usr/bin/env python3
"""ALTER — on-demand link checker (Python port, zero-install).

HEAD-requests every product `url` and hotlinked `img` in data.js (WARDROBE_DATA + SHOP),
follows redirects, and flags anything unreachable. Owned items don't lose ownership when a
link dies — this just tells you which reference links went stale (so the "View" button can be
greyed) and which hotlinked images still need localizing.

Runs with the python3 that ships on macOS — no pip, no dependencies.

    python3 tools/check-links.py                 # check everything
    python3 tools/check-links.py --only=img      # just the hotlinked images
    python3 tools/check-links.py --only=url      # just the product pages
    python3 tools/check-links.py --concurrency=6 --timeout=15000
    python3 tools/check-links.py --dry-run       # plumbing test, no network

Writes tools/link-report.json (full detail) + tools/link-report.md (readable summary).
"""

import json
import os
import re
import ssl
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

# ---- args ----------------------------------------------------------------
args = {}
for a in sys.argv[1:]:
    m = re.match(r"^--([^=]+)(?:=(.*))?$", a)
    if m:
        args[m.group(1)] = True if m.group(2) is None else m.group(2)

ONLY = args.get("only", "all")                       # all | url | img
CONCURRENCY = max(1, int(args.get("concurrency", 8)))
TIMEOUT = max(1.0, int(args.get("timeout", 10000)) / 1000.0)   # ms in, seconds out
DRY_RUN = bool(args.get("dry-run"))

HTTP_RE = re.compile(r"^https?://", re.I)


def is_http(s):
    return isinstance(s, str) and bool(HTTP_RE.match(s))


# ---- extract items from data.js ------------------------------------------
# Only WARDROBE_DATA + SHOP items carry url/img. Objects can span multiple lines (the SHOP
# items do), so we can't scan line-by-line — we pull each array's body, split it into top-level
# object literals with a string/brace-aware scanner, then regex the fields off each object.
FIELD = lambda key, text: (re.search(r'\b' + key + r':"((?:[^"\\]|\\.)*)"', text) or [None, None])[1]


def _extract_array_body(src, name):
    """Return the inner text between the `[` and matching `]` of `const NAME = [ ... ]`."""
    m = re.search(r'\b' + re.escape(name) + r'\s*=\s*\[', src)
    if not m:
        return ""
    i = m.end() - 1               # index of the opening '['
    depth, instr, esc, start = 0, False, False, i + 1
    while i < len(src):
        ch = src[i]
        if instr:
            if esc: esc = False
            elif ch == "\\": esc = True
            elif ch == '"': instr = False
        elif ch == '"':
            instr = True
        elif ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return src[start:i]
        i += 1
    return ""


def _split_objects(body):
    """Split an array body into its top-level {...} object literals (string/brace-aware)."""
    objs, depth, instr, esc, start = [], 0, False, False, None
    for i, ch in enumerate(body):
        if instr:
            if esc: esc = False
            elif ch == "\\": esc = True
            elif ch == '"': instr = False
            continue
        if ch == '"':
            instr = True
        elif ch == "{":
            if depth == 0:
                start = i
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0 and start is not None:
                objs.append(body[start:i + 1])
                start = None
    return objs


def _extract_object_body(src, name):
    """Inner text between `{` and matching `}` of `const NAME = { ... }`."""
    m = re.search(r'\b' + re.escape(name) + r'\s*=\s*\{', src)
    if not m:
        return ""
    i, depth, instr, esc, start = m.end() - 1, 0, False, False, m.end()
    while i < len(src):
        ch = src[i]
        if instr:
            if esc: esc = False
            elif ch == "\\": esc = True
            elif ch == '"': instr = False
        elif ch == '"':
            instr = True
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return src[start:i]
        i += 1
    return ""


def load_targets():
    src = open(os.path.join(REPO, "data.js"), encoding="utf-8").read()
    items = []
    for arr_name in ("WARDROBE_DATA", "SHOP"):
        for obj in _split_objects(_extract_array_body(src, arr_name)):
            item_id = FIELD("id", obj)
            if not item_id:
                continue
            images = []
            arr = re.search(r'\bimages:\[([^\]]*)\]', obj)
            if arr:
                images = re.findall(r'"((?:[^"\\]|\\.)*)"', arr.group(1))
            items.append({
                "id": item_id,
                "name": FIELD("name", obj) or item_id,
                "brand": FIELD("brand", obj) or "",
                "url": FIELD("url", obj),
                "img": FIELD("img", obj),
                "images": images,
            })
    # IMAGES { "name":"url" } map — the primary per-item image source (pieceImg reads it first).
    img_map = re.findall(r'"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"',
                         _extract_object_body(src, "IMAGES"))
    return items, [{"name": k, "url": v} for k, v in img_map]


def collect(items, images_map):
    targets = {}   # url -> {url, kind, items:[...]}
    local_images = []

    def add(url, kind, ref):
        targets.setdefault(url, {"url": url, "kind": kind, "items": []})["items"].append(ref)

    for it in items:
        ref = {"id": it["id"], "name": it["name"], "brand": it["brand"]}
        if ONLY != "img" and is_http(it["url"]):
            add(it["url"], "url", ref)
        if ONLY != "url":
            for img in ([it["img"]] if it["img"] else []) + it["images"]:
                if is_http(img):
                    add(img, "img", ref)
                elif img:
                    local_images.append({**ref, "img": img})
    if ONLY != "url":
        for e in images_map:
            ref = {"id": "IMAGES", "name": e["name"], "brand": ""}
            if is_http(e["url"]):
                add(e["url"], "img", ref)
            elif e["url"]:
                local_images.append({**ref, "img": e["url"]})
    return targets, local_images


# ---- probe ---------------------------------------------------------------
CTX = ssl.create_default_context()
UA = "Mozilla/5.0 (compatible; AlterLinkCheck/1.0)"


def _request(url, method):
    req = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=TIMEOUT, context=CTX) as r:
        return r.status, r.geturl()


def probe(url):
    try:
        try:
            status, final = _request(url, "HEAD")
        except urllib.error.HTTPError as e:
            # some servers reject HEAD — retry GET before trusting the failure
            if e.code in (403, 405, 501):
                status, final = _request(url, "GET")
            else:
                status, final = e.code, url
        redirected = final and final.rstrip("/") != url.rstrip("/")
        state = "ok"
        if status >= 400:
            state = "dead"
        elif status >= 300:
            state = "redirect"
        return {"state": state, "status": status, "finalUrl": final, "redirected": redirected}
    except urllib.error.HTTPError as e:
        return {"state": "dead", "status": e.code, "reason": e.reason}
    except Exception as e:  # URLError / timeout / SSL / DNS
        reason = getattr(e, "reason", None) or str(e)
        return {"state": "unreachable", "status": 0, "reason": str(reason)}


# ---- report --------------------------------------------------------------
def item_list(t):
    return "; ".join(f"{i['name']} ({i['brand']}, {i['id']})" for i in t["items"])


def to_markdown(rep):
    s = rep["summary"]
    L = ["# Link report", "", f"_{s['generatedAt']} · scope: {s['scope']}_", "",
         "| | count |", "|---|---:|",
         f"| Items scanned | {s['items']} |",
         f"| URLs checked | {s['checked']} |",
         f"| OK | {s['ok']} |",
         f"| Redirect | {s['redirect']} |",
         f"| Dead (4xx/5xx) | {s['dead']} |",
         f"| Unreachable | {s['unreachable']} |",
         f"| Hotlinked images (need localizing) | {s['hotlinkedImages']} |",
         f"| Already-local images | {s['localImages']} |", ""]

    dead = rep["dead"]
    if dead:
        L += ["## Dead / unreachable — needs attention", ""]
        for t in dead:
            reason = f" · {t.get('reason')}" if t.get("reason") else ""
            L.append(f"- **[{t['kind']}] {t.get('status') or t['state']}{reason}** — {t['url']}")
            L.append(f"  - used by: {item_list(t)}")
        L.append("")
    else:
        L += ["## Dead / unreachable", "", "None.", ""]

    if rep["redirects"]:
        L += ["## Redirects (still resolve, but the stored URL moved)", ""]
        for t in rep["redirects"]:
            L.append(f"- {t['url']} -> {t.get('finalUrl')} — {item_list(t)}")
        L.append("")

    if rep["httpImgs"]:
        L += [f"## Hotlinked images still to localize ({len(rep['httpImgs'])})", "",
              "These `img` values point at remote CDNs and will break when the listing rotates.", ""]
        for t in rep["httpImgs"]:
            st = f" {t.get('status')}" if t.get("status") else ""
            L.append(f"- [{t['state']}{st}] {t['url']} — {item_list(t)}")
        L.append("")

    if rep["localImages"]:
        L += [f"## Already local (safe) — {len(rep['localImages'])}", ""]
        for i in rep["localImages"]:
            L.append(f"- {i['img']} — {i['name']} ({i['brand']}, {i['id']})")
        L.append("")
    return "\n".join(L)


# ---- main ----------------------------------------------------------------
def main():
    from datetime import datetime, timezone
    items, images_map = load_targets()
    targets, local_images = collect(items, images_map)
    print(f"Loaded {len(items)} items + {len(images_map)} IMAGES entries -> {len(targets)} unique link(s) "
          f"to check ({len(local_images)} already local).")

    values = list(targets.values())
    if DRY_RUN or not values:
        for t in values:
            t.update(state="skipped", status=0)
        if DRY_RUN:
            print("(--dry-run: no network calls made)")
    else:
        done = [0]
        total = len(values)
        print("Checking", end="", flush=True)

        def work(t):
            t.update(probe(t["url"]))
            done[0] += 1
            if done[0] % 5 == 0 or done[0] == total:
                print(f" {done[0]}/{total}", end="", flush=True)

        with ThreadPoolExecutor(max_workers=CONCURRENCY) as pool:
            list(pool.map(work, values))
        print()

    by = lambda st: [t for t in values if t["state"] == st]
    dead = sorted(by("dead") + by("unreachable"), key=lambda t: t["kind"])
    http_imgs = [t for t in values if t["kind"] == "img"]
    summary = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "scope": ONLY, "items": len(items), "checked": len(values),
        "ok": len(by("ok")), "redirect": len(by("redirect")),
        "dead": len(by("dead")), "unreachable": len(by("unreachable")),
        "hotlinkedImages": len(http_imgs), "localImages": len(local_images),
    }
    rep = {"summary": summary, "list": values, "dead": dead,
           "redirects": by("redirect"), "httpImgs": http_imgs, "localImages": local_images}

    open(os.path.join(HERE, "link-report.json"), "w").write(json.dumps(rep, indent=2))
    open(os.path.join(HERE, "link-report.md"), "w").write(to_markdown(rep))

    print(f"\nDone. ok:{summary['ok']}  redirect:{summary['redirect']}  "
          f"dead:{summary['dead']}  unreachable:{summary['unreachable']}  "
          f"hotlinked-img:{summary['hotlinkedImages']}\n"
          f"Report -> tools/link-report.md (+ .json)")


if __name__ == "__main__":
    main()
