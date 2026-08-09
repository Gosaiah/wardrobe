/* ALTER — shared detail modals.
   One implementation of the detail popups (outfit, clothing item, full-screen photo)
   so pages don't each re-declare the overlay markup + open/close/escape wiring. The
   CONTENT is built by the shared data.js builders (outfitDetailInfoHtml / outfitDetailPhotoHtml
   / itemDetailInfoHtml / itemDetailPhotoHtml); this module owns the shell.

   Load AFTER data.js. Relies on the shared .item-detail-overlay CSS (components.css /
   alter-theme.css) that pages already link.

   API:
     Modals.openItem(name, brand, opts)   — clothing-item popup (opts → itemDetailInfoHtml)
     Modals.openOutfit(outfit, opts)       — outfit popup. opts: { kicker, uploads, photoSrc, … }
                                             passed through to outfitDetailInfoHtml; photo
                                             resolves via opts.photoSrc → outfitPhotoSrc → collage.
     Modals.openPhoto(src, caption)        — top-most full-screen image viewer
     Modals.close(id) / Modals.closeTop()  — close a specific / the top-most open overlay

   Pages keep their own click wiring (so page state like `uploads` stays local) and just
   call these instead of bespoke local functions. Escape + backdrop close are handled here.
   NOTE: the History wear-detail popup will move here during the tab split. */
