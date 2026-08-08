import { useEffect, useState } from 'react'
import { SOCIALS } from '../lib/site.js'

/**
 * GLOBAL FOOTER — terminal read-out.
 * STATUS: ONLINE // LOCAL_TIME: <live>      [ DRIBBBLE ] [ LINKEDIN ] [ X ]
 *                    END_OF_CANVAS // © 2026 EMPTY AGENCY
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
              <span className="label label-ink">STATUS: ONLINE</span>
            </span>
            <span className="label">//</span>
            <span className="tnum label label-ink">
              LOCAL_TIME: {time} {zone}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="[OPEN ↗]"
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
            <span className="label">END_OF_CANVAS // © 2026 EMPTY AGENCY</span>
            <span className="block h-px w-8 bg-hair" />
          </div>
          <span className="label opacity-60">
            ALL_RIGHTS_RESERVED // BUILT ON A 1PX GRID
          </span>
        </div>
      </div>
    </footer>
  )
}
