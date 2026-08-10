/**
 * YouTube IFrame API — single shared loader.
 *
 * The API script is global and may only be injected once; every player
 * awaits the same promise. `onYouTubeIframeAPIReady` is chained rather
 * than overwritten so we never clobber another consumer.
 */

/**
 * Poster frame for a video id.
 * `maxresdefault` is a true 16:9 1280x720 still but does not exist for
 * every upload; `hqdefault` always exists but is 4:3 with letterbox bars
 * baked in — those bars crop away under `object-fit: cover`.
 */
export function thumbnail(id, quality = 'maxresdefault') {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}

let apiPromise = null

export function loadYouTubeAPI() {
  if (apiPromise) return apiPromise

  apiPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'))
    if (window.YT?.Player) return resolve(window.YT)

    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === 'function') previous()
      resolve(window.YT)
    }

    // Don't inject twice if the tag is already on the page.
    if (!document.querySelector('script[data-youtube-api]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      tag.async = true
      tag.dataset.youtubeApi = 'true'
      tag.onerror = () => reject(new Error('YouTube IFrame API failed to load'))
      document.head.appendChild(tag)
    }
  })

  return apiPromise
}

/**
 * Player params tuned for a wireframe frame: no chrome, no branding,
 * no related videos, muted so hover-autoplay is always permitted.
 * `loop` requires `playlist` to be the same id — a documented quirk.
 */
export function playerVars(id) {
  return {
    autoplay: 0,
    controls: 0,
    disablekb: 1,
    fs: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 0,
    playsinline: 1,
    mute: 1,
    loop: 1,
    playlist: id,
  }
}
