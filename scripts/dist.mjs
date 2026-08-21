/**
 * Build-tree helper. Two phases, one file, no dependencies.
 *
 *   node scripts/dist.mjs clean   → wipe dist/ before Vite runs
 *   node scripts/dist.mjs shell   → copy construction/ over dist/ after
 *
 * The clean phase matters: Vite's `emptyOutDir` only clears dist/mockup/,
 * so a stale dist/assets/ from an older root-based build would survive
 * and get deployed alongside the new tree.
 */
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SHELL = join(ROOT, 'construction')

const phase = process.argv[2]

if (phase === 'clean') {
  rmSync(DIST, { recursive: true, force: true })
  console.log('· cleaned dist/')
} else if (phase === 'shell') {
  if (!existsSync(SHELL)) {
    console.error('✗ construction/ is missing — the holding page has no source.')
    process.exit(1)
  }
  if (!existsSync(join(DIST, 'mockup', 'index.html'))) {
    console.error('✗ dist/mockup/index.html is missing — did `vite build` run?')
    process.exit(1)
  }

  cpSync(SHELL, DIST, { recursive: true })

  const root = readdirSync(DIST).sort().join('  ')
  console.log(`· holding page → dist/index.html`)
  console.log(`· mockup       → dist/mockup/`)
  console.log(`  dist/ contains: ${root}`)
} else {
  console.error('usage: node scripts/dist.mjs <clean|shell>')
  process.exit(1)
}
