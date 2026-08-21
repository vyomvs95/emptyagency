# empty agency

Brutalist-minimal portfolio SPA for a UI/UX + 3D motion studio.
React 19 · Framer Motion 12 · Tailwind CSS 4 · Vite.

```bash
npm install
npm run dev      # http://localhost:5173/mockup/  — the SPA alone
npm run build    # produces the full dist/ tree (holding page + mockup)
npm run preview  # http://localhost:4173/         — the deployed tree, exactly
```

> Node 20+ required.

---

## Deployed shape — holding page at `/`, work-in-progress at `/mockup`

The domain is live but the site is not finished, so `emptyagency.com` serves a
standalone **holding page** and the real build is parked one level down:

| URL | Serves |
|---|---|
| `emptyagency.com` | `construction/index.html` — under-construction page |
| `emptyagency.com/mockup` | this SPA, the full work-in-progress site |

```
dist/
├─ index.html      ← construction/index.html
├─ robots.txt      ← disallows /mockup
├─ sitemap.xml     ← lists / only
└─ mockup/
   ├─ index.html   ← the SPA
   └─ assets/…
```

**The holding page** (`construction/index.html`) is one hand-written file with
zero dependencies — no React, no Tailwind, no build step. It re-declares the
design tokens verbatim from `src/index.css` and reimplements the magnetic mark,
the Figma cursor, the dot-matrix canvas and the terminal read-out in ~200 lines
of vanilla JS, so the two pages read as one system. It shares the
`empty-agency:theme` localStorage key with the SPA, so a theme chosen on either
side carries across.

Edit it directly and open it in a browser — there is nothing to compile. It is
copied verbatim into `dist/` by `scripts/dist.mjs shell`.

**Why `/mockup` needs no server config.** `vite.config.js` sets
`base: '/mockup/'` and `outDir: 'dist/mockup'`, so every asset URL is absolute
under `/mockup/`. Routing inside the SPA is hash-based (`/mockup/#/archive`),
which means every URL on the site is a plain static file lookup — no SPA
rewrite rule, no catch-all, on any host.

**`/mockup` is unlisted, not private.** Anyone with the URL can open it; it is
kept out of search by `robots.txt` *and* an `X-Robots-Tag: noindex` header from
`vercel.json` (robots.txt alone stops crawling, not indexing of a URL someone
links to). Do not put a link to it on the holding page.

### Going live with the real site

Move the SPA back to the root when the work is ready:

1. `vite.config.js` — drop `base` and set `outDir: 'dist'`
2. `package.json` — `"build": "vite build"`
3. delete `construction/`, `scripts/dist.mjs`, and the `/mockup` header blocks
   in `vercel.json`
4. add `{"source": "/(.*)", "destination": "/index.html"}` under `rewrites`
   only if you also move off hash routing

### Deploying (Vercel)

The repo is wired for it — `vercel.json` declares the build command and output
directory, so a push to `main` is the whole deploy:

```bash
git push origin main
```

For the first deploy, in the Vercel dashboard: **New Project → import
`vyomvs95/emptyagency`**. Framework preset *Vite*, and leave build settings
alone — `vercel.json` overrides them. Then **Settings → Domains → add
`emptyagency.com` and `www.emptyagency.com`**, and point GoDaddy at what Vercel
shows there:

| Record | Host | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

DNS changes take anywhere from minutes to a few hours to propagate.

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

**Logo loader** — `LogoLoader.jsx`. Built from the mark itself, in four
beats over ~2.8s:

1. **ORBIT** — the void breaks off and travels around its dashed magnetic
   field ring three full times. Same field the header logo uses on hover,
   here completed as a full orbit.
2. **GATHER** — the ring collapses and the mark falls back to centre.
3. **COVER** — it expands from 14px until it swallows the viewport.
4. **REVEAL** — the black turns white, then dissolves off a blurred page
   that sharpens into focus.

The blur is a `backdrop-filter` on the **loader overlay**, never on the
page tree. When the loader unmounts, the filter leaves with it — so no
residual `blur(0px)` is left behind to soften the 1px hairlines.

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

**The poster plate** — `PosterImage.jsx` + `.poster-plate` /
`.poster-screen` in `index.css`. Flat `grayscale(1)` on a photograph reads
muddy and sits apart from the rest of the canvas, so the rest state is
instead:

- high-contrast monochrome — `grayscale(1) contrast(1.38) brightness(1.06)`
- a **dot-matrix screen** at 4px, punched in the page's own ground colour,
  at the same rhythm as the background grid
- a hairline inner edge seating the plate inside its frame

The effect is artwork *printed onto* the canvas rather than dropped on top
of it. On hover the screen clears and full colour returns over 600ms —
driven by the `group` class `<Frame />` puts on the bounding box, so it
needs no extra state. Chrome sits outside the filter, so the accent
progress bar never desaturates.

Poster resolution order: an explicit `image`/`src`, else the YouTube still
(`maxresdefault` → `hqdefault` on error), and only with no still at all
does it fall back to the abstract `WireframePoster` plate.

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

> ### ⚠ NONE of the current media is empty agency's work
>
> All 18 slots — every video **and** every still — are third-party design
> reels, used so the first cut reads as a real portfolio. Every one is
> marked `placeholder: true`, which prints **PLACEHOLDER © CREATOR** in
> the frame's technical label. Do not remove those markers while the
> borrowed work is still in place — they are what keeps the demo honest,
> and they are the only thing distinguishing it from a false claim.

To go live with real work: replace `youtube:`/`src:` with a file in
`public/media/`, and drop `placeholder`/`credit`. No component changes.
Export video as H.264 `.mp4` — Google Drive links will not work as
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
