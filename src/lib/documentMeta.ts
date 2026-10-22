import { useEffect } from 'react'
import { TEMPLE_CHAPTERS } from './chapters'
import { getTemple, regionLabel, religionLabel } from './temples'
import type { Route, TempleChapter } from '../types'

const BRAND = 'SanctaWay'
const HOME_TITLE = 'SanctaWay — Visit guides to the world’s sacred places'
const HOME_DESC =
  'SanctaWay — visit guides for temples, churches, mosques, shrines, and sacred places worldwide. Hours, etiquette, how to get there.'

function clip(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  const sp = cut.lastIndexOf(' ')
  return `${(sp > 80 ? cut.slice(0, sp) : cut).trimEnd()}…`
}

function setMetaDescription(content: string) {
  let el = document.querySelector('meta[name="description"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', 'description')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Apply document title + meta description (client-side SPA). */
export function setDocumentMeta(title: string, description: string) {
  document.title = title
  setMetaDescription(description)
}

export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    setDocumentMeta(title, description)
  }, [title, description])
}

function chapterLabel(chapter: TempleChapter): string {
  return TEMPLE_CHAPTERS.find((c) => c.id === chapter)?.label ?? chapter
}

export function metaForRoute(route: Route): { title: string; description: string } {
  switch (route.name) {
    case 'home':
      return { title: HOME_TITLE, description: HOME_DESC }
    case 'explore':
      return {
        title: `Explore sacred places — ${BRAND}`,
        description: clip(
          'Search and filter temples, churches, mosques, shrines, and pilgrimage sites. Every entry opens a full visit guide.',
        ),
      }
    case 'about':
      return {
        title: `About SanctaWay — ${BRAND}`,
        description: clip(
          'SanctaWay is an informational visit-guide atlas for sacred places worldwide — practical hours, dress, etiquette, and routes. Verify before visit.',
        ),
      }
    case 'region': {
      const label = regionLabel(route.slug)
      return {
        title: `Sacred places in ${label} — ${BRAND}`,
        description: clip(
          `Visit guides for key temples, shrines, and houses of worship across ${label}.`,
        ),
      }
    }
    case 'religion': {
      const label = religionLabel(route.slug)
      return {
        title: `${label} places of worship — ${BRAND}`,
        description: clip(
          `Browse ${label.toLowerCase()} sacred sites with practical visit guidance on SanctaWay.`,
        ),
      }
    }
    case 'temple': {
      const temple = getTemple(route.id)
      const chapter = route.chapter ?? 'overview'
      if (!temple) {
        return {
          title: `Place not found — ${BRAND}`,
          description: clip('This place was not found in the SanctaWay atlas.'),
        }
      }
      if (chapter === 'overview') {
        return {
          title: `${temple.name} — ${BRAND}`,
          description: clip(temple.summary),
        }
      }
      const label = chapterLabel(chapter)
      return {
        title: `${label} · ${temple.name} — ${BRAND}`,
        description: clip(`${label} guide for ${temple.name}. ${temple.summary}`),
      }
    }
    default:
      return {
        title: `Page not found — ${BRAND}`,
        description: clip('The page you requested was not found on SanctaWay.'),
      }
  }
}
