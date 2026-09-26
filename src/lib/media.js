/**
 * ------------------------------------------------------------------
 *  MEDIA REGISTRY
 * ------------------------------------------------------------------
 *  Single swap-point for every asset in the build. Nothing else in the
 *  app hard-codes a URL.
 *
 *  Files live in /public/media, one folder per category:
 *
 *    graphics/  posters, song artwork, thumbnails, logos   (.webp)
 *    motion/    logo animations, animated stickers         (.mp4)
 *    videos/    motion posters, animated stories           (.mp4)
 *    3d/        interior and product renders               (.webp)
 *
 *  Every video has a `-poster.webp` still beside it, shown before
 *  playback and as the rest state.
 *
 *  Sources: Umar Khan's portfolio folders on Google Drive (2026-09-26).
 *  Images were resized to max 1600px and re-encoded as WebP; videos were
 *  re-encoded to H.264 MP4, max 1080px, no audio (the site plays muted).
 *
 *  TO ADD A PIECE: drop the file in the right folder, add an entry
 *  below with its pixel size, and reference it from a project in
 *  site.js. No component changes.
 */

// The SPA is served from /mockup/ (see vite.config.js), so public files
// resolve against Vite's base URL rather than the domain root.
const url = (path) => `${import.meta.env.BASE_URL}media/${path}`

const image = (path, w, h) => ({ src: url(`${path}.webp`), w, h })
const video = (path, w, h) => ({
  src: url(`${path}.mp4`),
  poster: url(`${path}-poster.webp`),
  w,
  h,
})

export const MEDIA = {
  /* ------------------------------ GRAPHICS ----------------------------- */
  indianWine: image('graphics/indian-wine', 1600, 1600),
  zindagiPoster: image('graphics/zindagi-poster', 1600, 1600),
  rangreza: image('graphics/rangreza', 1600, 1600),
  sanju: image('graphics/sanju', 1080, 1080),
  ilzaam: image('graphics/ilzaam', 1500, 1500),
  musafir: image('graphics/musafir', 1500, 1500),
  ronaPaiGaya: image('graphics/rona-pai-gaya', 1500, 1500),
  dhoopAaneDo: image('graphics/dhoop-aane-do', 1500, 1500),
  diamond: image('graphics/diamond', 1500, 1500),
  powerOfDreams: image('graphics/power-of-dreams', 1600, 1600),
  sonyBeautifulDay: image('graphics/sony-a-beautiful-day', 1600, 900),
  sonyDjango: image('graphics/sony-django-unchained', 1600, 900),
  sonyBloodshot: image('graphics/sony-bloodshot', 1600, 900),
  aajaSoneya: image('graphics/aaja-soneya', 1600, 900),
  mereRangMein: image('graphics/mere-rang-mein', 1600, 900),
  sheikhChilli: image('graphics/sheikh-chilli-100m', 1500, 1500),
  maskKhoGaya: image('graphics/mask-kho-gaya', 1500, 1500),
  unboxCountdown: image('graphics/unbox-2017-countdown', 1131, 1600),
  unboxLaunch: image('graphics/unbox-2017-launch', 1131, 1600),
  pocketSeat: image('graphics/pocket-seat-2018', 567, 533),
  logoDangalDawgs: image('graphics/logo-dangal-dawgs', 1600, 1600),
  logoHyperOctane: image('graphics/logo-hyper-octane', 1500, 1500),
  logoSocialNation: image('graphics/logo-social-nation', 898, 568),
  logoShivangi: image('graphics/logo-shivangi-bhayana', 1600, 1600),
  logoVbMusic: image('graphics/logo-vb-music', 1500, 1500),
  logoShailshri: image('graphics/logo-shailshri-couture', 868, 868),

  /* ------------------------------- MOTION ------------------------------ */
  hyperOctaneLogo: video('motion/hyper-octane-logo', 1080, 608),
  oneDigitalSting: video('motion/one-digital-logo-sting', 1080, 608),
  snCheckThisOut: video('motion/social-nation-check-this-out', 1080, 1080),
  snMakeSomeNoise: video('motion/social-nation-make-some-noise', 1080, 1080),
  snPerformance: video('motion/social-nation-performance', 1080, 1080),
  snYeApna: video('motion/social-nation-ye-apna-festival', 1080, 1080),

  /* ------------------------------- VIDEOS ------------------------------ */
  zindagiMotion: video('videos/zindagi-motion-poster', 1080, 1080),
  maskKhoGayaMotion1: video('videos/mask-kho-gaya-motion-1', 1080, 1080),
  maskKhoGayaMotion2: video('videos/mask-kho-gaya-motion-2', 1080, 1080),
  alia40m: video('videos/alia-bhatt-40m', 608, 1080),
  smzs: video('videos/smzs-films-this-month', 608, 1080),
  ranveerDecade: video('videos/ranveer-singh-decade', 608, 1080),

  /* --------------------------------- 3D -------------------------------- */
  oceanBedroom: image('3d/ocean-bedroom', 1280, 720),
  redKitchen: image('3d/red-kitchen', 1280, 720),
  babyRoom: image('3d/baby-room', 1280, 720),
  dhaba: image('3d/dhaba', 1280, 720),
  kidsRoom: image('3d/kids-room', 1280, 720),
  sofaRender: image('3d/sofa-render', 640, 480),
}

/* ------------------------------------------------------------------ */
/*  FILMS — our own long-form video, /public/media/films               */
/* ------------------------------------------------------------------ */
/**
 * Generated from the encoder's output (sizes are measured, not typed),
 * so it lives in its own file. `excerpt: true` marks a ~45-second cut
 * of a longer film; those carry an EXCERPT tag wherever they play.
 */
export { FILM } from './films.js'

/* ------------------------------------------------------------------ */
/*  YOUTUBE — work that lives on YouTube, played via the standard embed */
/* ------------------------------------------------------------------ */
/**
 * Video ids only. Stills come from i.ytimg.com; playback is YouTube's
 * own embedded player inside the project panel (see ProjectPanel.jsx).
 * `jQiC5r0n7JI` (Jumanji promo) was supplied but has embedding
 * disabled by its owner, so it cannot be shown on the site.
 */
export const YT = {
  // Osho Jain — lyric videos
  oshoKaunApna: 'j_Ab4LbCP6o',
  oshoMazhabHai: 'a6WDmVd4tGo',
  oshoTujhse: 'XAq8MdN_H70',
  oshoSahare: 'zidFnshFTXc',
  oshoUljhe: 'ArAQG5cvh2Q',
  oshoNaaMila: 'AE9XkdzCE2E',
  oshoUljheRaw: 'YiFHidZa23M',
  oshoHumara: 'h2vf1mFBe6E',
  oshoKyaDekhu: '_81V4fvdmG8',
  oshoBohotHua: 'MikcOnq7jB0',
  // Janice Sequeira — Pasandida Ladies
  pasandidaLadies: 'sgXxsq5NRQ0',
  // TMC Talent Management Company
  tmcReel: 'brX3oLRzP3E',
  sandeepBatraa: 'i6tBOnVb7XE',
  vipulRoyWedding: 'm8hiFR5x_kw',
  // Adil Hussaini
  adilShowreel: 'uXbGjY7e9YQ',
  adilDaayera: '09l_-Kx6tfk',
  // Event Soul
  eventSoulReel: 'y8UwKQ3ifKE',
  rohanRohan: 'KW_1j4cg4XA',
}
