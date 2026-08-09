#!/usr/bin/env python3
"""ALTER — sync OUTFIT_PHOTO_IDS to the outfits/ folder.

The app shows a curated board photo for an outfit only if its id is listed in
`OUTFIT_PHOTO_IDS` (data.js). That list is easy to forget when you drop in a new
`outfits/outfit_NN.jpg`. This regenerates the list straight from what's actually on
disk, so you never hand-edit it — drop the photo, run this, done.

    python3 tools/sync-outfit-photos.py            # rewrite the list + bump DATA_VERSION
    python3 tools/sync-outfit-photos.py --dry-run   # show what would change, write nothing

Zero deps, macOS python3. Scans outfits/outfit_<id>.{jpg,jpeg,png,webp}.
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
DRY = "--dry-run" in sys.argv[1:]

# ── scan the outfits/ folder for outfit_<id>.<ext> ──
outfits_dir = os.path.join(REPO, "outfits")
ids = set()
if os.path.isdir(outfits_dir):
    for f in os.listdir(outfits_dir):
        m = re.match(r"^outfit_(\d+)\.(jpg|jpeg|png|webp)$", f, re.I)
        if m:
            ids.add(int(m.group(1)))
found = sorted(ids)

data_path = os.path.join(REPO, "data.js")
src = open(data_path, encoding="utf-8").read()

# ── current list in data.js ──
m = re.search(r"const OUTFIT_PHOTO_IDS\s*=\s*\[([^\]]*)\];", src)
if not m:
    print("Could not find OUTFIT_PHOTO_IDS in data.js"); sys.exit(1)
current = [int(x) for x in re.findall(r"\d+", m.group(1))]

added = [i for i in found if i not in current]
removed = [i for i in current if i not in found]   # listed but no file on disk

print(f"outfits/ has {len(found)} photo(s); data.js lists {len(current)}.")
if added:   print(f"  + will ADD (photo on disk, not listed): {added}")
if removed: print(f"  - will REMOVE (listed, no file on disk): {removed}")
if not added and not removed:
    print("Already in sync — nothing to do.")
    sys.exit(0)

if DRY:
    print(f"\n(--dry-run) new list would be: [{','.join(map(str, found))}]")
    sys.exit(0)

# ── rewrite the list ──
new_line = "const OUTFIT_PHOTO_IDS = [" + ",".join(map(str, found)) + "];"
src = src[:m.start()] + new_line + src[m.end():]

# ── bump DATA_VERSION so the change shows on reload ──
vm = re.search(r"const DATA_VERSION\s*=\s*(\d+);", src)
if vm:
    newv = int(vm.group(1)) + 1
    src = src[:vm.start()] + f"const DATA_VERSION = {newv};" + src[vm.end():]
    print(f"\nDATA_VERSION -> {newv}")

open(data_path, "w", encoding="utf-8").write(src)
print(f"Rewrote OUTFIT_PHOTO_IDS ({len(found)} ids). Reload the app (hard-refresh) to see it.")
