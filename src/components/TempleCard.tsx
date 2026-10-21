import { Link } from '../lib/router'
import type { Temple } from '../types'
import { TempleImage } from './TempleImage'

export function TempleCard({ temple, defer = true }: { temple: Temple; defer?: boolean }) {
  return (
    <article className={`group ${defer ? 'cv-auto' : ''}`}>
      <Link
        to={{ name: 'temple', id: temple.id }}
        className="block overflow-hidden rounded-2xl border border-line bg-cream shadow-(--shadow-card) no-underline transition-colors duration-150 ease-out hover:border-gold-soft"
      >
        <TempleImage src={temple.heroImage} alt="" className="rounded-t-2xl" />
        <div className="space-y-2 p-4 md:p-5">
          <p className="text-xs font-medium text-gold">{temple.region}</p>
          <h3 className="font-display text-xl text-balance text-ink group-hover:text-ink">
            {temple.name}
          </h3>
          <p className="text-sm text-pretty text-ink-muted line-clamp-2">{temple.summary}</p>
          <p className="pt-1 text-sm text-ink-soft">
            {temple.religions.join(' · ')} · {temple.country}
          </p>
        </div>
      </Link>
    </article>
  )
}
