/**
 * POSTER IMAGE
 * ----------------------------------------------------------------
 * The shared rest-state plate behind every still and every video.
 *
 * High-contrast monochrome + a dot-matrix screen at the page grid's
 * own rhythm, so artwork reads as printed onto the canvas rather than
 * pasted over it. On hover the screen clears and full colour returns
 * — see `.poster-plate` / `.poster-screen` in index.css, both driven
 * by the `group` class that <Frame /> puts on the bounding box.
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
      <span aria-hidden className="poster-edge pointer-events-none absolute inset-0" />
    </div>
  )
}
