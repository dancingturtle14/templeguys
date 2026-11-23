import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import React from 'react'
import { createJiti } from 'jiti'
import { applyShell, fushimiI18nPathnames } from './prerender-html.mjs'

globalThis.React = React

const jiti = createJiti(import.meta.url, { jsx: true })
const { render } = jiti('../src/entry-server.tsx')
const { routeToUrl, parsePath } = jiti('../src/lib/router.tsx')
const { LOCALES, getFushimiI18n } = jiti('../src/lib/fushimi-i18n.ts')

const LEAK = /Not for publish|Hermes first draft|DRAFT-v1|do not invent locale|writer.?note|Soft Soft|NO_CTA|live 寫作|índice de dos cifras|enlace de accesibilidad/i
const STOP_IDS = ['arrival', 'senbon-torii', 'path-pauses', 'yotsutsuji', 'summit', 'descent']

test('live sitemap lists official trailing-slash URLs including Fushimi locale pages', () => {
  const localePaths = fushimiI18nPathnames()
  assert.equal(localePaths.length, 42)
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1])
  assert.equal(locs.length, 2158)
  assert.equal(locs.length, new Set(locs).size)
  for (const loc of locs) {
    assert.ok(loc.startsWith('https://sanctaway.com/'), loc)
    assert.ok(loc.endsWith('/'), loc)
  }
  for (const path of localePaths) {
    assert.ok(locs.includes(`https://sanctaway.com${path}`), path)
  }
  const unexpected = locs.filter((loc) =>
    /https:\/\/sanctaway\.com\/(ja|zh-hant|zh-hans|ko|es|th)\//.test(loc) &&
    !loc.includes('/temple/fushimi-inari/'),
  )
  assert.deepEqual(unexpected, [])
})

test('each locale dataset matches the English tour shape and keeps the admission FLAG', () => {
  for (const locale of LOCALES) {
    const data = getFushimiI18n(locale)
    assert.equal(data.stops.length, 6, locale)
    assert.deepEqual(data.stops.map((s) => s.id), STOP_IDS)
    assert.deepEqual(data.stops.map((s) => s.index), ['01', '02', '03', '04', '05', '06'])
    assert.equal(data.stops.find((s) => s.optional)?.id, 'summit')
    assert.equal(data.etiquette.bullets.length, 17, locale)
    assert.ok(data.visit.tickets.length > 40, locale)
    assert.equal(data.visit.entryType, 'verify')
    assert.equal(data.visit.ticketsUrl, 'https://inari.jp/en/access/')
    assert.ok(data.title && data.h1 && data.meta && data.tour.title && data.tour.walkCardTitle, locale)
    const blob = JSON.stringify(data)
    assert.doesNotMatch(blob, LEAK)
  }
})

test('locale overview and tour prerender with Walk href, chrome, and no Play/Skip/End controls', () => {
  const shell = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="old" />
    <title>old</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

  for (const locale of LOCALES) {
    const data = getFushimiI18n(locale)
    const overviewPath = `/${locale}/temple/fushimi-inari/`
    const tourPath = `/${locale}/temple/fushimi-inari/tour/`
    const overview = render(overviewPath)
    const tour = render(tourPath)
    assert.equal(overview.lang, locale === 'zh-hant' ? 'zh-Hant' : locale === 'zh-hans' ? 'zh-Hans' : locale)
    assert.equal(tour.lang, overview.lang)
    assert.match(overview.html, new RegExp(data.h1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    assert.match(tour.html, new RegExp(data.tour.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    const walkHref = routeToUrl({ name: 'temple-tour', id: 'fushimi-inari', locale })
    assert.equal(walkHref, tourPath)
    assert.match(overview.html, new RegExp(`href="${walkHref}"`))
    assert.match(tour.html, new RegExp(data.chrome.prev.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    assert.match(tour.html, /1 \/ 6/)
    assert.match(tour.html, new RegExp(data.chrome.next.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    assert.doesNotMatch(tour.html, />Play</)
    assert.doesNotMatch(tour.html, />Skip</)
    assert.doesNotMatch(tour.html, /<button[^>]*>\s*End\s*</)
    const stopPattern = data.chrome.stop_pattern
    assert.match(stopPattern, /\{n\}/, locale)
    assert.doesNotMatch(stopPattern, /live 寫作|índice de dos cifras/)
    for (const n of ['01', '02', '03', '04', '05', '06']) {
      const label = stopPattern.replace('{n}', n)
      assert.match(tour.html, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${locale} ${label}`)
    }
    const visit = render(`/${locale}/temple/fushimi-inari/visit/`)
    assert.match(visit.html, new RegExp(data.visit.tickets.slice(0, 24).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    const skip = data.chrome.skip_to_content
    assert.ok(skip, locale)
    assert.doesNotMatch(skip, /\(|\)|（|）|enlace de accesibilidad/)
    const skipRe = new RegExp(skip.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    assert.match(overview.html, skipRe, `${locale} overview skip`)
    assert.match(tour.html, skipRe, `${locale} tour skip`)
    assert.match(visit.html, skipRe, `${locale} visit skip`)
    if (locale === 'es') {
      assert.equal(skip, 'Saltar al contenido')
    }

    const page = applyShell(shell, {
      html: tour.html,
      title: tour.title,
      description: tour.description,
      canonical: `https://sanctaway.com${tourPath}`,
      lang: tour.lang,
    })
    assert.match(page, new RegExp(`<html lang="${tour.lang}"`))
  }

  const enTour = render('/temple/fushimi-inari/tour/')
  assert.equal(enTour.lang, 'en')
  assert.match(enTour.html, /Fushimi Inari on foot/)
  assert.match(enTour.html, />Prev</)
  assert.match(enTour.html, />Next</)
  const senso = render('/temple/senso-ji/tour/')
  assert.match(senso.html, /Sensō-ji on foot/)
  assert.equal(parsePath('/temple/istiqlal-mosque/tour/', '').id, 'istiqlal-mosque')
})
