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
  readFileSync(new URL('../src/data/uluwatu-seo.json', import.meta.url), 'utf8'),
).packs

const SHELL = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="SanctaWay — visit guides for temples, churches, mosques, shrines, and sacred places worldwide. Hours, etiquette, how to get there." />
    <title>SanctaWay — Visit guides to the world's sacred places</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

test('all 7 packs render exact title, description, and keywords', () => {
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

test('Walk href on Uluwatu overview keeps the trailing-slash tour path', () => {
  const overview = render('/temple/uluwatu').html
  assert.match(overview, /href="\/temple\/uluwatu\/tour\/"/)
  assert.equal(overview.match(/href="\/temple\/uluwatu\/tour\/"/g).length, 1)
  assert.doesNotMatch(overview, /href="\/temple\/uluwatu\/tour"/)
})

test('overview HTML contains preferred hours 07:00–19:00 and the 09:00 hours conflict', () => {
  const overview = render('/temple/uluwatu').html
  assert.match(overview, /07:00.*19:00/)
  assert.match(overview, /09:00/)
})

test('visit HTML contains preferred international / domestic IDR bands and at least one conflicting official table', () => {
  const visit = render('/temple/uluwatu/visit/').html
  assert.match(visit, /IDR 60,000/)
  assert.match(visit, /IDR 40,000/)
  assert.match(visit, /IDR 50,000/)  // conflicting table
})

test('notes mark the hours and fare conflicts', () => {
  const notes = render('/temple/uluwatu/notes/').html
  assert.match(notes, /09:00/)
  assert.match(notes, /IDR 50,000/)
})

test('Kecak 16:00 / 18:00–19:00 and the arrive-before-17:00 advice appear where the draft puts them', () => {
  const overview = render('/temple/uluwatu').html
  assert.match(overview, /16:00/)
  assert.match(overview, /18:00.*19:00/)
  const visit = render('/temple/uluwatu/visit/').html
  assert.match(visit, /before 17:00|before 5:00 PM/)
})

test('Overview / visit HTML must not contain "free admission" or "free entry"', () => {
  const overview = render('/temple/uluwatu').html
  const visit = render('/temple/uluwatu/visit/').html
  assert.doesNotMatch(overview, /free admission/i)
  assert.doesNotMatch(overview, /free entry/i)
  assert.doesNotMatch(visit, /free admission/i)
  assert.doesNotMatch(visit, /free entry/i)
})

test('Overview / visit HTML must not contain ticketsUrl', () => {
  const overview = render('/temple/uluwatu').html
  const visit = render('/temple/uluwatu/visit/').html
  assert.doesNotMatch(overview, /ticketsUrl/)
  assert.doesNotMatch(visit, /ticketsUrl/)
  assert.doesNotMatch(overview, /klook|getyourguide|viator/i)
  assert.doesNotMatch(visit, /klook|getyourguide|viator/i)
})

test('Labuan Sait / Padang-Padang treated as one official coastal destination with separate ticket', () => {
  const visit = render('/temple/uluwatu/visit/').html
  const getting = render('/temple/uluwatu/getting-there/').html
  assert.match(visit, /Labuan Sait/)
  assert.match(visit, /Padang-Padang/)
  assert.match(getting, /Labuan Sait/)
  assert.match(getting, /Padang-Padang/)
  assert.match(getting, /separate ticket/)
  assert.doesNotMatch(visit, /steps down from the temple side/i)
  assert.doesNotMatch(getting, /steps down from the temple side/i)
})

test('Non-Uluwatu pages do not get Uluwatu keywords: Sensō-ji overview keeps Sensō-ji keywords', () => {
  const senso = render('/temple/senso-ji/')
  assert.ok(senso.keywords && senso.keywords.length > 0)
  assert.ok(!senso.keywords.some((k) => /Uluwatu Temple|Pura Luhur/.test(k)))
})

test('Non-Uluwatu pages do not get Uluwatu keywords: Meiji tour keeps Meiji keywords', () => {
  const meiji = render('/temple/meiji-shrine/tour/')
  assert.ok(meiji.keywords && meiji.keywords.length > 0)
  assert.ok(!meiji.keywords.some((k) => /Uluwatu Temple|Pura Luhur/.test(k)))
})


test('Non-Uluwatu pages do not get Uluwatu keywords: Fushimi EN overview keeps Fushimi keywords', () => {
  const fushimi = render('/temple/fushimi-inari/')
  assert.ok(fushimi.keywords && fushimi.keywords.length > 0)
  assert.ok(!fushimi.keywords.some((k) => /Uluwatu Temple|Pura Luhur/.test(k)))
})

test('Istiqlal overview still has no keywords', () => {
  const istiqlal = render('/temple/istiqlal-mosque/')
  assert.ok(!istiqlal.keywords || istiqlal.keywords.length === 0)
})
test('Uluwatu tour keywords equal the Uluwatu pack, not a Fushimi / Sensō-ji / Meiji pack', () => {
  const uluwatuTour = render('/temple/uluwatu/tour/')
  assert.ok(uluwatuTour.keywords && uluwatuTour.keywords.length > 0)
  assert.ok(!uluwatuTour.keywords.some((k) => /Fushimi Inari|Senbon Torii|Inariyama|Asakusa Kannon|Sensō-ji|Meiji Jingū/.test(k)))
})

test('applyShell without keywords adds no tag', () => {
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
    keywords: ['Uluwatu Temple', 'Bali & Indonesia'],
    canonical: 'https://sanctaway.com/test',
    lang: 'en',
  })
  assert.match(page, /<title>A &amp; B<\/title>/)
  assert.match(page, /<meta name="description" content="Say &quot;hello&quot;" \/>/)
  assert.match(
    page,
    /<meta name="keywords" content="Uluwatu Temple, Bali &amp; Indonesia" \/>/,
  )
})