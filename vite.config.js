import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * The SPA is not the site root — it is the work-in-progress build parked
 * at /mockup/ while the holding page in `construction/` owns /.
 *
 * `base` rewrites every emitted asset URL to /mockup/assets/…, and
 * `outDir` drops the build into dist/mockup/. `npm run build` then copies
 * construction/ over dist/ to complete the tree:
 *
 *   dist/
 *   ├─ index.html      ← holding page (hand-written, zero dependencies)
 *   ├─ robots.txt
 *   ├─ sitemap.xml
 *   └─ mockup/
 *      ├─ index.html   ← this SPA
 *      └─ assets/…
 *
 * Routing inside the SPA is hash-based (#/archive), so /mockup/#/archive
 * is a plain static file lookup. No rewrite rules, on any host.
 */
export default defineConfig({
  base: '/mockup/',
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: true },
  build: {
    outDir: 'dist/mockup',
    emptyOutDir: true,
  },
})
