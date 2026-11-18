import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import React from 'react'
import { createJiti } from 'jiti'
import { sitemapPathnames } from './prerender-html.mjs'

globalThis.React = React

const jiti = createJiti(import.meta.url, { jsx: true })
const { parsePath } = jiti('../src/lib/router.tsx')
const { render } = jiti('../src/entry-server.tsx')
const { tourStopImage } = jiti('../src/data/fushimiInariTour.ts')
const { ISTIQLAL_MOSQUE_TOUR, ISTIQLAL_MOSQUE_TOUR_ID, ISTIQLAL_MOSQUE_MAPS_WALKING } = jiti(
  '../src/data/istiqlalMosqueTour.ts',
)

const STOP_IDS = ['approach-gates', 'entry-etiquette', 'upper-hallways', 'history-founding', 'cathedral-silaturahmi', 'visiting-hours']

const LEAK = /Soft Soft|Soft-home|NO_CTA|consecrat/i
const MAPS_HREF = ISTIQLAL_MOSQUE_MAPS_WALKING.replace(/&/g, '&amp;')

test('istiqlal-mosque tour route is its own path and accepts both slash forms', () => {
  assert.deepEqual(parsePath('/temple/istiqlal-mosque/tour', {}), {
    name: 'temple-tour',
    id: 'istiqlal-mosque',
  })
  assert.deepEqual(parsePath('/temple/istiqlal-mosque/tour/', {}), {
    name: 'temple-tour',
    id: 'istiqlal-mosque',
  })
  assert.equal(parsePath('/temple/istiqlal-mosque', '').name, 'temple')
  assert.equal(parsePath('/temple/istiqlal-mosque/visit', '').chapter, 'visit')
})

