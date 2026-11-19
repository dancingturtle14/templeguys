import { useEffect } from 'react'
import { chapterLabelFor } from './fushimi-i18n'
import { TEMPLE_CHAPTERS } from './chapters'
import { getFushimiI18n } from './fushimi-i18n'
import { getTemple, regionLabel, religionLabel } from './temples'
import type { Locale, Route, TempleChapter } from '../types'

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

function chapterLabel(chapter: TempleChapter, locale?: Locale): string {
  if (locale) return chapterLabelFor(chapter, locale)
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
    case 'temple-tour': {
      if (route.id === 'fushimi-inari') {
        if (route.locale) {
          const i18n = getFushimiI18n(route.locale)
          return {
            title: i18n.tour.documentTitle,
            description: clip(i18n.tour.lede),
          }
        }
        return {
          title: `On foot · Fushimi Inari Taisha — ${BRAND}`,
          description: clip(
            'Stop-by-step walk at Fushimi Inari Taisha, from Inari Station to the Yotsutsuji turnaround. The summit loop stays optional.',
          ),
        }
      }
      if (route.id === 'senso-ji') {
        return {
          title: `On foot · Sensō-ji — ${BRAND}`,
          description: clip(
            'Stop-by-step walk at Sensō-ji in Asakusa, from Kaminarimon along Nakamise to the Hondo and the five-storied pagoda.',
          ),
        }
      }
      if (route.id === 'meiji-shrine') {
        return {
          title: `On foot · Meiji Jingū — ${BRAND}`,
          description: clip(
            'Stop-by-step walk at Meiji Jingū, from the Harajuku entrance along Minami-sandō to the main shrine, with the Inner Garden as a paid last stop.',
          ),
        }
      }
      if (route.id === 'uluwatu') {
        return {
          title: `On foot · Pura Luhur Uluwatu — ${BRAND}`,
          description: clip(
            'Stop-by-step walk at Pura Luhur Uluwatu, Bali, from the main gate along cliffside pathways to the Kecak amphitheatre.',
          ),
        }
      }
      if (route.id === 'istiqlal-mosque') {
        return {
          title: `On foot · Istiqlal Mosque — ${BRAND}`,
          description: clip(
            'Stop-by-step walk at Istiqlal Mosque in Jakarta, from the main gate along upper hallways to the inner courtyard.',
          ),
        }
      }
      return {
        title: `Page not found — ${BRAND}`,
        description: clip('That path is not on the SanctaWay atlas.'),
      }
    }
    case 'temple': {
      const chapter = route.chapter ?? 'overview'
      if (route.id === 'fushimi-inari' && route.locale) {
        const i18n = getFushimiI18n(route.locale)
        if (chapter === 'overview') {
          return { title: i18n.title, description: clip(i18n.meta || i18n.summary) }
        }
        const label = chapterLabel(chapter, route.locale)
        return {
          title: `${label} · ${i18n.h1} — ${BRAND}`,
          description: clip(`${label}. ${i18n.meta || i18n.summary}`),
        }
      }
      const temple = getTemple(route.id)
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
