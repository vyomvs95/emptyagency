import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Frame from './Frame.jsx'
import WireframePoster from './WireframePoster.jsx'
import { loadYouTubeAPI, playerVars } from '../lib/youtube.js'

/**
 * KINETIC PLAYER
 * ----------------------------------------------------------------
 * Hover-to-play video inside the bounding-box system, with two
 * interchangeable engines behind one identical set of chrome:
 *
 *   `src`     → native <video>   (production path)
 *   `youtube` → IFrame API embed (placeholder path)
 *
 * Both report {playing, current, duration} upward, so the poster,
 * REC chip, timecode and 1px progress bar are engine-agnostic.
 *
 * Media renders black-and-white and returns to full colour on hover.
 * The chrome is deliberately OUTSIDE that filter and outside the
 * 1.05x scale, so the wireframe furniture never moves or desaturates.
 */

function timecode(seconds) {
  if (!Number.isFinite(seconds)) return '00:00'
  const s = Math.max(0, Math.floor(seconds))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/* Shared: greyscale by default, full colour while the frame is hovered. */
const MEDIA_FILTER =
  'h-full w-full grayscale transition-[filter,transform] duration-[600ms] ease-out group-hover:grayscale-0'

/* ------------------------- NATIVE ENGINE ------------------------- */
const NativeEngine = forwardRef(function NativeEngine({ src, zoom, onState }, ref) {
  const video = useRef(null)

  useImperativeHandle(ref, () => ({
    play() {
      const v = video.current
      if (!v) return
      const attempt = v.play()
      if (attempt?.then) {
        attempt
          .then(() => onState((s) => ({ ...s, playing: true, started: true })))
          .catch(() => {
            /* autoplay blocked — poster stays, box remains inert */
          })
      } else {
        onState((s) => ({ ...s, playing: true, started: true }))
      }
    },
    pause() {
      video.current?.pause()
      onState((s) => ({ ...s, playing: false }))
    },
  }))

  return (
    <motion.video
      ref={video}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      tabIndex={-1}
      className={`${MEDIA_FILTER} object-cover`}
      animate={{ scale: zoom ? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.6 }}
      onTimeUpdate={(e) => {
        const v = e.currentTarget
        onState((s) => ({ ...s, current: v.currentTime, duration: v.duration }))
      }}
      onLoadedMetadata={(e) =>
        onState((s) => ({ ...s, duration: e.currentTarget.duration }))
      }
    />
  )
})

/* ------------------------ YOUTUBE ENGINE ------------------------- */
const YouTubeEngine = forwardRef(function YouTubeEngine({ id, zoom, onState }, ref) {
  const stage = useRef(null)
  const host = useRef(null)
  const player = useRef(null)
  const poll = useRef(null)
  const wantsPlay = useRef(false)

  // A page can hold ten of these. Mounting ten iframes on load would
  // cost megabytes and stall the main thread, so a player is only built
  // once its frame comes near the viewport.
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = stage.current
    if (!el || armed) return
    if (typeof IntersectionObserver === 'undefined') return setArmed(true)

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [armed])

  // Progress: the IFrame API has no timeupdate event, so poll — but
  // only while actually playing, never for idle players.
  const startPolling = useCallback(() => {
    clearInterval(poll.current)
    poll.current = setInterval(() => {
      const p = player.current
      if (!p?.getCurrentTime) return
      const current = p.getCurrentTime()
      const duration = p.getDuration()
      if (Number.isFinite(current)) onState((s) => ({ ...s, current, duration }))
    }, 200)
  }, [onState])

  const stopPolling = useCallback(() => clearInterval(poll.current), [])

  useEffect(() => {
    if (!armed) return
    let dead = false

    loadYouTubeAPI()
      .then((YT) => {
        if (dead || !host.current) return
        player.current = new YT.Player(host.current, {
          videoId: id,
          playerVars: playerVars(id),
          events: {
            onReady: (e) => {
              onState((s) => ({ ...s, duration: e.target.getDuration() }))
              if (wantsPlay.current) e.target.playVideo() // hovered while booting
            },
            onStateChange: (e) => {
              const playing = e.data === 1 // YT.PlayerState.PLAYING
              if (playing) startPolling()
              else stopPolling()
              onState((s) => ({ ...s, playing, started: s.started || playing }))
            },
          },
        })
      })
      .catch(() => {
        /* network blocked — poster stays, box remains inert */
      })

    return () => {
      dead = true
      stopPolling()
      try {
        player.current?.destroy()
      } catch {
        /* already torn down */
      }
      player.current = null
    }
  }, [armed, id, onState, startPolling, stopPolling])

  useImperativeHandle(ref, () => ({
    play() {
      wantsPlay.current = true
      setArmed(true) // hovering always wins over the observer
      player.current?.playVideo?.()
    },
    pause() {
      wantsPlay.current = false
      player.current?.pauseVideo?.()
      onState((s) => ({ ...s, playing: false }))
    },
  }))

  return (
    <motion.div
      ref={stage}
      className={`${MEDIA_FILTER} yt-stage absolute inset-0 overflow-hidden`}
      animate={{ scale: zoom ? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.6 }}
    >
      {/* .yt-cover crops the 16:9 embed to fill any frame ratio.
          pointer-events:none keeps YouTube's own chrome from ever
          appearing — our overlay owns all hover behaviour. */}
      <div className="yt-cover pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div ref={host} className="h-full w-full" />
      </div>
    </motion.div>
  )
})

