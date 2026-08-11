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
      padding: 0 16px;
      display: flex; align-items: center; gap: 14px;
      height: 48px; position: sticky; top: 0; z-index: 200; flex-shrink: 0;
    }
    .nav-menu-btn {
      background: none; border: none; cursor: pointer; padding: 0;
      width: 28px; height: 28px; display: flex; flex-direction: column;
      justify-content: center; gap: 5px; flex-shrink: 0;
    }
    .nav-menu-btn span { display: block; height: 2px; width: 20px; background: ${NAV_TEXT}; border-radius: 2px; transition: 0.2s; }
    .nav-brand { text-decoration: none; display: flex; align-items: center; gap: 8px; }
    .nav-mark { width: 18px; height: 18px; flex-shrink: 0; display: block; }
    .nav-wm {
      font-family: 'Avenir Next','Avenir','Nunito Sans',sans-serif;
      font-size: 12px; font-weight: 600; letter-spacing: 0.3em;
      text-transform: uppercase; color: ${NAV_WHITE}; padding-left: 0.3em;
    }
    .nav-stat { font-size: 10px; color: ${NAV_MUTED}; letter-spacing: 0.06em; margin-left: auto; display: flex; align-items: center; }

    /* ── Left drawer (unified mobile + desktop) ── */
    .nav-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 290; opacity: 0; pointer-events: none; transition: opacity 0.2s; }
    .nav-drawer-overlay.open { opacity: 1; pointer-events: auto; }
    .nav-drawer {
      position: fixed; top: 0; left: 0; height: 100%; width: 252px; max-width: 82vw;
      background: ${NAV_BG}; border-right: 1px solid ${NAV_BORDER}; z-index: 300;
      transform: translateX(-100%); transition: transform 0.22s ease;
      display: flex; flex-direction: column; padding: 6px 0 20px; overflow-y: auto;
    }
    .nav-drawer.open { transform: translateX(0); box-shadow: 2px 0 34px rgba(0,0,0,0.55); }
    .nav-drawer-head { padding: 16px 22px 14px; border-bottom: 1px solid ${NAV_BORDER}; margin-bottom: 6px; }
    .nav-drawer-link {
      display: block; padding: 13px 22px; font-size: 12px; letter-spacing: 0.12em;
      text-transform: uppercase; color: ${NAV_MUTED}; text-decoration: none;
      border-left: 3px solid transparent; transition: 0.15s;
    }
    .nav-drawer-link:hover { color: ${NAV_TEXT}; background: var(--surface2); }
    .nav-drawer-link.active { color: ${NAV_ACCENT}; border-left-color: ${NAV_ACCENT}; }
    .nav-drawer-divider { height: 1px; background: ${NAV_BORDER}; margin: 8px 22px; }
    @media (max-width: 768px) { .nav-stat { display: none; } }
  `;
  document.head.appendChild(style);

  // ── Determine current page ───────────────────────────────────────────────
  const page = location.pathname.split('/').pop() || 'today.html';
  const isOutfits   = page === 'outfits.html';
  const isProposals = page === 'outfit_proposals.html';
  const isShop      = page === 'shop.html';
  const isProfile   = page === 'profile.html';
  const isToday     = page === 'today.html';
  const isHistory   = page === 'history.html';
  const isClothing  = page === 'wardrobe.html';   // standalone clothing manager
  const isBuilder   = page === 'builder.html';

  // Nav destinations — one drawer, links everywhere. Today · Outfits · Wardrobe · Builder · History | Proposals · Shop · Profile.
  const LINKS = [
    { href:'today.html',            label:'Today',     active:isToday },
    { href:'outfits.html',          label:'Outfits',   active:isOutfits },
    { href:'wardrobe.html',         label:'Wardrobe',  active:isClothing },
    { href:'builder.html',          label:'Builder',   active:isBuilder },
    { href:'history.html',          label:'History',   active:isHistory },
    { divider:true },
    { href:'outfit_proposals.html', label:'Proposals', active:isProposals },
    { href:'shop.html',             label:'Shop',      active:isShop },
    { href:'profile.html',          label:'Profile',   active:isProfile }
  ];
  const drawerLinks = LINKS.map(function (l) {
    return l.divider ? "<div class='nav-drawer-divider'></div>"
      : "<a href='" + l.href + "' class='nav-drawer-link" + (l.active ? ' active' : '') + "'>" + l.label + "</a>";
  }).join('');
  const brandSvg = `<svg class="nav-mark" viewBox="0 0 100 100" fill="none" stroke="#e2d3b4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M50 20 C33 20 29 38 31 56 C33 74 42 84 50 84 C58 84 67 74 69 56 C71 38 67 20 50 20 Z" stroke-width="5" opacity="0.3" transform="translate(9 6)"/>
        <path d="M50 20 C33 20 29 38 31 56 C33 74 42 84 50 84 C58 84 67 74 69 56 C71 38 67 20 50 20 Z" stroke-width="5" opacity="0.6" transform="translate(3 2)"/>
        <path d="M50 20 C33 20 29 38 31 56 C33 74 42 84 50 84 C58 84 67 74 69 56 C71 38 67 20 50 20 Z" stroke-width="5" transform="translate(-4 -3)"/>
      </svg>`;

  // ── Top bar (menu button + brand + theme) ──
  const nav = document.createElement('nav');
  nav.className = 'app-nav';
  nav.innerHTML = `
    <button class="nav-menu-btn" id="nav-menu-btn" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <a href="today.html" class="nav-brand" aria-label="Alter">${brandSvg}<span class="nav-wm">Alter</span></a>
    <span class="nav-stat" id="nav-stat"></span>
    <button class="nav-theme" id="nav-theme" type="button" aria-label="Toggle light or dark theme"></button>
  `;
  document.body.insertBefore(nav, document.body.firstChild);

  // ── Left drawer ──
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-drawer-overlay'; navOverlay.id = 'nav-drawer-overlay';
  const navDrawer = document.createElement('aside');
  navDrawer.className = 'nav-drawer'; navDrawer.id = 'nav-drawer';
  navDrawer.innerHTML = `<div class="nav-drawer-head"><span class="nav-wm">Alter</span></div>${drawerLinks}`;
  document.body.appendChild(navOverlay);
  document.body.appendChild(navDrawer);

  const navMenuBtn = document.getElementById('nav-menu-btn');
  function navClose() { navDrawer.classList.remove('open'); navOverlay.classList.remove('open'); navMenuBtn.setAttribute('aria-expanded', 'false'); }
  function navToggle() {
    const open = !navDrawer.classList.contains('open');
    navDrawer.classList.toggle('open', open); navOverlay.classList.toggle('open', open);
    navMenuBtn.setAttribute('aria-expanded', String(open));
  }
  navMenuBtn.addEventListener('click', navToggle);
  navOverlay.addEventListener('click', navClose);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') navClose(); });

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
