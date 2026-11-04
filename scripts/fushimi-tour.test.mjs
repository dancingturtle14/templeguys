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
const { FUSHIMI_INARI_TOUR, FUSHIMI_INARI_TOUR_ID } = jiti('../src/data/fushimiInariTour.ts')

const STOP_IDS = [
  'arrival',
  'senbon-torii',
  'path-pauses',
  'yotsutsuji',
  'summit',
  'descent',
]

const LEAK = /Soft Soft|Soft-home|NO_CTA|consecrat/i

test('fushimi tour route is its own path and does not become a global chapter', () => {
  assert.deepEqual(parsePath('/temple/fushimi-inari/tour', ''), {
    name: 'temple-tour',
    id: 'fushimi-inari',
  })
  assert.equal(parsePath('/temple/fushimi-inari', '').name, 'temple')
  assert.equal(parsePath('/temple/fushimi-inari/visit', '').chapter, 'visit')
  assert.deepEqual(parsePath('/temple/blue-mosque/tour', ''), {
    name: 'temple-tour',
    id: 'blue-mosque',
  })
})

test('tour data is six stable stops, summit optional, factual copy only', () => {
  assert.equal(FUSHIMI_INARI_TOUR_ID, 'fushimi-inari')
  assert.deepEqual(
    FUSHIMI_INARI_TOUR.stops.map((stop) => stop.id),
    STOP_IDS,
  )
  assert.deepEqual(
    FUSHIMI_INARI_TOUR.stops.filter((stop) => stop.optional).map((stop) => stop.id),
    ['summit'],
  )
  for (const stop of FUSHIMI_INARI_TOUR.stops) {
    assert.ok(stop.sentences.length >= 2 && stop.sentences.length <= 4, stop.id)
    assert.ok(stop.checkpoints.length >= 2 && stop.checkpoints.length <= 4, stop.id)
    assert.ok(stop.checkpoints.some((item) => item.kind === 'must-see'), stop.id)
    for (const item of stop.checkpoints) {
      if (item.kind === 'must-see') assert.ok((item.lookFor?.length ?? 0) >= 3, item.id)
    }
    assert.ok(
      stop.checkpoints.some((item) => item.kind === (stop.id === 'descent' ? 'practice' : 'story')),
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

test('tour page renders the walk, quiet stubs, and a closed summit', () => {
  const { html, title } = render('/temple/fushimi-inari/tour')
  assert.match(title, /Fushimi Inari/)
  assert.match(html, /Fushimi Inari on foot/)
  assert.match(html, /aria-label="Walk stops"/)
  assert.match(html, />Skip</)
  assert.match(html, /href="#tour-end"/)
  assert.doesNotMatch(html, /<audio[\s>]/)
  assert.doesNotMatch(html, LEAK)

  for (const id of STOP_IDS) {
    assert.match(html, new RegExp(`id="${id}"`))
    assert.match(html, new RegExp(`data-voice="quiet"[^>]*data-stop-id="${id}"`))
    assert.match(html, new RegExp(`href="#${id}"`))
  }

  const summitOpen = html.match(/<details\b[^>]*\bid="summit"[^>]*>/)
  assert.ok(summitOpen, 'summit disclosure missing')
  assert.doesNotMatch(summitOpen[0], /\sopen(?:=|\s|>)/)
  const summitAt = html.indexOf(summitOpen[0])
  const summit = html.slice(summitAt, html.indexOf('</details>', summitAt))
  assert.match(summit, /fetchpriority="low"/i)
  assert.match(html, /fetchpriority="high"/i)
  assert.match(html, /Yotsutsuji/)
  assert.match(html, /Okumiya/)
  assert.match(html, />Must-see</)
  assert.match(html, /What to look for/)
  assert.match(html, /Enlarge photo/)
  assert.match(html, /Your call at the crossroads/)
  assert.match(html, /aria-label="Walk progress"/)
  assert.match(html, /Show every reading/)
  assert.match(html, /Traditional story/)
  assert.match(html, /House rule/)
  assert.match(html, /id="arrival-romon"/)
  assert.match(html, /Toyotomi Hideyoshi/)
  assert.match(html, /id="senbon-pillars"/)
  assert.match(html, /id="pauses-otsuka"/)
  assert.match(html, /id="summit-omokaru"/)
  assert.match(html, /omokaru/)
  assert.match(html, /href="\/temple\/fushimi-inari\/etiquette"/)
  assert.match(html, /href="\/temple\/fushimi-inari\/getting-there"/)
  assert.match(html, /https:\/\/inari\.jp\/en\//)
})

test('overview keeps its copy and adds one tour card; other places do not', () => {
  const overview = render('/temple/fushimi-inari').html
  assert.match(
    overview,
    /Fushimi Inari Taisha is the head shrine of Inari in southern Kyoto/,
  )
  assert.match(overview, /href="\/temple\/fushimi-inari\/tour"/)
  assert.equal(overview.match(/href="\/temple\/fushimi-inari\/tour"/g).length, 1)

  const visit = render('/temple/fushimi-inari/visit').html
  assert.doesNotMatch(visit, /href="\/temple\/fushimi-inari\/tour"/)

  const other = render('/temple/blue-mosque').html
  assert.doesNotMatch(other, /\/tour"/)
  assert.match(render('/temple/blue-mosque/tour').html, /Page not found/)
})

test('sitemap lists the tour so the draft prerenders', () => {
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  const paths = sitemapPathnames(xml)
  assert.ok(paths.includes('/temple/fushimi-inari/tour'))
})
