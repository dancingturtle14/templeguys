import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const index = join(dist, 'index.html')
const fallback = join(dist, '404.html')

if (!existsSync(index)) {
  console.error('dist/index.html missing — run build first')
  process.exit(1)
}

const html = readFileSync(index, 'utf8')
if (!/<div id="root">\s*<\/div>/.test(html)) {
  console.error(
    'Refusing to copy dist/index.html onto 404.html because #root is already filled. Run pages-prepare on the Vite shell, before prerender.',
  )
  process.exit(1)
}

copyFileSync(index, fallback)
console.log('SPA fallback: dist/404.html ← dist/index.html')
