import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * LIGHTBOX — an image or film, expanded in place.
 * ----------------------------------------------------------------
 * Replaces "open in a new tab". Same wireframe language as the rest of
 * the site: a label bar (caption, dimensions, position in the set), the
 * piece inside a 1px frame with corner anchors, and bracketed controls.
 *
 *   items   — [{ kind?: 'image' | 'video', src, poster?, w, h, caption }]
 *   index   — which one is open, or null when closed
 *   onIndex — set the open index (null closes)
 *
 * Tall pieces (a full landing page, a long emailer) open at readable width
 * and scroll inside the box; everything else fits the viewport. Esc
 * closes, ← / → step through the set. Keys are caught before anything
 * underneath (the project panel also listens for Esc and arrows).
 */
export default function Lightbox({ items, index, onIndex }) {
  const open = index !== null && index !== undefined && items[index]
  const item = open ? items[index] : null
  const many = items.length > 1

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (!['Escape', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return
      e.stopImmediatePropagation()
      e.preventDefault()
      if (e.key === 'Escape') onIndex(null)
      if (many && e.key === 'ArrowRight') onIndex((index + 1) % items.length)
      if (many && e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open, index, items.length, many, onIndex])

  if (typeof document === 'undefined') return null

  const tall = item && item.kind !== 'video' && item.h / item.w > 1.6
  const btn =
    'border border-hair px-3 py-[7px] text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[var(--c-accent)] hover:text-[var(--c-accent)]'

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          className="fixed inset-0 z-[80] flex flex-col bg-void/95 backdrop-blur-[6px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
          onClick={() => onIndex(null)}
        >
          {/* LABEL BAR */}
          <div className="border-b border-hair" onClick={(e) => e.stopPropagation()}>
            <div className="gutter mx-auto flex h-[58px] w-full max-w-[1680px] items-center justify-between gap-4">
              <div className="flex min-w-0 items-baseline gap-4">
                <span className="label label-ink truncate">{item.caption}</span>
                <span className="label tnum hidden shrink-0 sm:inline">
                  {item.w} × {item.h}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {many && (
                  <>
                    <span className="label tnum mr-2 hidden sm:inline">
                      {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      className={btn}
                      data-cursor="[PREVIOUS · ←]"
                      onClick={() => onIndex((index - 1 + items.length) % items.length)}
                    >
                      [ ← ]
                    </button>
                    <button
                      type="button"
                      className={btn}
                      data-cursor="[NEXT · →]"
                      onClick={() => onIndex((index + 1) % items.length)}
                    >
                      [ → ]
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => onIndex(null)}
                  data-cursor="[Close · Esc]"
                  className="border px-3 py-[7px] text-[10px] font-medium uppercase tracking-[0.16em]"
                  style={{ background: 'var(--c-ink)', color: 'var(--c-void)', borderColor: 'var(--c-ink)' }}
                >
                  [ CLOSE ✕ ]
                </button>
              </div>
            </div>
          </div>

          {/* STAGE */}
          <div className={`gutter flex min-h-0 flex-1 justify-center py-6 md:py-10 ${tall ? 'overflow-y-auto' : 'items-center'}`}>
            <motion.div
              key={item.src}
              className="relative"
              style={
                tall
                  ? { width: `min(100%, ${Math.min(item.w, 1200)}px)` }
                  : { width: `min(100%, calc((100vh - 170px) * ${item.w} / ${item.h}), ${item.w}px)` }
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border border-hair" style={tall ? undefined : { aspectRatio: `${item.w} / ${item.h}` }}>
                {item.kind === 'video' ? (
                  <video
                    key={item.src}
                    src={item.src}
                    poster={item.poster}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full bg-black object-contain"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.caption}
                    className={tall ? 'block h-auto w-full bg-white' : 'h-full w-full bg-white object-contain'}
                  />
                )}
              </div>
              {/* corner anchors, as on every frame */}
              {[
                { left: -4, top: -4 },
                { right: -4, top: -4 },
                { left: -4, bottom: -4 },
                { right: -4, bottom: -4 },
              ].map((pos, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute block size-2 border"
                  style={{ ...pos, background: 'var(--c-ink)', borderColor: 'var(--c-ink)' }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

/** Small helper: lightbox state for a list of items. */
export function useLightbox() {
  const [index, setIndex] = useState(null)
  return [index, setIndex]
}
