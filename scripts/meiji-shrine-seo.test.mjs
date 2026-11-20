import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import React from 'react'
import { createJiti } from 'jiti'
import { applyShell, escapeHtml } from './prerender-html.mjs'

globalThis.React = React

const jiti = createJiti(import.meta.url, { jsx: true })
const { render } = jiti('../src/entry-server.tsx')

const packs = JSON.parse(
  readFileSync(new URL('../src/data/meiji-shrine-seo.json', import.meta.url), 'utf8'),
).packs

const SHELL = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="SanctaWay — visit guides for temples, churches, mosques, shrines, and sacred places worldwide. Hours, etiquette, how to get there." />
    <title>SanctaWay — Visit guides to the world’s sacred places</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

test('all 7 Meiji Shrine packs render exact title, description, and keywords', () => {
  assert.equal(packs.length, 7, 'should have 7 packs')
  for (const pack of packs) {
    const rendered = render(pack.path)
    assert.equal(rendered.title, pack.title, `${pack.path} title`)
    assert.equal(rendered.description, pack.meta, `${pack.path} description`)
    assert.deepEqual(rendered.keywords, pack.keywords, `${pack.path} keywords`)
  }
})

test('applyShell emits exact escaped title, description, and keywords for all 7 packs', () => {
  for (const pack of packs) {
    const rendered = render(pack.path)
    const page = applyShell(SHELL, {
      html: rendered.html,
      title: rendered.title,
      description: rendered.description,
      keywords: rendered.keywords,
      canonical: `https://sanctaway.com${pack.path}`,
      lang: rendered.lang,
    })
    assert.ok(page.includes(`<title>${escapeHtml(pack.title)}</title>`), `${pack.path} title`)
    assert.ok(
      page.includes(`<meta name="description" content="${escapeHtml(pack.meta)}" />`),
      `${pack.path} description`,
    )
    assert.ok(
      page.includes(`<meta name="keywords" content="${escapeHtml(pack.keywords.join(', '))}" />`),
      `${pack.path} keywords`,
    )
  }
})

test('Walk href on meiji-shrine overview keeps the trailing-slash tour path', () => {
  const overview = render('/temple/meiji-shrine').html
  assert.match(overview, /href="\/temple\/meiji-shrine\/tour\/"/)
  assert.equal(overview.match(/href="\/temple\/meiji-shrine\/tour\/"/g).length, 1)
  assert.doesNotMatch(overview, /href="\/temple\/meiji-shrine\/tour"/)
})

test('Treasure Museum wording is marked, with no leftover Annex hedge', () => {
  const pages = [
    '/temple/meiji-shrine/',
    '/temple/meiji-shrine/visit/',
    '/temple/meiji-shrine/notes/',
  ]
  for (const path of pages) {
    const html = render(path).html
    assert.match(html, /currently closed|currently lists it as closed/i, `${path} currently closed`)
    assert.match(html, /limited periods/i, `${path} limited periods`)
    assert.doesNotMatch(html, /Annex/)
    assert.doesNotMatch(html, /limited open/)
  }
})

test('museum fee is ¥1,000 / ¥900 and the 500-yen conflict is marked', () => {
  for (const path of ['/temple/meiji-shrine/visit/', '/temple/meiji-shrine/notes/']) {
    const html = render(path).html
    assert.match(html, /¥1,000/, `${path} ¥1,000`)
    assert.match(html, /¥900/, `${path} ¥900`)
    assert.match(html, /en\/opening\//, `${path} opening conflict url`)
    assert.match(html, /500 yen/, `${path} marked 500 yen conflict`)
  }
})

test('visit HTML must not contain the dropped dress line or free-admission wording', () => {
  const html = render('/temple/meiji-shrine/visit/').html
  assert.doesNotMatch(html, /Modest, comfortable walking clothes/)
  assert.doesNotMatch(html, /Remove hats when praying/)
  assert.doesNotMatch(html, /free admission/i)
  // TempleDetail already labels entryType "free" as "Free entry" in the Entry row.
  // That chrome is unchanged; body copy must still avoid the banned phrase.
  const entryLabels = html.match(/Free entry/g) || []
  assert.equal(entryLabels.length, 1)
  assert.match(html, />Free entry<\/p>/)
  const overview = render('/temple/meiji-shrine/').html
  const notes = render('/temple/meiji-shrine/notes/').html
  assert.doesNotMatch(overview, /free admission/i)
  assert.doesNotMatch(overview, /free entry/i)
  assert.doesNotMatch(notes, /free admission/i)
  assert.doesNotMatch(notes, /free entry/i)
})

test('non-Meiji pages do not get Meiji keywords', () => {
  const senso = render('/temple/senso-ji/')
  assert.ok(senso.keywords && senso.keywords.length > 0)
  assert.ok(!senso.keywords.some((k) => /Harajuku entrance walk|Minami-sandō/.test(k)))
  const uluwatu = render('/temple/uluwatu/tour/')
  assert.ok(!uluwatu.keywords || uluwatu.keywords.length === 0)
  const istiqlal = render('/temple/istiqlal-mosque/')
  assert.ok(!istiqlal.keywords || istiqlal.keywords.length === 0)
  const fushimi = render('/temple/fushimi-inari/')
  assert.ok(fushimi.keywords && fushimi.keywords.length > 0)
  assert.ok(!fushimi.keywords.includes('Meiji Jingū'))
})

test('meiji-shrine tour has the Meiji pack keywords, not Fushimi or Sensō-ji', () => {
  const pack = packs.find((p) => p.page === 'tour')
  const meiji = render('/temple/meiji-shrine/tour/')
  assert.deepEqual(meiji.keywords, pack.keywords)
  assert.ok(!meiji.keywords.some((k) => /Fushimi Inari|Senbon Torii|Inariyama|Asakusa Kannon/.test(k)))
})

test('applyShell without keywords does not inject a keywords tag', () => {
  const page = applyShell(SHELL, {
    html: '<main><h1>Test</h1></main>',
    title: 'Test Page',
    description: 'A test description',
    canonical: 'https://sanctaway.com/test',
    lang: 'en',
  })
  assert.doesNotMatch(page, /<meta name="keywords"/)
})

test('applyShell with keywords injects and escapes', () => {
  const page = applyShell(SHELL, {
    html: '<main><h1>Test</h1></main>',
    title: 'A & B',
    description: 'Say "hello"',
    keywords: ['Meiji Shrine', 'Tokyo & Japan'],
    canonical: 'https://sanctaway.com/test',
    lang: 'en',
  })
  assert.match(page, /<title>A &amp; B<\/title>/)
  assert.match(page, /<meta name="description" content="Say &quot;hello&quot;" \/>/)
  assert.match(
    page,
    /<meta name="keywords" content="Meiji Shrine, Tokyo &amp; Japan" \/>/,
  )
})
