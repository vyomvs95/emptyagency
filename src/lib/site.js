import { MEDIA, FILM, YT } from './media.js'
import { CASE_STUDIES, FOLDERS, UIUX_CREDIT } from './case-studies.js'
import { UIUX } from './uiux-media.js'
import { CGI_FOLDERS, CGI_STUDIES } from './cgi-case-studies.js'

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */
/**
 * `label` is the plain-English name printed in the UI. `tech` is the
 * original studio name — the cursor tag shows it on hover, so the page
 * stays readable and the technical character lives in the cursor.
 */
export const ROUTES = [
  { id: 'index', label: 'HOME', tech: 'INDEX', path: '/' },
  { id: 'archive', label: 'WORK', tech: 'ARCHIVE', path: '/archive' },
  { id: 'capabilities', label: 'SERVICES', tech: 'CAPABILITIES', path: '/capabilities' },
  { id: 'vision', label: 'ABOUT US', tech: 'VISION', path: '/vision' },
  {
    id: 'initiate',
    label: 'START A PROJECT ↗',
    tech: 'INITIATE',
    path: '/initiate',
    cta: true,
  },
]

export const ROUTE_IDS = ROUTES.map((r) => r.id)

/* ------------------------------------------------------------------ */
/*  OUR WORK — projects, bucketed                                      */
/* ------------------------------------------------------------------ */
/**
 * Every piece of work belongs to exactly ONE project, and every project
 * to exactly ONE bucket — nothing appears twice across the site. A
 * project holds all of its pieces (a poster and its motion version, a
 * client's four showreels…); its card opens a panel showing them all.
 *
 * `label` is printed; `tech` is the original name, shown in the cursor.
 */
export const BUCKETS = [
  { id: 'all', label: 'ALL WORK', tech: 'SHOW_ALL' },
  { id: 'uiux', label: 'UI/UX DESIGN', tech: 'INTERFACE' },
  { id: '3d', label: '3D & CGI', tech: 'RENDER' },
  { id: 'videos', label: 'FILM', tech: 'FOOTAGE' },
  { id: 'motion', label: 'MOTION', tech: 'KINETIC' },
  { id: 'graphics', label: 'GRAPHICS', tech: 'STATIC' },
]

/** Priority order used everywhere: UI/UX first, then 3D, then the rest. */
export const PRIORITY = ['uiux', '3d', 'videos', 'motion', 'graphics']

/** Kept for the cursor/filters, which still speak of categories. */
export const CATEGORIES = BUCKETS

const UMAR = 'DESIGN: UMAR KHAN / WORLD STYLE'
const TEAM = 'EMPTY AGENCY CORE TEAM'
const ONE_DIGITAL = 'ONE DIGITAL ENTERTAINMENT'

/* asset helpers — every piece carries a caption for the panel */
const img = (m, caption) => ({ kind: 'image', ...m, caption })
const vid = (m, caption) => ({ kind: 'video', ...m, caption })
const yt = (id, caption) => ({ kind: 'youtube', id, caption, w: 1280, h: 720 })

/**
 * A piece whose file isn't on disk yet (e.g. a film still waiting to be
 * fetched from Drive) is dropped rather than rendered broken, and the
 * project's cover falls through to its first piece that exists.
 */
const exists = (a) => (a.kind === 'youtube' ? Boolean(a.id) : Boolean(a.src))
/* ---------------------------- CASE STUDIES ---------------------------- */
/* UI/UX (case-studies.js) and 3D (cgi-case-studies.js) share one shape. A
   study's card cover is its `coverAsset` (a film, for 3D) or the composed
   UI/UX cover image. Folders group several studies for one client or theme. */
const STUDIES = [...CASE_STUDIES, ...CGI_STUDIES]
const ALL_FOLDERS = [...FOLDERS, ...CGI_FOLDERS]
const studyCover = (c) => c.coverAsset ?? img(UIUX[c.slug].cover, 'Cover')
const csImages = (c) => c.caseStudy.sections.flatMap((sec) => sec.images.map((i) => img(i, i.caption)))
const CS = Object.fromEntries(STUDIES.map((c) => [c.slug, c]))
const IN_FOLDER = new Set(ALL_FOLDERS.flatMap((f) => f.children))
const withDefaults = (c) => ({ bucket: 'uiux', credit: UIUX_CREDIT, ...c })

