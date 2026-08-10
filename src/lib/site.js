import { IMAGE, YOUTUBE } from './media.js'

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */
/**
 * `human` is the plain-English translation shown in the cursor tag on
 * hover. The UI keeps its technical label; the cursor explains what it
 * actually means, so a non-technical visitor is never lost.
 */
export const ROUTES = [
  { id: 'index', label: 'INDEX', human: 'Home', path: '/', dir: 'root' },
  { id: 'archive', label: 'ARCHIVE', human: 'Our Work', path: '/archive', dir: 'root/archive' },
  {
    id: 'capabilities',
    label: 'CAPABILITIES',
    human: 'What We Do',
    path: '/capabilities',
    dir: 'root/capabilities',
  },
  { id: 'vision', label: 'VISION', human: 'About Us', path: '/vision', dir: 'root/vision' },
  {
    id: 'initiate',
    label: 'INITIATE ↗',
    human: 'Start a Project',
    path: '/initiate',
    dir: 'root/initiate',
    cta: true,
  },
]

export const ROUTE_IDS = ROUTES.map((r) => r.id)

/* ------------------------------------------------------------------ */
/*  ARCHIVE — 15 deployments, 5 per category                           */
/* ------------------------------------------------------------------ */
export const CATEGORIES = [
  { id: 'all', label: 'SHOW_ALL', human: 'Everything' },
  { id: 'interface', label: 'INTERFACE', human: 'App & Website Design' },
  { id: 'kinetic', label: 'KINETIC', human: 'Motion Graphics' },
  { id: 'identity', label: 'IDENTITY', human: 'Logo & Branding' },
]

