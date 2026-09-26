#!/usr/bin/env python3
"""
List every file in a PUBLIC Google Drive folder, recursively, with sizes.

    python3 scripts/media/drive-list.py <folder-id> [<folder-id> ...] > inventory.json

Uses Drive's public embedded folder view, so no login or API key — the
folder must be shared as "anyone with the link". Sizes come from a 1-byte
range request. Nothing is downloaded.
"""
import html, json, re, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor

def ls(fid):
    s = urllib.request.urlopen(f'https://drive.google.com/embeddedfolderview?id={fid}', timeout=60).read().decode()
    for m in re.finditer(r'href="https://drive\.google\.com/(drive/folders|file/d)/([^/"?]+)[^"]*".*?flip-entry-title">([^<]+)', s, re.S):
        yield ('dir' if 'folders' in m.group(1) else 'file'), m.group(2), html.unescape(m.group(3))

def size(fid):
    req = urllib.request.Request(download_url(fid), headers={'Range': 'bytes=0-0'})
    try:
        cr = urllib.request.urlopen(req, timeout=60).headers.get('Content-Range', '')
        return int(cr.split('/')[-1]) if '/' in cr else None
    except Exception:
        return None

def download_url(fid):
    return f'https://drive.usercontent.google.com/download?id={fid}&export=download&confirm=t'

if __name__ == '__main__':
    files, queue = [], [(r, r) for r in sys.argv[1:]]
    while queue:
        path, fid = queue.pop()
        for kind, i, name in ls(fid):
            if kind == 'dir': queue.append((f'{path}/{name}', i))
            else: files.append({'path': path, 'name': name, 'id': i})
    with ThreadPoolExecutor(16) as ex:
        for f, s in zip(files, ex.map(lambda f: size(f['id']), files)): f['size'] = s
    json.dump(sorted(files, key=lambda f: (f['path'], f['name'])), sys.stdout, indent=1)