const CASE_PROJECTS = [
  ...ALL_FOLDERS.map((f) => {
    const chapters = f.children.map((slug) => ({ ...withDefaults(CS[slug]), cover: studyCover(CS[slug]) }))
    const cover = f.coverSlug ? studyCover(CS[f.coverSlug]) : img(UIUX[f.cover].cover, 'Cover')
    return {
      ...withDefaults(f),
      chapters,
      assets: [cover, ...chapters.flatMap((c) => [c.cover, ...csImages(c)])],
    }
  }),
  ...STUDIES.filter((c) => !IN_FOLDER.has(c.slug)).map((c) => ({
    ...withDefaults(c),
    assets: [studyCover(c), ...csImages(c)],
  })),
].map((p) => ({ ...p, cover: p.assets[0] }))

const project = (p) => {
  const assets = p.assets.filter(exists)
  return { ...p, assets, cover: assets[0] }
}

const ALL_PROJECTS = [
  /* ================================ VIDEOS =============================== */
  project({
    slug: 'elf-tamannaah',
    hero: true,
    bucket: 'videos',
    title: 'ELF × TAMANNAAH — 2026 JEWELLERY CAMPAIGN',
    client: 'ELF · TAMANNAAH BHATIA',
    role: 'Campaign film and social cut-downs across three looks.',
    summary:
      'A jewellery campaign starring Tamannaah Bhatia, shot across three looks — Denim, Glam and Slim Green — and cut for every screen, horizontal and vertical.',
    credit: TEAM,
    assets: [
      vid(FILM['elf-tamannaah-master'], 'Master film'),
      vid(FILM['elf-glam-h'], 'Glam look — horizontal'),
      vid(FILM['elf-glam-v'], 'Glam look — vertical'),
      vid(FILM['elf-denim-h'], 'Denim look — horizontal'),
      vid(FILM['elf-denim-v'], 'Denim look — vertical'),
      vid(FILM['elf-slim-green-h'], 'Slim Green look — horizontal'),
      vid(FILM['elf-slim-green-v'], 'Slim Green look — vertical'),
    ],
  }),
  project({
    slug: 'tmc',
    bucket: 'videos',
    title: 'TMC — TALENT MANAGEMENT COMPANY',
    client: 'TMC TALENT MANAGEMENT COMPANY',
    role: 'Company reel and artist showreels for the agency roster.',
    summary:
      'The agency’s own company reel and showreels for the artists it represents — anchors, hosts and performers — cut for bookings and events.',
    credit: TEAM,
    assets: [
      yt(YT.tmcReel, 'TMC company reel 2023'),
      yt(YT.sandeepBatraa, 'Sandeep Batraa — showreel'),
      yt(YT.vipulRoyWedding, 'Vipul Roy — wedding showreel'),
      vid(FILM['vipul-corp-showreel-final'], 'Vipul Roy — corporate showreel'),
    ],
  }),
  project({
    slug: 'adil-hussaini',
    bucket: 'videos',
    title: 'ADIL HUSSAINI — SUFI SINGER',
    client: 'ADIL HUSSAINI',
    role: 'Performance showreels and a music release.',
    summary:
      'Showreels for the Sufi singer’s live act, and the release of his love song Daayera.',
    credit: TEAM,
    assets: [
      yt(YT.adilShowreel, 'Showreel 2023'),
      yt(YT.adilDaayera, 'Daayera — the love song'),
      vid(FILM['new-sufi-showreel-finall'], 'Sufi showreel'),
    ],
  }),
  project({
    slug: 'event-soul',
    bucket: 'videos',
    title: 'EVENT SOUL — WEDDING PLANNER',
    client: 'EVENT SOUL',
    role: 'Planner showreel and a destination wedding song.',
    summary:
      'The wedding planner’s 2024 showreel, and a wedding song film shot at a destination wedding in Bahrain.',
    credit: TEAM,
    assets: [
      yt(YT.eventSoulReel, 'Wedding planner showreel 2024'),
      yt(YT.rohanRohan, 'Rohan Rohan — Bahrain wedding song'),
    ],
  }),
  project({
    slug: 'shaarib-toshi-live',
    bucket: 'videos',
    title: 'SHAARIB & TOSHI — REELS & LIVE',
    client: 'SHAARIB & TOSHI',
    role: 'Music showreel, live-show films and an award reel.',
    summary:
      'The composer duo’s music showreel, films of their live shows in Kolkata, Rajkot and Udaipur, and an award-nomination reel.',
    credit: TEAM,
    assets: [
      vid(FILM['bollywood-2023-new-final'], 'Music showreel'),
      vid(FILM['st-live-kolkata-morning-show-v1'], 'Live in Kolkata'),
      vid(FILM['st-live-rajkot'], 'Live in Rajkot'),
      vid(FILM['st-live-udaipur-v1'], 'Live in Udaipur'),
      vid(FILM['award-nominee-st'], 'Award nominee reel'),
      vid(FILM['toshib-and-sharib'], 'On stage'),
    ],
  }),
  project({
    slug: 'wedding-films',
    bucket: 'videos',
    title: 'WEDDING FILMS',
    client: 'PRIVATE CLIENTS',
    role: 'Wedding trailers, highlight films and ceremony edits.',
    summary:
      'Trailers and highlight films from weddings — the mehndi, the baraat, the ceremony and the gift song.',
    credit: TEAM,
    assets: [
      vid(FILM['s-b-trailer'], 'S & B — trailer'),
      vid(FILM['vaishnavi-nimay-final'], 'Vaishnavi & Nimay'),
      vid(FILM['vaishnavi-wow-final'], 'Vaishnavi — highlight'),
      vid(FILM['final-gift-song'], 'The gift song'),
      vid(FILM['mehndi-final'], 'Mehndi'),
      vid(FILM['baraat-aftermovie-final'], 'Baraat — aftermovie'),
    ],
  }),
  project({
    slug: 'event-aftermovies',
    bucket: 'videos',
    title: 'EVENT AFTERMOVIES',
    client: 'EVENTS & VENUES',
    role: 'Aftermovies and reels from concerts, parties and nights out.',
    summary:
      'Fast-cut aftermovies from live events — a Dubai Atlantis event, Bollywood club nights, New Year’s Eve and Republic Day shows.',
    credit: TEAM,
    assets: [
      vid(FILM['dubai-atlantis-aftermovie'], 'Dubai Atlantis'),
      vid(FILM['26-jan-aftermovie'], '26 January'),
      vid(FILM['club-bollywood1'], 'Club Bollywood'),
      vid(FILM['31st-reel'], '31st night — reel'),
    ],
  }),
  project({
    slug: 'artist-showreels',
    bucket: 'videos',
    title: 'ARTIST SHOWREELS',
    client: 'PERFORMERS & HOSTS',
    role: 'Showreels for singers, hosts and performing acts.',
    summary:
      'Showreels cut for performers and hosts to book live shows, weddings and corporate events.',
    credit: TEAM,
    assets: [
      vid(FILM['new-showreel-2024'], 'Showreel 2024'),
      vid(FILM['p-i-showreel-2024-final'], 'P.I — showreel 2024'),
      vid(FILM['suleiman-showreell'], 'Suleiman — showreel'),
      vid(FILM['artist-entertainment-final'], 'Artist entertainment'),
      vid(FILM['purva-award-nominee'], 'Purva — award nominee reel'),
      vid(FILM['showreel-final-without-logo'], 'Performer showreel'),
    ],
  }),
  project({
    slug: 'jab-tu-meri-na-rahi',
    bucket: 'videos',
    title: 'JAB TU MERI NA RAHI — TEASER',
    client: 'MUSIC RELEASE',
    role: 'Teaser for the music video.',
    summary: 'The teaser cut for the music video, released ahead of the song.',
    credit: TEAM,
    assets: [vid(FILM['jab-tu-meri-na-rahi-final-teaser-2k'], 'Teaser')],
  }),
  project({
    slug: 'pasandida-ladies',
    bucket: 'videos',
    title: 'PASANDIDA LADIES — EP. 6',
    client: 'JANICE SEQUEIRA',
    role: 'Episode edit for the interview series.',
    summary:
      'An episode of Janice Sequeira’s interview series, with Karishma Kewalramani on building FAE Beauty.',
    credit: TEAM,
    assets: [yt(YT.pasandidaLadies, 'Episode 6 — FAE Beauty')],
  }),

  /* ================================ MOTION =============================== */
  project({
    slug: 'osho-jain',
    bucket: 'motion',
    title: 'OSHO JAIN — LYRIC VIDEOS',
    client: 'OSHO JAIN',
    role: 'A series of ten painted lyric videos.',
    summary:
      'Ten lyric videos for the singer-songwriter, each built around a single painted, slowly moving scene.',
    credit: TEAM,
    assets: [
      yt(YT.oshoKaunApna, 'Kaun Apna'),
      yt(YT.oshoMazhabHai, 'Mazhab Hai'),
      yt(YT.oshoTujhse, 'Tujhse Badhkar Nahi Hai'),
      yt(YT.oshoSahare, 'Sahare Tere'),
      yt(YT.oshoUljhe, 'Uljhe Hue'),
      yt(YT.oshoNaaMila, 'Naa Mila Sukoon'),
      yt(YT.oshoUljheRaw, 'Uljhe Hue (Raw)'),
      yt(YT.oshoHumara, 'Humara Ho Gaya'),
      yt(YT.oshoKyaDekhu, 'Kya Dekhu'),
      yt(YT.oshoBohotHua, 'Bohot Hua'),
    ],
  }),
  project({
    slug: 'vb-music',
    bucket: 'motion',
    title: 'VB MUSIC — MASK KHO GAYA & DHOOP AANE DO',
    client: 'VB MUSIC · VISHAL BHARDWAJ',
    agency: ONE_DIGITAL,
    role: 'Label logo, illustrated and animated song posters.',
    summary:
      'Work for Vishal Bhardwaj’s music label: its logo, an illustrated poster and two motion posters for Mask Kho Gaya, and the poster for Dhoop Aane Do with Gulzar and Rekha Bhardwaj.',
    credit: UMAR,
    assets: [
      vid(MEDIA.maskKhoGayaMotion1, 'Mask Kho Gaya — motion poster'),
      vid(MEDIA.maskKhoGayaMotion2, 'Mask Kho Gaya — motion poster II'),
      img(MEDIA.maskKhoGaya, 'Mask Kho Gaya — illustrated poster'),
      img(MEDIA.dhoopAaneDo, 'Dhoop Aane Do — release poster'),
      img(MEDIA.logoVbMusic, 'VB Music — logo'),
    ],
  }),
  project({
    slug: 'zindagi',
    bucket: 'motion',
    title: 'ZINDAGI — CARRYMINATI × WILY FRENZY',
    client: 'CARRYMINATI × WILY FRENZY',
    agency: ONE_DIGITAL,
    role: 'Release poster and its motion version.',
    summary: 'The release poster for the single, and the animated version made for launch.',
    credit: UMAR,
    assets: [
      vid(MEDIA.zindagiMotion, 'Motion poster'),
      img(MEDIA.zindagiPoster, 'Release poster'),
    ],
  }),
  project({
    slug: 'hyper-octane',
    bucket: 'motion',
    title: 'HYPER OCTANE — LOGO & ANIMATION',
    client: 'HYPER OCTANE',
    role: 'Logo design and its animated reveal.',
    summary: 'A logo for Hyper Octane, and the animated reveal built from it.',
    credit: UMAR,
    assets: [
      vid(MEDIA.hyperOctaneLogo, 'Logo animation'),
      img(MEDIA.logoHyperOctane, 'Logo'),
    ],
  }),

  /* =============================== GRAPHICS ============================== */
  project({
    slug: 'sony-prime-video',
    bucket: 'graphics',
    title: 'SONY PICTURES — PRIME VIDEO THUMBNAILS',
    client: 'SONY PICTURES',
    agency: ONE_DIGITAL,
    role: 'Streaming thumbnails for the film catalogue.',
    summary: 'Thumbnails for Sony Pictures films on Prime Video.',
    credit: UMAR,
    assets: [
      img(MEDIA.sonyBeautifulDay, 'A Beautiful Day in the Neighborhood'),
      img(MEDIA.sonyDjango, 'Django Unchained'),
      img(MEDIA.sonyBloodshot, 'Bloodshot'),
    ],
  }),
  project({
    slug: 'badshah',
    bucket: 'graphics',
    title: 'BADSHAH — ILZAAM & THE POWER OF DREAMS',
    client: 'BADSHAH',
    agency: ONE_DIGITAL,
    role: 'Cover artwork and song posters.',
    summary: 'Cover artwork for Ilzaam and the poster for The Power of Dreams.',
    credit: UMAR,
    assets: [
      img(MEDIA.ilzaam, 'Ilzaam — cover'),
      img(MEDIA.powerOfDreams, 'The Power of Dreams — poster'),
    ],
  }),
  project({
    slug: 'song-artwork',
    bucket: 'graphics',
    title: 'SONG ARTWORK — SELECTED COVERS',
    client: 'ARTISTS & LABELS',
    role: 'Cover artwork for singles across Punjabi, hip-hop and indie.',
    summary:
      'A selection of single covers — Indian Wine, Sanju, Rangreza, Musafir, Rona Pai Gaya and Diamond.',
    credit: UMAR,
    assets: [
      img(MEDIA.indianWine, 'Indian Wine — Su Real ft. General Zooz'),
      img(MEDIA.sanju, 'Sanju — Sidhu Moose Wala'),
      img(MEDIA.rangreza, 'Rangreza'),
      img(MEDIA.musafir, 'Musafir — Rashmeet Kaur ft. DVK'),
      img(MEDIA.ronaPaiGaya, 'Rona Pai Gaya — Humble Music'),
      img(MEDIA.diamond, 'Diamond'),
    ],
  }),
  project({
    slug: 'youtube-thumbnails',
    bucket: 'graphics',
    title: 'YOUTUBE THUMBNAILS & MILESTONES',
    client: 'ARTISTS & CREATORS',
    role: 'Thumbnails and milestone posts for music and creator channels.',
    summary: 'Thumbnails for music videos, and posts celebrating view milestones.',
    credit: UMAR,
    assets: [
      { ...img(MEDIA.aajaSoneya, 'Aaja Soneya — Dhrriti Saharan'), agency: ONE_DIGITAL },
      img(MEDIA.mereRangMein, 'Mere Rang Mein — 21M views'),
      img(MEDIA.sheikhChilli, 'Sheikh Chilli — 100M views'),
    ],
  }),
  project({
    slug: 'design-competitions',
    bucket: 'graphics',
    title: 'DESIGN COMPETITION CAMPAIGNS',
    client: 'UNBOX 2017 · POCKET SEAT 2018',
    role: 'Launch and countdown posters for international competitions.',
    summary:
      'Poster campaigns for two international design competitions — the UNBOX 2017 architecture competition, with its daily countdown series, and Pocket Seat 2018.',
    credit: UMAR,
    assets: [
      img(MEDIA.unboxLaunch, 'UNBOX 2017 — launch poster'),
      img(MEDIA.unboxCountdown, 'UNBOX 2017 — countdown'),
      img(MEDIA.pocketSeat, 'Pocket Seat 2018'),
    ],
  }),

  /* ============================= UI/UX DESIGN ============================ */
  /* Long-form case studies — content lives in case-studies.js. A client
     with several products is one folder card (its panel lists chapters);
     everything else is a card of its own. `assets` holds every image so
     counts and the cover work as usual. */
  ...CASE_PROJECTS,
]

