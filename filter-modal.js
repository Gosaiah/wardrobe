/* ALTER — shared filter modal.
   A responsive "Filters" popup (bottom-sheet on phones, centered card on desktop) so the
   wardrobe + outfits filters work at any screen size instead of overflowing the toolbar.
   Self-contained: injects its own CSS. Load after data.js (uses theme tokens only).

   Usage:
     const fm = FilterModal.create({ title:"Filter pieces", onReset: resetFn });
     fm.body.appendChild(...);            // put the page's filter controls inside
     const btn = FilterModal.trigger("Filters"); toolbar.appendChild(btn);
     btn.addEventListener("click", fm.open);
     btn.setCount(n);                     // active-filter badge
*/
const FilterModal = (function(){
  var styled = false;
  function injectCss(){
    if (styled) return; styled = true;
    var css =
      ".fm-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.62);z-index:1400;display:none;align-items:flex-end;justify-content:center;}" +
      ".fm-overlay.open{display:flex;}" +
      ".fm-panel{background:var(--surface);border:1px solid var(--border);width:100%;max-width:520px;max-height:86vh;display:flex;flex-direction:column;border-radius:16px 16px 0 0;box-shadow:0 -8px 40px rgba(0,0,0,0.5);}" +
      "@media(min-width:700px){.fm-overlay{align-items:center;}.fm-panel{border-radius:12px;box-shadow:0 12px 48px rgba(0,0,0,0.6);}}" +
      ".fm-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border);flex-shrink:0;}" +
      ".fm-title{font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--white);}" +
      ".fm-x{background:none;border:none;color:var(--muted);font-size:17px;cursor:pointer;line-height:1;padding:2px 4px;}" +
      ".fm-body{padding:18px 20px;overflow:auto;display:flex;flex-direction:column;gap:20px;flex:1;}" +
      ".fm-footer{display:flex;gap:10px;padding:14px 20px;border-top:1px solid var(--border);flex-shrink:0;}" +
      ".fm-footer button{flex:1;padding:12px;border-radius:8px;font-family:inherit;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;cursor:pointer;}" +
      ".fm-reset{background:none;border:1px solid var(--border);color:var(--muted);}" +
      ".fm-done{background:var(--accent);border:none;color:var(--on-accent,#000);font-weight:700;}" +
      ".fm-trigger{position:relative;}" +
      ".fm-trigger .fm-count{background:var(--accent);color:var(--on-accent,#000);border-radius:999px;padding:0 6px;font-size:9px;font-weight:700;margin-left:5px;vertical-align:middle;}" +
      ".fm-row{display:flex;flex-direction:column;gap:7px;}" +
      ".fm-row>.fm-label{font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);}" +
      ".fm-row select{width:100%;background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:10px 12px;font-size:13px;border-radius:8px;font-family:inherit;}" +
      ".fm-group>.fm-label{display:block;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:9px;}" +
      ".fm-chips{display:flex;gap:6px;flex-wrap:wrap;}";
    var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
  }

  function create(opts){
    injectCss(); opts = opts || {};
    var ov = document.createElement("div"); ov.className = "fm-overlay";
    ov.innerHTML =
      "<div class='fm-panel' role='dialog' aria-modal='true'>" +
        "<div class='fm-header'><span class='fm-title'>" + (opts.title || "Filters") + "</span>" +
          "<button class='fm-x' aria-label='Close'>&#x2715;</button></div>" +
        "<div class='fm-body'></div>" +
        "<div class='fm-footer'>" + (opts.onReset ? "<button class='fm-reset'>Reset all</button>" : "") +
          "<button class='fm-done'>Done</button></div>" +
      "</div>";
    document.body.appendChild(ov);
    var body = ov.querySelector(".fm-body");
    function open(){ ov.classList.add("open"); }
    function close(){ ov.classList.remove("open"); }
    ov.addEventListener("click", function(e){
      if (e.target === ov || (e.target.closest && e.target.closest(".fm-x, .fm-done"))) close();
    });
    if (opts.onReset){ ov.querySelector(".fm-reset").addEventListener("click", function(){ opts.onReset(); }); }
    document.addEventListener("keydown", function(e){ if (e.key === "Escape" && ov.classList.contains("open")) close(); });
    return { open: open, close: close, body: body, overlay: ov };
  }

  // A styled trigger button with an active-count badge. Caller wires the click + calls setCount.
  function trigger(label){
    var b = document.createElement("button");
    b.type = "button"; b.className = "fm-trigger filter-btn";
    b.innerHTML = (label || "Filters") + " <span class='fm-count' style='display:none'></span>";
    b.setCount = function(n){ var c = b.querySelector(".fm-count"); if (n > 0){ c.textContent = n; c.style.display = ""; } else { c.style.display = "none"; } };
    return b;
  }

  // Helper: a labeled column row wrapping an existing control (moves the element in).
  function row(label, el){
    var r = document.createElement("div"); r.className = "fm-row";
    var s = document.createElement("span"); s.className = "fm-label"; s.textContent = label;
    r.appendChild(s); if (el) r.appendChild(el); return r;
  }

  return { create: create, trigger: trigger, row: row };
})();
