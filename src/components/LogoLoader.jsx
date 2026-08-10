import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * LOGO LOADER
 * ----------------------------------------------------------------
 * Built entirely from the mark itself. Four beats:
 *
 *   ORBIT   the void breaks off and travels around its magnetic field
 *           ring three full times — the same field the header logo
 *           uses on hover, here completed as a full orbit
 *   GATHER  the mark falls back into the centre
 *   COVER   it expands from 14px until it swallows the viewport
 *   REVEAL  the black turns white, then dissolves off a blurred page
 *           that sharpens into focus
 *
 * The blur lives on THIS overlay as a backdrop-filter, never on the
 * page itself — so when the loader unmounts there is no residual
 * filter left to soften the 1px hairlines underneath.
 */

const RING = 132 // px — matches MagneticLogo's field radius
const DOT = 14 // px
const ORBITS = 3

const T = {
  orbit: 1500,
  gather: 260,
  cover: 480,
  reveal: 520,
}

const AT = {
  gather: T.orbit,
  cover: T.orbit + T.gather,
  reveal: T.orbit + T.gather + T.cover,
  done: T.orbit + T.gather + T.cover + T.reveal,
}

export default function LogoLoader({ onComplete }) {
  const [phase, setPhase] = useState('orbit')
  const [vp, setVp] = useState({ w: 1440, h: 900 })

  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight })
    const timers = [
      setTimeout(() => setPhase('gather'), AT.gather),
      setTimeout(() => setPhase('cover'), AT.cover),
      setTimeout(() => setPhase('reveal'), AT.reveal),
      setTimeout(onComplete, AT.done),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  // Scale needed to take a 14px dot past the furthest corner.
  const maxScale = useMemo(
    () => ((Math.hypot(vp.w, vp.h) / 2 + 40) * 2) / DOT,
    [vp]
  )

  const gathering = phase !== 'orbit'
  const covering = phase === 'cover' || phase === 'reveal'
  const revealing = phase === 'reveal'

  return (
    <motion.div
      className="fixed inset-0 z-[10000] overflow-hidden"
      initial={{ backgroundColor: 'var(--c-void)' }}
      animate={{
        // Goes transparent under the cover circle so the backdrop blur
        // has something to blur once the circle dissolves.
        backgroundColor: revealing ? 'rgba(0,0,0,0)' : 'var(--c-void)',
        backdropFilter: revealing ? 'blur(0px)' : 'blur(22px)',
        WebkitBackdropFilter: revealing ? 'blur(0px)' : 'blur(22px)',
      }}
      transition={{
        backgroundColor: { duration: 0 },
        backdropFilter: { duration: T.reveal / 1000, ease: [0.2, 0, 0, 1] },
        WebkitBackdropFilter: { duration: T.reveal / 1000, ease: [0.2, 0, 0, 1] },
      }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      {/* ------------------------- STAGE ------------------------- */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: covering ? 0 : 1 }}
        transition={{ duration: 0.22 }}
      >
        {/* crosshair guides */}
        <motion.div
          className="absolute left-1/2 top-0 h-full w-px origin-top"
          style={{ background: 'var(--c-hair-soft)' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
        />
        <motion.div
          className="absolute left-0 top-1/2 h-px w-full origin-left"
          style={{ background: 'var(--c-hair-soft)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
        />

        {/* corner registration */}
        {[
          'left-3 top-3 border-l border-t',
          'right-3 top-3 border-r border-t',
          'left-3 bottom-3 border-b border-l',
          'right-3 bottom-3 border-b border-r',
        ].map((pos) => (
          <span key={pos} className={`absolute block size-3 border-hair ${pos}`} />
        ))}

        {/* ---------------------- THE MARK ---------------------- */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="relative grid place-items-center"
            style={{ width: RING, height: RING }}
          >
            {/* the magnetic field it orbits */}
            <motion.span
              aria-hidden
              className="absolute rounded-full border border-dashed"
              style={{ borderColor: 'var(--c-hair)', width: RING, height: RING }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: gathering ? 0.82 : 1,
                opacity: gathering ? 0 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            />

            {/* orbit rig: rotating this carries the mark around the ring */}
            <motion.div
              className="absolute inset-0"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 * ORBITS }}
              transition={{ duration: T.orbit / 1000, ease: [0.5, 0, 0.35, 1] }}
            >
              <motion.span
                className="absolute left-1/2 top-0 block rounded-full"
                style={{
                  width: DOT,
                  height: DOT,
                  marginLeft: -DOT / 2,
                  marginTop: -DOT / 2,
                  background: 'var(--c-ink)',
                }}
                // Falls from the ring edge back into the centre.
                animate={{ y: gathering ? RING / 2 : 0 }}
                transition={{
                  duration: T.gather / 1000,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            </motion.div>
          </div>

          {/* wordmark */}
          <motion.div
            className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap pt-7 lowercase leading-none"
            initial={{ opacity: 0, letterSpacing: '0.5em', y: 6 }}
            animate={{
              opacity: gathering ? 0 : 1,
              letterSpacing: '0.02em',
              y: 0,
            }}
            transition={{ duration: 0.7, delay: gathering ? 0 : 0.35, ease: [0.2, 0, 0, 1] }}
            style={{ fontSize: 17 }}
          >
            empty agency
          </motion.div>
        </div>

        {/* load rule */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ background: 'var(--c-ink)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: AT.cover / 1000, ease: [0.3, 0, 0, 1] }}
        />
      </motion.div>

      {/* --------------------- COVER + REVEAL --------------------- */}
      {covering && (
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-1/2 block rounded-full"
          style={{
            width: DOT,
            height: DOT,
            marginLeft: -DOT / 2,
            marginTop: -DOT / 2,
            willChange: 'transform',
          }}
          initial={{ scale: 1, backgroundColor: 'var(--c-ink)', opacity: 1 }}
          animate={{
            scale: maxScale,
            // Black swallows the page, turns white, then dissolves to
            // leave the blurred site sharpening underneath.
            backgroundColor: revealing ? 'var(--c-void)' : 'var(--c-ink)',
            opacity: revealing ? 0 : 1,
          }}
          transition={{
            scale: { duration: T.cover / 1000, ease: [0.6, 0, 0.2, 1] },
            backgroundColor: { duration: 0.18, ease: 'linear' },
            opacity: { duration: T.reveal / 1000, delay: 0.14, ease: [0.2, 0, 0, 1] },
          }}
        />
      )}
    </motion.div>
  )
}
