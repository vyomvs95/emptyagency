import { useEffect, useRef, useState } from 'react'
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
 * bounding box — see `.poster-*` in index.css.
 *
 * LOADING: our own images first load as a light `.thumb.webp` (640px,
 * made by scripts/media/gen-thumbs.py), so a first visit paints fast.
 * The full-quality file is fetched the first time the piece is hovered —
 * or, on touch screens (no hover), once it scrolls into view — and fades
 * in over the thumb when it has arrived.
 */
const MEDIA_ROOT = `${import.meta.env.BASE_URL}media/`

export default function PosterImage({ src, alt = '', onError, onLoad, className = '' }) {
  const hasThumb = Boolean(src?.startsWith(MEDIA_ROOT) && src.endsWith('.webp') && !src.endsWith('.thumb.webp'))
  const thumb = hasThumb ? src.replace(/\.webp$/, '.thumb.webp') : src
  const [wantFull, setWantFull] = useState(false)
  const [fullReady, setFullReady] = useState(false)
  const box = useRef(null)

  useEffect(() => {
    setWantFull(false)
    setFullReady(false)
    if (!hasThumb || !box.current) return
    const el = box.current.closest('.group') ?? box.current
    const upgrade = () => setWantFull(true)
    el.addEventListener('pointerenter', upgrade, { once: true })
    let io
    if (window.matchMedia('(hover: none)').matches && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            upgrade()
            io.disconnect()
          }
        },
        { rootMargin: '200px' }
      )
      io.observe(el)
    }
    return () => {
      el.removeEventListener('pointerenter', upgrade)
      io?.disconnect()
    }
  }, [src, hasThumb])

  return (
    <div ref={box} className={`relative h-full w-full overflow-hidden ${className}`}>
      <img
        src={thumb}
        alt={alt}
        draggable={false}
        loading="lazy"
        decoding="async"
        onError={onError}
        onLoad={onLoad}
        className="poster-plate h-full w-full object-cover"
      />
      {wantFull && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ opacity: fullReady ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            draggable={false}
            decoding="async"
            onLoad={() => setFullReady(true)}
            className="poster-plate h-full w-full object-cover"
          />
        </span>
      )}
      <span aria-hidden className="poster-screen pointer-events-none absolute inset-0" />
      <span aria-hidden className="poster-wire pointer-events-none absolute inset-0">
        <WireframePoster variant="scaffold" />
      </span>
      <span aria-hidden className="poster-edge pointer-events-none absolute inset-0" />
    </div>
  )
}
