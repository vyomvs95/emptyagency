import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MAGNETIC LOGO — ● empty agency
 * ----------------------------------------------------------------
 * The solid mark detaches from the wordmark and is pulled toward the
 * cursor inside a 130px field, on a soft spring so it overshoots and
 * settles rather than tracking rigidly. Outside the field it snaps
 * home. The wordmark itself never moves — only the void does.
 */

const FIELD = 130 // px radius of the magnetic field
const PULL = 0.42 // how far the mark travels toward the pointer

export default function MagneticLogo({ onClick }) {
  const dotRef = useRef(null)
  const [engaged, setEngaged] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 190, damping: 13, mass: 0.5 })
  const y = useSpring(my, { stiffness: 190, damping: 13, mass: 0.5 })

  useEffect(() => {
    const onMove = (e) => {
      const el = dotRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < FIELD) {
        const falloff = 1 - dist / FIELD // strongest at the centre
        mx.set(dx * PULL * (0.45 + falloff * 0.55))
        my.set(dy * PULL * (0.45 + falloff * 0.55))
        setEngaged(true)
      } else {
        mx.set(0)
        my.set(0)
        setEngaged(false)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="[Back to Home]"
      aria-label="empty agency — index"
      className="group flex items-center gap-[10px] text-left"
    >
      {/* THE VOID */}
      <span ref={dotRef} className="relative block size-[13px]">
        {/* ghost outline left behind when the mark detaches */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-dashed"
          style={{ borderColor: 'var(--c-hair)' }}
          animate={{ opacity: engaged ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          aria-hidden
          className="absolute inset-0 block rounded-full"
          style={{ x, y, background: 'var(--c-ink)' }}
          animate={{ scale: engaged ? 1.22 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        />
      </span>

      <span className="text-[15px] font-medium lowercase tracking-[-0.01em]">
        empty agency
      </span>
    </button>
  )
}
