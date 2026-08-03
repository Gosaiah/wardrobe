# Wardrobe Stat Definitions

The five style stats, each on a **0–5 scale anchored at 0** (a true basic scores 0, not 2 — the whole range is used), in **0.5 increments** — half-steps are always allowed to separate similar pieces (e.g. a full hanging belt = 1, a shorter one = 0.5). Every stat is defined to be **independent** of the others so they don't double-count: a piece can be high in one and low in another.

Status: **drama** item values are fully re-anchored to this scale (data.js v72+). The other four stats keep their older values until their recalibration pass — definitions below are the agreed target.

---

## DRAMA — four facets (Presence / Silhouette / Movement / Ornament)

"Drama" (visual statement / attention) is **not one axis** — it's four independent facets. Each is scored 0–5 on the same 0-based rules. The old single `drama` is now a **computed roll-up: `drama = max(presence, silhouette, movement, ornament)`** — the loudest facet defines overall drama. Facets are independent: a piece can be high in one and zero in the others.

### PRESENCE — gravitas / command / weight
How much the piece *imposes* — authority, severity, heaviness, the "makes the room recalibrate" quality.
- Up: darkness/severity, length (long coats), heaviness, monolithic minimalism, armor, a commanding foundation (tall/heavy boots).
- Down: light, playful, small, casual.
- Not structure (physical rigidity) or edge (hardness): a plain floor-length black coat is soft and un-studded but pure Presence.
- **0** plain tee · **1** dark matte basics · **2** structured dark jacket, boots · **3** long dark coat, harness, tall boots · **4** full monolithic black, heavy armor · **5** floor-length severe command

### SILHOUETTE — proportion / volume / scale of the shape
How much the *shape itself* is the statement, regardless of whether it's stiff or soft.
- Up: exaggerated volume (wide-leg, balloon, oversized), dramatic proportion (high-waist, elongated, cropped-for-proportion), capes, voluminous skirts/robes, architectural cut.
- Down: standard/fitted proportion, regular cut.
- Not structure: a flowy wide-leg has big Silhouette, low structure.
- **0** straight trousers, regular tee · **1** high-waist, slight crop, relaxed · **2** wide-leg, oversized tee, longline · **3** volume pants, apron skirt, cape, robe · **4** extreme wide/voluminous layered · **5** sculptural, maximal exaggeration

### MOVEMENT — kinetic quality
How the piece behaves in motion — flow, drape, swing.
- Up: flow (tulle, silk, loose drape), fringe, tassels, long flowing panels, billowing capes, hardware that swings.
- Down: stiff, fitted, static.
- Not Silhouette: Silhouette is the shape at rest; Movement is what it does when you walk. A stiff wide-leg has Silhouette but no Movement; a flowy robe has both.
- **0** tee, jeans, boots · **1** soft drape, light linen · **2** flowy fabric, loose swaying layers · **3** tulle, fringe, long flowing coat/robe · **4** heavy fringe, billowing cape · **5** maximal fringe/flow, "the outfit as an event"

### ORNAMENT — surface interest
Decoration on the surface — sequin, print, sheen, embellishment.
- Up: sequins, prints/graphics, floral, sheen/shine, metallic, rhinestones, beading, decorative hardware, bold surface texture.
- Down: plain matte surface, solid colour.
- Not edge: edge hardware is *toughness* (studs/zips read hard); Ornament is *decoration* (rhinestone/shine reads pretty). Route decorative-vs-tough by intent.
- **0** solid tee, plain trousers · **1** small logo/graphic, pinstripe, tonal texture · **2** print, sheen, gold accents · **3** bold print, metallic, lace, embellishment · **4** sequins, rhinestones, heavy embellishment · **5** all-over sequin/dazzle

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
          + Σ single-attribute modifiers   (e.g. high-waist → +0.5 silhouette)
          + Σ combo bonuses                (e.g. high-waist + tucked → +0.5 more silhouette)
   (clamped 0–5)
```

- **Styling attributes** are metadata tags, not stats: high-waist, tucked, worn-open/layered, sleeves-rolled, cropped-ankle, belted, etc.
- **Combos** may fire within one item (sleeveless + cropped) or across an outfit (high-waist bottom + tucked top) — so an outfit can score higher than the sum of its pieces.
- **Base stays pure.** Styling bumps live in the modifier tables, never baked into base.

**Built (data.js).** `STYLE_MODIFIERS` (singles), `STYLE_COMBOS` (monochrome-dark computed from colors, high-waist+tucked, worn-open+bare-torso), and `effectiveOutfitStats()`. Singles apply per-item (diluted when averaged across an outfit); combos apply at outfit level (full strength). Outfit stats use effective; item cards + persona matching stay on base. high-waist and flowy are backed out of base and reapplied as modifiers.

Vocabulary — singles: high-waist, low-rise, tucked, half-tucked, worn-open, belted, sleeves-rolled, cropped-ankle, oversized, layered, flowy. Contextual flag: bare-torso.

**Singles → facets (Phase 6).** Nothing targets `drama` directly — `drama` is the roll-up `max(presence, silhouette, movement, ornament)`, so a boost lands on the specific facet it expresses:
- high-waist · tucked · half-tucked · oversized · layered → **silhouette** (proportion / volume of the shape)
- worn-open → **presence** · flowy → **movement** · low-rise · sleeves-rolled · cropped-ankle → skin · belted → structure · tucked also → formality

**Combos (18).** Most compute from colours / item types / base stats, so they fire automatically. Boosts land on the facet/base axis each combo actually expresses:
- monochrome-dark → **presence +0.5**, edge +0.5 (all-black command)
- high-waist + tucked → **silhouette +0.5** · worn-open + bare-torso → skin +0.5
- hard-shoe + soft-bottom → edge +0.5 · armored-layer (harness present) → edge +0.5, **presence +0.5**
- high-contrast (dark + light) → **ornament +0.5** · tonal (non-black monochrome, not quiet) → formality +0.5
- skin + edge → edge +0.5 · layered (outer over a top) → structure +0.5
- crop + high-waist → skin +0.5, **silhouette +0.5**
- sharp tailoring (structured outer + tailored bottom) → structure +0.5, formality +0.5
- hardware stack (2+ high-edge pieces) → edge +0.5 · sheer stack (2+ high-skin pieces) → skin +0.5
- Persona signatures: **Full [brand]** (Overlord) → structure +0.5 · **Earth cloak** (Wanderer, earth-tonal + outer) → **silhouette +0.5** · **Sequin & sheen** (Night Shift) → **ornament +0.5**, skin +0.5 · **Couture contrast** (Viceroy, a formal piece over a dark base) → formality +0.5, **presence +0.5** · **Tonal ease** (Civilian, quiet neutral tonal) → recognition chip only, no boost

_Facet routing (Phase 6): the old drama boosts moved onto the facet each combo expresses — monochrome / harness / couture → **presence**; high-waist+tucked / crop / earth-cloak → **silhouette**; sequin & high-contrast → **ornament**. Earlier non-drama re-routes kept (tonal → formality, skin+edge → edge, layered → structure, Full-brand → structure). Outfit `drama` headline = max(facets) after combos._

**Combo cap.** Combos contribute at most **±1.0** to any single stat (`STYLE_COMBO_CAP`), so a heavily-styled look is enriched without swamping the base calibration.

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