export const PROJECTS = [
  /* ---------------------------- INTERFACE --------------------------- */
  {
    id: 'IX_001',
    name: 'FINTECH_DASH_V2.FIG',
    category: 'interface',
    type: 'image',
    src: IMAGE.fintechDash.src,
    credit: IMAGE.fintechDash.credit,
    placeholder: true,
    client: 'LEDGER_NORTH',
    year: '2026',
    dims: '2560x1440',
    variant: 'dashboard',
    note: 'Multi-account treasury console. 148 components, 1 grid.',
  },
  {
    id: 'IX_002',
    name: 'SAAS_WEB_APP.FIG',
    category: 'interface',
    type: 'image',
    src: IMAGE.saasWebApp.src,
    credit: IMAGE.saasWebApp.credit,
    placeholder: true,
    client: 'ORBIT_LABS',
    year: '2025',
    dims: '1920x1080',
    variant: 'app',
    note: 'Workspace shell, command palette, zero-state architecture.',
  },
  {
    id: 'IX_003',
    name: 'CRYPTO_WALLET.FIG',
    category: 'interface',
    type: 'image',
    src: IMAGE.cryptoWallet.src,
    credit: IMAGE.cryptoWallet.credit,
    placeholder: true,
    client: 'VAULT_ZERO',
    year: '2025',
    dims: '1170x2532',
    variant: 'mobile',
    note: 'Custody flows with irreversible-action guard rails.',
  },
  {
    id: 'IX_004',
    name: 'ECOMMERCE_FLOW.FIG',
    category: 'interface',
    type: 'image',
    src: IMAGE.ecommerceFlow.src,
    credit: IMAGE.ecommerceFlow.credit,
    placeholder: true,
    client: 'MONO_SUPPLY',
    year: '2026',
    dims: '1920x1080',
    variant: 'flow',
    note: 'Checkout reduced from 7 steps to 2. Friction: zero.',
  },
  {
    id: 'IX_005',
    name: 'HEALTH_TRACKER.FIG',
    category: 'interface',
    type: 'image',
    src: IMAGE.healthTracker.src,
    credit: IMAGE.healthTracker.credit,
    placeholder: true,
    client: 'PULSE_OS',
    year: '2024',
    dims: '1170x2532',
    variant: 'mobile',
    note: 'Biometric data, rendered without a single gradient.',
  },

  /* ----------------------------- KINETIC ---------------------------- */
  /* After Effects, motion graphics and video editing. Every entry below
     is a PLACEHOLDER reel by a third party — see media.js. Swap
     `youtube` for `src` and drop `placeholder` to go live. */
  {
    id: 'KN_001',
    name: 'PRODUCT_LAUNCH.AEP',
    category: 'kinetic',
    type: 'video',
    youtube: YOUTUBE.showreel.id,
    credit: YOUTUBE.showreel.credit,
    placeholder: true,
    client: 'NULL_AUDIO',
    year: '2026',
    dims: '3840x2160',
    note: 'Product launch film. Motion graphics, titles, and grade.',
  },
  {
    id: 'KN_002',
    name: 'TYPOGRAPHY_LOOP.AEP',
    category: 'kinetic',
    type: 'video',
    youtube: YOUTUBE.motionReel2D.id,
    credit: YOUTUBE.motionReel2D.credit,
    placeholder: true,
    client: 'INTERNAL_R&D',
    year: '2025',
    dims: '1920x1920',
    note: 'Kinetic type system driven by an easing rulebook.',
  },
  {
    id: 'KN_003',
    name: 'BRAND_ANTHEM.MP4',
    category: 'kinetic',
    type: 'video',
    youtube: YOUTUBE.motionPortfolio.id,
    credit: YOUTUBE.motionPortfolio.credit,
    placeholder: true,
    client: 'ATLAS_MOBILITY',
    year: '2026',
    dims: '3840x1608',
    note: 'Cinematic anthem cut. Direction, edit, grade, sound.',
  },
  {
    id: 'KN_004',
    name: 'SOCIAL_CUTDOWNS.PRPROJ',
    category: 'kinetic',
    type: 'video',
    youtube: YOUTUBE.editorReel26.id,
    credit: YOUTUBE.editorReel26.credit,
    placeholder: true,
    client: 'MONO_SUPPLY',
    year: '2026',
    dims: '1080x1920',
    note: 'One long-form master cut down to 24 vertical deliverables.',
  },
  {
    id: 'KN_005',
    name: 'LONGFORM_EDIT.PRPROJ',
    category: 'kinetic',
    type: 'video',
    youtube: YOUTUBE.editorReel24.id,
    credit: YOUTUBE.editorReel24.credit,
    placeholder: true,
    client: 'ORBIT_LABS',
    year: '2026',
    dims: '2560x1440',
    note: 'Documentary-length edit. Story, pacing, sound, color.',
  },

  /* ---------------------------- IDENTITY ---------------------------- */
  {
    id: 'ID_001',
    name: 'BRAND_SYSTEM.MP4',
    category: 'identity',
    type: 'video',
    youtube: YOUTUBE.brandPortfolio.id,
    credit: YOUTUBE.brandPortfolio.credit,
    placeholder: true,
    client: 'ATLAS_MOBILITY',
    year: '2026',
    dims: '3840x2160',
    note: 'Master brand, four sub-brands, one geometric root.',
  },
  {
    id: 'ID_002',
    name: 'TYPOGRAPHIC_SYSTEM.TTF',
    category: 'identity',
    type: 'image',
    src: IMAGE.typographicSystem.src,
    credit: IMAGE.typographicSystem.credit,
    placeholder: true,
    client: 'NULL_AUDIO',
    year: '2025',
    dims: '3000x2000',
    variant: 'type',
    note: 'Variable typeface, 3 axes, 1 structural skeleton.',
  },
  {
    id: 'ID_003',
    name: 'LOGO_ANIMATION.AEP',
    category: 'identity',
    type: 'video',
    youtube: YOUTUBE.logoAnimation.id,
    credit: YOUTUBE.logoAnimation.credit,
    placeholder: true,
    client: 'VAULT_ZERO',
    year: '2025',
    dims: '2400x2400',
    note: 'Static mark to animated signature. Built from one circle.',
  },
  {
    id: 'ID_004',
    name: 'COLOR_PALETTE.HEX',
    category: 'identity',
    type: 'image',
    src: IMAGE.colorPalette.src,
    credit: IMAGE.colorPalette.credit,
    placeholder: true,
    client: 'PULSE_OS',
    year: '2024',
    dims: '2000x1200',
    variant: 'palette',
    note: 'Six values. Contrast-tested to AAA at every pairing.',
  },
  {
    id: 'ID_005',
    name: 'STATIONERY_GRID.INDD',
    category: 'identity',
    type: 'image',
    src: IMAGE.stationeryGrid.src,
    credit: IMAGE.stationeryGrid.credit,
    placeholder: true,
    client: 'MONO_SUPPLY',
    year: '2026',
    dims: '2480x3508',
    variant: 'grid',
    note: 'Print system on a 12-column baseline. Ink: one.',
  },
]

