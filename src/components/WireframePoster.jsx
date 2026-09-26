/**
 * WIREFRAME POSTER
 * ----------------------------------------------------------------
 * The procedural placeholder that stands in for un-supplied media.
 * Everything is built from 1px borders + non-scaling SVG strokes, so
 * it stays hairline-crisp at any container size and inherits the
 * theme automatically.
 *
 * Variants: dashboard | app | mobile | flow | construction | type |
 *           palette | grid | video
 *
 * Swap it out simply by passing `src` to <Frame /> — this renders
 * only when there is no real asset.
 */

const stroke = { vectorEffect: 'non-scaling-stroke' }

function Box({ className = '', children, dashed = false }) {
  return (
    <div
      className={`border ${dashed ? 'border-dashed' : ''} border-hair-soft ${className}`}
    >
      {children}
    </div>
  )
}

function Bars({ n = 3, className = '' }) {
  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="h-px bg-hair-soft"
          style={{ width: `${92 - i * 17}%` }}
        />
      ))}
    </div>
  )
}

/* --------------------------- VARIANTS ---------------------------- */

function Dashboard() {
  return (
    <div className="flex h-full w-full flex-col gap-[2%] p-[3%]">
      <Box className="flex h-[10%] shrink-0 items-center justify-between px-[2%]">
        <div className="h-[6px] w-[12%] bg-hair-soft" />
        <div className="flex gap-[6px]">
          <div className="size-[6px] border border-hair-soft" />
          <div className="size-[6px] border border-hair-soft" />
          <div className="size-[6px] bg-hair-soft" />
        </div>
      </Box>
      <div className="flex min-h-0 flex-1 gap-[2%]">
        <Box className="hidden w-[16%] shrink-0 flex-col justify-start gap-[8px] p-[6%] sm:flex">
          <Bars n={5} />
        </Box>
        <div className="flex min-w-0 flex-1 flex-col gap-[2%]">
          <div className="flex h-[26%] gap-[2%]">
            {[0, 1, 2].map((i) => (
              <Box key={i} className="flex flex-1 flex-col justify-between p-[4%]">
                <div className="h-px w-[40%] bg-hair-soft" />
                <div className="h-[8px] w-[62%] bg-hair-soft opacity-60" />
              </Box>
            ))}
          </div>
          <Box className="relative min-h-0 flex-1 overflow-hidden">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              fill="none"
            >
              <polyline
                points="0,32 12,26 24,29 36,18 48,22 60,10 72,15 84,6 100,11"
                stroke="var(--c-accent)"
                strokeWidth="1"
                {...stroke}
              />
              <polyline
                points="0,37 12,34 24,35 36,30 48,33 60,27 72,30 84,24 100,27"
                stroke="var(--c-hair)"
                strokeWidth="1"
                strokeDasharray="3 3"
                {...stroke}
              />
              {[10, 20, 30].map((yy) => (
                <line
                  key={yy}
                  x1="0"
                  y1={yy}
                  x2="100"
                  y2={yy}
                  stroke="var(--c-hair-soft)"
                  strokeWidth="1"
                  {...stroke}
                />
              ))}
            </svg>
          </Box>
        </div>
      </div>
    </div>
  )
}

function AppShell() {
  return (
    <div className="flex h-full w-full gap-[2%] p-[3%]">
      <Box className="hidden w-[14%] shrink-0 flex-col gap-[10px] p-[5%] sm:flex">
        <div className="size-[8px] bg-hair-soft" />
        <Bars n={4} />
      </Box>
      <div className="flex min-w-0 flex-1 flex-col gap-[2%]">
        <Box className="flex h-[12%] items-center px-[2%]">
          <div className="h-px w-[26%] bg-hair-soft" />
        </Box>
        <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-[2%]">
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} className="flex flex-col justify-end p-[6%]" dashed={i % 3 === 2}>
              <Bars n={2} />
            </Box>
          ))}
        </div>
      </div>
    </div>
  )
}

