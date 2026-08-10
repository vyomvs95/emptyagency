import Frame from './Frame.jsx'
import WireframePoster from './WireframePoster.jsx'

/**
 * STILL FRAME
 * ----------------------------------------------------------------
 * Image counterpart to <KineticPlayer />. Drop a real file in via
 * `src` and it renders an <img>; leave it null and the procedural
 * wireframe poster stands in. Nothing else changes.
 */
export default function StillFrame({
  src,
  alt = '',
  label,
  meta,
  dims,
  ratio = '16 / 9',
  variant = 'dashboard',
  zoom = true,
  className = '',
  cursor = '[View Project]',
  onClick,
}) {
  return (
    <Frame
      label={label}
      meta={meta}
      dims={dims}
      ratio={ratio}
      zoom={zoom}
      cursor={cursor}
      onClick={onClick}
      className={className}
      boxClassName="bg-void"
    >
      {src ? (
        // Black and white at rest, full colour on hover. Wireframe
        // posters are exempt — they are already monochrome by design.
        <img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover grayscale transition-[filter] duration-[600ms] ease-out group-hover:grayscale-0"
        />
      ) : (
        <WireframePoster variant={variant} />
      )}
    </Frame>
  )
}
