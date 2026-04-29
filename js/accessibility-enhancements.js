(function enhanceAccessibility() {
  const root = document.getElementById('root');
  if (!root) return;

  function getCurrentLang() {
    return document.querySelector('#root [lang]')?.getAttribute('lang') || 'bn';
  }

  function t(bn, en) {
    return getCurrentLang() === 'bn' ? bn : en;
  }

  function labelImagePlaceholders() {
    document.querySelectorAll('.img').forEach((imageBlock) => {
      if (imageBlock.hasAttribute('aria-label')) return;

      const story = imageBlock.closest('article, section, .video-item, .gallery-card');
      const title = story?.querySelector('h1, h2, h3, h4')?.textContent?.trim();
      const label = title
        ? t(`ছবির প্রিভিউ: ${title}`, `Image preview: ${title}`)
        : t('সংবাদ ছবির প্রিভিউ', 'News image preview');

      imageBlock.setAttribute('role', 'img');
      imageBlock.setAttribute('aria-label', label);
    });
  }

  function syncActiveNavigationState() {
    document.querySelectorAll('.catnav a, .drawer-nav a, .preview-nav a').forEach((link) => {
      if (link.classList.contains('active')) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function improveSectionLabels() {
    document.querySelectorAll('section').forEach((section, index) => {
      if (section.hasAttribute('aria-label') || section.hasAttribute('aria-labelledby')) return;
      const heading = section.querySelector('h1, h2, h3');
      if (!heading) return;

      if (!heading.id) heading.id = `section-heading-${index + 1}`;
      section.setAttribute('aria-labelledby', heading.id);
    });
  }

  function enhance() {
    labelImagePlaceholders();
    syncActiveNavigationState();
    improveSectionLabels();
  }

  function observeAppRerenders() {
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(enhance);
    });
    observer.observe(root, { childList: true, subtree: false });
  }

  window.addEventListener('DOMContentLoaded', () => {
    enhance();
    observeAppRerenders();
  });

  document.addEventListener('khobor:preview-rendered', () => {
    window.requestAnimationFrame(enhance);
  });
})();