/** Every project, UI/UX first, then 3D, then film, motion and graphics;
    within a bucket the strongest case studies lead (RANK). */
const RANK = [
  'mswipe', 'v2p', 'enquest-hrms', 'connectify', 'invest-app', 'fuel-card-app', 'ott-app',
  'all-hub', 'real-estate-visualisation', 'clear-x', 'eume-cabin-pro', 'stuffcool',
  'luca-chronograph', 'protectli-vault-pro', 'cougar-chair', 'product-spots',
]
const rank = (p) => (RANK.includes(p.slug) ? RANK.indexOf(p.slug) : RANK.length)
export const PROJECTS = [...ALL_PROJECTS].sort(
  (a, b) => PRIORITY.indexOf(a.bucket) - PRIORITY.indexOf(b.bucket) || rank(a) - rank(b)
)

/* ------------------------------------------------------------------ */
/*  HOME                                                               */
/* ------------------------------------------------------------------ */
const bySlug = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]))

/** The hero project — in focus at the top of the home page. */
export const HERO = bySlug['elf-tamannaah']

/** Selected work under the ELF hero film — UI/UX first, then 3D, then film. */
export const FEATURED = [
  bySlug.mswipe,
  bySlug['enquest-hrms'],
  bySlug['all-hub'],
  bySlug['real-estate-visualisation'],
  bySlug.stuffcool,
  bySlug['sony-prime-video'],
]

