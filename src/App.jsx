import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Layout from './components/Layout.jsx'
import Cursor from './components/Cursor.jsx'
import LogoLoader from './components/LogoLoader.jsx'
import ThemeWipe from './components/ThemeWipe.jsx'
import ProjectPanel from './components/ProjectPanel.jsx'

import IndexPage from './pages/Index.jsx'
import ArchivePage from './pages/Archive.jsx'
import CapabilitiesPage from './pages/Capabilities.jsx'
import VisionPage from './pages/Vision.jsx'
import InitiatePage from './pages/Initiate.jsx'

import { PROJECTS, ROUTE_IDS } from './lib/site.js'

const PAGES = {
  index: IndexPage,
  archive: ArchivePage,
  capabilities: CapabilitiesPage,
  vision: VisionPage,
  initiate: InitiatePage,
}

/**
 * Hash shape: #/<route>[/<project-slug>] — e.g. #/archive/tmc.
 * The optional slug opens that project's panel over the route, so any
 * project can be linked to directly and Back closes the panel.
 */
const SLUGS = new Set(PROJECTS.map((p) => p.slug))

const readHash = () => {
  const [id, slug] = window.location.hash.replace(/^#\/?/, '').split('/')
  return {
    route: ROUTE_IDS.includes(id) ? id : 'index',
    project: SLUGS.has(slug) ? slug : null,
  }
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [route, setRoute] = useState(() =>
    typeof window === 'undefined' ? 'index' : readHash().route
  )
  const [project, setProject] = useState(() =>
    typeof window === 'undefined' ? null : readHash().project
  )

  /* Hash <-> state sync so deep links and the back button both work. */
  useEffect(() => {
    const onHash = () => {
      const h = readHash()
      setRoute(h.route)
      setProject(h.project)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const openProject = useCallback(
    (slug) => {
      window.location.hash = `/${route}/${slug}`
      setProject(slug)
    },
    [route]
  )

  const closeProject = useCallback(() => {
    window.location.hash = `/${route}`
    setProject(null)
  }, [route])

  // The main nav stays visible over an open project, so a nav click also
  // closes the project (same page: just close it).
  const navigate = useCallback(
    (id) => {
      if (!ROUTE_IDS.includes(id)) return
      setProject(null)
      if (id === route) {
        window.location.hash = `/${id}`
        return
      }
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
        {!booted && <LogoLoader onComplete={() => setBooted(true)} />}
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

      {/* The page mounts immediately and stays fully opaque — the loader
          sits on top and blurs it with its own backdrop-filter, so no
          filter is ever applied to this tree and no residual blur is left
          behind to soften the hairlines. */}
      <div>
        <Layout current={route} onNavigate={navigate}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.38, ease: [0.2, 0, 0, 1] }}
            >
              <Page onNavigate={navigate} onOpenProject={openProject} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </div>

      <ProjectPanel slug={project} onClose={closeProject} onOpen={openProject} />
    </>
  )
}
