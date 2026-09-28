#!/usr/bin/env bash
# Encode one video for the site and write its poster still.
#
#   scripts/media/encode-film.sh <input> <slug> [excerpt]
#
#   full film (≤1 min, e.g. the ELF master):  1080p, keeps audio
#   excerpt  (anything longer):               45 s from 12% in, 720p, ~6.6 MB
#
# Writes public/media/films/<slug>.mp4 and <slug>-poster.webp, then run
# scripts/media/gen-films.py to register it. Needs ffmpeg on PATH, or
# FFMPEG=/path/to/ffmpeg (pip install imageio-ffmpeg gives a standalone one:
#   python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())").
#
# Download Drive files to disk with curl first — Drive rejects ffmpeg's
# streamed range requests.
set -euo pipefail
FF=${FFMPEG:-ffmpeg}
IN=$1; SLUG=$2; MODE=${3:-full}
OUT="$(cd "$(dirname "$0")/../.." && pwd)/public/media/films"
mkdir -p "$OUT"
# `ffmpeg -i` with no output always exits 1 — don't let pipefail kill the script
DUR=$({ "$FF" -i "$IN" 2>&1 || true; } | sed -n 's/.*Duration: \([0-9:.]*\).*/\1/p' | awk -F: '{print $1*3600+$2*60+$3}')

if [ "$MODE" = excerpt ]; then
  START=$(awk -v d="$DUR" 'BEGIN{print (d<=60)?0:d*0.12}'); LEN=45; FO=44
  "$FF" -v error -y -ss "$START" -i "$IN" -t $LEN \
    -vf "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))',format=yuv420p,fade=t=in:st=0:d=0.6,fade=t=out:st=$FO:d=1" \
    -af "afade=t=in:st=0:d=0.6,afade=t=out:st=$FO:d=1" \
    -c:v libx264 -preset slow -crf 27 -maxrate 1.05M -bufsize 4M -c:a aac -b:a 96k -movflags +faststart "$OUT/$SLUG.part.mp4"
  AT=16
else
  "$FF" -v error -y -i "$IN" \
    -vf "scale='if(gt(iw,ih),min(1920,iw),-2)':'if(gt(iw,ih),-2,min(1920,ih))',format=yuv420p" \
    -c:v libx264 -preset slow -crf 23 -maxrate 3M -bufsize 6M -c:a aac -b:a 128k -movflags +faststart "$OUT/$SLUG.part.mp4"
  AT=$(awk -v d="$DUR" 'BEGIN{print d*0.35}')
fi
mv "$OUT/$SLUG.part.mp4" "$OUT/$SLUG.mp4"   # only a finished encode gets the real name

"$FF" -v error -y -ss "$AT" -i "$OUT/$SLUG.mp4" -frames:v 1 -q:v 3 "/tmp/$SLUG-poster.jpg"
python3 -c "from PIL import Image; Image.open('/tmp/$SLUG-poster.jpg').save('$OUT/$SLUG-poster.webp','WEBP',quality=78,method=6)"
echo "$SLUG → $(du -h "$OUT/$SLUG.mp4" | cut -f1)  (check the poster isn't a black fade frame)"
