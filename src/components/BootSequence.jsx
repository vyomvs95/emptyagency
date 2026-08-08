import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * BOOT SEQUENCE
 * ----------------------------------------------------------------
 * 1.5s terminal cold-start, then a single-frame flash into the canvas.
 * Lines are revealed on a fixed schedule rather than a typewriter so
 * the total runtime is deterministic.
 */

const LINES = [
  { at: 60, text: 'SYSTEM_BOOT...', tail: 'OK' },
  { at: 380, text: 'COMPILING_RESOURCES...', tail: 'OK' },
  { at: 720, text: 'MOUNTING_GRID [1px // 32u]', tail: 'OK' },
  { at: 1000, text: 'INITIATING_EMPTY_CANVAS...', tail: null },
]

const DURATION = 1500

export default function BootSequence({ onComplete }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setStep(i + 1), line.at)
    )
    timers.push(setTimeout(onComplete, DURATION))
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col justify-between p-6 md:p-10"
      style={{ background: '#000' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.2, 0, 0, 1] } }}
    >
      {/* Corner registration marks */}
      <div className="flex items-start justify-between">
        <span
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{ color: 'var(--c-boot)' }}
        >
          EMPTY_AGENCY // KERNEL v2.6.0
        </span>
        <span
          className="tnum text-[10px] uppercase tracking-[0.18em] opacity-60"
          style={{ color: 'var(--c-boot)' }}
        >
          BUFFER 00:00:01.500
        </span>
      </div>

      {/* Read-out */}
      <div className="mx-auto w-full max-w-3xl">
        <div className="space-y-2 font-medium">
          {LINES.slice(0, step).map((line) => (
            <motion.div
              key={line.text}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12 }}
              className="flex items-baseline gap-3 text-[13px] uppercase tracking-[0.14em] md:text-[15px]"
              style={{ color: 'var(--c-boot)' }}
            >
              <span className="opacity-60">&gt;</span>
              <span className="flex-1">{line.text}</span>
              {line.tail && <span className="opacity-50">[{line.tail}]</span>}
            </motion.div>
          ))}

          {step > 0 && (
            <div
              className="flex items-baseline gap-3 text-[13px] md:text-[15px]"
              style={{ color: 'var(--c-boot)' }}
            >
              <span className="opacity-60">&gt;</span>
              <span className="caret">_</span>
            </div>
          )}
        </div>

        {/* Load bar */}
        <div className="mt-8 h-px w-full" style={{ background: 'rgba(0,255,133,0.22)' }}>
          <motion.div
            className="h-px"
            style={{ background: 'var(--c-boot)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: DURATION / 1000, ease: 'linear' }}
          />
        </div>
      </div>

      <div
        className="flex items-end justify-between text-[10px] uppercase tracking-[0.18em] opacity-60"
        style={{ color: 'var(--c-boot)' }}
      >
        <span>NODE: LOCAL // RENDERER: GPU</span>
        <span>PRESS_NOTHING. WAIT.</span>
      </div>

      {/* Single-frame flash on exit */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: '#fff' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: [0, 1, 0], transition: { duration: 0.26, times: [0, 0.35, 1] } }}
      />
    </motion.div>
  )
}
