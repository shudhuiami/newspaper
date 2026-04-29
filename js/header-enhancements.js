(function enhanceHeaderExperience() {
  const root = document.getElementById('root');
  if (!root) return;

  const state = {
    observer: null,
  };

  const icon = {
    search: '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>',
    menu: '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path></svg>',
    close: '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
    arrow: '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>',
  };

  function getCurrentLang() {
    return document.querySelector('#root [lang]')?.getAttribute('lang') || 'bn';
  }

  function t(bn, en) {
    return getCurrentLang() === 'bn' ? bn : en;
  }

  function getNavLabels() {
    return Array.from(document.querySelectorAll('.catnav a')).map((link) => ({
      text: link.textContent.trim(),
      active: link.classList.contains('active'),
    }));
  }

  function closeAll() {
    document.querySelector('.search-overlay')?.classList.remove('is-open');
    document.querySelector('.mobile-drawer')?.classList.remove('is-open');
    document.body.classList.remove('overlay-open');
  }

  function openSearchOverlay() {
    const overlay = document.querySelector('.search-overlay');
    if (!overlay) return;
    closeAll();
    overlay.classList.add('is-open');
    document.body.classList.add('overlay-open');
    window.setTimeout(() => overlay.querySelector('input')?.focus(), 60);
  }

  function openMobileDrawer() {
    const drawer = document.querySelector('.mobile-drawer');
    if (!drawer) return;
    closeAll();
    drawer.classList.add('is-open');
    document.body.classList.add('overlay-open');
    window.setTimeout(() => drawer.querySelector('a, button')?.focus(), 60);
  }

  function runDummySearch(value) {
    const query = value.trim();
    window.alert(
      getCurrentLang() === 'bn'
        ? `ডামি সার্চ করা হয়েছে: ${query || 'খালি'}`
        : `Dummy search submitted: ${query || 'empty'}`
    );
  }

  function renderSearchOverlay() {
    const labels = getNavLabels().slice(0, 6);
    const suggestions = labels.length ? labels : [
      { text: t('জাতীয়', 'National') },
      { text: t('রাজনীতি', 'Politics') },
      { text: t('খেলা', 'Sports') },
      { text: t('অর্থনীতি', 'Economy') },
    ];

    return `
      <div class="search-overlay" role="dialog" aria-modal="true" aria-label="${t('সার্চ', 'Search')}">
        <div class="search-overlay-backdrop" data-close-overlays></div>
        <div class="search-overlay-panel">
          <div class="search-overlay-head">
            <h2>${t('খবর খুঁজুন', 'Search news')}</h2>
            <button class="search-overlay-close" type="button" aria-label="${t('বন্ধ করুন', 'Close search')}" data-close-overlays>${icon.close}</button>
          </div>
          <div class="search-overlay-body">
            <form class="search-overlay-form">
              <label class="search-overlay-field">
                ${icon.search}
                <input type="search" placeholder="${t('বিষয়, বিভাগ বা কীওয়ার্ড লিখুন', 'Type topic, category, or keyword')}" aria-label="${t('সার্চ কীওয়ার্ড', 'Search keyword')}">
              </label>
            </form>
            <div class="search-suggestions" aria-label="${t('জনপ্রিয় সার্চ', 'Popular searches')}">
              ${suggestions.map((item) => `<button class="search-suggestion" type="button">${item.text}</button>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderMobileDrawer() {
    const labels = getNavLabels();
    return `
      <div class="mobile-drawer" role="dialog" aria-modal="true" aria-label="${t('মোবাইল মেনু', 'Mobile menu')}">
        <div class="drawer-backdrop" data-close-overlays></div>
        <aside class="drawer-panel">
          <div class="drawer-head">
            <div class="drawer-brand">${t('খবর মেনু', 'Khobor Menu')}</div>
            <button class="drawer-close" type="button" aria-label="${t('মেনু বন্ধ করুন', 'Close menu')}" data-close-overlays>${icon.close}</button>
          </div>
          <nav class="drawer-nav" aria-label="${t('মোবাইল বিভাগ', 'Mobile categories')}">
            ${labels.map((item, index) => `
              <a href="#" data-drawer-nav-index="${index}" class="${item.active ? 'active' : ''}">
                <span>${item.text}</span>
                ${icon.arrow}
              </a>
            `).join('')}
          </nav>
          <div class="drawer-note">
            ${t('এটি একটি স্ট্যাটিক প্রিভিউ। মেনু ও সার্চ ইন্টারঅ্যাকশন ডামি আচরণ দেখায়।', 'This is a static preview. Menu and search interactions show dummy behavior.')}
          </div>
        </aside>
      </div>
    `;
  }

  function injectHeaderControls() {
    const mastheadActions = document.querySelector('.masthead .actions');
    if (!mastheadActions || mastheadActions.dataset.enhanced === 'true') return;

    const searchButton = document.createElement('button');
    searchButton.type = 'button';
    searchButton.className = 'header-icon-button search-overlay-trigger';
    searchButton.setAttribute('aria-label', t('সার্চ খুলুন', 'Open search'));
    searchButton.innerHTML = icon.search;

    const menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'header-icon-button mobile-menu-trigger';
    menuButton.setAttribute('aria-label', t('মোবাইল মেনু খুলুন', 'Open mobile menu'));
    menuButton.innerHTML = icon.menu;

    mastheadActions.prepend(searchButton);
    mastheadActions.append(menuButton);
    mastheadActions.dataset.enhanced = 'true';
  }

  function injectOverlays() {
    document.querySelector('.search-overlay')?.remove();
    document.querySelector('.mobile-drawer')?.remove();
    document.body.insertAdjacentHTML('beforeend', renderSearchOverlay());
    document.body.insertAdjacentHTML('beforeend', renderMobileDrawer());
  }

  function bindEnhancementEvents() {
    document.querySelectorAll('.search-overlay-trigger').forEach((button) => {
      button.addEventListener('click', openSearchOverlay);
    });

    document.querySelectorAll('.mobile-menu-trigger').forEach((button) => {
      button.addEventListener('click', openMobileDrawer);
    });

    document.querySelectorAll('[data-close-overlays]').forEach((el) => {
      el.addEventListener('click', closeAll);
    });

    document.querySelector('.search-overlay-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = event.currentTarget.querySelector('input');
      runDummySearch(input?.value || '');
      closeAll();
    });

    document.querySelectorAll('.search-suggestion').forEach((button) => {
      button.addEventListener('click', () => {
        runDummySearch(button.textContent || '');
        closeAll();
      });
    });

    document.querySelectorAll('[data-drawer-nav-index]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const index = link.getAttribute('data-drawer-nav-index');
        document.querySelector(`.catnav a[data-nav-index="${index}"]`)?.click();
        closeAll();
      });
    });
  }

  function bindGlobalEventsOnce() {
    if (document.body.dataset.headerEnhancementsBound === 'true') return;
    document.body.dataset.headerEnhancementsBound = 'true';

    window.addEventListener('scroll', () => {
      document.querySelector('.masthead')?.classList.toggle('is-scrolled', window.scrollY > 24);
    }, { passive: true });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeAll();
    });
  }

  function enhance() {
    injectHeaderControls();
    injectOverlays();
    bindEnhancementEvents();
    bindGlobalEventsOnce();
  }

  function observeAppRerenders() {
    if (state.observer) return;
    state.observer = new MutationObserver(() => {
      window.requestAnimationFrame(enhance);
    });
    state.observer.observe(root, { childList: true, subtree: false });
  }

  window.addEventListener('DOMContentLoaded', () => {
    enhance();
    observeAppRerenders();
  });
})();
