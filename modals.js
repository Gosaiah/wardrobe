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
  // z-order: outfit (base) < item (over outfit) < photo viewer (top-most)
  var Z = { "m-outfit": 1200, "m-item": 1300, "m-photo": 1500 };

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

  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeTop(); });

  return { openItem: openItem, openOutfit: openOutfit, openPhoto: openPhoto, close: close, closeTop: closeTop };
})();
