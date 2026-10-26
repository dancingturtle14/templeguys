import type { Route } from '../types'

export type PlaceFilters = {
  q?: string
  region?: string
  religion?: string
}

/** Same destinations as the explore directory: a single facet uses its route. */
export function routeForFilters(next: PlaceFilters): Route {
  const region = next.region || undefined
  const religion = next.religion || undefined
  const q = next.q?.trim() || undefined

  if (!q && region && !religion) return { name: 'region', slug: region }
  if (!q && religion && !region) return { name: 'religion', slug: religion }
  return { name: 'explore', q, region, religion }
}
