import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Frame from './Frame.jsx'
import WireframePoster from './WireframePoster.jsx'

/**
 * KINETIC PLAYER
 * ----------------------------------------------------------------
 * Hover-to-play video inside the bounding-box system.
 *
 *   · muted / loop / playsInline / preload=metadata
 *   · sits on a static wireframe poster until the cursor enters
 *   · pauses the instant the cursor leaves (frame is held, not reset)
 *   · 1px wireframe progress bar welded to the bottom of the box
 *
 * The <video> scales 1.05× on hover; the chrome (progress bar,
 * timecode, REC dot) is deliberately OUTSIDE that transform so the
 * wireframe furniture never moves.
 */

function timecode(seconds) {
  if (!Number.isFinite(seconds)) return '00:00'
  const s = Math.max(0, Math.floor(seconds))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

export default function KineticPlayer({
  src,
  label,
  meta,
  dims,
  ratio = '16 / 9',
  zoom = true,
  poster = 'video',
  className = '',
  onClick,
}) {
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState({ current: 0, duration: 0 })

  const play = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    const attempt = v.play()
    if (attempt?.then) {
      attempt
        .then(() => {
          setPlaying(true)
          setStarted(true)
        })
        .catch(() => {
          /* autoplay blocked — poster stays, box remains inert */
        })
    } else {
      setPlaying(true)
      setStarted(true)
    }
  }, [])

  const pause = useCallback(() => {
    videoRef.current?.pause()
    setPlaying(false)
  }, [])

  const onTimeUpdate = useCallback((e) => {
    const v = e.currentTarget
    const d = v.duration
    setTime({ current: v.currentTime, duration: d })
    setProgress(Number.isFinite(d) && d > 0 ? v.currentTime / d : 0)
  }, [])

  return (
    <div
      className={className}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
    >
      <Frame
        label={label}
        meta={meta}
        dims={dims}
        ratio={ratio}
        zoom={false}
        cursor={playing ? '[PAUSE]' : '[PLAY]'}
        onClick={onClick}
        boxClassName="bg-void"
      >
        <div className="relative h-full w-full">
          {/* MEDIA — the only thing that scales */}
          <motion.video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            className="h-full w-full object-cover"
            style={{ filter: 'saturate(0.92) contrast(1.03)' }}
            animate={{ scale: zoom && playing ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.6 }}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={(e) =>
              setTime({ current: 0, duration: e.currentTarget.duration })
            }
          />

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

          {/* TIMECODE */}
          <div className="pointer-events-none absolute bottom-3 right-3">
            <span className="tnum label border border-hair bg-void px-[6px] py-[3px]">
              {timecode(time.current)} / {timecode(time.duration)}
            </span>
          </div>

          {/* 1PX WIREFRAME PROGRESS BAR */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-hair">
            <div
              className="h-px origin-left"
              style={{
                background: 'var(--c-accent)',
                width: `${Math.min(100, progress * 100)}%`,
                transition: 'width 120ms linear',
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
