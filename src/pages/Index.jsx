import { motion } from 'framer-motion'
import KineticPlayer from '../components/KineticPlayer.jsx'
import StillFrame from '../components/StillFrame.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal, { RuleIn } from '../components/Reveal.jsx'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import { FEATURED, MARQUEE_TEXT } from '../lib/site.js'
import { VIDEO } from '../lib/media.js'

const HEADLINE = ['We clear the clutter.', 'You get the results.']

export default function IndexPage({ onNavigate }) {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <Block className="pt-10 md:pt-16">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            {/* META RAIL */}
            <div className="col-span-12 lg:col-span-3">
              <div className="flex flex-col gap-3 border-t border-hair pt-3">
                {[
                  ['NODE', 'INDEX_01'],
                  ['STUDIO', 'EMPTY AGENCY'],
                  ['EST', '2026 // GLOBAL'],
                  ['DISCIPLINE', 'INTERFACE · KINETIC · IDENTITY'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <span className="label">{k}</span>
                    <span className="label label-ink text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

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
                  className="mt-5 block max-w-[22ch] text-[clamp(18px,2.1vw,32px)] font-normal leading-[1.15] tracking-[-0.02em] text-muted"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.26, ease: [0.2, 0, 0, 1] }}
                >
                  The ultimate baseline for interface, kinetic, and identity design.
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
                  data-cursor="[Start a Project]"
                  className="border px-5 py-[11px] text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200"
                  style={{ background: 'var(--c-ink)', color: 'var(--c-void)', borderColor: 'var(--c-ink)' }}
                >
                  [ INITIATE_PROJECT ↗ ]
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('archive')}
                  data-cursor="[See Our Work]"
                  className="border border-hair px-5 py-[11px] text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
                >
                  [ VIEW_ARCHIVE ]
                </button>
              </motion.div>
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
                src={VIDEO.showreel}
                label="ASSET: SHOWREEL // FRAME_00"
                meta="[3840x2160] // 00:48"
                dims="3840 × 2160"
                ratio="16 / 9"
                poster="video"
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
                  we are a design studio that treats the wireframe as the final
                  deliverable and the render as the proof. everything you see on
                  this canvas is structure first, surface second.
                </p>
                <div className="mt-6 flex flex-col gap-[10px]">
                  {[
                    ['RUNTIME', '00:48:12'],
                    ['CODEC', 'H.264 // 4:2:0'],
                    ['RENDERER', 'REDSHIFT_GPU'],
                    ['STATE', 'HOVER_TO_PLAY'],
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

      {/* ==================== RECENT DEPLOYMENTS ===================== */}
      <Block className="mt-20 md:mt-28">
        <Container>
          <SectionHeader
            index="01"
            title="RECENT_DEPLOYMENTS"
            meta={`COUNT: ${String(FEATURED.length).padStart(2, '0')} // SORT: NEWEST`}
          />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((item, i) => {
              const label = `ASSET: ${item.discipline} // FRAME_${String(i + 1).padStart(2, '0')}`
              const meta = `[${item.dims}]`
              return (
                <Reveal key={item.id} delay={i * 0.08}>
                  <article className="group flex flex-col">
                    {item.type === 'video' ? (
                      <KineticPlayer
                        src={item.src}
                        label={label}
                        meta={meta}
                        dims={item.dims.replace('x', ' × ')}
                        ratio="4 / 3"
                        onClick={() => onNavigate('archive')}
                      />
                    ) : (
                      <StillFrame
                        src={item.src}
                        alt={item.name}
                        label={label}
                        meta={meta}
                        dims={item.dims.replace('x', ' × ')}
                        ratio="4 / 3"
                        variant={item.variant}
                        onClick={() => onNavigate('archive')}
                      />
                    )}

                    <div className="mt-5 flex items-start justify-between gap-4 border-t border-hair pt-3">
                      <div>
                        <h3 className="text-[15px] font-medium uppercase tracking-[0.02em]">
                          {item.name}
                        </h3>
                        <p className="mt-[6px] max-w-[32ch] text-[13px] leading-[1.5] lowercase text-muted">
                          {item.note}
                        </p>
                      </div>
                      <span className="label shrink-0 text-right">
                        {item.client}
                        <br />
                        {item.year}
                      </span>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-14" delay={0.1}>
            <div className="flex flex-col items-start gap-5 border-t border-hair pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[46ch] text-[16px] leading-[1.45] lowercase text-muted md:text-[18px]">
                fifteen more deployments are cataloged in the archive. filter by
                interface, kinetic, or identity.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('archive')}
                data-cursor="[See Our Work]"
                className="shrink-0 border border-hair px-5 py-[11px] text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
              >
                [ OPEN_ARCHIVE ↗ ]
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
              Start from the void.
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('initiate')}
              data-cursor="[Start a Project]"
              className="border px-6 py-[13px] text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{ background: 'var(--c-ink)', color: 'var(--c-void)', borderColor: 'var(--c-ink)' }}
            >
              [ SYSTEM.INITIATE_PROJECT() ]
            </button>
          </div>
          <RuleIn />
        </Container>
      </Block>
    </>
  )
}
