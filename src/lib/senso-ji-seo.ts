import type { Route } from '../types'
import sensoJiSeo from '../data/senso-ji-seo.json'

export type SensoJiSeoPack = {
  title: string
  meta: string
  keywords: string[]
}

const PACKS = sensoJiSeo.packs

export function getSensoJiSeo(locale: string | undefined, page: string): SensoJiSeoPack | null {
  const effectiveLocale = locale || 'en'
  const pack = PACKS.find((item) => item.locale === effectiveLocale && item.page === page)
  if (!pack) return null
  return { title: pack.title, meta: pack.meta, keywords: pack.keywords }
}

/** Document-head SEO for Sensō-ji only; other routes return null. */
export function sensoJiSeoFromRoute(route: Route): SensoJiSeoPack | null {
  if (route.name === 'temple-tour' && route.id === 'senso-ji') {
    return getSensoJiSeo(route.locale, 'tour')
  }
  if (route.name === 'temple' && route.id === 'senso-ji') {
    return getSensoJiSeo(route.locale, route.chapter ?? 'overview')
  }
  return null
}
