# Plan — Split "Drama" into 4 facets

**Goal:** Replace the single catch-all `drama` stat with four independent facets so different *kinds* of drama read distinctly, and modifiers/combos stop all piling onto one axis.

**The four facets** (0–5 each, same 0-based rules as every stat):
- **Presence** — gravitas / command / weight / severity. The "makes the room recalibrate" heaviness. (Overlord)
- **Silhouette** — proportion / volume / scale of the shape. High-waist, wide-leg, oversized, capes, robes, apron. (proven to own its spoke on volume-forward looks, e.g. #30)
- **Movement** — kinetic: flow, drape, fringe, swing, fabric that responds. (Night Shift "fringe & movement")
- **Ornament** — surface: sequin, print, sheen, metallic, embellishment. (Night Shift "sequin & sheen")

Other four stats (structure, skin, edge, formality) are **unchanged**. Net: 5 stats → **8 stats**, 8-spoke spider.

_Scope: only Drama is split. Structure, edge, and formality are coherent single axes. Skin has a mild sheerness-vs-exposure sub-distinction but it was evaluated and deliberately left single (lower stakes, and 8 spokes is already near the readability ceiling). Not revisiting._

---

## Decisions to lock at the start
1. **Keep a computed `drama` roll-up?** Recommended: yes — `drama = max(presence, silhouette, movement, ornament)` (the loudest facet), stored-derived. Keeps backward-compat for anything summarizing "how dramatic," and gives a single headline number. Alternative: remove `drama` entirely (more references to chase).
2. **Spider = all 8 spokes** (4 drama-facets grouped, then structure/skin/edge/formality). Verify readability at 8; adjust label spacing.
3. **Facet names** — Presence / Silhouette / Movement / Ornament (confirm before re-rating).
4. **Re-rating approach** — heuristic seed from cat/name/style/color, then hand-refine, then your spot-check one facet at a time (same loop that worked for the 5 stats). ~58 items are near-zero drama → 0 on all four (fast); only ~40 items need real 4-way thought.

---

## Phases
1. **Rubric + schema** — write the 4 facet definitions + anchors into STATS.md; lock the `drama` roll-up decision.
2. **Re-rate ~98 items** across the four facets (the bulk of the work). One facet at a time, seeded + refined + spot-checked.
3. **Data model** — add `presence/silhouette/movement/ornament` to item stats; add computed `drama`; update every `STAT_KEYS`/key-list array.
4. **Spider → 8 spokes** — drawSpider KEYS/labels in wardrobe_v2_18.html, persona.html, profile.html, shop.html; check the render.
5. **Persona profiles** — split each persona's drama target into the four facets (Overlord = high Presence; Night Shift = high Movement/Ornament; etc.) in the matcher + both display profiles.
6. **Modifiers + combos → re-point to facets** (keep the ±1.0 cap, now per-facet):
   - singles: high-waist→silhouette, oversized→silhouette, flowy→movement, tucked/half-tucked→silhouette, worn-open→presence, layered→silhouette
   - combos: monochrome-dark→presence, high-waist+tucked→silhouette, sequin&sheen→ornament, earth-cloak→presence, high-contrast→ornament, crop+high-waist→silhouette, couture-contrast→presence, harness→presence
7. **Sweep remaining `.stats.drama` references** — stat-filter sliders, stat pills/bars, shop cards, any filter/sort. Decide: expose facet sliders or filter on the drama roll-up.
8. **Verify** — node --check; effective-stat + persona-match sanity; 8-spoke render on all pages; spot-check a spread of outfits.

---

## Effort / risk
- **Biggest effort:** Phase 2 (re-rating) and Phase 6 (re-pointing modifiers/combos).
- **Main risks:** (a) 8-spoke spider readability; (b) missing a `.stats.drama` reference somewhere → fix by keeping the computed roll-up so old references still resolve; (c) persona profiles drifting again across 3 files — fold them into data.js as one source while we're in here (already on the tech-debt list).
- **Files touched:** data.js, wardrobe_v2_18.html, persona.html, profile.html, shop.html, STATS.md.

Do this as its own focused version bump, after committing the styling-combo work (v101).
