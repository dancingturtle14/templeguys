import { AdSlot } from '../components/AdSlot'
import { Chip } from '../components/Chip'
import { TempleCard } from '../components/TempleCard'
import { TempleImage } from '../components/TempleImage'
import { Link } from '../lib/router'
import { regions, religions, temples } from '../lib/temples'

export function HomePage() {
  const featured = temples.filter((t) => t.featured).slice(0, 6)
  const hero = featured[0] ?? temples[0]

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-gold">Visit guides · Worldwide</p>
            <h1 className="mt-3 font-display text-4xl text-balance text-ink sm:text-5xl lg:text-[3.25rem]">
              Visit the world’s great temples with clarity
            </h1>
            <p className="mt-5 max-w-xl text-lg text-pretty text-ink-soft">
              Hours, dress codes, etiquette, and how to get there — curated for travellers who want to arrive prepared and respectful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={{ name: 'explore' }}
                className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream no-underline transition-colors duration-150 ease-out hover:bg-ink-soft"
              >
                Explore temples
              </Link>
              <Link
                to={{ name: 'region', slug: 'southeast-asia' }}
                className="inline-flex items-center rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-semibold text-ink no-underline transition-colors duration-150 ease-out hover:border-gold-soft"
              >
                Start in Southeast Asia
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
              <div>
                <dt className="text-ink-muted">Temples</dt>
                <dd className="mt-1 font-display text-2xl tabular-nums text-ink">{temples.length}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Regions</dt>
                <dd className="mt-1 font-display text-2xl tabular-nums text-ink">{regions.length}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Traditions</dt>
                <dd className="mt-1 font-display text-2xl tabular-nums text-ink">{religions.length}</dd>
              </div>
            </dl>
          </div>

          <Link
            to={{ name: 'temple', id: hero.id }}
            className="group relative block overflow-hidden rounded-3xl border border-line shadow-(--shadow-card) no-underline"
          >
            <TempleImage src={hero.heroImage} alt={hero.name} priority aspect="hero" className="min-h-72 lg:min-h-96" />
            <div className="absolute inset-x-0 bottom-0 bg-ink/75 p-5 pt-16 text-cream">
              <p className="text-xs font-medium text-gold-soft">Featured guide</p>
              <p className="mt-1 font-display text-2xl text-balance">{hero.name}</p>
              <p className="mt-1 text-sm text-cream/75">{hero.location}</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-balance">Featured temples</h2>
            <p className="mt-2 text-ink-soft">A first circuit across continents and traditions.</p>
          </div>
          <Link to={{ name: 'explore' }} className="text-sm font-semibold text-gold hover:text-ink">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t, i) => (
            <TempleCard key={t.id} temple={t} defer={i > 2} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-cream-deep/50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-balance">Browse by region</h2>
          <div className="mt-6 flex flex-wrap gap-2" style={{ flexWrap: 'wrap' }}>
            {regions.map((r) => (
              <Chip key={r.slug} to={{ name: 'region', slug: r.slug }}>
                {r.label}
              </Chip>
            ))}
          </div>

          <h2 className="mt-12 font-display text-3xl text-balance">Browse by tradition</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {religions.map((r) => (
              <Chip key={r.slug} to={{ name: 'religion', slug: r.slug }} tone="gold">
                {r.label}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-balance">How TempleGuys works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Pick a place',
              body: 'Filter by region or tradition, or search the directory for the temple on your itinerary.',
            },
            {
              step: '02',
              title: 'Read the visit guide',
              body: 'Practical details, etiquette, routes, best seasons, and notes — written for real travel days.',
            },
            {
              step: '03',
              title: 'Verify & go',
              body: 'Hours change. We flag what to double-check locally so you arrive calm and respectful.',
            },
          ].map((item) => (
            <li key={item.step} className="rounded-2xl border border-line bg-cream p-6">
              <p className="font-display text-sm text-gold">{item.step}</p>
              <h3 className="mt-2 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-pretty text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <AdSlot label="Home mid-page" />
        </div>
      </section>
    </>
  )
}
