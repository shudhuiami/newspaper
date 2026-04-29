(function applyDummyPreviewData() {
  if (!window.KHOBOR_DATA) {
    window.KHOBOR_DATA = {};
  }

  const sourceBn = window.KHOBOR_DATA.bn || {};
  const sourceEn = window.KHOBOR_DATA.en || {};

  const bn = JSON.parse(JSON.stringify(sourceBn));
  const en = JSON.parse(JSON.stringify(sourceEn));

  bn.branding = {
    logo: "assets/logos/logo-khobor.svg",
    site: "dummy.khobor.local",
  };
  bn.date = 'ডামি তারিখ · কেবল প্রিভিউ';
  bn.nav = ['হোম','ডামি রাজনীতি','ডামি অর্থনীতি','ডামি খেলা','ডামি ভিডিও','ডামি মতামত','ডামি লাইফস্টাইল'];
  bn.breaking = [
    'ডামি শিরোনাম ১: এই কনটেন্ট শুধুই প্রিভিউর জন্য',
    'ডামি শিরোনাম ২: বাস্তব সংবাদ নয়',
    'ডামি শিরোনাম ৩: ডিজাইন যাচাই চলছে',
  ];
  if (bn.hero) {
    bn.hero.eyebrow = 'ডামি বিভাগ';
    bn.hero.title = 'ডামি হিরো স্টোরি: ডিজাইন প্রিভিউ';
    bn.hero.lede = 'এই ডামি বর্ণনা কেবল UI লেআউট ও টাইপোগ্রাফি যাচাইয়ের উদ্দেশ্যে রাখা হয়েছে।';
    bn.hero.meta = 'ডামি রিপোর্টার · কিছুক্ষণ আগে';
  }
  if (Array.isArray(bn.trending)) {
    bn.trending = bn.trending.map((_, idx) => 'ট্রেন্ডিং ডামি আইটেম ' + (idx + 1));
  }
  if (Array.isArray(bn.heroSide)) {
    bn.heroSide = bn.heroSide.map((item, idx) => ({
      ...item,
      eyebrow: "ডামি আপডেট",
      title: "ডামি সাইড স্টোরি " + (idx + 1),
      meta: "প্রিভিউ টাইমস্ট্যাম্প",
    }));
  }
  if (Array.isArray(bn.sections)) {
    bn.sections = bn.sections.map((section, sIdx) => ({
      ...section,
      name: "ডামি বিভাগ " + (sIdx + 1),
      link: "সব ডামি দেখুন →",
      feature: section.feature
        ? {
            ...section.feature,
            eyebrow: "ডামি ফিচার",
            title: "ডামি ফিচার স্টোরি " + (sIdx + 1),
            lede: "এই অনুচ্ছেদটি ডামি ডেটা দিয়ে ডিজাইন টেস্ট করার জন্য ব্যবহৃত হচ্ছে।",
            meta: "ডামি প্রতিবেদক · এখনই",
          }
        : section.feature,
      list: Array.isArray(section.list)
        ? section.list.map((item, i) => ({
            ...item,
            eyebrow: "ডামি লিস্ট",
            title: "ডামি লিস্ট আইটেম " + (i + 1),
            meta: "ডামি সময়",
          }))
        : section.list,
      cards: Array.isArray(section.cards)
        ? section.cards.map((card, i) => ({
            ...card,
            eyebrow: "ডামি কার্ড",
            title: "ডামি কার্ড আইটেম " + (i + 1),
            meta: "ডামি মেটা",
          }))
        : section.cards,
    }));
  }
  if (Array.isArray(bn.videos)) {
    bn.videos = bn.videos.map((video, idx) => ({
      ...video,
      title: "ডামি ভিডিও ক্লিপ " + (idx + 1),
    }));
  }
  if (bn.ui) {
    bn.ui.search = "ডামি সার্চ লিখুন…";
    bn.ui.newsletter = "ডামি নিউজলেটার";
    bn.ui.newsletterSub = "এটি শুধু UI প্রিভিউর জন্য একটি ডামি নিউজলেটার বর্ণনা।";
    bn.ui.emailPh = "ডামি ইমেইল";
    bn.ui.subscribeBtn = "ডামি সাবস্ক্রাইব";
  }

  en.branding = {
    logo: "assets/logos/logo-khobor-en.svg",
    site: "dummy.khobor.local",
  };
  en.date = 'Dummy date · Preview only';
  en.nav = ['Home','Dummy Politics','Dummy Economy','Dummy Sports','Dummy Video','Dummy Opinion','Dummy Lifestyle'];
  en.breaking = [
    'Dummy headline 1: Preview content only',
    'Dummy headline 2: Not real news',
    'Dummy headline 3: Design verification in progress',
  ];
  if (en.hero) {
    en.hero.eyebrow = 'Dummy Section';
    en.hero.title = 'Dummy Hero Story for Design Preview';
    en.hero.lede = 'This placeholder copy is intentionally fake and used only for visual review.';
    en.hero.meta = 'Dummy Reporter · moments ago';
  }
  if (Array.isArray(en.trending)) {
    en.trending = en.trending.map((_, idx) => 'Trending dummy item ' + (idx + 1));
  }
  if (Array.isArray(en.heroSide)) {
    en.heroSide = en.heroSide.map((item, idx) => ({
      ...item,
      eyebrow: "Dummy Update",
      title: "Dummy side story " + (idx + 1),
      meta: "Preview timestamp",
    }));
  }
  if (Array.isArray(en.sections)) {
    en.sections = en.sections.map((section, sIdx) => ({
      ...section,
      name: "Dummy Section " + (sIdx + 1),
      link: "View all dummy →",
      feature: section.feature
        ? {
            ...section.feature,
            eyebrow: "Dummy Feature",
            title: "Dummy feature story " + (sIdx + 1),
            lede: "This paragraph is placeholder copy for testing spacing and typography in preview mode.",
            meta: "Dummy Reporter · now",
          }
        : section.feature,
      list: Array.isArray(section.list)
        ? section.list.map((item, i) => ({
            ...item,
            eyebrow: "Dummy List",
            title: "Dummy list item " + (i + 1),
            meta: "Dummy time",
          }))
        : section.list,
      cards: Array.isArray(section.cards)
        ? section.cards.map((card, i) => ({
            ...card,
            eyebrow: "Dummy Card",
            title: "Dummy card item " + (i + 1),
            meta: "Dummy meta",
          }))
        : section.cards,
    }));
  }
  if (Array.isArray(en.videos)) {
    en.videos = en.videos.map((video, idx) => ({
      ...video,
      title: "Dummy video clip " + (idx + 1),
    }));
  }
  if (en.ui) {
    en.ui.search = "Type a dummy search…";
    en.ui.newsletter = "Dummy newsletter";
    en.ui.newsletterSub = "Placeholder newsletter copy for UI preview only.";
    en.ui.emailPh = "Dummy email";
    en.ui.subscribeBtn = "Dummy subscribe";
  }

  window.KHOBOR_DATA = { bn: bn, en: en };
})();
