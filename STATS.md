# Wardrobe Stat Definitions

The five style stats, each on a **0–5 scale anchored at 0** (a true basic scores 0, not 2 — the whole range is used), in **0.5 increments** — half-steps are always allowed to separate similar pieces (e.g. a full hanging belt = 1, a shorter one = 0.5). Every stat is defined to be **independent** of the others so they don't double-count: a piece can be high in one and low in another.

Status: **drama** item values are fully re-anchored to this scale (data.js v72+). The other four stats keep their older values until their recalibration pass — definitions below are the agreed target.

---

## DRAMA — visual statement / attention

How much the piece commands attention as a statement: theatrical impact, boldness of silhouette, surface, or scale.
**Test:** walking into a room, how much does this piece make people look?

- Up: exaggerated volume/proportion (capes, balloon, elongated, platform, **flowing or hanging panels, draped layers**), sculptural or deconstructed construction, bold surface (sequin, fringe, sheer mesh, large print), costume-like presence.
- Down: familiar everyday form, plain surface, conventional proportion.
- Not the same as edge (attitude), structure (rigidity), or skin (revealing). A pastel sequin gown = high drama, low edge.

**Anchors**
- **0** — invisible: plain tee, basic trousers, simple chain
- **1** — one small flourish: graphic tee, knit texture, character ring
- **2** — noticeable but familiar: tailored jacket, longline shirt, standard skirt, Chelsea boot
- **3** — clear statement: deconstructed/sculptural pieces, draped/layered trousers, tunics, cuffs, sculptural boots
- **4** — bold showpiece: harness, leather crop, sequin, mesh, tall boots
- **5** — showstopper: platform boots, mask, apron skirt, fringe cloak, long sculptural robe

---

## STRUCTURE — architectural rigidity / tailoring

How built-up and shape-holding the garment is, versus soft, draped, and unstructured.

- Up: tailoring, padding, stiff fabric, sharp constructed lines, defined shoulders, boning, rigid silhouette.
- Down: soft jersey, fluid drape, unstructured knits.
- Not the same as drama: a draped sequin gown = low structure, high drama; a plain blazer = high structure, low drama.

**Anchors**
- **0** — totally soft/unstructured: jersey tee, soft chain, flowing scarf
- **1** — soft with light shape: relaxed knit, soft drawstring trousers
- **2** — moderate hold: standard shirt, casual jacket, denim
- **3** — clearly constructed: tailored trousers, structured jacket, sculptural avant pieces
- **4** — architectural: stiff tailoring, built-up silhouettes, harness plates, heavy boots
- **5** — rigid/armored: leather armor, molded/sculpted rigid pieces

---

## SKIN — how revealing / sheerness

How much bare skin the piece shows, including sheerness.

- Up: sheerness, mesh, cutouts, cropping, low necklines, open sides.
- Down: full opaque coverage.
- Note: a sleeveless-collar shirt shows arms, not torso → low-mid; sheer mesh → high.
- **Sheerness + coverage stack.** Skin comes from two things that add together: (1) how sheer the fabric is, and (2) how much is left uncovered by the cut. Start at the sheerness level, then add for exposed areas — ~+0.5 for bare forearms (short vs long sleeve), ~+1 for fully bare arms (sleeveless), more for a bare midriff (crop) or bare legs (shorts / short skirt). So a sheer long-sleeve and its short-sleeve twin are not equal — the short-sleeve sits a half-step higher.

**Anchors**
- **0** — full opaque coverage: trousers, crew tee, coat
- **1** — minimal skin: short sleeves, ankle crop
- **2** — some skin: sleeveless (bare arms), shorts, open collar
- **3** — notable skin: crop tops, deep necklines, partial sheer
- **4** — revealing: sheer panels, mesh, large cutouts, harness on bare torso
- **5** — maximal: fully see-through, minimal coverage

---

## EDGE — hardness / subversive attitude

Goth, punk, fetish, dystopian aggression — the "hard" attitude of the piece.

- Up: leather, studs, hardware, buckles, straps, zippers, distressing, bondage/fetish references, dystopian/techwear aggression, spikes, chains.
- Down: soft/romantic detailing, classic/preppy cut.
- **Color is neutral.** Black does *not* add edge on its own — this wardrobe is mostly black, so black is the baseline. A plain black basic is 0; edge is earned only by hard details and attitude.
- Not the same as drama: a small studded band = high edge, low drama; a pastel sequin gown = low edge, high drama.

**Anchors**
- **0** — no hard detail (any color): plain tee, plain trousers, plain shirt, delicate chain
- **1** — slight bite: a little hardware, subtle zip/utility detail, minimal techwear
- **2** — clearly hard: leather accents, visible hardware/zips, combat/utility boots, studs
- **3** — hard: substantial leather, straps, distressing, aggressive techwear/deconstruction
- **4** — aggressive: harnesses, heavy hardware, fetish/bondage detail, spikes, platforms
- **5** — extreme: full bondage/armor, mask, maximal dystopian

---

## Styling layer (planned — base stats → effective stats)

Base stats above are the garment "on the rack." A separate **styling layer** captures *how a piece is worn* and produces **effective stats** on top:

```
effective = base
          + Σ single-attribute modifiers   (e.g. high-waist → +0.5 drama)
          + Σ combo bonuses                (e.g. high-waist + tucked → +0.5 more drama)
   (clamped 0–5)
```

- **Styling attributes** are metadata tags, not stats: high-waist, tucked, worn-open/layered, sleeves-rolled, cropped-ankle, belted, etc.
- **Combos** may fire within one item (sleeveless + cropped) or across an outfit (high-waist bottom + tucked top) — so an outfit can score higher than the sum of its pieces.
- **Base stays pure.** Styling bumps live in the modifier tables, never baked into base. (The high-waist +0.5 currently in 11 bottoms' base drama is to be moved into a `high-waist` modifier.)

Not built yet — see TODO.md.

---

## FORMALITY — office / conventional-occasion appropriateness

How work-safe and put-together the piece is, versus casual, athletic, or provocative. (Defined as office/conventional-appropriate — most Minoar collar shirts can be worn to work.)

- Up: tailoring, coverage, refined fabric, muted palette, polished shoes.
- Down: sheer/skin, athletic/casual, provocative, costume-like.

**Anchors**
- **0** — not conventional at all: latex/fetish, extreme costume, beachwear
- **1** — very casual: athletic shorts, graphic tee, sneakers
- **2** — smart casual: nice tee + tailored pants, clean sleeveless shirt
- **3** — business casual: tailored trousers + collared shirt, blazer
- **4** — polished/formal: full tailoring, refined shirt, dress shoes
- **5** — formal/ceremonial: suit-level, couture eveningwear
