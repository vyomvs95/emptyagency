import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CaseStudy from './CaseStudy.jsx'
import Frame from './Frame.jsx'
import PosterImage from './PosterImage.jsx'
import { thumbnail } from '../lib/youtube.js'
import { BUCKETS, PROJECTS } from '../lib/site.js'

const BUCKET = Object.fromEntries(BUCKETS.map((b) => [b.id, b]))

/**
 * PROJECT PANEL — the "sub page" for one project.
 * ----------------------------------------------------------------
 * A full-viewport sheet in the same wireframe language as the rest of
 * the site: meta rail on the left (client, what we did, credit), a stage
 * on the right showing one piece at a time, and a strip of every piece
 * in the project underneath.
 *
 * Opened from any project card via App's `openProject(slug)`; the slug
 * rides in the hash (#/archive/tmc) so a project can be linked to
 * directly. Esc closes, ← / → step through the pieces.
 *
 * Playback on the stage is the real thing — native <video> with sound
 * and controls for our own files, the standard YouTube embed for YouTube
 * pieces. The embed is deliberately left as YouTube ships it (their
 * terms forbid covering or restyling the player); it plays in place and
 * never navigates away from the site.
 */

const assetThumb = (a) =>
  a.kind === 'youtube' ? thumbnail(a.id, 'hqdefault') : a.kind === 'video' ? a.poster : a.src

