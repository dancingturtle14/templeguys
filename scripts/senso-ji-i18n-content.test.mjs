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
    assert.doesNotMatch(blob, /¥300|¥500|storage room で|蔵（storage）|라벨은/)
    const englishPlates = [
      'From the station to the gate',
      'From the station to the outer gate',
      'The front approach',
      'Nakamise as the approach',
      'The inner gate',
      'Hōzōmon, the inner gate',
      'The omizuya pavilion',
      'Rinse before the hall',
      'The Hondo',
      'The Kannon hall',
      'The five-storied pagoda',
      'The five-storied pagoda, from the precinct',
    ]
    for (const stop of data.stops) {
      assert.ok(!englishPlates.includes(stop.plate), `${locale} ${stop.id} plate still English: ${stop.plate}`)
    }
  }
  const ja = JSON.stringify(getSensoJiI18n('ja'))
  assert.match(ja, /蔵として使われており、門/)
  assert.doesNotMatch(ja, /\bstorage\b/)
  const ko = getSensoJiI18n('ko')
  assert.equal(ko.chrome.what_to_look_for, '눈여겨볼 점')
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
    const locked = {
      ja: { stop_pattern: '第 {n} 番', route_label: 'ルート', walk_kicker: '徒歩', related_places: '関連する場所', explore_all: 'すべて見る →' },
      'zh-hant': { stop_pattern: '第 {n} 站', route_label: '路線', walk_kicker: '步行', related_places: '相關景點', explore_all: '探索全部 →' },
      'zh-hans': { stop_pattern: 'Stop {n}', route_label: '路线', walk_kicker: '徒步', related_places: '相关地点', explore_all: '查看全部 →' },
      ko: { stop_pattern: '정거장 {n}', route_label: '경로', walk_kicker: '도보', related_places: '관련 장소', explore_all: '모두 둘러보기 →' },
      es: { stop_pattern: 'Parada {n}', route_label: 'Ruta', walk_kicker: 'Paseo', related_places: 'Lugares relacionados', explore_all: 'Explorar todos →' },
      th: { stop_pattern: 'จุดที่ {n}', route_label: 'เส้นทาง', walk_kicker: 'เดินเท้า', related_places: 'สถานที่ใกล้เคียง', explore_all: 'สำรวจทั้งหมด →' },
    }[locale]
    assert.equal(data.chrome.stop_pattern, locked.stop_pattern, locale)
    assert.equal(data.chrome.route_label, locked.route_label, locale)
    assert.equal(data.chrome.walk_kicker, locked.walk_kicker, locale)
    assert.equal(data.tour.routeLabel, locked.route_label, locale)
    assert.equal(data.tour.walkKicker, locked.walk_kicker, locale)
    assert.equal(data.chrome.related_places, locked.related_places, locale)
    assert.equal(data.chrome.explore_all, locked.explore_all, locale)
    assert.ok(data.tour.endHeading, locale)
    assert.notEqual(data.tour.endHeading, data.tour.endCopy, locale)
    if (locale === 'zh-hant') {
      assert.equal(data.tour.endHeading, '步行到此')
    }
    assert.equal(sensoJiTourChromeFor(locale).endHeading, data.tour.endHeading, locale)
    assert.equal(sensoJiTourChromeFor(locale).stopPattern, locked.stop_pattern, locale)
    assert.equal(sensoJiTourChromeFor(locale).routeLabel, locked.route_label, locale)
    assert.doesNotMatch(JSON.stringify(data.chrome), /end_kicker_live|Se omite: no se añade|\(ไม่มี\)/)
    const stopPattern = locked.stop_pattern
    assert.match(stopPattern, /\{n\}/, locale)
    for (const n of ['01', '02', '03', '04', '05', '06']) {
      const label = stopPattern.replace('{n}', n)
      assert.match(tour.html, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${locale} ${label}`)
    }
    if (locale !== 'zh-hans') {
      assert.doesNotMatch(tour.html, />Stop 0[1-6]</, locale)
    }
    const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    assert.match(tour.html, new RegExp(escape(locked.route_label)), `${locale} route`)
    assert.match(tour.html, new RegExp(escape(locked.walk_kicker)), `${locale} walk`)
    assert.match(overview.html, new RegExp(escape(locked.walk_kicker)), `${locale} overview Walk`)
    assert.match(overview.html, new RegExp(escape(locked.related_places)), `${locale} related heading`)
    assert.match(overview.html, new RegExp(escape(locked.explore_all)), `${locale} explore all`)
    assert.doesNotMatch(overview.html, />Related places</, locale)
    const endTitle = `<h2 id="tour-end-title" class="mt-2 font-display text-3xl">${data.tour.endHeading}</h2>`
    assert.match(tour.html, new RegExp(escape(endTitle)), `${locale} end heading`)
    assert.doesNotMatch(
      tour.html,
      new RegExp(`id="tour-end-title"[^>]*>${escape(data.tour.endCopy)}`),
      `${locale} endCopy must not be the h2`,
    )
    const relatedIds = ['fushimi-inari', 'kiyomizu-dera', 'longshan-temple']
    assert.deepEqual(Object.keys(data.relatedCards), relatedIds, locale)
    for (const id of relatedIds) {
      const card = data.relatedCards[id]
      assert.ok(card?.name && card?.summary, `${locale} ${id}`)
      assert.match(overview.html, new RegExp(escape(card.name)), `${locale} ${id} name`)
      assert.match(overview.html, new RegExp(escape(card.summary)), `${locale} ${id} summary`)
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
  const enOverview = render('/temple/senso-ji/')
  const longshanSummary =
    'Guanyin temple in Taipei’s Wanhua — founded 1738 and still in active use, with Buddhist, Taoist and Confucian shrines; daily 06:00–22:00, no admission charge. Temple site lungshan.org.tw.'
  const temples = JSON.parse(readFileSync(new URL('../src/data/temples.json', import.meta.url), 'utf8'))
  const longshan = temples.find((t) => t.id === 'longshan-temple')
  assert.equal(longshan.summary, longshanSummary)
  assert.match(enOverview.html, /Guanyin temple in Taipei/)
  assert.match(enOverview.html, /lungshan\.org\.tw/)
  assert.doesNotMatch(enOverview.html, /living temple postcard/)
  assert.match(enOverview.html, />Related places</)
  assert.match(enOverview.html, /Explore all →/)
  const fushimi = temples.find((t) => t.id === 'fushimi-inari')
  const kiyomizu = temples.find((t) => t.id === 'kiyomizu-dera')
  assert.match(enOverview.html, new RegExp(fushimi.summary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.match(enOverview.html, new RegExp(kiyomizu.summary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.equal(parsePath('/temple/meiji-shrine/tour/', '').id, 'meiji-shrine')
  assert.equal(parsePath('/ja/temple/meiji-shrine/', '').name, 'notfound')
})
