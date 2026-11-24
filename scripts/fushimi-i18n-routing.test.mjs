import assert from 'node:assert/strict'
import { test } from 'node:test'
import React from 'react'
import { createJiti } from 'jiti'

globalThis.React = React

const jiti = createJiti(import.meta.url, { jsx: true })
const { parsePath, routeToUrl, inheritLocale } = jiti('../src/lib/router.tsx')

const LOCALES = ['ja', 'zh-hant', 'zh-hans', 'ko', 'es', 'th']
const CHAPTERS = ['visit', 'etiquette', 'getting-there', 'best-time', 'notes']

test('EN Fushimi and sibling tours still parse without a locale', () => {
  assert.deepEqual(parsePath('/temple/fushimi-inari/tour', ''), {
    name: 'temple-tour',
    id: 'fushimi-inari',
  })
  assert.deepEqual(parsePath('/temple/fushimi-inari/tour/', ''), {
    name: 'temple-tour',
    id: 'fushimi-inari',
  })
  assert.equal(parsePath('/temple/fushimi-inari', '').name, 'temple')
  assert.equal(parsePath('/temple/senso-ji/tour/', '').id, 'senso-ji')
  assert.equal(parsePath('/temple/meiji-shrine/tour/', '').id, 'meiji-shrine')
  assert.equal(parsePath('/temple/uluwatu/tour/', '').id, 'uluwatu')
  assert.equal(parsePath('/temple/istiqlal-mosque/tour/', '').id, 'istiqlal-mosque')
  assert.equal(parsePath('/temple/senso-ji/visit', '').chapter, 'visit')
  assert.equal(parsePath('/', '').name, 'home')
  assert.equal(parsePath('/explore', '').name, 'explore')
  assert.equal(parsePath('/about', '').name, 'about')
})

test('six locale prefixes parse Fushimi attraction, chapters, and tour', () => {
  for (const locale of LOCALES) {
    assert.deepEqual(parsePath(`/${locale}/temple/fushimi-inari/`, ''), {
      name: 'temple',
      id: 'fushimi-inari',
      chapter: 'overview',
      locale,
    })
    assert.deepEqual(parsePath(`/${locale}/temple/fushimi-inari/tour/`, ''), {
      name: 'temple-tour',
      id: 'fushimi-inari',
      locale,
    })
    for (const chapter of CHAPTERS) {
      const route = parsePath(`/${locale}/temple/fushimi-inari/${chapter}/`, '')
      assert.equal(route.name, 'temple')
      assert.equal(route.chapter, chapter)
      assert.equal(route.locale, locale)
    }
  }
})

test('locale-prefixed non-Fushimi paths 404, including hubs', () => {
  for (const locale of LOCALES) {
    assert.equal(parsePath(`/${locale}/`, '').name, 'notfound')
    assert.equal(parsePath(`/${locale}/explore`, '').name, 'notfound')
    assert.equal(parsePath(`/${locale}/about`, '').name, 'notfound')
    assert.equal(parsePath(`/${locale}/temple/meiji-shrine/tour/`, '').name, 'notfound')
    assert.equal(parsePath(`/${locale}/temple/uluwatu/visit`, '').name, 'notfound')
    assert.equal(parsePath(`/${locale}/temple/istiqlal-mosque/tour/`, '').name, 'notfound')
    assert.equal(parsePath(`/${locale}/region/east-asia`, '').name, 'notfound')
    assert.equal(parsePath(`/${locale}/religion/shinto`, '').name, 'notfound')
  }
})

test('routeToUrl emits trailing-slash tour hrefs and prefixes only locale Fushimi', () => {
  assert.equal(
    routeToUrl({ name: 'temple-tour', id: 'fushimi-inari' }),
    '/temple/fushimi-inari/tour/',
  )
  assert.equal(
    routeToUrl({ name: 'temple-tour', id: 'senso-ji' }),
    '/temple/senso-ji/tour/',
  )
  for (const locale of LOCALES) {
    assert.equal(
      routeToUrl({ name: 'temple', id: 'fushimi-inari', chapter: 'overview', locale }),
      `/${locale}/temple/fushimi-inari/`,
    )
    assert.equal(
      routeToUrl({ name: 'temple', id: 'fushimi-inari', chapter: 'visit', locale }),
      `/${locale}/temple/fushimi-inari/visit/`,
    )
    assert.equal(
      routeToUrl({ name: 'temple-tour', id: 'fushimi-inari', locale }),
      `/${locale}/temple/fushimi-inari/tour/`,
    )
  }
})

test('Walk / chapter links inherit the current Fushimi locale', () => {
  const current = { name: 'temple', id: 'fushimi-inari', chapter: 'overview', locale: 'ja' }
  const walk = inheritLocale(current, { name: 'temple-tour', id: 'fushimi-inari' })
  assert.deepEqual(walk, { name: 'temple-tour', id: 'fushimi-inari', locale: 'ja' })
  assert.equal(routeToUrl(walk), '/ja/temple/fushimi-inari/tour/')

  const visit = inheritLocale(current, { name: 'temple', id: 'fushimi-inari', chapter: 'visit' })
  assert.equal(visit.locale, 'ja')
  assert.equal(routeToUrl(visit), '/ja/temple/fushimi-inari/visit/')

  const senso = inheritLocale(current, { name: 'temple', id: 'senso-ji', chapter: 'overview' })
  assert.equal(senso.locale, 'ja')
  assert.equal(routeToUrl(senso), '/ja/temple/senso-ji/')
})
