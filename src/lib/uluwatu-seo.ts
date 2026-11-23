import type { Route } from '../types'
import uluwatuSeo from '../data/uluwatu-seo.json'

export type UluwatuSeoPack = {
  title: string
  meta: string
  keywords: string[]
}

const PACKS = uluwatuSeo.packs

export function getUluwatuSeo(page: string): UluwatuSeoPack | null {
  const pack = PACKS.find((p) => p.locale === 'en' && p.page === page)
  if (!pack) return null
  return { title: pack.title, meta: pack.meta, keywords: pack.keywords }
}

export function uluwatuSeoFromRoute(route: Route): UluwatuSeoPack | null {
  if (route.name === 'temple-tour' && route.id === 'uluwatu') {
    return getUluwatuSeo('tour')
  }
  if (route.name === 'temple' && route.id === 'uluwatu') {
    return getUluwatuSeo(route.chapter ?? 'overview')
  }
  return null
}