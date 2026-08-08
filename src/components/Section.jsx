import { RuleIn } from './Reveal.jsx'

/** Max-width canvas with the standard gutter. */
export function Container({ className = '', children }) {
  return (
    <div className={`gutter mx-auto w-full max-w-[1680px] ${className}`}>{children}</div>
  )
}

/** Section marker: index chip, drawn rule, title, right-hand read-out. */
export function SectionHeader({ index, title, meta, className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-4">
        <span className="label label-ink shrink-0 border border-hair px-2 py-[4px]">
          [ {index} ]
        </span>
        <span className="label label-ink shrink-0">{title}</span>
        <RuleIn className="min-w-6 flex-1" />
        {meta && <span className="label shrink-0">{meta}</span>}
      </div>
    </div>
  )
}

/** Vertical rhythm wrapper for a page block. */
export function Block({ className = '', children }) {
  return <section className={`relative z-10 ${className}`}>{children}</section>
}
