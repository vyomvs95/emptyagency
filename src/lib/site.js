import { IMAGE, VIDEO } from './media.js'

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */
export const ROUTES = [
  { id: 'index', label: 'INDEX', path: '/', dir: 'root' },
  { id: 'archive', label: 'ARCHIVE', path: '/archive', dir: 'root/archive' },
  { id: 'capabilities', label: 'CAPABILITIES', path: '/capabilities', dir: 'root/capabilities' },
  { id: 'vision', label: 'VISION', path: '/vision', dir: 'root/vision' },
  { id: 'initiate', label: 'INITIATE ↗', path: '/initiate', dir: 'root/initiate', cta: true },
]

export const ROUTE_IDS = ROUTES.map((r) => r.id)

/* ------------------------------------------------------------------ */
/*  ARCHIVE — 15 deployments, 5 per category                           */
/* ------------------------------------------------------------------ */
export const CATEGORIES = [
  { id: 'all', label: 'SHOW_ALL' },
  { id: 'interface', label: 'INTERFACE' },
  { id: 'kinetic', label: 'KINETIC' },
  { id: 'identity', label: 'IDENTITY' },
]

export const PROJECTS = [
  /* ---------------------------- INTERFACE --------------------------- */
  {
    id: 'IX_001',
    name: 'FINTECH_DASH_V2.FIG',
    category: 'interface',
    type: 'image',
    src: IMAGE.fintechDash,
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
    src: IMAGE.saasWebApp,
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
    src: IMAGE.cryptoWallet,
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
    src: IMAGE.ecommerceFlow,
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
    src: IMAGE.healthTracker,
    client: 'PULSE_OS',
    year: '2024',
    dims: '1170x2532',
    variant: 'mobile',
    note: 'Biometric data, rendered without a single gradient.',
  },

  /* ----------------------------- KINETIC ---------------------------- */
  {
    id: 'KN_001',
    name: 'PRODUCT_LAUNCH.C4D',
    category: 'kinetic',
    type: 'video',
    src: VIDEO.productLaunch,
    client: 'NULL_AUDIO',
    year: '2026',
    dims: '3840x2160',
    note: 'Hard-surface product reveal. Redshift, 240 frames.',
  },
  {
    id: 'KN_002',
    name: 'TYPOGRAPHY_LOOP.AEP',
    category: 'kinetic',
    type: 'video',
    src: VIDEO.typographyLoop,
    client: 'INTERNAL_R&D',
    year: '2025',
    dims: '1920x1920',
    note: 'Kinetic type system driven by an easing rulebook.',
  },
  {
    id: 'KN_003',
    name: 'ABSTRACT_SIM_01.OBJ',
    category: 'kinetic',
    type: 'video',
    src: VIDEO.abstractSim,
    client: 'FIELD_STUDY',
    year: '2025',
    dims: '2048x2048',
    note: 'Soft-body simulation. 4.2M polygons, zero decoration.',
  },
  {
    id: 'KN_004',
    name: 'BRAND_ANTHEM.MP4',
    category: 'kinetic',
    type: 'video',
    src: VIDEO.brandAnthem,
    client: 'ATLAS_MOBILITY',
    year: '2026',
    dims: '3840x1608',
    note: 'Cinematic anthem cut. Direction, edit, grade, sound.',
  },
  {
    id: 'KN_005',
    name: '3D_UI_RENDER.C4D',
    category: 'kinetic',
    type: 'video',
    src: VIDEO.uiRender,
    client: 'ORBIT_LABS',
    year: '2026',
    dims: '2560x1440',
    note: 'Spatial interface study. UI as a physical object.',
  },

  /* ---------------------------- IDENTITY ---------------------------- */
  {
    id: 'ID_001',
    name: 'BRAND_ARCHITECTURE.AI',
    category: 'identity',
    type: 'image',
    src: IMAGE.brandArchitecture,
    client: 'ATLAS_MOBILITY',
    year: '2026',
    dims: '4000x4000',
    variant: 'construction',
    note: 'Master brand, four sub-brands, one geometric root.',
  },
  {
    id: 'ID_002',
    name: 'TYPOGRAPHIC_SYSTEM.TTF',
    category: 'identity',
    type: 'image',
    src: IMAGE.typographicSystem,
    client: 'NULL_AUDIO',
    year: '2025',
    dims: '3000x2000',
    variant: 'type',
    note: 'Variable typeface, 3 axes, 1 structural skeleton.',
  },
  {
    id: 'ID_003',
    name: 'LOGO_CONSTRUCTION.AI',
    category: 'identity',
    type: 'image',
    src: IMAGE.logoConstruction,
    client: 'VAULT_ZERO',
    year: '2025',
    dims: '2400x2400',
    variant: 'construction',
    note: 'Every curve derived from a circle and a 15° grid.',
  },
  {
    id: 'ID_004',
    name: 'COLOR_PALETTE.HEX',
    category: 'identity',
    type: 'image',
    src: IMAGE.colorPalette,
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
    src: IMAGE.stationeryGrid,
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
    src: IMAGE.featuredInterface,
    client: 'LEDGER_NORTH',
    year: '2026',
    dims: '2560x1440',
    variant: 'dashboard',
    note: 'Treasury console rebuilt from the wireframe up.',
  },
  {
    id: 'DEP_002',
    name: 'PRODUCT_LAUNCH.C4D',
    discipline: 'KINETIC / 3D',
    type: 'video',
    src: VIDEO.featuredKinetic,
    client: 'NULL_AUDIO',
    year: '2026',
    dims: '3840x2160',
    note: 'Hard-surface reveal, rendered in Cinema 4D.',
  },
  {
    id: 'DEP_003',
    name: 'BRAND_ANTHEM.MP4',
    discipline: 'KINETIC / MOTION',
    type: 'video',
    src: VIDEO.featuredMotion,
    client: 'ATLAS_MOBILITY',
    year: '2026',
    dims: '3840x1608',
    note: 'Motion graphics anthem. Cut, graded, scored.',
  },
]

