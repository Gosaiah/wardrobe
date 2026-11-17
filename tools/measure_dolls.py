#!/usr/bin/env python3
"""Measure each doll render (dolls/<id>.png) and write dolls/meta.json.

Per item: opaque bounding box, garment centre, shoulder / waist widths, and an
automatic nudge (dx, dy in canvas px) that snaps it to the body landmarks used
in doll_prompts.md. dolls.html reads this to normalise and fit layers.

Run after adding or replacing renders:  python3 tools/measure_dolls.py
"""
import json, os, re, sys
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOLLS = os.path.join(ROOT, "dolls")
CANVAS_W, CANVAS_H = 1024, 1536
WAIST_Y, SOLE_Y, MID_X = 630, 1490, 512
SHOULDER_ROW, WAIST_ROW = 335, 660      # rows where widths are sampled
ALPHA_MIN = 40

def item_types():
    """Map id -> (type, high_waist) by reading WARDROBE_DATA in data.js."""
    src = open(os.path.join(ROOT, "data.js"), encoding="utf-8").read()
    out = {}
    for m in re.finditer(r'\{id:"([^"]+)"[^\n]*?type:"([^"]+)"([^\n]*)', src):
        out[m.group(1)] = (m.group(2), "high-waist" in m.group(3))
    return out

def width_at(mask, y):
    y = max(0, min(mask.shape[0] - 1, y))
    xs = np.where(mask[y])[0]
    return int(xs[-1] - xs[0] + 1) if len(xs) else 0

def main():
    types = item_types()
    meta = {}
    for f in sorted(os.listdir(DOLLS)):
        if not f.endswith(".png"):
            continue
        iid = f[:-4]
        im = Image.open(os.path.join(DOLLS, f)).convert("RGBA")
        if im.size != (CANVAS_W, CANVAS_H):
            im = im.resize((CANVAS_W, CANVAS_H), Image.LANCZOS)
        mask = np.array(im)[:, :, 3] > ALPHA_MIN
        rows, cols = np.where(mask.any(1))[0], np.where(mask.any(0))[0]
        if not len(rows):
            continue
        x0, x1, y0, y1 = int(cols[0]), int(cols[-1]), int(rows[0]), int(rows[-1])
        ys, xs = np.nonzero(mask)
        cx = float(xs.mean())
        typ, high = types.get(iid, ("top", False))

        dx = MID_X - cx
        dy = 0.0
        if typ == "shoes":
            dy = SOLE_Y - y1
        elif typ == "bottom" and not high:
            dy = WAIST_Y - y0
        meta[iid] = {
            "type": typ,
            "bbox": [x0, y0, x1, y1],
            "cx": round(cx, 1),
            "shoulderW": width_at(mask, SHOULDER_ROW) if typ in ("top", "outer") else 0,
            "waistW": width_at(mask, max(y0 + 40, WAIST_ROW)) if typ == "bottom" else 0,
            "auto": {"dx": round(dx, 1), "dy": round(dy, 1)},
        }
    path = os.path.join(DOLLS, "meta.json")
    json.dump(meta, open(path, "w"), indent=1)
    # Also as a script so dolls.html works when opened straight from disk (file://, no fetch)
    with open(os.path.join(DOLLS, "meta.js"), "w") as fh:
        fh.write("window.DOLL_META = " + json.dumps(meta) + ";\n")
    print("wrote", path, "+ meta.js for", len(meta), "items")
    for k, v in meta.items():
        print(f"  {k:4} {v['type']:6} bbox={v['bbox']} shoulderW={v['shoulderW']} waistW={v['waistW']} auto={v['auto']}")

if __name__ == "__main__":
    sys.exit(main())
