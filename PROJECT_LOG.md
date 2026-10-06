# empty agency — project log

Read this first when picking the site back up. README.md explains how the
code works; this file records **where the work stands, what was decided,
and what is still open.** Newest session at the top.

---

## Current state — 6 Oct 2026

| | |
|---|---|
| Live domain | `www.emptyagency.com` → **under-construction page** (`construction/index.html`) |
| Work in progress | `www.emptyagency.com/mockup` → the full React site, **deployed for review** |
| Last deployed commit | `836f5b4` — 6 Oct: case audit |
| Deploy | `git push origin main` → Vercel auto-deploys in ~1 min. No Vercel CLI needed. Push with `GIT_SSH_COMMAND="ssh -o BatchMode=yes"` — a plain push once hung for 7 min at SSH. |
| Repo | `github.com/vyomvs95/emptyagency` (SSH) |
| Stack | React 19 · JavaScript (JSX, not TypeScript) · Tailwind 4 · Framer Motion · Vite |

**Pushing rule:** the owner reviews everything on `/mockup`. Ask before each push. `/`
stays the holding page until they say "go live" (steps in README → *Going live*).

---

## The concept — do not change

The **greyscale wireframe rest state** (monochrome plate, dot screen, scaffold lines,
colour on hover) is the owner's personal identity and the story behind the studio.
It stays, even as the studio grows. Improve *within* it; never suggest dropping it.
Touch devices show full colour (no hover exists there); desktop keeps the reveal.
White theme is the default on load; black is a toggle.

**Ownership:** the owner (Vyom Shah) owns empty agency outright. World Style is a
partner for bringing in projects, not a co-owner.

**Portfolio plan:** a living set — each new project gets a full case study (brief,
process, real outcome/quote where the client allows) and weaker older pieces are retired.

---

## What the site is now

- **Positioning:** "We clear the clutter. You get the results." — a **UI/UX and 3D design
  studio**, then film, motion and graphics. **Priority UI/UX → 3D → film/motion/graphics**
  is applied everywhere (`PRIORITY` + `RANK` in `site.js`).
- **Nav:** Home · Work · Services · About Us (Vision — **copy is the owner's, never
  rewrite**) · Start a Project. Cursor tags still show the technical names (`tech` fields).
- **Home, in order:** headline + buttons (**Who we are — our vision** (primary) → About Us ·
  See our work) → **ELF × Tamannaah master film** as hero piece (celebrity work
  first, on purpose) → marquee → Selected work (Mswipe, enQuest, All Hub, Real estate,
  Product films, Sony) → Services → Industries (each links to its projects) → Brands
  (15 names) → FAQ → "Let's talk".
- **Work:** **35 cards** in 5 buckets — UI/UX 7 · 3D & CGI 9 · Film 10 · Motion 4 ·
  Graphics 5 — in an even 4:3 grid that reads left to right in priority order. A card
  opens the project panel (`#/archive/<slug>`); case studies open as long-form pages,
  **folders** (Mswipe, V2P) list chapters. 3D has no folders — each product film is its own card. The panel opens **under the main nav**,
  which stays usable; a nav click closes the project.
- **Contact:** `marketing@emptyagency.com` is the **only** inbox (footer shows only that —
  socials removed). Form sends through **FormSubmit**.
