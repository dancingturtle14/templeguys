import { useState } from 'react'
import { AdSlot } from '../components/AdSlot'
import { ExploreFilters } from '../components/ExploreFilters'
import { TempleCard } from '../components/TempleCard'
import { TempleImage } from '../components/TempleImage'
import { routeForFilters } from '../lib/exploreFilters'
import { Link, useRouter } from '../lib/router'
import { regions, religions, temples } from '../lib/temples'

export function HomePage() {
  const { navigate } = useRouter()
  const [q, setQ] = useState('')
  const featured = temples.filter((t) => t.featured)
  const lead = featured[0] ?? temples[0]
  const secondary = featured.slice(1, 4)
  const more = featured.slice(4, 7)

  return (
    <>
      {/* Masthead / asymmetric hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
          <p className="text-[0.7rem] font-semibold uppercase text-cinnabar">
            Visit guides · Worldwide
          </p>
          <div className="mt-4 grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h1 className="font-display text-[2.75rem] leading-[1.05] text-balance text-ink sm:text-6xl lg:text-[4.25rem]">
                Arrive prepared.
                <br />
                <span className="italic text-ink-soft">Leave respectful.</span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="max-w-md text-pretty text-ink-soft">
                SanctaWay is a quiet atlas of temples, churches, mosques, shrines, and pilgrimage
                sites — hours, dress, etiquette, and how to get there.
              </p>
            </div>
          </div>

          <ExploreFilters
            className="mt-8"
            heading="Find a place"
            q={q}
            showClear={false}
            onDraft={setQ}
            onChange={(next) => {
              setQ(next.q ?? '')
              navigate(routeForFilters(next))
            }}
          />

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line py-6 text-sm">
            <div>
              <dt className="text-ink-muted">Places</dt>
              <dd className="mt-0.5 font-display text-3xl tabular-nums text-ink">{temples.length}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Regions</dt>
              <dd className="mt-0.5 font-display text-3xl tabular-nums text-ink">{regions.length}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Traditions</dt>
              <dd className="mt-0.5 font-display text-3xl tabular-nums text-ink">{religions.length}</dd>
            </div>
          </dl>
        </div>

        {/* Lead plate */}
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            to={{ name: 'temple', id: lead.id }}
            className="group relative block overflow-hidden border border-line no-underline"
          >
            <TempleImage
              src={lead.heroImage}
              alt={lead.name}
              priority
              aspect="hero"
              className="min-h-72 lg:min-h-[28rem]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-ink/80 p-5 pt-16 text-paper sm:p-8 sm:pt-24">
              <p className="text-[0.65rem] font-semibold uppercase text-cinnabar-wash">Featured plate</p>
              <p className="mt-2 font-display text-3xl text-balance sm:text-4xl">{lead.name}</p>
              <p className="mt-1 text-sm text-paper/70">{lead.location}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Editorial featured list — not 3 equal cards */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <h2 className="font-display text-3xl text-balance sm:text-4xl">On the atlas</h2>
            <p className="mt-2 text-ink-soft">A first circuit across continents and traditions.</p>
          </div>
          <Link to={{ name: 'explore' }} className="text-sm font-semibold text-cinnabar hover:text-ink">
            View all →
          </Link>
        </div>

        <div className="mt-10 space-y-12">
          {secondary[0] && <TempleCard temple={secondary[0]} variant="featured" defer={false} />}
          <div className="grid gap-0 border-t border-line md:grid-cols-2 md:gap-10">
            {secondary.slice(1).map((t) => (
              <TempleCard key={t.id} temple={t} variant="row" />
            ))}
          </div>
          {more.length > 0 && (
            <div className="grid gap-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((t, i) => (
                <TempleCard key={t.id} temple={t} defer={i > 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Region index — atlas panels */}
      <section className="border-y border-line bg-paper-deep/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-balance sm:text-4xl">By region</h2>
          <p className="mt-2 max-w-xl text-ink-soft">
            Index the world the way a guidebook folds a map — pick a band of earth, then a place.
          </p>
          <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((r) => {
              const count = temples.filter((t) => t.regionSlug === r.slug).length
              return (
                <li key={r.slug} className="bg-paper">
                  <Link
                    to={{ name: 'region', slug: r.slug }}
                    className="flex items-baseline justify-between gap-4 px-5 py-5 no-underline transition-colors duration-150 ease-out hover:bg-cinnabar-wash/40"
                  >
                    <span className="font-display text-xl text-ink">{r.label}</span>
                    <span className="tabular-nums text-sm text-ink-muted">{count}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <h2 className="mt-14 font-display text-3xl text-balance sm:text-4xl">By tradition</h2>
          <ul className="mt-6 flex flex-wrap gap-x-1 gap-y-3">
            {religions.map((r, i) => (
              <li key={r.slug} className="flex items-center gap-1">
                {i > 0 && <span className="mx-2 text-stone" aria-hidden="true">·</span>}
                <Link
                  to={{ name: 'religion', slug: r.slug }}
                  className="font-display text-xl text-ink no-underline underline-offset-4 hover:text-cinnabar hover:underline sm:text-2xl"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works — single column, not 3 identical cards */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl text-balance sm:text-4xl">How to use SanctaWay</h2>
          </div>
          <ol className="space-y-8 border-l border-line pl-6 lg:col-span-7 lg:col-start-6">
            {[
              {
                step: '01',
                title: 'Find a place',
                body: 'Filter by region or tradition, or search the directory for the site on your itinerary.',
              },
              {
                step: '02',
                title: 'Read the visit guide',
                body: 'Practical details, etiquette, routes, seasons, and notes — written for real travel days.',
              },
              {
                step: '03',
                title: 'Verify & go',
                body: 'Hours change. We flag what to double-check locally so you arrive calm and respectful.',
              },
            ].map((item) => (
              <li key={item.step}>
                <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">{item.step}</p>
                <h3 className="mt-1 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-lg text-pretty text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12">
          <AdSlot label="Home mid-page" />
        </div>
      </section>
    </>
  )
}
