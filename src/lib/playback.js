/**
 * ONE THING PLAYS AT A TIME
 * ----------------------------------------------------------------
 * Site-wide rule: starting any video — a hover preview, a case-study film,
 * the project stage, the lightbox, a YouTube embed — pauses whatever was
 * playing before. Installed once in main.jsx, so every player on every page,
 * panel and pop-up obeys it without wiring each one.
 *
 *  · native <video>: the `play` event (it doesn't bubble, so we listen in
 *    the capture phase on the document).
 *  · YouTube iframes: embeds built with `enablejsapi=1` post their state to
 *    the page; state 1 means "playing". They are paused with the IFrame
 *    API's postMessage command.
 */
const YT_HOST = /(^|\.)youtube(-nocookie)?\.com$/
const isYouTube = (f) => /youtube(-nocookie)?\.com\/embed\//.test(f.src)
const command = (func) => JSON.stringify({ event: 'command', func, args: [], id: 1, channel: 'widget' })

export function pauseAllExcept(current) {
  document.querySelectorAll('video').forEach((v) => {
    if (v !== current && !v.paused) v.pause()
  })
  document.querySelectorAll('iframe').forEach((f) => {
    if (f !== current && isYouTube(f)) f.contentWindow?.postMessage(command('pauseVideo'), '*')
  })
}

/** Ask a plain YouTube embed to report its state (the IFrame API does this itself). */
export function listenToYouTube(iframe) {
  iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), '*')
}

export function installSinglePlayback() {
  document.addEventListener(
    'play',
    (e) => {
      if (e.target instanceof HTMLVideoElement) pauseAllExcept(e.target)
    },
    true
  )

  window.addEventListener('message', (e) => {
    let host = ''
    try {
      host = new URL(e.origin).hostname
    } catch {
      return
    }
    if (!YT_HOST.test(host)) return
    let data = e.data
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch {
        return
      }
    }
    const state =
      data?.event === 'onStateChange' ? data.info : data?.event === 'infoDelivery' ? data.info?.playerState : undefined
    if (state !== 1) return
    const source = [...document.querySelectorAll('iframe')].find((f) => f.contentWindow === e.source)
    pauseAllExcept(source)
  })
}
