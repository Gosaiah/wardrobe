# Wardrobe App — Features & TODO

_Living backlog. Update this file instead of relying on chat memory._

Last updated: 2026-08-05 · data.js at DATA_VERSION 147

---

## Open / Next up

- [ ] **Stamp a stored `persona` on Builder-saved outfits.** `outfitFilterTags` now derives a persona from an outfit's stats at read time (so builder-made outfits sort into a category instead of only "All"), but the saved record still has no `persona` field — so the persona *chip* doesn't show on the card and it won't match the separate persona filter (`data-pfilter` / `currentPersonaFilter`, reads `o.persona` directly). Follow-up: at the builder save path, derive `persona` once (`getItemPersona({stats: effectiveOutfitStats(outfit)})`) and store it on the outfit. (Note: the "+ New Outfit" flow creates an empty outfit with no pieces, so derive/stamp when pieces are added/saved, not at creation.)
- [ ] **Persist edits (needs a backend).** Everything is localStorage today; outfit edits, favorites, shopping-list, and wear-log state don't survive across devices. Parked until a real backend exists. (The shared stores in data.js are the seam — swap localStorage → API in one place.)
- [ ] **Proposal → Outfits promotion flow.** Proposals 53–63 live on the Proposals page. Remaining: generate/add photos for the ones still missing, then promote the keepers to the main board (they stay on Proposals with the "Added" badge).
- [ ] **Night Shift sleek shoe gap.** The one real hole in the signature kit — nothing sleek/going-out under ~$500 sourced yet. Rick Owens Temple ($1,956) is the dream-tier stand-in.
- [ ] **Viceroy persona rethink.** The refined/tailored read isn't right. Re-define Viceroy in dark-avant terms, or fold it into Overlord.

## App structure

