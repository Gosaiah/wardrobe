# Doll Renders — Ghost-Mannequin Prompt Pack (prototype)

For the paper-doll prototype (`dolls.html`). One render per **item**, not per outfit. Every render
uses the **same invisible body on the same canvas**, so the pieces stack on top of each other in the page.

Prototype set = items from outfits **#1 All Black Structured**, **#2 Monochrome Grey**, **#4 Deconstructed Layers**.

---

## How to run

1. In your ChatGPT wardrobe project, paste the **Shared style block** once at the top of the chat.
2. Then send each item prompt below, one at a time, attaching (or linking) its reference photo.
3. Download each result as PNG and save it to `dolls/<item id>.png` (e.g. `dolls/m16.png`).
4. Transparent background is ideal. If ChatGPT gives a flat background instead, drop the PNG in anyway —
   Claude will cut it out.
5. Open `dolls.html`. Anything still lining up wrong gets nudged with **Align mode** (no re-render needed).

> Tip: if ChatGPT drifts on scale between items, re-attach your first good render (e.g. the coat) and say
> "match this exact canvas, body position and scale."

---

## Shared style block (paste once)

```
You are rendering individual garments for a layered "paper doll" outfit viewer. Every image
in this chat must follow these rules exactly so the images can be stacked on top of each other:

STYLE: realistic ghost-mannequin (invisible mannequin) product render. The garment looks worn by
an invisible body — full 3D volume, natural drape and fall, real fabric texture — but no body,
mannequin, hanger, face or skin is visible.

OPENINGS: neck openings, armholes, open fronts, slits and gaps are FULLY TRANSPARENT. Do NOT show
the inside/back of the garment through openings (other layers will show through there).

CANVAS: 1024 x 1536 portrait PNG, TRANSPARENT background. Front view, facing camera, perfectly
centered on the vertical midline. No shadow, no floor, no props, no text, no logos added.

INVISIBLE BODY (same for every image — tall, lean, athletic male, about 6'1", relaxed standing pose,
arms hanging slightly away from the sides, feet hip-width apart). Body landmarks as % of canvas height
from the top:
  top of head 4% · chin 13% · shoulder line 19% · chest 27% · natural waist 41% · hips 49%
  · crotch 52% · knees 72% · ankles 93% · soles of feet 97%
Shoulder width ≈ 34% of canvas width. Keep this body, pose and scale identical in every render.

LIGHTING: soft, even studio light from the front-left; matte. For black / near-black fabric,
use gentle highlights so seams, panels, pleats and texture stay readable — never a flat black blob.

FIDELITY: match the reference photo exactly — cut, color, length, proportion, panelling, hardware.
Render only the ONE garment requested. Do not invent styling or add other clothing.
```

---

## Item prompts

### m16 — Hexa Long Layers Sleeveless Coat (Minoar, black) · layer: outer
Ref: https://gosaiah.github.io/wardrobe/item-photos/hexa-long-layers-sleeveless-coat.jpg
```
Render ONLY the Minoar Hexa Long Layers Sleeveless Coat (black) from the reference, worn open
on the invisible body. Sleeveless; keep its long layered panels and hem length exactly as the
reference (relative to the knee/ankle landmarks). Open front and armholes fully transparent.
Save as m16.png.
```

### o12 — Jesse Top with Scarf (Orttu, black) · layer: top
Ref: https://gosaiah.github.io/wardrobe/item-photos/jesse-top-with-scarf.jpg
```
Render ONLY the Orttu Jesse Top with Scarf (black) from the reference, on the invisible body,
scarf draped as in the reference. Neck and armholes transparent. Save as o12.png.
```

### m15 — Reverse Edge Construct Jogger (Minoar, black) · layer: bottom
Ref: https://gosaiah.github.io/wardrobe/item-photos/reverse-edge-construct-jogger.jpg
```
Render ONLY the Minoar Reverse Edge Construct Jogger (black) on the invisible body, waistband at
the natural-waist landmark, hem at the ankle landmark as in the reference. Keep the construct
panel lines readable. Save as m15.png.
```

### y1 — Zipped Tall Boots (Ya|Sar, black) · layer: shoes
Ref: https://gosaiah.github.io/wardrobe/item-photos/zipped-tall-boots.jpg
```
Render ONLY the Ya|Sar Zipped Tall Boots (black), a pair, worn on the invisible body's feet —
soles at the 97% landmark, shaft height exactly as the reference relative to the knee.
Front view, feet hip-width apart. Save as y1.png.
```

### m4 — Layered Sleeveless Collar Shirt (Minoar, black) · layer: top
Ref: https://gosaiah.github.io/wardrobe/item-photos/layered-sleeveless-collar-shirt.jpg
```
Render ONLY the Minoar Layered Sleeveless Collar Shirt (black) on the invisible body, worn
untucked, length exactly as the reference. Armholes and neck opening transparent.
Save as m4.png.
```

### o3 — Roberto Pants (Orttu, grey) · layer: bottom
Ref: https://gosaiah.github.io/wardrobe/item-photos/roberto-pants.jpg
```
Render ONLY the Orttu Roberto Pants (grey) on the invisible body. High-waisted — waistband
slightly above the natural-waist landmark. Hem at the ankle landmark, drape as the reference.
Save as o3.png.
```

### o4 — Roberto Jacket (Orttu, grey) · layer: outer
Ref: https://gosaiah.github.io/wardrobe/item-photos/roberto-jacket.jpg
```
Render ONLY the Orttu Roberto Jacket (grey) worn open on the invisible body, sleeves hanging
naturally. Open front transparent so the layer beneath shows through. Save as o4.png.
```

### m7 — Elongated Trigon Shirt (Minoar, white) · layer: top
Ref: https://gosaiah.github.io/wardrobe/item-photos/elongated-trigon-shirt.jpg
```
Render ONLY the Minoar Elongated Trigon Shirt (white) on the invisible body, untucked, keeping
its elongated asymmetric trigon hem exactly as the reference. Keep white fabric slightly warm,
not blown out. Save as m7.png.
```

### m18 — Cargo Volume Transform Denim Skirt (Minoar, black) · layer: bottom
Ref: https://gosaiah.github.io/wardrobe/item-photos/cargo-volume-transform-denim-skirt.jpg
```
Render ONLY the Minoar Cargo Volume Transform Denim Skirt (black) on the invisible body,
waistband at the natural-waist landmark, keeping its full volume and length exactly as the
reference. Save as m18.png.
```
