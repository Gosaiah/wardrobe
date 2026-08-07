#!/usr/bin/env python3
"""ALTER — localize product images (Python, zero-install).

Downloads every hotlinked product image in data.js (WARDROBE_DATA + SHOP) into a local folder
and rewrites the `img` / `images` paths to point at the local copies — so cards stop breaking
when a brand's CDN rotates or a listing is pulled.

Runs with the python3 that ships on macOS — no pip, no dependencies. NEEDS OPEN NETWORK
EGRESS, so run it locally (the Cowork sandbox proxy blocks brand domains).

    python3 tools/localize-images.py              # download + rewrite data.js (makes a .bak)
    python3 tools/localize-images.py --dry-run    # show the plan, download nothing, touch nothing
    python3 tools/localize-images.py --no-rewrite # download only, leave data.js untouched
    python3 tools/localize-images.py --force       # re-download even if the local file exists
    python3 tools/localize-images.py --dir=item-photos --timeout=20000

Naming: item-photos/{id}.{ext} for the hero image, item-photos/{id}-2.{ext}, -3 … for extras
(an item's `images:[...]` array, if present). Single-image items just get the hero.

What it will NOT do: overwrite an item whose download failed (a 404 like the Yeezy Gap image
stays hotlinked and is reported), and it won't save HTML error pages masquerading as images
(it verifies the response is really image bytes).
"""

import json
import os
import re
import shutil
import ssl
import sys
import urllib.request
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

# ---- args ----------------------------------------------------------------
args = {}
for a in sys.argv[1:]:
    m = re.match(r"^--([^=]+)(?:=(.*))?$", a)
    if m:
        args[m.group(1)] = True if m.group(2) is None else m.group(2)

DRY_RUN = bool(args.get("dry-run"))
NO_REWRITE = bool(args.get("no-rewrite"))
FORCE = bool(args.get("force"))
OUT_DIR = args.get("dir", "item-photos")
TIMEOUT = max(1.0, int(args.get("timeout", 20000)) / 1000.0)

HTTP_RE = re.compile(r"^https?://", re.I)
is_http = lambda s: isinstance(s, str) and bool(HTTP_RE.match(s))
FIELD = lambda key, text: (re.search(r'\b' + key + r':"((?:[^"\\]|\\.)*)"', text) or [None, None])[1]

# ---- data.js extraction (string/brace-aware; objects may span lines) ------
def _extract_array_body(src, name):
    m = re.search(r'\b' + re.escape(name) + r'\s*=\s*\[', src)
    if not m:
        return ""
    i = m.end() - 1
    depth, instr, esc, start = 0, False, False, m.end()
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
                objs.append(body[start:i + 1]); start = None
    return objs


def load_items(src):
    items = []
    for arr in ("WARDROBE_DATA", "SHOP"):
        for obj in _split_objects(_extract_array_body(src, arr)):
            iid = FIELD("id", obj)
            if not iid:
                continue
            images = []
            am = re.search(r'\bimages:\[([^\]]*)\]', obj)
            if am:
                images = re.findall(r'"((?:[^"\\]|\\.)*)"', am.group(1))
            items.append({"id": iid, "name": FIELD("name", obj) or iid,
                          "img": FIELD("img", obj), "images": images})
    return items


# ---- download helpers ----------------------------------------------------
CTX = ssl.create_default_context()
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
CT_EXT = {"image/jpeg": "jpg", "image/jpg": "jpg", "image/png": "png",
          "image/webp": "webp", "image/gif": "gif", "image/avif": "avif"}


def _sniff_ext(data):
    """Extension from the actual image bytes (most reliable — servers mislabel .webp etc.)."""
    if data[:3] == b"\xff\xd8\xff":
        return "jpg"
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return "png"
    if data[:4] == b"GIF8":
        return "gif"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "webp"
    if data[4:12] in (b"ftypavif", b"ftypavis"):
        return "avif"
    return None


def ext_for(url, content_type, data=b""):
    return _sniff_ext(data) or CT_EXT.get((content_type or "").split(";")[0].strip().lower()) or (
        (lambda m: ("jpg" if m.group(1).lower() == "jpeg" else m.group(1).lower()) if m else "jpg")(
            re.search(r"\.([A-Za-z0-9]{2,5})(?:[?#]|$)", url)))


def download(url, dest_noext):
    """Fetch url, verify it's really an image, save as dest_noext.<ext>. Returns (path, err)."""
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "image/*,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT, context=CTX) as r:
            ct = r.headers.get("Content-Type", "")
            data = r.read()
    except Exception as e:
        return None, f"{getattr(e, 'code', '')} {getattr(e, 'reason', e)}".strip()
    if not ct.lower().startswith("image/") and not (len(data) > 1024 and data[:3] in (b"\xff\xd8\xff", b"\x89PN", b"GIF", b"RIF")):
        return None, f"not an image (Content-Type: {ct or 'none'}, {len(data)} bytes)"
    if len(data) < 512:
        return None, f"suspiciously small ({len(data)} bytes)"
    path = dest_noext + "." + ext_for(url, ct, data)
    with open(path, "wb") as f:
        f.write(data)
    return path, None