function Mobile() {
  return (
    <div className="flex h-full w-full items-center justify-center p-[4%]">
      <div className="flex h-full w-[30%] min-w-[86px] flex-col gap-[6px] border border-hair-soft p-[4%]">
        <div className="mx-auto h-[3px] w-[30%] bg-hair-soft" />
        <div className="h-[14%] border border-hair-soft" />
        <div className="flex-1 space-y-[6px] py-[6px]">
          <div className="h-px w-full bg-hair-soft" />
          <div className="h-px w-[72%] bg-hair-soft" />
          <div className="h-px w-[84%] bg-hair-soft" />
        </div>
        <div className="h-[10%] border border-hair-soft" style={{ borderColor: 'var(--c-accent)' }} />
      </div>
    </div>
  )
}

function Flow() {
  return (
    <div className="relative flex h-full w-full items-center justify-between px-[6%]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
      >
        <line
          x1="6"
          y1="25"
          x2="94"
          y2="25"
          stroke="var(--c-hair-soft)"
          strokeWidth="1"
          strokeDasharray="4 4"
          {...stroke}
        />
      </svg>
      {['01', '02', '03', '04'].map((n, i) => (
        <div
          key={n}
          className="relative z-10 flex aspect-[4/3] h-[42%] items-center justify-center border bg-void"
          style={{ borderColor: i === 3 ? 'var(--c-accent)' : 'var(--c-hair-soft)' }}
        >
          <span className="label" style={{ color: i === 3 ? 'var(--c-accent)' : undefined }}>
            {n}
          </span>
        </div>
      ))}
    </div>
  )
}

function Construction() {
  return (
    <div className="flex h-full w-full items-center justify-center p-[4%]">
      <div className="relative aspect-square h-full max-h-full">
        <svg className="h-full w-full" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" stroke="var(--c-hair-soft)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="40" stroke="var(--c-hair-soft)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="26" stroke="var(--c-hair)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="13" stroke="var(--c-accent)" strokeWidth="0.75" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="var(--c-hair-soft)" strokeWidth="0.5" />
          <path d="M21.7 21.7 L78.3 78.3 M78.3 21.7 L21.7 78.3" stroke="var(--c-hair-soft)" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M50 24 L72 63 L28 63 Z" stroke="var(--c-ink)" strokeWidth="0.9" />
        </svg>
      </div>
    </div>
  )
}

function TypeSpecimen() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
      >
        {[14, 22, 34, 40].map((yy, i) => (
          <line
            key={yy}
            x1="0"
            y1={yy}
            x2="100"
            y2={yy}
            stroke={i === 2 ? 'var(--c-accent)' : 'var(--c-hair-soft)'}
            strokeWidth="1"
            strokeDasharray={i === 2 ? undefined : '4 4'}
            {...stroke}
          />
        ))}
      </svg>
      <span className="relative select-none text-[clamp(48px,18vw,150px)] font-medium leading-none tracking-[-0.05em]">
        Aa
      </span>
      <span className="label absolute bottom-[6%] left-[4%]">X-HEIGHT // BASELINE // CAP</span>
    </div>
  )
}

function Palette() {
  const swatches = ['0B0B0B', '3D3D3D', '757575', 'B4B4B0', 'E6E6E2', '0091FF']
  return (
    <div className="flex h-full w-full gap-px p-[3%]">
      {swatches.map((hex, i) => (
        <div key={hex} className="flex flex-1 flex-col border border-hair-soft">
          <div
            className="flex-1"
            style={{ background: i === 5 ? 'var(--c-accent)' : `#${hex}`, opacity: i === 4 ? 0.5 : 1 }}
          />
          <div className="label hidden truncate px-[6px] py-[4px] sm:block">#{hex}</div>
        </div>
      ))}
    </div>
  )
}

function BaselineGrid() {
  return (
    <div className="relative h-full w-full p-[4%]">
      <div className="flex h-full w-full gap-[4px]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-x border-hair-soft"
            style={{ background: i % 2 ? 'transparent' : 'var(--c-hair-soft)', opacity: i % 2 ? 1 : 0.35 }}
          />
        ))}
      </div>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
      >
        {[10, 20, 30, 40].map((yy) => (
          <line key={yy} x1="0" y1={yy} x2="100" y2={yy} stroke="var(--c-hair-soft)" strokeWidth="1" {...stroke} />
        ))}
      </svg>
      <span className="label absolute bottom-[4%] left-[4%]">12_COL // 8PT_BASELINE</span>
    </div>
  )
}