- **Split the monolith into consistent standalone pages (option 3).** `wardrobe_v2_18.html` is the last SPA (4 in-page tabs: Outfits / Wardrobe / Builder / History); every other destination is already standalone. Decisions locked (2026-08-05): land on **Today**; adopt clean filenames (`outfits.html` / `wardrobe.html` / `builder.html` / `history.html`, retire the `wardrobe_v2_18` name); phase-by-phase with a commit + test between each. Plan:
  - [x] **Phase 0 — extract the store (DONE 2026-08-05).** New `store.js`: `Store.load()` (version-checked merge of outfits/history/customItems/items), `Store.mergeItems`, `Store.persist`, `Store.safeParse`. Monolith now loads/persists through it (pure refactor — the live `let outfits/items/wornHistory` and all in-place mutations are unchanged; only load + localStorage writes are centralized). Verified byte-identical to the old inline logic across 5 scenarios (fresh / cached-valid / version-bump+user-added / invalid-cache / custom-item-merge). This is the shared read+write layer the split needs.
  - [x] **Phase 1 — shared modals.js (2026-08-05).** `modals.js` owns the outfit / item / photo-viewer / wear-detail popups (injected markup + open/close/escape/backdrop + z-stacking). `Modals.openItem/openOutfit/openPhoto/openWear`. Today, Proposals, Persona migrated onto it + tested. Also fixed a latent item-photo zoom (bare `<img>` → wrapped in `.item-detail-photo`) and removed the manual "Wear this". The monolith kept its own popups (folded into Phase 2's peel).
  - [~] **Phase 2 — peel tabs into standalone pages, least-coupled first.**
    - [x] **History → history.html (2026-08-05, canary — tested).** Standalone page: `.app-page` shell, reads `Store.load()`, renders card/feed/calendar via shared `outfitCardHtml`, popups via `modals.js` (incl. `Modals.openWear`). nav.js: History is now a link everywhere (removed from the in-page tabs; tab-switch handlers scoped to `.nav-tab[data-tab]`). Removed the History tab markup + ~250 lines of render code + dead CSS from the monolith (2503 → 2158 lines), keeping `openWearDetail`/`getEntryPhotos` which the item/outfit "last worn" link still uses.
    - [x] **Wardrobe (clothing mgr) → wardrobe.html (2026-08-05, tested).** Standalone clothing manager: `.app-page` shell, `Store.load()` for state, `Store.persist({customItems})` for the add-piece write path (doesn't touch outfits/history), item popup + delegated sub-clicks via modals.js. Also fixed a shared `Modals.openWear` z-order bug (wear-detail opened behind the item popup) — it now closes the item/outfit popup it launches from. nav.js: Outfits/Builder are still in-monolith tab buttons, Wardrobe/History are standalone-page links (order preserved). Removed the `#tab-wardrobe` markup + `renderMgr`/`openMgr*`/CRUD JS from the monolith (2158 → 1960 lines), keeping `openItemDetail`/`showPreview` (board + builder use them). NOTE: mgr CSS left in the monolith for now — `.mgr-search` is still used by the Builder's search input; sweep all `.mgr-*` when Builder peels. NOTE: edit/delete of existing pieces was never wired (true in the monolith too — add-only); add later if wanted.
    - [ ] **Builder → builder.html.** Reads items, writes outfits via `Store.persist`, uses `buildPairings`. On peel: move `.mgr-search` usage + sweep the now-dead `.mgr-*` CSS from the monolith.
    - [x] **Outfits board → outfits.html (2026-08-05).** The monolith `wardrobe_v2_18.html` was renamed to `outfits.html` (git mv) — it's now just the Outfits board (grid + 2 filter rows + sort sidebar + 3 views + New-Outfit modal + IndexedDB photo uploads), self-contained and already on the shared theme (alter-theme's `:root` overrides its dead inline one). Follow-up (task below): migrate its popups onto modals.js + sweep dead CSS.
  - [x] **Phase 3 — monolith retired (2026-08-05).** `wardrobe_v2_18.html` renamed → `outfits.html`; nav.js: every destination (Today · Outfits · Wardrobe · Builder · History) is now a standalone-page link (no in-page tabs left); nav-brand + `index.html` land on **Today**. All 8 pages parse.
  - [ ] **outfits.html popup migration + CSS sweep** — the board still uses its own item/outfit/wear popups (+ the bespoke `lb-*` lightbox); migrate onto modals.js, then sweep the dead `lb-*` / builder / closet / mgr / picker / preview CSS + the dead inline `:root`.
  - [ ] **Shared `pieceCardHtml`** — unify the 4 piece renderers (pairing chip / grid piece-row / editorial h-piece / wear-detail rows) into one component with `chip`/`row`/`card` views, all clickable `.piece-name-link` with the gold `--accent2` hover (matching `.mgr-item` / `.outfit-card`). (Requested while peeling Builder.)
  - Tradeoff accepted: cross-tab state (Builder save → Outfits board) reflects on next load instead of instantly — already how Proposals/Shop/Profile behave.

## Cross-page consistency (Aug 2026)

- [x] **Card-view CSS single-sourced** — the `.outfit-card.card-view` (+ `.view-toggle`) CSS now lives once in alter-theme.css (loaded by every page incl. the Outfits board, which doesn't link components.css); removed the components.css + Outfits-inline copies. Renderer was already shared (`outfitCardHtml`).
- [x] **Today reads the same data as the Outfits board** — shared `_allOutfits()` (board's live/localStorage set → defaults), `OUTFIT_PHOTO_IDS` + `outfitPhotoSrc()` (uploaded photo from the shared IndexedDB store → curated default path → "No photo"), and `loadUploadedOutfitPhotos()`. Today no longer showed edits/uploads or a stale default path — now it matches the board exactly. Outfits board's hardcoded photo-id list also points at `OUTFIT_PHOTO_IDS`.
- [x] **Grid + Editorial views globalized** — `outfitCardHtml({view:'card'|'grid'|'editorial'})` is now the ONE renderer for all three, emitting the Outfits page's markup/classes; CSS moved to alter-theme.css (incl. global **`h-piece`** compact item card). The Outfits board's `renderCardViewCard` / grid render / `renderHorizontalCard` all call it, and Today uses the same. Piece clicks (`piece-name-link`) are wired to item detail on every page. Cleanups along the way: removed drop-zone, view-photo (lightbox button), save/delete + the ★Saved filter, and per-card add-photo. Dropped the tiny brand tag from grid piece rows (brand still shows on click).
- [x] **History unified onto `outfitCardHtml`** — the worn card + the outfit card are now one component. History feeds each wear entry through a `wearAsOutfit(w)` shaper (name/pieces-from-itemIds/stats) into the shared renderer; worn context is passed as opts: `kicker`=date, worn photo via `cvThumb` (card view, left of the text) / `badges` overlay (feed view), plus new generic `headerActions` (remove-entry) + `headerExtra` (also-worn photos) header slots, and `noDataId` so worn cards only ever open the wear detail. Both views now show the same de-emphasized top-2 leading-stats line; feed gets the full editorial treatment (effective spider + base/buff bars + clickable pieces). Deleted the dead `.history-card-item` / `.hcv-*` / `.history-editorial-card` CSS. (Simplification: the outfit name is no longer a separate click target in the feed — the card opens the wear detail, which links through to the outfit.)
- [x] **Outfit card face-lift** — replaced the vibe + character chip with the top-2 leading stats (values), styled like the outfit number (small/uppercase/dim, per-view color), and removed `drawSpider`'s now-redundant caption pill on card spiders (`hideCaption`).
- [x] **Dead-code sweep (2026-08-05)** — removed the unused `personaChip` const in `outfitCardHtml`, dead `.piece-brand` + `.tag-*` CSS (+ their orphaned `--tag-*` vars) from wardrobe, and the redundant inline card rules alter-theme already single-sources (base `.outfit-card`, `.outfit-card-header`, `.outfit-pieces`, `.piece-row`, `.piece-thumb*`, `.piece-role` — all confirmed card-only-context + alter-theme superset). Kept the rules alter-theme lacks/differs on (`.outfit-card:hover`, `.outfit-number/name/vibe`, `.outfit-card-actions`, `.piece-name*`, `.outfit-photo*` hover-zoom). `brandTagHtml` was already gone. `outfit_board.html`/`outfit_picker.html` are orphan legacy files (no nav refs) — left untouched. Remaining inline photo/responsive card CSS folds into the monolith split.
- [x] **profile.html BRAND_BARS computed from WARDROBE_DATA (2026-08-05)** — was hardcoded/stale (MINOAR 20…); now grouped live by normalized brand key → BRANDS label, top 10, bars scaled to the leader (Minoar 21, Orttu 18, Amazon 13, …).


- [x] **Shared page shell + header** in alter-theme.css — `.app-page` (full-bleed to match the nav, padding aligned to nav's 24px, responsive) and `.page-header`/`.page-title`/`.page-sub`/`.page-actions`. `--page-max: none` (was 1080 — user chose full-width to match the nav).
- [x] **Big bold page titles everywhere** — `.page-title` now uses Profile's "Style Profile" hero treatment (display font, weight 700, `-0.02em`, `clamp(48px, 8vw, 96px)`). Killed the mismatched titles (none / 11px / 20px / 22px / 96px → one `.page-title`).
- [x] **Adopted across content pages:** Today, Shop, Proposals use `.app-page` + `.page-header`; Profile & Persona wrappers go full-width too (keeping their hero as an opt-in showcase). Content column is now consistent (full-width, 24px gutters) on every page.
- [x] **Proposals** got a real title + subtitle (had none) and its filter bar moved from a hardcoded-black (`#0a0a0a`) full-bleed sticky bar into the content column, in-flow like Shop's filters.
- [x] **Wardrobe workspace capped to the shared width** — the `.tab-panel`s (Outfits/Wardrobe/Builder/History) now `max-width: var(--page-max)` + centered, so the Outfits board lines up with Today and every other page (nav stays full-width). Its toolbar count-label heading is still a distinct role and left as-is.
- [x] **One filter/context chip** — Today's context chips, Shop's filters, Proposals' filters, and the Outfits board filters were four different chip styles (pill/solid vs radius-8/outline vs tinted). Collapsed into a single definition in alter-theme.css (`.filter-chip, .filter-btn, .t-chip, .pf-btn` → one pill + solid-accent-active look); removed all four per-page copies + the stray `accent-soft` active + `.filter-chip` radius override.

## Shared code / consolidation — remaining

- [ ] **Finish CSS single-sourcing.** `components.css` now holds the shared card + popup styles and persona links it, but `wardrobe_v2_18.html` still has its own identical inline copies. Link `components.css` in wardrobe and delete the local duplicates (verify in-browser — the risky part). JS builders are already fully shared.

## Drama split — optional remaining

- [ ] **Facet filter sliders.** Wardrobe stat filters expose the `drama` roll-up + 4 base stats. Add sliders for the four facets (presence / silhouette / movement / ornament) to filter on them individually (e.g. "high-movement pieces"). Wire into `STAT_FILTER_KEYS` + the filter UI. Everything else in the drama split is done.

## Today page (what-to-wear decision helper)

**v1 BUILT (2026-08-04)** — `today.html` shipped: weekday-inferred + tappable context chips (Office/Going out/Casual/Date), Manhattan weather via Open-Meteo (temp line + re-rank nudge by the bands), one hero pick + 2 alternates (1 saved + 1 built via the pairing engine), "Wear this" logs to `worn-history` (shows on History), "Show another" shuffle, cards open the shared outfit-detail popup. Office uses the Tue/Thu formality gradient. Added to nav as the first item.

**Consolidation:** Today reuses the shared **`outfitCardHtml`** card (extended with `kicker` / `collage` / `cardClass` opts — collage handles the photo-less built combo; the hero is the same card with a wider aspect + an action bar beside it), the shared button language (`.btn-add`/`.action-btn`), the shared `.item-detail-overlay` popup, and a new shared **`addWear`** writer in data.js. Only weather, context scoring, greeting, and the toast are Today-specific (no prior equivalent). `.cv-collage` added to components.css.

**Card/grid/editorial views (2026-08-04)** — Today has the same 3 view modes as the Outfits page via a shared toggle. `outfitCardHtml` extended with `view: 'card' | 'grid' | 'editorial'` (grid + editorial are self-contained inline styles using shared `statBarsHtml`/`pieceImg`). Toggle restyles all 3 recommended outfits together; Wear this / Show another moved to a toolbar above the results.

Remaining / follow-ups:
- [ ] **Migrate the Outfits page onto the shared grid/editorial views** — it still has its own `renderHorizontalCard` + grid render + inline CSS. Point it at `outfitCardHtml({view})` (needs opts for its save/delete + photo-pick hooks) so grid/editorial are truly one source, not two copies.
- [ ] **Calendar-aware layer** — morning scheduled task reads the day's events, classifies context + names the occasion, writes `today.json` the page reads (falls back to weekday inference). Not built yet.
- [x] **Garment-warmth weather model (2026-08-05)** — items now carry a 0–5 `warmth` (auto-derived from `cat` + name keywords via `itemWarmth`; per-item `warmth:` override for outliers, e.g. the sleeveless Hexa coat → 3.5). `outfitWarmth` = warmest layer + small layering bonus; `BAND_WARMTH` + `weatherFit(warmth, band)` → `{drop, nudge}`. Today's `scoreOutfit` hard-drops severe mismatches (a warmth-5 coat is excluded at mild/warm/hot; bare mesh excluded at freezing) and soft-nudges the rest, with a graceful "N saved looks set aside for the weather / here's a fresh build" note. The builder is gated too: `buildPairings`/`buildContextCombo` take `band` — exclude too-warm pieces and drop the outer slot when warm/hot. Replaced the old outfit-level skin/`hasOuter` heuristic. Verified via smoke tests.
- [ ] **Tune weather bands + warmth values with real use** — band thresholds (`BAND_WARMTH`), the warmth heuristic keywords, and score coefficients are first-pass; adjust with wear. Only one outlier override so far (Hexa sleeveless coat) — add more if the auto-derive mislabels anything in practice.
- [x] **Removed the manual "Wear this" button (2026-08-05)** — wears are captured via the photo → Claude flow that seeds `WORN_HISTORY_DEFAULT` (durable, committed). A client-side localStorage log was a redundant, less-durable second path (no cross-device sync, lost on cache clear), so Today's "Wear this" + `logWear`/`wornToday`/`toast` + the dead `addWear` writer in data.js were all removed. Today is now purely a recommendation/decision tool. (If wear-logging ever returns, route it through the durable Claude/backend path, not localStorage.)
- [ ] Optional Date sub-toggle (chill / night out / dressy) if the spread of alternates isn't enough.

<details><summary>Original locked spec</summary>

- [ ] **"Today" page — quick daily what-to-wear.** A landing page that helps decide an outfit fast for the day's context. Decisions locked (2026-08-04):
  - **Contexts (4):** In-office (Tue/Thu), Going out w/ friends, Casual / errands, Date. Character/formality leans per context detailed in the bullets below. Going-out → Night Shift / higher drama+edge+skin; Casual → Wanderer/Civilian comfort, lower formality. Should reuse wear-log `occasion` tags once those exist.
  - **Recommends:** saved outfits that fit the context first, with a freshly **built combo** (via the shared pairing engine) offered as a fallback/alt when nothing saved fits.
  - **Context input (layered):** (1) in-app baseline = weekday inference (Tue/Thu → office, else casual) + manual context tap — self-contained, offline, always works. (2) calendar-aware layer = a morning scheduled task where Claude reads that day's calendar events, classifies them into a context (dinner-with-friends → going-out; meeting-heavy day → office/higher formality; nothing → casual) and writes today's context + event name into a small file (e.g. `today.json`) the static app reads on load; falls back to weekday inference if absent. Lets Today name the actual occasion ("Going out — Dinner w/ Sam, 8pm") and time the weather bias to the event. NOTE: the app is static/in-browser and can't read the calendar directly — the calendar smarts must come via the Cowork/scheduled-task handoff, not a live API call from the page.
  - **Office = formality gradient by weekday** (not one persona): draws from Overlord / Civilian / Wanderer. **Tuesday = more casual / lower formality; Thursday = sharper / higher formality.** One "Office" chip that auto-adjusts by the actual day.
  - **Layout:** one hero pick + 2 alternates.
  - **Saved vs. built mix:** always show both — the hero + one alternate from best-fitting SAVED outfits, plus one BUILT "something new" option (badged so it's distinguishable).
  - **Date:** hero leans Night Shift, but deliberately spread the 2 alternates across other characters (a Civilian, an Overlord/Wanderer) so the pick fits the real plan. (Remembered option for later: a tiny sub-toggle — chill / night out / dressy — if the spread isn't enough.)
  - **Freshness:** none — recommendations are pure context fit; "show another" shuffle just re-rolls among fitting options for variety.
  - **Weather-aware (v1):** hardcode **Manhattan, NYC** (Open-Meteo, no key, no location prompt; make it an easy-to-change constant). Show the temp AND *nudge* (re-rank, never override the context) by these bands (°F, adjust over time):
    - **≤32 (freezing):** strongly favor an outer layer + low skin; boots. Penalize bare/high-skin hard.
    - **33–49 (cold):** favor an outer layer, lean lower skin / long sleeves.
    - **50–62 (cool):** light outer / layering a plus but optional; neutral on skin.
    - **63–75 (mild):** no outer needed; moderate skin fine; don't reward heavy layering.
    - **76–85 (warm):** favor lighter / less layered; higher skin okay; gently penalize heavy outers.
    - **≥86 (hot):** minimal layers, high skin okay; penalize outers / heavy layering.
    - Signals available to detect this: outfit has an outer layer, skin stat (low = coverage), layering count. Handle API failure gracefully (fall back to no-weather).
  - **Flow:** land → (weekday-inferred context, overridable chips) → temp line → one hero pick + 2 alternates (mostly saved + 1 built) → "Wear this" logs to history → "Show another" shuffle.
  - Placement: likely the app's default landing view. Revisit once "seamless hybrid" nav is decided.

</details>

## Data model & insights (future)

- [ ] **Wear-log experiential layer (occasion · feeling · reactions).** Extend each wear entry with `occasion` (work / club-night / date / day-casual / party / shoot), `feelings` (powerful / confident / sexy / sharp / comfortable / playful; multi-tag), and `reactions` (free note + "got compliments" flag). Aggregate upward (computed on read): outfit popup → "Worn to: Club ×2 · Feels: Powerful, Confident"; item popup → across every look it's in. Subjective layer that complements the objective stats and powers better suggestions. Capture UI later; rating deferred.
- [ ] **Profile Signature: show multiple shapes.** Idea — instead of one spider, overlay a few readings on the same chart (e.g. worn vs saved, or "everyday" vs "at your boldest" cuts, or per-persona). The peak model already supports different quartiles/populations; just needs a multi-dataset spider + a small legend/toggle. (Deferred — noted 2026-08-05.)
- [x] **Profile "Style Signature" reworked from mean → peak (2026-08-05); set to "bold" (top ~15% per axis).** Was the flat mean of every item (`WARDROBE_STATS`), which dragged every axis to the middle. Now `STYLE_SIGNATURE` reads the PEAK of your styled outfits: each outfit's `effectiveOutfitStats` (styling combos applied), worn looks weighted extra (each wear re-adds its outfit), then the top-quartile mean per axis. De-mutes the identity hard — e.g. edge 1.3→3.7, structure 1.7→3.5, presence 1.3→3.5, formality 2.0→3.4, while skin/ornament/movement/silhouette stay lower. Drives the main spider + stat pills. Falls back to the raw average if no outfits resolve. (Tunable: the 0.25 quartile and the worn-weighting.)

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

- [x] NOT CONVENTIONAL china-button cape-vest — added ($223 / ¥33,000, `sh_nc1`, Wanderer, priority "low"). Ships worldwide from Japan (7–10 days); in stock.
- [x] NOT CONVENTIONAL linen×cotton kimono gown — added ($297 / ¥44,000, `sh_nc2`, Wanderer, priority "low"). Shipping is live again (worldwide from Japan); in stock — the "suspended" note was stale.
- [ ] kuhakutoyume kimono-remake pieces — good fit but one-of-a-kind / often sold out; opportunistic only.

## Tech debt

- [x] **profile.html BRAND_BARS computed from WARDROBE_DATA** (done 2026-08-05) — was hardcoded/stale; now grouped live by normalized brand key → BRANDS label, top 10, bars scaled to the leader.

## Ideas / parking lot

- [ ] **Instagram ad feed page.** Passive discovery feed alongside the Shop. Meta's ad APIs are advertiser-facing, so this needs a different angle (affiliate/shopping APIs or curated). Revisit.

## Done

### Bug fixes + shared outfit popup (Aug 2026)
- [x] **History filters fixed** — the dark/tonal/contrast/night filters were computed (`outfitFilterTags`) but `renderHistory` rebuilt the rendered list from the full `wornHistory` instead of the filtered set, so the filter was discarded. Now renders `filtered`.
- [x] **Proposal cards are clickable** — every proposal (session + custom) opens a shared outfit-detail popup, matching the rest of the app.
- [x] **Shared outfit-detail builder** (`outfitDetailInfoHtml` + `outfitDetailPhotoHtml` in data.js) — header + persona chip (tokenized) + stats compare + clickable piece rows; self-contained inline styles so any page can use it. Falls back to the outfit's own precomputed spider when proposal/aspirational pieces aren't in the wardrobe. The Outfits board popup (`openOutfitDetail`) was refactored onto it (dropped ~55 lines of duplicate inline markup).
- [x] **Shared outfit-detail MODAL** — the two-column `.item-detail-overlay` panel CSS moved into `components.css`; Proposals now links components.css and uses that same markup (outfit photo left, shared info right) so its popup matches the Outfits board + Persona instead of a bespoke single-column modal. (Persona still has an identical inline copy of the modal CSS — harmless duplicate, dedupe opportunistically.)
- [x] **Persona outfit modal migrated to the shared builder** — `openOutfitModal` now fills its info column with `outfitDetailInfoHtml` (dropped its bespoke `lb-*` markup + the `#111` chip); piece rows wire to the item popup via the delegated `.outfit-detail-piece` handler. All 3 pages (Outfits, Proposals, Persona) now render the same outfit-detail content. Also tokenized two stray `color:#111` CSS rules (`.sig-count.complete`, `.prio-list`). (Legacy `.lb-*` CSS + `PLAB_MODAL` are now unused dead code — harmless, clean up opportunistically.)

### Shop ↔ wardrobe pairing (Aug 2026)
- [x] **Shared pairing engine** (`buildPairings` + `pairingCardsHtml` in data.js) — scores complementary wardrobe pieces by stat closeness + persona fit, assembles full-look suggestions. Role-aware (`pieceRole`/`CAT_ROLE`): sources the right complementary slots for a top/bottom/outer/shoes/harness/jumpsuit anchor. Works for anchors not in the wardrobe (shop items) via an embedded-stats fallback in `outfitBaseStats`/`effectiveOutfitStats`/`pieceImg`.
- [x] **Shop "Pairs" popup** — every shop card has a ◇ Pairs button that opens full looks it would unlock from the current closet, each with the base/buff compare panel.
- [x] **Builder shares the same logic + UI** — the Suggestions tab now calls the shared view (passing its live `items` pool); deleted the builder's local `buildSuggestions`.
- [x] **Shared Pairs VIEW** (`pairsViewHtml` in data.js: kicker/name/subtitle header + gold/green legend + cards grid; `.pair-head`/`.ph-*`/`.pair-body` CSS moved to alter-theme.css). One component drives both the Shop full-screen takeover view and the Builder Suggestions panel (context-appropriate copy via `opts.kicker`/`title`/`subtitle`). Shop's Pairs is a full-screen in-page view (back arrow / Esc), not a modal.

### Token consistency (Aug 2026)
- [x] **Tokenized the JS builders.** Every hardcoded color in data.js's shared builders (`drawSpider`, `drawSpiderCompare`, `outfitStatsCompareHtml`, `itemStylingPotentialHtml`, persona chips) now uses theme tokens, so generated content switches with light/dark. SVG uses `style="fill:var(--…)"` (presentation attrs like `fill="var()"` don't resolve vars). Added `--buff` / `--buff-soft` / `--buff-border` (RPG styling-buff green) to both themes; `SPIDER_BUFF` → `var(--buff)`; persona chip text `#111` → `var(--on-accent)`; spider rings/axes/labels → `var(--border)`/`var(--muted)`.
- [x] **Unified matcher on `PERSONA_TARGETS`** — `getItemPersona` scores against the 8-key facet targets; old 7-key `PERSONA_PROFILES` deleted. One persona-profile source.

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
