import { motion } from 'framer-motion'
import KineticPlayer from '../components/KineticPlayer.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal, { RuleIn } from '../components/Reveal.jsx'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import { FEATURED, HERO, MARQUEE_TEXT, PROJECTS } from '../lib/site.js'

const HERO_FILM = HERO.assets[0]

const HEADLINE = ['We clear the clutter.', 'You get the results.']

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
                  We make campaign films, showreels, motion graphics, artwork and 3D visuals that people stop and look at.
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
              </motion.div>
            </div>

            {/* META RAIL — sits right of the headline on desktop */}
            <div className="col-span-12 lg:col-span-3 lg:pt-4">
              <div className="flex flex-col gap-3 border-t border-hair pt-3">
                {[
                  ['STUDIO', 'EMPTY AGENCY'],
                  ['FOUNDED', '2026'],
                  ['WHERE', 'WORKING WORLDWIDE'],
                  ['WE DO', 'VIDEO · MOTION · GRAPHICS · 3D'],
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

        {/* HERO PROJECT — in focus, 70% of the canvas */}
        <Container className="mt-14 md:mt-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <motion.div
              className="w-full lg:w-[70%]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.2, 0, 0, 1] }}
            >
              <KineticPlayer
                src={HERO_FILM.src}
                image={HERO_FILM.poster}
                label={`FEATURED PROJECT // ${HERO.title}`}
                dims={`${HERO_FILM.w} × ${HERO_FILM.h}`}
                ratio={`${HERO_FILM.w} / ${HERO_FILM.h}`}
                onClick={() => onOpenProject(HERO.slug)}
              />
            </motion.div>

            <motion.div
              className="w-full lg:w-[30%] lg:pt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="border-t border-hair pt-3">
                <span className="label label-ink">FEATURED PROJECT</span>
                <h2 className="mt-3 text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.05] tracking-[-0.03em]">
                  {HERO.title}
                </h2>
                <p className="mt-4 max-w-[38ch] text-[14px] leading-[1.55] lowercase text-muted md:text-[15px]">
                  {HERO.summary}
                </p>
                <div className="mt-6 flex flex-col gap-[10px]">
                  {[
                    ['CLIENT', HERO.client],
                    ['WHAT WE DID', 'CAMPAIGN FILM + CUT-DOWNS'],
                    ['PIECES', String(HERO.assets.length).padStart(2, '0')],
                    ['HOW TO WATCH', 'HOVER TO PREVIEW'],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-4 border-b border-hair-soft pb-[8px]"
                    >
                      <span className="label">{k}</span>
                      <span className="tnum label label-ink">{v}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onOpenProject(HERO.slug)}
                  data-cursor="[OPEN PROJECT]"
                  className="mt-6 w-full border px-5 py-[12px] text-[11px] font-medium uppercase tracking-[0.16em]"
                  style={{ background: 'var(--c-ink)', color: 'var(--c-void)', borderColor: 'var(--c-ink)' }}
                >
                  [ SEE THE WHOLE CAMPAIGN ↗ ]
                </button>
              </div>
            </motion.div>
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
            title="RECENT WORK"
            meta={`${String(FEATURED.length).padStart(2, '0')} PROJECTS // NEWEST FIRST`}
          />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <ProjectCard project={item} ratio="16 / 9" onOpen={onOpenProject} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14" delay={0.1}>
            <div className="flex flex-col items-start gap-5 border-t border-hair pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[46ch] text-[16px] leading-[1.45] lowercase text-muted md:text-[18px]">
                see all {PROJECTS.length} projects on our work page, sorted into
                videos, motion, graphics, 3d and ui/ux design.
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

      {/* ========================= CTA STRIP ========================= */}
      <Block className="mt-24 md:mt-32">
        <Container>
          <RuleIn />
          <div className="flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-end">
            <h2 className="max-w-[16ch] text-[clamp(30px,5vw,74px)] font-medium leading-[0.94] tracking-[-0.04em]">
              Have a project in mind?
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
