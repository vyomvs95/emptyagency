import KineticPlayer from './KineticPlayer.jsx'
import StillFrame from './StillFrame.jsx'
import { thumbnail } from '../lib/youtube.js'
import { BUCKETS } from '../lib/site.js'
import { brandCase } from '../lib/brand.jsx'

const BUCKET = Object.fromEntries(BUCKETS.map((b) => [b.id, b]))

/**
 * PROJECT CARD
 * ----------------------------------------------------------------
 * One project — however many pieces it holds — shown by its cover at
 * the cover's own aspect ratio (or a forced `ratio`). Clicking anywhere
 * on the frame opens the project panel with every piece inside.
 *
 * Covers: our own video plays muted on hover; a YouTube piece shows its
 * still only (the player itself lives in the panel, never in the grid).
 *
 * The credit line is not decoration — see RIGHTS_NOTICE in lib/site.js.
 */
export default function ProjectCard({ project: p, ratio, onOpen }) {
  const c = p.cover
  const frameRatio = ratio ?? `${c.w} / ${c.h}`
  const pieces = String(p.assets.length).padStart(2, '0')
  const label = p.chapters
    ? `${BUCKET[p.bucket].label} // folder // ${String(p.chapters.length).padStart(2, '0')} case studies`
    : p.caseStudy
    ? `${BUCKET[p.bucket].label} // case study // ${p.caseStudy.platform}`
    : `${BUCKET[p.bucket].label} // ${pieces} ${p.assets.length === 1 ? 'piece' : 'pieces'}`
  const open = () => onOpen(p.slug)

  return (
    <article className="flex flex-col">
      {c.kind === 'video' ? (
        <KineticPlayer
          src={c.src}
          image={c.poster}
          label={label}
          meta={p.hero ? 'featured' : undefined}
          dims={`${c.w} × ${c.h}`}
          ratio={frameRatio}
          onClick={open}
        />
      ) : (
        <StillFrame
          src={c.kind === 'youtube' ? thumbnail(c.id, 'maxresdefault') : c.src}
          fallback={c.kind === 'youtube' ? thumbnail(c.id, 'hqdefault') : undefined}
          alt={`${p.title} — ${p.client}`}
          label={label}
          meta={c.kind === 'youtube' ? '▶ video' : undefined}
          dims={`${c.w} × ${c.h}`}
          ratio={frameRatio}
          cursor={p.chapters ? '[open folder]' : p.caseStudy ? '[read case study]' : '[open project]'}
          onClick={open}
        />
      )}

      <button type="button" onClick={open} data-cursor="[open project]" className="mt-5 border-t border-hair pt-3 text-left">
        <h3 className="text-[14px] font-medium leading-[1.3] tracking-[0.02em]">
          {p.title}
        </h3>
        <p className="mt-[6px] text-[13px] leading-[1.5] text-muted">{p.role}</p>
        <span className="mt-3 flex items-baseline justify-between gap-3 border-t border-hair-soft pt-[8px]">
          <span className="label">{p.client}</span>
          <span className="label shrink-0 label-ink">[ open ↗ ]</span>
        </span>
        <span className="label mt-[6px] block opacity-70">
          {brandCase(p.credit)}
          {p.agency && <> // via {p.agency}</>}
        </span>
      </button>
    </article>
  )
}
