import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * LOGO LOADER
 * ----------------------------------------------------------------
 * Built entirely from the mark itself — the same ● that lives in the
 * header. Three beats over ~1.9s:
 *
 *   1. CONSTRUCT  the void scales in on a spring, crosshair guides and
 *                 the dashed magnetic field draw around it
 *   2. NAME       the wordmark unfurls from tracked-out to set
 *   3. DOCK       the whole cluster flies to the exact coordinates of
 *                 the header logo and shrinks to its 13px size, so the
 *                 loader hands off to the real mark rather than cutting
 *
 * The dock target is measured from the live gutter + header height, so
 * it stays registered at every breakpoint.
 */

const DOT_START = 56 // px
const DOT_END = 13 // px — matches MagneticLogo
const DOCK_AT = 1350 // ms
const DONE_AT = 1900 // ms

/** Header logo centre: gutter + half the mark, header row is 58px tall. */
function dockTarget() {
  const w = window.innerWidth
  const gutter = w >= 1280 ? 64 : w >= 768 ? 40 : 20
  const maxed = Math.max(0, (w - 1680) / 2) // container is capped at 1680
  return {
    x: gutter + maxed + DOT_END / 2,
    y: 29,
  }
}

export default function LogoLoader({ onComplete }) {
  const [phase, setPhase] = useState('construct')
  const [dock, setDock] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setDock(dockTarget())
    const t1 = setTimeout(() => {
      setDock(dockTarget())
      setPhase('dock')
    }, DOCK_AT)
    const t2 = setTimeout(onComplete, DONE_AT)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onComplete])

  const docking = phase === 'dock'

  return (
    <motion.div
      className="fixed inset-0 z-[10000] overflow-hidden bg-void"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.2, 0, 0, 1] } }}
    >
      {/* CANVAS GUIDES — the crosshair the mark is constructed on */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ opacity: docking ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
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
      </motion.div>

      {/* THE CLUSTER — travels to the header slot on dock */}
      <motion.div
        className="absolute flex items-center gap-[10px]"
        initial={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
        animate={
          docking
            ? { left: dock.x, top: dock.y, x: '-50%', y: '-50%' }
            : { left: '50%', top: '50%', x: '-50%', y: '-50%' }
        }
        transition={{ duration: 0.55, ease: [0.65, 0, 0.2, 1] }}
      >
        {/* THE VOID */}
        <span className="relative flex items-center justify-center">
          {/* magnetic field ring */}
          <motion.span
            aria-hidden
            className="absolute rounded-full border border-dashed"
            style={{ borderColor: 'var(--c-hair)' }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={
              docking
                ? { width: 0, height: 0, opacity: 0 }
                : { width: 132, height: 132, opacity: 1 }
            }
            transition={{ duration: 0.85, ease: [0.2, 0, 0, 1] }}
          />
          {/* the mark */}
          <motion.span
            className="block rounded-full"
            style={{ background: 'var(--c-ink)' }}
            initial={{ width: 0, height: 0 }}
            animate={{
              width: docking ? DOT_END : DOT_START,
              height: docking ? DOT_END : DOT_START,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 16, mass: 0.7 }}
          />
        </span>

        {/* THE WORDMARK */}
        <motion.span
          className="whitespace-nowrap lowercase leading-none"
          initial={{ opacity: 0, letterSpacing: '0.4em', fontSize: 15 }}
          animate={{
            opacity: 1,
            letterSpacing: docking ? '-0.01em' : '0.02em',
            fontSize: docking ? 15 : 28,
          }}
          transition={{ duration: 0.7, delay: docking ? 0 : 0.3, ease: [0.2, 0, 0, 1] }}
        >
          empty agency
        </motion.span>
      </motion.div>

      {/* LOAD RULE */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{ background: 'var(--c-ink)' }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: DONE_AT / 1000, ease: [0.3, 0, 0, 1] }}
      />

      {/* CORNER REGISTRATION */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ opacity: docking ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      >
        {[
          'left-3 top-3 border-l border-t',
          'right-3 top-3 border-r border-t',
          'left-3 bottom-3 border-b border-l',
          'right-3 bottom-3 border-b border-r',
        ].map((pos) => (
          <span key={pos} className={`absolute block size-3 border-hair ${pos}`} />
        ))}
      </motion.div>
    </motion.div>
  )
}
