import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import KineticPlayer from '../components/KineticPlayer.jsx'
import StillFrame from '../components/StillFrame.jsx'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import { CATEGORIES, PROJECTS } from '../lib/site.js'

/**
 * ARCHIVE — filterable deployment grid.
 * Hovering a card scales the media 1.05× inside a completely static
 * bounding box (handled by <Frame /> / <KineticPlayer />).
 */

function FilterToggle({ active, label, human, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor={`[${human}]`}
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

/** category id -> plain-English name, for the cursor tag. */
const HUMAN = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.human]))

export default function ArchivePage() {
  const [filter, setFilter] = useState('all')

  const counts = useMemo(() => {
    const map = { all: PROJECTS.length }
    for (const p of PROJECTS) map[p.category] = (map[p.category] || 0) + 1
    return map
  }, [])

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <Block className="pt-10 md:pt-16">
      <Container>
        {/* PAGE TITLE */}
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6 border-b border-hair pb-8">
          <div className="col-span-12 lg:col-span-8">
            <span className="label">DIRECTORY // ~/root/archive</span>
            <h1 className="mt-3 text-[clamp(38px,7vw,104px)] font-medium leading-[0.9] tracking-[-0.045em]">
              ARCHIVE
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="max-w-[40ch] text-[14px] leading-[1.55] lowercase text-muted md:text-[15px]">
              fifteen deployments. every asset is bound to a 1px frame with live
              anchor points. hover any node to load its media.
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="sticky top-[58px] z-30 -mx-1 flex flex-wrap items-center gap-2 bg-void/85 px-1 py-4 backdrop-blur-[6px] md:top-[84px]">
          {CATEGORIES.map((c) => (
            <FilterToggle
              key={c.id}
              label={c.label}
              human={c.human}
              count={counts[c.id] ?? 0}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
            />
          ))}
          <span className="tnum label ml-auto hidden md:inline">
            RENDERING {String(visible.length).padStart(2, '0')} /{' '}
            {String(PROJECTS.length).padStart(2, '0')} NODES
          </span>
        </div>

        <SectionHeader
          index="02"
          title={`FILTER: ${CATEGORIES.find((c) => c.id === filter)?.label}`}
          meta="GRID: 3_COL // GUTTER: 24PX"
          className="mb-10"
        />

        {/* GRID */}
        <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const label = `ASSET: ${p.category.toUpperCase()} // FRAME_${String(i + 1).padStart(2, '0')}`
              const meta = `[${p.dims}]`
              return (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, scale: 0.985 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.035, 0.28),
                    ease: [0.2, 0, 0, 1],
                    layout: { type: 'spring', stiffness: 260, damping: 32 },
                  }}
                  className="flex flex-col"
                >
                  {p.type === 'video' ? (
                    <KineticPlayer
                      src={p.src}
                      label={label}
                      meta={meta}
                      dims={p.dims.replace('x', ' × ')}
                      ratio="4 / 3"
                    />
                  ) : (
                    <StillFrame
                      src={p.src}
                      alt={p.name}
                      label={label}
                      meta={meta}
                      dims={p.dims.replace('x', ' × ')}
                      ratio="4 / 3"
                      variant={p.variant}
                      cursor={`[${HUMAN[p.category]}]`}
                    />
                  )}

                  <div className="mt-5 border-t border-hair pt-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="truncate text-[14px] font-medium uppercase tracking-[0.02em]">
                        {p.name}
                      </h2>
                      <span className="tnum label shrink-0">{p.id}</span>
                    </div>
                    <p className="mt-[6px] text-[13px] leading-[1.5] lowercase text-muted">
                      {p.note}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-hair-soft pt-[8px]">
                      <span className="label">{p.client}</span>
                      <span className="label">
                        {p.category.toUpperCase()} // {p.year}
                      </span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* END OF DIRECTORY */}
        <div className="mt-20 flex items-center gap-3">
          <span className="block h-px flex-1 bg-hair" />
          <span className="label">END_OF_DIRECTORY // {visible.length} NODES RENDERED</span>
          <span className="block h-px flex-1 bg-hair" />
        </div>
      </Container>
    </Block>
  )
}
