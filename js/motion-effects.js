(function enhanceMotionEffects() {
  const root = document.getElementById('root');
  if (!root) return;

  const state = {
    observer: null,
    backToTop: null,
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderArrowIcon() {
    return '<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>';
  }

  function getCurrentLang() {
    return document.querySelector('#root [lang]')?.getAttribute('lang') || 'bn';
  }

  function t(bn, en) {
    return getCurrentLang() === 'bn' ? bn : en;
  }

  function ensureBackToTopButton() {
    if (state.backToTop && document.body.contains(state.backToTop)) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', t('উপরে যান', 'Back to top'));
    button.innerHTML = renderArrowIcon();
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    document.body.appendChild(button);
    state.backToTop = button;
  }

  function updateBackToTopVisibility() {
    if (!state.backToTop) return;
    state.backToTop.classList.toggle('is-visible', window.scrollY > 420);
  }

  function disconnectObserver() {
    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }
  }

  function prepareRevealItems() {
    const items = Array.from(document.querySelectorAll('.reveal'));
    items.forEach((item, index) => {
      item.dataset.revealDelay = String(index % 4);
      item.classList.remove('is-visible');
    });
    return items;
  }

  function revealWithoutAnimation(items) {
    items.forEach((item) => item.classList.add('is-visible'));
  }

  function setupScrollReveal() {
    const items = prepareRevealItems();

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealWithoutAnimation(items);
      return;
    }

    disconnectObserver();
    state.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        state.observer.unobserve(entry.target);
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    });

    items.forEach((item) => state.observer.observe(item));
  }

  function enhance() {
    document.documentElement.classList.add('js-motion-enabled');
    ensureBackToTopButton();
    setupScrollReveal();
    updateBackToTopVisibility();
  }

  function bindGlobalEventsOnce() {
    if (document.body.dataset.motionEffectsBound === 'true') return;
    document.body.dataset.motionEffectsBound = 'true';

    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
  }

  function observeAppRerenders() {
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(enhance);
    });
    observer.observe(root, { childList: true, subtree: false });
  }

  window.addEventListener('DOMContentLoaded', () => {
    enhance();
    bindGlobalEventsOnce();
    observeAppRerenders();
  });
})();
