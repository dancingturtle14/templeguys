import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { createJiti } from 'jiti'
import {
  applyShell,
  canonicalUrl,
  fushimiI18nPathnames,
  pageOutputPath,
  sitemapPathnames,
} from './prerender-html.mjs'

const jiti = createJiti(import.meta.url)
const { regions, religions } = jiti('../src/lib/temples.ts')

const SHELL = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="SanctaWay — visit guides for temples, churches, mosques, shrines, and sacred places worldwide. Hours, etiquette, how to get there." />
    <title>SanctaWay — Visit guides to the world’s sacred places</title>
    <script>(function(){})(window,'GTM-TF6HFGXT');</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index-abc.js"></script>
  </body>
</html>
`

test('sitemap pathnames keep indexed routes and ignore the host', () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url><loc>https://sanctaway.com/</loc></url>
  <url><loc>https://sanctaway.com/explore</loc></url>
  <url><loc>https://sanctaway.com/about</loc></url>
  <url><loc>https://sanctaway.com/temple/western-wall</loc></url>
  <url><loc>https://sanctaway.com/temple/western-wall/getting-there</loc></url>
  <url><loc>https://sanctaway.com/temple/wong-tai-sin</loc></url>
</urlset>`
  assert.deepEqual(sitemapPathnames(xml), [
    '/',
    '/explore',
    '/about',
    '/temple/western-wall',
    '/temple/western-wall/getting-there',
    '/temple/wong-tai-sin',
  ])
})

test('page files are directory indexes matching the router', () => {
  assert.equal(pageOutputPath('/tmp/dist', '/'), '/tmp/dist/index.html')
  assert.equal(pageOutputPath('/tmp/dist', '/explore'), '/tmp/dist/explore/index.html')
  assert.equal(
    pageOutputPath('/tmp/dist', '/temple/western-wall'),
    '/tmp/dist/temple/western-wall/index.html',
  )
  assert.equal(
    pageOutputPath('/tmp/dist', '/temple/wong-tai-sin/visit'),
    '/tmp/dist/temple/wong-tai-sin/visit/index.html',
  )
})

test('applyShell injects title, description, canonical, and body without dropping the SPA assets', () => {
  const page = applyShell(SHELL, {
    html: '<main><h1>Western Wall (Kotel)</h1><p>Open 24 hours after security.</p></main>',
    title: 'Western Wall (Kotel) — SanctaWay',
    description: 'Hours and how to get there.',
    canonical: 'https://sanctaway.com/temple/western-wall/',
  })
  assert.match(page, /<title>Western Wall \(Kotel\) — SanctaWay<\/title>/)
  assert.match(page, /<meta name="description" content="Hours and how to get there\." \/>/)
  assert.match(page, /<link rel="canonical" href="https:\/\/sanctaway\.com\/temple\/western-wall\/" \/>/)
  assert.match(page, /<h1>Western Wall \(Kotel\)<\/h1>/)
  assert.match(page, /Open 24 hours after security/)
  assert.doesNotMatch(page, /<div id="root"><\/div>/)
  assert.match(page, /src="\/assets\/index-abc\.js"/)
  assert.match(page, /GTM-TF6HFGXT/)
})

test('sitemap lists every region and religion hub', () => {
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  const paths = new Set(sitemapPathnames(xml))
  const hubs = [
    ...regions.map((region) => `/region/${region.slug}/`),
    ...religions.map((religion) => `/religion/${religion.slug}/`),
  ]
  const missing = hubs.filter((path) => !paths.has(path))
  assert.deepEqual(missing, [])
})

test('applyShell escapes meta text', () => {
  const page = applyShell(SHELL, {
    html: '<p>OK</p>',
    title: 'A & B',
    description: 'Say "hello"',
    canonical: 'https://sanctaway.com/about/',
  })
  assert.match(page, /<title>A &amp; B<\/title>/)
  assert.match(page, /content="Say &quot;hello&quot;"/)
})

test('canonicalUrl uses official trailing-slash URLs', () => {
  assert.equal(canonicalUrl('/'), 'https://sanctaway.com/')
  assert.equal(canonicalUrl('/explore'), 'https://sanctaway.com/explore/')
  assert.equal(canonicalUrl('/explore/'), 'https://sanctaway.com/explore/')
  assert.equal(canonicalUrl('/temple/western-wall'), 'https://sanctaway.com/temple/western-wall/')
  assert.equal(canonicalUrl('/temple/western-wall/getting-there/'), 'https://sanctaway.com/temple/western-wall/getting-there/')
  assert.equal(canonicalUrl('/ja/temple/fushimi-inari/tour/'), 'https://sanctaway.com/ja/temple/fushimi-inari/tour/')
})

test('sitemap lists trailing-slash official URLs including live Fushimi locale pages', () => {
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  const paths = sitemapPathnames(xml)
  assert.equal(paths.length, 2158)
  assert.equal(paths.length, new Set(paths).size)
  for (const path of paths) {
    assert.ok(path.startsWith('/'), path)
    assert.ok(path.endsWith('/'), path)
  }
  const localePaths = fushimiI18nPathnames()
  assert.equal(localePaths.length, 42)
  const set = new Set(paths)
  for (const path of localePaths) {
    assert.ok(set.has(path), path)
  }
  const unexpected = paths.filter(
    (path) =>
      /^\/(ja|zh-hant|zh-hans|ko|es|th)\//.test(path) && !path.includes('/temple/fushimi-inari/'),
  )
  assert.deepEqual(unexpected, [])
})
