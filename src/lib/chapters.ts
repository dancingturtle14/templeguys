import type { TempleChapter } from '../types'

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

export function chapterIndex(id: TempleChapter) {
  return TEMPLE_CHAPTERS.findIndex((c) => c.id === id)
}

export function adjacentChapters(id: TempleChapter) {
  const i = chapterIndex(id)
  return {
    prev: i > 0 ? TEMPLE_CHAPTERS[i - 1] : null,
    next: i >= 0 && i < TEMPLE_CHAPTERS.length - 1 ? TEMPLE_CHAPTERS[i + 1] : null,
  }
}
