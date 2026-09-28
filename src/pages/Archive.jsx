import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard.jsx'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import { BUCKETS, PROJECTS, RIGHTS_NOTICE } from '../lib/site.js'

/**
 * OUR WORK (route: archive) — every project, one card each, filterable
 * by bucket, in a masonry grid; closed by the credits & rights notice.
 * A card opens the project panel (App owns it) with every piece inside.
 */

function FilterToggle({ active, label, tech, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor={`[${tech}]`}
      className="relative border px-4 py-[9px] text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200"
      style={{
        borderColor: active ? 'var(--c-ink)' : 'var(--c-hair)',
        background: active ? 'var(--c-ink)' : 'transparent',
        color: active ? 'var(--c-void)' : 'var(--c-ink)',
      }}
    >
      [ {label} ]
      <span className="tnum ml-2 opacity-55">{String(count).padStart(2, '0')}</span>
    </button>
  )
}

/** bucket id -> printed name. */
const LABEL = Object.fromEntries(BUCKETS.map((b) => [b.id, b.label]))

const PIECES = PROJECTS.reduce((n, p) => n + p.assets.length, 0)

export default function ArchivePage({ onOpenProject }) {
  const [filter, setFilter] = useState('all')

  const counts = useMemo(() => {
    const map = { all: PROJECTS.length }
    for (const p of PROJECTS) map[p.bucket] = (map[p.bucket] || 0) + 1
    return map
  }, [])

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.bucket === filter)),
    [filter]
  )

  return (
    <Block className="pt-10 md:pt-16">
      <Container>
        {/* PAGE TITLE */}
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6 border-b border-hair pb-8">
          <div className="col-span-12 lg:col-span-8">
            <span className="label">SELECTED WORK</span>
            <h1
              data-cursor="[ARCHIVE]"
              className="mt-3 text-[clamp(38px,7vw,104px)] font-medium leading-[0.9] tracking-[-0.045em]">
              OUR WORK
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="max-w-[40ch] text-[14px] leading-[1.55] lowercase text-muted md:text-[15px]">
              selected work for brands, artists, film studios and fintech
              companies — {PROJECTS.length} projects and {PIECES} pieces across
              film, motion, graphics, 3d and ui/ux. every project opens with
              everything we made for it.
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="sticky top-[58px] z-30 -mx-1 flex flex-wrap items-center gap-2 bg-void/85 px-1 py-4 backdrop-blur-[6px] md:top-[84px]">
          {BUCKETS.map((c) => (
            <FilterToggle
              key={c.id}
              label={c.label}
              tech={c.tech}
              count={counts[c.id] ?? 0}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
            />
          ))}
          <span className="tnum label ml-auto hidden md:inline">
            SHOWING {String(visible.length).padStart(2, '0')} OF{' '}
            {String(PROJECTS.length).padStart(2, '0')} PROJECTS
          </span>
        </div>

        <SectionHeader
          index="02"
          title={`SHOWING: ${LABEL[filter]}`}
          className="mb-10"
        />

        {/* GRID — masonry columns, so every piece keeps its own shape
            (square covers, 16:9 thumbnails, 9:16 stories) uncropped. */}
        <div key={filter} className="columns-1 gap-x-6 sm:columns-2 lg:columns-3">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              className="mb-16 break-inside-avoid"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.035, 0.28), ease: [0.2, 0, 0, 1] }}
            >
              <ProjectCard project={p} onOpen={onOpenProject} />
            </motion.div>
          ))}
        </div>

        {/* END OF DIRECTORY */}
        <div className="mt-20 flex items-center gap-3">
          <span className="block h-px flex-1 bg-hair" />
          <span className="label">THAT&apos;S EVERYTHING // {visible.length} PROJECTS</span>
          <span className="block h-px flex-1 bg-hair" />
        </div>

        {/* CREDITS & RIGHTS */}
        <div className="mt-10 max-w-[92ch] border border-hair-soft p-5 md:p-6">
          <span className="label label-ink">CREDITS &amp; RIGHTS</span>
          <p className="mt-3 text-[12px] leading-[1.6] text-muted">{RIGHTS_NOTICE}</p>
        </div>
      </Container>
    </Block>
  )
}
