import KineticPlayer from './KineticPlayer.jsx'
import StillFrame from './StillFrame.jsx'
import { CATEGORIES, DESIGNER } from '../lib/site.js'

/** category id -> printed name, and -> original name for the cursor tag. */
const LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]))
const TECH = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.tech]))

/**
 * PROJECT CARD
 * ----------------------------------------------------------------
 * One piece of work: the framed media at its own aspect ratio (or a
 * forced `ratio`), then name, note, client and the credit line.
 *
 * The credit line is not decoration — every card names the designer,
 * and the agency where the work was made through one. See
 * RIGHTS_NOTICE in lib/site.js.
 */
export default function ProjectCard({ project: p, ratio, onClick }) {
  const { media } = p
  const frameRatio = ratio ?? `${media.w} / ${media.h}`
  // Numbered by project id (GR_07 -> 07) so the number stays with the piece
  // whatever the filter or column order.
  const label = `${LABEL[p.category]} // ${p.id.split('_')[1]}`
  const dims = `${media.w} × ${media.h}`

  return (
    <article className="flex flex-col">
      {p.type === 'video' ? (
        <KineticPlayer
          src={media.src}
          image={media.poster}
          label={label}
          dims={dims}
          ratio={frameRatio}
          onClick={onClick}
        />
      ) : (
        <StillFrame
          src={media.src}
          alt={`${p.name} — ${p.client}`}
          label={label}
          dims={dims}
          ratio={frameRatio}
          cursor={onClick ? '[View Project]' : `[${TECH[p.category]}]`}
          onClick={onClick}
        />
      )}

      <div className="mt-5 border-t border-hair pt-3">
        <h3 className="text-[14px] font-medium uppercase leading-[1.3] tracking-[0.02em]">
          {p.name}
        </h3>
        <p className="mt-[6px] text-[13px] leading-[1.5] lowercase text-muted">{p.note}</p>
        <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-hair-soft pt-[8px]">
          <span className="label">{p.client}</span>
          <span className="label shrink-0">{LABEL[p.category]}</span>
        </div>
        <p className="label mt-[6px] opacity-70">
          DESIGN: {DESIGNER}
          {p.agency && <> // VIA {p.agency}</>}
        </p>
      </div>
    </article>
  )
}
