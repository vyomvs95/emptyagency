import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * THE FIGMA CURSOR
 * ----------------------------------------------------------------
 * Replaces the OS pointer with a multiplayer-style arrow + name tag.
 * The arrow rides a stiff spring (near-instant, faint overshoot) and
 * the tag rides a looser one, so the label organically trails behind
 * the point — exactly the lag you feel in a live Figma session.
 *
 * Any element can retitle the tag by declaring `data-cursor="[LABEL]"`.
 * Elements are detected by hit-testing on move, so nothing has to be
 * wired up through context.
 */

const ARROW =
  'M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z'

const DEFAULT_LABEL = '[Client]'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [label, setLabel] = useState(DEFAULT_LABEL)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Tip of the arrow — snappy.
  const px = useSpring(x, { stiffness: 900, damping: 45, mass: 0.45 })
  const py = useSpring(y, { stiffness: 900, damping: 45, mass: 0.45 })

  // Name tag — deliberately looser so it swings into place.
  const tx = useSpring(x, { stiffness: 240, damping: 26, mass: 0.7 })
  const ty = useSpring(y, { stiffness: 240, damping: 26, mass: 0.7 })

  // Only take over the pointer on real mice / trackpads.
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      const el = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      const next = el?.getAttribute('data-cursor') || DEFAULT_LABEL
      setLabel((prev) => (prev === next ? prev : next))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('blur', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled, visible, x, y])

  if (!enabled) return null

  return (
    // Gated on (pointer: fine) only — must match the `cursor: none` rule in
    // index.css exactly, or a narrow desktop window ends up with no cursor.
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {visible && (
          <>
            {/* NAME TAG — trails the point */}
            <motion.div
              key="cursor-tag"
              className="absolute left-0 top-0"
              style={{ x: tx, y: ty }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.16 }}
            >
              <div
                className="tnum absolute select-none whitespace-nowrap px-[6px] py-[3px] text-[10px] font-medium uppercase tracking-[0.14em]"
                style={{
                  left: 16,
                  top: 20,
                  background: 'var(--c-accent)',
                  color: 'var(--c-void)',
                }}
              >
                {label}
              </div>
            </motion.div>

            {/* ARROW — the actual point */}
            <motion.div
              key="cursor-arrow"
              className="absolute left-0 top-0"
              style={{ x: px, y: py }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <motion.svg
                width="22"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ scale: pressed ? 0.82 : 1 }}
                transition={{ type: 'spring', stiffness: 700, damping: 26 }}
                style={{ transformOrigin: '4px 3px', display: 'block' }}
              >
                <path
                  d={ARROW}
                  fill="var(--c-accent)"
                  stroke="var(--c-void)"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
