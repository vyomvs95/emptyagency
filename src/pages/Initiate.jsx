import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Block, Container, SectionHeader } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { BUDGETS, EMAIL, FORM_ENDPOINT } from '../lib/site.js'

/**
 * START A PROJECT (route: initiate)
 * ----------------------------------------------------------------
 * Three-question form. Every field has a blinking caret; the submit
 * button runs a small state machine:
 *   IDLE → SENDING… → SENT
 *
 * Submissions are emailed to EMAIL via FORM_ENDPOINT (see lib/site.js).
 * If sending fails, the visitor is told and pointed to the address.
 */

/* Blinking caret that hides itself while the native one is active. */
function Caret({ show }) {
  return (
    <span
      aria-hidden
      className="caret select-none text-[15px] leading-none md:text-[17px]"
      style={{ visibility: show ? 'visible' : 'hidden', color: 'var(--c-accent)' }}
    >
      |
    </span>
  )
}

function PromptRow({ index, prompt, error, message = 'PLEASE FILL THIS IN', children }) {
  return (
    <div className="border-t border-hair py-6">
      <div className="flex items-baseline gap-4">
        <span className="label shrink-0">[{index}]</span>
        <span className="label label-ink">{prompt}</span>
        {error && (
          <span className="label ml-auto" style={{ color: 'var(--c-signal)' }}>
            {message}
          </span>
        )}
      </div>
      <div className="mt-3 pl-0 md:pl-[52px]">{children}</div>
    </div>
  )
}

