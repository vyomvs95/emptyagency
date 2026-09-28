/**
 * THE CANVAS
 * ----------------------------------------------------------------
 * A light 1px dot matrix, pinned behind
 * everything. Content scrolls over a stationary substrate — the page
 * reads as artwork placed on a design surface, not as a document.
 */
export default function GridCanvas() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* dot matrix — kept light so it reads as texture, not pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(var(--c-grid) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '-1px -1px',
        }}
      />

      {/* horizon rule — a single fixed baseline through the viewport */}
      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: 'var(--c-hair-soft)', opacity: 0.6 }}
      />
    </div>
  )
}
