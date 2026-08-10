import WireframePoster from './WireframePoster.jsx'

/**
 * POSTER IMAGE
 * ----------------------------------------------------------------
 * The shared rest state behind every still and every video — the work
 * seen the way a designer sees it before it is finished.
 *
 * At rest the artwork sits at 60% against the page ground, in
 * high-contrast monochrome, under a dot-matrix screen and a structural
 * wireframe scaffold: thirds, diagonals, a centre registration target,
 * corner ticks. Construction lines drawn over the work.
 *
 * On hover the scaffold and screen lift, the plate goes to full opacity
 * and full colour. Bones first, then the finished thing.
 *
 * All of it is driven by the `group` class <Frame /> puts on the
 * bounding box — see `.poster-*` in index.css. No state, no JS.
 */
export default function PosterImage({ src, alt = '', onError, className = '' }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        onError={onError}
        className="poster-plate h-full w-full object-cover"
      />
      <span aria-hidden className="poster-screen pointer-events-none absolute inset-0" />
      <span aria-hidden className="poster-wire pointer-events-none absolute inset-0">
        <WireframePoster variant="scaffold" />
      </span>
      <span aria-hidden className="poster-edge pointer-events-none absolute inset-0" />
    </div>
  )
}
