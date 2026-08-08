import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Layout from './components/Layout.jsx'
import Cursor from './components/Cursor.jsx'
import BootSequence from './components/BootSequence.jsx'
import ThemeWipe from './components/ThemeWipe.jsx'

import IndexPage from './pages/Index.jsx'
import ArchivePage from './pages/Archive.jsx'
import CapabilitiesPage from './pages/Capabilities.jsx'
import VisionPage from './pages/Vision.jsx'
import InitiatePage from './pages/Initiate.jsx'

import { ROUTE_IDS } from './lib/site.js'

const PAGES = {
  index: IndexPage,
  archive: ArchivePage,
  capabilities: CapabilitiesPage,
  vision: VisionPage,
  initiate: InitiatePage,
}

const readHash = () => {
  const id = window.location.hash.replace('#/', '').replace('#', '')
  return ROUTE_IDS.includes(id) ? id : 'index'
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [route, setRoute] = useState(() =>
    typeof window === 'undefined' ? 'index' : readHash()
  )

  /* Hash <-> state sync so deep links and the back button both work. */
  useEffect(() => {
    const onHash = () => setRoute(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = useCallback(
    (id) => {
      if (!ROUTE_IDS.includes(id) || id === route) return
      window.location.hash = `/${id}`
      setRoute(id)
      window.scrollTo({ top: 0, behavior: 'auto' })
    },
    [route]
  )

  /* Lock scroll while the terminal is booting. */
  useEffect(() => {
    document.body.style.overflow = booted ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [booted])

  const Page = PAGES[route] ?? IndexPage

  return (
    <>
      <Cursor />
      <ThemeWipe />

      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {/* Scan line that sweeps the viewport on every route change */}
      <AnimatePresence>
        <motion.span
          key={`sweep-${route}`}
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-[45] block h-px"
          style={{ background: 'var(--c-accent)' }}
          initial={{ y: 0, opacity: 0.9, scaleX: 0 }}
          animate={{ y: '100vh', opacity: 0, scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.2, 0, 0, 1] }}
        />
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.4, delay: booted ? 0.05 : 0 }}
      >
        <Layout current={route} onNavigate={navigate}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.38, ease: [0.2, 0, 0, 1] }}
            >
              <Page onNavigate={navigate} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </motion.div>
    </>
  )
}
