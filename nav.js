(function () {
  // ── CSS ──────────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  // Pull from the shared theme tokens (alter-theme.css) so the nav flips with light/dark.
  const NAV_BG     = 'var(--bg)';
  const NAV_BORDER = 'var(--border)';
  const NAV_MUTED  = 'var(--muted)';
  const NAV_TEXT   = 'var(--text)';
  const NAV_ACCENT = 'var(--accent)';
  const NAV_WHITE  = 'var(--white)';

  style.textContent = `
    .app-nav {
      background: ${NAV_BG};
      border-bottom: 1px solid ${NAV_BORDER};
      padding: 0 24px;
      display: flex;
      align-items: stretch;
      height: 48px;
      position: sticky;
      top: 0;
      z-index: 200;
      flex-shrink: 0;
    }
    .nav-brand {
      text-decoration: none;
      display: flex; align-items: center; gap: 8px;
      padding-right: 20px; margin-right: 8px;
      border-right: 1px solid ${NAV_BORDER};
    }
    .nav-mark { width: 18px; height: 18px; flex-shrink: 0; display: block; }
    .nav-wm {
      font-family: 'Avenir Next','Avenir','Nunito Sans',sans-serif;
      font-size: 12px; font-weight: 600; letter-spacing: 0.3em;
      text-transform: uppercase; color: ${NAV_WHITE}; padding-left: 0.3em;
    }
    .nav-tab {
      background: none; border: none; border-bottom: 2px solid transparent;
      color: ${NAV_MUTED}; font-family: inherit; font-size: 10px;
      letter-spacing: 0.14em; text-transform: uppercase;
      padding: 0 14px; cursor: pointer; transition: all 0.15s;
      display: flex; align-items: center; flex-shrink: 0;
      height: 100%; text-decoration: none;
    }
    .nav-tab:hover { color: ${NAV_TEXT}; }
    .nav-tab.active { color: ${NAV_ACCENT}; border-bottom-color: ${NAV_ACCENT}; }
    .nav-divider { width: 1px; background: ${NAV_BORDER}; margin: 10px 4px; flex-shrink: 0; }
    .nav-link {
      font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
      color: ${NAV_MUTED}; text-decoration: none;
      display: flex; align-items: center;
      padding: 0 14px; border-bottom: 2px solid transparent; transition: color 0.15s;
    }
    .nav-link:hover { color: ${NAV_TEXT}; }
    .nav-link.active { color: ${NAV_ACCENT}; border-bottom-color: ${NAV_ACCENT}; }
    .nav-stat {
      font-size: 10px; color: ${NAV_MUTED}; letter-spacing: 0.06em;
      margin-left: auto; display: flex; align-items: center;
    }
    @media (max-width: 768px) {
      .app-nav { padding: 0 12px; overflow-x: auto; -webkit-overflow-scrolling: touch; gap: 0; }
      .app-nav::-webkit-scrollbar { display: none; }
      .nav-tab { padding: 0 12px; font-size: 10px; flex-shrink: 0; }
      .nav-link { padding: 0 12px; font-size: 10px; flex-shrink: 0; }
      .nav-stat { display: none; }
      .nav-brand { flex-shrink: 0; }
    }
    @media (max-width: 480px) {
      .nav-tab { padding: 0 10px; font-size: 9px; }
      .nav-link { padding: 0 10px; font-size: 9px; }
    }
  `;
  document.head.appendChild(style);

  // ── Determine current page ───────────────────────────────────────────────
  const page = location.pathname.split('/').pop() || 'wardrobe_v2_18.html';
  const isWardrobe  = page === 'wardrobe_v2_18.html';
  const isProposals = page === 'outfit_proposals.html';
  const isShop      = page === 'shop.html';
  const isProfile   = page === 'profile.html';
  const isToday     = page === 'today.html';

  // On wardrobe page: real buttons (existing JS handles tab switching).
  // On other pages: anchors that link back to wardrobe.
  const tabsHtml = isWardrobe
    ? `<button class="nav-tab" data-tab="board">Outfits</button>
       <button class="nav-tab" data-tab="wardrobe">Wardrobe</button>
       <button class="nav-tab" data-tab="picker">Builder</button>
       <button class="nav-tab" data-tab="history">History</button>`
    : `<a href="wardrobe_v2_18.html" class="nav-tab">Outfits</a>
       <a href="wardrobe_v2_18.html" class="nav-tab">Wardrobe</a>
       <a href="wardrobe_v2_18.html" class="nav-tab">Builder</a>
       <a href="wardrobe_v2_18.html" class="nav-tab">History</a>`;

  // ── Build nav ────────────────────────────────────────────────────────────
  const nav = document.createElement('nav');
  nav.className = 'app-nav';
  nav.innerHTML = `
    <a href="wardrobe_v2_18.html" class="nav-brand" aria-label="Alter">
      <svg class="nav-mark" viewBox="0 0 100 100" fill="none" stroke="#e2d3b4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M50 20 C33 20 29 38 31 56 C33 74 42 84 50 84 C58 84 67 74 69 56 C71 38 67 20 50 20 Z" stroke-width="5" opacity="0.3" transform="translate(9 6)"/>
        <path d="M50 20 C33 20 29 38 31 56 C33 74 42 84 50 84 C58 84 67 74 69 56 C71 38 67 20 50 20 Z" stroke-width="5" opacity="0.6" transform="translate(3 2)"/>
        <path d="M50 20 C33 20 29 38 31 56 C33 74 42 84 50 84 C58 84 67 74 69 56 C71 38 67 20 50 20 Z" stroke-width="5" transform="translate(-4 -3)"/>
      </svg>
      <span class="nav-wm">Alter</span>
    </a>
    <a href="today.html" class="nav-tab${isToday ? ' active' : ''}">Today</a>
    ${tabsHtml}
    <div class="nav-divider"></div>
    <a href="outfit_proposals.html" class="nav-link${isProposals ? ' active' : ''}">Proposals</a>
    <a href="shop.html" class="nav-link${isShop ? ' active' : ''}">Shop</a>
    <a href="profile.html" class="nav-link${isProfile ? ' active' : ''}">Profile</a>
    <span class="nav-stat" id="nav-stat"></span>
    <button class="nav-theme" id="nav-theme" type="button" aria-label="Toggle light or dark theme"></button>
  `;

  // Insert as first element in body
  document.body.insertBefore(nav, document.body.firstChild);

  // ── Broken images → themed placeholder (captures img load errors app-wide) ──
  document.addEventListener('error', function (e) {
    const t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.phDone) {
      t.dataset.phDone = '1';
      t.classList.add('img-ph');
      t.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
  }, true);

  // ── Light / dark theme toggle ─────────────────────────────────────────────
  const themeBtn = document.getElementById('nav-theme');
  function currentTheme() { return document.documentElement.getAttribute('data-theme') || 'dark'; }
  function paintThemeBtn() {
    const dark = currentTheme() === 'dark';
    themeBtn.textContent = dark ? '☀' : '☽';           // ☀ when dark (→light) / ☽ when light (→dark)
    themeBtn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  }
  themeBtn.addEventListener('click', function () {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('alter-theme', next); } catch (e) {}
    paintThemeBtn();
  });
  paintThemeBtn();

  // ── Splash screen (once per load; styled by alter-theme.css) ──────────────
  const splash = document.createElement('div');
  splash.id = 'alter-splash';
  splash.innerHTML = `
    <svg class="asp-mark" width="86" height="86" viewBox="0 0 100 100" fill="none" stroke="#e2d3b4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M50 20 C33 20 29 38 31 56 C33 74 42 84 50 84 C58 84 67 74 69 56 C71 38 67 20 50 20 Z" stroke-width="3.6" opacity="0.3" transform="translate(9 6)"/>
      <path d="M50 20 C33 20 29 38 31 56 C33 74 42 84 50 84 C58 84 67 74 69 56 C71 38 67 20 50 20 Z" stroke-width="3.6" opacity="0.6" transform="translate(3 2)"/>
      <path d="M50 20 C33 20 29 38 31 56 C33 74 42 84 50 84 C58 84 67 74 69 56 C71 38 67 20 50 20 Z" stroke-width="3.6" transform="translate(-4 -3)"/>
    </svg>
    <div style="display:flex;flex-direction:column;align-items:center;gap:9px">
      <div class="asp-wm">Alter</div>
      <div class="asp-tg">step into character</div>
    </div>`;
  document.body.appendChild(splash);
  setTimeout(function () { splash.style.display = 'none'; }, 2200);
})();
