import { AdSlot } from '../components/AdSlot'
import { Breadcrumb } from '../components/Breadcrumb'
import { TempleCard } from '../components/TempleCard'
import { TempleImage } from '../components/TempleImage'
import { Link } from '../lib/router'
import { getTemple, temples } from '../lib/temples'

export function TempleDetailPage({ id }: { id: string }) {
  const temple = getTemple(id)
  if (!temple) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl">Temple not found</h1>
        <Link to={{ name: 'explore' }} className="mt-4 inline-block text-gold">
          Back to explore
        </Link>
      </div>
    )
  }

  const related = temple.related
    .map((rid) => getTemple(rid))
    .filter(Boolean)
    .slice(0, 3)

  const more = related.length
    ? related
    : temples.filter((t) => t.id !== temple.id && t.regionSlug === temple.regionSlug).slice(0, 3)

  const g = temple.visitGuide

  return (
    <article>
      <div className="border-b border-line bg-cream-deep/40">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', to: { name: 'home' } },
              { label: 'Explore', to: { name: 'explore' } },
              { label: temple.region, to: { name: 'region', slug: temple.regionSlug } },
              { label: temple.shortName },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-line shadow-(--shadow-card)">
          <TempleImage src={temple.heroImage} alt={temple.name} priority aspect="hero" />
        </div>
        <p className="mt-2 text-xs text-ink-muted">Photo: {temple.heroCredit}</p>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <Link
              to={{ name: 'region', slug: temple.regionSlug }}
              className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-ink-soft no-underline hover:border-gold-soft"
            >
              {temple.region}
            </Link>
            {temple.religionSlugs.map((slug, i) => (
              <Link
                key={slug}
                to={{ name: 'religion', slug }}
                className="rounded-full border border-gold/30 bg-gold-wash px-3 py-1 text-xs font-medium text-ink no-underline"
              >
                {temple.religions[i]}
              </Link>
            ))}
          </div>
          <h1 className="mt-4 font-display text-4xl text-balance sm:text-5xl">{temple.name}</h1>
          <p className="mt-2 text-lg text-ink-soft">{temple.location}</p>
          <p className="mt-4 text-pretty text-ink-soft">{temple.summary}</p>
        </header>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Quick facts">
          {[
            ['Founded', temple.quickFacts.founded],
            ['Visit length', temple.quickFacts.typicalVisit],
            ['UNESCO', temple.quickFacts.unesco],
            ['Patron / era', temple.quickFacts.patron],
          ].map(([label, value]) => (
            <li
              key={label}
              className="rounded-2xl border border-line bg-cream px-4 py-3 text-sm"
            >
              <p className="text-xs text-ink-muted">{label}</p>
              <p className="mt-0.5 font-medium text-ink">{value}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-2xl">Visit guide</h2>
              <p className="mt-1 text-sm text-ink-muted">Practical details for planning day.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ['Hours', g.practical.hours],
                    ['Tickets', g.practical.tickets],
                    ['Dress', g.practical.dress],
                    ['Duration', g.practical.duration],
                  ] as const
                ).map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-line bg-cream p-5">
                    <h3 className="font-display text-lg">{title}</h3>
                    <p className="mt-2 text-pretty text-sm text-ink-soft">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-auto">
              <h2 className="font-display text-2xl">Etiquette</h2>
              <ul className="mt-4 space-y-2">
                {g.etiquette.map((item) => (
                  <li key={item} className="flex gap-3 text-pretty text-ink-soft">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="cv-auto">
              <h2 className="font-display text-2xl">Getting there</h2>
              <p className="mt-3 text-pretty text-ink-soft">{g.gettingThere}</p>
            </section>

            <section className="cv-auto">
              <h2 className="font-display text-2xl">Best time</h2>
              <p className="mt-3 text-pretty text-ink-soft">{g.bestTime}</p>
            </section>

            <section className="cv-auto rounded-2xl border border-gold/25 bg-gold-wash/50 p-6">
              <h2 className="font-display text-2xl">Notes · 注意事項</h2>
              <ul className="mt-4 space-y-2">
                {g.notes.map((item) => (
                  <li key={item} className="text-pretty text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-cream p-5">
              <p className="text-xs font-semibold uppercase text-gold">On this page</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="#main" className="text-ink-soft hover:text-ink">
                    Overview
                  </a>
                </li>
                <li>Visit guide</li>
                <li>Etiquette</li>
                <li>Getting there</li>
                <li>Best time</li>
                <li>Notes</li>
              </ul>
            </div>
            <AdSlot label="Temple sidebar" />
          </aside>
        </div>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl">Related temples</h2>
            <Link to={{ name: 'explore' }} className="text-sm font-semibold text-gold">
              Explore all →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((t) => t && <TempleCard key={t.id} temple={t} />)}
          </div>
        </section>
      </div>
    </article>
  )
}
