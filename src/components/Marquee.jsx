/**
 * Raw infinite ticker. The strip is rendered twice and translated by
 * exactly -50%, so the seam is invisible.
 *
 * Runs on a CSS keyframe animation (`.marquee-track` in index.css), not
 * JavaScript: the compositor keeps it moving smoothly on phones even while
 * the page scrolls. With "reduce motion" switched on it slows right down
 * instead of stopping — it used to freeze on those screens.
 */
export default function Marquee({ text, speed = 26, className = '', reverse = false }) {
  const strip = text.repeat(4)

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-hair py-3 ${className}`}
      aria-label={text.trim()}
    >
      <div
        className="marquee-track flex w-max whitespace-nowrap"
        style={{ '--marquee-duration': `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1}
            className="shrink-0 text-[13px] font-medium tracking-[0.04em] md:text-[15px]"
          >
            {strip}
          </span>
        ))}
      </div>
    </div>
  )
}
