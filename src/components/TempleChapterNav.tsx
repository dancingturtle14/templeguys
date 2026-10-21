import { Link } from '../lib/router'
import { TEMPLE_CHAPTERS } from '../lib/chapters'
import type { TempleChapter } from '../types'

export function TempleChapterNav({
  templeId,
  chapter,
}: {
  templeId: string
  chapter: TempleChapter
}) {
  return (
    <nav aria-label="Temple chapters" className="border border-line bg-paper">
      <p className="border-b border-line px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">
        Chapters
      </p>
      <ul className="py-1">
        {TEMPLE_CHAPTERS.map((c, i) => {
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