const Modals = (function(){
  var injected = false;
  // z-order: outfit (base) < wear < item (over both) < photo viewer (top-most)
  var Z = { "m-outfit": 1200, "m-wear": 1250, "m-item": 1300, "m-photo": 1500 };

  function el(id){ return document.getElementById(id); }

  function detailOverlay(id, photoId, infoId){
    return "<div class='item-detail-overlay' id='" + id + "' style='display:none;z-index:" + Z[id] + "'>" +
      "<div class='item-detail-panel'>" +
        "<button class='item-detail-close' aria-label='Close' data-modal-close='" + id + "'>&#x2715;</button>" +
        "<div class='item-detail-inner'>" +
          "<div class='item-detail-photo-col' id='" + photoId + "'></div>" +
          "<div class='item-detail-info-col' id='" + infoId + "'></div>" +
        "</div>" +
      "</div>" +
    "</div>";
  }
  function photoViewer(){
    return "<div id='m-photo' style='display:none;position:fixed;inset:0;z-index:" + Z["m-photo"] + ";background:rgba(0,0,0,0.9);align-items:center;justify-content:center;flex-direction:column;padding:24px'>" +
      "<button class='item-detail-close' aria-label='Close' data-modal-close='m-photo' style='position:absolute;top:16px;right:18px'>&#x2715;</button>" +
      "<img id='m-photo-img' alt='' style='max-width:94vw;max-height:82vh;object-fit:contain;border-radius:8px'>" +
      "<div id='m-photo-caption' style='margin-top:14px;font-size:12px;letter-spacing:0.08em;color:rgba(255,255,255,0.7)'></div>" +
    "</div>";
  }

  function inject(){
    if (injected) return;
    injected = true;
    var wrap = document.createElement("div");
    wrap.innerHTML =
      detailOverlay("m-outfit", "m-outfit-photo", "m-outfit-info") +
      detailOverlay("m-wear",   "m-wear-photo",   "m-wear-info") +
      detailOverlay("m-item",   "m-item-photo",   "m-item-info") +
      photoViewer();
    document.body.appendChild(wrap);
    // Close: the × buttons and backdrop clicks (delegated on the injected wrapper).
    wrap.addEventListener("click", function(e){
      var btn = e.target.closest("[data-modal-close]");
      if (btn){ close(btn.getAttribute("data-modal-close")); return; }
      if (e.target.classList && e.target.classList.contains("item-detail-overlay")) close(e.target.id);
      if (e.target.id === "m-photo") close("m-photo");
    });
  }

  function show(id){ inject(); var o = el(id); if (o) o.style.display = "flex"; }
  function close(id){ var o = el(id); if (o) o.style.display = "none"; }
  function isOpen(id){ var o = el(id); return o && o.style.display !== "none"; }
  function closeTop(){
    // highest z first
    if (isOpen("m-photo")) return close("m-photo");
    if (isOpen("m-item"))  return close("m-item");
    if (isOpen("m-wear"))  return close("m-wear");
    if (isOpen("m-outfit")) return close("m-outfit");
  }

  function openItem(name, brand, opts){
    inject();
    var it = (typeof itemForPiece === "function") ? itemForPiece({ name: name, brand: brand }) : null;
    if (!it) return;
    el("m-item-photo").innerHTML = (typeof itemDetailPhotoHtml === "function") ? itemDetailPhotoHtml(it) : "";
    el("m-item-info").innerHTML  = (typeof itemDetailInfoHtml === "function") ? itemDetailInfoHtml(it, opts || {}) : "";
    show("m-item");
  }

  function openOutfit(outfit, opts){
    inject();
    if (!outfit) return;
    close("m-item"); close("m-wear");   // the base outfit modal replaces any popup layered above it
    opts = opts || {};
    // Photo: explicit opts.photoSrc wins; else the generated/uploaded photo (unless a built
    // combo with no id); else the shared piece-collage / no-photo builder.
    var photo = (opts.photoSrc !== undefined) ? opts.photoSrc
      : (outfit._built ? "" : (typeof outfitPhotoSrc === "function" ? outfitPhotoSrc(outfit.id, opts.uploads) : ""));
    el("m-outfit-photo").innerHTML = photo
      ? "<div class='item-detail-photo'><img src='" + photo + "' alt='" + (outfit.name || "") + "' onerror=\"this.parentElement.innerHTML='';\"></div>"
      : ((typeof outfitDetailPhotoHtml === "function") ? outfitDetailPhotoHtml(outfit) : "");
    el("m-outfit-info").innerHTML = (typeof outfitDetailInfoHtml === "function") ? outfitDetailInfoHtml(outfit, opts) : "";
    show("m-outfit");
  }

  function openPhoto(src, caption){
    if (!src) return;
    inject();
    el("m-photo-img").src = src;
    el("m-photo-caption").textContent = caption || "";
    var o = el("m-photo"); if (o) o.style.display = "flex";
  }

  // Wear-detail popup (a logged wear). Self-contained via shared data.js helpers; the
  // outfit link swaps to the outfit modal, the submitted photo opens the viewer, and
  // piece clicks are handled by the page's own .piece-name-link listener (stacks over this).
  function openWear(wornEntry, opts){
    inject();
    if (!wornEntry) return;
    close("m-item"); close("m-outfit");   // wear-detail replaces the item/outfit popup it was opened from (it sits below them)
    opts = opts || {};
    var outfit = (wornEntry.outfitId != null && typeof _allOutfits === "function")
      ? _allOutfits().find(function(o){ return o.id === wornEntry.outfitId; }) : null;
    var gen = (outfit && typeof outfitPhotoSrc === "function") ? outfitPhotoSrc(outfit.id, opts.uploads) : "";
    var sub = wornEntry.photo || "";
    var photoHtml;
    if (gen){
      var overlay = sub
        ? "<div class='wear-submitted-overlay' style='position:absolute;bottom:16px;left:16px;width:22%;max-width:150px;aspect-ratio:3/4;border-radius:8px;overflow:hidden;border:2px solid rgba(255,255,255,0.35);box-shadow:0 4px 16px rgba(0,0,0,0.7);z-index:5;cursor:pointer'>" +
            "<img src='" + sub + "' style='width:100%;height:100%;object-fit:cover;object-position:top center;display:block'>" +
            "<div style='position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.6);font-size:7px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);padding:3px 5px;text-align:center'>Worn</div>" +
          "</div>" : "";
      photoHtml = "<div style='position:relative;width:100%;height:100%'><img src='" + gen + "' alt='" + (outfit ? outfit.name : "Outfit") + "' style='width:100%;height:100%;object-fit:cover;object-position:top center;display:block'>" + overlay + "</div>";
    } else if (sub){
      photoHtml = "<div class='item-detail-photo'><img src='" + sub + "' alt='Submitted photo'></div>";
    } else {
      photoHtml = "<div class='item-detail-photo-empty'><span>No photo</span></div>";
    }
    el("m-wear-photo").innerHTML = photoHtml;

    var roleMap = { top:"Top", bottom:"Bottom", outer:"Outer", shoes:"Shoes", accessory:"Accessory" };
    var pieces = (wornEntry.itemIds || []).map(function(id){
      var it = (typeof itemById === "function") ? itemById(id) : null;
      if (!it) return "";
      // Shared piece card (row view) — clickable, gold hover, one source with the suggestions.
      return (typeof pieceCardHtml === "function")
        ? pieceCardHtml({ name: it.name, brand: it.brand, role: roleMap[it.type] || "Piece" }, { view: "row" })
        : "";
    }).join("");

    var statsHtml = (outfit && typeof outfitStatsCompareHtml === "function") ? outfitStatsCompareHtml(outfit) : "";
    var linkHtml = outfit
      ? "<div class='wear-outfit-link' data-outfit-id='" + outfit.id + "' style='display:flex;align-items:center;gap:10px;margin-bottom:12px;cursor:pointer;padding:8px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)'>" +
          (gen ? "<img src='" + gen + "' style='width:44px;height:54px;object-fit:cover;object-position:top;border-radius:8px;flex-shrink:0'>" : "") +
          "<div><div style='font-size:11px;color:var(--text);font-weight:600'>" + outfit.name + "</div><div style='font-size:9px;color:var(--accent);font-style:italic'>" + (outfit.vibe || "") + "</div></div>" +
          "<div style='margin-left:auto;font-size:14px;color:var(--muted)'>&#x2192;</div>" +
        "</div>"
      : "<div style='font-size:12px;color:var(--muted);margin-bottom:12px'>Items Only</div>";
    var OCCASION_LABELS = { work:"Work", "night-out":"Night out", date:"Date", casual:"Casual", party:"Party", event:"Event" };
    var occHtml = wornEntry.occasion
      ? "<div class='wear-occasion' style='display:inline-block;margin-bottom:12px;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);border:1px solid var(--border);border-radius:999px;padding:3px 10px'>Worn to · " + (OCCASION_LABELS[wornEntry.occasion] || wornEntry.occasion) + "</div>"
      : "";
    el("m-wear-info").innerHTML =
      "<div class='item-detail-name'>" + (typeof fmtDate === "function" ? fmtDate(wornEntry.date) : wornEntry.date) + "</div>" +
      occHtml + linkHtml + statsHtml +
      "<div class='item-detail-section-title'>Pieces worn</div>" +
      "<div style='display:flex;flex-direction:column;gap:5px'>" + pieces + "</div>";

    var linkEl = el("m-wear-info").querySelector(".wear-outfit-link");
    if (linkEl && outfit) linkEl.addEventListener("click", function(){ openOutfit(outfit); });   // swaps (openOutfit closes m-wear)
    var ov = el("m-wear-photo").querySelector(".wear-submitted-overlay");
    if (ov && sub) ov.addEventListener("click", function(){ openPhoto(sub, "Submitted photo"); });
    show("m-wear");
  }

  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeTop(); });

  return { openItem: openItem, openOutfit: openOutfit, openPhoto: openPhoto, openWear: openWear, close: close, closeTop: closeTop };
})();
