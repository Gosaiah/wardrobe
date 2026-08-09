/* ALTER — shared facet filter component.
   One source for the drama-facet filter used by both the Wardrobe (filter pieces) and the
   Outfits board (filter outfits by their effective stats). Renders 4 threshold sliders +
   a reset into a container, manages the thresholds, and exposes a matcher.

   Load AFTER data.js (uses --accent/--muted/--border tokens; no data deps otherwise).

   Usage:
     const ff = FacetFilter.mount("my-container", onChange);   // onChange fires on any change
     items.filter(i => ff.matches(i.stats));                    // wardrobe: item.stats
     outfits.filter(o => ff.matches(effectiveOutfitStats(o)));  // board: outfit effective stats
*/
const FacetFilter = (function(){
  const KEYS   = ["presence","silhouette","movement","ornament"];
  const LABELS = { presence:"Presence", silhouette:"Silhouette", movement:"Movement", ornament:"Ornament" };

  function barHtml(){
    const slider = function(k){
      return "<label style='display:flex;align-items:center;gap:6px;font-size:10px;color:var(--text)'>" +
        "<span style='min-width:60px;letter-spacing:0.04em'>" + LABELS[k] + "</span>" +
        "<input type='range' min='0' max='5' step='0.5' value='0' data-ff='" + k + "' style='width:88px;accent-color:var(--accent)'>" +
        "<span data-ffval='" + k + "' style='min-width:16px;color:var(--accent);font-size:9px'>0</span>" +
      "</label>";
    };
    return "<div style='display:flex;align-items:center;gap:18px;flex-wrap:wrap'>" +
      "<span style='font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted)'>Facet filters</span>" +
      KEYS.map(slider).join("") +
      "<button data-ff-reset style='display:none;background:none;border:1px solid var(--border);color:var(--muted);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:6px;cursor:pointer;font-family:inherit'>Reset</button>" +
    "</div>";
  }

  // Render + wire into containerId. onChange() fires whenever a threshold changes.
  // Returns { values, matches(stats), reset(), active() }.
  function mount(containerId, onChange){
    const el = (typeof containerId === "string") ? document.getElementById(containerId) : containerId;
    if (!el) return null;
    el.innerHTML = barHtml();
    const values = { presence:0, silhouette:0, movement:0, ornament:0 };
    const resetBtn = el.querySelector("[data-ff-reset]");
    const active = function(){ return KEYS.some(function(k){ return values[k] > 0; }); };
    const sync = function(){ if (resetBtn) resetBtn.style.display = active() ? "" : "none"; };
    el.querySelectorAll("[data-ff]").forEach(function(sl){
      const k = sl.getAttribute("data-ff");
      const vl = el.querySelector("[data-ffval='" + k + "']");
      sl.addEventListener("input", function(){
        values[k] = parseFloat(sl.value);
        if (vl) vl.textContent = sl.value;
        sync();
        if (onChange) onChange();
      });
    });
    if (resetBtn) resetBtn.addEventListener("click", function(){
      KEYS.forEach(function(k){
        values[k] = 0;
        const sl = el.querySelector("[data-ff='" + k + "']"); if (sl) sl.value = 0;
        const vl = el.querySelector("[data-ffval='" + k + "']"); if (vl) vl.textContent = "0";
      });
      sync();
      if (onChange) onChange();
    });
    return {
      values: values,
      active: active,
      matches: function(stats){
        if (!active()) return true;
        if (!stats) return false;
        for (var i = 0; i < KEYS.length; i++){ const k = KEYS[i]; if (values[k] > 0 && (stats[k] || 0) < values[k]) return false; }
        return true;
      },
      reset: function(){ if (resetBtn) resetBtn.click(); }
    };
  }

  return { KEYS: KEYS, LABELS: LABELS, barHtml: barHtml, mount: mount };
})();
