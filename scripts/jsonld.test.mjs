import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)
const { templeJsonLd, jsonLdForRoute, SITE } = jiti('../src/lib/jsonLd.ts')
const require = createRequire(import.meta.url)
const temples = require('../src/data/temples.json')

test('SITE is sanctaway.com', () => {
  assert.equal(SITE, 'https://sanctaway.com')
})

test('templeJsonLd emits TouristAttraction + BreadcrumbList without invented Offers', () => {
  const angkor = temples.find((t) => t.id === 'angkor-wat')
  assert.ok(angkor)
  const doc = templeJsonLd(angkor, 'overview')
  assert.equal(doc['@context'], 'https://schema.org')
  const types = doc['@graph'].map((n) => n['@type'])
  assert.deepEqual(types, ['TouristAttraction', 'BreadcrumbList'])

  const place = doc['@graph'][0]
  assert.equal(place['@id'], `${SITE}/temple/angkor-wat#place`)
  assert.equal(place.name, 'Angkor Wat')
  assert.equal(place.url, `${SITE}/temple/angkor-wat`)
  assert.equal(place.description, angkor.summary)
  assert.equal(place.address.addressCountry, 'Cambodia')
  assert.equal(place.address.addressLocality, angkor.location)
  assert.equal(place.isAccessibleForFree, undefined)
  assert.ok(!('offers' in place) && !('aggregateRating' in place))
  assert.ok(!JSON.stringify(place).includes('"price"'))
  assert.equal(place.potentialAction?.target?.urlTemplate, angkor.visit.ticketsUrl)

  const crumbs = doc['@graph'][1].itemListElement
  assert.equal(crumbs.length, 3)
  assert.equal(crumbs[0].name, 'Home')
  assert.equal(crumbs[2].item, `${SITE}/temple/angkor-wat`)
})

test('chapter crumb appends when not overview', () => {
  const angkor = temples.find((t) => t.id === 'angkor-wat')
  const doc = templeJsonLd(angkor, 'visit')
  const crumbs = doc['@graph'][1].itemListElement
  assert.equal(crumbs.length, 4)
  assert.equal(crumbs[3].name, 'Visit')
  assert.equal(crumbs[3].item, `${SITE}/temple/angkor-wat/visit`)
})

test('isAccessibleForFree only when entryType is free', () => {
  const free = temples.find((t) => t.visit.entryType === 'free')
  const paid = temples.find((t) => t.visit.entryType === 'paid')
  assert.equal(templeJsonLd(free)['@graph'][0].isAccessibleForFree, true)
  assert.equal(templeJsonLd(paid)['@graph'][0].isAccessibleForFree, undefined)
})

test('jsonLdForRoute only for known temples', () => {
  assert.ok(jsonLdForRoute({ name: 'temple', id: 'shwedagon', chapter: 'overview' }))
  assert.equal(jsonLdForRoute({ name: 'home' }), null)
  assert.equal(jsonLdForRoute({ name: 'temple', id: 'no-such-place' }), null)
})
