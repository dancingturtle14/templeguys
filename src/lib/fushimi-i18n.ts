import type { TourStop } from '../data/fushimiInariTour'
import type { Locale, Temple, TempleChapter, TempleVisit } from '../types'
import esData from '../data/fushimi-i18n/es/data.json'
import jaData from '../data/fushimi-i18n/ja/data.json'
import koData from '../data/fushimi-i18n/ko/data.json'
import thData from '../data/fushimi-i18n/th/data.json'
import zhHansData from '../data/fushimi-i18n/zh-hans/data.json'
import zhHantData from '../data/fushimi-i18n/zh-hant/data.json'

export const LOCALES = ['ja', 'zh-hant', 'zh-hans', 'ko', 'es', 'th'] as const
export type { Locale }

export const HTML_LANG_MAP: Record<Locale, string> = {
  ja: 'ja',
  'zh-hant': 'zh-Hant',
  'zh-hans': 'zh-Hans',
  ko: 'ko',
  es: 'es',
  th: 'th',
}

export function getHtmlLang(locale?: Locale | null): string {
  if (!locale) return 'en'
  return HTML_LANG_MAP[locale] || 'en'
}

export function parseLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && (LOCALES as readonly string[]).includes(firstSegment)) {
    return firstSegment as Locale
  }
  return null
}

export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && (LOCALES as readonly string[]).includes(firstSegment)) {
    return '/' + segments.slice(1).join('/')
  }
  return '/' + segments.join('/')
}

export function isFushimiTemple(id: string): boolean {
  return id === 'fushimi-inari'
}

export function isFushimiTour(id: string): boolean {
  return id === 'fushimi-inari'
}

export function getFushimiTourHref(locale: Locale | null | undefined, templeId = 'fushimi-inari'): string {
  if (!locale) return `/temple/${templeId}/tour/`
  return `/${locale}/temple/${templeId}/tour/`
}

export type FushimiCrossroads = {
  heading: string
  body: string
  turnBack: string
  continue: string
  teaser?: string
}

export type FushimiTourFrame = {
  title: string
  documentTitle: string
  lede: string
  officialNote: string
  officialLabel: string
  officialHref: string
  mapsUrl: string
  mapsCta: string
  routeLabel: string
  endCopy: string
  walkCardTitle: string
  walkCardLede: string
  endHeading: string
  walkKicker: string
  crossroads?: FushimiCrossroads
}

export type FushimiI18n = {
  title: string
  meta: string
  h1: string
  locationLine: string
  summary: string
  shortName: string
  quickFacts: Temple['quickFacts']
  overview: Temple['overview']
  visit: TempleVisit
  etiquette: Temple['etiquette']
  gettingThere: Temple['gettingThere']
  bestTime: Temple['bestTime']
  notes: Temple['notes']
  tour: FushimiTourFrame
  stops: TourStop[]
  chrome: Record<string, string>
}

const DATA: Record<Locale, FushimiI18n> = {
  ja: jaData as FushimiI18n,
  'zh-hant': zhHantData as FushimiI18n,
  'zh-hans': zhHansData as FushimiI18n,
  ko: koData as FushimiI18n,
  es: esData as FushimiI18n,
  th: thData as FushimiI18n,
}

export function getFushimiI18n(locale: Locale): FushimiI18n {
  return DATA[locale]
}

export function localizeFushimiTemple(base: Temple, locale: Locale): Temple {
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
      ticketsUrl: 'https://inari.jp/en/access/',
    },
    etiquette: d.etiquette,
    gettingThere: d.gettingThere,
    bestTime: d.bestTime,
    notes: d.notes,
  }
}

export type TourChrome = {
  prev: string
  next: string
  routeLabel: string
  mapsCta: string
  walkProgressAria: string
  walkStopsAria: string
  routeMapAria: string
  enlargePhoto: string
  enlargedPhotoAria: string
  photoPrefix: string
  tapToEnlarge: string
  close: string
  optional: string
  summitLoop: string
  closedUntilOpen: string
  stopPattern: string
  kindMustSee: string
  kindObject: string
  kindStory: string
  kindPractice: string
  whatToLookFor: string
  showEveryReading: string
  endKicker: string
  endHeading: string
  overview: string
  etiquette: string
  gettingThere: string
  crossroadsHeading: string
  crossroadsBody: string
  turnBack: string
  continueTo: string
}