function VideoPlate() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
      >
        <line x1="0" y1="0" x2="100" y2="50" stroke="var(--c-hair-soft)" strokeWidth="1" {...stroke} />
        <line x1="100" y1="0" x2="0" y2="50" stroke="var(--c-hair-soft)" strokeWidth="1" {...stroke} />
      </svg>
      <div className="relative flex items-center gap-3 border border-hair bg-void px-4 py-2">
        <svg width="9" height="11" viewBox="0 0 9 11" fill="var(--c-ink)">
          <path d="M0 0 L9 5.5 L0 11 Z" />
        </svg>
        <span className="label label-ink">HOVER TO PLAY</span>
      </div>
    </div>
  )
}

/**
 * SCAFFOLD — the overlay laid over real artwork.
 * Deliberately structural and text-free: thirds, diagonals, a centre
 * registration target and corner ticks. It reads as construction lines
 * drawn over the work, which is the point — we show the bones first.
 */
function Scaffold() {
  return (
    <div className="relative h-full w-full">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* rule of thirds */}
        {[33.33, 66.66].map((xx) => (
          <line key={xx} x1={xx} y1="0" x2={xx} y2="50" stroke="var(--c-hair)" strokeWidth="1" strokeDasharray="3 3" {...stroke} />
        ))}
        {[16.66, 33.33].map((yy) => (
          <line key={yy} x1="0" y1={yy} x2="100" y2={yy} stroke="var(--c-hair)" strokeWidth="1" strokeDasharray="3 3" {...stroke} />
        ))}
        {/* construction diagonals */}
        <line x1="0" y1="0" x2="100" y2="50" stroke="var(--c-hair)" strokeWidth="1" {...stroke} />
        <line x1="100" y1="0" x2="0" y2="50" stroke="var(--c-hair)" strokeWidth="1" {...stroke} />
      </svg>

      {/* centre registration target — its own square svg so it stays round */}
      <div className="absolute inset-0 grid place-items-center">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="19" cy="19" r="18" stroke="var(--c-hair)" strokeWidth="1" />
          <circle cx="19" cy="19" r="2" fill="var(--c-hair)" />
          <path d="M19 1 V11 M19 27 V37 M1 19 H11 M27 19 H37" stroke="var(--c-hair)" strokeWidth="1" />
        </svg>
      </div>

      {/* corner ticks */}
      {[
        'left-2 top-2 border-l border-t',
        'right-2 top-2 border-r border-t',
        'left-2 bottom-2 border-b border-l',
        'right-2 bottom-2 border-b border-r',
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute block size-[10px] ${pos}`}
          style={{ borderColor: 'var(--c-hair)' }}
        />
      ))}
    </div>
  )
}

const VARIANTS = {
  scaffold: Scaffold,
  dashboard: Dashboard,
  app: AppShell,
  mobile: Mobile,
  flow: Flow,
  construction: Construction,
  type: TypeSpecimen,
  palette: Palette,
  grid: BaselineGrid,
  video: VideoPlate,
}

export default function WireframePoster({ variant = 'dashboard', className = '' }) {
  const Variant = VARIANTS[variant] || Dashboard
  return (
    <div className={`relative h-full w-full select-none overflow-hidden ${className}`}>
      {/* Full-bleed crosshair — the "no asset bound" mark */}
      {variant !== 'video' && variant !== 'scaffold' && (
        <svg
          className="absolute inset-0 h-full w-full opacity-45"
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          fill="none"
        >
          <line x1="0" y1="0" x2="100" y2="50" stroke="var(--c-hair-soft)" strokeWidth="1" {...stroke} />
          <line x1="100" y1="0" x2="0" y2="50" stroke="var(--c-hair-soft)" strokeWidth="1" {...stroke} />
        </svg>
      )}
      <Variant />
    </div>
  )
}
