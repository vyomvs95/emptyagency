import GridCanvas from './GridCanvas.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

/**
 * Global shell: fixed canvas → sticky header → routed view → footer.
 * Edge registration marks sit on top of everything at the corners.
 */
export default function Layout({ current, onNavigate, children }) {
  return (
    <div className="relative min-h-screen w-full">
      <GridCanvas />

      {/* Corner registration marks — the canvas boundary */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
        {[
          'left-3 top-3 border-l border-t',
          'right-3 top-3 border-r border-t',
          'left-3 bottom-3 border-b border-l',
          'right-3 bottom-3 border-b border-r',
        ].map((pos) => (
          <span key={pos} className={`absolute block size-3 border-hair ${pos}`} />
        ))}
      </div>

      <Header current={current} onNavigate={onNavigate} />

      <main className="relative z-10">{children}</main>

      <Footer />
    </div>
  )
}