/* ------------------------------------------------------------------ */
/*  CAPABILITIES                                                       */
/* ------------------------------------------------------------------ */
export const STACK = [
  'FIGMA',
  'AFTER_EFFECTS',
  'CINEMA_4D',
  'REACT',
  'BLENDER',
]

export const PILLARS = [
  {
    index: '01',
    title: 'INTERFACE',
    body: 'Structural wireframing, high-fidelity UI/UX, and frictionless user flows. We architect systems, not just screens.',
    outputs: ['WIREFRAME_KITS', 'DESIGN_SYSTEMS', 'PROTOTYPES', 'HANDOFF_SPECS'],
  },
  {
    index: '02',
    title: 'KINETIC',
    body: 'Motion systems, 3D product rendering, video editing, and cinematic production. We make the static world move.',
    outputs: ['3D_RENDER', 'MOTION_SYSTEMS', 'EDIT_&_GRADE', 'SOUND_DESIGN'],
  },
  {
    index: '03',
    title: 'IDENTITY',
    body: 'Brand architecture, geometric logo construction, and visual rulebooks. We build the DNA of your company.',
    outputs: ['LOGO_SYSTEMS', 'TYPE_SYSTEMS', 'BRAND_RULEBOOK', 'PRINT_&_ENV'],
  },
]

export const PIPELINE = [
  {
    step: 'STEP_01',
    title: 'SUBTRACT.',
    body: 'We strip your brief down to its absolute core objective. No decorative fluff.',
    duration: '01_WEEK',
  },
  {
    step: 'STEP_02',
    title: 'WIREFRAME.',
    body: 'We build the structural logic. The blueprint must function flawlessly before we add the paint.',
    duration: '02-03_WEEKS',
  },
  {
    step: 'STEP_03',
    title: 'RENDER.',
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
  { label: 'DRIBBBLE_NODE', href: 'https://dribbble.com' },
  { label: 'LINKEDIN_NODE', href: 'https://linkedin.com' },
  { label: 'X_NODE', href: 'https://x.com' },
]

export const BUDGETS = ['$10k - $25k', '$25k - $50k', '$50k+']
