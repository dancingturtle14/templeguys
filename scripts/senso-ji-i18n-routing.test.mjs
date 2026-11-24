import assert from 'node:assert/strict'
import { test } from 'node:test'
import React from 'react'
import { createJiti } from 'jiti'

globalThis.React = React

const jiti = createJiti(import.meta.url, { jsx: true })
const { parsePath, routeToUrl, inheritLocale } = jiti('../src/lib/router.tsx')

const LOCALES = ['ja', 'zh-hant', 'zh-hans', 'ko', 'es', 'th']
const CHAPTERS = ['visit', 'etiquette', 'getting-there', 'best-time', 'notes']

test('six locale prefixes parse Sensō-ji attraction, chapters, and tour', () => {
  for (const locale of LOCALES) {
    assert.deepEqual(parsePath(`/${locale}/temple/senso-ji/`, ''), {
      name: 'temple',
      id: 'senso-ji',
      chapter: 'overview',
      locale,
    })
    assert.deepEqual(parsePath(`/${locale}/temple/senso-ji/tour/`, ''), {
      name: 'temple-tour',
      id: 'senso-ji',
      locale,
    })
    for (const chapter of CHAPTERS) {
      const route = parsePath(`/${locale}/temple/senso-ji/${chapter}/`, '')
      assert.equal(route.name, 'temple')
      assert.equal(route.id, 'senso-ji')
      assert.equal(route.chapter, chapter)
      assert.equal(route.locale, locale)
    }
  }
})

test('routeToUrl prefixes only localized temples under a locale', () => {
  for (const locale of LOCALES) {
    assert.equal(
      routeToUrl({ name: 'temple', id: 'senso-ji', chapter: 'overview', locale }),
      `/${locale}/temple/senso-ji/`,
    )
    assert.equal(
      routeToUrl({ name: 'temple', id: 'senso-ji', chapter: 'visit', locale }),
      `/${locale}/temple/senso-ji/visit/`,
    )
    assert.equal(
      routeToUrl({ name: 'temple-tour', id: 'senso-ji', locale }),
      `/${locale}/temple/senso-ji/tour/`,
    )
    assert.equal(
      routeToUrl({ name: 'temple-tour', id: 'meiji-shrine', locale }),
      '/temple/meiji-shrine/tour/',
    )
  }
})

test('Walk and chapter links inherit the current Sensō-ji locale', () => {
  const current = { name: 'temple', id: 'senso-ji', chapter: 'overview', locale: 'ja' }
  const walk = inheritLocale(current, { name: 'temple-tour', id: 'senso-ji' })
  assert.deepEqual(walk, { name: 'temple-tour', id: 'senso-ji', locale: 'ja' })
  assert.equal(routeToUrl(walk), '/ja/temple/senso-ji/tour/')

  const visit = inheritLocale(current, { name: 'temple', id: 'senso-ji', chapter: 'visit' })
  assert.equal(visit.locale, 'ja')
  assert.equal(routeToUrl(visit), '/ja/temple/senso-ji/visit/')

  const fushimi = inheritLocale(current, { name: 'temple', id: 'fushimi-inari', chapter: 'overview' })
  assert.equal(fushimi.locale, 'ja')
  assert.equal(routeToUrl(fushimi), '/ja/temple/fushimi-inari/')

  const meiji = inheritLocale(current, { name: 'temple', id: 'meiji-shrine', chapter: 'overview' })
  assert.equal(meiji.locale, undefined)
  assert.equal(routeToUrl(meiji), '/temple/meiji-shrine/')
})
