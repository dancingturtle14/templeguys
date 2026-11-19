import type { Locale, TempleChapter } from '../types'
import { chapterLabelFor } from './fushimi-i18n'

export const TEMPLE_CHAPTERS: {
  id: TempleChapter
  label: string
  short: string
}[] = [
  { id: 'overview', label: 'Overview', short: 'Overview' },
  { id: 'visit', label: 'Visit', short: 'Visit' },
  { id: 'etiquette', label: 'Etiquette', short: 'Etiquette' },
  { id: 'getting-there', label: 'Getting there', short: 'Getting there' },
  { id: 'best-time', label: 'Best time', short: 'Best time' },
  { id: 'notes', label: 'Notes', short: 'Notes' },
]

export function chaptersFor(locale?: Locale) {
  if (!locale) return TEMPLE_CHAPTERS
  return TEMPLE_CHAPTERS.map((c) => {
    const label = chapterLabelFor(c.id, locale)
    return { ...c, label, short: label }
  })
}

export function chapterIndex(id: TempleChapter) {
  return TEMPLE_CHAPTERS.findIndex((c) => c.id === id)
}

export function adjacentChapters(id: TempleChapter, locale?: Locale) {
  const list = chaptersFor(locale)
  const i = list.findIndex((c) => c.id === id)
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
  }
}