/**
 * Industries, as on an agency site — each names only projects that exist
 * here, and those project cards open straight from the home page.
 */
export const INDUSTRIES = [
  ['fintech & payments', 'Merchant apps, POS software, payment portals, lending and investing products.', ['mswipe', 'v2p', 'invest-app']],
  ['enterprise software', 'HR systems, dashboards and B2B messaging platforms.', ['enquest-hrms', 'connectify']],
  ['industrial & logistics', 'Explainer films that make complex operations easy to understand and buy.', ['all-hub']],
  ['real estate', 'Walkthroughs, township films and 3D floor plans for developers.', ['real-estate-visualisation']],
  ['consumer products', 'CGI launch films for accessories, luggage, watches and hardware.', ['clear-x', 'eume-cabin-pro', 'stuffcool', 'luca-chronograph', 'protectli-vault-pro', 'cougar-chair']],
  ['entertainment & music', 'Campaign films, artwork and lyric videos for artists, labels and studios.', ['elf-tamannaah', 'sony-prime-video', 'osho-jain']],
].map(([name, body, slugs]) => ({ name, body, projects: slugs.map((s) => bySlug[s]).filter(Boolean) }))

/* ------------------------------------------------------------------ */
/*  HOME — brands and FAQ                                             */
/* ------------------------------------------------------------------ */
/**
 * Names taken only from projects on this site (their `client` fields).
 * Some of that work was made through partner agencies, which the home
 * page says right under the grid.
 */
