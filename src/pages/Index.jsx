import { motion } from 'framer-motion'
import KineticPlayer from '../components/KineticPlayer.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal, { RuleIn } from '../components/Reveal.jsx'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import { FEATURED, MARQUEE_TEXT, PROJECTS, SHOWREEL } from '../lib/site.js'

const HEADLINE = ['We clear the clutter.', 'You get the results.']

export default function IndexPage({ onNavigate }) {
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
                  We design song and film artwork, thumbnails, logos, motion graphics and 3D visuals that people stop and look at.
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
                  ['WE DO', 'GRAPHICS · MOTION · 3D'],
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

        {/* SHOWREEL — 70% of the canvas */}
        <Container className="mt-14 md:mt-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <motion.div
              className="w-full lg:w-[70%]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.2, 0, 0, 1] }}
            >
              <KineticPlayer
                src={SHOWREEL.media.src}
                image={SHOWREEL.media.poster}
                label={`FEATURED // ${SHOWREEL.name}`}
                meta={SHOWREEL.client}
                dims={`${SHOWREEL.media.w} × ${SHOWREEL.media.h}`}
                ratio="16 / 9"
              />
            </motion.div>

            <motion.div
              className="w-full lg:w-[30%] lg:pt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="border-t border-hair pt-3">
                <p className="max-w-[38ch] text-[14px] leading-[1.55] lowercase text-muted md:text-[15px]">
                  we're a small design studio. we plan every project carefully
                  before we make it look good, so what you get is clear, simple
                  and works the way it should.
                </p>
                <div className="mt-6 flex flex-col gap-[10px]">
                  {[
                    ['WHAT IT IS', 'LOGO ANIMATION'],
                    ['CLIENT', SHOWREEL.client],
                    ['SOUND', 'MUTED'],
                    ['HOW TO WATCH', 'HOVER TO PLAY'],
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
                <ProjectCard
                  project={item}
                  ratio="1 / 1"
                  onClick={() => onNavigate('archive')}
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14" delay={0.1}>
            <div className="flex flex-col items-start gap-5 border-t border-hair pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[46ch] text-[16px] leading-[1.45] lowercase text-muted md:text-[18px]">
                see all {PROJECTS.length} pieces on our work page, sorted into
                graphics, motion, videos and 3d.
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