/* --------------------------- DROPDOWN ---------------------------- */
function BudgetSelect({ value, onChange, error }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const away = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div ref={ref} className="relative max-w-[420px]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        data-cursor="[Choose Your Budget]"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 border-b pb-3 text-left text-[15px] md:text-[17px]"
        style={{ borderColor: error ? 'var(--c-signal)' : 'var(--c-hair)' }}
      >
        <span className="flex items-baseline gap-[2px]">
          <span style={{ color: value ? 'var(--c-ink)' : 'var(--c-muted)' }}>
            {value ? `[ ${value} ]` : 'CHOOSE A RANGE'}
          </span>
          <Caret show={!value && !open} />
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="label label-ink"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            className="absolute left-0 right-0 top-full z-30 mt-2 border border-hair bg-void"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
          >
            {BUDGETS.map((b, i) => (
              <li key={b} role="option" aria-selected={value === b}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(b)
                    setOpen(false)
                  }}
                  data-cursor="[Select This Range]"
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-[14px] transition-colors duration-150 hover:bg-[var(--c-ink)] hover:text-[var(--c-void)]"
                  style={{
                    borderTop: i === 0 ? 'none' : '1px solid var(--c-hair-soft)',
                  }}
                >
                  <span>[ {b} ]</span>
                  <span className="label" style={{ color: 'inherit', opacity: 0.6 }}>
                    {value === b ? 'SELECTED' : ''}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ----------------------------- PAGE ------------------------------ */
export default function InitiatePage() {
  const [form, setForm] = useState({ name: '', email: '', scope: '', budget: '' })
  const [focus, setFocus] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed

  const set = (k) => (e) => {
    const v = typeof e === 'string' ? e : e.target.value
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((x) => ({ ...x, [k]: false }))
  }

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending' || status === 'sent') return

    const next = {
      name: !form.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
      scope: !form.scope.trim(),
      budget: !form.budget,
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New enquiry from ${form.name.trim()}`,
          _replyto: form.email.trim(),
          _template: 'table',
          _honey: form.website ?? '',
          name: form.name.trim(),
          email: form.email.trim(),
          budget: form.budget,
          project: form.scope.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === false || data.success === 'false') throw new Error()
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  const buttonText =
    status === 'sending'
      ? '[ SENDING... ]'
      : status === 'sent'
        ? '[ SENT, THANK YOU ]'
        : status === 'failed'
          ? '[ TRY AGAIN ]'
          : '[ SEND ]'

  return (
    <Block className="pt-10 md:pt-16">
      <Container>
        {/* TITLE */}
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6 border-b border-hair pb-8">
          <div className="col-span-12 lg:col-span-9">
            <span className="label">GET IN TOUCH</span>
            <h1
              data-cursor="[SYSTEM.INITIATE_PROJECT()]"
              className="mt-3 break-words text-[clamp(28px,5.6vw,84px)] font-medium leading-[0.92] tracking-[-0.045em]">
              START A PROJECT
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <p className="max-w-[34ch] text-[14px] leading-[1.55] lowercase text-muted md:text-[15px]">
              just three questions, no long forms. we reply within one working
              day.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-14">
          {/* FORM */}
          <div className="col-span-12 lg:col-span-8">
            <SectionHeader
              index="01"
              title="TELL US ABOUT IT"
              rule={false}
            />

            <form onSubmit={submit} className="mt-8" noValidate>
              <PromptRow index="01" prompt="YOUR NAME OR COMPANY" error={errors.name}>
                <div className="flex max-w-[520px] items-baseline gap-[2px] border-b pb-3"
                  style={{ borderColor: errors.name ? 'var(--c-signal)' : 'var(--c-hair)' }}
                >
                  <Caret show={!form.name && focus !== 'name'} />
                  <input
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    onFocus={() => setFocus('name')}
                    onBlur={() => setFocus(null)}
                    data-cursor="[Type Here]"
                    autoComplete="organization"
                    className="w-full bg-transparent text-[15px] tracking-[0.01em] md:text-[17px]"
                    style={{ caretColor: 'var(--c-accent)' }}
                  />
                </div>
              </PromptRow>

              <PromptRow
                index="02"
                prompt="YOUR EMAIL"
                error={errors.email}
                message={form.email.trim() ? 'CHECK THIS EMAIL' : 'PLEASE FILL THIS IN'}
              >
                <div className="flex max-w-[520px] items-baseline gap-[2px] border-b pb-3"
                  style={{ borderColor: errors.email ? 'var(--c-signal)' : 'var(--c-hair)' }}
                >
                  <Caret show={!form.email && focus !== 'email'} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    onFocus={() => setFocus('email')}
                    onBlur={() => setFocus(null)}
                    data-cursor="[Type Here]"
                    autoComplete="email"
                    className="w-full bg-transparent text-[15px] tracking-[0.01em] md:text-[17px]"
                    style={{ caretColor: 'var(--c-accent)' }}
                  />
                </div>
              </PromptRow>

              {/* Spam trap: hidden from people, filled in by bots. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={form.website ?? ''}
                onChange={set('website')}
                className="hidden"
              />

              <PromptRow index="03" prompt="WHAT DO YOU NEED?" error={errors.scope}>
                <div className="flex max-w-[640px] items-start gap-[2px] border-b pb-3"
                  style={{ borderColor: errors.scope ? 'var(--c-signal)' : 'var(--c-hair)' }}
                >
                  <span className="pt-[3px]">
                    <Caret show={!form.scope && focus !== 'scope'} />
                  </span>
                  <textarea
                    rows={4}
                    value={form.scope}
                    onChange={set('scope')}
                    onFocus={() => setFocus('scope')}
                    onBlur={() => setFocus(null)}
                    data-cursor="[Type Here]"
                    className="w-full resize-none bg-transparent text-[15px] leading-[1.5] md:text-[17px]"
                    style={{ caretColor: 'var(--c-accent)' }}
                  />
                </div>
                <div className="tnum label mt-2">
                  {form.scope.length} CHARACTERS
                </div>
              </PromptRow>

              <PromptRow index="04" prompt="YOUR BUDGET" error={errors.budget}>
                <BudgetSelect value={form.budget} onChange={set('budget')} error={errors.budget} />
              </PromptRow>

              <div className="border-t border-hair pt-8">
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  data-cursor={
                    status === 'sending' ? '[Sending…]' : status === 'sent' ? '[Sent]' : '[Send My Brief]'
                  }
                  whileTap={status === 'idle' || status === 'failed' ? { scale: 0.985 } : undefined}
                  className="w-full border px-6 py-[16px] text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 md:w-auto md:px-10"
                  style={{
                    background:
                      status === 'sent'
                        ? 'var(--c-accent)'
                        : status === 'sending'
                          ? 'transparent'
                          : status === 'failed'
                            ? 'var(--c-signal)'
                            : 'var(--c-ink)',
                    color: status === 'sending' ? 'var(--c-ink)' : 'var(--c-void)',
                    borderColor:
                      status === 'sending'
                        ? 'var(--c-hair)'
                        : status === 'sent'
                          ? 'var(--c-accent)'
                          : status === 'failed'
                            ? 'var(--c-signal)'
                            : 'var(--c-ink)',
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status}
                      className="block"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                    >
                      {buttonText}
                      {status === 'sending' && <span className="caret"> _</span>}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>

                {/* TRANSMISSION LOG */}
                <AnimatePresence>
                  {status !== 'idle' && (
                    <motion.div
                      className="mt-6 overflow-hidden border border-hair"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                    >
                      <div className="flex flex-col gap-2 p-5">
                        {[
                          '> SENDING YOUR DETAILS...',
                          `> NAME: ${form.name.toUpperCase() || '—'}`,
                          `> BUDGET: ${form.budget || '—'}`,
                          status === 'sent'
                            ? '> GOT IT. A REAL PERSON WILL REPLY WITHIN 24 HOURS.'
                            : status === 'failed'
                              ? `> THAT DIDN'T GO THROUGH. TRY AGAIN, OR EMAIL US AT ${EMAIL.toUpperCase()}.`
                              : '> CONNECTING...',
                        ].map((line, i) => (
                          <motion.span
                            key={line}
                            className="label label-ink"
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.12 * i }}
                          >
                            {line}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          {/* CONTACT NODES */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex flex-col lg:mt-[42px]">
              {[
                ['EMAIL', EMAIL, `mailto:${EMAIL}`],
                ['STUDIO DECK', 'ASK US FOR ONE', null],
                ['LOCATION', 'REMOTE, WORLDWIDE', null],
                ['REPLY TIME', 'WITHIN 24 HOURS', null],
              ].map(([k, v, href]) => (
                <Reveal key={k}>
                  <div className="flex items-baseline justify-between gap-4 border-t border-hair py-5">
                    <span className="label">{k}</span>
                    {href ? (
                      <a
                        href={href}
                        data-cursor="[Email Us]"
                        className="text-[14px] lowercase transition-colors duration-200 hover:text-[var(--c-accent)]"
                      >
                        {v}
                      </a>
                    ) : (
                      <span className="text-[13px] font-medium uppercase tracking-[0.06em]">
                        {v}
                      </span>
                    )}
                  </div>
                </Reveal>
              ))}
              <div className="h-px w-full bg-hair" />
            </div>

            <div className="mt-10 border border-hair p-6">
              <span className="label">GOOD TO KNOW</span>
              <p className="mt-3 text-[14px] leading-[1.55] lowercase text-muted">
                we take on only four projects every three months, so each one
                gets our full attention.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Block>
  )
}
