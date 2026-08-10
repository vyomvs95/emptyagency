# empty agency

Brutalist-minimal portfolio SPA for a UI/UX + 3D motion studio.
React 19 · Framer Motion 12 · Tailwind CSS 4 · Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

> Node 20+ required. This machine had no Node installed at build time —
> install it (nodejs.org, `nvm install --lts`, or `brew install node`)
> before the first `npm install`.

---

## Architecture

```
src/
├─ App.jsx                    boot gate · hash router · page transitions
├─ index.css                  design tokens, base layer, utilities, keyframes
├─ context/ThemeContext.jsx   theme state + the wipe state machine
├─ lib/
│  ├─ media.js                ← EVERY asset URL lives here. Only swap point.
│  ├─ youtube.js              shared IFrame API loader + player params
│  └─ site.js                 routes, 15 projects, pillars, pipeline, copy
├─ components/
│  ├─ Cursor.jsx              Figma arrow + plain-English [label] tag
│  ├─ LogoLoader.jsx          logo-built loader that docks into the header
│  ├─ GridCanvas.jsx          fixed dot matrix + 12-col layout grid
│  ├─ Frame.jsx               THE BOUNDING BOX (1px border + 4 anchor points)
│  ├─ KineticPlayer.jsx       hover-to-play video + 1px progress bar
│  ├─ StillFrame.jsx          image counterpart to KineticPlayer
│  ├─ WireframePoster.jsx     procedural placeholders (9 variants)
│  ├─ MagneticLogo.jsx        ● pulled toward the cursor on a spring
│  ├─ ThemeToggle.jsx         sun / moon switch
│  ├─ ThemeWipe.jsx           radial circle wipe between themes
│  ├─ Header.jsx  Footer.jsx  Layout.jsx  Marquee.jsx  Reveal.jsx  Section.jsx
└─ pages/
   Index · Archive · Capabilities · Vision · Initiate
```

## Design system

| Token | Light | Dark | Use |
|---|---|---|---|
| `--c-void` | `#f4f4f2` | `#0a0a0a` | page ground |
| `--c-ink` | `#0b0b0b` | `#f2f2f0` | type, solid marks |
| `--c-hair` | 28% ink | 26% ink | 1px structural borders |
| `--c-hair-soft` | 14% ink | 12% ink | secondary rules |
| `--c-grid` | 16% ink | 14% ink | canvas dot matrix |
| `--c-accent` | `#0091ff` | `#21c7ff` | cursor, selection, progress |
| `--c-signal` | `#ff3b30` | `#ff5449` | REC dot, form errors |

Tokens are runtime CSS variables exposed to Tailwind through `@theme inline`,
so `bg-void` / `text-ink` / `border-hair` flip with the theme in a single
repaint — there is not a single `dark:` variant in the app.

Type is **Space Grotesk** throughout. All structural UI is uppercase with
`0.14–0.18em` tracking (`.label`); the logo and body copy stay lowercase.

## The interactions

**Logo loader** — `LogoLoader.jsx`. Built from the mark itself over
~1.9s: the void scales in on a spring while crosshair guides and the
dashed magnetic field draw around it, the wordmark unfurls from
tracked-out to set, then the whole cluster flies to the measured
coordinates of the header logo and shrinks to its 13px size. The loader
hands off to the real mark rather than cutting to it. The dock target is
recomputed from the live gutter and header height, so it stays
registered at every breakpoint.

**Figma cursor** — `Cursor.jsx`. Two springs: the arrow is stiff
(`stiffness 900 / damping 45`), the `[Client]` tag is loose
(`240 / 26`) so it swings in behind the point. Any element can rename the
tag by declaring `data-cursor="[LABEL]"` — detection is by hit-test on
move, so nothing needs wiring through context. Auto-disables on coarse
pointers, where the OS cursor is restored.

**Magnetic logo** — `MagneticLogo.jsx`. Inside a 130px field the mark
travels `0.42 ×` the pointer delta with a centre-weighted falloff, on a
low-damping spring so it overshoots and settles. A dashed ghost outline
marks the home position it detached from.