export const BRANDS = [
  'MSWIPE', 'ETISALAT UTAP', 'V2P', 'ENQUEST ERP', 'CONNECTIFY',
  'AMFICO', 'STUFFCOOL', 'EUME', 'LUCA', 'PROTECTLI',
  'ELF', 'SONY PICTURES', 'BADSHAH', 'VB MUSIC', 'CARRYMINATI',
]

/**
 * Answers use only what the site already states: the services, the three
 * steps and their durations (PIPELINE), the budget bands on the enquiry
 * form (BUDGETS) and the one inbox (EMAIL). Keep them in step if those change.
 */
export const FAQ = [
  [
    'What does empty agency do?',
    'UI/UX design for apps, platforms and websites; 3D and CGI — product films, explainers, walkthroughs and renders; and the film, motion and graphic design that launch them. Because it is one team, everything we make for a brand feels like it belongs together.',
  ],
  [
    'How does a project run?',
    'In three steps. Simplify: we narrow the idea to what matters. Plan: we lay out the structure and check it works before anything is styled. Build: we design and deliver the finished work.',
  ],
  [
    'How long does it take?',
    'Roughly a week to simplify, two to three weeks to plan and four to eight weeks to build — so most projects land in two to three months. Smaller pieces, like a single film or a set of artwork, are faster.',
  ],
  [
    'What budgets do you work with?',
    'Most projects fall between $10k and $50k, and larger engagements start at $50k. Tell us your range on the enquiry form and we will say honestly what it can cover.',
  ],
  [
    'Do you work with teams outside India?',
    'Yes. We work with clients worldwide, remotely, across time zones.',
  ],
  [
    'How do we start?',
    'Answer three short questions on Start a Project, or email marketing@emptyagency.com. We reply within one working day.',
  ],
]

