import type { TourStop } from '../data/fushimiInariTour'
import type { Locale, Temple, TempleChapter, TempleVisit } from '../types'
import esData from '../data/senso-ji-i18n/es/data.json'
import jaData from '../data/senso-ji-i18n/ja/data.json'
import koData from '../data/senso-ji-i18n/ko/data.json'
import thData from '../data/senso-ji-i18n/th/data.json'
import zhHansData from '../data/senso-ji-i18n/zh-hans/data.json'
import zhHantData from '../data/senso-ji-i18n/zh-hant/data.json'
import {
  DEFAULT_TOUR_CHROME,
  LOCALES,
  type FushimiI18n,
  type FushimiTourFrame,
  type TourChrome,
  getFushimiI18n,
} from './fushimi-i18n'

export { LOCALES, getHtmlLang, parseLocaleFromPath, stripLocaleFromPath } from './fushimi-i18n'
export type { Locale, TourChrome }

export const SENSO_JI_TICKETS_URL = 'https://www.senso-ji.jp/visit/'
export const SENSO_JI_OFFICIAL_HREF = 'https://www.senso-ji.jp/'

export function isSensoJiTemple(id: string): boolean {
  return id === 'senso-ji'
}

export function isLocalizedTemple(id: string): boolean {
  return id === 'fushimi-inari' || id === 'senso-ji'
}

export type SensoJiTourFrame = Omit<FushimiTourFrame, 'crossroads'> & {
  walkHref?: string
}

export type RelatedCardCopy = {
  name: string
  summary: string
}

export type SensoJiI18n = Omit<FushimiI18n, 'tour'> & {
  tour: SensoJiTourFrame
  relatedCards: Record<string, RelatedCardCopy>
}

const DATA: Record<Locale, SensoJiI18n> = {
  ja: jaData as SensoJiI18n,
  'zh-hant': zhHantData as SensoJiI18n,
  'zh-hans': zhHansData as SensoJiI18n,
  ko: koData as SensoJiI18n,
  es: esData as SensoJiI18n,
  th: thData as SensoJiI18n,
}

export function getSensoJiI18n(locale: Locale): SensoJiI18n {
  return DATA[locale]
}

export function localizeSensoJiRelatedCard(base: Temple, locale: Locale): Temple {
  const card = DATA[locale].relatedCards?.[base.id]
  if (!card) return base
  return { ...base, name: card.name, summary: card.summary }
}

export function localizeSensoJiTemple(base: Temple, locale: Locale): Temple {
  const d = DATA[locale]
  return {
    ...base,
    name: d.h1,
    shortName: d.shortName,
    location: d.locationLine,
    summary: d.summary,
    quickFacts: d.quickFacts,
    overview: d.overview,
    visit: {
      ...d.visit,
      entryType: 'verify',
      ticketsUrl: SENSO_JI_TICKETS_URL,
    },
    etiquette: d.etiquette,
    gettingThere: d.gettingThere,
    bestTime: d.bestTime,
    notes: d.notes,
  }
}

