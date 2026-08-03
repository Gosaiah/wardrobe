# Wardrobe App — Features & TODO

_Living backlog. Update this file instead of relying on chat memory._

Last updated: 2026-07-28 · data.js at DATA_VERSION 67

---

## Open / Next up

- [ ] **Persist edits (needs a backend).** Everything is localStorage today; outfit edits, favorites, and shopping-list state don't survive across devices. Parked until a real backend exists.
- [ ] **Proposal → Outfits promotion flow.** Proposals 53–63 live on the Proposals page. Photos exist for 56, 57, 58, 62, 63. Remaining: generate/add photos for 53, 54, 55, 59, 60, 61, then promote the keepers to the main board (they stay on Proposals with the "Added" badge).
- [ ] **Night Shift sleek shoe gap.** The one real hole in the signature kit — nothing sleek/going-out under ~$500 sourced yet. Rick Owens Temple ($1,956) is the dream-tier stand-in.
- [ ] **Viceroy persona rethink.** The refined/tailored read isn't right. Re-define Viceroy in dark-avant terms, or fold it into Overlord.
- [ ] **Commit to GitHub.** data.js (v67) + shop.html + persona.html + nav.js + the two main pages have uncommitted shop work.

## Shop — optional adds (already in good shape: 10 on-aesthetic items)

- [ ] NOT CONVENTIONAL china-button cape-vest (~$223) — dramatic outerwear.
- [ ] NOT CONVENTIONAL linen×cotton kimono gown (~$297) — long draped goth statement. (Note: site currently suspends Japan→US shipping.)
- [ ] kuhakutoyume kimono-remake pieces — good fit but one-of-a-kind / often sold out; opportunistic only.

## Next up

- [ ] **Split `drama` into 4 facets** (Presence / Silhouette / Movement / Ornament). Big one — full plan + phases in **PLAN_drama_split.md**. Do as its own version bump after committing the styling-combo work.

- [x] **Styling modifier layer — engine built (data.js v95).** STYLE_MODIFIERS + STYLE_COMBOS + effectiveOutfitStats; getOutfitStats now uses effective. high-waist/flowy backed out of base. Verified on #1/#60/#64/#39.
- [ ] **Styling layer — remaining polish:**
  - Surface it in the UI: show which combos are firing on an outfit (e.g. a "Monochrome command" chip), and optionally base-vs-effective toggle on the outfit detail.
  - Tag more items/outfits with real styling attributes (only a few tagged so far as demos).
  - Expand combos as ideas come (layered synergies, etc.).
  - Consider an editor to set per-outfit styling from the UI instead of hand-editing data.js.

## Link rot / durability (product pages & images decay over time)

- [ ] **Localize product images** (highest priority — biggest visible failure). Most shop + wardrobe items hotlink brand CDNs (etsystatic, shopify, minoar) that rotate/404 when a listing is pulled → broken `<img>`. Download into the repo and point `img` at the local copy, like the HEIC pieces already are.
- [ ] **Add `status` field to items** (`active` / `sold-out` / `dead`). Keep gone items for their stats/history but render greyed-out with the View link disabled instead of silently rotting.
- [ ] **On-demand link checker.** Small script: HEAD-request every `url` + `img`, flag non-200s so decayed entries surface for a status bump.

## Shared-code audit (avoid duplicative work)

- [ ] **Evaluate what self-contained styling + functionality should be fully shared.** We've been consolidating piecemeal (drawSpider, statBarsHtml, outfitStylingHtml, persona targets → data.js; outfit-detail popup shared across outfits + persona pages). Do a deliberate pass: inventory every per-page copy of CSS blocks (e.g. the outfit-detail/lightbox modal styles, card styles) and JS helpers, decide what belongs in a shared place (data.js for JS; a shared stylesheet for CSS), and migrate. Goal: one source per thing, no drift. CSS is the current gap — it's still duplicated per HTML file because there's no shared .css yet.

## Tech debt

- [ ] **Unify persona target profiles into data.js.** The 5-stat persona profiles are hardcoded in three places — persona.html, profile.html (`PERSONA_STATS`), and the 7-key matcher in wardrobe_v2_18.html (`PERSONA_PROFILES`). They drifted during stat calibration and had to be updated by hand in each. Move the display profiles into data.js as one exported constant and reference everywhere so they can't fall out of sync again.
- [ ] **profile.html BRANDS counts are hardcoded/stale** (MINOAR 20, ORTTU 18, …). Compute from WARDROBE_DATA like WARDROBE_STATS now does.

## Ideas / parking lot (not committed — just capturing)

- [ ] **Instagram ad feed page.** Explore whether Meta/Instagram exposes an API to pull in clothing & fashion-accessory ads and surface them on their own page in the app — a passive discovery feed alongside the curated Shop. Feasibility TBD: Meta's ad APIs are built for advertisers managing their own campaigns, not for pulling a user's targeted ad feed, so this may need a different angle (e.g. affiliate/shopping APIs or a curated source). Revisit later.

- [ ] **Shop item → wardrobe pairing suggestions.** On each shop item, show which pieces already in the closet it would pair well with if bought — a preview of the outfits it unlocks. Makes the "versatility" rationale concrete and visual instead of just a sentence. Could match on stats/persona proximity + role (top/bottom/shoe/layer) against WARDROBE_DATA, and render a few thumbnail pairings per card.

## Done

- [x] Shared `data.js` as single source of truth (catalog, outfits, resolvers) — all pages wired to it.
- [x] Clothing IDs used behind the scenes; new items/outfits get IDs from creation.
- [x] Outfits always shown in number order.
- [x] Gap analysis (closet × outfits × personas) — established the closet is saturated in shirts/pants, thin in outerwear + statement shoes.
- [x] Stats recalibration (skin, formality, edge, structure, drama) across the closet.
- [x] Proposals page — outfits 53–63 live there permanently; ChatGPT image prompts generated.
- [x] Feature 1: each persona has signature top/bottom/shoe/accessory (Signature Kit on persona page).
- [x] Feature 2: Shop page — filterable grid, app theme, spider stats, persona fit, priority, specific product links.
- [x] Feature 3: Shopping list (add/remove, running total).
- [x] Shop rebuilt around real aesthetic (dramatic / deconstructed / dystopian) after calibrating on anchor items (Demonia, Rick Owens, Minoar Fiber Bond).
