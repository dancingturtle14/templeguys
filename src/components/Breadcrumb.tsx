import { Link } from '../lib/router'
import type { Route } from '../types'

type Crumb = { label: string; to?: Route }

export function Breadcrumb({ items, ariaLabel = 'Breadcrumb' }: { items: Crumb[]; ariaLabel?: string }) {
  return (
    <nav aria-label={ariaLabel} className="text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-stone">
                /
              </span>
            )}
            {item.to ? (
              <Link to={item.to} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
