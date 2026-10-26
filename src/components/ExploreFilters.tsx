import { useId, type FormEvent } from 'react'
import { routeForFilters, type PlaceFilters } from '../lib/exploreFilters'
import { useRouter } from '../lib/router'
import { regions, religions } from '../lib/temples'
import { Chip } from './Chip'

export function ExploreFilters({
  q,
  region,
  religion,
  onChange,
  onDraft,
  showClear = true,
  heading,
  className = '',
}: {
  q: string
  region?: string
  religion?: string
  /** Commit a search or chip change. Text is raw; routing trims it. */
  onChange: (next: PlaceFilters) => void
  /** When set, typing stays local until submit. Chips still navigate immediately. */
  onDraft?: (value: string) => void
  showClear?: boolean
  heading?: string
  className?: string
}) {
  const { href } = useRouter()
  const searchId = useId()
  const submitMode = onDraft !== undefined

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onChange({ q, region, religion })
  }

  return (
    <form
      id="place-finder"
      method="get"
      action={href({ name: 'explore' })}
      aria-label="Find a sacred place"
      onSubmit={onSubmit}
      className={`space-y-5 border border-line bg-paper-deep/50 p-4 sm:p-6 ${className}`}
    >
      {heading ? (
        <p className="text-[0.7rem] font-semibold uppercase text-cinnabar">{heading}</p>
      ) : null}

      <div>
        <label htmlFor={searchId} className="text-sm font-medium text-ink-soft">
          Search
        </label>
        <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
          <input
            id={searchId}
            type="search"
            name="q"
            value={q}
            enterKeyHint="search"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={(event) => {
              const value = event.target.value
              if (onDraft) onDraft(value)
              else onChange({ q: value, region, religion })
            }}
            placeholder="Name, city, country…"
            className="min-h-12 w-full border border-line bg-paper px-3.5 py-2.5 text-ink outline-none placeholder:text-ink-muted focus:border-cinnabar"
          />
          {submitMode ? (
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-150 ease-out hover:bg-ink-soft"
            >
              Search
            </button>
          ) : null}
        </div>
      </div>

      {region ? <input type="hidden" name="region" value={region} /> : null}
      {religion ? <input type="hidden" name="religion" value={religion} /> : null}

      <fieldset className="min-w-0 border-0 p-0">
        <legend className="text-sm font-medium text-ink-soft">Region</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {showClear ? (
            <Chip active={!region} to={routeForFilters({ q, region: undefined, religion })}>
              All regions
            </Chip>
          ) : null}
          {regions.map((item) => (
            <Chip
              key={item.slug}
              active={region === item.slug}
              to={routeForFilters({ q, region: item.slug, religion })}
            >
              {item.label}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="min-w-0 border-0 p-0">
        <legend className="text-sm font-medium text-ink-soft">Tradition</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {showClear ? (
            <Chip active={!religion} to={routeForFilters({ q, region, religion: undefined })}>
              All traditions
            </Chip>
          ) : null}
          {religions.map((item) => (
            <Chip
              key={item.slug}
              active={religion === item.slug}
              to={routeForFilters({ q, region, religion: item.slug })}
            >
              {item.label}
            </Chip>
          ))}
        </div>
      </fieldset>
    </form>
  )
}
