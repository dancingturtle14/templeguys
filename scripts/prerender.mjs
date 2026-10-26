import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { applyShell, canonicalUrl, pageOutputPath, sitemapPathnames } from './prerender-html.mjs'

const root = process.cwd()
const dist = join(root, 'dist')
const indexPath = join(dist, 'index.html')
const ssrDir = join(root, 'dist-ssr')

if (!existsSync(indexPath)) {
  console.error('dist/index.html missing — run vite build first')
  process.exit(1)
}

const template = readFileSync(indexPath, 'utf8')
if (!template.includes('<div id="root"></div>')) {
  console.error('dist/index.html is not an empty SPA shell. Prerender expects a fresh vite build.')
  process.exit(1)
}
if (!template.includes('GTM-TF6HFGXT')) {
  console.error('dist/index.html is missing GTM-TF6HFGXT')
  process.exit(1)
}

const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8')
const paths = sitemapPathnames(sitemap)

const entryName = readdirSync(ssrDir).find((name) => /^entry-server\.(js|mjs)$/.test(name))
if (!entryName) {
  console.error(`SSR bundle missing in ${ssrDir}`)
  process.exit(1)
}

const { render } = await import(pathToFileURL(join(ssrDir, entryName)).href)

for (const pathname of paths) {
  const rendered = await render(pathname)
  const page = applyShell(template, {
    html: rendered.html,
    title: rendered.title,
    description: rendered.description,
    canonical: canonicalUrl(pathname),
  })
  const outFile = pageOutputPath(dist, pathname)
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, page)
}

// Unknown URLs must keep booting the client app. This shell is the Vite
// index from before routes were filled in, including the same asset hashes.
writeFileSync(join(dist, '404.html'), template)

function readOut(pathname) {
  return readFileSync(pageOutputPath(dist, pathname), 'utf8')
}

const wall = readOut('/temple/western-wall')
const wallThere = readOut('/temple/western-wall/getting-there')
const hk = readOut('/temple/wong-tai-sin')
const fallback = readFileSync(join(dist, '404.html'), 'utf8')

function assertIncludes(fileLabel, html, needle) {
  if (!html.includes(needle)) {
    console.error(`${fileLabel} missing ${JSON.stringify(needle)}`)
    process.exit(1)
  }
}

assertIncludes('western-wall', wall, 'Western Wall')
assertIncludes('western-wall', wall, 'hours')
assertIncludes('western-wall/getting-there', wallThere, 'Dung Gate')
assertIncludes('wong-tai-sin', hk, 'Wong Tai Sin')
assertIncludes('wong-tai-sin', hk, 'MTR')
assertIncludes('404.html', fallback, '<div id="root"></div>')
assertIncludes('404.html', fallback, 'GTM-TF6HFGXT')
assertIncludes('western-wall', wall, 'GTM-TF6HFGXT')

if (wall.includes('<div id="root"></div>')) {
  console.error('western-wall HTML is still an empty root')
  process.exit(1)
}

const hubPaths = paths.filter((pathname) => /^\/(?:region|religion)\/[^/]+$/.test(pathname))
if (hubPaths.length === 0) {
  console.error('sitemap has no /region or /religion hub routes to prerender')
  process.exit(1)
}
for (const pathname of hubPaths) {
  const html = readOut(pathname)
  const marker = pathname.startsWith('/region/') ? 'Sacred places in ' : 'places of worship'
  if (html.includes('<div id="root"></div>') || !html.includes(marker)) {
    console.error(`${pathname} prerender is missing hub content (${marker})`)
    process.exit(1)
  }
}
if (!existsSync(join(dist, 'CNAME')) || !existsSync(join(dist, 'sitemap.xml')) || !existsSync(join(dist, 'robots.txt'))) {
  console.error('dist is missing CNAME, sitemap.xml, or robots.txt')
  process.exit(1)
}

console.log(`Prerendered ${paths.length} sitemap routes into dist/**/index.html`)
console.log('SPA fallback: dist/404.html (empty #root)')
