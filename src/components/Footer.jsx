import { useEffect, useState } from 'react'
import { EMAIL, RIGHTS_NOTICE, SOCIALS } from '../lib/site.js'

/**
 * GLOBAL FOOTER — status read-out.
 * WE'RE ONLINE // YOUR TIME: <live>   [ EMAIL ] [ DRIBBBLE ] [ LINKEDIN ] [ X ]
 *                    © 2026 EMPTY AGENCY
 */

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function Footer() {
  const now = useClock()

  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  const zone =
    Intl.DateTimeFormat().resolvedOptions().timeZone?.split('/').pop()?.toUpperCase() ??
    'LOCAL'

  return (
    <footer className="relative z-10 mt-32 w-full border-t border-hair bg-void">
      <div className="gutter mx-auto w-full max-w-[1680px]">
        {/* READ-OUT ROW */}
        <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="flex items-center gap-2">
              <span
                className="pulse-dot block size-[6px] rounded-full"
                style={{ background: 'var(--c-accent)' }}
              />
              <span className="label label-ink">WE&apos;RE ONLINE</span>
            </span>
            <span className="label">//</span>
            <span className="tnum label label-ink">
              YOUR TIME: {time} {zone}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="[Email Us]"
              className="border border-hair px-3 py-[7px] text-[10px] font-medium lowercase tracking-[0.08em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
            >
              {EMAIL}
            </a>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor={`[Visit ${s.human} ↗]`}
                className="group border border-hair px-3 py-[7px] text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]"
              >
                [ {s.label} ]
              </a>
            ))}
          </div>
        </div>

        {/* SIGN-OFF */}
        <div className="flex flex-col items-center gap-2 border-t border-hair-soft py-6">
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-hair" />
            <span className="label">© 2026 EMPTY AGENCY</span>
            <span className="block h-px w-8 bg-hair" />
          </div>
          <span className="label opacity-60">
            ALL RIGHTS RESERVED
          </span>
          <p className="mt-2 max-w-[110ch] text-center text-[10px] leading-[1.6] text-muted opacity-80">
            {RIGHTS_NOTICE}
          </p>
        </div>
      </div>
    </footer>
  )
}
