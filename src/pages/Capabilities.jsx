import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal, { RuleIn } from '../components/Reveal.jsx'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import { PILLARS, PIPELINE, STACK } from '../lib/site.js'

/**
 * CAPABILITIES — stack toggles, three pillars, the pipeline.
 */
export default function CapabilitiesPage({ onNavigate }) {
  // All tools engaged by default; toggling reads out as a live config.
  const [engaged, setEngaged] = useState(() => new Set(STACK))

  const toggle = (tool) =>
    setEngaged((prev) => {
      const next = new Set(prev)
      next.has(tool) ? next.delete(tool) : next.add(tool)
      return next
    })

  return (
    <Block className="pt-10 md:pt-16">
      <Container>
        {/* TITLE */}
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6 border-b border-hair pb-8">
          <div className="col-span-12 lg:col-span-8">
            <span className="label">DIRECTORY // ~/root/capabilities</span>
            <h1 className="mt-3 text-[clamp(38px,7vw,104px)] font-medium leading-[0.9] tracking-[-0.045em]">
              CAPABILITIES
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="max-w-[40ch] text-[14px] leading-[1.55] lowercase text-muted md:text-[15px]">
              three disciplines, one pipeline. we take the brief apart, build the
              structure, then render it at full fidelity.
            </p>
          </div>
        </div>

        {/* ======================= TECH STACK ======================= */}
        <div className="mt-12">
          <SectionHeader
            index="01"
            title="TECH_STACK"
            meta={`ENGAGED: ${String(engaged.size).padStart(2, '0')} / ${STACK.length}`}
          />
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {STACK.map((tool) => {
              const on = engaged.has(tool)
              return (
                <motion.button
                  key={tool}
                  type="button"
                  onClick={() => toggle(tool)}
                  data-cursor={on ? '[DISENGAGE]' : '[ENGAGE]'}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-[10px] border px-4 py-[10px] text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200"
                  style={{
                    borderColor: on ? 'var(--c-ink)' : 'var(--c-hair)',
                    color: on ? 'var(--c-ink)' : 'var(--c-muted)',
                  }}
                >
                  <span
                    className="block size-[7px] transition-colors duration-200"
                    style={{ background: on ? 'var(--c-accent)' : 'transparent', border: on ? 'none' : '1px solid var(--c-hair)' }}
                  />
                  [{tool}]
                </motion.button>
              )
            })}
          </div>
          <p className="tnum mt-4 text-[11px] uppercase tracking-[0.14em] text-muted">
            CONFIG: {STACK.filter((t) => engaged.has(t)).join(' + ') || 'NULL — NO_TOOLS_ENGAGED'}
          </p>
        </div>

        {/* ====================== THREE PILLARS ===================== */}
        <div className="mt-24">
          <SectionHeader index="02" title="THE_THREE_PILLARS" meta="GRID: 3_COL" />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.08}>
                <article className="group flex h-full flex-col border-t border-hair pt-5">
                  <div className="flex items-baseline gap-4">
                    <span className="label label-ink">[{p.index}]</span>
                    <h2 className="text-[clamp(26px,3.2vw,44px)] font-medium leading-[1] tracking-[-0.03em]">
                      {p.title}
                    </h2>
                  </div>

                  <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.5] lowercase text-muted md:text-[16px]">
                    {p.body}
                  </p>

                  <div className="mt-7 flex flex-col gap-0 border-t border-hair-soft">
                    {p.outputs.map((o) => (
                      <div
                        key={o}
                        className="flex items-center justify-between border-b border-hair-soft py-[10px]"
                      >
                        <span className="label label-ink">{o}</span>
                        <span
                          className="block size-[5px]"
                          style={{ background: 'var(--c-hair)' }}
                        />
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ======================== PIPELINE ======================== */}
        <div className="mt-24">
          <SectionHeader index="03" title="THE_PIPELINE" meta="METHODOLOGY // 03_STAGES" />

          <div className="mt-10 flex flex-col">
            {PIPELINE.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.06}>
                <div className="group grid grid-cols-12 items-start gap-x-6 gap-y-4 border-t border-hair py-8 transition-colors duration-300 hover:border-[var(--c-accent)]">
                  <div className="col-span-12 flex items-baseline gap-4 md:col-span-3">
                    <span className="label label-ink">{s.step}</span>
                    <span className="label">{s.duration}</span>
                  </div>

                  <div className="col-span-12 md:col-span-4">
                    <h3 className="text-[clamp(30px,4.6vw,64px)] font-medium leading-[0.95] tracking-[-0.04em]">
                      {s.title}
                    </h3>
                  </div>

                  <div className="col-span-12 md:col-span-5">
                    <p className="max-w-[46ch] text-[16px] leading-[1.45] lowercase text-muted md:text-[18px]">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <RuleIn />
          </div>
        </div>

        {/* CTA */}
        <Reveal className="mt-20">
          <div className="flex flex-col items-start justify-between gap-6 border border-hair p-8 md:flex-row md:items-center md:p-12">
            <h2 className="max-w-[20ch] text-[clamp(24px,3.4vw,44px)] font-medium leading-[1] tracking-[-0.03em]">
              Bring us a brief. We&apos;ll bring the subtraction.
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('initiate')}
              data-cursor="[INITIATE]"
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
