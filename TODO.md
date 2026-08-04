# Wardrobe App — Features & TODO

_Living backlog. Update this file instead of relying on chat memory._

Last updated: 2026-08-04 · data.js at DATA_VERSION 136

---

## Open / Next up

- [ ] **Persist edits (needs a backend).** Everything is localStorage today; outfit edits, favorites, shopping-list, and wear-log state don't survive across devices. Parked until a real backend exists. (The shared stores in data.js are the seam — swap localStorage → API in one place.)
- [ ] **Proposal → Outfits promotion flow.** Proposals 53–63 live on the Proposals page. Remaining: generate/add photos for the ones still missing, then promote the keepers to the main board (they stay on Proposals with the "Added" badge).
- [ ] **Night Shift sleek shoe gap.** The one real hole in the signature kit — nothing sleek/going-out under ~$500 sourced yet. Rick Owens Temple ($1,956) is the dream-tier stand-in.
- [ ] **Viceroy persona rethink.** The refined/tailored read isn't right. Re-define Viceroy in dark-avant terms, or fold it into Overlord.

## Shared code / consolidation — remaining

- [ ] **Finish CSS single-sourcing.** `components.css` now holds the shared card + popup styles and persona links it, but `wardrobe_v2_18.html` still has its own identical inline copies. Link `components.css` in wardrobe and delete the local duplicates (verify in-browser — the risky part). JS builders are already fully shared.
- [ ] **Make the matcher facet-aware + unify it.** `getItemPersona` (wardrobe) still scores against the old 7-key `PERSONA_PROFILES`; the display targets are already unified as `PERSONA_TARGETS` (8-key facets) in data.js. Point the matcher at `PERSONA_TARGETS` and delete `PERSONA_PROFILES` so there's one persona-profile source.

## Drama split — optional remaining

- [ ] **Facet filter sliders.** Wardrobe stat filters expose the `drama` roll-up + 4 base stats. Add sliders for the four facets (presence / silhouette / movement / ornament) to filter on them individually (e.g. "high-movement pieces"). Wire into `STAT_FILTER_KEYS` + the filter UI. Everything else in the drama split is done.

## Data model & insights (future)

- [ ] **Wear-log experiential layer (occasion · feeling · reactions).** Extend each wear entry with `occasion` (work / club-night / date / day-casual / party / shoot), `feelings` (powerful / confident / sexy / sharp / comfortable / playful; multi-tag), and `reactions` (free note + "got compliments" flag). Aggregate upward (computed on read): outfit popup → "Worn to: Club ×2 · Feels: Powerful, Confident"; item popup → across every look it's in. Subjective layer that complements the objective stats and powers better suggestions. Capture UI later; rating deferred.
- [ ] **Rethink the Profile "Style Signature" — averaging is the wrong model.** Today it's the mean of every item's stats (`WARDROBE_STATS`); the whole closet of basics + accessories drags every axis to the middle, so the signature reads muted and under-sells the dark/edge identity. Explore: summarize from **worn/built outfits** not raw inventory; use **peaks/percentiles** (top-quartile per axis) not the mean; drop near-zero basics/accessories. Likely a blend — peak-weighted over worn outfits.

## Link rot / durability (product pages & images decay over time)

- [ ] **Localize product images** (highest priority). Most shop + wardrobe items hotlink brand CDNs that rotate/404 when a listing is pulled → broken `<img>`. Download into the repo and point `img` at the local copy (like the HEIC pieces + recent worn/board photos already are).
- [ ] **Add `status` field to items** (`active` / `sold-out` / `dead`). Keep gone items for their stats/history but render greyed-out with the View link disabled.
- [ ] **On-demand link checker.** Small script: HEAD-request every `url` + `img`, flag non-200s.

## Styling layer — remaining polish

- [ ] Tag more items/outfits with real styling attributes (only some tagged so far).
- [ ] Expand combos as ideas come (layered synergies, etc.).
- [ ] Consider a UI editor to set per-outfit styling instead of hand-editing data.js.
- [x] Surface firing combos in the UI — done (styling chips in the outfit popup + item "Styling potential" Innate/Synergy section).

## Shop — optional adds

- [ ] NOT CONVENTIONAL china-button cape-vest (~$223) — dramatic outerwear.
- [ ] NOT CONVENTIONAL linen×cotton kimono gown (~$297) — long draped goth statement. (Japan→US shipping currently suspended.)
- [ ] kuhakutoyume kimono-remake pieces — good fit but one-of-a-kind / often sold out; opportunistic only.

## Tech debt