/* --------------------------- COMPONENT --------------------------- */
export default function KineticPlayer({
  src,
  youtube,
  label,
  meta,
  dims,
  ratio = '16 / 9',
  zoom = true,
  poster = 'video',
  placeholder = false,
  credit,
  className = '',
  onClick,
}) {
  const engine = useRef(null)
  const [state, setState] = useState({
    started: false,
    playing: false,
    current: 0,
    duration: 0,
  })

  const play = useCallback(() => engine.current?.play(), [])
  const pause = useCallback(() => engine.current?.pause(), [])

  const { started, playing, current, duration } = state
  const progress = duration > 0 ? Math.min(1, current / duration) : 0

  return (
    <div className={className} onMouseEnter={play} onMouseLeave={pause}>
      <Frame
        label={label}
        meta={meta}
        dims={dims}
        ratio={ratio}
        zoom={false}
        cursor={playing ? '[Playing]' : '[Hover to Play]'}
        onClick={onClick}
        boxClassName="bg-void"
      >
        <div className="relative h-full w-full">
          {youtube ? (
            <YouTubeEngine ref={engine} id={youtube} zoom={zoom && playing} onState={setState} />
          ) : (
            <NativeEngine ref={engine} src={src} zoom={zoom && playing} onState={setState} />
          )}

          {/* STATIC WIREFRAME POSTER — lifts on first play */}
          <AnimatePresence>
            {!started && (
              <motion.div
                key="poster"
                className="absolute inset-0 bg-void"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
              >
                <WireframePoster variant={poster} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* HELD-FRAME STATE */}
          <AnimatePresence>
            {started && !playing && (
              <motion.div
                key="held"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ background: 'color-mix(in srgb, var(--c-void) 55%, transparent)' }}
              >
                <span className="label label-ink border border-hair bg-void px-3 py-[6px]">
                  FRAME_HELD
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* REC INDICATOR */}
          <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-[6px] border border-hair bg-void px-[6px] py-[3px]">
            <span
              className={`block size-[6px] rounded-full ${playing ? 'pulse-dot' : 'opacity-30'}`}
              style={{ background: 'var(--c-signal)' }}
            />
            <span className="label label-ink">{playing ? 'PLAYING' : 'STANDBY'}</span>
          </div>

          {/* PLACEHOLDER + CREDIT — third-party reel, not our work */}
          {placeholder && (
            <div className="pointer-events-none absolute right-3 top-3 flex flex-col items-end gap-[5px]">
              <span
                className="label px-[6px] py-[3px]"
                style={{ background: 'var(--c-signal)', color: 'var(--c-void)' }}
              >
                PLACEHOLDER
              </span>
              {credit && (
                <span className="label border border-hair bg-void px-[6px] py-[3px]">
                  © {credit}
                </span>
              )}
            </div>
          )}

          {/* TIMECODE */}
          <div className="pointer-events-none absolute bottom-3 right-3">
            <span className="tnum label border border-hair bg-void px-[6px] py-[3px]">
              {timecode(current)} / {timecode(duration)}
            </span>
          </div>

          {/* 1PX WIREFRAME PROGRESS BAR */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-hair">
            <div
              className="h-px origin-left"
              style={{
                background: 'var(--c-accent)',
                width: `${progress * 100}%`,
                transition: 'width 200ms linear',
              }}
            />
          </div>

          {/* Tick marks — quarter divisions on the timeline */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="block h-[5px] w-px bg-hair" />
            ))}
          </div>
        </div>
      </Frame>
    </div>
  )
}
