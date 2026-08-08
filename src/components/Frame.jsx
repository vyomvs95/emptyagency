import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * THE BOUNDING BOX SYSTEM
 * ----------------------------------------------------------------
 * Every image and video in the build is wrapped in this. It draws:
 *   · a technical label above the box            (ASSET: … // FRAME_nn)
 *   · a 1px structural border                    (turns accent on hover)
 *   · four 8×8 anchor points on the exact corners
 *   · a Figma-style dimension chip under the box on hover
 *
 * The box itself NEVER moves or scales. Only the media inside it
 * scales (1.05×), clipped by the frame — the wireframe stays static
 * exactly like a transform tool holding a selection.
 */

const ANCHORS = [
  { key: 'tl', style: { left: -4, top: -4 } },
  { key: 'tr', style: { right: -4, top: -4 } },
  { key: 'bl', style: { left: -4, bottom: -4 } },
  { key: 'br', style: { right: -4, bottom: -4 } },
]

export default function Frame({
  label,
  meta,
  dims,
  ratio = '16 / 9',
  zoom = true,
  cursor,
  className = '',
  boxClassName = '',
  onClick,
  children,
}) {
  const [hover, setHover] = useState(false)

  return (
    <div className={className}>
      {/* TECHNICAL LABEL */}
      {(label || meta) && (
        <div className="mb-[10px] flex items-baseline justify-between gap-4 border-b border-hair-soft pb-[6px]">
          <span className="label label-ink truncate">{label}</span>
          {meta && <span className="label shrink-0">{meta}</span>}
        </div>
      )}

      {/* BOUNDING BOX */}
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
        data-cursor={cursor}
      >
        <div
          className={`relative overflow-hidden border transition-colors duration-200 ${boxClassName}`}
          style={{
            aspectRatio: ratio,
            borderColor: hover ? 'var(--c-accent)' : 'var(--c-hair)',
          }}
        >
          <motion.div
            className="h-full w-full"
            animate={{ scale: zoom && hover ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.6 }}
          >
            {children}
          </motion.div>
        </div>

        {/* ANCHOR POINTS — 8×8, dead on the corners */}
        {ANCHORS.map((a) => (
          <span
            key={a.key}
            aria-hidden
            className="pointer-events-none absolute z-10 block size-2 border transition-colors duration-200"
            style={{
              ...a.style,
              background: hover ? 'var(--c-void)' : 'var(--c-ink)',
              borderColor: hover ? 'var(--c-accent)' : 'var(--c-ink)',
            }}
          />
        ))}

        {/* DIMENSION CHIP */}
        {dims && (
          <motion.span
            aria-hidden
            className="tnum pointer-events-none absolute left-1/2 top-full z-10 mt-[7px] -translate-x-1/2 whitespace-nowrap px-[5px] py-[2px] text-[10px] tracking-[0.1em]"
            style={{ background: 'var(--c-accent)', color: 'var(--c-void)' }}
            initial={false}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : -3 }}
            transition={{ duration: 0.15 }}
          >
            {dims}
          </motion.span>
        )}
      </div>
    </div>
  )
}
