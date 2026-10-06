import { useState } from 'react'
import Frame from './Frame.jsx'
import Lightbox from './Lightbox.jsx'

/**
 * CASE STUDY — the long-form body of a UI/UX project panel.
 * ----------------------------------------------------------------
 * Replaces the one-piece stage used for films and artwork. Reads top to
 * bottom like a portfolio case study: cover, the brief, what was in
 * scope, then numbered sections (kicker, title, body, screens), and the
 * deliverables to close.
 *
 * Screens and films sit in the same bounding-box frames as the rest of
 * the site (`kind: 'video'` plays inline with controls).
 * Long web pages (`scroll: true`) are shown in a fixed-height window you
 * scroll through, so a 9,000px landing page doesn't swallow the panel.
 * Every image and film expands in a themed lightbox in the same tab. `narrow`
 * keeps a small reference image (e.g. a phone screenshot) at its own size.
 */

const expandBtn =
  'label label-ink shrink-0 border border-hair px-2 py-[3px] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]'

function Shot({ image, onExpand }) {
  const { src, w, h, caption, scroll } = image

  if (image.kind === 'video') {
    return (
      <figure>
        <div className="mb-[10px] flex items-baseline justify-between gap-4 border-b border-hair-soft pb-[6px]">
          <span className="label label-ink truncate">{caption}</span>
          <button type="button" onClick={onExpand} data-cursor="[expand]" className={expandBtn}>
            {image.duration ? `${Math.round(image.duration)} s // ` : ''}expand ↗
          </button>
        </div>
        <Frame dims={`${w} × ${h}`} ratio={`${w} / ${h}`} zoom={false} boxClassName="bg-black">
          <video
            src={src}
            poster={image.poster}
            controls
            playsInline
            preload="none"
            className="h-full w-full bg-black object-contain"
          />
        </Frame>
      </figure>
    )
  }

  if (scroll) {
    return (
      <figure>
        <div className="mb-[10px] flex items-baseline justify-between gap-4 border-b border-hair-soft pb-[6px]">
          <span className="label label-ink truncate">{caption}</span>
          <span className="flex shrink-0 items-baseline gap-3">
            <span className="label hidden sm:inline">scroll the page ↓</span>
            <button type="button" onClick={onExpand} data-cursor="[expand]" className={expandBtn}>
              expand ↗
            </button>
          </span>
        </div>
        <div
          className="h-[min(78vh,900px)] overflow-y-auto overscroll-contain border border-hair bg-white"
          data-cursor="[scroll]"
        >
          <img src={src} alt={caption} width={w} height={h} loading="lazy" className="block h-auto w-full" />
        </div>
      </figure>
    )
  }

  return (
    <button
      type="button"
      onClick={onExpand}
      className="block w-full text-left"
      style={image.narrow ? { maxWidth: 440 } : undefined}
      data-cursor="[expand]"
    >
      <Frame label={caption} meta="expand ↗" dims={`${w} × ${h}`} ratio={`${w} / ${h}`} zoom={false} boxClassName="bg-white">
        <img src={src} alt={caption} width={w} height={h} loading="lazy" className="h-full w-full object-contain" />
      </Frame>
    </button>
  )
}

export default function CaseStudy({ project }) {
  const cs = project.caseStudy
  const cover = project.assets[0]
  const [open, setOpen] = useState(null)

  // Nothing plays twice on one page: when the cover film is also shown in a
  // section (every 3D study opens on one of its own films), the section
  // keeps it — with its explanation — and the cover is not repeated above.
  const sectionShots = cs.sections.flatMap((sec) => sec.images)
  const showCover = !sectionShots.some((img) => img.src === cover.src)

  // Everything that can expand, in reading order — the lightbox steps through it.
  const coverItem = cover.kind === 'video' ? { ...cover, caption: 'case study // film' } : { ...cover, caption: project.title }
  const items = [...(showCover ? [coverItem] : []), ...sectionShots]
  const expand = (item) => () => setOpen(items.indexOf(item))

  return (
    <div>
      {!showCover ? null : cover.kind === 'video' ? (
        <Shot image={coverItem} onExpand={expand(coverItem)} />
      ) : (
        <button type="button" onClick={expand(coverItem)} className="block w-full text-left" data-cursor="[expand]">
          <Frame label="case study // cover" meta="expand ↗" dims={`${cover.w} × ${cover.h}`} ratio={`${cover.w} / ${cover.h}`} zoom={false}>
            <img src={cover.src} alt={project.title} className="h-full w-full object-cover" />
          </Frame>
        </button>
      )}

      {/* THE BRIEF */}
      <section className={`${showCover ? 'mt-14' : ''} border-t border-hair pt-6`}>
        <span className="label">overview</span>
        <p className="mt-4 max-w-[62ch] text-[clamp(18px,1.7vw,24px)] font-medium leading-[1.35] tracking-[-0.01em]">
          {cs.brief}
        </p>
        <span className="label mt-8 block">services</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {cs.scope.map((s) => (
            <span key={s} className="border border-hair px-3 py-[6px] text-[10px] font-medium tracking-[0.08em]">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* SECTIONS */}
      {cs.sections.map((sec, i) => (
        <section key={sec.title} className="mt-16 border-t border-hair pt-6 md:mt-20">
          <div className="grid grid-cols-12 gap-x-6 gap-y-3">
            <div className="col-span-12 md:col-span-4">
              <span className="label tnum">
                {String(i + 1).padStart(2, '0')} // {sec.kicker}
              </span>
              <h3 className="mt-3 text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.05] tracking-[-0.03em]">
                {sec.title}
              </h3>
            </div>
            <p className="col-span-12 max-w-[62ch] text-[15px] leading-[1.6] text-muted md:col-span-8">
              {sec.body}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-10">
            {sec.images.map((img) => (
              <Shot key={img.src} image={img} onExpand={expand(img)} />
            ))}
          </div>
        </section>
      ))}

      {/* CLIENT TESTIMONIAL — only where the client has given one */}
      {cs.testimonial && (
        <section className="mt-16 border-t border-hair pt-6 md:mt-20">
          <div className="flex items-baseline justify-between gap-4">
            <span className="label">client testimonial</span>
            {cs.status && (
              <span className="label label-ink flex items-center gap-2 border border-hair px-2 py-[3px]">
                <span className="inline-block h-[6px] w-[6px] rounded-full" style={{ background: 'var(--c-accent)' }} />
                status // {cs.status}
              </span>
            )}
          </div>
          <blockquote className="mt-6 border-l pl-6 md:pl-8" style={{ borderColor: 'var(--c-ink)' }}>
            <p className="max-w-[56ch] text-[clamp(20px,2vw,28px)] font-medium leading-[1.3] tracking-[-0.015em]">
              “{cs.testimonial.quote}”
            </p>
            <footer className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-hair-soft pt-[10px]">
              <span className="label label-ink">{cs.testimonial.name}</span>
              <span className="label">{cs.testimonial.role}</span>
            </footer>
          </blockquote>
        </section>
      )}

      {/* DELIVERABLES */}
      <section className="mt-16 border-t border-hair pt-6 md:mt-20">
        <span className="label">deliverables</span>
        <div className="mt-4 flex flex-wrap gap-2">
          {cs.deliverables.map((d) => (
            <span
              key={d}
              className="border px-3 py-[6px] text-[10px] font-medium tracking-[0.08em]"
              style={{ borderColor: 'var(--c-ink)' }}
            >
              {d}
            </span>
          ))}
        </div>
      </section>

      <Lightbox items={items} index={open} onIndex={setOpen} />
    </div>
  )
}
