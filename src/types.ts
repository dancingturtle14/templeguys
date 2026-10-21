export type EntryType = 'paid' | 'free' | 'donation' | 'verify'

export type TempleOverview = {
  body: string[]
  highlights: string[]
}

export type TempleVisit = {
  intro: string
  hours: string
  tickets: string
  dress: string
  duration: string
  access: string
  tips: string[]
  entryType: EntryType
  ticketsUrl?: string | null
  ticketsLabel?: string | null
  ticketsNote?: string | null
}

export type TempleEtiquette = {
  intro: string
  bullets: string[]
}

export type TempleGettingThere = {
  intro: string
  paragraphs: string[]
  bullets: string[]
}

export type TempleBestTime = {
  intro: string
  paragraphs: string[]
  bullets: string[]
}

export type TempleNotes = {
  intro: string
  bullets: string[]
}

export type Temple = {
  id: string
  name: string
  shortName: string
  location: string
  country: string
  region: string
  regionSlug: string
  religions: string[]
  religionSlugs: string[]
  summary: string
  heroImage: string
  heroCredit: string
  featured: boolean
  quickFacts: {
    founded: string
    patron: string
    unesco: string
    typicalVisit: string
  }
  overview: TempleOverview
  visit: TempleVisit
  etiquette: TempleEtiquette
  gettingThere: TempleGettingThere
  bestTime: TempleBestTime
  notes: TempleNotes
  related: string[]
}

export type TempleChapter =
  | 'overview'
  | 'visit'
  | 'etiquette'
  | 'getting-there'
  | 'best-time'
  | 'notes'

export type Route =
  | { name: 'home' }
  | { name: 'explore'; q?: string; region?: string; religion?: string }
  | { name: 'temple'; id: string; chapter?: TempleChapter }
  | { name: 'region'; slug: string }
  | { name: 'religion'; slug: string }
  | { name: 'about' }
  | { name: 'notfound' }
