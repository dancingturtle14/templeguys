import type { Route } from '../types'
import sensoJiSeo from '../data/senso-ji-seo.json'

export type SensoJiSeoPack = {
  title: string
  meta: string
  keywords: string[]
}

const PACKS = sensoJiSeo.packs

export function getSensoJiSeo(page: string): SensoJiSeoPack | null {
  const pack = PACKS.find((p) => p.locale === 'en' && p.page === page)
  if (!pack) return null
  return { title: pack.title, meta: pack.meta, keywords: pack.keywords }
}

/** Document-head SEO for Sensō-ji only; other routes return null. */
export function sensoJiSeoFromRoute(route: Route): SensoJiSeoPack | null {
  if (route.name === 'temple-tour' && route.id === 'senso-ji') {
    return getSensoJiSeo('tour')
  }
  if (route.name === 'temple' && route.id === 'senso-ji') {
    return getSensoJiSeo(route.chapter ?? 'overview')
  }
  return null
}
