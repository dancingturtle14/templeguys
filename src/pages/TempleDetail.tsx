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
        <h1 className="font-display text-3xl">Place not found</h1>
        <Link to={{ name: 'explore' }} className="mt-4 inline-block text-cinnabar">
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
      <div className="border-b border-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
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
        <div className="overflow-hidden border border-line">
          <TempleImage src={temple.heroImage} alt={temple.name} priority aspect="hero" />
        </div>
        <p className="mt-2 text-xs text-ink-muted">Photo: {temple.heroCredit}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <header className="lg:col-span-8">
            <div className="flex flex-wrap gap-2">
              <Link
                to={{ name: 'region', slug: temple.regionSlug }}
                className="border border-line bg-paper px-3 py-1 text-xs font-medium text-ink-soft no-underline hover:border-ink"
              >
                {temple.region}
              </Link>
              {temple.religionSlugs.map((slug, i) => (
                <Link
                  key={slug}
                  to={{ name: 'religion', slug }}
                  className="border border-cinnabar/30 bg-cinnabar-wash px-3 py-1 text-xs font-medium text-ink no-underline"
                >
                  {temple.religions[i]}
                </Link>
              ))}
            </div>
            <h1 className="mt-5 font-display text-4xl text-balance sm:text-5xl lg:text-6xl">
              {temple.name}
            </h1>
            <p className="mt-3 text-lg text-ink-soft">{temple.location}</p>
            <p className="mt-5 max-w-2xl text-pretty text-ink-soft">{temple.summary}</p>
          </header>

          <aside className="border border-line bg-paper-deep/40 p-5 lg:col-span-4 lg:self-start">
            <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">Quick facts</p>
            <dl className="mt-4 space-y-4 text-sm">
              {[
                ['Founded', temple.quickFacts.founded],
                ['Visit length', temple.quickFacts.typicalVisit],
                ['UNESCO', temple.quickFacts.unesco],
                ['Patron / era', temple.quickFacts.patron],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-line pt-3 first:border-t-0 first:pt-0">
                  <dt className="text-ink-muted">{label}</dt>
                  <dd className="mt-0.5 font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_260px]">
          <div className="space-y-12">
            <section>
              <div className="border-b border-line pb-3">
                <h2 className="font-display text-3xl">Visit guide</h2>
                <p className="mt-1 text-sm text-ink-muted">Practical details for the day you go.</p>
              </div>

              <div className="mt-6 divide-y divide-line border border-line">
                {(
                  [
                    ['Hours', g.practical.hours],
                    ['Tickets', g.practical.tickets],
                    ['Dress', g.practical.dress],
                    ['Duration', g.practical.duration],
                  ] as const
                ).map(([title, body]) => (
                  <div key={title} className="grid gap-2 p-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <h3 className="font-display text-xl text-ink">{title}</h3>
                    <p className="text-pretty text-ink-soft">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-auto">
              <h2 className="font-display text-3xl">Etiquette</h2>
              <ul className="mt-5 space-y-3 border-l-2 border-cinnabar/40 pl-5">
                {g.etiquette.map((item) => (
                  <li key={item} className="text-pretty text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="cv-auto grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl">Getting there</h2>
                <p className="mt-4 text-pretty text-ink-soft">{g.gettingThere}</p>
              </div>
              <div>
                <h2 className="font-display text-3xl">Best time</h2>
                <p className="mt-4 text-pretty text-ink-soft">{g.bestTime}</p>
              </div>
            </section>

            <section className="cv-auto border border-cinnabar/25 bg-cinnabar-wash/60 p-6 sm:p-8">
              <h2 className="font-display text-3xl">Notes · 注意事項</h2>
              <ul className="mt-4 space-y-2">
                {g.notes.map((item) => (
                  <li key={item} className="text-pretty text-ink-soft">
                    — {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <div className="border border-line bg-paper p-5">
              <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">On this page</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>Visit guide</li>
                <li>Etiquette</li>
                <li>Getting there</li>
                <li>Best time</li>
                <li>Notes</li>
              </ul>
            </div>
            <AdSlot label="Place sidebar" />
          </aside>
        </div>

        <section className="mt-16 border-t border-line pt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl">Related places</h2>
            <Link to={{ name: 'explore' }} className="text-sm font-semibold text-cinnabar">
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
