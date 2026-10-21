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
  visitGuide: {
    practical: {
      hours: string
      tickets: string
      dress: string
      duration: string
    }
    etiquette: string[]
    gettingThere: string
    bestTime: string
    notes: string[]
  }
  related: string[]
}

export type Route =
  | { name: 'home' }
  | { name: 'explore'; q?: string; region?: string; religion?: string }
  | { name: 'temple'; id: string }
  | { name: 'region'; slug: string }
  | { name: 'religion'; slug: string }
  | { name: 'about' }
  | { name: 'notfound' }
