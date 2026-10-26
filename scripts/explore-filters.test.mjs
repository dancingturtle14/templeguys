import assert from 'node:assert/strict'
import { test } from 'node:test'
import React from 'react'
import { createJiti } from 'jiti'

globalThis.React = React

const jiti = createJiti(import.meta.url, { jsx: true })
const { routeForFilters } = jiti('../src/lib/exploreFilters.ts')
const { render } = jiti('../src/entry-server.tsx')

test('text query opens the explore directory', () => {
  assert.deepEqual(routeForFilters({ q: 'Angkor' }), {
    name: 'explore',
    q: 'Angkor',
    region: undefined,
    religion: undefined,
  })
})

test('a region alone uses the region route', () => {
  assert.deepEqual(routeForFilters({ region: 'southeast-asia' }), {
    name: 'region',
    slug: 'southeast-asia',
  })
})

test('a tradition alone uses the religion route', () => {
  assert.deepEqual(routeForFilters({ religion: 'buddhist' }), {
    name: 'religion',
    slug: 'buddhist',
  })
})

test('region and tradition together stay on explore', () => {
  assert.deepEqual(routeForFilters({ region: 'europe', religion: 'christian' }), {
    name: 'explore',
    q: undefined,
    region: 'europe',
    religion: 'christian',
  })
})

test('a text query keeps region and tradition on explore', () => {
  assert.deepEqual(
    routeForFilters({ q: ' kyoto ', region: 'east-asia', religion: 'shinto' }),
    {
      name: 'explore',
      q: 'kyoto',
      region: 'east-asia',
      religion: 'shinto',
    },
  )
})

test('blank text with one facet falls through to the dedicated route', () => {
  assert.deepEqual(routeForFilters({ q: '   ', region: 'africa' }), {
    name: 'region',
    slug: 'africa',
  })
  assert.deepEqual(routeForFilters({ q: '', religion: 'hindu' }), {
    name: 'religion',
    slug: 'hindu',
  })
})

test('empty filters open the unfiltered directory', () => {
  assert.deepEqual(routeForFilters({}), {
    name: 'explore',
    q: undefined,
    region: undefined,
    religion: undefined,
  })
})

test('homepage finder sits between the intro and the stats', () => {
  const html = render('/').html
  const intro = html.indexOf('quiet atlas')
  const finder = html.indexOf('id="place-finder"')
  const places = html.indexOf('>Places<')
  const plate = html.indexOf('Featured plate')
  assert.ok(intro !== -1 && finder !== -1 && places !== -1 && plate !== -1)
  assert.ok(intro < finder && finder < places && places < plate)

  const panel = html.slice(finder, places)
  assert.match(panel, /Find a place/)
  assert.match(panel, /name="q"/)
  assert.match(panel, /Name, city, country/)
  assert.match(panel, /href="\/region\/southeast-asia"/)
  assert.match(panel, /href="\/region\/africa"/)
  assert.match(panel, /href="\/religion\/buddhist"/)
  assert.match(panel, /href="\/religion\/mesoamerican"/)
  assert.match(panel, />Search</)
  assert.doesNotMatch(panel, /Angkor Wat/)
})

test('explore directory keeps filters and place results', () => {
  const html = render('/explore').html
  assert.match(html, /id="place-finder"/)
  assert.match(html, /All regions/)
  assert.match(html, /All traditions/)
  assert.match(html, /href="\/region\/europe"/)
  assert.match(html, /Angkor Wat/)
})

function primaryNav(html) {
  const start = html.indexOf('aria-label="Primary"')
  const end = html.indexOf('</nav>', start)
  assert.ok(start !== -1 && end > start)
  return html.slice(start, end)
}

test('primary nav links explore, region hubs, tradition hubs, and about', () => {
  const nav = primaryNav(render('/').html)
  const explore = nav.indexOf('href="/explore"')
  const regions = nav.indexOf('>Regions<')
  const traditions = nav.indexOf('>Traditions<')
  const about = nav.indexOf('href="/about"')
  assert.ok(explore !== -1 && regions !== -1 && traditions !== -1 && about !== -1)
  assert.ok(explore < regions && regions < traditions && traditions < about)
  assert.match(nav, /href="\/region\/southeast-asia"/)
  assert.match(nav, /href="\/region\/africa"/)
  assert.match(nav, /href="\/religion\/buddhist"/)
  assert.match(nav, /href="\/religion\/mesoamerican"/)
  assert.ok(nav.indexOf('href="/region/africa"') < traditions)
  assert.ok(nav.indexOf('href="/religion/buddhist"') > traditions)
  assert.doesNotMatch(nav, /Countries/)
  assert.doesNotMatch(nav, /Featured/)
})

test('a region hub marks that region in the primary nav, not Explore', () => {
  const nav = primaryNav(render('/region/europe').html)
  assert.match(nav, /href="\/region\/europe"[^>]*aria-current="page"/)
  assert.doesNotMatch(nav, /href="\/explore"[^>]*aria-current="page"/)
})
