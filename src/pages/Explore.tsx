import { useEffect, useMemo, useState } from 'react'
import { AdSlot } from '../components/AdSlot'
import { Chip } from '../components/Chip'
import { TempleCard } from '../components/TempleCard'
import { useRouter } from '../lib/router'
import { filterTemples, regionLabel, regions, religionLabel, religions } from '../lib/temples'

export function ExplorePage({
  initialQ,
  initialRegion,
  initialReligion,
  heading,
  intro,
}: {
  initialQ?: string
  initialRegion?: string
  initialReligion?: string
  heading?: string
  intro?: string
}) {
  const { navigate } = useRouter()
  const [q, setQ] = useState(initialQ ?? '')
  const region = initialRegion
  const religion = initialReligion

  useEffect(() => {
    setQ(initialQ ?? '')
  }, [initialQ, initialRegion, initialReligion])

  const results = useMemo(
    () => filterTemples({ q, region, religion }),
    [q, region, religion],
  )

  function pushFilters(next: { q?: string; region?: string; religion?: string }) {
    const nextRegion = next.region
    const nextReligion = next.religion
    const nextQ = next.q?.trim() || undefined

    if (!nextQ && nextRegion && !nextReligion) {
      navigate({ name: 'region', slug: nextRegion })
      return
    }
    if (!nextQ && nextReligion && !nextRegion) {
      navigate({ name: 'religion', slug: nextReligion })
      return
    }
    navigate({
      name: 'explore',
      q: nextQ,
      region: nextRegion,
      religion: nextReligion,
    })
  }

  const title =
    heading ??
    (region
      ? `Sacred places in ${regionLabel(region)}`
      : religion
        ? `${religionLabel(religion)} places of worship`
        : 'Explore sacred places')

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="max-w-2xl border-b border-line pb-8">
        <p className="text-[0.7rem] font-semibold uppercase text-cinnabar">Directory</p>
        <h1 className="mt-3 font-display text-4xl text-balance sm:text-5xl">{title}</h1>
        <p className="mt-4 text-pretty text-ink-soft">
          {intro ??
            'Search and filter temples, churches, mosques, shrines, and pilgrimage sites. Every entry opens a full visit guide.'}
        </p>
      </header>

      <div className="mt-8 space-y-5 border border-line bg-paper-deep/50 p-4 sm:p-6">
        <label className="block">
          <span className="text-sm font-medium text-ink-soft">Search</span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              const value = e.target.value
              setQ(value)
              pushFilters({ q: value, region, religion })
            }}
            placeholder="Name, city, country…"
            className="mt-1.5 w-full border border-line bg-paper px-3.5 py-2.5 text-ink outline-none placeholder:text-ink-muted focus:border-cinnabar"
          />
        </label>

        <div>
          <p className="text-sm font-medium text-ink-soft">Region</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip active={!region} onClick={() => pushFilters({ q, region: undefined, religion })}>
              All regions
            </Chip>
            {regions.map((r) => (
              <Chip
                key={r.slug}
                active={region === r.slug}
                onClick={() => pushFilters({ q, region: r.slug, religion })}
              >
                {r.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft">Tradition</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip
              active={!religion}
              onClick={() => pushFilters({ q, region, religion: undefined })}
            >
              All traditions
            </Chip>
            {religions.map((r) => (
              <Chip
                key={r.slug}
                active={religion === r.slug}
                onClick={() => pushFilters({ q, region, religion: r.slug })}
              >
                {r.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-ink-muted">
        <span className="tabular-nums font-medium text-ink">{results.length}</span> place
        {results.length === 1 ? '' : 's'}
      </p>

      {results.length === 0 ? (
        <div className="mt-8 border border-line bg-paper p-10 text-center">
          <p className="font-display text-2xl">No places match</p>
          <p className="mt-2 text-ink-soft">Clear filters or try another search term.</p>
          <button
            type="button"
            className="mt-5 bg-ink px-4 py-2 text-sm font-semibold text-paper"
            onClick={() => {
              setQ('')
              navigate({ name: 'explore' })
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t, i) => (
            <TempleCard key={t.id} temple={t} defer={i > 5} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <AdSlot label="Directory" />
      </div>
    </div>
  )
}
