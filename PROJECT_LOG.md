# empty agency — project log

Read this first when picking the site back up. README.md explains how the
code works; this file records **where the work stands, what was decided,
and what is still open.** Newest session at the top.

---

## Current state — 28 Sep 2026

| | |
|---|---|
| Live domain | `www.emptyagency.com` → **under-construction page** (`construction/index.html`) |
| Work in progress | `www.emptyagency.com/mockup` → the full React site, **deployed for review** |
| Last deployed commit | see *Session history* — 28 Sep: UI/UX case studies, dots removed |
| Deploy | `git push origin main` → Vercel auto-deploys in ~1 min. No Vercel CLI needed. |
| Repo | `github.com/vyomvs95/emptyagency` (SSH) |
| Stack | React 19 · JavaScript (JSX, not TypeScript) · Tailwind 4 · Framer Motion · Vite |

**Pushing rule:** the owner reviews everything on `/mockup`. Ask before each push. `/`
stays the holding page until they say "go live" (steps in README → *Going live*).

---

## What the site is now

- **Positioning:** a studio for **video, motion, graphic design, 3D and UI/UX design**.
  UI/UX came back in on 28 Sep with Vyom Shah's product work (see below).
- **Pages:** Home · Our Work · What We Do · About Us (Vision, **copy is the owner's —
  don't rewrite it**) · Start a Project.
- **Copy rule:** the UI prints plain English (HOME, OUR WORK…). Hovering shows the
  original studio name in the cursor tag (INDEX, ARCHIVE…), from the `tech` fields
  in `src/lib/site.js`.
- **Home hero:** headline on the left, studio info on the right. Below it is the
  **hero project, ELF × Tamannaah**, with 3 featured projects (TMC, Osho Jain, Sony).
- **Our Work:** **31 cards** in 5 buckets, **Videos 10 · Motion 6 · Graphics 6 ·
  3D 2 · UI/UX Design 7** (2 client folders + 5 single case studies). Each piece is in exactly one project and nothing is duplicated. A card opens
  the **project panel**, deep-linkable as `#/archive/<slug>`.
- **Contact:** `marketing@emptyagency.com` is the **only** inbox. It's on Start a
  Project and in the footer. The form (name, email, need, budget) sends through
  **FormSubmit** to that inbox.
- **Credits & rights:** every card shows who made it (`DESIGN: UMAR KHAN / WORLD STYLE`
  or `EMPTY AGENCY CORE TEAM`) and the agency (`VIA ONE DIGITAL ENTERTAINMENT`)
  where relevant. `RIGHTS_NOTICE` appears on Our Work and in the footer.

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
- The YouTube link `jQiC5r0n7JI` (a Jumanji promo) has embedding disabled by its
  owner, so it can't be shown.
- The per-client folders in Drive folder 3 (~90 folders) were only sampled.
  Umar's curated `Portfolio/` subfolder was reviewed in full.
- The holding page at `/` still has no contact route. It will be retired at go-live anyway.

---

## Decisions worth remembering

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

**29 Sep 2026 (latest)**
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
