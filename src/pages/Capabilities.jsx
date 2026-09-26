import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal, { RuleIn } from '../components/Reveal.jsx'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import { PILLARS, PIPELINE, STACK } from '../lib/site.js'

/**
 * WHAT WE DO (route: capabilities) — tools, three services, the process.
 */
export default function CapabilitiesPage({ onNavigate }) {
  // All tools engaged by default; toggling reads out as a live config.
  const [engaged, setEngaged] = useState(() => new Set(STACK.map((t) => t.id)))

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
            <span className="label">OUR SERVICES</span>
            <h1
              data-cursor="[CAPABILITIES]"
              className="mt-3 text-[clamp(38px,7vw,104px)] font-medium leading-[0.9] tracking-[-0.045em]">
              WHAT WE DO
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="max-w-[40ch] text-[14px] leading-[1.55] lowercase text-muted md:text-[15px]">
              three services, one simple process. we understand what you need,
              plan it properly, then make it.
            </p>
          </div>
        </div>

        {/* ======================= TECH STACK ======================= */}
        <div className="mt-12">
          <SectionHeader
            index="01"
            title="TOOLS WE USE"
            meta={`${String(engaged.size).padStart(2, '0')} OF ${STACK.length} SELECTED // TAP TO TOGGLE`}
          />
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {STACK.map((tool) => {
              const on = engaged.has(tool.id)
              return (
                <motion.button
                  key={tool.id}
                  type="button"
                  onClick={() => toggle(tool.id)}
                  data-cursor={`[${tool.human}]`}
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
                  [{tool.name}]
                </motion.button>
              )
            })}
          </div>
          <p className="tnum mt-4 text-[11px] uppercase tracking-[0.14em] text-muted">
            USING:{' '}
            {STACK.filter((t) => engaged.has(t.id))
              .map((t) => t.name)
              .join(' + ') || 'NO TOOLS SELECTED'}
          </p>
        </div>

        {/* ====================== THREE PILLARS ===================== */}
        <div className="mt-24">
          <SectionHeader index="02" title="WHAT WE OFFER" meta="03 SERVICES" />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.08}>
                <article
                  className="group flex h-full flex-col border-t border-hair pt-5"
                  data-cursor={`[${p.tech}]`}
                >
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
          <SectionHeader index="03" title="HOW WE WORK" meta="03 STEPS" />

          <div className="mt-10 flex flex-col">
            {PIPELINE.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.06}>
                <div
                  className="group grid grid-cols-12 items-start gap-x-6 gap-y-4 border-t border-hair py-8 transition-colors duration-300 hover:border-[var(--c-accent)]"
                  data-cursor={`[${s.tech}]`}
                >
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
              Tell us about your project. We&apos;ll keep it simple.
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('initiate')}
              data-cursor="[INITIATE]"
              className="shrink-0 border px-6 py-[13px] text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{ background: 'var(--c-ink)', color: 'var(--c-void)', borderColor: 'var(--c-ink)' }}
            >
              [ START A PROJECT ↗ ]
            </button>
          </div>
        </Reveal>
      </Container>
    </Block>
  )
}
