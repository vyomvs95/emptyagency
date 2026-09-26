import { MEDIA } from './media.js'

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
/*  OUR WORK (archive) — four categories                               */
/* ------------------------------------------------------------------ */
/** `label` is printed; `tech` is the original name, shown in the cursor tag. */
export const CATEGORIES = [
  { id: 'all', label: 'EVERYTHING', tech: 'SHOW_ALL' },
  { id: 'graphics', label: 'GRAPHICS', tech: 'STATIC' },
  { id: 'motion', label: 'MOTION', tech: 'KINETIC' },
  { id: 'videos', label: 'VIDEOS', tech: 'FOOTAGE' },
  { id: '3d', label: '3D', tech: 'RENDER' },
]

/**
 * Who made the work, and under whom. Every project prints DESIGNER;
 * those made while working with an agency also print that agency.
 * See RIGHTS_NOTICE below — the portfolio claims authorship of the
 * design work only, never ownership of the client's IP.
 */
export const DESIGNER = 'UMAR KHAN / WORLD STYLE'
const ONE_DIGITAL = 'ONE DIGITAL ENTERTAINMENT'

export const PROJECTS = [
  {
    id: 'GR_01',
    name: 'INDIAN WINE',
    category: 'graphics',
    type: 'image',
    media: MEDIA.indianWine,
    client: 'SU REAL FT. GENERAL ZOOZ',
    note: 'Cover artwork for the single.',
  },
  {
    id: 'GR_02',
    name: 'ZINDAGI',
    category: 'graphics',
    type: 'image',
    media: MEDIA.zindagiPoster,
    client: 'CARRYMINATI × WILY FRENZY',
    agency: ONE_DIGITAL,
    note: 'Release poster for the single.',
  },
  {
    id: 'GR_03',
    name: 'ILZAAM',
    category: 'graphics',
    type: 'image',
    media: MEDIA.ilzaam,
    client: 'BADSHAH',
    agency: ONE_DIGITAL,
    note: 'Cover artwork for the single.',
  },
  {
    id: 'GR_04',
    name: 'SONY PICTURES — A BEAUTIFUL DAY IN THE NEIGHBORHOOD',
    category: 'graphics',
    type: 'image',
    media: MEDIA.sonyBeautifulDay,
    client: 'SONY PICTURES',
    agency: ONE_DIGITAL,
    note: 'Streaming thumbnail for the film on Prime Video.',
  },
  {
    id: 'GR_05',
    name: 'SANJU',
    category: 'graphics',
    type: 'image',
    media: MEDIA.sanju,
    client: 'SIDHU MOOSE WALA',
    note: 'Newspaper-style cover artwork for the single.',
  },
  {
    id: 'GR_06',
    name: 'MASK KHO GAYA',
    category: 'graphics',
    type: 'image',
    media: MEDIA.maskKhoGaya,
    client: 'VB MUSIC',
    agency: ONE_DIGITAL,
    note: 'Illustrated poster for the song.',
  },
  {
    id: 'GR_07',
    name: 'SONY PICTURES — DJANGO UNCHAINED',
    category: 'graphics',
    type: 'image',
    media: MEDIA.sonyDjango,
    client: 'SONY PICTURES',
    agency: ONE_DIGITAL,
    note: 'Streaming thumbnail for the film on Prime Video.',
  },
  {
    id: 'GR_08',
    name: 'RANGREZA',
    category: 'graphics',
    type: 'image',
    media: MEDIA.rangreza,
    client: 'MUSIC RELEASE',
    note: 'Cover artwork for the single.',
  },
  {
    id: 'GR_09',
    name: 'THE POWER OF DREAMS',
    category: 'graphics',
    type: 'image',
    media: MEDIA.powerOfDreams,
    client: 'BADSHAH',
    agency: ONE_DIGITAL,
    note: 'Poster for the song.',
  },
  {
    id: 'GR_10',
    name: 'MUSAFIR (BEATBOX VERSION)',
    category: 'graphics',
    type: 'image',
    media: MEDIA.musafir,
    client: 'RASHMEET KAUR FT. DVK',
    note: 'Cover artwork for the single.',
  },
  {
    id: 'GR_11',
    name: 'SONY PICTURES — BLOODSHOT',
    category: 'graphics',
    type: 'image',
    media: MEDIA.sonyBloodshot,
    client: 'SONY PICTURES',
    agency: ONE_DIGITAL,
    note: 'Streaming thumbnail for the film on Prime Video.',
  },
  {
    id: 'GR_12',
    name: 'RONA PAI GAYA',
    category: 'graphics',
    type: 'image',
    media: MEDIA.ronaPaiGaya,
    client: 'HUMBLE MUSIC',
    note: 'Cover artwork for the single.',
  },
  {
    id: 'GR_13',
    name: 'DHOOP AANE DO',
    category: 'graphics',
    type: 'image',
    media: MEDIA.dhoopAaneDo,
    client: 'VISHAL BHARDWAJ · GULZAR · REKHA BHARDWAJ',
    note: 'Release poster for the song.',
  },
  {
    id: 'GR_14',
    name: 'AAJA SONEYA',
    category: 'graphics',
    type: 'image',
    media: MEDIA.aajaSoneya,
    client: 'DHRRITI SAHARAN',
    agency: ONE_DIGITAL,
    note: 'YouTube thumbnail for the music video.',
  },
  {
    id: 'GR_15',
    name: 'DIAMOND',
    category: 'graphics',
    type: 'image',
    media: MEDIA.diamond,
    client: 'MUSIC RELEASE',
    note: 'Cover artwork for the single.',
  },
  {
    id: 'GR_16',
    name: 'MERE RANG MEIN — 21M VIEWS',
    category: 'graphics',
    type: 'image',
    media: MEDIA.mereRangMein,
    client: 'SURYAVEER',
    note: 'Milestone thumbnail marking 21 million views.',
  },
  {
    id: 'GR_17',
    name: 'SHEIKH CHILLI — 100M VIEWS',
    category: 'graphics',
    type: 'image',
    media: MEDIA.sheikhChilli,
    client: 'SOCIAL MEDIA',
    agency: ONE_DIGITAL,
    note: 'Milestone post celebrating 100 million views.',
  },
  {
    id: 'GR_18',
    name: 'UNBOX 2017 — COUNTDOWN',
    category: 'graphics',
    type: 'image',
    media: MEDIA.unboxCountdown,
    client: 'UNBOX ARCHITECTURE COMPETITION',
    note: 'One of a daily countdown poster series for an international design competition.',
  },
  {
    id: 'GR_19',
    name: 'UNBOX 2017 — LAUNCH POSTER',
    category: 'graphics',
    type: 'image',
    media: MEDIA.unboxLaunch,
    client: 'UNBOX ARCHITECTURE COMPETITION',
    note: 'Launch poster for the competition.',
  },
  {
    id: 'GR_20',
    name: 'POCKET SEAT 2018',
    category: 'graphics',
    type: 'image',
    media: MEDIA.pocketSeat,
    client: 'PRODUCT DESIGN COMPETITION',
    note: 'Poster for a product design competition.',
  },
  {
    id: 'GR_21',
    name: 'DANGAL DAWGS',
    category: 'graphics',
    type: 'image',
    media: MEDIA.logoDangalDawgs,
    client: 'DANGAL DAWGS CRICKET CLUB',
    note: 'Club logo.',
  },
  {
    id: 'GR_22',
    name: 'HYPER OCTANE',
    category: 'graphics',
    type: 'image',
    media: MEDIA.logoHyperOctane,
    client: 'HYPER OCTANE',
    note: 'Logo design.',
  },
  {
    id: 'GR_23',
    name: 'SOCIAL NATION',
    category: 'graphics',
    type: 'image',
    media: MEDIA.logoSocialNation,
    client: 'SOCIAL NATION',
    note: 'Hand-lettered logo for the creator festival.',
  },
  {
    id: 'GR_24',
    name: 'SHIVANGI BHAYANA',
    category: 'graphics',
    type: 'image',
    media: MEDIA.logoShivangi,
    client: 'SHIVANGI BHAYANA',
    note: 'Monogram logo for the singer.',
  },
  {
    id: 'GR_25',
    name: 'VB MUSIC',
    category: 'graphics',
    type: 'image',
    media: MEDIA.logoVbMusic,
    client: 'VB MUSIC',
    note: 'Logo for the music label.',
  },
  {
    id: 'GR_26',
    name: 'SHAILSHRI COUTURE',
    category: 'graphics',
    type: 'image',
    media: MEDIA.logoShailshri,
    client: 'SHAILSHRI COUTURE',
    note: 'Logo for a fashion label.',
  },
  {
    id: 'MO_01',
    name: 'HYPER OCTANE — LOGO ANIMATION',
    category: 'motion',
    type: 'video',
    media: MEDIA.hyperOctaneLogo,
    client: 'HYPER OCTANE',
    note: 'The logo brought to life as a short animated reveal.',
  },
  {
    id: 'MO_02',
    name: 'ONE DIGITAL — LOGO STING',
    category: 'motion',
    type: 'video',
    media: MEDIA.oneDigitalSting,
    client: 'ONE DIGITAL ENTERTAINMENT',
    note: "Animated logo sting for the network's videos.",
  },
  {
    id: 'MO_03',
    name: 'SOCIAL NATION — MAKE SOME NOISE',
    category: 'motion',
    type: 'video',
    media: MEDIA.snMakeSomeNoise,
    client: 'SOCIAL NATION',
    note: "Animated sticker for the festival's Instagram.",
  },
  {
    id: 'MO_04',
    name: 'SOCIAL NATION — CHECK THIS OUT',
    category: 'motion',
    type: 'video',
    media: MEDIA.snCheckThisOut,
    client: 'SOCIAL NATION',
    note: "Animated sticker for the festival's Instagram.",
  },
  {
    id: 'MO_05',
    name: 'SOCIAL NATION — WHAT A PERFORMANCE',
    category: 'motion',
    type: 'video',
    media: MEDIA.snPerformance,
    client: 'SOCIAL NATION',
    note: "Animated sticker for the festival's Instagram.",
  },
  {
    id: 'MO_06',
    name: 'SOCIAL NATION — YE APNA FESTIVAL HAI',
    category: 'motion',
    type: 'video',
    media: MEDIA.snYeApna,
    client: 'SOCIAL NATION',
    note: "Animated sticker for the festival's Instagram.",
  },
  {
    id: 'VI_01',
    name: 'ZINDAGI — MOTION POSTER',
    category: 'videos',
    type: 'video',
    media: MEDIA.zindagiMotion,
    client: 'CARRYMINATI × WILY FRENZY',
    agency: ONE_DIGITAL,
    note: 'Animated release poster for the single.',
  },
  {
    id: 'VI_02',
    name: 'MASK KHO GAYA — MOTION POSTER',
    category: 'videos',
    type: 'video',
    media: MEDIA.maskKhoGayaMotion1,
    client: 'VB MUSIC',
    agency: ONE_DIGITAL,
    note: 'Animated poster for the song.',
  },
  {
    id: 'VI_03',
    name: 'MASK KHO GAYA — MOTION POSTER II',
    category: 'videos',
    type: 'video',
    media: MEDIA.maskKhoGayaMotion2,
    client: 'VB MUSIC',
    agency: ONE_DIGITAL,
    note: 'A second animated poster from the same campaign.',
  },
  {
    id: 'VI_04',
    name: 'ALIA BHATT — 40M FOLLOWERS',
    category: 'videos',
    type: 'video',
    media: MEDIA.alia40m,
    client: 'ALIA BHATT',
    agency: ONE_DIGITAL,
    note: 'Animated Instagram story celebrating 40 million followers.',
  },
  {
    id: 'VI_05',
    name: 'SHUBH MANGAL ZYADA SAAVDHAN',
    category: 'videos',
    type: 'video',
    media: MEDIA.smzs,
    client: '#FILMSTHISMONTH',
    agency: ONE_DIGITAL,
    note: 'Animated Instagram story for a monthly film round-up.',
  },
  {
    id: 'VI_06',
    name: 'RANVEER SINGH — DECADE RECAP',
    category: 'videos',
    type: 'video',
    media: MEDIA.ranveerDecade,
    client: '#2019RECAP',
    agency: ONE_DIGITAL,
    note: 'Animated Instagram story looking back on a decade of his films.',
  },
  {
    id: '3D_01',
    name: 'OCEAN BEDROOM',
    category: '3d',
    type: 'image',
    media: MEDIA.oceanBedroom,
    client: 'INTERIOR VISUALISATION',
    note: 'A bedroom concept with an ocean-floor feature.',
  },
  {
    id: '3D_02',
    name: 'RED KITCHEN',
    category: '3d',
    type: 'image',
    media: MEDIA.redKitchen,
    client: 'INTERIOR VISUALISATION',
    note: 'Modular kitchen render.',
  },
  {
    id: '3D_03',
    name: 'BABY ROOM',
    category: '3d',
    type: 'image',
    media: MEDIA.babyRoom,
    client: 'INTERIOR VISUALISATION',
    note: 'Nursery concept render.',
  },
  {
    id: '3D_04',
    name: 'DHABA',
    category: '3d',
    type: 'image',
    media: MEDIA.dhaba,
    client: 'ARCHITECTURAL VISUALISATION',
    note: 'Exterior render of a roadside restaurant.',
  },
  {
    id: '3D_05',
    name: "KIDS' ROOM",
    category: '3d',
    type: 'image',
    media: MEDIA.kidsRoom,
    client: 'INTERIOR VISUALISATION',
    note: "Superhero-themed kids' room render.",
  },
  {
    id: '3D_06',
    name: 'SOFA',
    category: '3d',
    type: 'image',
    media: MEDIA.sofaRender,
    client: 'PRODUCT VISUALISATION',
    note: 'Product render of a sofa.',
  },
]

