import { useEffect, useState } from 'react'
import { EMAIL, RIGHTS_NOTICE } from '../lib/site.js'
import { brandCase } from '../lib/brand.jsx'

/**
 * GLOBAL FOOTER — status read-out.
 * WE'RE ONLINE // YOUR TIME: <live>   [ EMAIL ]
 *                    © 2026 EMPTY AGENCY · ALL RIGHTS RESERVED
 *                    rights notice — the only place it appears on any page
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
          </div>
        </div>

        {/* SIGN-OFF */}
        <div className="flex flex-col items-center gap-2 border-t border-hair-soft py-6">
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-hair" />
            <span className="label">© 2026 {brandCase('empty agency')}</span>
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
