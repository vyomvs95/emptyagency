import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

/**
 * Minimal sun / moon switch. Hands its own screen position to the
 * wipe so the circle drops in on the toggle's column.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, wipe } = useTheme()
  const ref = useRef(null)

  const fire = () => {
    const r = ref.current?.getBoundingClientRect()
    toggleTheme(
      r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={fire}
      disabled={Boolean(wipe)}
      data-cursor={theme === 'dark' ? '[LIGHT]' : '[DARK]'}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative grid size-8 place-items-center border border-hair transition-colors duration-200 hover:border-[var(--c-accent)] ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.svg
            key="sun"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
            transition={{ duration: 0.22 }}
          >
            <circle cx="8" cy="8" r="3" stroke="var(--c-ink)" strokeWidth="1" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="8"
                y1="1"
                x2="8"
                y2="3"
                stroke="var(--c-ink)"
                strokeWidth="1"
                transform={`rotate(${deg} 8 8)`}
              />
            ))}
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            initial={{ opacity: 0, rotate: 60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -60, scale: 0.6 }}
            transition={{ duration: 0.22 }}
          >
            <path
              d="M13 9.6A5.6 5.6 0 0 1 6.4 3a5.6 5.6 0 1 0 6.6 6.6Z"
              stroke="var(--c-ink)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}