/* ------------------------------------------------------------------ */
/*  INDEX — recent deployments (1 UI still, 1 3D video, 1 motion video) */
/* ------------------------------------------------------------------ */
export const FEATURED = [
  {
    id: 'DEP_001',
    name: 'FINTECH_DASH_V2.FIG',
    discipline: 'INTERFACE',
    type: 'image',
    src: IMAGE.featuredInterface.src,
    credit: IMAGE.featuredInterface.credit,
    placeholder: true,
    client: 'LEDGER_NORTH',
    year: '2026',
    dims: '2560x1440',
    variant: 'dashboard',
    note: 'Treasury console rebuilt from the wireframe up.',
  },
  {
    id: 'DEP_002',
    name: 'PRODUCT_LAUNCH.AEP',
    discipline: 'KINETIC / MOTION',
    type: 'video',
    youtube: YOUTUBE.motionPortfolio.id,
    credit: YOUTUBE.motionPortfolio.credit,
    placeholder: true,
    client: 'NULL_AUDIO',
    year: '2026',
    dims: '3840x2160',
    note: 'Product launch film. Motion graphics, titles, and grade.',
  },
  {
    id: 'DEP_003',
    name: 'BRAND_ANTHEM.MP4',
    discipline: 'KINETIC / EDIT',
    type: 'video',
    youtube: YOUTUBE.editorPortfolio.id,
    credit: YOUTUBE.editorPortfolio.credit,
    placeholder: true,
    client: 'ATLAS_MOBILITY',
    year: '2026',
    dims: '3840x1608',
    note: 'Motion graphics anthem. Cut, graded, scored.',
  },
]

/** Hero showreel on the index page. */
export const SHOWREEL = {
  youtube: YOUTUBE.showreel.id,
  credit: YOUTUBE.showreel.credit,
  placeholder: true,
  dims: '3840x2160',
}

/* ------------------------------------------------------------------ */
/*  CAPABILITIES                                                       */
/* ------------------------------------------------------------------ */
export const STACK = [
  { id: 'FIGMA', human: 'Design Tool' },
  { id: 'AFTER_EFFECTS', human: 'Motion Software' },
  { id: 'PREMIERE_PRO', human: 'Video Editing' },
  { id: 'REACT', human: 'Website Code' },
  { id: 'BLENDER', human: '3D Modeling' },
]

export const PILLARS = [
  {
    index: '01',
    title: 'INTERFACE',
    human: 'App & Website Design',
    body: 'Structural wireframing, high-fidelity UI/UX, and frictionless user flows. We architect systems, not just screens.',
    outputs: ['WIREFRAME_KITS', 'DESIGN_SYSTEMS', 'PROTOTYPES', 'HANDOFF_SPECS'],
  },
  {
    index: '02',
    title: 'KINETIC',
    human: 'Motion Graphics',
    body: 'Motion systems, 3D product rendering, video editing, and cinematic production. We make the static world move.',
    outputs: ['3D_RENDER', 'MOTION_SYSTEMS', 'EDIT_&_GRADE', 'SOUND_DESIGN'],
  },
  {
    index: '03',
    title: 'IDENTITY',
    human: 'Logo & Branding',
    body: 'Brand architecture, geometric logo construction, and visual rulebooks. We build the DNA of your company.',
    outputs: ['LOGO_SYSTEMS', 'TYPE_SYSTEMS', 'BRAND_RULEBOOK', 'PRINT_&_ENV'],
  },
]

export const PIPELINE = [
  {
    step: 'STEP_01',
    title: 'SUBTRACT.',
    human: 'Step 1 — Simplify',
    body: 'We strip your brief down to its absolute core objective. No decorative fluff.',
    duration: '01_WEEK',
  },
  {
    step: 'STEP_02',
    title: 'WIREFRAME.',
    human: 'Step 2 — Blueprint',
    body: 'We build the structural logic. The blueprint must function flawlessly before we add the paint.',
    duration: '02-03_WEEKS',
  },
  {
    step: 'STEP_03',
    title: 'RENDER.',
    human: 'Step 3 — Build It',
    body: 'High-fidelity execution across 3D, motion, and interactive deployment.',
    duration: '04-08_WEEKS',
  },
]

/* ------------------------------------------------------------------ */
/*  MISC                                                               */
/* ------------------------------------------------------------------ */
export const MARQUEE_TEXT =
  '// STRIP DOWN TO THE FOUNDATION // DESIGN THE INVISIBLE // RENDER THE FUTURE '

export const SOCIALS = [
  { label: 'DRIBBBLE_NODE', human: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'LINKEDIN_NODE', human: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'X_NODE', human: 'X (Twitter)', href: 'https://x.com' },
]

export const BUDGETS = ['$10k - $25k', '$25k - $50k', '$50k+']