/* -------------------------------- STAGE -------------------------------- */
function Stage({ asset }) {
  const { w, h } = asset
  // Fit the piece inside the stage: full width for landscape, height-capped
  // for square and vertical work so a 9:16 story never runs off-screen.
  const sizing = { width: `min(100%, calc(64vh * ${w} / ${h}))` }
  const label =
    asset.kind === 'youtube'
      ? 'VIDEO // PLAYS HERE'
      : asset.kind === 'video'
        ? asset.excerpt
          ? 'FILM // EXCERPT'
          : 'FILM'
        : 'STILL'

  return (
    <div className="mx-auto" style={sizing}>
      <Frame
        label={`${label} // ${asset.caption}`}
        dims={`${w} × ${h}`}
        ratio={`${w} / ${h}`}
        zoom={false}
        cursor={asset.kind === 'image' ? '[STILL]' : '[PLAYING HERE]'}
        boxClassName="bg-void"
      >
        {asset.kind === 'image' && (
          <img src={asset.src} alt={asset.caption} className="h-full w-full object-contain" />
        )}
        {asset.kind === 'video' && (
          <video
            key={asset.src}
            src={asset.src}
            poster={asset.poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full bg-black object-contain"
          />
        )}
        {asset.kind === 'youtube' && (
          <iframe
            key={asset.id}
            title={asset.caption}
            src={`https://www.youtube-nocookie.com/embed/${asset.id}?autoplay=1&rel=0&playsinline=1`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full border-0"
          />
        )}
      </Frame>
    </div>
  )
}

/* -------------------------------- PANEL -------------------------------- */
export default function ProjectPanel({ slug, onClose, onOpen }) {
  const index = PROJECTS.findIndex((p) => p.slug === slug)
  const project = PROJECTS[index]
  const [active, setActive] = useState(0)

  useEffect(() => setActive(0), [slug])

  // Lock page scroll underneath while open.
  useEffect(() => {
    if (!project) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [project])

  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (project.caseStudy) return
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % project.assets.length)
      if (e.key === 'ArrowLeft')
        setActive((i) => (i - 1 + project.assets.length) % project.assets.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="panel"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="fixed inset-0 z-[60] overflow-y-auto bg-void"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.38, ease: [0.2, 0, 0, 1] }}
        >
          {/* TOP BAR */}
          <div className="sticky top-0 z-10 border-b border-hair bg-void/90 backdrop-blur-[6px]">
            <div className="gutter mx-auto flex h-[58px] w-full max-w-[1680px] items-center justify-between gap-4">
              <span className="label hidden truncate sm:inline">
                OUR WORK // {BUCKET[project.bucket].label} // PROJECT{' '}
                {String(index + 1).padStart(2, '0')} OF {String(PROJECTS.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpen(prev.slug)}
                  data-cursor={`[${prev.title}]`}
                  className="border border-hair px-3 py-[7px] text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
                >
                  [ ← PREV ]
                </button>
                <button
                  type="button"
                  onClick={() => onOpen(next.slug)}
                  data-cursor={`[${next.title}]`}
                  className="border border-hair px-3 py-[7px] text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
                >
                  [ NEXT → ]
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  data-cursor="[Close · Esc]"
                  className="border px-3 py-[7px] text-[10px] font-medium uppercase tracking-[0.16em]"
                  style={{ background: 'var(--c-ink)', color: 'var(--c-void)', borderColor: 'var(--c-ink)' }}
                >
                  [ CLOSE ✕ ]
                </button>
              </div>
            </div>
          </div>

          <div className="gutter mx-auto w-full max-w-[1680px] pb-24 pt-10 md:pt-14">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              {/* META RAIL */}
              <div className="col-span-12 self-start lg:sticky lg:top-[82px] lg:col-span-4">
                <span className="label">
                  {BUCKET[project.bucket].label}
                  {project.caseStudy && ' // CASE STUDY'}
                </span>
                <h2 className="mt-3 text-[clamp(30px,4.2vw,64px)] font-medium leading-[0.95] tracking-[-0.04em]">
                  {project.title}
                </h2>
                <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.55] lowercase text-muted">
                  {project.summary}
                </p>

                <div className="mt-8 flex flex-col border-t border-hair">
                  {[
                    ['CLIENT', project.client],
                    ...(project.caseStudy ? [['PLATFORM', project.caseStudy.platform]] : []),
                    ['WHAT WE DID', project.role],
                    [project.caseStudy ? 'SCREENS & BOARDS' : 'PIECES', String(project.assets.length).padStart(2, '0')],
                    ['CREDIT', project.credit],
                    ...(project.agency ? [['VIA', project.agency]] : []),
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-6 border-b border-hair-soft py-[10px]"
                    >
                      <span className="label shrink-0">{k}</span>
                      <span className="label label-ink text-right">{v}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 max-w-[52ch] text-[11px] leading-[1.6] text-muted">
                  Shown as a record of work the team contributed to. All marks,
                  artwork and likenesses belong to their owners. See Credits &amp;
                  Rights on Our Work.
                </p>
              </div>

              {/* STAGE + STRIP — or, for UI/UX work, the long-form case study */}
              <div className="col-span-12 lg:col-span-8">
                {project.caseStudy ? (
                  <CaseStudy project={project} />
                ) : (
                  <Stage asset={project.assets[active]} />
                )}

                {!project.caseStudy && project.assets.length > 1 && (
                  <div className="mt-12">
                    <div className="flex items-center justify-between border-b border-hair-soft pb-[6px]">
                      <span className="label label-ink">EVERY PIECE IN THIS PROJECT</span>
                      <span className="label tnum">
                        {String(active + 1).padStart(2, '0')} / {String(project.assets.length).padStart(2, '0')} // ← →
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                      {project.assets.map((a, i) => (
                        <button
                          key={`${a.kind}-${a.id ?? a.src}`}
                          type="button"
                          onClick={() => setActive(i)}
                          data-cursor={`[${a.caption}]`}
                          className="group relative aspect-square overflow-hidden border transition-colors duration-200"
                          style={{ borderColor: i === active ? 'var(--c-accent)' : 'var(--c-hair)' }}
                        >
                          <PosterImage src={assetThumb(a)} alt={a.caption} />
                          {a.kind !== 'image' && (
                            <span className="label label-ink absolute left-1 top-1 border border-hair bg-void px-1">
                              ▶
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