/* ------------------------------------------------------------------ */
/*  RIGHTS NOTICE                                                      */
/* ------------------------------------------------------------------ */
/**
 * Shown on Our Work and in the footer. Written to claim only what is
 * true — that the team designed this work — and to disclaim ownership
 * of every client's marks, artwork and likenesses. Have it reviewed by
 * a lawyer before relying on it; it cannot override any NDA or contract
 * the designer signed with a client or agency.
 */
export const RIGHTS_NOTICE =
  'All work is shown for portfolio purposes only and was created in association with World Style. ' +
  'All trademarks, artwork and likenesses remain the property of their respective owners; their appearance implies no ownership, endorsement or affiliation. ' +
  'For corrections or removal, email marketing@emptyagency.com.'

/* ------------------------------------------------------------------ */
/*  CAPABILITIES                                                       */
/* ------------------------------------------------------------------ */
export const STACK = [
  { id: 'FIGMA', name: 'FIGMA', human: 'UI/UX Design' },
  { id: 'BLENDER', name: 'BLENDER', human: '3D Modeling' },
  { id: 'AFTER_EFFECTS', name: 'AFTER EFFECTS', human: 'Motion Software' },
  { id: 'PREMIERE_PRO', name: 'PREMIERE PRO', human: 'Video Editing' },
  { id: 'PHOTOSHOP', name: 'PHOTOSHOP', human: 'Image Editing' },
  { id: 'ILLUSTRATOR', name: 'ILLUSTRATOR', human: 'Logos & Vector Art' },
]

