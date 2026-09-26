# empty agency — project log

Read this first when picking the site back up. README.md explains how the
code works; this file records **where the work stands, what was decided,
and what is still open.** Newest session at the top.

---

## Current state — 26 Sep 2026

| | |
|---|---|
| Live domain | `www.emptyagency.com` → **under-construction page** (`construction/index.html`) |
| Work in progress | `www.emptyagency.com/mockup` → the full React site, **deployed for review** |
| Last deployed commit | `c219b06` — projects, buckets, pop-up panel, video work |
| Deploy | `git push origin main` → Vercel auto-deploys in ~1 min. No Vercel CLI needed. |
| Repo | `github.com/vyomvs95/emptyagency` (SSH) |
| Stack | React 19 · JavaScript (JSX, not TypeScript) · Tailwind 4 · Framer Motion · Vite |

**Pushing rule:** the owner reviews everything on `/mockup`. Ask before each push. `/`
stays the holding page until they say "go live" (steps in README → *Going live*).

---

## What the site is now

- **Positioning:** a studio for **video, motion, graphic design and 3D**. It was
  originally pitched as apps/web; that changed once the real portfolio came in.
- **Pages:** Home · Our Work · What We Do · About Us (Vision, **copy is the owner's —
  don't rewrite it**) · Start a Project.
- **Copy rule:** the UI prints plain English (HOME, OUR WORK…). Hovering shows the
  original studio name in the cursor tag (INDEX, ARCHIVE…), from the `tech` fields
  in `src/lib/site.js`.
- **Home hero:** headline on the left, studio info on the right. Below it is the
  **hero project, ELF × Tamannaah**, with 3 featured projects (TMC, Osho Jain, Sony).
- **Our Work:** **24 projects** in 4 buckets, **Videos 10 · Motion 6 · Graphics 6 ·
  3D 2**. Each piece is in exactly one project and nothing is duplicated. A card opens
  the **project panel**, deep-linkable as `#/archive/<slug>`.
- **Contact:** `marketing@emptyagency.com` is the **only** inbox. It's on Start a
  Project and in the footer. The form (name, email, need, budget) sends through
  **FormSubmit** to that inbox.
- **Credits & rights:** every card shows who made it (`DESIGN: UMAR KHAN / WORLD STYLE`
  or `EMPTY AGENCY CORE TEAM`) and the agency (`VIA ONE DIGITAL ENTERTAINMENT`)
  where relevant. `RIGHTS_NOTICE` appears on Our Work and in the footer.

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

### 1. Eleven films never downloaded (Drive "Quota exceeded")
Google blocked further downloads of these on 26 Sep. The quota usually resets
within 24 h. **Their places already exist in `site.js`.** Each one appears
automatically once its file is in `public/media/films/` and `films.js` is
regenerated. Until then they're hidden and nothing looks broken.

| Slug | Drive file | Drive id | Size | Encode as |
|---|---|---|---|---|
| `elf-tamannaah-master` | TAMANNAH_MASTER_220126.mp4 | `13ryvVBUROdjt8GOU6I5oCQs9yHvSeiIu` | 361 MB | **full** (it's the hero; 1 min) |
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
- [ ] **Activate the enquiry form.** After a real submission from the live site, click
      the "Activate form" email FormSubmit sends to marketing@emptyagency.com.
      No enquiries are delivered until this is done.
- [ ] **Real names for the video credits.** They currently say `EMPTY AGENCY CORE TEAM`.
- [ ] **Check the project descriptions and "What we did" lines.** They're inferred
      from the footage and file names.
- [ ] **Confirm the 3D tool.** The What We Do tools list names Blender, but I found
      no evidence of it.
- [ ] **Unknown artists** on the *Rangreza* and *Diamond* covers.
- [ ] **Have a lawyer read `RIGHTS_NOTICE`** before going live on the main domain.
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
