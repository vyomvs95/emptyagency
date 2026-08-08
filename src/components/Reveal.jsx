import { motion } from 'framer-motion'

/** Scroll-in reveal. Deliberately restrained — a short lift, no fanfare. */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Hairline that draws itself in from the left when scrolled into view. */
export function RuleIn({ className = '', delay = 0 }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-hair ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0, 0, 1] }}
    />
  )
}
