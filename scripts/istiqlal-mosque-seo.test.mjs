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
  readFileSync(new URL('../src/data/istiqlal-mosque-seo.json', import.meta.url), 'utf8'),
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

test('Walk href on Istiqlal overview keeps the trailing-slash tour path', () => {
  const overview = render('/temple/istiqlal-mosque/').html
  assert.match(overview, /href="\/temple\/istiqlal-mosque\/tour\/"/)
  assert.equal(overview.match(/href="\/temple\/istiqlal-mosque\/tour\/"/g).length, 1)
  assert.doesNotMatch(overview, /href="\/temple\/istiqlal-mosque\/tour"/)
})

test('overview HTML contains "no admission fee to enter" and "open daily"', () => {
  const overview = render('/temple/istiqlal-mosque/').html
  assert.match(overview, /no admission fee to enter/i)
  assert.match(overview, /open daily/i)
})

test('visit HTML contains the official no-admission-fee scope and does not invent IDR fares', () => {
  const visit = render('/temple/istiqlal-mosque/visit/').html
  assert.match(visit, /no admission fee to enter/i)
  assert.match(visit, /entering the (mosque|building)/i)
  assert.doesNotMatch(visit, /IDR\s*[\d.,]|Rp\s*[\d.,]/)
  assert.doesNotMatch(visit, /ticketsUrl/)
  assert.doesNotMatch(visit, /klook|getyourguide|viator/i)
})

test('notes mark SIAPMI 04:00-22:00 as contact hours, not a visitor timetable', () => {
  const notes = render('/temple/istiqlal-mosque/notes/').html
  assert.match(notes, /04:00.22:00/)
  assert.match(notes, /contact hours/i)
  assert.match(notes, /not a visitor timetable/i)
})

test('notes mention the 1978 inauguration conflict and 200,000 vs 120,000 capacity conflict', () => {
  const notes = render('/temple/istiqlal-mosque/notes/').html
  assert.match(notes, /1978/)
  assert.match(notes, /Soeharto/)
  assert.match(notes, /200,000/)
  assert.match(notes, /120,000/)
})

test('best-time and notes mention Ramadan 1447 clocks and that 1448 hours were not published', () => {
  const bestTime = render('/temple/istiqlal-mosque/best-time/').html
  const notes = render('/temple/istiqlal-mosque/notes/').html
  assert.match(bestTime, /1447/)
  assert.match(bestTime, /03:00–22:30/)
  assert.match(bestTime, /24 hours/)
  assert.match(bestTime, /1448/)
  assert.match(notes, /1447/)
  assert.match(notes, /1448/)
})

test('getting-there prefers Stasiun Juanda / Halte Juanda or Halte Istiqlal and flags older Gambir / Metromini wording', () => {
  const getting = render('/temple/istiqlal-mosque/getting-there/').html
  assert.match(getting, /Stasiun Juanda/)
  assert.match(getting, /Halte Juanda/)
  assert.match(getting, /Halte Istiqlal/)
  assert.match(getting, /Gambir/)
  assert.match(getting, /Metromini/)
})

test('Non-Istiqlal pages do not get Istiqlal keywords: Sensō-ji overview keeps Sensō-ji keywords', () => {
  const senso = render('/temple/senso-ji/')
  assert.ok(senso.keywords && senso.keywords.length > 0)
  assert.ok(!senso.keywords.some((k) => /Istiqlal Mosque/.test(k)))
})

test('Non-Istiqlal pages do not get Istiqlal keywords: Meiji tour keeps Meiji keywords', () => {
  const meiji = render('/temple/meiji-shrine/tour/')
  assert.ok(meiji.keywords && meiji.keywords.length > 0)
  assert.ok(!meiji.keywords.some((k) => /Istiqlal Mosque/.test(k)))
})

test('Non-Istiqlal pages do not get Istiqlal keywords: Fushimi EN overview keeps Fushimi keywords', () => {
  const fushimi = render('/temple/fushimi-inari/')
  assert.ok(fushimi.keywords && fushimi.keywords.length > 0)
  assert.ok(!fushimi.keywords.some((k) => /Istiqlal Mosque/.test(k)))
})

test('Non-Istiqlal pages do not get Istiqlal keywords: Uluwatu overview keeps Uluwatu keywords', () => {
  const uluwatu = render('/temple/uluwatu/')
  assert.ok(uluwatu.keywords && uluwatu.keywords.length > 0)
  assert.ok(!uluwatu.keywords.some((k) => /Istiqlal Mosque/.test(k)))
})

test('Istiqlal tour keywords equal the Istiqlal pack, not a Fushimi / Sensō-ji / Meiji / Uluwatu pack', () => {
  const pack = packs.find((p) => p.page === 'tour')
  const istiqlalTour = render('/temple/istiqlal-mosque/tour/')
  assert.deepEqual(istiqlalTour.keywords, pack.keywords)
  assert.ok(
    !istiqlalTour.keywords.some((k) =>
      /Fushimi Inari|Senbon Torii|Inariyama|Asakusa Kannon|Sensō-ji|Meiji Jingū|Uluwatu Temple|Pura Luhur/.test(k),
    ),
  )
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
    keywords: ['Istiqlal Mosque', 'Bali & Indonesia'],
    canonical: 'https://sanctaway.com/test',
    lang: 'en',
  })
  assert.match(page, /<title>A &amp; B<\/title>/)
  assert.match(page, /<meta name="description" content="Say &quot;hello&quot;" \/>/)
  assert.match(
    page,
    /<meta name="keywords" content="Istiqlal Mosque, Bali &amp; Indonesia" \/>/,
  )
})
