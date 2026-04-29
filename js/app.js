(function bootstrapPreviewApp() {
  const root = document.getElementById("root");
  const data = window.KHOBOR_DATA || {};
  let lang = "bn";
  let activeNav = 0;

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

  function renderLangToggle() {
    return `
      <div class="lang-toggle">
        <button class="${lang === "bn" ? "active" : ""}" data-lang="bn">বাংলা</button>
        <button class="${lang === "en" ? "active" : ""}" data-lang="en">English</button>
      </div>
    `;
  }

  function renderTopBar(t) {
    return `
      <div class="topbar">
        <div class="wrap">
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
    return `
      <header class="masthead">
        <div class="wrap">
          <div class="lockup">
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px">
              <div class="date-en">${esc(t.dateEn)}</div>
              <div style="font-size:11px;color:var(--ink-4);font-family:var(--font-ui-bn);letter-spacing:.04em">সংখ্যা ১২৪ · বছর ১</div>
            </div>
          </div>
          <a href="#" style="text-decoration:none;background-image:none">
            <img src="${logo}" alt="Khobor" class="logo">
          </a>
          <div class="actions">
            <div style="display:flex;align-items:center;gap:8px;background:var(--bg-soft);border:1px solid var(--rule-1);border-radius:6px;padding:8px 12px;width:240px">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a6270" stroke-width="2">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="M20 20l-3.5-3.5"></path>
              </svg>
              <input id="search-input" placeholder="${esc(t.ui.search)}" style="border:0;background:transparent;outline:0;flex:1;font:13px var(--font-ui-bn);color:var(--ink-1);width:100%">
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function renderCategoryNav(t) {
    return `
      <nav class="catnav">
        <div class="wrap">
          ${t.nav.map((it, i) => `<a href="#" data-nav-index="${i}" class="${i === activeNav ? "active" : ""}">${esc(it)}</a>`).join("")}
        </div>
      </nav>
    `;
  }

  function renderTicker(t) {
    const items = [...t.breaking, ...t.breaking];
    return `
      <div class="ticker">
        <div class="ticker-label"><span class="dot"></span>${esc(t.ui.breaking)}</div>
        <div class="ticker-track">
          <div class="ticker-track-inner">
            ${items.map((it) => `<span>${esc(it)}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderHero(t) {
    return `
      <section class="hero">
        <article class="hero-lead reveal">
          <div class="img" style="background:${gradient(t.hero.tone, ["#5a3a40", "#1a0d10"])}"></div>
          <div class="eyebrow">${esc(t.hero.eyebrow)}</div>
          <h1>${esc(t.hero.title)}</h1>
          <p class="lede">${esc(t.hero.lede)}</p>
          <div class="meta">${esc(t.hero.meta)}</div>
        </article>
        <div class="hero-side">
          ${t.heroSide
            .map(
              (a) => `
                <article class="reveal">
                  <div class="eyebrow">${esc(a.eyebrow)}</div>
                  <h3>${esc(a.title)}</h3>
                  <div class="meta">${esc(a.meta)}</div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderSection(section) {
    const header = `
      <div class="section-header">
        <h2>${esc(section.name)}</h2>
        <a href="#">${esc(section.link)}</a>
      </div>
    `;

    if (section.feature) {
      const feature = section.feature;
      return `
        <section class="section">
          ${header}
          <div class="section-row">
            <article class="feature-card reveal">
              <div class="img" style="background:${gradient(feature.tone, ["#3d4a5c", "#1a2330"])}"></div>
              <div class="eyebrow" style="color:var(--maroon-600);font:700 12px var(--font-ui-bn);letter-spacing:.1em;text-transform:uppercase">${esc(feature.eyebrow)}</div>
              <h3>${esc(feature.title)}</h3>
              <p class="lede">${esc(feature.lede)}</p>
              <div class="meta">${esc(feature.meta)}</div>
            </article>
            <div class="list-stack">
              ${section.list
                .map(
                  (it) => `
                    <a href="#" class="reveal">
                      <div class="eyebrow">${esc(it.eyebrow)}</div>
                      <h4>${esc(it.title)}</h4>
                      <div class="meta">${esc(it.meta)}</div>
                    </a>
                  `
                )
                .join("")}
            </div>
          </div>
        </section>
      `;
    }

    return `
      <section class="section">
        ${header}
        <div class="cards">
          ${section.cards
            .map((c) => {
              const bg = gradient(c.tone, ["#5a3a40", "#1a0d10"]);
              return `
                <article class="card reveal">
                  <div class="img-wrap"><div class="img" style="background:${bg}"></div></div>
                  <div class="eyebrow">${esc(c.eyebrow)}</div>
                  <h3>${esc(c.title)}</h3>
                  <div class="meta">${esc(c.meta)}</div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderSidebar(t) {
    const nums = lang === "bn" ? ["০১", "০২", "০৩", "০৪", "০৫"] : ["01", "02", "03", "04", "05"];
    const times =
      lang === "bn"
        ? ["৩৫ মিনিট আগে", "১ ঘণ্টা আগে", "২ ঘণ্টা আগে", "৩ ঘণ্টা আগে", "৪ ঘণ্টা আগে"]
        : ["35 min ago", "1h ago", "2h ago", "3h ago", "4h ago"];
    return `
      <aside class="sidebar">
        <div>
          <h3 class="title">${esc(t.ui.trending)}</h3>
          <div class="trending">
            ${t.trending
              .map(
                (title, i) => `
                  <a href="#" class="trending-item reveal">
                    <div class="num">${nums[i] || ""}</div>
                    <div>
                      <h4>${esc(title)}</h4>
                      <div class="meta">${times[i] || ""}</div>
                    </div>
                  </a>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="newsletter-box reveal">
          <h3>${esc(t.ui.newsletter)}</h3>
          <p>${esc(t.ui.newsletterSub)}</p>
          <input id="newsletter-email" type="email" placeholder="${esc(t.ui.emailPh)}">
          <button id="newsletter-submit">${esc(t.ui.subscribeBtn)}</button>
        </div>
        <div style="aspect-ratio:1/1;background:var(--bg-soft);border:1px dashed var(--rule-2);border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--ink-4);font:600 12px var(--font-ui-bn);letter-spacing:.08em;text-transform:uppercase">
          ADVERTISEMENT
        </div>
      </aside>
    `;
  }

  function renderVideos(t) {
    return `
      <section class="section">
        <div class="section-header">
          <h2>${esc(t.ui.videosTitle)}</h2>
          <a href="#">${esc(t.ui.viewAll)}</a>
        </div>
        <div class="videos">
          ${t.videos
            .map((v) => {
              const bg = gradient(v.tone, ["#2c3e50", "#0e1116"]);
              return `
                <div>
                  <div class="video-card reveal" style="background:${bg}">
                    ${v.live ? `<div class="live">${esc(t.ui.live)}</div>` : ""}
                    <div class="play"></div>
                    ${!v.live ? `<div class="duration">${esc(v.duration)}</div>` : ""}
                  </div>
                  <div class="video-meta">
                    <h4>${esc(v.title)}</h4>
                    <div class="meta">${esc(v.duration)}</div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderFooter(t) {
    const logo = t.branding?.logo || (lang === "en" ? "assets/logos/logo-khobor-en.svg" : "assets/logos/logo-khobor.svg");
    const subtitle =
      lang === "bn"
        ? "নির্ভরযোগ্য, শান্ত, পেশাদার সাংবাদিকতা — প্রতিদিন।"
        : "Quiet, dependable, professional journalism — every day.";
    return `
      <footer>
        <div class="wrap">
          <div class="brand">
            <img src="${logo}" height="40" style="filter:invert(1) hue-rotate(180deg) saturate(.4) brightness(1.4)" alt="">
            <p>${esc(subtitle)}</p>
          </div>
          ${t.footer.sections
            .map(
              (s) => `
                <div>
                  <h4>${esc(s.title)}</h4>
                  <ul>${s.items.map((it) => `<li><a href="#">${esc(it)}</a></li>`).join("")}</ul>
                </div>
              `
            )
            .join("")}
          <div class="legal">
            <span>${esc(t.footer.copy)}</span>
            <span style="font-family:var(--font-ui-en)">${esc(t.branding?.site || "khobor.com.bd")}</span>
          </div>
        </div>
      </footer>
    `;
  }

  function attachEvents() {
    const allLinks = document.querySelectorAll('a[href="#"]');
    allLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
      });
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

  function render() {
    const t = data[lang] || data.bn || data.en;
    if (!t) {
      root.innerHTML = "<p style='padding:16px'>Preview data not found.</p>";
      return;
    }

    root.innerHTML = `
      <div lang="${esc(lang)}">
        ${renderTopBar(t)}
        ${renderMasthead(t)}
        ${renderCategoryNav(t)}
        <div class="wrap">
          ${renderTicker(t)}
          ${renderHero(t)}
        </div>
        <div class="wrap">
          <div class="home-grid">
            <main>
              ${t.sections.map((section) => renderSection(section)).join("")}
              ${renderVideos(t)}
            </main>
            ${renderSidebar(t)}
          </div>
        </div>
        ${renderFooter(t)}
      </div>
    `;

    attachEvents();
  }

  render();
})();
