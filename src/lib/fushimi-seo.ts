import type { Route } from '../types'
import fushimiSeo from '../data/fushimi-seo.json'

export type FushimiSeoPack = {
  title: string
  meta: string
  keywords: string[]
}

const PACKS = fushimiSeo.packs

export function getFushimiSeo(locale: string | undefined, page: string): FushimiSeoPack | null {
  const effectiveLocale = locale || 'en'
  const pack = PACKS.find((p) => p.locale === effectiveLocale && p.page === page)
  if (!pack) return null
  return { title: pack.title, meta: pack.meta, keywords: pack.keywords }
}

/** Document-head SEO for Fushimi Inari only; other routes return null. */
export function fushimiSeoFromRoute(route: Route): FushimiSeoPack | null {
  if (route.name === 'temple-tour' && route.id === 'fushimi-inari') {
    return getFushimiSeo(route.locale, 'tour')
  }
  if (route.name === 'temple' && route.id === 'fushimi-inari') {
    return getFushimiSeo(route.locale, route.chapter ?? 'overview')
  }
  return null
}
