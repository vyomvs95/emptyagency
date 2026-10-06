#!/usr/bin/env python3
"""
Light thumbnails for first paint.

For every image in public/media (covers, posters, stills) writes a sibling
`<name>.thumb.webp`: max 640px wide, quality 60. The grid shows the thumb
at rest and swaps to the full file on hover (see PosterImage.jsx), so a
first visit downloads a fraction of the bytes. Re-run after adding media;
existing thumbs newer than their source are skipped.

    python3 scripts/media/gen-thumbs.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2] / 'public' / 'media'
made = skipped = 0
full_kb = thumb_kb = 0
for src in sorted(ROOT.rglob('*.webp')):
    if src.name.endswith('.thumb.webp'):
        continue
    out = src.with_name(src.stem + '.thumb.webp')
    if out.exists() and out.stat().st_mtime >= src.stat().st_mtime:
        skipped += 1
    else:
        im = Image.open(src)
        im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
        if im.width > 640:
            im = im.resize((640, round(im.height * 640 / im.width)), Image.LANCZOS)
        im.save(out, 'WEBP', quality=60, method=6)
        made += 1
    full_kb += src.stat().st_size // 1024
    thumb_kb += out.stat().st_size // 1024
print(f'thumbs: {made} made, {skipped} up to date — {full_kb} KB of images → {thumb_kb} KB of thumbs')
