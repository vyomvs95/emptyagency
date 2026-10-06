import { motion, useReducedMotion } from 'framer-motion'

/**
 * Raw infinite ticker. The strip is rendered twice and translated by
 * exactly -50%, so the seam is mathematically invisible.
 */
export default function Marquee({
  text,
  speed = 26,
  className = '',
  reverse = false,
}) {
  const reduced = useReducedMotion()
  const strip = text.repeat(3)

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-hair py-3 ${className}`}
      aria-label={text.trim()}
    >
      <motion.div
        className="flex w-max whitespace-nowrap will-change-transform"
        animate={reduced ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1}
            className="shrink-0 pr-0 text-[13px] font-medium tracking-[0.08em] md:text-[15px]"
          >
            {strip}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