**Radial theme wipe** — `ThemeWipe.jsx` + `ThemeContext.jsx`. A 13px
circle (the logo's exact size) painted in the **incoming** theme's ground
colour drops from above the viewport, then scales to cover the furthest
corner. `onAnimationComplete` flips the `.dark` class *underneath* the
circle and the overlay is torn down two frames later. Nothing cross-fades;
the swap happens while fully occluded.

**Bounding boxes** — `Frame.jsx`. 1px border, four 8×8 anchor points dead
on the corners, technical label above, Figma-style dimension chip below on
hover. The box itself never moves: only the media inside it scales 1.05×,
clipped by the frame.

**Hover-to-play video** — `KineticPlayer.jsx`. Two interchangeable
engines behind one identical set of chrome: a native `<video>` (`src`,
the production path) and a YouTube IFrame API embed (`youtube`, the
placeholder path). Both report `{playing, current, duration}` upward, so
the poster, REC chip, timecode and 1px progress bar are engine-agnostic.
Muted / loop / playsInline, a static wireframe poster that lifts on first
play, pauses on mouse-leave holding the frame. `play()` rejections
(autoplay policy) are swallowed — the box just stays inert.

YouTube specifics: players are **lazily built** by an IntersectionObserver
with a 300px margin, because a page holds ten of them and mounting ten
iframes on load would cost megabytes and stall the main thread. Hovering
overrides the observer. Progress polls at 200ms *only while playing*. The
iframe is `pointer-events: none` with `controls=0`, so YouTube's own
chrome never appears and our overlay owns all hover behaviour. `.yt-cover`
uses container query units to crop the always-16:9 embed to fill any frame
ratio, with a plain `100%` fallback.

**Black and white until hover** — media renders `grayscale(1)` at rest and
returns to full colour on hover, driven by a `group` class on the frame so
it needs no extra state. The chrome sits outside that filter, so the accent
progress bar never desaturates. Wireframe posters are exempt — they are
already monochrome by design.

**Page transitions** — `App.jsx`. `AnimatePresence mode="wait"` with an
opacity/blur/lift, plus an accent scan line that sweeps the viewport on
every route change. Routing is hash-based (`#/archive`), so deep links and
the back button work without a router dependency.

## Dropping in real media

Everything routes through `src/lib/media.js`. Three source kinds:

| Field on the project | Renders as |
|---|---|
| `youtube: 'VIDEO_ID'` | IFrame API embed — the **placeholder** path |
| `src: '/media/x.mp4'` | native `<video>` — the **production** path |
| `src: null` (images) | procedural wireframe poster |

> ### ⚠ The kinetic and identity reels are NOT empty agency's work
>
> They are third-party showreels on YouTube, used so the first cut reads
> as a real portfolio. Every one is marked `placeholder: true`, which
> renders a red **PLACEHOLDER** chip and a **© CREATOR** credit on the
> frame. Do not remove those chips while the borrowed footage is still in
> place — they are what keeps the demo honest.

To go live with real work: replace `youtube:` with `src:` pointing at a
file in `public/media/`, and drop `placeholder`/`credit`. No component
changes. Export as H.264 `.mp4` — Google Drive links will not work as
`<video>` sources (wrong content type, and it throttles).

Per-project metadata (names, clients, dimensions, categories) lives in
`src/lib/site.js`.

## Theme

The site always opens in **light mode**. The OS `prefers-color-scheme` is
deliberately ignored — dark is opt-in, and only a previous explicit choice
by that visitor carries over (`localStorage: empty-agency:theme`).

## Wiring the contact form

`src/pages/Initiate.jsx` — replace the marked `TODO` in `submit()` with
your POST. Validation, error states, and the
`IDLE → TRANSMITTING… → TRANSMISSION_COMPLETE` machine are already built.

## Accessibility notes

- The custom cursor only takes over on `(pointer: fine)`; touch and
  keyboard users keep the native pointer and a visible `:focus-visible`
  outline.
- `prefers-reduced-motion` stops the marquee, the blinking carets, and
  smooth scrolling.
- Video is decorative: muted, looped, never autoplaying with sound.