const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]))

/* ------------------------------------------------------------------ */
/*  HOME — recent work (three square pieces, one per medium)           */
/* ------------------------------------------------------------------ */
export const FEATURED = [byId.VI_01, byId.GR_03, byId.MO_03]

/** Hero showreel on the home page. */
export const SHOWREEL = byId.MO_01

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
  'The work shown here was designed by members of the empty agency core team, ' +
  'including Umar Khan (World Style), independently or while working with ' +
  'agencies such as One Digital Entertainment. It is shown solely as a record ' +
  'of that professional experience. All trademarks, logos, film and music ' +
  'artwork, and the names and likenesses of artists and brands belong to ' +
  'their respective owners. empty agency claims no ownership of them, and ' +
  'their appearance here does not imply endorsement by, or a current ' +
  'relationship with, any rights holder. To request a correction or removal, ' +
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
    title: 'MOTION & VIDEO',
    tech: 'KINETIC',
    body: 'Logo animations, motion posters, animated stickers and stories that bring a release or a brand to life.',
    outputs: ['LOGO ANIMATION', 'MOTION POSTERS', 'ANIMATED STICKERS', 'STORIES & REELS'],
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
  '// GRAPHIC DESIGN // MOTION & VIDEO // 3D VISUALS // KEEP IT SIMPLE '

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
