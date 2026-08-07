/* ALTER — shared client store.
   One place to LOAD and PERSIST the mutable wardrobe state (outfits, custom items,
   wear history) with the data-version cache/merge rules, so every standalone page
   reads and writes the same localStorage the same way.

   Load order: AFTER data.js (needs OUTFITS_DEFAULT / WORN_HISTORY_DEFAULT /
   WARDROBE_DATA / DATA_VERSION), BEFORE the page's own script.

   data.js's _allOutfits / _allItems / _wearHistory remain the read-side fallbacks
   (they read a page's live globals if present, else localStorage); this module is the
   canonical LOAD (version-checked merge) + WRITE side that the Outfits/Wardrobe/Builder/
   History pages share. Behavior here is intentionally byte-identical to the logic that
   used to live inline in the monolith (now outfits.html). */
const Store = (function(){
  function safeParse(key, fallback){
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e){ return fallback; }
  }

  // WARDROBE_DATA + any user-added custom items not shadowing a default id.
  function mergeItems(customItems){
    customItems = customItems || [];
    return [].concat(WARDROBE_DATA, customItems.filter(function(c){
      return !WARDROBE_DATA.find(function(w){ return w.id === c.id; });
    }));
  }

  // Version-checked load + merge. Returns { outfits, wornHistory, customItems, items }.
  // On a data-version bump (or invalid cache) the defaults are re-seeded and any
  // user-added outfits/history are merged back on top; otherwise the cache is used.
  function load(){
    const cachedOutfits = safeParse("outfits", null);
    const cachedHistory = safeParse("worn-history", null);
    const storedVersion = parseInt(localStorage.getItem("data-version") || "0", 10);

    const outfitsValid = Array.isArray(cachedOutfits) && cachedOutfits.length > 0 && cachedOutfits.every(function(o){ return o && o.id; });
    const historyValid = Array.isArray(cachedHistory) && cachedHistory.every(function(w){ return w && w.date; });

    let outfits, wornHistory;
    if (storedVersion < DATA_VERSION || !outfitsValid){
      const defaultOutfitIds = new Set(OUTFITS_DEFAULT.map(function(o){ return o.id; }));
      const userAddedOutfits = (outfitsValid ? cachedOutfits : []).filter(function(o){ return o && !defaultOutfitIds.has(o.id); });
      outfits = [].concat(OUTFITS_DEFAULT, userAddedOutfits);

      const historySig = function(w){ return w.date + "|" + w.outfitId + "|" + (w.itemIds || []).join(","); };
      const defaultSignatures = new Set(WORN_HISTORY_DEFAULT.map(historySig));
      const userAddedHistory = (historyValid ? cachedHistory : []).filter(function(w){ return w && !defaultSignatures.has(historySig(w)); });
      wornHistory = [].concat(WORN_HISTORY_DEFAULT, userAddedHistory);

      localStorage.setItem("data-version", String(DATA_VERSION));
    } else {
      outfits = cachedOutfits;
      wornHistory = historyValid ? cachedHistory : WORN_HISTORY_DEFAULT;
    }

    const customItems = safeParse("custom-items", []);
    const items = mergeItems(customItems);
    return { outfits: outfits, wornHistory: wornHistory, customItems: customItems, items: items };
  }

  // Write the mutable state back. Pass whichever slices changed; data-version is always
  // stamped to the current version (mirrors the old persist()).
  function persist(state){
    state = state || {};
    if (state.outfits)     localStorage.setItem("outfits", JSON.stringify(state.outfits));
    if (state.customItems) localStorage.setItem("custom-items", JSON.stringify(state.customItems));
    if (state.wornHistory) localStorage.setItem("worn-history", JSON.stringify(state.wornHistory));
    localStorage.setItem("data-version", String(DATA_VERSION));
  }

  return { safeParse: safeParse, mergeItems: mergeItems, load: load, persist: persist };
})();
