import Frame from './Frame.jsx'

/**
 * CASE STUDY — the long-form body of a UI/UX project panel.
 * ----------------------------------------------------------------
 * Replaces the one-piece stage used for films and artwork. Reads top to
 * bottom like a portfolio case study: cover, the brief, what was in
 * scope, then numbered sections (kicker, title, body, screens), and the
 * deliverables to close.
 *
 * Screens sit in the same bounding-box frames as the rest of the site.
 * Long web pages (`scroll: true`) are shown in a fixed-height window you
 * scroll through, so a 9,000px landing page doesn't swallow the panel.
 * Every image opens full size in a new tab for a closer look. `narrow`
 * keeps a small reference image (e.g. a phone screenshot) at its own size.
 */

function Shot({ image }) {
  const { src, w, h, caption, scroll } = image

  if (scroll) {
    return (
      <figure>
        <div className="mb-[10px] flex items-baseline justify-between gap-4 border-b border-hair-soft pb-[6px]">
          <span className="label label-ink truncate">{caption}</span>
          <span className="label shrink-0">SCROLL THE PAGE ↓</span>
        </div>
        <div
          className="h-[min(78vh,900px)] overflow-y-auto overscroll-contain border border-hair bg-white"
          data-cursor="[SCROLL]"
        >
          <img src={src} alt={caption} width={w} height={h} loading="lazy" className="block h-auto w-full" />
        </div>
      </figure>
    )
  }

  return (
    <a
      href={src}
      target="_blank"
      rel="noreferrer"
      className="block"
      style={image.narrow ? { maxWidth: 440 } : undefined}
      data-cursor="[OPEN FULL SIZE ↗]"
    >
      <Frame label={caption} meta="FULL SIZE ↗" dims={`${w} × ${h}`} ratio={`${w} / ${h}`} zoom={false} boxClassName="bg-white">
        <img src={src} alt={caption} width={w} height={h} loading="lazy" className="h-full w-full object-contain" />
      </Frame>
    </a>
  )
}

export default function CaseStudy({ project }) {
  const cs = project.caseStudy
  const cover = project.assets[0]

  return (
    <div>
      <Frame label="CASE STUDY // COVER" dims={`${cover.w} × ${cover.h}`} ratio={`${cover.w} / ${cover.h}`} zoom={false}>
        <img src={cover.src} alt={project.title} className="h-full w-full object-cover" />
      </Frame>

      {/* THE BRIEF */}
      <section className="mt-14 border-t border-hair pt-6">
        <span className="label">OVERVIEW</span>
        <p className="mt-4 max-w-[62ch] text-[clamp(18px,1.7vw,24px)] font-medium leading-[1.35] tracking-[-0.01em]">
          {cs.brief}
        </p>
        <span className="label mt-8 block">SERVICES</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {cs.scope.map((s) => (
            <span key={s} className="border border-hair px-3 py-[6px] text-[10px] font-medium uppercase tracking-[0.16em]">
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
            <p className="col-span-12 max-w-[62ch] text-[15px] leading-[1.6] lowercase text-muted md:col-span-8">
              {sec.body}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-10">
            {sec.images.map((img) => (
              <Shot key={img.src} image={img} />
            ))}
          </div>
        </section>
      ))}

      {/* DELIVERABLES */}
      <section className="mt-16 border-t border-hair pt-6 md:mt-20">
        <span className="label">DELIVERABLES</span>
        <div className="mt-4 flex flex-wrap gap-2">
          {cs.deliverables.map((d) => (
            <span
              key={d}
              className="border px-3 py-[6px] text-[10px] font-medium uppercase tracking-[0.16em]"
              style={{ borderColor: 'var(--c-ink)' }}
            >
              {d}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
