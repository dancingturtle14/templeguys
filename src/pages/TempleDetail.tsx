import { AdSlot } from '../components/AdSlot'
import { Breadcrumb } from '../components/Breadcrumb'
import { TempleCard } from '../components/TempleCard'
import { TempleChapterNav } from '../components/TempleChapterNav'
import { TempleChapterPager } from '../components/TempleChapterPager'
import { TempleImage } from '../components/TempleImage'
import { TicketsCta } from '../components/TicketsCta'
import { TEMPLE_CHAPTERS } from '../lib/chapters'
import { Link } from '../lib/router'
import { getTemple, temples } from '../lib/temples'
import type { Temple, TempleChapter } from '../types'

function ChapterHeading({ title, lede }: { title: string; lede?: string }) {
  return (
    <header className="border-b border-line pb-4">
      <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
      {lede ? <p className="mt-2 max-w-2xl text-ink-soft">{lede}</p> : null}
    </header>
  )
}

function BulletList({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return (
    <ul className={accent ? 'mt-5 space-y-3 border-l-2 border-cinnabar/40 pl-5' : 'mt-5 space-y-2'}>
      {items.map((item) => (
        <li key={item} className="text-pretty text-ink-soft">
          {accent ? item : `— ${item}`}
        </li>
      ))}
    </ul>
  )
}

function OverviewChapter({ temple }: { temple: Temple }) {
  return (
    <div className="space-y-8">
      <ChapterHeading title="Overview" lede={temple.summary} />
      <div className="space-y-4">
        {temple.overview.body.map((p) => (
          <p key={p.slice(0, 48)} className="max-w-2xl text-pretty text-ink-soft">
            {p}
          </p>
        ))}
      </div>
      <div>
        <h3 className="font-display text-2xl">Highlights</h3>
        <BulletList items={temple.overview.highlights} accent />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {TEMPLE_CHAPTERS.filter((c) => c.id !== 'overview').map((c) => (
          <Link
            key={c.id}
            to={{ name: 'temple', id: temple.id, chapter: c.id }}
            className="border border-line bg-paper px-4 py-3 no-underline hover:border-ink"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">
              Chapter
            </span>
            <span className="mt-1 block font-display text-xl text-ink">{c.label} →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function VisitChapter({ temple }: { temple: Temple }) {
  const v = temple.visit
  return (
    <div className="space-y-8">
      <ChapterHeading title="Visit" lede={v.intro} />
      <TicketsCta visit={v} />
      <div className="divide-y divide-line border border-line">
        {(
          [
            ['Hours', v.hours],
            ['Tickets', v.tickets],
            ['Dress', v.dress],
            ['Duration', v.duration],
            ['Access', v.access],
          ] as const
        ).map(([title, body]) => (
          <div key={title} className="grid gap-2 p-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
            <h3 className="font-display text-xl text-ink">{title}</h3>
            <p className="text-pretty text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-display text-2xl">Tips</h3>
        <BulletList items={v.tips} accent />
      </div>
    </div>
  )
}

function EtiquetteChapter({ temple }: { temple: Temple }) {
  const e = temple.etiquette
  return (
    <div className="space-y-8">
      <ChapterHeading title="Etiquette" lede={e.intro} />
      <BulletList items={e.bullets} accent />
    </div>
  )
}

function GettingThereChapter({ temple }: { temple: Temple }) {
  const g = temple.gettingThere
  return (
    <div className="space-y-8">
      <ChapterHeading title="Getting there" lede={g.intro} />
      <div className="space-y-4">
        {g.paragraphs.map((p) => (
          <p key={p.slice(0, 48)} className="max-w-2xl text-pretty text-ink-soft">
            {p}
          </p>
        ))}
      </div>
      <BulletList items={g.bullets} />
    </div>
  )
}

function BestTimeChapter({ temple }: { temple: Temple }) {
  const b = temple.bestTime
  return (
    <div className="space-y-8">
      <ChapterHeading title="Best time" lede={b.intro} />
      <div className="space-y-4">
        {b.paragraphs.map((p) => (
          <p key={p.slice(0, 48)} className="max-w-2xl text-pretty text-ink-soft">
            {p}
          </p>
        ))}
      </div>
      <BulletList items={b.bullets} accent />
    </div>
  )
}

function NotesChapter({ temple }: { temple: Temple }) {
  const n = temple.notes
  return (
    <div className="space-y-8">
      <ChapterHeading title="Notes · 注意事項" lede={n.intro} />
      <div className="border border-cinnabar/25 bg-cinnabar-wash/60 p-6 sm:p-8">
        <BulletList items={n.bullets} />
      </div>
    </div>
  )
}

function renderChapter(temple: Temple, chapter: TempleChapter) {
  switch (chapter) {
    case 'visit':
      return <VisitChapter temple={temple} />
    case 'etiquette':
      return <EtiquetteChapter temple={temple} />
    case 'getting-there':
      return <GettingThereChapter temple={temple} />
    case 'best-time':
      return <BestTimeChapter temple={temple} />
    case 'notes':
      return <NotesChapter temple={temple} />
    default:
      return <OverviewChapter temple={temple} />
  }
}

export function TempleDetailPage({
  id,
  chapter = 'overview',
}: {
  id: string
  chapter?: TempleChapter
}) {
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

  const chapterMeta = TEMPLE_CHAPTERS.find((c) => c.id === chapter) ?? TEMPLE_CHAPTERS[0]

  return (
    <article>
      <div className="border-b border-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', to: { name: 'home' } },
              { label: 'Explore', to: { name: 'explore' } },
              { label: temple.region, to: { name: 'region', slug: temple.regionSlug } },
              {
                label: temple.shortName,
                to: chapter === 'overview' ? undefined : { name: 'temple', id: temple.id },
              },
              ...(chapter === 'overview' ? [] : [{ label: chapterMeta.short }]),
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

        {/* Mobile chapter strip */}
        <div className="mt-8 -mx-4 overflow-x-auto border-y border-line bg-paper px-4 py-2 lg:hidden">
          <div className="flex min-w-max gap-1">
            {TEMPLE_CHAPTERS.map((c) => {
              const active = c.id === chapter
              return (
                <Link
                  key={c.id}
                  to={{ name: 'temple', id: temple.id, chapter: c.id }}
                  className={
                    active
                      ? 'whitespace-nowrap border border-cinnabar bg-cinnabar-wash px-3 py-1.5 text-xs font-semibold no-underline'
                      : 'whitespace-nowrap border border-transparent px-3 py-1.5 text-xs text-ink-soft no-underline'
                  }
                >
                  {c.short}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <TempleChapterNav templeId={temple.id} chapter={chapter} />
              <AdSlot label="Place sidebar" />
            </div>
          </aside>

          <div>
            {renderChapter(temple, chapter)}
            <TempleChapterPager templeId={temple.id} chapter={chapter} />
          </div>
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
