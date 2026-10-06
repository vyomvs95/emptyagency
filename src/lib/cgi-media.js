/**
 * 3D MEDIA — GENERATED from the "3D" Drive folder (29 Sep 2026).
 * Films re-encoded to H.264 ≤1280px with a -poster.webp still; long films
 * (All Hub, Romaa Majestic) are cut into chapter clips. Stills are WebP.
 * Files live in public/media/cgi/.
 */
const url = (path) => `${import.meta.env.BASE_URL}media/cgi/${path}`

const film = (slug, w, h, duration) => ({
  src: url(`${slug}.mp4`),
  poster: url(`${slug}-poster.webp`),
  w,
  h,
  duration,
})

export const CGI = {
  'allhub-arrival': film('allhub-arrival', 1280, 720, 30.0),
  'allhub-layout': film('allhub-layout', 1280, 720, 33.0),
  'allhub-cleaning': film('allhub-cleaning', 1280, 720, 35.0),
  'allhub-repair': film('allhub-repair', 1280, 720, 30.0),
  'allhub-transfer': film('allhub-transfer', 1280, 720, 25.0),
  'allhub-painting': film('allhub-painting', 1280, 720, 40.0),
  'clearx-film': film('clearx-film', 1280, 720, 65.4),
  'clearx-reel': film('clearx-reel', 720, 1280, 65.4),
  'eume-cabin-pro': film('eume-cabin-pro', 1280, 720, 37.4),
  'eume-cabin-pro-vertical': film('eume-cabin-pro-vertical', 720, 1280, 37.2),
  'walkthrough-2bhk': film('walkthrough-2bhk', 1280, 720, 57.3),
  'romaa-majestic': film('romaa-majestic', 1280, 720, 45.0),
  'stuffcool-nova-65w': film('stuffcool-nova-65w', 480, 854, 45.9),
  'stuffcool-cases': film('stuffcool-cases', 720, 1280, 18.8),
  'stuffcool-novus-33': film('stuffcool-novus-33', 1280, 720, 37.1),
  'stuffcool-usb4-cable': film('stuffcool-usb4-cable', 1280, 720, 42.6),
  'stuffcool-click-duo': film('stuffcool-click-duo', 1280, 720, 43.0),
  'stuffcool-powerbank-65w': film('stuffcool-powerbank-65w', 1280, 720, 41.8),
  'stuffcool-mega-ii': film('stuffcool-mega-ii', 1280, 720, 52.1),
  'protectli-vault-pro': film('protectli-vault-pro', 1280, 720, 37.0),
  'luca-chronograph': film('luca-chronograph', 1280, 720, 23.0),
  'cougar-chair': film('cougar-chair', 640, 352, 35.3),
  'red-wine': film('red-wine', 1280, 720, 26.0),
  'mswipe-pos-stand': film('mswipe-pos-stand', 1280, 720, 5.0),
}

export const CGI_STILL = {
  'realestate-floorplan-tilt-1': { src: url('realestate-floorplan-tilt-1.webp'), w: 2000, h: 2000 },
  'realestate-floorplan-tilt-2': { src: url('realestate-floorplan-tilt-2.webp'), w: 2000, h: 2000 },
  'realestate-floorplan-top': { src: url('realestate-floorplan-top.webp'), w: 2000, h: 2000 },
  'realestate-tower-plan': { src: url('realestate-tower-plan.webp'), w: 2000, h: 1125 },
  'realestate-bathroom': { src: url('realestate-bathroom.webp'), w: 1280, h: 1280 },
}
