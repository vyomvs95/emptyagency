import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal, { RuleIn } from '../components/Reveal.jsx'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import { BRANDS, FAQ, FEATURED, INDUSTRIES, MARQUEE_TEXT, PILLARS, PROJECTS } from '../lib/site.js'

const HEADLINE = ['A UI/UX and 3D', 'design studio.']

export default function IndexPage({ onNavigate, onOpenProject }) {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <Block className="pt-10 md:pt-16">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            {/* HEADLINE */}
            <div className="col-span-12 lg:col-span-9">
              <h1 className="text-[clamp(38px,7.2vw,112px)] font-medium leading-[0.9] tracking-[-0.045em]">
                {HEADLINE.map((line, i) => (
                  <motion.span
                    key={line}
                    className="block"
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.06 + i * 0.09, ease: [0.2, 0, 0, 1] }}
                  >
                    {line}
                  </motion.span>
                ))}
                <motion.span
                  className="mt-5 block max-w-[30ch] text-[clamp(18px,2.1vw,32px)] font-normal leading-[1.15] tracking-[-0.02em] text-muted"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.26, ease: [0.2, 0, 0, 1] }}
                >
                  We design apps, platforms and websites, build products and places in 3D, and make the films and artwork that launch them. One team, so everything we make for a brand belongs together.
                </motion.span>
              </h1>

              <motion.div
                className="mt-9 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.42 }}
              >
                <button
                  type="button"
                  onClick={() => onNavigate('initiate')}
                  data-cursor="[INITIATE_PROJECT]"
                  className="border px-5 py-[11px] text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200"
                  style={{ background: 'var(--c-ink)', color: 'var(--c-void)', borderColor: 'var(--c-ink)' }}
                >
                  [ START A PROJECT ↗ ]
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('archive')}
                  data-cursor="[VIEW_ARCHIVE]"
                  className="border border-hair px-5 py-[11px] text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
                >
                  [ SEE OUR WORK ]
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('vision')}
                  data-cursor="[OUR VISION]"
                  className="border border-hair px-5 py-[11px] text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
                >
                  [ WHO WE ARE — OUR VISION → ]
                </button>
              </motion.div>
            </div>

            {/* META RAIL — sits right of the headline on desktop */}
            <div className="col-span-12 lg:col-span-3 lg:pt-4">
              <div className="flex flex-col gap-3 border-t border-hair pt-3">
                {[
                  ['STUDIO', 'EMPTY AGENCY'],
                  ['FOUNDED', '2026'],
                  ['WHERE', 'WORKING WORLDWIDE'],
                  ['WE DO', 'UI/UX · 3D & CGI · FILM · MOTION · GRAPHICS'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <span className="label">{k}</span>
                    <span className="label label-ink text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>

        {/* MARQUEE */}
        <motion.div
          className="mt-16 md:mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Marquee text={MARQUEE_TEXT} speed={30} />
        </motion.div>
      </Block>

      {/* ==================== RECENT WORK ===================== */}
      <Block className="mt-20 md:mt-28">
        <Container>
          <SectionHeader
            index="01"
            title="SELECTED WORK"
            meta={`${String(FEATURED.length).padStart(2, '0')} PROJECTS // UI/UX · 3D · FILM`}
          />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">
            {FEATURED.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08}>
                <ProjectCard project={item} ratio="4 / 3" onOpen={onOpenProject} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14" delay={0.1}>
            <div className="flex flex-col items-start gap-5 border-t border-hair pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[46ch] text-[16px] leading-[1.45] lowercase text-muted md:text-[18px]">
                {PROJECTS.length} projects across ui/ux design, 3d and cgi, film,
                motion and graphics — each one opens as a full case study or with
                everything we made for it.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('archive')}
                data-cursor="[OPEN_ARCHIVE]"
                className="shrink-0 border border-hair px-5 py-[11px] text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
              >
                [ SEE ALL OUR WORK ↗ ]
              </button>
            </div>
          </Reveal>
        </Container>
      </Block>

      {/* ========================= SERVICES ========================= */}
      <Block className="mt-24 md:mt-32">
        <Container>
          <SectionHeader index="02" title="SERVICES" meta={`${String(PILLARS.length).padStart(2, '0')} SERVICES`} />
          <div className="mt-6 flex flex-col">
            {PILLARS.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => onNavigate('capabilities')}
                  data-cursor={`[${p.tech}]`}
                  className="group grid w-full grid-cols-12 items-baseline gap-x-6 gap-y-3 border-t border-hair py-7 text-left transition-colors duration-200 hover:border-[var(--c-accent)]"
                >
                  <span className="label tnum col-span-2 md:col-span-1">[{p.index}]</span>
                  <span className="col-span-10 text-[clamp(24px,3.2vw,46px)] font-medium leading-[0.95] tracking-[-0.035em] transition-colors duration-200 group-hover:text-[var(--c-accent)] md:col-span-5">
                    {p.title}
                  </span>
                  <span className="col-span-12 max-w-[52ch] text-[15px] leading-[1.55] lowercase text-muted md:col-span-6">
                    {p.body}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </Block>

      {/* ======================== INDUSTRIES ======================== */}
      <Block className="mt-24 md:mt-32">
        <Container>
          <SectionHeader index="03" title="INDUSTRIES" meta={`${String(INDUSTRIES.length).padStart(2, '0')} SECTORS`} />
          <div className="mt-6 grid grid-cols-1 border-l border-t border-hair-soft md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="flex flex-col gap-4 border-b border-r border-hair-soft p-6">
                <h3 className="text-[clamp(18px,1.6vw,22px)] font-medium uppercase leading-[1.1] tracking-[-0.01em]">{ind.name}</h3>
                <p className="text-[14px] leading-[1.55] lowercase text-muted">{ind.body}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {ind.projects.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => onOpenProject(p.slug)}
                      data-cursor={p.chapters ? '[OPEN FOLDER]' : p.caseStudy ? '[READ CASE STUDY]' : '[OPEN PROJECT]'}
                      className="border border-hair px-3 py-[6px] text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
                    >
                      {p.title.split(' — ')[0]} ↗
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Block>

      {/* ========================== BRANDS ========================== */}
      <Block className="mt-24 md:mt-32">
        <Container>
          <SectionHeader index="04" title="BRANDS OUR WORK HAS BEEN MADE FOR" meta={`${String(BRANDS.length).padStart(2, '0')} NAMES`} />
          <ul className="mt-6 grid grid-cols-2 border-l border-t border-hair-soft sm:grid-cols-3 lg:grid-cols-5">
            {BRANDS.map((b) => (
              <li
                key={b}
                className="flex min-h-[92px] items-center justify-center border-b border-r border-hair-soft px-4 text-center text-[13px] font-medium uppercase tracking-[0.08em]"
              >
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-[80ch] text-[11px] leading-[1.6] text-muted">
            Some of this work was made through partner agencies. Names and marks belong to their owners — see Credits &amp; Rights on Our Work.
          </p>
        </Container>
      </Block>

      {/* ============================ FAQ ============================ */}
      <Block className="mt-24 md:mt-32">
        <Container>
          <SectionHeader index="05" title="QUESTIONS WE GET ASKED" meta={`${String(FAQ.length).padStart(2, '0')} ANSWERS`} />
          <div className="mt-6 flex flex-col border-b border-hair">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group border-t border-hair py-5">
                <summary
                  data-cursor="[OPEN]"
                  className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-[clamp(18px,1.8vw,24px)] font-medium tracking-[-0.02em] [&::-webkit-details-marker]:hidden"
                >
                  {q}
                  <span className="label shrink-0 transition-transform duration-200 group-open:rotate-45">[ + ]</span>
                </summary>
                <p className="mt-4 max-w-[70ch] text-[15px] leading-[1.6] lowercase text-muted">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Block>

      {/* ========================= CTA STRIP ========================= */}
      <Block className="mt-24 md:mt-32">
        <Container>
          <RuleIn />
          <div className="flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-end">
            <h2 className="max-w-[16ch] text-[clamp(30px,5vw,74px)] font-medium leading-[0.94] tracking-[-0.04em]">
              Have a project in mind? Let’s talk.
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('initiate')}
              data-cursor="[SYSTEM.INITIATE_PROJECT()]"
              className="border px-6 py-[13px] text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{ background: 'var(--c-ink)', color: 'var(--c-void)', borderColor: 'var(--c-ink)' }}
            >
              [ START A PROJECT ↗ ]
            </button>
          </div>
          <RuleIn />
        </Container>
      </Block>
    </>
  )
}
