import Frame from './Frame.jsx'
import WireframePoster from './WireframePoster.jsx'
import PosterImage from './PosterImage.jsx'

/**
 * STILL FRAME
 * ----------------------------------------------------------------
 * Image counterpart to <KineticPlayer />. Drop a real file in via
 * `src` and it renders the monochrome poster plate; leave it null and
 * the procedural wireframe stands in.
 *
 * `placeholder` / `credit` fold attribution into the technical label
 * rather than laying chips over the artwork — same contract as
 * <KineticPlayer />, so borrowed work is always marked as borrowed.
 */
export default function StillFrame({
  src,
  fallback,
  alt = '',
  label,
  meta,
  dims,
  ratio = '16 / 9',
  variant = 'dashboard',
  zoom = true,
  placeholder = false,
  credit,
  className = '',
  cursor = '[View Project]',
  onClick,
}) {
  const metaNode = placeholder ? (
    <>
      {meta}
      <span style={{ color: 'var(--c-signal)' }}> // PLACEHOLDER</span>
      {credit && <span> © {credit}</span>}
    </>
  ) : (
    meta
  )

  return (
    <Frame
      label={label}
      meta={metaNode}
      dims={dims}
      ratio={ratio}
      zoom={zoom}
      cursor={cursor}
      onClick={onClick}
      className={className}
      boxClassName="bg-void"
    >
      {src ? (
        <PosterImage
          src={src}
          alt={alt}
          // e.g. a YouTube upload with no maxres still: drop to hqdefault once.
          onError={
            fallback
              ? (e) => {
                  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
                }
              : undefined
          }
        />
      ) : (
        <WireframePoster variant={variant} />
      )}
    </Frame>
  )
}
