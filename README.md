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
│  └─ site.js                 routes, 15 projects, pillars, pipeline, copy
├─ components/
│  ├─ Cursor.jsx              Figma multiplayer arrow + [Client] tag
│  ├─ BootSequence.jsx        1.5s terminal cold-start → flash
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

**Boot sequence** — `BootSequence.jsx`. Deterministic 1.5s schedule, four
read-out lines, a load bar, then a single-frame white flash on exit.

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

**Hover-to-play video** — `KineticPlayer.jsx`. Muted / loop / playsInline,
sits on a static wireframe poster that lifts on first play, pauses on
mouse-leave holding the frame, and drives a 1px accent progress bar welded
to the bottom edge with quarter tick marks. `play()` rejections (autoplay
policy) are swallowed — the box just stays inert.

**Page transitions** — `App.jsx`. `AnimatePresence mode="wait"` with an
opacity/blur/lift, plus an accent scan line that sweeps the viewport on
every route change. Routing is hash-based (`#/archive`), so deep links and
the back button work without a router dependency.

## Dropping in real media

Everything routes through `src/lib/media.js`:

```js
export const VIDEO = { showreel: '/media/showreel.mp4', … }
export const IMAGE = { fintechDash: '/media/fintech-dash.jpg', … }
```

Put files in `public/media/`. Video placeholders currently point at
Google's public HTML5 test clips. Image entries are `null` on purpose —
`<StillFrame />` renders a procedural wireframe poster whenever `src` is
missing, so the grid never shows a broken box. Set a path and the `<img>`
takes over with no other change.

Per-project metadata (names, clients, dimensions, categories) lives in
`src/lib/site.js`.

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
