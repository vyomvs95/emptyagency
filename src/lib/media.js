/**
 * ------------------------------------------------------------------
 *  MEDIA REGISTRY
 * ------------------------------------------------------------------
 *  Single swap-point for every asset in the build. Nothing else in the
 *  app hard-codes a URL.
 *
 *  Three source kinds are supported by <KineticPlayer /> and
 *  <StillFrame />:
 *
 *    youtube : { id, credit }  → embedded via the YouTube IFrame API
 *    file    : '/media/x.mp4'  → native <video>, the production path
 *    null    : (images only)   → procedural wireframe poster
 *
 *  TO GO LIVE WITH REAL WORK: replace a `youtube:` field on a project
 *  in site.js with `src: VIDEO.something` pointing at a file in
 *  /public/media, and drop `placeholder: true`. No component changes.
 */

/* ------------------------------------------------------------------ */
/*  PLACEHOLDER REELS — third-party work, verified live + embeddable   */
/*  on 2026-08-11. These are NOT empty agency's work. Every project     */
/*  using one carries `placeholder: true`, which renders a visible      */
/*  PLACEHOLDER chip and a credit line on the frame.                    */
/* ------------------------------------------------------------------ */
export const YOUTUBE = {
  // motion graphics / after effects
  showreel: { id: 'W2EPTWY7Hzo', credit: 'CHARGE MOTIONS' },
  motionReel2D: { id: 'BMx2NTZRElU', credit: 'MUKUND MAYANK' },
  motionPortfolio: { id: 'U8_fktQz0w8', credit: 'LUCID REELS' },
  // video editing
  editorReel26: { id: 'LGj_fL_xnrA', credit: 'USDANCER' },
  editorReel24: { id: '9Fsa0_uuaDM', credit: 'LORENZ MIGUEL' },
  editorPortfolio: { id: 'WUB2pSkwN2M', credit: 'RYAN FERGUSON' },
  // identity in motion
  logoAnimation: { id: 'aFtsGDsnvZM', credit: 'MOTIONREELS' },
  brandPortfolio: { id: 'vtpbDlqaXQQ', credit: 'DESIGNER RAGHU' },
}

/* ------------------------------------------------------------------ */
/*  PRODUCTION VIDEO — drop H.264 .mp4 files into /public/media        */
/* ------------------------------------------------------------------ */
export const VIDEO = {
  // showreel: '/media/showreel.mp4',
  // productLaunch: '/media/product-launch.mp4',
}

/** Drop real stills here — null keeps the procedural wireframe poster. */
export const IMAGE = {
  fintechDash: null,
  saasWebApp: null,
  cryptoWallet: null,
  ecommerceFlow: null,
  healthTracker: null,
  brandArchitecture: null,
  typographicSystem: null,
  logoConstruction: null,
  colorPalette: null,
  stationeryGrid: null,
  featuredInterface: null,
}
