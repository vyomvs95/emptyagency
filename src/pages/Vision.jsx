import { motion } from 'framer-motion'
import Reveal, { RuleIn } from '../components/Reveal.jsx'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import { brandCase } from '../lib/brand.jsx'

/**
 * VISION — the manifesto. Editorial, text-heavy, built on deliberate
 * indentation steps so the copy reads as an indented outline rather
 * than a column of prose.
 */
export default function VisionPage({ onNavigate }) {
  return (
    <Block className="pt-10 md:pt-16">
      <Container>
        {/* TITLE */}
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6 border-b border-hair pb-8">
          <div className="col-span-12 lg:col-span-9">
            <span className="label">DIRECTORY // ~/root/vision</span>
            <h1 className="lowercase mt-3 text-[clamp(32px,6.4vw,96px)] font-medium leading-[0.9] tracking-[-0.045em]">
              WHY_WE_ARE_EMPTY
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col gap-[10px]">
              {[
                ['DOC', 'MANIFESTO_v1.0'],
                ['AUTHOR', 'EMPTY AGENCY'],
                ['STATUS', 'IMMUTABLE'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <span className="label">{k}</span>
                  <span className="label label-ink">{brandCase(v)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================== THE PHILOSOPHY ==================== */}
        <div className="mt-16 md:mt-24">
          <SectionHeader index="01" title="THE_PHILOSOPHY" meta="SECTION_01 // 02" />

          <div className="mt-12 grid grid-cols-12">
            <div className="col-span-12 md:col-span-1">
              <span className="label">01.0</span>
            </div>
            <div className="col-span-12 md:col-span-11">
              <Reveal>
                <p className="max-w-[26ch] text-[clamp(28px,4.6vw,64px)] font-medium leading-[1.02] tracking-[-0.04em]">
                  In a digital landscape obsessed with noise, gradients, and
                  decorative clutter, true luxury is found in emptiness.
                </p>
              </Reveal>
            </div>
          </div>

          {/* indentation step 01 */}
          <div className="mt-14 grid grid-cols-12">
            <div className="col-span-12 md:col-start-4 md:col-span-9">
              <Reveal delay={0.05}>
                <div className="border-l border-hair pl-6 md:pl-10">
                  <span className="label">01.1 // ORIGIN</span>
                  <p className="mt-4 max-w-[34ch] text-[clamp(20px,2.6vw,34px)] font-normal leading-[1.22] tracking-[-0.02em]">
                    We are &lsquo;empty agency&rsquo;. We named ourselves after the void
                    because that is where all brilliant design begins: the blank
                    canvas, the point of origin, the Shunya.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* THE VOID */}
          <div className="mt-20 flex flex-col items-center gap-6">
            <motion.span
              className="block rounded-full"
              style={{ background: 'var(--c-ink)' }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              whileInView={{ width: 120, height: 120, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.2, 0, 0, 1] }}
            />
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-hair" />
              <span className="label">SHUNYA // शून्य // 0 // THE_POINT_OF_ORIGIN</span>
              <span className="block h-px w-10 bg-hair" />
            </div>
          </div>
        </div>

        {/* =================== WHY A WIREFRAME ==================== */}
        <div className="mt-24 md:mt-36">
          <SectionHeader index="02" title="WHY_A_WIREFRAME" meta="SECTION_02 // 02" />

          <div className="mt-12 grid grid-cols-12">
            <div className="col-span-12 md:col-span-2">
              <span className="label">02.0</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <Reveal>
                <p className="max-w-[24ch] text-[clamp(26px,4.2vw,58px)] font-medium leading-[1.04] tracking-[-0.04em]">
                  Why does our site look like a wireframe? Because we design the
                  invisible.
                </p>
              </Reveal>
            </div>
          </div>

          {/* indentation step 02 */}
          <div className="mt-14 grid grid-cols-12">
            <div className="col-span-12 md:col-start-3 md:col-span-8">
              <Reveal delay={0.05}>
                <div className="border-l border-hair pl-6 md:pl-10">
                  <span className="label">02.1 // TRUTH</span>
                  <p className="mt-4 max-w-[46ch] text-[clamp(17px,1.9vw,24px)] leading-[1.42] text-muted">
                    A wireframe isn&apos;t an unfinished state; it is the absolute,
                    mathematical truth of a product. By stripping away the
                    superficial layers, we force the focus onto what actually
                    matters:
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* indentation step 03 — the list */}
          <div className="mt-10 grid grid-cols-12">
            <div className="col-span-12 md:col-start-5 md:col-span-7">
              <div className="flex flex-col">
                {[
                  ['A', 'FRICTIONLESS UTILITY'],
                  ['B', 'FLAWLESS USER EXPERIENCE'],
                  ['C', 'CINEMATIC MOTION'],
                ].map(([k, v], i) => (
                  <Reveal key={k} delay={0.06 * i}>
                    <div className="flex items-baseline gap-6 border-t border-hair py-5">
                      <span className="label label-ink">{k}</span>
                      <span className="text-[clamp(18px,2.4vw,32px)] font-medium uppercase leading-[1.1] tracking-[-0.02em]">
                        {v}
                      </span>
                    </div>
                  </Reveal>
                ))}
                <RuleIn />
              </div>
            </div>
          </div>

          {/* indentation step 04 — the close */}
          <div className="mt-16 grid grid-cols-12">
            <div className="col-span-12 md:col-start-7 md:col-span-6">
              <Reveal delay={0.05}>
                <div className="border-l border-hair pl-6 md:pl-10">
                  <span className="label">02.2 // FOUNDATION</span>
                  <p className="mt-4 max-w-[38ch] text-[clamp(20px,2.6vw,34px)] font-medium leading-[1.2] tracking-[-0.025em]">
                    We expose our bones because our foundation is unbreakable. We
                    destroy your bottlenecks, reduce your friction to zero, and
                    build from the ground up.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* SIGN-OFF */}
        <Reveal className="mt-28">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-hair pt-8 md:flex-row md:items-end">
            <div>
              <span className="label">END_OF_MANIFESTO</span>
              <p className="mt-3 max-w-[20ch] text-[clamp(26px,4vw,52px)] font-medium leading-[0.98] tracking-[-0.04em]">
                Nothing to remove. Only what remains.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('initiate')}
              data-cursor="[Start a Project]"
              className="shrink-0 border px-6 py-[13px] text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{ background: 'var(--c-ink)', color: 'var(--c-void)', borderColor: 'var(--c-ink)' }}
            >
              [ INITIATE ↗ ]
            </button>
          </div>
        </Reveal>
      </Container>
    </Block>
  )
}
