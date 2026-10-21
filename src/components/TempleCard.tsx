import { Link } from '../lib/router'
import type { Temple } from '../types'
import { TempleImage } from './TempleImage'

export function TempleCard({
  temple,
  defer = true,
  variant = 'grid',
}: {
  temple: Temple
  defer?: boolean
  variant?: 'grid' | 'row' | 'featured'
}) {
  if (variant === 'featured') {
    return (
      <article className={defer ? 'cv-auto' : ''}>
        <Link
          to={{ name: 'temple', id: temple.id }}
          className="group grid no-underline md:grid-cols-12 md:gap-8"
        >
          <div className="md:col-span-7">
            <TempleImage src={temple.heroImage} alt="" aspect="hero" className="border border-line" />
          </div>
          <div className="flex flex-col justify-end border-t border-line py-5 md:col-span-5 md:border-t-0 md:border-l md:py-0 md:pl-8">
            <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">{temple.region}</p>
            <h3 className="mt-2 font-display text-3xl text-balance text-ink md:text-4xl">
              {temple.name}
            </h3>
            <p className="mt-3 text-pretty text-ink-soft line-clamp-3">{temple.summary}</p>
            <p className="mt-4 text-sm text-ink-muted">
              {temple.religions.join(' · ')} · {temple.country}
            </p>
            <p className="mt-6 text-sm font-medium text-cinnabar group-hover:underline">
              Read visit guide →
            </p>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'row') {
    return (
      <article className={`border-b border-line ${defer ? 'cv-auto' : ''}`}>
        <Link
          to={{ name: 'temple', id: temple.id }}
          className="group grid grid-cols-[5.5rem_1fr] gap-4 py-5 no-underline sm:grid-cols-[8rem_1fr] sm:gap-6"
        >
          <TempleImage src={temple.heroImage} alt="" aspect="square" className="border border-line" />
          <div className="min-w-0 self-center">
            <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">{temple.region}</p>
            <h3 className="mt-1 font-display text-2xl text-balance text-ink">{temple.name}</h3>
            <p className="mt-1 text-sm text-pretty text-ink-muted line-clamp-2">{temple.summary}</p>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className={`group ${defer ? 'cv-auto' : ''}`}>
      <Link to={{ name: 'temple', id: temple.id }} className="block no-underline">
        <TempleImage src={temple.heroImage} alt="" className="border border-line" />
        <div className="space-y-2 border-x border-b border-line bg-paper px-4 py-4">
          <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">{temple.region}</p>
          <h3 className="font-display text-2xl text-balance text-ink">{temple.name}</h3>
          <p className="text-sm text-pretty text-ink-muted line-clamp-2">{temple.summary}</p>
          <p className="pt-1 text-sm text-ink-soft">
            {temple.religions.join(' · ')} · {temple.country}
          </p>
        </div>
      </Link>
    </article>
  )
}
