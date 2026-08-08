import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const STORAGE_KEY = 'empty-agency:theme'

/**
 * The two ground colours, duplicated here as literals because the radial
 * wipe circle has to be painted with the *incoming* theme's background
 * while the document still carries the outgoing one. Keep in sync with
 * `--c-void` / `--c-ink` in index.css.
 */
export const GROUND = {
  light: '#f4f4f2',
  dark: '#0a0a0a',
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  // The in-flight wipe: { to, x, y } — origin is the toggle's screen position.
  const [wipe, setWipe] = useState(null)
  const lockRef = useRef(false)

  const apply = useCallback((next) => {
    const root = document.documentElement
    root.classList.toggle('dark', next === 'dark')
    root.style.colorScheme = next
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', GROUND[next])
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode — theme simply won't persist */
    }
    setTheme(next)
  }, [])

  useEffect(() => {
    document.documentElement.style.colorScheme = theme
  }, [theme])

  /** Kick off the radial wipe. `origin` = { x, y } in viewport px. */
  const toggleTheme = useCallback(
    (origin) => {
      if (lockRef.current) return
      lockRef.current = true
      const to = theme === 'dark' ? 'light' : 'dark'
      setWipe({
        to,
        x: origin?.x ?? window.innerWidth - 56,
        y: origin?.y ?? 56,
      })
    },
    [theme]
  )

  /** Called by <ThemeWipe /> the instant the circle has covered the viewport. */
  const commitWipe = useCallback(() => {
    if (wipe) apply(wipe.to)
  }, [wipe, apply])

  /** Called once the overlay has been torn down. */
  const endWipe = useCallback(() => {
    setWipe(null)
    lockRef.current = false
  }, [])

  const value = useMemo(
    () => ({ theme, wipe, toggleTheme, commitWipe, endWipe, setTheme: apply }),
    [theme, wipe, toggleTheme, commitWipe, endWipe, apply]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
