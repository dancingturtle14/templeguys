import data from '../data/temples.json'
import type { Temple } from '../types'

export const temples = data as Temple[]

export const regions = [
  { slug: 'southeast-asia', label: 'Southeast Asia' },
  { slug: 'east-asia', label: 'East Asia' },
  { slug: 'south-asia', label: 'South Asia' },
  { slug: 'middle-east', label: 'Middle East' },
  { slug: 'europe', label: 'Europe' },
  { slug: 'americas', label: 'Americas' },
  { slug: 'africa', label: 'Africa' },
] as const

export const religions = [
  { slug: 'buddhist', label: 'Buddhist' },
  { slug: 'hindu', label: 'Hindu' },
  { slug: 'shinto', label: 'Shinto' },
  { slug: 'sikh', label: 'Sikh' },
  { slug: 'islamic', label: 'Islamic' },
  { slug: 'christian', label: 'Christian' },
  { slug: 'taoist', label: 'Taoist' },
  { slug: 'jewish', label: 'Jewish' },
  { slug: 'bahai', label: 'Baháʼí' },
  { slug: 'maya', label: 'Maya' },
  { slug: 'inca', label: 'Inca' },
  { slug: 'andean', label: 'Andean' },
  { slug: 'jain', label: 'Jain' },
  { slug: 'confucian', label: 'Confucian' },
  { slug: 'nabataean', label: 'Nabataean' },
  { slug: 'prehistoric', label: 'Prehistoric' },
  { slug: 'ancient-egyptian', label: 'Ancient Egyptian' },
  { slug: 'ancient-greek', label: 'Ancient Greek' },
  { slug: 'mesoamerican', label: 'Mesoamerican' },
] as const

export function getTemple(id: string) {
  return temples.find((t) => t.id === id)
}

export function templesByRegion(slug: string) {
  return temples.filter((t) => t.regionSlug === slug)
}

export function templesByReligion(slug: string) {
  return temples.filter((t) => t.religionSlugs.includes(slug))
}

export function filterTemples(opts: {
  q?: string
  region?: string
  religion?: string
}) {
  const q = opts.q?.trim().toLowerCase()
  return temples.filter((t) => {
    if (opts.region && t.regionSlug !== opts.region) return false
    if (opts.religion && !t.religionSlugs.includes(opts.religion)) return false
    if (!q) return true
    const hay = `${t.name} ${t.shortName} ${t.location} ${t.country} ${t.region} ${t.religions.join(' ')} ${t.summary}`.toLowerCase()
    return hay.includes(q)
  })
}

export function regionLabel(slug: string) {
  return regions.find((r) => r.slug === slug)?.label ?? slug
}

export function religionLabel(slug: string) {
  return religions.find((r) => r.slug === slug)?.label ?? slug
}
