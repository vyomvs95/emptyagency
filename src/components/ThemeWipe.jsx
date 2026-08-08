import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GROUND, useTheme } from '../context/ThemeContext.jsx'

/**
 * DARK / LIGHT RADIAL WIPE
 * ----------------------------------------------------------------
 * A circle the exact size and colour of the logo mark drops in from
 * above the viewport, then scales up until it swallows the screen.
 *
 * The circle is painted with the INCOMING theme's ground colour, so
 * at the moment it covers the viewport we flip the `.dark` class
 * underneath it and tear the overlay down a frame later — the swap
 * is never visible. No CSS cross-fade anywhere.
 */

const DOT = 13 // px — identical to the logo mark
const DROP = 0.34 // s
const SPREAD = 0.72 // s

export default function ThemeWipe() {
  const { wipe, commitWipe, endWipe } = useTheme()
  const [vp, setVp] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const sync = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  // Scale needed to reach the furthest viewport corner from the origin.
  const maxScale = useMemo(() => {
    if (!wipe || !vp.w) return 1
    const corners = [
      [0, 0],
      [vp.w, 0],
      [0, vp.h],
      [vp.w, vp.h],
    ]
    const reach = Math.max(...corners.map(([cx, cy]) => Math.hypot(cx - wipe.x, cy - wipe.y)))
    return ((reach + 40) * 2) / DOT
  }, [wipe, vp])

  return (
    <AnimatePresence>
      {wipe && (
        <motion.span
          key="wipe"
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9500] block rounded-full"
          style={{
            width: DOT,
            height: DOT,
            background: GROUND[wipe.to],
            x: wipe.x - DOT / 2,
            willChange: 'transform',
          }}
          initial={{ y: -DOT * 6, scale: 1, opacity: 1 }}
          animate={{
            y: [-DOT * 6, wipe.y - DOT / 2, wipe.y - DOT / 2],
            scale: [1, 1, maxScale],
          }}
          exit={{ opacity: 1 }}
          transition={{
            duration: DROP + SPREAD,
            times: [0, DROP / (DROP + SPREAD), 1],
            ease: [0.65, 0, 0.35, 1],
          }}
          onAnimationComplete={() => {
            // Circle now covers the viewport: swap the ground beneath it.
            commitWipe()
            requestAnimationFrame(() => requestAnimationFrame(() => endWipe()))
          }}
        />
      )}
    </AnimatePresence>
  )
}
