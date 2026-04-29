// Sample data for the Khobor UI kit. BN primary, EN parallel.
// Story `image` URLs use Lorem Picsum (deterministic seeds) for prototype photography; requires network to load.
window.KHOBOR_DATA = {
  bn: {
    date: '২৭ এপ্রিল, ২০২৬ · সোমবার',
    dateEn: 'MON · 27 APR 2026',
    nav: ['হোম','রাজনীতি','অর্থনীতি','খেলা','বিনোদন','আন্তর্জাতিক','মতামত','ভিডিও','লাইফস্টাইল'],
    breaking: [
      'ঢাকায় শিক্ষার্থীদের নিরাপদ সড়ক আন্দোলন তৃতীয় দিনে',
      'বাংলাদেশ ব্যাংক রেপো রেট ৯.৫% অপরিবর্তিত রাখল',
      'মুশফিকের অপরাজিত ৮৪ রানে সাত উইকেটের জয়',
      'জলবায়ু সম্মেলনে নতুন প্রস্তাব বাংলাদেশের',
      'মেট্রোরেল উত্তরা থেকে কমলাপুর পর্যন্ত পূর্ণ চালু',
    ],
    hero: {
      eyebrow: 'রাজনীতি',
      title: 'ঢাকায় শিক্ষার্থীদের নিরাপদ সড়ক আন্দোলন: তৃতীয় দিনে যা ঘটল',
      lede: 'রাজধানীর শাহবাগ, ফার্মগেট ও মতিঝিলে শিক্ষার্থীরা সকাল থেকে অবস্থান নিয়েছেন। দুপুর পর্যন্ত যান চলাচল প্রায় বন্ধ ছিল।',
      meta: 'রিয়াদ আহমেদ · ৩ ঘণ্টা আগে · ৬ মিনিট পড়া',
      tone: ['#5a3a40','#1a0d10'],
      image: 'https://picsum.photos/seed/khobor-bn-hero/1600/900',
    },
    heroSide: [
      { eyebrow:'অর্থনীতি', title:'রেপো রেট ৯.৫% অপরিবর্তিত, মুদ্রাস্ফীতি কমে ৭.১%', meta:'৩৫ মিনিট আগে', image: 'https://picsum.photos/seed/khobor-bn-side-econ/960/600' },
      { eyebrow:'আন্তর্জাতিক', title:'জলবায়ু সম্মেলনে বাংলাদেশের নতুন অর্থায়ন প্রস্তাব', meta:'১ ঘণ্টা আগে', image: 'https://picsum.photos/seed/khobor-bn-side-world/960/600' },
      { eyebrow:'খেলা', title:'মুশফিকের অপরাজিত ৮৪ রানে বাংলাদেশের সাত উইকেটের জয়', meta:'২ ঘণ্টা আগে', image: 'https://picsum.photos/seed/khobor-bn-side-sports/960/600' },
      { eyebrow:'প্রযুক্তি', title:'দেশে চালু হলো প্রথম দেশীয় ক্লাউড ডেটা সেন্টার', meta:'৩ ঘণ্টা আগে', image: 'https://picsum.photos/seed/khobor-bn-side-tech/960/600' },
    ],
    sections: [
      {
        name: 'রাজনীতি', link: 'সব দেখুন →',
        feature: { eyebrow:'বিশ্লেষণ', title:'নতুন সচিব নিযুক্তি: প্রশাসনে কী বার্তা?', lede:'মন্ত্রিপরিষদ বিভাগ সোমবার তিনটি মন্ত্রণালয়ে নতুন সচিব নিয়োগ দিয়েছে। বিশ্লেষকরা বলছেন এটি একটি কাঠামোগত পুনর্বিন্যাস।', meta:'আশফাক রহমান · ১ ঘণ্টা আগে', tone:['#3d4a5c','#1a2330'], image: 'https://picsum.photos/seed/khobor-bn-politics-feature/960/640' },
        list: [
          { eyebrow:'সংসদ', title:'বাজেট অধিবেশন শুরু ৫ জুন থেকে', meta:'২ ঘণ্টা আগে', image: 'https://picsum.photos/seed/khobor-bn-politics-l1/880/540' },
          { eyebrow:'নির্বাচন', title:'স্থানীয় নির্বাচনে সংস্কারের প্রস্তাব ইসির', meta:'৪ ঘণ্টা আগে', image: 'https://picsum.photos/seed/khobor-bn-politics-l2/880/540' },
          { eyebrow:'কূটনীতি', title:'ভারতের সঙ্গে নতুন সীমান্ত চুক্তি স্বাক্ষর', meta:'৬ ঘণ্টা আগে', image: 'https://picsum.photos/seed/khobor-bn-politics-l3/880/540' },
        ],
      },
      {
        name: 'অর্থনীতি', link: 'সব দেখুন →',
        cards: [
          { eyebrow:'ব্যাংকিং', title:'রেপো রেট অপরিবর্তিত, মুদ্রাস্ফীতি ৭.১%', meta:'৩৫ মিনিট আগে', tone:['#2c5530','#0e1a13'], image: 'https://picsum.photos/seed/khobor-bn-econ-1/960/600' },
          { eyebrow:'বাণিজ্য', title:'রপ্তানি আয়ে নতুন রেকর্ড, বেড়েছে ১৪%', meta:'২ ঘণ্টা আগে', tone:['#5c4a2c','#1a1308'], image: 'https://picsum.photos/seed/khobor-bn-econ-2/960/600' },
          { eyebrow:'বাজার', title:'ডিএসইতে সূচক বাড়ল ৩০ পয়েন্ট', meta:'৩ ঘণ্টা আগে', tone:['#2c4a5c','#081320'], image: 'https://picsum.photos/seed/khobor-bn-econ-3/960/600' },
          { eyebrow:'কৃষি', title:'বোরো মৌসুমে ফলন প্রত্যাশার চেয়ে বেশি', meta:'৫ ঘণ্টা আগে', tone:['#3d5c2c','#13200d'], image: 'https://picsum.photos/seed/khobor-bn-econ-4/960/600' },
        ],
      },
      {
        name: 'খেলা', link: 'সব দেখুন →',
        feature: { eyebrow:'ক্রিকেট', title:'মুশফিকের ৮৪ রানে বাংলাদেশের সিরিজ জয়', lede:'চট্টগ্রামে অনুষ্ঠিত তৃতীয় ওয়ানডেতে শ্রীলঙ্কাকে সাত উইকেটে হারিয়ে সিরিজ ২–১ ব্যবধানে জিতেছে স্বাগতিকরা।', meta:'রবিন রহমান · ২ ঘণ্টা আগে', tone:['#1a4a3d','#062018'], image: 'https://picsum.photos/seed/khobor-bn-sports-feature/960/640' },
        list: [
          { eyebrow:'ফুটবল', title:'বসুন্ধরা কিংস টানা পঞ্চমবার চ্যাম্পিয়ন', meta:'গতকাল', image: 'https://picsum.photos/seed/khobor-bn-sports-l1/880/540' },
          { eyebrow:'হকি', title:'এশিয়া কাপে বাংলাদেশের জয়', meta:'গতকাল', image: 'https://picsum.photos/seed/khobor-bn-sports-l2/880/540' },
          { eyebrow:'কাবাডি', title:'যুব এশিয়াডে স্বর্ণ', meta:'২ দিন আগে', image: 'https://picsum.photos/seed/khobor-bn-sports-l3/880/540' },
        ],
      },
      {
        name: 'বিনোদন', link: 'সব দেখুন →',
        cards: [
          { eyebrow:'চলচ্চিত্র', title:'কান উৎসবে বাংলাদেশের ছবি প্রিমিয়ার', meta:'৪০ মিনিট আগে', tone:['#4a2c5c','#180d20'], image: 'https://picsum.photos/seed/khobor-bn-culture-1/960/600' },
          { eyebrow:'সঙ্গীত', title:'আইয়ুব বাচ্চু স্মরণে বিশেষ কনসার্ট', meta:'১ ঘণ্টা আগে', tone:['#5c2c4a','#200d18'], image: 'https://picsum.photos/seed/khobor-bn-culture-2/960/600' },
          { eyebrow:'মঞ্চ', title:'নাট্য উৎসবের পর্দা উঠল শিল্পকলায়', meta:'২ ঘণ্টা আগে', tone:['#3d2c5c','#130820'], image: 'https://picsum.photos/seed/khobor-bn-culture-3/960/600' },
          { eyebrow:'টিভি', title:'ঈদের নাটকের তালিকা ঘোষণা', meta:'৪ ঘণ্টা আগে', tone:['#5c3d2c','#201308'], image: 'https://picsum.photos/seed/khobor-bn-culture-4/960/600' },
        ],
      },
      {
        name: 'আন্তর্জাতিক', link: 'সব দেখুন →',
        feature: { eyebrow:'জলবায়ু', title:'COP-৩১ সম্মেলনে অর্থায়ন প্রস্তাবে নতুন গতি', lede:'বাংলাদেশসহ দক্ষিণ এশিয়ার আটটি দেশ যৌথভাবে নতুন একটি অভিযোজন তহবিলের দাবি জানিয়েছে। আগামী সপ্তাহে আনুষ্ঠানিক প্রস্তাব জমা হবে।', meta:'ফেরদৌস ইসলাম · ১ ঘণ্টা আগে', tone:['#2c4a5c','#08131e'], image: 'https://picsum.photos/seed/khobor-bn-world-feature/960/640' },
        list: [
          { eyebrow:'এশিয়া', title:'টোকিওতে নতুন বাণিজ্য চুক্তি', meta:'৩ ঘণ্টা আগে', image: 'https://picsum.photos/seed/khobor-bn-world-l1/880/540' },
          { eyebrow:'ইউরোপ', title:'ইইউ পার্লামেন্টে অভিবাসন বিল পাস', meta:'৫ ঘণ্টা আগে', image: 'https://picsum.photos/seed/khobor-bn-world-l2/880/540' },
          { eyebrow:'মধ্যপ্রাচ্য', title:'কাতারে নতুন বাংলাদেশি কনস্যুলেট', meta:'৬ ঘণ্টা আগে', image: 'https://picsum.photos/seed/khobor-bn-world-l3/880/540' },
        ],
      },
      {
        name: 'মতামত', link: 'সব দেখুন →',
        cards: [
          { eyebrow:'সম্পাদকীয়', title:'প্রশাসনিক সংস্কারে কেন এই দেরি?', meta:'সম্পাদক · ২ ঘণ্টা আগে', tone:['#2a2f37','#0e1116'], image: 'https://picsum.photos/seed/khobor-bn-opinion-1/960/600' },
          { eyebrow:'কলাম', title:'অর্থনীতির পরের ছয় মাস কেমন হবে', meta:'ড. সেলিম রহমান · ৪ ঘণ্টা আগে', tone:['#1e3a5c','#08131e'], image: 'https://picsum.photos/seed/khobor-bn-opinion-2/960/600' },
          { eyebrow:'বিশ্লেষণ', title:'মেট্রোরেলের পরের ধাপ: ব্যয় ও সম্ভাবনা', meta:'নাফিসা কবির · ৬ ঘণ্টা আগে', tone:['#2a3a4a','#0e1116'], image: 'https://picsum.photos/seed/khobor-bn-opinion-3/960/600' },
          { eyebrow:'পাঠকের কথা', title:'একজন তরুণের চোখে শহরটা', meta:'সালমা আক্তার · গতকাল', tone:['#3d3d3d','#0e1116'], image: 'https://picsum.photos/seed/khobor-bn-opinion-4/960/600' },
        ],
      },
      {
        name: 'প্রযুক্তি ও জীবনযাপন', link: 'সব দেখুন →',
        cards: [
          { eyebrow:'প্রযুক্তি', title:'দেশীয় ক্লাউড ডেটা সেন্টার চালু', meta:'৩ ঘণ্টা আগে', tone:['#2c4a5c','#081320'], image: 'https://picsum.photos/seed/khobor-bn-living-1/960/600' },
          { eyebrow:'স্বাস্থ্য', title:'ডেঙ্গু প্রতিরোধে মৌসুমপূর্ব প্রস্তুতি', meta:'৫ ঘণ্টা আগে', tone:['#2c5c4a','#082018'], image: 'https://picsum.photos/seed/khobor-bn-living-2/960/600' },
          { eyebrow:'খাদ্য', title:'পুরান ঢাকার ঈদ বাজার ঘুরে', meta:'৭ ঘণ্টা আগে', tone:['#5c4a2c','#201808'], image: 'https://picsum.photos/seed/khobor-bn-living-3/960/600' },
          { eyebrow:'ভ্রমণ', title:'বান্দরবানের নতুন ট্রেইল', meta:'গতকাল', tone:['#3d5c2c','#13200d'], image: 'https://picsum.photos/seed/khobor-bn-living-4/960/600' },
        ],
      },
    ],
    trending: [
      'রেপো রেট অপরিবর্তিত: ব্যাংকিং খাতে কী প্রভাব',
      'নতুন মেট্রো রুট চালু: কোন স্টেশন কোথায়',
      'বাংলা একাডেমি পুরস্কার ঘোষণা',
      'এসএসসি ফল প্রকাশ ১৫ মে',
      'ঢাকায় বৃষ্টির পূর্বাভাস',
    ],
    videos: [
      { title:'লাইভ: প্রধানমন্ত্রীর সংবাদ সম্মেলন', duration:'LIVE', live:true, tone:['#1a2330','#000'], image: 'https://picsum.photos/seed/khobor-bn-video-live/1280/720' },
      { title:'এক নজরে দিনের প্রধান খবর', duration:'৩:১২', tone:['#3d2a30','#1a0d10'], image: 'https://picsum.photos/seed/khobor-bn-video-day/1280/720' },
      { title:'অর্থনীতির সাপ্তাহিক বিশ্লেষণ', duration:'৮:৪৫', tone:['#2c4a5c','#081320'], image: 'https://picsum.photos/seed/khobor-bn-video-econ/1280/720' },
    ],
    footer: {
      sections: [
        { title:'বিভাগ', items:['রাজনীতি','অর্থনীতি','খেলা','বিনোদন','আন্তর্জাতিক','মতামত','লাইফস্টাইল','প্রযুক্তি'] },
        { title:'খবর', items:['সর্বশেষ','সবচেয়ে পঠিত','ভিডিও','পডকাস্ট','ছবিঘর','গ্রাফিক্স'] },
        { title:'প্রতিষ্ঠান', items:['আমাদের সম্পর্কে','সম্পাদকীয় নীতিমালা','যোগাযোগ','বিজ্ঞাপন','নিয়োগ'] },
      ],
      copy: '© ২০২৬ খবর মিডিয়া লিমিটেড · সম্পাদক: একজন সম্পাদক · ঢাকা, বাংলাদেশ',
    },
    ui: { readMore:'আরও পড়ুন', viewAll:'সব দেখুন →', search:'খবর খুঁজুন…', subscribe:'সাবস্ক্রাইব', login:'লগইন', breaking:'BREAKING', live:'LIVE', trending:'এই মুহূর্তে জনপ্রিয়', mostRead:'সবচেয়ে পঠিত', newsletter:'প্রতিদিন সকালে খবর পান', newsletterSub:'সম্পাদকের নির্বাচিত খবর সরাসরি আপনার ইনবক্সে।', emailPh:'আপনার ইমেইল', subscribeBtn:'সাবস্ক্রাইব করুন', videosTitle:'ভিডিও' },
  },
  en: {
    date: 'Monday, 27 April 2026',
    dateEn: 'MON · 27 APR 2026',
    nav: ['Home','Politics','Economy','Sports','Culture','World','Opinion','Video','Lifestyle'],
    breaking: [
      'Student road-safety protests in Dhaka enter third day',
      'Bangladesh Bank holds repo rate at 9.5% as inflation eases',
      'Mushfiqur’s unbeaten 84 secures seven-wicket win',
      'Dhaka tables new climate finance proposal',
      'Metro rail now runs full Uttara–Kamalapur route',
    ],
    hero: {
      eyebrow: 'Politics',
      title: 'Inside the third day of Dhaka’s student road-safety protests',
      lede: 'Crowds gathered from dawn at Shahbag, Farmgate and Motijheel. Traffic was at a near standstill across the capital through midday.',
      meta: 'Riyad Ahmed · 3 hours ago · 6 min read',
      tone: ['#5a3a40','#1a0d10'],
      image: 'https://picsum.photos/seed/khobor-en-hero/1600/900',
    },
    heroSide: [
      { eyebrow:'Economy', title:'Repo rate held at 9.5%, inflation falls to 7.1%', meta:'35 min ago', image: 'https://picsum.photos/seed/khobor-en-side-econ/960/600' },
      { eyebrow:'World', title:'Bangladesh tables new climate-finance proposal', meta:'1 hour ago', image: 'https://picsum.photos/seed/khobor-en-side-world/960/600' },
      { eyebrow:'Sports', title:'Mushfiqur’s 84 sets up seven-wicket victory', meta:'2 hours ago', image: 'https://picsum.photos/seed/khobor-en-side-sports/960/600' },
      { eyebrow:'Tech', title:'Country’s first home-built cloud data centre opens', meta:'3 hours ago', image: 'https://picsum.photos/seed/khobor-en-side-tech/960/600' },
    ],
    sections: [
      {
        name: 'Politics', link: 'View all →',
        feature: { eyebrow:'Analysis', title:'Three secretaries replaced — what does it signal?', lede:'The Cabinet Division on Monday appointed new secretaries to three ministries. Analysts read it as a structural reshuffle, not a political one.', meta:'Ashfaq Rahman · 1 hour ago', tone:['#3d4a5c','#1a2330'], image: 'https://picsum.photos/seed/khobor-en-politics-feature/960/640' },
        list: [
          { eyebrow:'Parliament', title:'Budget session set to begin 5 June', meta:'2 hours ago', image: 'https://picsum.photos/seed/khobor-en-politics-l1/880/540' },
          { eyebrow:'Election', title:'EC proposes reform package for local polls', meta:'4 hours ago', image: 'https://picsum.photos/seed/khobor-en-politics-l2/880/540' },
          { eyebrow:'Diplomacy', title:'Dhaka and Delhi sign new border accord', meta:'6 hours ago', image: 'https://picsum.photos/seed/khobor-en-politics-l3/880/540' },
        ],
      },
      {
        name: 'Economy', link: 'View all →',
        cards: [
          { eyebrow:'Banking', title:'Repo held at 9.5%, inflation eases to 7.1%', meta:'35 min ago', tone:['#2c5530','#0e1a13'], image: 'https://picsum.photos/seed/khobor-en-econ-1/960/600' },
          { eyebrow:'Trade',   title:'Exports hit fresh record, up 14% year-on-year', meta:'2 hours ago', tone:['#5c4a2c','#1a1308'], image: 'https://picsum.photos/seed/khobor-en-econ-2/960/600' },
          { eyebrow:'Markets', title:'DSE index gains 30 points in late trade', meta:'3 hours ago', tone:['#2c4a5c','#081320'], image: 'https://picsum.photos/seed/khobor-en-econ-3/960/600' },
          { eyebrow:'Agri',    title:'Boro yield runs ahead of forecast', meta:'5 hours ago', tone:['#3d5c2c','#13200d'], image: 'https://picsum.photos/seed/khobor-en-econ-4/960/600' },
        ],
      },
      {
        name: 'Sports', link: 'View all →',
        feature: { eyebrow:'Cricket', title:'Mushfiqur’s 84 secures the series for Bangladesh', lede:'In Chattogram, Bangladesh chased down Sri Lanka with seven wickets in hand to take the three-match series 2–1.', meta:'Robin Rahman · 2 hours ago', tone:['#1a4a3d','#062018'], image: 'https://picsum.photos/seed/khobor-en-sports-feature/960/640' },
        list: [
          { eyebrow:'Football', title:'Bashundhara Kings clinch fifth straight title', meta:'Yesterday', image: 'https://picsum.photos/seed/khobor-en-sports-l1/880/540' },
          { eyebrow:'Hockey', title:'Bangladesh wins Asia Cup opener', meta:'Yesterday', image: 'https://picsum.photos/seed/khobor-en-sports-l2/880/540' },
          { eyebrow:'Kabaddi', title:'Gold at the Youth Asiad', meta:'2 days ago', image: 'https://picsum.photos/seed/khobor-en-sports-l3/880/540' },
        ],
      },
      {
        name: 'Culture', link: 'View all →',
        cards: [
          { eyebrow:'Film', title:'Bangladeshi feature premieres at Cannes', meta:'40 min ago', tone:['#4a2c5c','#180d20'], image: 'https://picsum.photos/seed/khobor-en-culture-1/960/600' },
          { eyebrow:'Music', title:'Tribute concert marks Ayub Bachchu’s memory', meta:'1 hour ago', tone:['#5c2c4a','#200d18'], image: 'https://picsum.photos/seed/khobor-en-culture-2/960/600' },
          { eyebrow:'Stage', title:'National theatre festival opens at Shilpakala', meta:'2 hours ago', tone:['#3d2c5c','#130820'], image: 'https://picsum.photos/seed/khobor-en-culture-3/960/600' },
          { eyebrow:'TV', title:'The Eid drama line-up, decoded', meta:'4 hours ago', tone:['#5c3d2c','#201308'], image: 'https://picsum.photos/seed/khobor-en-culture-4/960/600' },
        ],
      },
      {
        name: 'World', link: 'View all →',
        feature: { eyebrow:'Climate', title:'COP-31 finance proposal gathers momentum', lede:'Eight South Asian states, Bangladesh among them, will jointly table a new adaptation-fund proposal at next week’s ministerial session.', meta:'Ferdous Islam · 1 hour ago', tone:['#2c4a5c','#08131e'], image: 'https://picsum.photos/seed/khobor-en-world-feature/960/640' },
        list: [
          { eyebrow:'Asia', title:'Tokyo signs new trade pact with Dhaka', meta:'3 hours ago', image: 'https://picsum.photos/seed/khobor-en-world-l1/880/540' },
          { eyebrow:'Europe', title:'EU Parliament passes migration bill', meta:'5 hours ago', image: 'https://picsum.photos/seed/khobor-en-world-l2/880/540' },
          { eyebrow:'Mideast', title:'Bangladesh opens new consulate in Doha', meta:'6 hours ago', image: 'https://picsum.photos/seed/khobor-en-world-l3/880/540' },
        ],
      },
      {
        name: 'Opinion', link: 'View all →',
        cards: [
          { eyebrow:'Editorial', title:'Why is administrative reform stalling?', meta:'The Editor · 2 hours ago', tone:['#2a2f37','#0e1116'], image: 'https://picsum.photos/seed/khobor-en-opinion-1/960/600' },
          { eyebrow:'Column', title:'What the next six months hold for the economy', meta:'Dr. Selim Rahman · 4 hours ago', tone:['#1e3a5c','#08131e'], image: 'https://picsum.photos/seed/khobor-en-opinion-2/960/600' },
          { eyebrow:'Analysis', title:'The metro’s next phase: cost vs. capacity', meta:'Nafisa Kabir · 6 hours ago', tone:['#2a3a4a','#0e1116'], image: 'https://picsum.photos/seed/khobor-en-opinion-3/960/600' },
          { eyebrow:'Letters', title:'A young reader on her city, in her words', meta:'Salma Akhter · Yesterday', tone:['#3d3d3d','#0e1116'], image: 'https://picsum.photos/seed/khobor-en-opinion-4/960/600' },
        ],
      },
      {
        name: 'Tech & Living', link: 'View all →',
        cards: [
          { eyebrow:'Tech', title:'Country’s first home-built cloud data centre opens', meta:'3 hours ago', tone:['#2c4a5c','#081320'], image: 'https://picsum.photos/seed/khobor-en-living-1/960/600' },
          { eyebrow:'Health', title:'Pre-monsoon dengue prevention drive begins', meta:'5 hours ago', tone:['#2c5c4a','#082018'], image: 'https://picsum.photos/seed/khobor-en-living-2/960/600' },
          { eyebrow:'Food', title:'A guided walk through old-Dhaka’s Eid bazaar', meta:'7 hours ago', tone:['#5c4a2c','#201808'], image: 'https://picsum.photos/seed/khobor-en-living-3/960/600' },
          { eyebrow:'Travel', title:'A new trail through the Bandarban hills', meta:'Yesterday', tone:['#3d5c2c','#13200d'], image: 'https://picsum.photos/seed/khobor-en-living-4/960/600' },
        ],
      },
    ],
    trending: [
      'Repo rate held: what it means for banks',
      'New metro route opens — every station, mapped',
      'Bangla Academy prizes announced',
      'SSC results to be released 15 May',
      'Rain forecast across the capital',
    ],
    videos: [
      { title:'LIVE: Prime Minister addresses the nation', duration:'LIVE', live:true, tone:['#1a2330','#000'], image: 'https://picsum.photos/seed/khobor-en-video-live/1280/720' },
      { title:'The day in 3 minutes', duration:'3:12', tone:['#3d2a30','#1a0d10'], image: 'https://picsum.photos/seed/khobor-en-video-day/1280/720' },
      { title:'Weekly economy briefing', duration:'8:45', tone:['#2c4a5c','#081320'], image: 'https://picsum.photos/seed/khobor-en-video-econ/1280/720' },
    ],
    footer: {
      sections: [
        { title:'Sections', items:['Politics','Economy','Sports','Culture','World','Opinion','Lifestyle','Tech'] },
        { title:'News', items:['Latest','Most read','Video','Podcasts','Photo','Graphics'] },
        { title:'Company', items:['About','Editorial standards','Contact','Advertise','Careers'] },
      ],
      copy: '© 2026 Khobor Media Ltd. · Editor in Chief, an Editor · Dhaka, Bangladesh',
    },
    ui: { readMore:'Read more', viewAll:'View all →', search:'Search the news…', subscribe:'Subscribe', login:'Sign in', breaking:'BREAKING', live:'LIVE', trending:'Trending now', mostRead:'Most read', newsletter:'The morning briefing', newsletterSub:'The editor’s picks, in your inbox by 7am.', emailPh:'Your email', subscribeBtn:'Subscribe', videosTitle:'Video' },
  },
};