- **Rights notice:** 3 short sentences, no personal/agency names ("in association with
  World Style"), shown **once per page — footer only**. Card credit lines still carry names
  (`DESIGN: UMAR KHAN / WORLD STYLE`, `UI/UX DESIGN: VYOM SHAH`, `VIA ONE DIGITAL
  ENTERTAINMENT`) — owner has been asked whether to change them too; no answer yet.
- **Background:** light dot matrix only (no column lines, no horizon rule).

### UI/UX case studies (added 28 Sep)

Fourteen case studies from three Figma files — **"Vyom Shah"** (12 pages),
**"Vyoms UI Design"** (enQuest HR) and **"V2 - V2P"** (V2P version 2), all credited
`UI/UX DESIGN: VYOM SHAH`. The team folder's third file, "VS", is an older copy of
the HR screens and adds nothing new.

On Our Work they show as **7 cards**. A client with several products is one
**folder** card, and its panel lists chapters, each a full case study:
- **Mswipe** folder (7): merchant onboarding · POS merchant app · scratch-card rewards ·
  business loan · UTap portal & terminal app (Etisalat UTap is Mswipe's UAE partnership) ·
  website India & UAE · emailers
- **V2P** folder (2): V2P 2.0 (onboarding, invoices, payments, GST) · vendor portal v1
- Singles: Connectify · enQuest HRMS · Invest (SIP app) · fuel-card field app · OTT app

- Text is in `src/lib/case-studies.js` (`CASE_STUDIES` + `FOLDERS`) and describes only
  what the screens show — no metrics, dates or outcomes.
- Clients are named only where the brand is on the screens (Mswipe, Etisalat UTap,
  Connectify, V2P, enQuest ERP). The loan app is in the Mswipe folder because its
  screens say "Ease your repayments with Mswipe".
- **How the images were made:** each Figma section was selected in Chrome and copied
  with *Copy as PNG* (⇧⌘C), saved from the clipboard, split into screens by detecting
  frame edges or transparent gaps, composed into strips, grids and covers, and saved
  as WebP (~10 MB total). The helper scripts were throwaway.

### Where the work came from

The pieces were made by the core team, including **Umar Khan, owner of World
Style**, who is associated with the studio and has worked through agencies such
as **One Digital Entertainment** (e.g. for Sony). The owner approved showing it,
**on the condition that it's credited and that ownership is disclaimed.**

| Source (public Google Drive folders) | ID |
|---|---|
| portfolio Umar Khan (Faraz), includes `3d/` | `1enusW9ZSfnm0vcSQUQAGY9Q1Y_Leei0m` |
| SONY (Prime Video thumbnails) | `1jKgDPoUJOmB8So9Xb6XP6MH6qdLHuZqa` |
| Mohammad Umar Khan Portfolio (client folders + curated `Portfolio/`) | `1Ao1ILil78Bl0ueY_mtNleUuo3UkbM5Ye` |
| Mohd Umar Khan (logos, song posters, stories, thumbnails) | `1kshaoql_KKuu65tXUbCCA35mKUErmsl7` |
| **ELF Tamannah 2026** (hero: master + 104 cut-downs) | `1YuSQ-VGAXmZLYj9n7ShY2JhVnOzXry4_` |
| Video Edits (34 event / wedding / showreel films) | `17J9VW98-d-dN9Wd_siJgy8DV5038VAny` |

Plus **18 YouTube videos**, kept as ids in `YT` in `src/lib/media.js`: Osho Jain ×10,
TMC ×3, Adil Hussaini ×2, Event Soul ×2, Pasandida Ladies ×1.

---

## Open items — pick up here

### 1. Ten films never downloaded (Drive "Quota exceeded")
The ELF master landed on 29 Sep and is now the home hero. The ten below are still
missing; the quota had lifted by then, so they can likely be fetched now.

Google blocked further downloads of these on 26 Sep. The quota usually resets
within 24 h. **Their places already exist in `site.js`.** Each one appears
automatically once its file is in `public/media/films/` and `films.js` is
regenerated. Until then they're hidden and nothing looks broken.

| Slug | Drive file | Drive id | Size | Encode as |
|---|---|---|---|---|
| `s-b-trailer` | S & B Trailer.mp4 | `1Oe4c6Ww61y5HCqzZCkFjYttyowz2nwpa` | 372 MB | excerpt |
| `showreel-final-without-logo` | Showreel Final WithOut Logo.mp4 | `1CCWk1YzojB6dr5ksGiBVxsyvhKEWMT_6` | 237 MB | excerpt |
| `st-live-kolkata-morning-show-v1` | ST Live Kolkata Morning show V1.mp4 | `1bYZxmUf77swDGnSUlPPF0sGR3bJzWK3G` | 195 MB | excerpt |
| `st-live-rajkot` | ST live rajkot.MP4 | `13CLgtKZDdA4bxbSEWvxdDQGC69KHO7x2` | 299 MB | excerpt |
| `st-live-udaipur-v1` | ST Live Udaipur V1.mp4 | `1vZwFQ3A6DsKR12-JRRQ_RCeQkAJA0EKb` | 251 MB | excerpt |
| `suleiman-showreell` | Suleiman Showreell.mp4 | `1nKTMLU3gagvuKCQUrZGurQ6VoJZMklkc` | 187 MB | excerpt |
| `toshib-and-sharib` | Toshib and Sharib.mp4 | `1No4uWse6sYowsDWNUa403V9cS79A96M-` | 193 MB | excerpt |
| `vaishnavi-nimay-final` | Vaishnavi & Nimay Final.mp4 | `1Y1WI3LgDQfwmksCJI_Ym9HXX8XrCBJ6F` | 236 MB | excerpt |
| `vaishnavi-wow-final` | Vaishnavi Wow Final.mp4 | `1InObeOCjePYm3BeTCl4x8IbYFIb-216S` | 207 MB | excerpt |
| `vipul-corp-showreel-final` | Vipul corp Showreel Final.mp4 | `1Tp0ANUX0L1Omqo0csHImbfWl_0xTYNlM` | 177 MB | excerpt |

```bash
# per file — download to disk with curl (Drive rejects ffmpeg streaming)
curl -fL -o /tmp/in.mp4 "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t"
file /tmp/in.mp4        # must say "ISO Media" — a 2 KB HTML file means the quota is still hit
scripts/media/encode-film.sh /tmp/in.mp4 <slug> excerpt     # or "full" for the ELF master
python3 scripts/media/gen-films.py                          # re-registers every film
npm run build
```
When the master lands, the hero switches to it by itself (it's first in the
ELF project). After that, put the "watch the full film" wording back on the hero
button in `src/pages/Index.jsx`, which currently says *See the whole campaign*.

### 2. Waiting on the owner
- [ ] **3D work — confirm credits and clients:** who made the 3D films (credited
      `EMPTY AGENCY CORE TEAM` for now), whether AMFICO, Stuffcool, EUME, Clear X, LUCA,
      Protectli, Cougar and Romaa Majestic can be named, and the brand behind Clear X.
- [ ] **UI/UX case studies — confirm before go-live:** that every piece may be shown
      publicly (several are for Mswipe / Etisalat UTap and may be under NDA); the
      client names; whether the "undisclosed" ones can be named; and any results
      worth adding (launch dates, numbers).
- [ ] **Activate the enquiry form.** After a real submission from the live site, click
      the "Activate form" email FormSubmit sends to marketing@emptyagency.com.
      No enquiries are delivered until this is done.
- [ ] **Real names for the video credits.** They currently say `EMPTY AGENCY CORE TEAM`.
- [ ] **Check the project descriptions and "What we did" lines.** They're inferred
      from the footage and file names.
- [ ] **Confirm the 3D tool.** The What We Do tools list names Blender, but I found
      no evidence of it.
- [ ] **Unknown artists** on the *Rangreza* and *Diamond* covers.
- [ ] **Have a lawyer read the shortened `RIGHTS_NOTICE`** before going live on the main domain.
- [ ] **Optional:** upload the long films (unlisted) to the studio's own YouTube or
      Vimeo, so full versions can replace the ~45 s excerpts.

### 3. Known gaps
- Film, motion and graphics projects are galleries, not case studies — their source
  folders hold only finished pieces. Owner to send a few lines of brief/role for the key
  ones (ELF, Sony, Osho Jain, TMC) to turn them into case studies. Don't invent them.
- Nothing shows outcomes, testimonials or a team yet — the biggest credibility gap vs
  established agencies (see the 29 Sep rating discussion). Add as real data arrives.
- The YouTube link `jQiC5r0n7JI` (a Jumanji promo) has embedding disabled by its
  owner, so it can't be shown.
- The per-client folders in Drive folder 3 (~90 folders) were only sampled.
  Umar's curated `Portfolio/` subfolder was reviewed in full.
- The holding page at `/` still has no contact route. It will be retired at go-live anyway.

---

## Decisions worth remembering

- **No all-caps anywhere (6 Oct, owner's rule).** Every label, nav item, button, title and
  tag is lowercase; only names and acronyms keep their own capitals (UI/UX, 3D, CGI, ELF, V2P,
  GST, Mswipe, Sony Pictures…). Body copy and quotes are sentence case. The brand is always
  "empty agency". `.label` no longer transforms case (tracking 0.08em), and there are no
  `uppercase` classes left — write new strings in the case they should display in.
  The holding page (`construction/index.html`) follows the same rule.
- **Tab icon (6 Oct).** ● black circle (the logo mark) with a pale rim that only reads on dark
  tab bars. Source files live in `public/` (favicon.svg, favicon.ico, apple-touch-icon.png) so
  they survive going live; `scripts/dist.mjs` copies them to the site root, and every page
  links `/favicon.svg` + `/favicon.ico`. Any new page must include the same `<link rel="icon">` tags.

- **Portfolio is a living set (29 Sep).** As new projects come in, each gets a full case
  study (brief, process, outcome with real numbers or quotes where the client allows),
  and older or weaker pieces are retired. Aim over time for proof: outcomes, testimonials,
  permission to name clients.
- **Colour on touch, reveal on hover (29 Sep).** Desktop keeps the monochrome wireframe
  rest state that lifts on hover; phones and tablets (`@media (hover: none)`) show the
  work in full colour with no overlay.

- **YouTube stays as YouTube ships it.** The owner asked to hide YouTube's
  branding and channel name. YouTube's embed terms forbid covering or restyling
  the player, so pieces play in the panel with YouTube's standard player. The
  grid only shows stills.
- **Long films are ~45 s excerpts** (720p, ~6.6 MB, fade in/out, tagged `EXCERPT`).
  The owner chose this over hosting ~550 MB of full films in the repo.
- **Media optimisation:** images go to WebP (≤1600 px) and videos to H.264 MP4 with
  `+faststart`; short motion clips have no audio. About 1.4 GB of originals became
  ~118 MB in `public/media/`.
- **Duplicates found and merged:** 7 Drive showreels that are also on YouTube
  (the YouTube copy is used), and "AV Final" = "Bollywood 2023" (the same
  Shaarib & Toshi film; one kept).
- **Invented details are not allowed.** An earlier session made up a contact email
  and placeholder claims; both were removed. Don't guess names, years, clients or
  addresses; ask.

---

## Tools and gotchas

- **Email signature (Titan):** `construction/mail/` → served at `www.emptyagency.com/mail/`
  (`signature.html` = copy-paste page with install steps; `signature-logo.gif` = animated
  ● empty agency in Space Grotesk, a blue Figma-style selection box with anchor handles
  snaps around it every ~4 s; `signature-logo.png` = static fallback). The signature loads
  the GIF from that URL, so **keep `construction/mail/` (or move it to `public/`) when the
  site goes live at the root**. Installed in Titan (marketing@emptyagency.com) on 29 Sep as
  signature "empty agency", default for new mail and replies; the old "Vyom" one is kept.

- **ffmpeg:** `python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"`
  (installed via pip). Pass as `FFMPEG=...` to `encode-film.sh` / `gen-films.py`.
- **3D media** lives in `public/media/cgi/` with its own registry `src/lib/cgi-media.js`
  (films.js marks everything non-ELF as an excerpt, so 3D films are kept separate).
- **Figma → site images:** open the file in Chrome, select a section, *Copy as PNG*
  (⇧⌘C, up to 2×), save the clipboard PNG, split frames by background/alpha gaps,
  compose to WebP. The Figma MCP needs OAuth and wasn't used.

- `scripts/media/drive-list.py <folder-id>…` lists a public Drive folder
  recursively with sizes, without downloading anything.
- `scripts/media/encode-film.sh <in> <slug> [excerpt]` encodes a film and its poster.
- `scripts/media/gen-films.py` regenerates `src/lib/films.js`.
- There's **no system ffmpeg** on this Mac. `pip install imageio-ffmpeg` gives a
  standalone binary; point `FFMPEG=` at it. The QuickTime Animation (RLE) clips
  (Social Nation stickers) need ffmpeg because macOS can't decode them.
- **Drive:** heavy downloading trips a per-file quota for ~24 h. Download with curl,
  not by ffmpeg streaming, and check that the result isn't a 2 KB HTML page.
- **Always check poster frames** for black frames (fade transitions).

---

## Session history

**6 Oct 2026**
23. All-caps removed site-wide (~560 strings, labels, nav, titles, holding page) and the tab
    icon added on every page — see Decisions.
22. Case audit (computed styles, every page): service names, the three steps, industries and
    the Vision "A/B/C" list were display-size caps → lowercase (acronyms kept: UI/UX, 3D & CGI).
    noscript brand lowercase. Left in caps on purpose: labels/nav/marquee, project titles.
21. Case rules applied (see Decisions). Hero sub-text now spans exactly the width of the
    first headline line (`w-fit` h1 + `w-0 min-w-full` sub-text), and the headline is pulled
    left 0.05em so its glyphs optically align with the sub-text and buttons.
16. Removed three projects: Social Nation (festival identity), One Digital (sting & stories),
    Logo design (Dangal Dawgs etc.). Media files stay in `public/media/`, unused.
17. V2P 2.0: dropped the sign-in strip (a stray Figma line crossed every screen), rebuilt the
    card cover from the invoice-approval screen, cropped a red designer note off another screen.
    Added a **client testimonial** (Ashi Nagaria, Product Manager, V2P) and **status: LIVE**
    (`caseStudy.status` / `caseStudy.testimonial`, rendered by `CaseStudy.jsx`; STATUS row in the
    panel rail). The quote was written by Claude at the owner's request — get Ashi's sign-off.
18. Product films folder split into separate 3D projects: Clear X, EUME, Stuffcool, LUCA,
    Protectli, Cougar, Product spots (wine + Mswipe device). Home selected work uses Stuffcool.
19. Hero sub-text now describes the whole studio, not only UI/UX + 3D. Opens "A full-service
    creative studio." — "independent" was dropped because it reads small to corporate buyers.
    Second sentence (owner's idea, idea in your head → screen, tied to "we clear the clutter"):
    "We take the idea in your head, cut away the noise, and put what matters on your screen — …"
20. Field app (fuel cards) case study: testimonial from Ashi Nagaria, Product Manager (client
    undisclosed, so no company named). Also written by Claude at the owner's request — needs sign-off.

**29 Sep 2026 (latest)**
15. Nothing opens in a new tab any more: images and films expand in a themed **lightbox**
    (`Lightbox.jsx` — label bar, framed piece with corner anchors, ← / → through the set,
    Esc closes only the lightbox). Used in case studies (every screen, long page and film)
    and in gallery projects (stills).
14. Hero buttons: **"Who we are — our vision"** is now the primary (filled) button, then
    "See our work"; "Start a project" left the hero (still in the nav, Let's talk and FAQ).
    Project panel now opens **under the main nav** (nav stays visible); any nav click closes
    the open project.
13. Removed the two old 3D projects (Interior visualisation, Architecture & product
    renders) and their six images — owner found them too kiddish. 3D & CGI now = All Hub,
    Real estate, Product films folder.
12. Rights notice cut to three short sentences with no personal or agency names (only
    "in association with World Style"), shown **once per page, in the footer** — removed from
    Work, the project panel and the home brands grid. Footer socials removed (email only;
    `SOCIALS` kept in site.js, unused). Contact page: no rule beside "Tell us about it", or beside
    "Other ways to reach us" (both headers stay, lines removed).
11. Hero is back to "We clear the clutter. You get the results." with the ELF × Tamannaah
    film directly under it (celebrity work first as a trust signal); selected work below it
    stays UI/UX → 3D → film. Horizontal centre rule removed from the background (dots stay).
    Connectify screens: real-looking names, emails and phone numbers pixelated (chat list,
    headers, users/channels tables, mobile screens, cover).

**29 Sep 2026 (later)**
9. **Agency structure, priority UI/UX → 3D → film/motion/graphics everywhere**: buckets,
   project order (`PRIORITY` + `RANK` in site.js), services, tools, marquee, home.
   Nav renamed WORK / SERVICES. Home: statement + buttons (incl. **"Who we are — our
   vision"** → About Us), selected work (Mswipe, enQuest, All Hub, real estate, product
   films, ELF), services, **industries** (each links to its projects), brands, FAQ.
   The big ELF hero block is gone — ELF is now the last selected-work card.
   **Vision / About Us copy untouched.**
10. **3D & CGI case studies** from Drive folder `1L4RNthvL6RFFXmbCN5nSccqtZe8jGNDO`
    (`src/lib/cgi-case-studies.js`, media `public/media/cgi/`, registry `cgi-media.js`, ~97 MB):
    All Hub (AMFICO ISO-tank depot explainer, cut into 6 chapter clips), Real estate
    (2BHK walkthrough, Romaa Majestic township, 3D floor plans), and a **Product films**
    folder: Clear X, EUME Cabin Pro, Stuffcool (7 films), Product CGI (LUCA, Protectli,
    Cougar, a wine spot, Mswipe device). Case studies can now play films (`kind: 'video'`).
    Not used: the Dispatch EV pitch video (real people and LinkedIn names on screen), and an
    early low-res luggage cut (same product as EUME).

**29 Sep 2026**
6. **Content and flow, after clay.global** (design unchanged): the home page now runs
   statement → featured film → selected work (one per discipline, 2×2) → services →
   brands → FAQ → "Let's talk". New copy uses only facts already on the site; the FAQ
   is built from PILLARS, PIPELINE, BUDGETS and the email. Vision copy untouched.
7. **ELF × Tamannaah master film** added (`elf-tamannaah-master`, 57 s, 1080p, 19 MB),
   poster = the end card with Tamannaah and the brand name. Hero button is back to
   "Watch the full film". `encode-film.sh` fixed: `ffmpeg -i` exits 1 by design, which
   `pipefail` treated as a failure.
8. Folder cards use one clean cover (Mswipe → POS app, V2P → V2P 2.0), not a mosaic.

**28 Sep 2026 (later)**
3. Background: dots back but lighter (`--c-grid` at half strength); the vertical
   12-column lines are gone. The horizontal centre rule stays.
4. Fixed the blank TMC thumbnail on the home page: YouTube has no maxres still for
   that video and answers with a 120×90 placeholder instead of an error, so
   `StillFrame` now also falls back when the image loads that small.
5. Added enQuest HRMS and V2P 2.0 from the Figma team folder, and grouped the UI/UX
   work into client folders (Mswipe, V2P) with a chapter list in the panel.

**28 Sep 2026**
1. Removed the black dot matrix from the page background (`GridCanvas.jsx`).
2. Added the **UI/UX Design** bucket: 12 long-form case studies built from the
   "Vyom Shah" Figma file, a `CaseStudy` panel layout, a fourth service (UI/UX) and
   Figma in the tools on What We Do, and UI/UX in the copy, marquee and title.

**26 Sep 2026**
1. `670032c`: plain-English nav with original names on hover; hero layout swapped;
   all copy simplified (Vision untouched); marketing@emptyagency.com added and the
   form wired to FormSubmit; placeholder portfolio replaced with 44 pieces of
   Umar Khan's work, credited, with a rights notice.
2. `c219b06`: portfolio regrouped into 24 deduplicated projects with a pop-up
   project panel; ELF × Tamannaah set as the hero; 18 YouTube videos and 21
   self-hosted films added; 11 films blocked by the Drive quota (see Open items).

**21–22 Aug 2026**: holding page at `/`, SPA parked at `/mockup` (README).

**Aug 2026**: initial build of the brutalist portfolio SPA.
