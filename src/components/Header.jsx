import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MagneticLogo from './MagneticLogo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { ROUTES } from '../lib/site.js'

/**
 * GLOBAL HEADER
 * ----------------------------------------------------------------
 * ● empty agency  //  [ INDEX ] [ ARCHIVE ] [ CAPABILITIES ] [ VISION ] [ INITIATE ↗ ]
 *
 * Sticky, formatted as a directory path. A second hairline row reads
 * out the active directory and live viewport dimensions, like a
 * canvas status bar.
 */

function NavItem({ route, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor={`[${route.label.replace(' ↗', '')}]`}
      aria-current={active ? 'page' : undefined}
      className="group relative px-[10px] py-[6px] text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200"
      style={{ color: active ? 'var(--c-void)' : 'var(--c-ink)' }}
    >
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 -z-10"
          style={{ background: 'var(--c-ink)' }}
          transition={{ type: 'spring', stiffness: 420, damping: 38 }}
        />
      )}
      {!active && (
        <span
          className="absolute inset-0 -z-10 border opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ borderColor: 'var(--c-accent)' }}
        />
      )}
      <span className="opacity-45">[</span>
      <span className="px-[5px]">{route.label}</span>
      <span className="opacity-45">]</span>
    </button>
  )
}

export default function Header({ current, onNavigate }) {
  const [menu, setMenu] = useState(false)
  const [vp, setVp] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const sync = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  useEffect(() => {
    setMenu(false)
  }, [current])

  const active = ROUTES.find((r) => r.id === current)

  const go = (id) => {
    onNavigate(id)
    setMenu(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hair bg-void/85 backdrop-blur-[6px]">
      {/* PRIMARY ROW */}
      <div className="gutter mx-auto flex h-[58px] w-full max-w-[1680px] items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <MagneticLogo onClick={() => go('index')} />
          <span className="label hidden sm:inline">//</span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-1 lg:flex">
          {ROUTES.map((r) => (
            <NavItem
              key={r.id}
              route={r}
              active={current === r.id}
              onClick={() => go(r.id)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            data-cursor={menu ? '[CLOSE]' : '[MENU]'}
            className="border border-hair px-3 py-[7px] text-[11px] font-medium uppercase tracking-[0.14em] lg:hidden"
          >
            {menu ? '[ CLOSE ]' : '[ MENU ]'}
          </button>
        </div>
      </div>

      {/* STATUS ROW */}
      <div className="gutter mx-auto hidden h-[26px] w-full max-w-[1680px] items-center justify-between border-t border-hair-soft md:flex">
        <span className="label">
          DIR: ~/{active?.dir ?? 'root'} <span className="caret">|</span>
        </span>
        <span className="tnum label">
          VIEWPORT: {vp.w}x{vp.h} // ZOOM: 100% // GRID: 32U
        </span>
      </div>

      {/* MOBILE PANEL */}
      <AnimatePresence>
        {menu && (
          <motion.nav
            className="overflow-hidden border-t border-hair bg-void lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
          >
            <div className="gutter flex flex-col py-2">
              {ROUTES.map((r, i) => (
                <motion.button
                  key={r.id}
                  type="button"
                  onClick={() => go(r.id)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="flex items-baseline justify-between border-b border-hair-soft py-4 text-left"
                >
                  <span className="text-[18px] font-medium uppercase tracking-[0.06em]">
                    [ {r.label} ]
                  </span>
                  <span className="label">
                    {String(i + 1).padStart(2, '0')}
                    {current === r.id ? ' // ACTIVE' : ''}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
