(function enhanceRemainingPagePreviews() {
  const root = document.getElementById('root');
  const data = window.KHOBOR_DATA || {};
  if (!root || !data) return;

  const state = { isRendering: false };
  const routes = [
    'latest', 'popular', 'videos', 'gallery', 'opinion', 'archive',
    'login', 'account', 'newsletter', 'subscribe', 'contact', 'about',
    'advertise', 'privacy', 'terms', '404', 'empty', 'loading'
  ];

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
      mail: '<path d="M4 6h16v12H4z"></path><path d="m4 7 8 6 8-6"></path>',
      play: '<path d="m9 7 8 5-8 5z"></path>',
      image: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="8" cy="10" r="2"></circle><path d="m21 15-5-5L5 21"></path>',
      calendar: '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M8 2v4"></path><path d="M16 2v4"></path><path d="M3 10h18"></path>',
      filter: '<path d="M4 6h16"></path><path d="M7 12h10"></path><path d="M10 18h4"></path>',
      alert: '<path d="M10.3 3.7 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>',
    };
    return `<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
  }

  function imageBlock(article, className = '') {
    return `<div class="img ${esc(className)}" role="img" aria-label="${esc(t('ছবির প্রিভিউ', 'Image preview'))}: ${esc(article.title)}" style="background:${gradient(article.tone)}"></div>`;
  }

  function routeHash() {
    return window.location.hash.replace('#', '').toLowerCase();
  }

  function isRemainingRoute(route) {
    return routes.includes(route);
  }

  function previewNav(active) {
    const navGroups = [
      ['home', t('হোম', 'Home'), '#home'],
      ['latest', t('সর্বশেষ', 'Latest'), '#latest'],
      ['popular', t('জনপ্রিয়', 'Popular'), '#popular'],
      ['videos', t('ভিডিও', 'Videos'), '#videos'],
      ['gallery', t('ছবিঘর', 'Gallery'), '#gallery'],
      ['opinion', t('মতামত', 'Opinion'), '#opinion'],
      ['archive', t('আর্কাইভ', 'Archive'), '#archive'],
      ['login', t('অ্যাকাউন্ট', 'Account'), '#login'],
      ['newsletter', t('নিউজলেটার', 'Newsletter'), '#newsletter'],
      ['contact', t('যোগাযোগ', 'Contact'), '#contact'],
      ['about', t('আমাদের সম্পর্কে', 'About'), '#about'],
      ['advertise', t('বিজ্ঞাপন', 'Advertise'), '#advertise'],
      ['privacy', t('নীতিমালা', 'Policies'), '#privacy'],
    ];

    return `
      <div class="wrap preview-nav-wrap remaining-nav-wrap">
        <nav class="preview-nav remaining-preview-nav" aria-label="${esc(t('সব পেজ প্রিভিউ', 'All page previews'))}">
          ${navGroups.map(([key, label, href]) => `
            <a href="${href}" class="${key === active || (active === 'account' && key === 'login') || (active === 'subscribe' && key === 'newsletter') || (active === 'terms' && key === 'privacy') ? 'active' : ''}" ${key === active ? 'aria-current="page"' : ''}>${esc(label)}</a>
          `).join('')}
        </nav>
      </div>
    `;
  }

  function pageHead(route, kicker, title, description) {
    return `
      ${previewNav(route)}
      <section class="wrap remaining-page-head" aria-labelledby="remaining-${esc(route)}-title">
        <span class="section-kicker">${esc(kicker)}</span>
        <h1 id="remaining-${esc(route)}-title">${esc(title)}</h1>
        <p>${esc(description)}</p>
      </section>
    `;
  }

  function articleCard(article, index = 0, variant = '') {
    return `
      <article class="remaining-card ${esc(variant)} reveal" style="--preview-index:${index}">
        <div class="remaining-card-media">${imageBlock(article)}</div>
        <div class="remaining-card-body">
          <div class="eyebrow">${esc(article.eyebrow)}</div>
          <h3>${esc(article.title)}</h3>
          <p>${esc(article.lede || t('সংক্ষিপ্ত সংবাদ সারাংশ ও প্রাসঙ্গিক তথ্য।', 'Short story summary with relevant context.'))}</p>
          <div class="meta story-meta">${esc(article.meta)}</div>
        </div>
      </article>
    `;
  }

  function renderListingPage(route, articles, config) {
    const lead = articles[0] || normalizeArticle();
    const rest = articles.slice(1, 13);
    return `
      <main class="preview-page remaining-page remaining-listing-page">
        ${pageHead(route, config.kicker, config.title, config.description)}
        <section class="wrap remaining-listing-grid">
          <article class="remaining-lead-card reveal">
            ${imageBlock(lead)}
            <div>
              <div class="eyebrow">${esc(lead.eyebrow)}</div>
              <h2>${esc(lead.title)}</h2>
              <p>${esc(lead.lede)}</p>
              <div class="meta story-meta">${esc(lead.meta)}</div>
            </div>
          </article>
          <div class="remaining-stack-panel">
            ${rest.slice(0, 5).map((item, index) => articleCard(item, index, 'compact')).join('')}
          </div>
        </section>
        <section class="wrap remaining-card-grid" aria-label="${esc(config.title)}">
          ${rest.slice(5).map((item, index) => articleCard(item, index)).join('')}
        </section>
      </main>
    `;
  }

  function renderLatest(articles) {
    return renderListingPage('latest', articles, {
      kicker: t('লাইভ আপডেট', 'Live Updates'),
      title: t('সর্বশেষ খবর', 'Latest News'),
      description: t('সারা দিনের দ্রুত আপডেট, ব্রেকিং নিউজ এবং গুরুত্বপূর্ণ সংবাদ এক জায়গায়।', 'Fast daily updates, breaking stories, and important headlines in one place.'),
    });
  }

  function renderPopular(dataset, articles) {
    const popular = (dataset.trending || []).map((title, index) => normalizeArticle({
      title,
      eyebrow: t('ট্রেন্ডিং', 'Trending'),
      lede: t('পাঠকের আগ্রহে থাকা আলোচিত খবরের সংক্ষিপ্ত প্রিভিউ।', 'A short preview of a story currently popular with readers.'),
      meta: t(`${index + 1} নম্বর জনপ্রিয়`, `Popular rank ${index + 1}`),
      tone: articles[index]?.tone,
    }));
    return renderListingPage('popular', popular.concat(articles), {
      kicker: t('পাঠকের পছন্দ', 'Reader Choice'),
      title: t('জনপ্রিয় খবর', 'Most Popular'),
      description: t('এই মুহূর্তে সবচেয়ে বেশি পড়া ও আলোচিত খবরের স্ট্যাটিক প্রিভিউ।', 'A static preview of the most-read and most-discussed stories right now.'),
    });
  }

  function renderVideos(dataset) {
    const videos = dataset.videos || [];
    return `
      <main class="preview-page remaining-page video-preview-page">
        ${pageHead('videos', t('ভিডিও ডেস্ক', 'Video Desk'), t('ভিডিও নিউজ', 'Video News'), t('লাইভ, রিপোর্ট, ব্যাখ্যা এবং শর্ট ভিডিও কনটেন্টের জন্য ভিডিও পেজ প্রিভিউ।', 'A video page preview for live streams, reports, explainers, and short-form video content.'))}
        <section class="wrap remaining-video-grid">
          ${videos.map((video, index) => `
            <article class="remaining-video-card reveal">
              <div class="remaining-video-thumb" style="background:${gradient(video.tone)}">
                <span class="remaining-play">${icon('play')}</span>
                ${video.live ? `<span class="remaining-live">${esc(dataset.ui?.live || 'LIVE')}</span>` : `<span class="remaining-duration">${esc(video.duration || '')}</span>`}
              </div>
              <h2>${esc(video.title)}</h2>
              <p>${esc(t('ভিডিও রিপোর্টের সংক্ষিপ্ত বিবরণ এবং সময়কাল।', 'Short description and duration for this video report.'))}</p>
            </article>
          `).join('')}
        </section>
      </main>
    `;
  }

  function renderGallery(articles) {
    return `
      <main class="preview-page remaining-page gallery-preview-page">
        ${pageHead('gallery', t('ফটো ডেস্ক', 'Photo Desk'), t('ছবিঘর', 'Photo Gallery'), t('বিশেষ ছবি, ঘটনা, মানুষ ও জায়গার ভিজ্যুয়াল স্টোরি প্রিভিউ।', 'A visual story preview for featured photos, events, people, and places.'))}
        <section class="wrap remaining-masonry-grid">
          ${articles.slice(0, 10).map((article, index) => `
            <article class="remaining-gallery-card ${index === 0 || index === 5 ? 'large' : ''} reveal">
              ${imageBlock(article)}
              <div>
                <span>${icon('image')} ${esc(article.eyebrow)}</span>
                <h2>${esc(article.title)}</h2>
              </div>
            </article>
          `).join('')}
        </section>
      </main>
    `;
  }

  function renderOpinion(articles) {
    const authors = currentLang() === 'bn'
      ? ['সম্পাদকীয় বোর্ড', 'বিশেষ প্রতিনিধি', 'মতামত ডেস্ক', 'অতিথি লেখক']
      : ['Editorial Board', 'Special Correspondent', 'Opinion Desk', 'Guest Writer'];
    return `
      <main class="preview-page remaining-page opinion-preview-page">
        ${pageHead('opinion', t('বিশ্লেষণ', 'Analysis'), t('মতামত ও সম্পাদকীয়', 'Opinion & Editorial'), t('সম্পাদকীয়, বিশ্লেষণ, কলাম এবং মতামতভিত্তিক কনটেন্টের প্রিভিউ।', 'A preview for editorials, analysis, columns, and opinion-led content.'))}
        <section class="wrap opinion-feature-grid">
          ${articles.slice(0, 8).map((article, index) => `
            <article class="remaining-opinion-card reveal">
              <div class="opinion-avatar">${esc(authors[index % authors.length].charAt(0))}</div>
              <div>
                <div class="eyebrow">${esc(article.eyebrow)}</div>
                <h2>${esc(article.title)}</h2>
                <p>${esc(article.lede || t('ঘটনার প্রেক্ষাপট ও সম্পাদকীয় দৃষ্টিভঙ্গি।', 'Context and editorial perspective.'))}</p>
                <strong>${icon('user')} ${esc(authors[index % authors.length])}</strong>
              </div>
            </article>
          `).join('')}
        </section>
      </main>
    `;
  }

  function renderArchive(articles) {
    const months = currentLang() === 'bn'
      ? ['এপ্রিল ২০২৬', 'মার্চ ২০২৬', 'ফেব্রুয়ারি ২০২৬', 'জানুয়ারি ২০২৬']
      : ['April 2026', 'March 2026', 'February 2026', 'January 2026'];
    return `
      <main class="preview-page remaining-page archive-preview-page">
        ${pageHead('archive', t('পুরনো সংখ্যা', 'Past Issues'), t('নিউজ আর্কাইভ', 'News Archive'), t('তারিখ, বিভাগ এবং কীওয়ার্ড অনুযায়ী পুরনো খবর খোঁজার প্রিভিউ।', 'A preview for finding older stories by date, section, and keyword.'))}
        <section class="wrap archive-layout">
          <aside class="archive-filter-panel">
            <h2>${esc(t('ফিল্টার', 'Filters'))}</h2>
            ${months.map((month) => `<button type="button">${icon('calendar')} ${esc(month)}</button>`).join('')}
          </aside>
          <div class="archive-results-grid">
            ${articles.slice(0, 10).map((article, index) => articleCard(article, index, 'archive')).join('')}
          </div>
        </section>
      </main>
    `;
  }

  function renderAccount(route) {
    return `
      <main class="preview-page remaining-page utility-preview-page">
        ${pageHead('login', t('অ্যাকাউন্ট', 'Account'), t('লগইন / অ্যাকাউন্ট প্রিভিউ', 'Login / Account Preview'), t('পাঠক অ্যাকাউন্ট, সাবস্ক্রিপশন এবং সংরক্ষিত খবরের জন্য স্ট্যাটিক UI প্রিভিউ।', 'A static UI preview for reader accounts, subscriptions, and saved stories.'))}
        <section class="wrap utility-panel-grid">
          <form class="utility-form-card">
            <h2>${esc(t('লগইন করুন', 'Sign in'))}</h2>
            <label>${esc(t('ইমেইল', 'Email'))}<input type="email" placeholder="reader@example.com"></label>
            <label>${esc(t('পাসওয়ার্ড', 'Password'))}<input type="password" placeholder="••••••••"></label>
            <button type="button">${esc(t('চালিয়ে যান', 'Continue'))}</button>
          </form>
          <div class="utility-info-card">
            <h2>${esc(t('অ্যাকাউন্ট সুবিধা', 'Account benefits'))}</h2>
            <ul>
              <li>${esc(t('সংরক্ষিত খবর', 'Saved stories'))}</li>
              <li>${esc(t('নিউজলেটার পছন্দ', 'Newsletter preferences'))}</li>
              <li>${esc(t('ব্যক্তিগতকৃত পড়ার অভিজ্ঞতা', 'Personalized reading experience'))}</li>
            </ul>
          </div>
        </section>
      </main>
    `;
  }

  function renderNewsletter(route) {
    return `
      <main class="preview-page remaining-page utility-preview-page">
        ${pageHead('newsletter', t('ইনবক্স আপডেট', 'Inbox Updates'), t('নিউজলেটার সাবস্ক্রিপশন', 'Newsletter Subscription'), t('প্রতিদিনের গুরুত্বপূর্ণ খবর সরাসরি ইমেইলে পাওয়ার সাবস্ক্রিপশন পেজ প্রিভিউ।', 'A subscription page preview for receiving important daily stories by email.'))}
        <section class="wrap newsletter-layout">
          <form class="utility-form-card newsletter-hero-card">
            <h2>${icon('mail')} ${esc(t('আপনার ইমেইল দিন', 'Enter your email'))}</h2>
            <p>${esc(t('সকালের ব্রিফিং, ব্রেকিং নিউজ এবং সম্পাদকীয় বাছাই।', 'Morning briefing, breaking news, and editorial picks.'))}</p>
            <label>${esc(t('ইমেইল ঠিকানা', 'Email address'))}<input type="email" placeholder="you@example.com"></label>
            <button type="button">${esc(t('সাবস্ক্রাইব করুন', 'Subscribe'))}</button>
          </form>
          <div class="newsletter-options">
            ${['daily', 'breaking', 'weekly'].map((key) => `<div><strong>${esc(t(key === 'daily' ? 'দৈনিক ব্রিফিং' : key === 'breaking' ? 'ব্রেকিং অ্যালার্ট' : 'সাপ্তাহিক রিভিউ', key === 'daily' ? 'Daily Briefing' : key === 'breaking' ? 'Breaking Alerts' : 'Weekly Review'))}</strong><span>${esc(t('ডামি সাবস্ক্রিপশন অপশন', 'Dummy subscription option'))}</span></div>`).join('')}
          </div>
        </section>
      </main>
    `;
  }

  function renderSimpleInfo(route, config) {
    return `
      <main class="preview-page remaining-page info-preview-page">
        ${pageHead(route, config.kicker, config.title, config.description)}
        <section class="wrap info-card-grid">
          ${config.blocks.map((block, index) => `
            <article class="info-card reveal">
              <span>${esc(String(index + 1).padStart(2, '0'))}</span>
              <h2>${esc(block.title)}</h2>
              <p>${esc(block.text)}</p>
            </article>
          `).join('')}
        </section>
      </main>
    `;
  }

  function renderContact() {
    return renderSimpleInfo('contact', {
      kicker: t('যোগাযোগ', 'Contact'),
      title: t('যোগাযোগ করুন', 'Contact Us'),
      description: t('নিউজরুম, বিজ্ঞাপন, সাবস্ক্রিপশন এবং সাধারণ যোগাযোগের স্ট্যাটিক পেজ প্রিভিউ।', 'A static contact page preview for newsroom, advertising, subscription, and general inquiries.'),
      blocks: [
        { title: t('নিউজরুম', 'Newsroom'), text: t('খবর, সংশোধন বা সংবাদ টিপস পাঠানোর জায়গা।', 'A place for news tips, corrections, and editorial contact.') },
        { title: t('বিজ্ঞাপন', 'Advertising'), text: t('ব্র্যান্ড, ক্যাম্পেইন ও স্পনসরশিপ যোগাযোগ।', 'Brand, campaign, and sponsorship contact.') },
        { title: t('সাপোর্ট', 'Support'), text: t('অ্যাকাউন্ট, নিউজলেটার ও সাবস্ক্রিপশন সহায়তা।', 'Account, newsletter, and subscription support.') },
      ],
    });
  }

  function renderAbout() {
    return renderSimpleInfo('about', {
      kicker: t('আমরা কারা', 'Who We Are'),
      title: t('আমাদের সম্পর্কে', 'About Khobor'),
      description: t('পাঠক-কেন্দ্রিক, শান্ত এবং বিশ্বাসযোগ্য সংবাদ অভিজ্ঞতার জন্য তৈরি একটি UI প্রোটোটাইপ।', 'A UI prototype built around a reader-first, calm, and trustworthy news experience.'),
      blocks: [
        { title: t('মিশন', 'Mission'), text: t('সহজ, দ্রুত এবং নির্ভরযোগ্য সংবাদ অভিজ্ঞতা তৈরি করা।', 'Create a simple, fast, and dependable news experience.') },
        { title: t('ভাষা', 'Language'), text: t('বাংলা-প্রথম ডিজাইন, ইংরেজি সাপোর্টসহ।', 'Bangla-first design with English support.') },
        { title: t('ডিজাইন', 'Design'), text: t('আধুনিক কম্পোনেন্ট, টাইপোগ্রাফি এবং রেসপন্সিভ লেআউট।', 'Modern components, typography, and responsive layouts.') },
      ],
    });
  }

  function renderAdvertise() {
    return renderSimpleInfo('advertise', {
      kicker: t('ব্র্যান্ড সলিউশন', 'Brand Solutions'),
      title: t('বিজ্ঞাপন দিন', 'Advertise With Us'),
      description: t('ডিজিটাল বিজ্ঞাপন, স্পনসর কনটেন্ট এবং ব্র্যান্ডেড ক্যাম্পেইনের জন্য পেজ প্রিভিউ।', 'A page preview for digital ads, sponsored content, and branded campaigns.'),
      blocks: [
        { title: t('ডিসপ্লে বিজ্ঞাপন', 'Display Ads'), text: t('হোম, ক্যাটাগরি ও আর্টিকেল পেজে বিজ্ঞাপন প্লেসমেন্ট।', 'Ad placements on home, category, and article pages.') },
        { title: t('স্পনসর কনটেন্ট', 'Sponsored Content'), text: t('সম্পাদকীয় মান বজায় রেখে ব্র্যান্ড স্টোরি।', 'Brand stories with editorial quality in mind.') },
        { title: t('ভিডিও ক্যাম্পেইন', 'Video Campaigns'), text: t('ভিডিও নিউজ ও শর্ট ফরম্যাট প্লেসমেন্ট।', 'Video news and short-format placements.') },
      ],
    });
  }

  function renderPolicy(route) {
    const isTerms = route === 'terms';
    return renderSimpleInfo(route, {
      kicker: t('আইনি তথ্য', 'Legal'),
      title: isTerms ? t('শর্তাবলি', 'Terms of Use') : t('গোপনীয়তা নীতি', 'Privacy Policy'),
      description: isTerms ? t('ওয়েবসাইট ব্যবহারের নিয়ম এবং সীমাবদ্ধতার স্ট্যাটিক প্রিভিউ।', 'A static preview of website usage rules and limitations.') : t('ডেটা, কুকি এবং ব্যবহারকারীর গোপনীয়তা সম্পর্কিত পেজ প্রিভিউ।', 'A page preview about data, cookies, and user privacy.'),
      blocks: [
        { title: t('ডেটা ব্যবহার', 'Data Use'), text: t('এই প্রোটোটাইপে বাস্তব ডেটা সংগ্রহ করা হয় না।', 'This prototype does not collect real data.') },
        { title: t('কুকি', 'Cookies'), text: t('ডামি UI দেখানোর জন্য কোনো কুকি প্রয়োজন নেই।', 'No cookies are required for this dummy UI preview.') },
        { title: t('দায়বদ্ধতা', 'Responsibility'), text: t('এটি শুধুমাত্র স্ট্যাটিক UI/UX প্রিভিউ।', 'This is only a static UI/UX preview.') },
      ],
    });
  }

  function renderErrorState(route) {
    const map = {
      '404': [t('পাওয়া যায়নি', 'Not Found'), t('৪০৪ পেজ প্রিভিউ', '404 Page Preview'), t('অনুরোধ করা পেজটি খুঁজে পাওয়া যায়নি।', 'The requested page could not be found.')],
      empty: [t('ফলাফল নেই', 'No Results'), t('খালি সার্চ ফলাফল', 'Empty Search Results'), t('এই সার্চের জন্য কোনো ডামি ফলাফল পাওয়া যায়নি।', 'No dummy results were found for this search.')],
      loading: [t('লোডিং', 'Loading'), t('স্কেলেটন লোডিং প্রিভিউ', 'Skeleton Loading Preview'), t('ডেটা লোড হওয়ার সময় পেজ কেমন দেখাবে তার প্রিভিউ।', 'A preview of how the page looks while data is loading.')],
    };
    const [kicker, title, desc] = map[route];
    return `
      <main class="preview-page remaining-page state-preview-page">
        ${pageHead(route, kicker, title, desc)}
        <section class="wrap state-preview-card ${route === 'loading' ? 'loading-state-card' : ''}">
          <div class="state-icon">${icon(route === '404' ? 'alert' : route === 'empty' ? 'search' : 'filter')}</div>
          <h2>${esc(title)}</h2>
          <p>${esc(desc)}</p>
          ${route === 'loading' ? `<div class="skeleton-list"><span></span><span></span><span></span></div>` : `<a href="#home">${esc(t('হোমে ফিরুন', 'Back to home'))} ${icon('arrow')}</a>`}
        </section>
      </main>
    `;
  }

  function renderRoute(route, dataset, articles) {
    if (route === 'latest') return renderLatest(articles);
    if (route === 'popular') return renderPopular(dataset, articles);
    if (route === 'videos') return renderVideos(dataset);
    if (route === 'gallery') return renderGallery(articles);
    if (route === 'opinion') return renderOpinion(articles);
    if (route === 'archive') return renderArchive(articles);
    if (route === 'login' || route === 'account') return renderAccount(route);
    if (route === 'newsletter' || route === 'subscribe') return renderNewsletter(route);
    if (route === 'contact') return renderContact();
    if (route === 'about') return renderAbout();
    if (route === 'advertise') return renderAdvertise();
    if (route === 'privacy' || route === 'terms') return renderPolicy(route);
    if (route === '404' || route === 'empty' || route === 'loading') return renderErrorState(route);
    return '';
  }

  function renderIfNeeded() {
    if (state.isRendering) return;
    const route = routeHash();
    if (!isRemainingRoute(route)) return;

    const dataset = currentData();
    const articles = collectArticles(dataset);
    const oldMain = root.querySelector('main');
    if (!oldMain) return;

    state.isRendering = true;
    oldMain.outerHTML = renderRoute(route, dataset, articles);
    window.requestAnimationFrame(() => {
      document.dispatchEvent(new CustomEvent('khobor:preview-rendered'));
      state.isRendering = false;
    });
  }

  function observeAppRerenders() {
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(renderIfNeeded);
    });
    observer.observe(root, { childList: true, subtree: false });
  }

  window.addEventListener('DOMContentLoaded', () => {
    renderIfNeeded();
    observeAppRerenders();
  });

  window.addEventListener('hashchange', () => {
    renderIfNeeded();
  });
})();
