/**
 * THE CANVAS
 * ----------------------------------------------------------------
 * Fixed 1px dot matrix + a 12-column layout grid, pinned behind
 * everything. Content scrolls over a stationary substrate — the page
 * reads as artwork placed on a design surface, not as a document.
 */
export default function GridCanvas() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* dot matrix */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(var(--c-grid) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '-1px -1px',
        }}
      />

      {/* 12-column layout grid */}
      <div className="gutter absolute inset-0 hidden opacity-60 md:block">
        <div className="mx-auto grid h-full w-full max-w-[1680px] grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-full border-l"
              style={{
                borderColor: 'var(--c-hair-soft)',
                borderRightWidth: i === 11 ? 1 : 0,
                borderRightColor: 'var(--c-hair-soft)',
                borderRightStyle: 'solid',
              }}
            />
          ))}
        </div>
      </div>

      {/* horizon rule — a single fixed baseline through the viewport */}
      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: 'var(--c-hair-soft)', opacity: 0.6 }}
      />
    </div>
  )
}