export const DEFAULT_TOUR_CHROME: TourChrome = {
  prev: 'Prev',
  next: 'Next',
  routeLabel: 'Route',
  mapsCta: 'Open walking route in Google Maps',
  walkProgressAria: 'Walk progress',
  walkStopsAria: 'Walk stops',
  routeMapAria: 'Schematic walking route with six stops',
  enlargePhoto: 'Enlarge photo: {alt}',
  enlargedPhotoAria: 'Enlarged photo',
  photoPrefix: 'Photo:',
  tapToEnlarge: 'Tap the photo to enlarge.',
  close: 'Close',
  optional: 'optional',
  summitLoop: 'Summit loop',
  closedUntilOpen: 'Closed until you open it. Continue only if you are going past Yotsutsuji.',
  stopPattern: 'Stop {n}',
  kindMustSee: 'Must-see',
  kindObject: 'Object',
  kindStory: 'Traditional story',
  kindPractice: 'House rule',
  whatToLookFor: 'What to look for',
  showEveryReading: 'Show every reading',
  endKicker: 'End',
  endHeading: 'End of the walk',
  overview: 'Overview',
  etiquette: 'Etiquette',
  gettingThere: 'Getting there',
  crossroadsHeading: 'Your call at the crossroads',
  crossroadsBody:
    'Either choice is a complete visit. Turning back skips the forest circuit. Continuing opens the summit loop.',
  turnBack: 'Turn back down',
  continueTo: 'Continue to Okumiya',
}

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? '')
}

export function tourChromeFor(locale?: Locale): TourChrome {
  if (!locale) return DEFAULT_TOUR_CHROME
  const { chrome, tour } = DATA[locale]
  const xr = tour.crossroads
  return {
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
    summitLoop: chrome.summit_loop || DEFAULT_TOUR_CHROME.summitLoop,
    closedUntilOpen: chrome.closed_until_open || DEFAULT_TOUR_CHROME.closedUntilOpen,
    stopPattern: chrome.stop_pattern || DEFAULT_TOUR_CHROME.stopPattern,
    kindMustSee: chrome.kind_must_see || DEFAULT_TOUR_CHROME.kindMustSee,
    kindObject: chrome.kind_object || DEFAULT_TOUR_CHROME.kindObject,
    kindStory: chrome.kind_story || DEFAULT_TOUR_CHROME.kindStory,
    kindPractice: chrome.kind_practice || DEFAULT_TOUR_CHROME.kindPractice,
    whatToLookFor: chrome.what_to_look_for || DEFAULT_TOUR_CHROME.whatToLookFor,
    showEveryReading: chrome.show_every_reading || DEFAULT_TOUR_CHROME.showEveryReading,
    endKicker: chrome.end_kicker_live || DEFAULT_TOUR_CHROME.endKicker,
    endHeading: tour.endHeading || chrome.end_of_the_walk || DEFAULT_TOUR_CHROME.endHeading,
    overview: chrome.chapter_overview || DEFAULT_TOUR_CHROME.overview,
    etiquette: chrome.chapter_etiquette || DEFAULT_TOUR_CHROME.etiquette,
    gettingThere: chrome.chapter_getting_there || DEFAULT_TOUR_CHROME.gettingThere,
    crossroadsHeading: xr?.heading || chrome.crossroads_heading || DEFAULT_TOUR_CHROME.crossroadsHeading,
    crossroadsBody: xr?.body || DEFAULT_TOUR_CHROME.crossroadsBody,
    turnBack: xr?.turnBack || chrome.turn_back_down || DEFAULT_TOUR_CHROME.turnBack,
    continueTo: xr?.continue || chrome.continue_okumiya || DEFAULT_TOUR_CHROME.continueTo,
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

export function chapterChromeKey(id: TempleChapter): string {
  return CHAPTER_CHROME[id]
}

export function chapterLabelFor(id: TempleChapter, locale?: Locale): string {
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

export const FUSHIMI_I18N_CHAPTERS: TempleChapter[] = [
  'overview',
  'visit',
  'etiquette',
  'getting-there',
  'best-time',
  'notes',
]

export function fushimiI18nPathnames(): string[] {
  const out: string[] = []
  for (const locale of LOCALES) {
    out.push(`/${locale}/temple/fushimi-inari/`)
    for (const chapter of FUSHIMI_I18N_CHAPTERS.slice(1)) {
      out.push(`/${locale}/temple/fushimi-inari/${chapter}/`)
    }
    out.push(`/${locale}/temple/fushimi-inari/tour/`)
  }
  return out
}