- [ ] **profile.html brand counts are hardcoded/stale** (`BRAND_BARS`: MINOAR 20, ORTTU 18, …). Compute from WARDROBE_DATA like WARDROBE_STATS does.

## Ideas / parking lot

- [ ] **Instagram ad feed page.** Passive discovery feed alongside the Shop. Meta's ad APIs are advertiser-facing, so this needs a different angle (affiliate/shopping APIs or curated). Revisit.
- [ ] **Shop item → wardrobe pairing suggestions.** On each shop item, show which closet pieces it would pair with — a preview of outfits it unlocks. Match on stats/persona proximity + role vs WARDROBE_DATA.

## Done

### Consolidation / shared components (Aug 2026)
- [x] **Single 8-spoke spider renderer** in data.js (`drawSpider`) — replaced 4 per-file copies. Similarity-order spokes, 9% floor, card mode (peak labels + caption) vs detail mode (full labels).
- [x] **Shared outfit card** (`outfitCardHtml`) — outfits board card-view + persona gallery, one source.
- [x] **Shared item card** (`itemCardHtml`) + `bkey`/`BCOLS` moved to data.js — clothing page + persona signature kit.
- [x] **Shared item popup** (`itemDetailInfoHtml` / `itemDetailPhotoHtml`) — clothing page + persona kit (clickable); outfits/pairings computed on read.
- [x] **Shared outfit-detail popup** (`statBarsHtml` + `outfitStylingHtml` → data.js) across outfits + persona pages.
- [x] **Unified persona display targets** → `PERSONA_TARGETS` (8-key) in data.js; persona.html + profile.html reference it.
- [x] **Shared wear store** (`WORN_HISTORY_DEFAULT` + `getWearCount`/`getLastWorn`/`fmtDate`/`wearBlockHtml`) — reads wardrobe's live history, falls back to localStorage elsewhere.
- [x] **One shared wear block + one delegated last-worn handler** (`.wear-last-worn-link`) — killed 3 duplicate builders + 3 wirings (fixed the #66 last-worn bug at the root).
- [x] **Shared top-most photo viewer** (`openPhotoViewer`, z-index 1500) — fixed the "Submitted photo hidden behind the history popup" stacking bug.
- [x] **Single outfit-photo path helper** (`outfitPhotoPath`) + compact id registry — removed the 54-line hand-maintained path map + all inline copies.
- [x] **Derived filter membership** (`outfitFilterTags` from vibe + persona) — outfits board + history filters no longer depend on hand-typed tags; new outfits sort automatically.
- [x] **Dead-code cleanup** in `openItemDetail` (removed the duplicate outfits/pairings/tags computation now done by the shared builder).
- [x] **RPG stats panel** on outfit popups — base (gold) + styling-buff (green) two-layer spider + bars with per-stat deltas; styling combos folded into the one panel.
- [x] **RPG "Styling potential"** on item popups — Innate (fires alone) vs Synergy (pair with…) with explicit conditions + rewards.
- [x] **Builder suggested combinations** now render the full compare panel (spider + base/buff bars + bonuses).

### Drama split (Aug 2026)
- [x] Split `drama` into 4 facets (Presence / Silhouette / Movement / Ornament); `drama` = computed max roll-up. Rubric + anchors in STATS.md.
- [x] Re-rated ~100 items across the facets; honest zero-audit recalibration (short-sleeve → skin 1, interlock → structure 0.5).
- [x] 8-spoke spiders everywhere; persona facet targets; modifiers + combos re-pointed to facets (±1.0 cap); outfit `drama` reconciled to max(facets).

### Earlier
- [x] Shared `data.js` single source of truth (catalog, outfits, resolvers) — all pages wired.
- [x] Clothing IDs behind the scenes; outfits shown in number order.
- [x] Gap analysis; stats recalibration (skin, formality, edge, structure, drama).
- [x] Proposals page (53–63) + ChatGPT image prompts.
- [x] Persona Signature Kit; Shop page (filterable grid, spider stats, persona fit, priority, links); Shopping list.
- [x] Shop rebuilt around real aesthetic (Demonia, Rick Owens, Minoar Fiber Bond anchors).
- [x] Styling modifier layer engine (STYLE_MODIFIERS + STYLE_COMBOS + effectiveOutfitStats).
- [x] New items: gold-armor shop pieces (pauldron+cape, sculptural corset), gold dragon ring, layered gold chains, MDNT45 cardigan/coat, Punk Rave skirt, earth cape; outfit #66 "Sheer Cargo Night" + Aug 1 wear entry.
