import type { Route } from '../types'
import istiqlalMosqueSeo from '../data/istiqlal-mosque-seo.json'

export type IstiqlalMosqueSeoPack = {
  title: string
  meta: string
  keywords: string[]
}

const PACKS = istiqlalMosqueSeo.packs

export function getIstiqlalMosqueSeo(page: string): IstiqlalMosqueSeoPack | null {
  const pack = PACKS.find((p) => p.locale === 'en' && p.page === page)
  if (!pack) return null
  return { title: pack.title, meta: pack.meta, keywords: pack.keywords }
}

export function istiqlalMosqueSeoFromRoute(route: Route): IstiqlalMosqueSeoPack | null {
  if (route.name === 'temple-tour' && route.id === 'istiqlal-mosque') {
    return getIstiqlalMosqueSeo('tour')
  }
  if (route.name === 'temple' && route.id === 'istiqlal-mosque') {
    return getIstiqlalMosqueSeo(route.chapter ?? 'overview')
  }
  return null
}