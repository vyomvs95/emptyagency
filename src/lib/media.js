/**
 * ------------------------------------------------------------------
 *  MEDIA REGISTRY
 * ------------------------------------------------------------------
 *  Single swap-point for every asset in the build. Drop real files
 *  into /public/media and change the strings below — nothing else in
 *  the app hard-codes a URL.
 *
 *  Placeholders are Google's public HTML5 test videos (CORS-open,
 *  h264/mp4, stable for years). Images intentionally have NO url:
 *  when `src` is null the <Frame /> renders a procedural wireframe
 *  poster instead, which is the on-brand placeholder. Set a path
 *  (e.g. '/media/fintech-dash.jpg') to drop a real image in.
 */

const CDN = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample'

export const VIDEO = {
  showreel: `${CDN}/BigBuckBunny.mp4`,
  productLaunch: `${CDN}/ForBiggerBlazes.mp4`,
  typographyLoop: `${CDN}/ForBiggerEscapes.mp4`,
  abstractSim: `${CDN}/ElephantsDream.mp4`,
  brandAnthem: `${CDN}/ForBiggerJoyrides.mp4`,
  uiRender: `${CDN}/ForBiggerMeltdowns.mp4`,
  featuredKinetic: `${CDN}/ForBiggerFun.mp4`,
  featuredMotion: `${CDN}/Sintel.mp4`,
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