export function sensoJiTourChromeFor(locale?: Locale): TourChrome {
  if (!locale) return DEFAULT_TOUR_CHROME
  const { chrome, tour } = DATA[locale]
  return {
    ...DEFAULT_TOUR_CHROME,
    prev: chrome.prev || DEFAULT_TOUR_CHROME.prev,
    next: chrome.next || DEFAULT_TOUR_CHROME.next,
    routeLabel: tour.routeLabel || chrome.route_label || DEFAULT_TOUR_CHROME.routeLabel,
    mapsCta: tour.mapsCta || chrome.maps_cta || DEFAULT_TOUR_CHROME.mapsCta,
    walkProgressAria: chrome.walk_progress_aria || DEFAULT_TOUR_CHROME.walkProgressAria,
    walkStopsAria: chrome.walk_stops_aria || DEFAULT_TOUR_CHROME.walkStopsAria,
    routeMapAria: chrome.route_map_aria || DEFAULT_TOUR_CHROME.routeMapAria,
    enlargePhoto: chrome.enlarge_photo_aria || DEFAULT_TOUR_CHROME.enlargePhoto,
    enlargedPhotoAria: chrome.enlarged_photo_aria || DEFAULT_TOUR_CHROME.enlargedPhotoAria,
    photoPrefix: chrome.photo_prefix || DEFAULT_TOUR_CHROME.photoPrefix,
    tapToEnlarge: chrome.tap_to_enlarge || DEFAULT_TOUR_CHROME.tapToEnlarge,
    close: chrome.close || DEFAULT_TOUR_CHROME.close,
    optional: chrome.optional || DEFAULT_TOUR_CHROME.optional,
    stopPattern: chrome.stop_pattern || DEFAULT_TOUR_CHROME.stopPattern,
    kindMustSee: chrome.must_see || chrome.kind_must_see || DEFAULT_TOUR_CHROME.kindMustSee,
    kindObject: chrome.object || chrome.kind_object || DEFAULT_TOUR_CHROME.kindObject,
    kindStory: chrome.traditional_story || chrome.kind_story || DEFAULT_TOUR_CHROME.kindStory,
    kindPractice: chrome.practice || chrome.kind_practice || DEFAULT_TOUR_CHROME.kindPractice,
    whatToLookFor: chrome.what_to_look_for || DEFAULT_TOUR_CHROME.whatToLookFor,
    showEveryReading: chrome.show_every_reading || DEFAULT_TOUR_CHROME.showEveryReading,
    endHeading:
      tour.endHeading && tour.endHeading !== tour.endCopy
        ? tour.endHeading
        : chrome.end_heading || chrome.end_of_the_walk || DEFAULT_TOUR_CHROME.endHeading,
    overview: chrome.chapter_overview || DEFAULT_TOUR_CHROME.overview,
    etiquette: chrome.chapter_etiquette || DEFAULT_TOUR_CHROME.etiquette,
    gettingThere: chrome.chapter_getting_there || DEFAULT_TOUR_CHROME.gettingThere,
    // Sensō-ji has no Fushimi crossroads / summit loop — keep English defaults
    // only as unused type padding; TourWalk does not render them here.
  }
}

const CHAPTER_CHROME: Record<TempleChapter, string> = {
  overview: 'chapter_overview',
  visit: 'chapter_visit',
  etiquette: 'chapter_etiquette',
  'getting-there': 'chapter_getting_there',
  'best-time': 'chapter_best_time',
  notes: 'chapter_notes',
}

export function sensoJiChapterLabelFor(id: TempleChapter, locale?: Locale): string {
  const fallback: Record<TempleChapter, string> = {
    overview: 'Overview',
    visit: 'Visit',
    etiquette: 'Etiquette',
    'getting-there': 'Getting there',
    'best-time': 'Best time',
    notes: 'Notes',
  }
  if (!locale) return fallback[id]
  return DATA[locale].chrome[CHAPTER_CHROME[id]] || fallback[id]
}

export function sensoJiI18nPathnames(): string[] {
  const chapters: TempleChapter[] = ['visit', 'etiquette', 'getting-there', 'best-time', 'notes']
  const out: string[] = []
  for (const locale of LOCALES) {
    out.push(`/${locale}/temple/senso-ji/`)
    for (const chapter of chapters) out.push(`/${locale}/temple/senso-ji/${chapter}/`)
    out.push(`/${locale}/temple/senso-ji/tour/`)
  }
  return out
}

/** Site chrome (skip link, nav, tickets, chapter labels) for the current temple. */
export function shellChrome(locale?: Locale, templeId?: string): Record<string, string> | null {
  if (!locale) return null
  if (templeId === 'senso-ji') return getSensoJiI18n(locale).chrome
  return getFushimiI18n(locale).chrome
}

export type { TempleVisit, TourStop }
