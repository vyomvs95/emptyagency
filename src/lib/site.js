import { MEDIA, FILM, YT } from './media.js'

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
  { id: 'archive', label: 'OUR WORK', tech: 'ARCHIVE', path: '/archive' },
  { id: 'capabilities', label: 'WHAT WE DO', tech: 'CAPABILITIES', path: '/capabilities' },
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
  { id: 'all', label: 'EVERYTHING', tech: 'SHOW_ALL' },
  { id: 'videos', label: 'VIDEOS', tech: 'FOOTAGE' },
  { id: 'motion', label: 'MOTION', tech: 'KINETIC' },
  { id: 'graphics', label: 'GRAPHICS', tech: 'STATIC' },
  { id: '3d', label: '3D', tech: 'RENDER' },
]

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
const project = (p) => {
  const assets = p.assets.filter(exists)
  return { ...p, assets, cover: assets[0] }
}

export const PROJECTS = [
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
    slug: 'social-nation',
    bucket: 'motion',
    title: 'SOCIAL NATION — FESTIVAL IDENTITY',
    client: 'SOCIAL NATION',
    role: 'Hand-lettered logo and animated Instagram stickers.',
    summary:
      'A hand-lettered logo for the creator festival and a set of animated GIF stickers for its Instagram.',
    credit: UMAR,
    assets: [
      vid(MEDIA.snMakeSomeNoise, 'Sticker — Make Some Noise'),
      vid(MEDIA.snCheckThisOut, 'Sticker — Check This Out'),
      vid(MEDIA.snPerformance, 'Sticker — What a Performance'),
      vid(MEDIA.snYeApna, 'Sticker — Ye Apna Festival Hai'),
      img(MEDIA.logoSocialNation, 'Logo'),
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
  project({
    slug: 'one-digital',
    bucket: 'motion',
    title: 'ONE DIGITAL — STING & ANIMATED STORIES',
    client: ONE_DIGITAL,
    agency: ONE_DIGITAL,
    role: 'Logo sting and animated Instagram stories.',
    summary:
      'The network’s animated logo sting, and animated Instagram stories for its film and celebrity pages.',
    credit: UMAR,
    assets: [
      vid(MEDIA.oneDigitalSting, 'Logo sting'),
      vid(MEDIA.alia40m, 'Alia Bhatt — 40M followers'),
      vid(MEDIA.smzs, '#FilmsThisMonth — Shubh Mangal Zyada Saavdhan'),
      vid(MEDIA.ranveerDecade, '#2019Recap — Ranveer Singh'),
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
  project({
    slug: 'logo-design',
    bucket: 'graphics',
    title: 'LOGO DESIGN',
    client: 'CLUBS, ARTISTS & LABELS',
    role: 'Logos and monograms.',
    summary: 'Logos for a cricket club, a singer and a fashion label.',
    credit: UMAR,
    assets: [
      img(MEDIA.logoDangalDawgs, 'Dangal Dawgs Cricket Club'),
      img(MEDIA.logoShivangi, 'Shivangi Bhayana — monogram'),
      img(MEDIA.logoShailshri, 'Shailshri Couture'),
    ],
  }),

  /* ================================== 3D ================================= */
  project({
    slug: 'interior-visualisation',
    bucket: '3d',
    title: 'INTERIOR VISUALISATION',
    client: 'RESIDENTIAL CONCEPTS',
    role: 'Photoreal renders of interior concepts.',
    summary: 'Interior concepts rendered before anything is built — bedrooms, a kitchen and kids’ rooms.',
    credit: UMAR,
    assets: [
      img(MEDIA.oceanBedroom, 'Ocean-floor bedroom'),
      img(MEDIA.redKitchen, 'Red kitchen'),
      img(MEDIA.babyRoom, 'Baby room'),
      img(MEDIA.kidsRoom, 'Kids’ room'),
    ],
  }),
  project({
    slug: 'architecture-product',
    bucket: '3d',
    title: 'ARCHITECTURE & PRODUCT RENDERS',
    client: 'CONCEPT WORK',
    role: 'Exterior and product renders.',
    summary: 'An exterior render of a roadside restaurant, and a product render of a sofa.',
    credit: UMAR,
    assets: [img(MEDIA.dhaba, 'Dhaba — exterior'), img(MEDIA.sofaRender, 'Sofa — product render')],
  }),
]

/* ------------------------------------------------------------------ */
/*  HOME                                                               */
/* ------------------------------------------------------------------ */
const bySlug = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]))

/** The hero project — in focus at the top of the home page. */
export const HERO = bySlug['elf-tamannaah']

/** Three more under it, one per bucket, all with 16:9 covers. */
export const FEATURED = [bySlug.tmc, bySlug['osho-jain'], bySlug['sony-prime-video']]

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
  'The work shown here was created or edited by members of the empty agency ' +
  'core team, including Umar Khan (World Style), independently or while ' +
  'working with agencies such as One Digital Entertainment. It is shown ' +
  'solely as a record ' +
  'of that professional experience. All trademarks, logos, film and music ' +
  'artwork, and the names and likenesses of artists and brands belong to ' +
  'their respective owners. empty agency claims no ownership of them, and ' +
  'their appearance here does not imply endorsement by, or a current ' +
  'relationship with, any rights holder. Videos marked as YouTube pieces are ' +
  'played through YouTube’s standard embedded player and remain hosted by ' +
  'their owners. To request a correction or removal, ' +
  'email marketing@emptyagency.com and we will act promptly.'

/* ------------------------------------------------------------------ */
/*  CAPABILITIES                                                       */
/* ------------------------------------------------------------------ */
export const STACK = [
  { id: 'PHOTOSHOP', name: 'PHOTOSHOP', human: 'Image Editing' },
  { id: 'ILLUSTRATOR', name: 'ILLUSTRATOR', human: 'Logos & Vector Art' },
  { id: 'AFTER_EFFECTS', name: 'AFTER EFFECTS', human: 'Motion Software' },
  { id: 'PREMIERE_PRO', name: 'PREMIERE PRO', human: 'Video Editing' },
  { id: 'BLENDER', name: 'BLENDER', human: '3D Modeling' },
]

/** `title` is printed; `tech` is the original name, shown in the cursor tag. */
export const PILLARS = [
  {
    index: '01',
    title: 'GRAPHIC DESIGN',
    tech: 'STATIC',
    body: 'Song and film artwork, YouTube thumbnails, social media posts, event posters and logos that stop the scroll.',
    outputs: ['SONG ARTWORK', 'THUMBNAILS', 'SOCIAL POSTS', 'LOGOS'],
  },
  {
    index: '02',
    title: 'VIDEO & MOTION',
    tech: 'KINETIC',
    body: 'Campaign films, showreels, wedding and event films, lyric videos, logo animations and motion posters.',
    outputs: ['CAMPAIGN FILMS', 'SHOWREELS & EVENTS', 'LYRIC VIDEOS', 'MOTION GRAPHICS'],
  },
  {
    index: '03',
    title: '3D VISUALS',
    tech: 'RENDER',
    body: 'Realistic 3D renders of interiors, spaces and products, so you can see it before it is built.',
    outputs: ['INTERIORS', 'ARCHITECTURE', 'PRODUCTS', 'CONCEPT RENDERS'],
  },
]

export const PIPELINE = [
  {
    step: 'STEP 1',
    title: 'SIMPLIFY.',
    tech: 'SUBTRACT',
    body: 'We talk through your idea and narrow it down to what really matters. Nothing extra.',
    duration: '1 WEEK',
  },
  {
    step: 'STEP 2',
    title: 'PLAN.',
    tech: 'WIREFRAME',
    body: 'We lay out the structure first and make sure it works before anything gets styled.',
    duration: '2–3 WEEKS',
  },
  {
    step: 'STEP 3',
    title: 'BUILD.',
    tech: 'RENDER',
    body: 'We design and deliver the finished work: artwork, animation, video or 3D.',
    duration: '4–8 WEEKS',
  },
]

/* ------------------------------------------------------------------ */
/*  MISC                                                               */
/* ------------------------------------------------------------------ */
export const MARQUEE_TEXT =
  '// VIDEO // MOTION // GRAPHIC DESIGN // 3D VISUALS // KEEP IT SIMPLE '

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
