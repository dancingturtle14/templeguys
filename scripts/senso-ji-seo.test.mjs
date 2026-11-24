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
  readFileSync(new URL('../src/data/senso-ji-seo.json', import.meta.url), 'utf8'),
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

test('all 49 Sensō-ji packs render exact title, description, and keywords', () => {
  assert.equal(packs.length, 49, 'should have 49 packs')
  for (const pack of packs) {
    const rendered = render(pack.path)
    assert.equal(rendered.title, pack.title, `${pack.path} title`)
    assert.equal(rendered.description, pack.meta, `${pack.path} description`)
    assert.deepEqual(rendered.keywords, pack.keywords, `${pack.path} keywords`)
  }
})

test('applyShell emits exact escaped title, description, and keywords for all 49 packs', () => {
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

test('Walk href on senso-ji overview keeps the trailing-slash tour path', () => {
  const overview = render('/temple/senso-ji').html
  assert.match(overview, /href="\/temple\/senso-ji\/tour\/"/)
  assert.equal(overview.match(/href="\/temple\/senso-ji\/tour\/"/g).length, 1)
  assert.doesNotMatch(overview, /href="\/temple\/senso-ji\/tour"/)
})

test('lighting contains sunset and 23:00, no leftover hedges', () => {
  const pages = [
    '/temple/senso-ji/',
    '/temple/senso-ji/visit/',
    '/temple/senso-ji/best-time/',
    '/temple/senso-ji/notes/',
  ]
  for (const path of pages) {
    const html = render(path).html
    assert.match(html, /sunset/, `${path} sunset`)
    assert.match(html, /23:00/, `${path} 23:00`)
    assert.doesNotMatch(html, /clocked lighting/i)
    assert.doesNotMatch(html, /not an official senso-ji\.jp line/i)
    assert.doesNotMatch(html, /have not published/i)
    assert.doesNotMatch(html, /has not published/i)
  }
})

test('visit HTML must not contain the dropped dress line', () => {
  const html = render('/temple/senso-ji/visit/').html
  assert.doesNotMatch(html, /Modest, comfortable clothing/)
})

test('non-Sensō-ji pages do not get Sensō-ji keywords', () => {
  const meiji = render('/temple/meiji-shrine/tour/')
  assert.ok(meiji.keywords && meiji.keywords.length > 0)
  assert.ok(!meiji.keywords.some((k) => /Sensō-ji|Asakusa Kannon/.test(k)))
  const uluwatu = render('/temple/uluwatu/tour/')
  assert.ok(uluwatu.keywords && uluwatu.keywords.length > 0)
  assert.ok(!uluwatu.keywords.some((k) => /Sensō-ji|Asakusa Kannon/.test(k)))
  const istiqlal = render('/temple/istiqlal-mosque/')
  assert.ok(istiqlal.keywords && istiqlal.keywords.length > 0)
  assert.ok(!istiqlal.keywords.some((k) => /Sensō-ji|Asakusa Kannon/.test(k)))
  const fushimi = render('/temple/fushimi-inari/')
  assert.ok(fushimi.keywords && fushimi.keywords.length > 0)
  assert.ok(!fushimi.keywords.includes('Asakusa Kannon'))
})

test('senso-ji tour has the Sensō-ji pack keywords, not Fushimi', () => {
  const pack = packs.find((p) => p.locale === 'en' && p.page === 'tour')
  const senso = render('/temple/senso-ji/tour/')
  assert.deepEqual(senso.keywords, pack.keywords)
  assert.ok(!senso.keywords.some((k) => /Fushimi Inari|Senbon Torii|Inariyama/.test(k)))
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
    keywords: ['Sensō-ji', 'Asakusa & Tokyo'],
    canonical: 'https://sanctaway.com/test',
    lang: 'en',
  })
  assert.match(page, /<title>A &amp; B<\/title>/)
  assert.match(page, /<meta name="description" content="Say &quot;hello&quot;" \/>/)
  assert.match(
    page,
    /<meta name="keywords" content="Sensō-ji, Asakusa &amp; Tokyo" \/>/,
  )
})

test('English Sensō-ji packs stay exact against the source pack', () => {
  const source = JSON.parse(
    readFileSync(new URL('../../sanctaway-seo/i18n-sensoji-20261123/seo.json', import.meta.url), 'utf8'),
  ).packs.filter((p) => p.locale === 'en')
  const en = packs.filter((p) => p.locale === 'en')
  assert.equal(en.length, 7)
  assert.deepEqual(en, source)
})

test('locale Walk hrefs use the locked trailing-slash tour path', () => {
  const locales = ['ja', 'zh-hant', 'zh-hans', 'ko', 'es', 'th']
  for (const locale of locales) {
    const href = `/${locale}/temple/senso-ji/tour/`
    const overview = render(`/${locale}/temple/senso-ji/`).html
    assert.match(overview, new RegExp(`href="${href}"`))
    assert.equal(overview.match(new RegExp(`href="${href}"`, 'g')).length, 1)
    assert.doesNotMatch(overview, new RegExp(`href="/${locale}/temple/senso-ji/tour"`))
  }
})

test('Fushimi locale pages keep Fushimi keywords, not Sensō-ji', () => {
  const jaFushimi = render('/ja/temple/fushimi-inari/')
  assert.ok(jaFushimi.keywords && jaFushimi.keywords.length > 0)
  assert.ok(!jaFushimi.keywords.some((k) => /Sensō-ji|浅草寺|Asakusa Kannon/.test(k)))
  const jaSenso = render('/ja/temple/senso-ji/')
  const pack = packs.find((p) => p.locale === 'ja' && p.page === 'overview')
  assert.deepEqual(jaSenso.keywords, pack.keywords)
})