# ---- build the plan ------------------------------------------------------
def build_plan(items):
    """List of {id, name, role, idx, url}. role: 'hero' | 'extra'."""
    plan = []
    for it in items:
        if is_http(it["img"]):
            plan.append({"id": it["id"], "name": it["name"], "role": "hero", "idx": 1, "url": it["img"]})
        for k, ex in enumerate(it["images"]):
            if is_http(ex):
                plan.append({"id": it["id"], "name": it["name"], "role": "extra", "idx": k + 2, "url": ex})
    return plan


def local_name(entry):
    stem = entry["id"] if entry["idx"] == 1 else f"{entry['id']}-{entry['idx']}"
    return stem  # extension decided at download time


# ---- main ----------------------------------------------------------------
def main():
    src_path = os.path.join(REPO, "data.js")
    src = open(src_path, encoding="utf-8").read()
    items = load_items(src)
    plan = build_plan(items)

    local_ct = sum(1 for it in items if it["img"] and not is_http(it["img"]))
    print(f"{len(items)} items · {len(plan)} remote image(s) to localize "
          f"({sum(1 for p in plan if p['role']=='hero')} hero, "
          f"{sum(1 for p in plan if p['role']=='extra')} extra) · {local_ct} already local.")

    if DRY_RUN:
        for p in plan:
            print(f"  [{p['role']}] {p['id']} ({p['name']}) <- {p['url']}")
        print("\n(--dry-run: nothing downloaded, data.js untouched)")
        return

    out_abs = os.path.join(REPO, OUT_DIR)
    os.makedirs(out_abs, exist_ok=True)

    rewrites = {}   # exact old img/url string -> new local path
    done, skipped, failed = [], [], []

    for p in plan:
        stem = local_name(p)
        existing = [f for f in os.listdir(out_abs) if f.startswith(stem + ".") or f == stem]
        if existing and not FORCE:
            rel = f"{OUT_DIR}/{existing[0]}"
            rewrites[p["url"]] = rel
            skipped.append((p, rel))
            print(f"  = {p['id']} exists ({rel}) — skip")
            continue
        path, err = download(p["url"], os.path.join(out_abs, stem))
        if err:
            failed.append((p, err))
            print(f"  ✗ {p['id']} FAILED — {err}")
            continue
        rel = f"{OUT_DIR}/{os.path.basename(path)}"
        rewrites[p["url"]] = rel
        done.append((p, rel))
        print(f"  ✓ {p['id']} -> {rel}")

    # ---- rewrite data.js -------------------------------------------------
    if not NO_REWRITE and rewrites:
        backup = src_path + ".bak"
        shutil.copyfile(src_path, backup)
        new_src = src
        for old_url, rel in rewrites.items():
            # replace the exact img:"<url>" occurrence (urls are unique per item)
            new_src = new_src.replace('img:"' + old_url + '"', 'img:"' + rel + '"')
            # also handle the url appearing inside an images:[...] array
            new_src = new_src.replace('"' + old_url + '"', '"' + rel + '"')
        if new_src != src:
            open(src_path, "w", encoding="utf-8").write(new_src)
            print(f"\nRewrote data.js ({len(rewrites)} path(s)). Backup -> {os.path.basename(backup)}")
        else:
            os.remove(backup)
            print("\nNo data.js changes were applied.")
    elif NO_REWRITE:
        print("\n(--no-rewrite: files downloaded, data.js left untouched)")

    # ---- report ----------------------------------------------------------
    report = {
        "generatedAt": datetime.now().astimezone().isoformat(),
        "downloaded": [{"id": p["id"], "role": p["role"], "path": rel, "url": p["url"]} for p, rel in done],
        "skipped": [{"id": p["id"], "path": rel} for p, rel in skipped],
        "failed": [{"id": p["id"], "name": p["name"], "url": p["url"], "error": err} for p, err in failed],
    }
    open(os.path.join(HERE, "localize-report.json"), "w").write(json.dumps(report, indent=2))

    print(f"\nDone. downloaded:{len(done)}  skipped(existing):{len(skipped)}  failed:{len(failed)}")
    if failed:
        print("Failed (left hotlinked — source a replacement):")
        for p, err in failed:
            print(f"  - {p['id']} {p['name']}: {err}")
    print("Detail -> tools/localize-report.json")
    if not NO_REWRITE and done:
        print("\nNext: reload the app and eyeball the cards; if good, commit the images + data.js.")


if __name__ == "__main__":
    main()
