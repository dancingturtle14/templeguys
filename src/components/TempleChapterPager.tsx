import { Link, useRouter } from '../lib/router'
import { adjacentChapters } from '../lib/chapters'
import { shellChrome } from '../lib/senso-ji-i18n'
import type { TempleChapter } from '../types'

export function TempleChapterPager({
  templeId,
  chapter,
}: {
  templeId: string
  chapter: TempleChapter
}) {
  const { route } = useRouter()
  const locale = route.name === 'temple' ? route.locale : undefined
  const { prev, next } = adjacentChapters(chapter, templeId === 'fushimi-inari' || templeId === 'senso-ji' ? locale : undefined, templeId)
  const chrome = locale && (templeId === 'fushimi-inari' || templeId === 'senso-ji') ? shellChrome(locale, templeId) : null
  return (
    <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
      {prev ? (
        <Link
          to={{ name: 'temple', id: templeId, chapter: prev.id }}
          className="border border-line bg-paper px-4 py-3 text-sm no-underline hover:border-ink"
        >
          <span className="block text-[0.65rem] uppercase tracking-wide text-ink-muted">{chrome?.prev ?? 'Previous'}</span>
          <span className="font-display text-xl text-ink">← {prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={{ name: 'temple', id: templeId, chapter: next.id }}
          className="border border-line bg-paper px-4 py-3 text-right text-sm no-underline hover:border-ink sm:ml-auto"
        >
          <span className="block text-[0.65rem] uppercase tracking-wide text-ink-muted">{chrome?.next ?? 'Next'}</span>
          <span className="font-display text-xl text-ink">{next.label} →</span>
        </Link>
      ) : null}
    </div>
  )
}
