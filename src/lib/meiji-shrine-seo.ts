import type { Route } from '../types'
import meijiShrineSeo from '../data/meiji-shrine-seo.json'

export type MeijiShrineSeoPack = {
  title: string
  meta: string
  keywords: string[]
}

const PACKS = meijiShrineSeo.packs

export function getMeijiShrineSeo(page: string): MeijiShrineSeoPack | null {
  const pack = PACKS.find((p) => p.locale === 'en' && p.page === page)
  if (!pack) return null
  return { title: pack.title, meta: pack.meta, keywords: pack.keywords }
}

/** Document-head SEO for Meiji Shrine only; other routes return null. */
export function meijiShrineSeoFromRoute(route: Route): MeijiShrineSeoPack | null {
  if (route.name === 'temple-tour' && route.id === 'meiji-shrine') {
    return getMeijiShrineSeo('tour')
  }
  if (route.name === 'temple' && route.id === 'meiji-shrine') {
    return getMeijiShrineSeo(route.chapter ?? 'overview')
  }
  return null
}