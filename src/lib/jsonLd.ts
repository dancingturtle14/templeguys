import { TEMPLE_CHAPTERS } from './chapters'
import { getTemple } from './temples'
import type { Route, Temple, TempleChapter } from '../types'

export const SITE = 'https://sanctaway.com'

type JsonLdNode = Record<string, unknown>

function chapterLabel(chapter: TempleChapter): string {
  return TEMPLE_CHAPTERS.find((c) => c.id === chapter)?.label ?? chapter
}

function isHttpUrl(value: string | null | undefined): value is string {
  if (!value) return false
  try {
    const u = new URL(value)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

/** Build TouristAttraction + BreadcrumbList from existing temple fields only. */
export function templeJsonLd(
  temple: Temple,
  chapter: TempleChapter = 'overview',
): { '@context': string; '@graph': JsonLdNode[] } {
  const pageUrl = `${SITE}/temple/${temple.id}`
  const placeId = `${pageUrl}#place`

  const image: JsonLdNode | string = temple.heroCredit
    ? {
        '@type': 'ImageObject',
        url: temple.heroImage,
        creditText: temple.heroCredit,
      }
    : temple.heroImage

  const attraction: JsonLdNode = {
    '@type': 'TouristAttraction',
    '@id': placeId,
    name: temple.name,
    description: temple.summary,
    url: pageUrl,
    image,
    address: {
      '@type': 'PostalAddress',
      addressCountry: temple.country,
      addressLocality: temple.location,
    },
  }

  if (temple.religions?.length) {
    attraction.keywords = temple.religions.join(', ')
  }

  // Honest free-entry only — omit for paid/donation/verify (no invented false).
  if (temple.visit?.entryType === 'free') {
    attraction.isAccessibleForFree = true
  }

  // Optional official tickets EntryPoint — never invent price/currency/ratings.
  if (isHttpUrl(temple.visit?.ticketsUrl)) {
    attraction.potentialAction = {
      '@type': 'ViewAction',
      name: temple.visit.ticketsLabel || 'Official tickets / visitor info',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: temple.visit.ticketsUrl,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
    }
  }

  const crumbs: { name: string; item: string }[] = [
    { name: 'Home', item: `${SITE}/` },
    { name: 'Explore', item: `${SITE}/explore` },
    { name: temple.name, item: pageUrl },
  ]
  if (chapter !== 'overview') {
    crumbs.push({
      name: chapterLabel(chapter),
      item: `${pageUrl}/${chapter}`,
    })
  }

  const breadcrumb: JsonLdNode = {
    '@type': 'BreadcrumbList',
    '@id': `${chapter === 'overview' ? pageUrl : `${pageUrl}/${chapter}`}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [attraction, breadcrumb],
  }
}

/** JSON-LD for the current route. Temple pages only (requirement). */
export function jsonLdForRoute(route: Route): ReturnType<typeof templeJsonLd> | null {
  if (route.name !== 'temple') return null
  const temple = getTemple(route.id)
  if (!temple) return null
  return templeJsonLd(temple, route.chapter ?? 'overview')
}
