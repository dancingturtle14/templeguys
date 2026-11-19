import { Link, useRouter } from '../lib/router'
import { chaptersFor } from '../lib/chapters'
import { getFushimiI18n } from '../lib/fushimi-i18n'
import type { TempleChapter } from '../types'

export function TempleChapterNav({
  templeId,
  chapter,
}: {
  templeId: string
  chapter: TempleChapter
}) {
  const { route } = useRouter()
  const locale = route.name === 'temple' ? route.locale : undefined
  const list = chaptersFor(templeId === 'fushimi-inari' ? locale : undefined)
  const chrome = locale && templeId === 'fushimi-inari' ? getFushimiI18n(locale).chrome : null
  return (
    <nav aria-label="Temple chapters" className="border border-line bg-paper">
      <p className="border-b border-line px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">
        {chrome?.chapters_label ?? 'Chapters'}
      </p>
      <ul className="py-1">
        {list.map((c, i) => {
          const active = c.id === chapter
          return (
            <li key={c.id}>
              <Link
                to={{ name: 'temple', id: templeId, chapter: c.id }}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? 'flex items-baseline gap-3 bg-cinnabar-wash/70 px-4 py-2.5 text-sm font-semibold text-ink no-underline'
                    : 'flex items-baseline gap-3 px-4 py-2.5 text-sm text-ink-soft no-underline hover:bg-paper-deep/60 hover:text-ink'
                }
              >
                <span className="w-4 font-display text-xs text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                <span>{c.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
