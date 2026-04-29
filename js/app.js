(function bootstrapPreviewApp() {
  const root = document.getElementById("root");
  const data = window.KHOBOR_DATA || {};
  let lang = "bn";
  let activeNav = 0;

  /* -----------------------------------------------------------------------
     Safe formatting helpers
     ----------------------------------------------------------------------- */
  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function gradient(tone, fallback) {
    const values = Array.isArray(tone) && tone.length >= 2 ? tone : fallback;
    return `linear-gradient(135deg, ${values[0]}, ${values[1]})`;
  }

  function getFallbackText(bn, en) {
    return lang === "bn" ? bn : en;
  }

  function joinHtml(items, renderItem) {
    return (items || []).map(renderItem).join("");
  }

  /* -----------------------------------------------------------------------
     Data normalization helpers
     ----------------------------------------------------------------------- */
  function normalizeArticle(item = {}, sectionName = "") {
    return {
      eyebrow: item.eyebrow || sectionName,
      title: item.title || "",
      lede: item.lede || "",
      meta: item.meta || "",
      tone: item.tone || ["#5a3a40", "#1a0d10"],
    };
  }

  function collectArticles(t) {
    const articles = [];
    (t.sections || []).forEach((section) => {
      if (section.feature) articles.push(normalizeArticle(section.feature, section.name));
      (section.list || []).forEach((item) => articles.push(normalizeArticle(item, section.name)));
      (section.cards || []).forEach((item) => articles.push(normalizeArticle(item, section.name)));
    });
    return articles;
  }

  /* -----------------------------------------------------------------------
     Small reusable UI helpers
     ----------------------------------------------------------------------- */
  function renderIcon(name, className = "") {
    const icons = {
      search: '<circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path>',
      clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
      arrowRight: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
      mail: '<path d="M4 6h16v12H4z"></path><path d="m4 7 8 6 8-6"></path>',
      play: '<path d="m9 7 8 5-8 5z"></path>',
    };
    const body = icons[name] || icons.arrowRight;
    return `<svg class="icon ${esc(className)}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  function renderCategoryBadge(label) {
    return `<div class="eyebrow">${esc(label)}</div>`;
  }

  function renderAuthorMeta(meta) {
    return `<div class="meta story-meta">${renderIcon("clock")}<span>${esc(meta)}</span></div>`;
  }

  function renderImageBlock(item, className = "") {
    return `<div class="img ${esc(className)}" style="background:${gradient(item?.tone, ["#5a3a40", "#1a0d10"])}"></div>`;
  }

  function renderSectionHeader(title, link) {
    return `
      <div class="section-header">
        <div>
          <span class="section-kicker">${esc(getFallbackText("খবর", "News"))}</span>
          <h2>${esc(title)}</h2>
        </div>
        <a href="#">${esc(link || getFallbackText("সব দেখুন", "View all"))} ${renderIcon("arrowRight")}</a>
      </div>
    `;
  }

  function renderAdSlot(label = "ADVERTISEMENT") {
    return `<div class="ad-slot reveal">${esc(label)}</div>`;
  }

  /* -----------------------------------------------------------------------
     Header, navigation, and ticker renderers
     ----------------------------------------------------------------------- */
  function renderLangToggle() {
    return `
      <div class="lang-toggle" aria-label="Language switcher">
        <button class="${lang === "bn" ? "active" : ""}" data-lang="bn">বাংলা</button>
        <button class="${lang === "en" ? "active" : ""}" data-lang="en">English</button>
      </div>
    `;
  }

  function renderTopBar(t) {
    return `
      <div class="topbar">
        <div class="wrap topbar-inner">
          <div class="date">${esc(t.date)}</div>
          <div class="actions">
            <a href="#">${esc(t.ui.subscribe)}</a>
            <a href="#">${esc(t.ui.login)}</a>
            ${renderLangToggle()}
          </div>
        </div>
      </div>
    `;
  }

  function renderMasthead(t) {
    const logo = t.branding?.logo || (lang === "en" ? "assets/logos/logo-khobor-en.svg" : "assets/logos/logo-khobor.svg");
    const edition = getFallbackText("সংখ্যা ১২৪ · বছর ১", "Issue 124 · Year 1");
    return `
      <header class="masthead">
        <div class="wrap masthead-inner">
          <div class="lockup">
            <div class="date-stack">
              <div class="date-en">${esc(t.dateEn)}</div>
              <div class="edition">${esc(edition)}</div>
            </div>
          </div>
          <a href="#" class="brand-link" aria-label="Khobor home">
            <img src="${esc(logo)}" alt="Khobor" class="logo">
          </a>
          <div class="actions">
            <div class="search-shell">
              ${renderIcon("search")}
              <input id="search-input" placeholder="${esc(t.ui.search)}" aria-label="${esc(t.ui.search)}">
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function renderCategoryNav(t) {
    return `
      <nav class="catnav" aria-label="Primary categories">
        <div class="wrap catnav-inner">
          ${joinHtml(t.nav, (it, i) => `<a href="#" data-nav-index="${i}" class="${i === activeNav ? "active" : ""}">${esc(it)}</a>`)}
        </div>
      </nav>
    `;
  }

  function renderTicker(t) {
    const items = [...(t.breaking || []), ...(t.breaking || [])];
    return `
      <div class="ticker">
        <div class="ticker-label"><span class="dot"></span>${esc(t.ui.breaking)}</div>
        <div class="ticker-track">
          <div class="ticker-track-inner">
            ${joinHtml(items, (it) => `<span>${esc(it)}</span>`)}
          </div>
        </div>
      </div>
    `;
  }

  /* -----------------------------------------------------------------------
     Story and section renderers
     ----------------------------------------------------------------------- */
  function renderNewsCard(item, variant = "standard") {
    return `
      <article class="news-card news-card-${esc(variant)} reveal">
        <div class="img-wrap">${renderImageBlock(item)}</div>
        <div class="card-body">
          ${renderCategoryBadge(item.eyebrow)}
          <h3>${esc(item.title)}</h3>
          ${item.lede ? `<p>${esc(item.lede)}</p>` : ""}
          ${renderAuthorMeta(item.meta)}
        </div>
      </article>
    `;
  }

  function renderHeroTile(item) {
    return `
      <article class="hero-tile reveal">
        ${renderImageBlock(item)}
        ${renderCategoryBadge(item.eyebrow)}
        <h3>${esc(item.title)}</h3>
        ${renderAuthorMeta(item.meta)}
      </article>
    `;
  }

  function renderQuickStory(item) {
    return `
      <article class="quick-story reveal">
        ${renderCategoryBadge(item.eyebrow)}
        <h3>${esc(item.title)}</h3>
        ${renderAuthorMeta(item.meta)}
      </article>
    `;
  }

  function renderHero(t) {
    const hero = normalizeArticle(t.hero || {}, t.nav?.[0] || "");
    const quickStories = (t.heroSide || []).slice(2, 4).map((item) => normalizeArticle(item));
    const secondaryStories = (t.heroSide || []).slice(0, 2).map((item) => normalizeArticle(item));
    return `
      <section class="hero hero-modern" aria-label="Featured stories">
        <article class="hero-lead reveal">
          ${renderImageBlock(hero, "hero-image")}
          <div class="story-content">
            ${renderCategoryBadge(hero.eyebrow)}
            <h1>${esc(hero.title)}</h1>
            <p class="lede">${esc(hero.lede)}</p>
            ${renderAuthorMeta(hero.meta)}
          </div>
        </article>
        <div class="hero-secondary">${joinHtml(secondaryStories, renderHeroTile)}</div>
        <div class="hero-quick">${joinHtml(quickStories, renderQuickStory)}</div>
      </section>
    `;
  }

  function renderLatestStrip(t, articles) {
    const title = getFallbackText("সর্বশেষ খবর", "Latest News");
    const latest = articles.slice(0, 5);
    return `
      <section class="latest-strip reveal" aria-label="${esc(title)}">
        <div class="latest-title">${esc(title)}</div>
        <div class="latest-items">
          ${joinHtml(latest, (item) => `
            <a href="#" class="latest-item">
              <span>${esc(item.eyebrow)}</span>
              <strong>${esc(item.title)}</strong>
            </a>
          `)}
        </div>
      </section>
    `;
  }

  function renderTopStories(t, articles) {
    const title = getFallbackText("টপ স্টোরি", "Top Stories");
    const stories = articles.slice(5, 9);
    return `
      <section class="section section-compact">
        ${renderSectionHeader(title, t.ui.viewAll)}
        <div class="top-story-grid">${joinHtml(stories, (item) => renderNewsCard(item, "compact"))}</div>
      </section>
    `;
  }

  function renderListStory(item) {
    return `
      <a href="#" class="list-story reveal">
        ${renderCategoryBadge(item.eyebrow)}
        <h4>${esc(item.title)}</h4>
        ${renderAuthorMeta(item.meta)}
      </a>
    `;
  }

  function renderSection(section) {
    const header = renderSectionHeader(section.name, section.link);

    if (section.feature) {
      const feature = normalizeArticle(section.feature, section.name);
      const listItems = (section.list || []).map((it) => normalizeArticle(it, section.name));
      return `
        <section class="section">
          ${header}
          <div class="section-row modern-section-row">
            ${renderNewsCard(feature, "feature")}
            <div class="list-stack modern-list-stack">${joinHtml(listItems, renderListStory)}</div>
          </div>
        </section>
      `;
    }

    const cards = (section.cards || []).map((c) => normalizeArticle(c, section.name));
    return `
      <section class="section">
        ${header}
        <div class="cards modern-cards">${joinHtml(cards, (item) => renderNewsCard(item, "standard"))}</div>
      </section>
    `;
  }

  function renderEditorPick(t, articles) {
    const pick = articles[9] || articles[0];
    const side = articles.slice(10, 13);
    if (!pick) return "";
    return `
      <section class="editor-pick reveal">
        <div class="editor-copy">
          <span class="section-kicker">${esc(getFallbackText("সম্পাদকের পছন্দ", "Editor’s Pick"))}</span>
          <h2>${esc(pick.title)}</h2>
          <p>${esc(pick.lede || getFallbackText("দিনের গুরুত্বপূর্ণ বিশ্লেষণ ও বাছাই করা খবর।", "A selected story with context and editorial weight."))}</p>
          ${renderAuthorMeta(pick.meta)}
        </div>
        <div class="editor-side">
          ${joinHtml(side, (item) => `
            <a href="#">
              <span>${esc(item.eyebrow)}</span>
              <strong>${esc(item.title)}</strong>
            </a>
          `)}
        </div>
      </section>
    `;
  }

  function renderPhotoGallery(t, articles) {
    const title = getFallbackText("ছবিঘর", "Photo Gallery");
    const gallery = articles.slice(13, 17);
    if (!gallery.length) return "";
    return `
      <section class="section">
        ${renderSectionHeader(title, t.ui.viewAll)}
        <div class="gallery-grid">
          ${joinHtml(gallery, (item, index) => `
            <article class="gallery-card ${index === 0 ? "large" : ""} reveal">
              ${renderImageBlock(item)}
              <div>
                ${renderCategoryBadge(item.eyebrow)}
                <h3>${esc(item.title)}</h3>
              </div>
            </article>
          `)}
        </div>
      </section>
    `;
  }

  function renderTrendingList(t) {
    const nums = lang === "bn" ? ["০১", "০২", "০৩", "০৪", "০৫"] : ["01", "02", "03", "04", "05"];
    const times = lang === "bn"
      ? ["৩৫ মিনিট আগে", "১ ঘণ্টা আগে", "২ ঘণ্টা আগে", "৩ ঘণ্টা আগে", "৪ ঘণ্টা আগে"]
      : ["35 min ago", "1h ago", "2h ago", "3h ago", "4h ago"];

    return `
      <div class="trending">
        ${joinHtml(t.trending, (title, i) => `
          <a href="#" class="trending-item reveal">
            <div class="num">${nums[i] || ""}</div>
            <div>
              <h4>${esc(title)}</h4>
              <div class="meta">${esc(times[i] || "")}</div>
            </div>
          </a>
        `)}
      </div>
    `;
  }

  function renderNewsletterBox(t) {
    return `
      <div class="newsletter-box reveal">
        <h3>${esc(t.ui.newsletter)}</h3>
        <p>${esc(t.ui.newsletterSub)}</p>
        <input id="newsletter-email" type="email" placeholder="${esc(t.ui.emailPh)}">
        <button id="newsletter-submit">${esc(t.ui.subscribeBtn)}</button>
      </div>
    `;
  }

  function renderSidebar(t) {
    return `
      <aside class="sidebar">
        <div class="sidebar-panel">
          <h3 class="title">${esc(t.ui.trending)}</h3>
          ${renderTrendingList(t)}
        </div>
        ${renderNewsletterBox(t)}
        ${renderAdSlot()}
      </aside>
    `;
  }

  function renderVideoCard(t, video) {
    const bg = gradient(video.tone, ["#2c3e50", "#0e1116"]);
    return `
      <div class="video-item">
        <div class="video-card reveal" style="background:${bg}">
          ${video.live ? `<div class="live">${esc(t.ui.live)}</div>` : ""}
          <div class="play"></div>
          ${!video.live ? `<div class="duration">${esc(video.duration)}</div>` : ""}
        </div>
        <div class="video-meta">
          <h4>${esc(video.title)}</h4>
          <div class="meta">${esc(video.duration)}</div>
        </div>
      </div>
    `;
  }

  function renderVideos(t) {
    return `
      <section class="section video-section">
        ${renderSectionHeader(t.ui.videosTitle, t.ui.viewAll)}
        <div class="videos">${joinHtml(t.videos, (v) => renderVideoCard(t, v))}</div>
      </section>
    `;
  }

  function renderFooter(t) {
    const logo = t.branding?.logo || (lang === "en" ? "assets/logos/logo-khobor-en.svg" : "assets/logos/logo-khobor.svg");
    const subtitle = getFallbackText(
      "নির্ভরযোগ্য, শান্ত, পেশাদার সাংবাদিকতা — প্রতিদিন।",
      "Quiet, dependable, professional journalism — every day."
    );
    return `
      <footer>
        <div class="wrap">
          <div class="brand">
            <img src="${esc(logo)}" height="40" style="filter:invert(1) hue-rotate(180deg) saturate(.4) brightness(1.4)" alt="">
            <p>${esc(subtitle)}</p>
          </div>
          ${joinHtml(t.footer?.sections, (s) => `
            <div>
              <h4>${esc(s.title)}</h4>
              <ul>${joinHtml(s.items, (it) => `<li><a href="#">${esc(it)}</a></li>`)}</ul>
            </div>
          `)}
          <div class="legal">
            <span>${esc(t.footer?.copy)}</span>
            <span style="font-family:var(--font-ui-en)">${esc(t.branding?.site || "khobor.com.bd")}</span>
          </div>
        </div>
      </footer>
    `;
  }

  /* -----------------------------------------------------------------------
     Event binding
     ----------------------------------------------------------------------- */
  function attachEvents() {
    document.querySelectorAll('a[href="#"]').forEach((link) => {
      link.addEventListener("click", (event) => event.preventDefault());
    });

    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", function onLangClick() {
        lang = this.getAttribute("data-lang") || "bn";
        render();
      });
    });

    document.querySelectorAll("[data-nav-index]").forEach((link) => {
      link.addEventListener("click", function onNavClick() {
        const nextIndex = Number(this.getAttribute("data-nav-index"));
        activeNav = Number.isNaN(nextIndex) ? 0 : nextIndex;
        render();
      });
    });

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const query = searchInput.value.trim();
          const text = lang === "bn"
            ? `ডামি সার্চ করা হয়েছে: ${query || "খালি"}`
            : `Dummy search submitted: ${query || "empty"}`;
          window.alert(text);
        }
      });
    }

    const newsletterButton = document.getElementById("newsletter-submit");
    const newsletterEmail = document.getElementById("newsletter-email");
    if (newsletterButton && newsletterEmail) {
      newsletterButton.addEventListener("click", () => {
        const email = newsletterEmail.value.trim();
        const ok = email.includes("@") && email.includes(".");
        if (ok) {
          window.alert(lang === "bn" ? "ডামি সাবস্ক্রিপশন সফল।" : "Dummy subscription successful.");
        } else {
          window.alert(lang === "bn" ? "একটি বৈধ ডামি ইমেইল দিন।" : "Enter a valid dummy email.");
        }
      });
    }
  }

  /* -----------------------------------------------------------------------
     Main app render
     ----------------------------------------------------------------------- */
  function render() {
    const t = data[lang] || data.bn || data.en;
    if (!t) {
      root.innerHTML = "<p style='padding:16px'>Preview data not found.</p>";
      return;
    }

    const articles = collectArticles(t);

    root.innerHTML = `
      <div lang="${esc(lang)}">
        ${renderTopBar(t)}
        ${renderMasthead(t)}
        ${renderCategoryNav(t)}
        <main>
          <div class="wrap">
            ${renderTicker(t)}
            ${renderHero(t)}
            ${renderLatestStrip(t, articles)}
          </div>
          <div class="wrap">
            <div class="home-grid">
              <div class="content-flow">
                ${renderTopStories(t, articles)}
                ${renderEditorPick(t, articles)}
                ${joinHtml(t.sections, renderSection)}
                ${renderPhotoGallery(t, articles)}
                ${renderVideos(t)}
              </div>
              ${renderSidebar(t)}
            </div>
          </div>
        </main>
        ${renderFooter(t)}
      </div>
    `;

    attachEvents();
  }

  render();
})();