test('istiqlal-mosque tour data is six stable stops with official-style copy and a photo each', () => {
  assert.equal(ISTIQLAL_MOSQUE_TOUR_ID, 'istiqlal-mosque')
  assert.deepEqual(
    ISTIQLAL_MOSQUE_TOUR.stops.map((stop) => stop.id),
    STOP_IDS,
  )
  assert.equal(
    ISTIQLAL_MOSQUE_TOUR.stops.filter((stop) => stop.optional).length,
    0,
  )
  for (const stop of ISTIQLAL_MOSQUE_TOUR.stops) {
    assert.ok(stop.sentences.length >= 2 && stop.sentences.length <= 4, stop.id)
    assert.ok(stop.checkpoints.length >= 2 && stop.checkpoints.length <= 4, stop.id)
    assert.ok(stop.checkpoints.some((item) => item.kind === 'must-see'), stop.id)
    for (const item of stop.checkpoints) {
      if (item.kind === 'must-see') assert.ok((item.lookFor?.length ?? 0) >= 3, item.id)
    }
    assert.ok(
      stop.checkpoints.some((item) => item.kind === 'story' || item.kind === 'practice'),
      stop.id,
    )
    const images = stop.checkpoints.flatMap((item) => (item.image ? [item.image] : []))
    assert.ok(images.length >= 1, stop.id)
    assert.match(images[0].src, /^https:\/\/thumb\.wikimedia\.org\//)
    const blob = [
      stop.plate,
      stop.caption,
      ...stop.sentences,
      ...stop.chips.map((chip) => chip.label),
      ...stop.checkpoints.flatMap((item) => [
        item.title,
        ...item.sentences,
        ...(item.lookFor ?? []),
        ...(item.prompt?.choices.flatMap((choice) => [choice.label, choice.reply]) ?? []),
      ]),
    ].join(' ')
    assert.doesNotMatch(blob, LEAK)
  }
})

test('istiqlal-mosque tour page renders step player, stop photos, Prev / count / Next only', () => {
  const { html, title } = render('/temple/istiqlal-mosque/tour/')
  assert.equal(render('/temple/istiqlal-mosque/tour').title, title)
  assert.match(title, /Istiqlal Mosque/)
  assert.match(html, /Istiqlal Mosque on foot/)
  assert.match(html, /step player/)
  assert.match(html, /aria-label="Walk stops"/)
  assert.match(html, /aria-label="Walk progress"/)
  assert.match(html, />Prev</)
  assert.match(html, />Next</)
  assert.match(html, /1 \/ 6/)
  assert.doesNotMatch(html, />Skip</)
  assert.doesNotMatch(html, /href="#tour-end"/)
  assert.match(html, /Schematic walking route with six stops/)
  assert.match(html, /Open walking route in Google Maps/)
  assert.match(html, new RegExp(MAPS_HREF.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.doesNotMatch(html, /<iframe[\s>]/i)
  assert.doesNotMatch(html, /<audio[\s>]/i)
  assert.doesNotMatch(html, LEAK)
  assert.doesNotMatch(html, /speechSynthesis/)
  assert.doesNotMatch(html, /data-voice/)
  assert.doesNotMatch(html, /Play voice/)
  assert.doesNotMatch(html, /Stop voice/)
  assert.doesNotMatch(html, />Quiet</)

  for (const id of STOP_IDS) {
    assert.match(html, new RegExp(`id="${id}"`))
    assert.match(html, new RegExp(`data-stop-image="${id}"`))
    assert.match(html, new RegExp(`href="#${id}"`))
    assert.match(html, new RegExp(`data-tour-jump="${id}"`))
    const image = tourStopImage(ISTIQLAL_MOSQUE_TOUR.stops.find((stop) => stop.id === id))
    assert.ok(image, id)
    const escaped = image.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    assert.match(html, new RegExp(escaped))
  }

  assert.match(html, /fetchpriority="high"/i)
  assert.match(html, />Must-see</)
  assert.match(html, /What to look for/)
  assert.match(html, /Enlarge photo/)
  assert.doesNotMatch(html, /Harajuku Gate/)
  assert.doesNotMatch(html, /Ōtorii/)
  assert.doesNotMatch(html, /Minami Shinmon/)
  assert.doesNotMatch(html, /href="\/temple\/meiji-shrine\/etiquette"/)
  assert.doesNotMatch(html, /href="\/temple\/fushimi-inari\/etiquette"/)
})

test('istiqlal-mosque overview adds one Walk card with a trailing-slash href; visit does not', () => {
  const overview = render('/temple/istiqlal-mosque').html
  assert.match(overview, /href="\/temple\/istiqlal-mosque\/tour\/"/)
  assert.equal(overview.match(/href="\/temple\/istiqlal-mosque\/tour\/"/g).length, 1)
  assert.doesNotMatch(overview, /href="\/temple\/istiqlal-mosque\/tour"/)

  const visit = render('/temple/istiqlal-mosque/visit').html
  assert.doesNotMatch(visit, /href="\/temple\/istiqlal-mosque\/tour"/)
})

test('draft sitemap lists the istiqlal-mosque tour so the preview prerenders', () => {
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  const paths = sitemapPathnames(xml)
  assert.ok(paths.includes('/temple/istiqlal-mosque/tour/'))
  assert.ok(paths.includes('/temple/fushimi-inari/tour/'))
  assert.ok(paths.includes('/temple/senso-ji/tour/'))
  assert.ok(paths.includes('/temple/meiji-shrine/tour/'))
})

test('each istiqlal-mosque stop has a Wikimedia image with a visible credit', () => {
  for (const stop of ISTIQLAL_MOSQUE_TOUR.stops) {
    const image = tourStopImage(stop)
    assert.ok(image, stop.id)
    assert.match(image.src, /^https:\/\/thumb\.wikimedia\.org\//)
    assert.ok(image.credit.includes('Wikimedia Commons'), stop.id)
    assert.match(image.credit, /CC BY/)
    assert.ok(image.alt.length > 8, stop.id)
    assert.ok(image.caption.length > 4, stop.id)
    assert.doesNotMatch([image.alt, image.caption, image.credit].join(' '), LEAK)
  }
})

test('istiqlal-mosque tour has official istiqlal.or.id links', () => {
  for (const stop of ISTIQLAL_MOSQUE_TOUR.stops) {
    for (const chip of stop.chips) {
      if (chip.href) {
        assert.match(chip.href, /istiqlal\.or\.id/)
      }
    }
  }
})

test('istiqlal-mosque chapter hrefs are etiquette and getting-there', () => {
  const overview = render('/temple/istiqlal-mosque').html
  assert.match(overview, /href="\/temple\/istiqlal-mosque\/etiquette"/)
  assert.match(overview, /href="\/temple\/istiqlal-mosque\/getting-there"/)
  assert.doesNotMatch(overview, /href="\/temple\/meiji-shrine\/etiquette"/)
  assert.doesNotMatch(overview, /href="\/temple\/fushimi-inari\/etiquette"/)
})

test('istiqlal-mosque visit has no tour href', () => {
  const visit = render('/temple/istiqlal-mosque/visit').html
  assert.doesNotMatch(visit, /href="\/temple\/istiqlal-mosque\/tour"/)
})

test('istiqlal-mosque hours and guide availability', () => {
  const overview = render('/temple/istiqlal-mosque').html
  assert.match(overview, /free admission/i)
  assert.match(overview, /no admission fee/i)
  assert.match(overview, /Official guides.*according to schedule/i)
  assert.doesNotMatch(overview, /ticketsUrl/)
  assert.doesNotMatch(overview, /klook|getyourguide|viator/)
})