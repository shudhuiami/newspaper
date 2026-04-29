(function enhancePagePreviews() {
  const root = document.getElementById('root');
  const data = window.KHOBOR_DATA || {};
  if (!root || !data) return;

  const state = {
    observer: null,
    isRenderingPreview: false,
  };

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function currentLang() {
    return document.querySelector('#root [lang]')?.getAttribute('lang') || 'bn';
  }

  function currentData() {
    const lang = currentLang();
    return data[lang] || data.bn || data.en || {};
  }

  function t(bn, en) {
    return currentLang() === 'bn' ? bn : en;
  }

  function normalizeArticle(item = {}, sectionName = '') {
    return {
      eyebrow: item.eyebrow || sectionName,
      title: item.title || '',
      lede: item.lede || '',
      meta: item.meta || '',
      tone: item.tone || ['#5a3a40', '#1a0d10'],
      image: item.image || '',
    };
  }

  function collectArticles(dataset) {
    const articles = [];
    if (dataset.hero) articles.push(normalizeArticle(dataset.hero, dataset.nav?.[0] || ''));
    (dataset.heroSide || []).forEach((item) => articles.push(normalizeArticle(item, item.eyebrow)));
    (dataset.sections || []).forEach((section) => {
      if (section.feature) articles.push(normalizeArticle(section.feature, section.name));
      (section.list || []).forEach((item) => articles.push(normalizeArticle(item, section.name)));
      (section.cards || []).forEach((item) => articles.push(normalizeArticle(item, section.name)));
    });
    return articles;
  }

  function gradient(tone) {
    const values = Array.isArray(tone) && tone.length >= 2 ? tone : ['#5a3a40', '#1a0d10'];
    return `linear-gradient(135deg, ${values[0]}, ${values[1]})`;
  }

  function icon(name) {
    const icons = {
      arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
      search: '<circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path>',
      user: '<path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle>',
      share: '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 10.8 6.8-4.1"></path><path d="m8.6 13.2 6.8 4.1"></path>',
      bookmark: '<path d="M6 3h12v18l-6-4-6 4z"></path>',
      filter: '<path d="M4 6h16"></path><path d="M7 12h10"></path><path d="M10 18h4"></path>',
    };
    return `<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
  }

  function imageBlock(article, className = '') {
    const toneBg = gradient(article.tone);
    const label = `${t('ছবির প্রিভিউ', 'Image preview')}: ${article.title}`;
    if (article.image) {
      return `<div class="img ${className} img-has-photo" role="img" aria-label="${esc(label)}" style="background:${toneBg}">
        <img src="${esc(article.image)}" alt="${esc(article.title)}" class="card-photo" loading="lazy" decoding="async" width="960" height="600">
      </div>`;
    }
    return `<div class="img ${className}" role="img" aria-label="${esc(label)}" style="background:${toneBg}"></div>`;
  }

  function previewNav(active) {
    const items = [
      ['home', t('হোম', 'Home'), '#home'],
      ['article', t('আর্টিকেল', 'Article'), '#article'],
      ['category', t('ক্যাটাগরি', 'Category'), '#category'],
      ['search', t('সার্চ ফলাফল', 'Search Results'), '#search'],
    ];

    return `
      <div class="wrap preview-nav-wrap">
        <nav class="preview-nav" aria-label="${esc(t('প্রিভিউ পেজ', 'Preview pages'))}">
          ${items.map(([key, label, href]) => `
            <a href="${href}" class="${key === active ? 'active' : ''}" ${key === active ? 'aria-current="page"' : ''}>${esc(label)}</a>
          `).join('')}
        </nav>
      </div>
    `;
  }

  function compactCard(article, index = 0) {
    return `
      <article class="preview-card reveal" style="--preview-index:${index}">
        <div class="preview-card-image">${imageBlock(article)}</div>
        <div class="preview-card-body">
          <div class="eyebrow">${esc(article.eyebrow)}</div>
          <h3>${esc(article.title)}</h3>
          <p>${esc(article.lede || t('সংক্ষিপ্ত সংবাদ সারাংশ ও প্রাসঙ্গিক তথ্য।', 'Short story summary with relevant context.'))}</p>
          <div class="meta story-meta">${esc(article.meta)}</div>
        </div>
      </article>
    `;
  }

  function renderArticlePage(dataset, articles) {
    const article = articles[0] || normalizeArticle(dataset.hero || {});
    const related = articles.slice(1, 5);
    const paragraphs = currentLang() === 'bn'
      ? [
          'এই স্ট্যাটিক আর্টিকেল প্রিভিউটি দেখায় কীভাবে একটি পূর্ণাঙ্গ সংবাদ পড়ার পৃষ্ঠা সাজানো যেতে পারে। এখানে শিরোনাম, লিড, লেখক তথ্য, শেয়ার অ্যাকশন এবং দীর্ঘ পাঠের জন্য স্বচ্ছ টাইপোগ্রাফি রাখা হয়েছে।',
          'পাঠকের মনোযোগ ধরে রাখতে ছবির জায়গা, অনুচ্ছেদের ব্যবধান, উদ্ধৃতি এবং সম্পর্কিত খবরের অংশকে আলাদা গুরুত্ব দেওয়া হয়েছে। ডিজাইনটি বাংলা কনটেন্টের জন্য বড় লাইন-হাইট ও আরামদায়ক পাঠ অভিজ্ঞতা বজায় রাখে।',
          'এটি কোনো বাস্তব রাউটিং বা ব্যাকএন্ড ব্যবহার করে না। হ্যাশ-ভিত্তিক স্টেট দিয়ে শুধু UI preview দেখানো হচ্ছে, যাতে ভবিষ্যতের ডেভেলপমেন্টের আগে ভিজ্যুয়াল দিক পরিষ্কার থাকে।',
        ]
      : [
          'This static article preview shows how a complete editorial reading page can look. It includes headline hierarchy, a strong lead, author metadata, share actions, and comfortable long-form typography.',
          'The layout gives clear weight to the image area, paragraph rhythm, quotes, and related stories. It keeps the reading experience calm and suitable for Bangla-first content.',
          'No real routing or backend is used here. The preview is simulated through hash-based state so the UI direction is clear before future development work.',
        ];

    return `
      <main class="preview-page article-preview-page">
        ${previewNav('article')}
        <article class="wrap article-preview">
          <div class="article-preview-header">
            <div class="eyebrow">${esc(article.eyebrow)}</div>
            <h1>${esc(article.title)}</h1>
            <p>${esc(article.lede)}</p>
            <div class="article-meta-row">
              <span>${icon('user')} ${esc(t('খবর ডেস্ক', 'Khobor Desk'))}</span>
              <span>${esc(article.meta)}</span>
              <div class="article-actions" aria-label="${esc(t('আর্টিকেল অ্যাকশন', 'Article actions'))}">
                <button type="button" aria-label="${esc(t('সংরক্ষণ করুন', 'Bookmark article'))}">${icon('bookmark')}</button>
                <button type="button" aria-label="${esc(t('শেয়ার করুন', 'Share article'))}">${icon('share')}</button>
              </div>
            </div>
          </div>
          <div class="article-preview-image">${imageBlock(article, 'article-hero-image')}</div>
          <div class="article-preview-grid">
            <div class="article-body-copy">
              ${paragraphs.map((paragraph, index) => index === 1
                ? `<blockquote>${esc(t('বিশ্বাসযোগ্য সংবাদ অভিজ্ঞতার জন্য পাঠযোগ্যতা, প্রেক্ষাপট এবং গতি—তিনটিই গুরুত্বপূর্ণ।', 'Readability, context, and rhythm all matter for a trustworthy news experience.'))}</blockquote><p>${esc(paragraph)}</p>`
                : `<p>${esc(paragraph)}</p>`).join('')}
            </div>
            <aside class="related-panel" aria-label="${esc(t('সম্পর্কিত খবর', 'Related stories'))}">
              <h2>${esc(t('সম্পর্কিত খবর', 'Related stories'))}</h2>
              ${related.map((item, index) => compactCard(item, index)).join('')}
            </aside>
          </div>
        </article>
      </main>
    `;
  }

  function renderCategoryPage(dataset, articles) {
    const categoryName = dataset.nav?.[0] || t('জাতীয়', 'National');
    const lead = articles[1] || articles[0] || normalizeArticle(dataset.hero || {});
    const list = articles.slice(2, 11);

    return `
      <main class="preview-page category-preview-page">
        ${previewNav('category')}
        <section class="wrap category-preview" aria-labelledby="category-preview-title">
          <div class="preview-page-head">
            <span class="section-kicker">${esc(t('ক্যাটাগরি প্রিভিউ', 'Category Preview'))}</span>
            <h1 id="category-preview-title">${esc(categoryName)}</h1>
            <p>${esc(t('একটি ক্যাটাগরি ল্যান্ডিং পেজে প্রধান খবর, দ্রুত তালিকা, ফিল্টার এবং গ্রিড কনটেন্ট কীভাবে দেখা যাবে তার স্ট্যাটিক প্রিভিউ।', 'A static preview of how a category landing page can show a lead story, quick list, filters, and grid content.'))}</p>
          </div>
          <div class="category-filter-row" aria-label="${esc(t('ক্যাটাগরি ফিল্টার', 'Category filters'))}">
            <button type="button" class="active">${icon('filter')} ${esc(t('সর্বশেষ', 'Latest'))}</button>
            <button type="button">${esc(t('জনপ্রিয়', 'Popular'))}</button>
            <button type="button">${esc(t('বিশ্লেষণ', 'Analysis'))}</button>
            <button type="button">${esc(t('ভিডিও', 'Video'))}</button>
          </div>
          <div class="category-preview-grid">
            <article class="category-lead-card reveal">
              ${imageBlock(lead)}
              <div>
                <div class="eyebrow">${esc(lead.eyebrow)}</div>
                <h2>${esc(lead.title)}</h2>
                <p>${esc(lead.lede)}</p>
                <div class="meta story-meta">${esc(lead.meta)}</div>
              </div>
            </article>
            <div class="category-list-stack">
              ${list.slice(0, 4).map((item, index) => compactCard(item, index)).join('')}
            </div>
          </div>
          <div class="category-card-grid">
            ${list.slice(4).map((item, index) => compactCard(item, index)).join('')}
          </div>
        </section>
      </main>
    `;
  }

  function renderSearchPage(dataset, articles) {
    const results = articles.slice(0, 8);
    const query = currentLang() === 'bn' ? 'বাংলাদেশ' : 'Bangladesh';

    return `
      <main class="preview-page search-preview-page">
        ${previewNav('search')}
        <section class="wrap search-preview" aria-labelledby="search-preview-title">
          <div class="preview-page-head compact">
            <span class="section-kicker">${esc(t('সার্চ প্রিভিউ', 'Search Preview'))}</span>
            <h1 id="search-preview-title">${esc(t('সার্চ ফলাফল', 'Search Results'))}</h1>
            <p>${esc(t(`“${query}” এর জন্য ডামি সার্চ ফলাফল`, `Dummy search results for “${query}”`))}</p>
          </div>
          <form class="search-results-box" aria-label="${esc(t('সার্চ ফলাফল ফর্ম', 'Search results form'))}">
            <label>
              ${icon('search')}
              <input type="search" value="${esc(query)}" aria-label="${esc(t('সার্চ কীওয়ার্ড', 'Search keyword'))}">
            </label>
            <button type="button">${esc(t('সার্চ', 'Search'))}</button>
          </form>
          <div class="search-meta-line">${esc(t(`${results.length}টি ফলাফল দেখানো হচ্ছে`, `Showing ${results.length} results`))}</div>
          <div class="search-results-list">
            ${results.map((item, index) => `
              <article class="search-result-item reveal">
                <div class="search-result-number">${String(index + 1).padStart(2, '0')}</div>
                <div>
                  <div class="eyebrow">${esc(item.eyebrow)}</div>
                  <h2>${esc(item.title)}</h2>
                  <p>${esc(item.lede || t('সার্চ ফলাফলের জন্য সংক্ষিপ্ত কনটেন্ট প্রিভিউ।', 'Short content preview for this search result.'))}</p>
                  <div class="meta story-meta">${esc(item.meta)}</div>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      </main>
    `;
  }

  function activePreview() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return ['article', 'category', 'search'].includes(hash) ? hash : '';
  }

  function renderPreviewIfNeeded() {
    if (state.isRenderingPreview) return;
    const preview = activePreview();
    if (!preview) return;

    const dataset = currentData();
    const articles = collectArticles(dataset);
    const oldMain = root.querySelector('main');
    if (!oldMain) return;

    state.isRenderingPreview = true;
    const html = preview === 'article'
      ? renderArticlePage(dataset, articles)
      : preview === 'category'
        ? renderCategoryPage(dataset, articles)
        : renderSearchPage(dataset, articles);

    oldMain.outerHTML = html;
    window.requestAnimationFrame(() => {
      document.dispatchEvent(new CustomEvent('khobor:preview-rendered'));
      state.isRenderingPreview = false;
    });
  }

  function observeAppRerenders() {
    if (state.observer) return;
    state.observer = new MutationObserver(() => {
      window.requestAnimationFrame(renderPreviewIfNeeded);
    });
    state.observer.observe(root, { childList: true, subtree: false });
  }

  window.addEventListener('DOMContentLoaded', () => {
    renderPreviewIfNeeded();
    observeAppRerenders();
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#home') {
      window.location.hash = '';
      window.location.reload();
      return;
    }
    renderPreviewIfNeeded();
  });
})();