/** `title` is printed; `tech` is the original name, shown in the cursor tag. */
export const PILLARS = [
  {
    index: '01',
    title: 'UI/UX design',
    tech: 'INTERFACE',
    body: 'Mobile apps, web platforms, dashboards and websites — from research and user flows to wireframes, a design system and developer-ready screens.',
    outputs: ['MOBILE APPS', 'WEB APPS & DASHBOARDS', 'WEBSITES', 'DESIGN SYSTEMS'],
  },
  {
    index: '02',
    title: '3D & CGI',
    tech: 'RENDER',
    body: 'Product films, industrial explainers, real-estate walkthroughs, 3D floor plans and photoreal renders — so a product or a place can be seen, understood and sold before it exists.',
    outputs: ['PRODUCT FILMS', 'EXPLAINER FILMS', 'WALKTHROUGHS & FLOOR PLANS', 'PHOTOREAL RENDERS'],
  },
  {
    index: '03',
    title: 'video & motion',
    tech: 'KINETIC',
    body: 'Campaign films and their cut-downs, showreels, event films, lyric videos and motion graphics — edited for the screen they will be watched on.',
    outputs: ['CAMPAIGN FILMS', 'SHOWREELS & EVENTS', 'LYRIC VIDEOS', 'MOTION GRAPHICS'],
  },
  {
    index: '04',
    title: 'graphic design',
    tech: 'STATIC',
    body: 'Film and song artwork, thumbnails, social campaigns, posters and logos — built to be recognised at a glance and hold together across every format.',
    outputs: ['SONG ARTWORK', 'THUMBNAILS', 'SOCIAL POSTS', 'LOGOS'],
  },
]

export const PIPELINE = [
  {
    step: 'STEP 1',
    title: 'simplify.',
    tech: 'SUBTRACT',
    body: 'We talk through your idea and narrow it down to what really matters. Nothing extra.',
    duration: '1 WEEK',
  },
  {
    step: 'STEP 2',
    title: 'plan.',
    tech: 'WIREFRAME',
    body: 'We lay out the structure first and make sure it works before anything gets styled.',
    duration: '2–3 WEEKS',
  },
  {
    step: 'STEP 3',
    title: 'build.',
    tech: 'RENDER',
    body: 'We design and deliver the finished work: artwork, animation, video, 3D or a product ready for development.',
    duration: '4–8 WEEKS',
  },
]

/* ------------------------------------------------------------------ */
/*  MISC                                                               */
/* ------------------------------------------------------------------ */
export const MARQUEE_TEXT =
  '// UI/UX DESIGN // 3D & CGI // FILM // MOTION // GRAPHIC DESIGN // WE CLEAR THE CLUTTER '

/** The studio's one inbox. Shown on the site and where every enquiry lands. */
export const EMAIL = 'marketing@emptyagency.com'

/**
 * Enquiry delivery. The site is static (no server of its own), so the
 * form posts to FormSubmit, which emails each submission to EMAIL.
 * The very first submission triggers a one-time "activate this form"
 * email to that inbox — enquiries only start arriving once it is clicked.
 */
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

export const SOCIALS = [
  { label: 'DRIBBBLE', human: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'LINKEDIN', human: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'X', human: 'X (Twitter)', href: 'https://x.com' },
]

export const BUDGETS = ['$10k - $25k', '$25k - $50k', '$50k+']
