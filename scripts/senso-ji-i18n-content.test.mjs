import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import React from 'react'
import { createJiti } from 'jiti'
import { applyShell, sensoJiI18nPathnames } from './prerender-html.mjs'

globalThis.React = React

const jiti = createJiti(import.meta.url, { jsx: true })
const { render } = jiti('../src/entry-server.tsx')
const { routeToUrl, parsePath } = jiti('../src/lib/router.tsx')
const { LOCALES, getSensoJiI18n, sensoJiTourChromeFor } = jiti('../src/lib/senso-ji-i18n.ts')

const LEAK = /Not for publish|Hermes first draft|DRAFT-v1|do not invent locale|writer.?note|Soft Soft|NO_CTA|live 寫作|índice de dos cifras|enlace de accesibilidad/i
const FREE = /free admission|free entry|入場無料|免費入場|免费入场|입장 무료|entrada gratuita|เข้าชมฟรี/i
const FUSHIMI_LEAK = /Yotsutsuji|Senbon Torii|Okumiya|四つ辻|千本鳥居|奥宮/
const STOP_IDS = ['kaminarimon', 'nakamise', 'hozomon', 'omizuya', 'hondo', 'pagoda']

test('live sitemap lists official trailing-slash URLs including Sensō-ji locale pages', () => {
  const localePaths = sensoJiI18nPathnames()
  assert.equal(localePaths.length, 42)
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1])
  assert.equal(locs.length, 2200)
  assert.equal(locs.length, new Set(locs).size)
  for (const loc of locs) {
    assert.ok(loc.startsWith('https://sanctaway.com/'), loc)
    assert.ok(loc.endsWith('/'), loc)
  }
  for (const path of localePaths) {
    assert.ok(locs.includes(`https://sanctaway.com${path}`), path)
  }
})

test('each locale dataset matches the English tour shape and keeps the admission FLAG', () => {
  for (const locale of LOCALES) {
    const data = getSensoJiI18n(locale)
    assert.equal(data.stops.length, 6, locale)
    assert.deepEqual(data.stops.map((s) => s.id), STOP_IDS)
    assert.deepEqual(data.stops.map((s) => s.index), ['01', '02', '03', '04', '05', '06'])
    assert.equal(data.visit.entryType, 'verify')
    assert.equal(data.visit.ticketsUrl, 'https://www.senso-ji.jp/visit/')
    assert.ok(data.title && data.h1 && data.meta && data.tour.title && data.tour.walkCardTitle, locale)
    const blob = JSON.stringify(data)
    assert.doesNotMatch(blob, LEAK)
    assert.doesNotMatch(blob, FREE)
    assert.doesNotMatch(blob, FUSHIMI_LEAK)
    assert.doesNotMatch(blob, /¥300|¥500|storage room で/)
  }
  const ja = JSON.stringify(getSensoJiI18n('ja'))
  assert.match(ja, /蔵（storage）として使われており、門/)
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
    const data = getSensoJiI18n(locale)
    const overviewPath = `/${locale}/temple/senso-ji/`
    const tourPath = `/${locale}/temple/senso-ji/tour/`
    const overview = render(overviewPath)
    const tour = render(tourPath)
    assert.equal(overview.lang, locale === 'zh-hant' ? 'zh-Hant' : locale === 'zh-hans' ? 'zh-Hans' : locale)
    assert.equal(tour.lang, overview.lang)
    assert.match(overview.html, new RegExp(data.h1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    assert.match(tour.html, new RegExp(data.tour.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    const walkHref = routeToUrl({ name: 'temple-tour', id: 'senso-ji', locale })
    assert.equal(walkHref, tourPath)
    assert.match(overview.html, new RegExp(`href="${walkHref}"`))
    assert.match(tour.html, new RegExp(data.chrome.prev.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    assert.match(tour.html, /1 \/ 6/)
    assert.match(tour.html, new RegExp(data.chrome.next.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    assert.doesNotMatch(tour.html, />Play</)
    assert.doesNotMatch(tour.html, />Skip</)
    assert.doesNotMatch(tour.html, /<button[^>]*>\s*End\s*</)
    assert.doesNotMatch(tour.html, FUSHIMI_LEAK)
    assert.doesNotMatch(overview.html, FUSHIMI_LEAK)
    const stopPattern = sensoJiTourChromeFor(locale).stopPattern
    assert.match(stopPattern, /\{n\}/, locale)
    assert.doesNotMatch(stopPattern, /live 寫作|índice de dos cifras/)
    for (const n of ['01', '02', '03', '04', '05', '06']) {
      const label = stopPattern.replace('{n}', n)
      assert.match(tour.html, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${locale} ${label}`)
    }
    const skip = data.chrome.skip_to_content
    assert.ok(skip, locale)
    assert.doesNotMatch(skip, /\(|\)|（|）|enlace de accesibilidad/)
    const skipRe = new RegExp(skip.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    assert.match(overview.html, skipRe, `${locale} overview skip`)
    assert.match(tour.html, skipRe, `${locale} tour skip`)

    const page = applyShell(shell, {
      html: tour.html,
      title: tour.title,
      description: tour.description,
      canonical: `https://sanctaway.com${tourPath}`,
      lang: tour.lang,
    })
    assert.match(page, new RegExp(`<html lang="${tour.lang}"`))
  }

  const enTour = render('/temple/senso-ji/tour/')
  assert.equal(enTour.lang, 'en')
  assert.match(enTour.html, /Sensō-ji on foot/)
  assert.match(enTour.html, />Prev</)
  assert.match(enTour.html, />Next</)
  assert.equal(parsePath('/temple/meiji-shrine/tour/', '').id, 'meiji-shrine')
  assert.equal(parsePath('/ja/temple/meiji-shrine/', '').name, 'notfound')
})
