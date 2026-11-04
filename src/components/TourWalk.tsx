import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { TempleImage } from './TempleImage'
import { Link } from '../lib/router'
import {
  FUSHIMI_INARI_TOUR,
  type CheckpointKind,
  type TourCheckpoint,
  type TourChip,
  type TourImage,
  type TourStop,
} from '../data/fushimiInariTour'

const STOPS = FUSHIMI_INARI_TOUR.stops
const END_ID = 'tour-end'

function nextTarget(current: string) {
  if (current === END_ID) return END_ID
  const index = STOPS.findIndex((stop) => stop.id === current)
  if (index === -1 || index >= STOPS.length - 1) return END_ID
  return STOPS[index + 1].id
}

function QuietStub({ stopId, plate, compact = false }: { stopId: string; plate: string; compact?: boolean }) {
  return (
    <div
      data-voice="quiet"
      data-stop-id={stopId}
      className={
        compact
          ? 'flex shrink-0 items-center gap-2 border-r border-line px-2.5'
          : 'mt-4 hidden items-center justify-between gap-3 border border-line bg-paper px-3 py-2 lg:flex'
      }
    >
      <div className={compact ? '' : 'min-w-0'}>
        <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">Quiet</p>
        {compact ? null : <p className="text-xs text-ink-muted">Voice is off for this stop.</p>}
      </div>
      <button
        type="button"
        disabled
        aria-label={`Play voice for ${plate}, unavailable`}
        className="inline-flex items-center gap-1.5 border border-line px-2 py-1 text-xs text-ink-muted"
      >
        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
          <path d="M3 2.2v7.6L10 6 3 2.2Z" fill="currentColor" />
        </svg>
        {compact ? <span className="sr-only">Play</span> : 'Play'}
      </button>
    </div>
  )
}

function ChipList({ chips }: { chips: TourChip[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li key={chip.label}>
          {chip.to ? (
            <Link
              to={chip.to}
              className="inline-flex border border-cinnabar/35 bg-cinnabar-wash px-3 py-1.5 text-sm font-medium text-ink no-underline"
            >
              {chip.label}
            </Link>
          ) : chip.href ? (
            <a
              href={chip.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-cinnabar/35 bg-cinnabar-wash px-3 py-1.5 text-sm font-medium text-ink no-underline"
            >
              {chip.label}
            </a>
          ) : (
            <span className="inline-flex border border-line bg-paper px-3 py-1.5 text-sm text-ink-soft">
              {chip.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

const KIND_LABEL: Record<CheckpointKind, string> = {
  'must-see': 'Must-see',
  object: 'Object',
  story: 'Traditional story',
  practice: 'House rule',
}

function followClick(event: { metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean; button: number; preventDefault: () => void }) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return false
  event.preventDefault()
  return true
}

function LookPrompt({ checkpoint }: { checkpoint: TourCheckpoint }) {
  const prompt = checkpoint.prompt
  const [picked, setPicked] = useState<string | null>(null)
  if (!prompt) return null
  const choice = prompt.choices.find((item) => item.label === picked)
  return (
    <fieldset className="mt-4 border border-line p-3">
      <legend className="px-1 text-sm font-medium text-ink">{prompt.question}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {prompt.choices.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={picked === item.label}
            onClick={() => setPicked(item.label)}
            className={
              picked === item.label
                ? 'border border-ink bg-ink px-3 py-1.5 text-sm text-paper'
                : 'border border-line bg-paper px-3 py-1.5 text-sm text-ink'
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      {choice ? <p className="mt-3 max-w-2xl text-sm text-ink-soft">{choice.reply}</p> : null}
      <details className="mt-3">
        <summary className="cursor-pointer text-sm text-cinnabar">Show every reading</summary>
        <ul className="mt-2 space-y-2">
          {prompt.choices.map((item) => (
            <li key={item.label} className="text-sm text-ink-soft">
              <span className="font-medium text-ink">{item.label}. </span>
              {item.reply}
            </li>
          ))}
        </ul>
      </details>
    </fieldset>
  )
}

const CheckpointCard = memo(function CheckpointCard({
  checkpoint,
  priority,
  defer,
  onEnlarge,
}: {
  checkpoint: TourCheckpoint
  priority: boolean
  defer: boolean
  onEnlarge: (image: TourImage) => void
}) {
  const mustSee = checkpoint.kind === 'must-see'
  return (
    <details
      id={checkpoint.id}
      open={mustSee ? true : undefined}
      className={`scroll-mt-24 scroll-mb-20 border bg-paper ${
        mustSee ? 'border-line border-l-cinnabar border-l-2' : 'border-line'
      }`}
    >
      <summary className="cursor-pointer list-none px-4 py-3 marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
        <span className="text-[0.65rem] font-semibold uppercase text-cinnabar">{KIND_LABEL[checkpoint.kind]}</span>
        <span className="mt-1 block font-display text-2xl text-ink">{checkpoint.title}</span>
      </summary>
      <div className="border-t border-line px-4 py-4 sm:px-5">
        <h3 id={`${checkpoint.id}-title`} className="sr-only">
          {checkpoint.title}
        </h3>
        <div className="max-w-2xl space-y-2">
          {checkpoint.sentences.map((sentence) => (
            <p key={sentence} className="text-pretty text-sm text-ink-soft">
              {sentence}
            </p>
          ))}
        </div>
        {checkpoint.lookFor?.length ? (
          <div className="mt-4 border border-cinnabar/30 bg-cinnabar-wash/40 p-3">
            <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">What to look for</p>
            <ul className="mt-2 space-y-2">
              {checkpoint.lookFor.map((item) => (
                <li key={item} className="text-sm text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <LookPrompt checkpoint={checkpoint} />
        {checkpoint.image ? (
          <figure className="mt-4 max-w-xl">
            <button
              type="button"
              className="block w-full border border-line text-left"
              aria-haspopup="dialog"
              aria-label={`Enlarge photo: ${checkpoint.image.alt}`}
              onClick={() => onEnlarge(checkpoint.image as TourImage)}
            >
              <TempleImage
                src={checkpoint.image.src}
                alt={checkpoint.image.alt}
                priority={priority}
                defer={defer}
                aspect={checkpoint.image.tall ? 'tall' : 'photo'}
              />
            </button>
            <figcaption className="mt-2 text-xs text-ink-muted">
              {checkpoint.image.caption} Photo: {checkpoint.image.credit} Tap the photo to enlarge.
            </figcaption>
          </figure>
        ) : null}
      </div>
    </details>
  )
})

function progressNow(active: string) {
  if (active === END_ID) return STOPS.length
  const index = STOPS.findIndex((stop) => stop.id === active)
  return index === -1 ? 1 : index + 1
}

function WalkProgress({ active }: { active: string }) {
  const now = progressNow(active)
  return (
    <div
      role="progressbar"
      aria-label="Walk progress"
      aria-valuemin={1}
      aria-valuemax={STOPS.length}
      aria-valuenow={now}
      className="h-1 bg-paper-deep"
    >
      <span className="block h-full bg-cinnabar" style={{ width: `${(now / STOPS.length) * 100}%` }} />
    </div>
  )
}

function StopBody({
  stop,
  first,
  onJump,
  onEnlarge,
}: {
  stop: TourStop
  first: boolean
  onJump: (id: string) => void
  onEnlarge: (image: TourImage) => void
}) {
  const next = nextTarget(stop.id)
  const nextStop = STOPS.find((item) => item.id === next)
  return (
    <>
      <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">Stop {stop.index}</p>
      <h2 id={`${stop.id}-title`} className="mt-2 font-display text-3xl text-balance sm:text-4xl">
        {stop.plate}
      </h2>
      <p className="mt-2 max-w-2xl text-ink-soft">{stop.caption}</p>
      <QuietStub stopId={stop.id} plate={stop.plate} />
      <div className="mt-5 max-w-2xl space-y-3">
        {stop.sentences.map((sentence) => (
          <p key={sentence} className="text-pretty text-ink-soft">
            {sentence}
          </p>
        ))}
      </div>
      <ChipList chips={stop.chips} />
      <div className="mt-8">
        <h3 className="font-display text-2xl">Checkpoints</h3>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {stop.checkpoints.map((checkpoint) => (
            <li key={checkpoint.id}>
              <a
                href={`#${checkpoint.id}`}
                onClick={(event) => {
                  if (!followClick(event)) return
                  onJump(checkpoint.id)
                }}
                className={checkpoint.kind === 'must-see' ? 'font-semibold text-cinnabar' : 'text-ink'}
              >
                {checkpoint.kind === 'must-see' ? 'Must-see · ' : ''}
                {checkpoint.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-5 space-y-4">
          {stop.checkpoints.map((checkpoint) => (
            <CheckpointCard
              key={checkpoint.id}
              checkpoint={checkpoint}
              priority={first && checkpoint.id === 'arrival-romon'}
              defer={Boolean(stop.optional)}
              onEnlarge={onEnlarge}
            />
          ))}
        </div>
      </div>
      {stop.id === 'yotsutsuji' ? (
        <fieldset className="mt-6 border border-line p-4">
          <legend className="px-1 font-display text-2xl">Your call at the crossroads</legend>
          <p className="max-w-2xl text-sm text-ink-soft">
            Either choice is a complete visit. Turning back skips the forest circuit. Continuing opens the summit loop.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onJump('descent')}
              className="border border-line bg-paper px-3 py-2 text-sm font-medium"
            >
              Turn back down
            </button>
            <button
              type="button"
              onClick={() => onJump('summit-okumiya')}
              className="border border-cinnabar bg-cinnabar-wash px-3 py-2 text-sm font-medium"
            >
              Continue to Okumiya
            </button>
          </div>
        </fieldset>
      ) : null}
      <p className="mt-6 flex flex-wrap gap-4 text-sm">
        {nextStop ? (
          <a
            href={`#${nextStop.id}`}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
              event.preventDefault()
              onJump(nextStop.id)
            }}
            className="font-medium text-cinnabar"
          >
            Next · {nextStop.nav}
          </a>
        ) : (
          <a
            href={`#${END_ID}`}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
              event.preventDefault()
              onJump(END_ID)
            }}
            className="font-medium text-cinnabar"
          >
            End of the walk
          </a>
        )}
        {stop.id === 'yotsutsuji' ? (
          <a
            href="#descent"
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
              event.preventDefault()
              onJump('descent')
            }}
            className="font-medium text-ink"
          >
            Skip the summit
          </a>
        ) : null}
      </p>
    </>
  )
}

function JumpList({
  active,
  onJump,
  layout,
}: {
  active: string
  onJump: (id: string) => void
  layout: 'rail' | 'bar'
}) {
  const skipHref = `#${nextTarget(active === END_ID ? 'descent' : active)}`
  return (
    <>
      <ol className={layout === 'rail' ? 'py-1' : 'flex min-w-0 flex-1 items-stretch overflow-x-auto'}>
        {STOPS.map((stop) => {
          const current = active === stop.id
          return (
            <li key={stop.id} className={layout === 'bar' ? 'shrink-0' : undefined}>
              <a
                href={`#${stop.id}`}
                data-tour-jump={stop.id}
                aria-current={current ? 'location' : undefined}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
                    return
                  }
                  event.preventDefault()
                  onJump(stop.id)
                }}
                className={
                  layout === 'rail'
                    ? current
                      ? 'flex items-baseline gap-3 bg-cinnabar-wash/70 px-3 py-2 text-sm font-semibold text-ink no-underline'
                      : 'flex items-baseline gap-3 px-3 py-2 text-sm text-ink-soft no-underline hover:bg-paper-deep/60 hover:text-ink'
                    : current
                      ? 'inline-flex h-full items-center gap-1.5 whitespace-nowrap bg-cinnabar-wash px-2.5 text-xs font-semibold text-ink no-underline'
                      : 'inline-flex h-full items-center gap-1.5 whitespace-nowrap px-2.5 text-xs text-ink-soft no-underline'
                }
              >
                <span className="font-display text-ink-muted">{stop.index}</span>
                <span>
                  {stop.nav}
                  {stop.optional ? <span className="ml-1 text-ink-muted">opt.</span> : null}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
      <div className={layout === 'rail' ? 'grid grid-cols-2 border-t border-line' : 'flex shrink-0 border-l border-line'}>
        <a
          href={skipHref}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
            event.preventDefault()
            onJump(nextTarget(active === END_ID ? 'descent' : active))
          }}
          className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-ink no-underline hover:bg-paper-deep/70"
        >
          Skip
        </a>
        <a
          href={`#${END_ID}`}
          aria-current={active === END_ID ? 'location' : undefined}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
            event.preventDefault()
            onJump(END_ID)
          }}
          className="inline-flex items-center justify-center border-l border-line px-3 py-2 text-xs font-semibold text-cinnabar no-underline hover:bg-paper-deep/70"
        >
          End
        </a>
      </div>
    </>
  )
}

export function TourWalk() {
  const [active, setActive] = useState<string>(STOPS[0].id)
  const [photo, setPhoto] = useState<TourImage | null>(null)
  const photoDialog = useRef<HTMLDialogElement>(null)
  const holdSpy = useRef(0)

  useEffect(() => {
    const dialog = photoDialog.current
    if (!dialog) return
    if (photo && !dialog.open) dialog.showModal()
    if (!photo && dialog.open) dialog.close()
  }, [photo])

  const jump = useCallback((id: string) => {
    const target = document.getElementById(id)
    if (target) {
      let node: HTMLElement | null = target
      while (node) {
        if (node instanceof HTMLDetailsElement) node.open = true
        node = node.parentElement
      }
    }
    if (!target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    holdSpy.current = performance.now() + (reduce ? 40 : 900)
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    const owner = STOPS.find((stop) => stop.id === id || stop.checkpoints.some((item) => item.id === id))
    setActive(id === END_ID ? END_ID : (owner?.id ?? STOPS[0].id))
    const url = `${window.location.pathname}${window.location.search}#${id}`
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== url) {
      window.history.pushState(null, '', url)
    }
    const heading = target.querySelector('h2, h3')
    if (heading instanceof HTMLElement) {
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    const nodes = [...STOPS.map((stop) => document.getElementById(stop.id)), document.getElementById(END_ID)].filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    )
    const seen = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.set(entry.target.id, entry.boundingClientRect.top)
          else seen.delete(entry.target.id)
        }
        if (performance.now() < holdSpy.current) return
        const next = [...seen.entries()].sort((a, b) => a[1] - b[1])[0]
        if (!next) return
        setActive(next[0] === END_ID ? END_ID : next[0])
      },
      { rootMargin: '-96px 0px -50% 0px', threshold: [0, 0.2] },
    )
    for (const node of nodes) observer.observe(node)

    const fromHash = window.location.hash.replace(/^#/, '')
    if (fromHash === END_ID || STOPS.some((stop) => stop.id === fromHash)) {
      jump(fromHash)
    }

    return () => observer.disconnect()
  }, [jump])

  useEffect(() => {
    document.querySelectorAll(`[data-tour-jump="${active}"]`).forEach((node) => {
      if (!(node instanceof HTMLElement)) return
      const scroller = node.closest('ol')
      if (!(scroller instanceof HTMLElement) || scroller.scrollWidth <= scroller.clientWidth) return
      const scrollerRect = scroller.getBoundingClientRect()
      const nodeRect = node.getBoundingClientRect()
      if (nodeRect.left < scrollerRect.left || nodeRect.right > scrollerRect.right) {
        scroller.scrollLeft += nodeRect.left - scrollerRect.left - 8
      }
    })
  }, [active])

  const activeStop = STOPS.find((stop) => stop.id === active) ?? STOPS[STOPS.length - 1]

  return (
    <div className="tour-walk lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-14">
      <aside className="hidden lg:block">
        <nav aria-label="Walk stops" className="sticky top-24 border border-line bg-paper">
          <p className="flex items-baseline justify-between border-b border-line px-3 py-3 text-[0.65rem] font-semibold uppercase text-cinnabar">
            <span>Stops</span>
            <span className="font-medium text-ink-muted">
              {progressNow(active)} / {STOPS.length}
            </span>
          </p>
          <WalkProgress active={active} />
          <JumpList active={active} onJump={jump} layout="rail" />
        </nav>
      </aside>

      <div>
        {STOPS.map((stop, index) => {
          if (stop.optional) {
            return (
              <details
                id={stop.id}
                key={stop.id}
                className="tour-stop mt-12 scroll-mt-24 scroll-mb-20 border border-line lg:scroll-mb-8"
              >
                <summary className="cursor-pointer list-none px-4 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="text-[0.65rem] font-semibold uppercase text-cinnabar">
                    Stop {stop.index} · optional
                  </span>
                  <span className="mt-1 block font-display text-3xl text-ink">Summit loop</span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    Closed until you open it. Continue only if you are going past Yotsutsuji.
                  </span>
                </summary>
                <div className="border-t border-line px-4 py-6 sm:px-6">
                  <StopBody stop={stop} first={false} onJump={jump} onEnlarge={setPhoto} />
                </div>
              </details>
            )
          }
          return (
            <section
              id={stop.id}
              key={stop.id}
              aria-labelledby={`${stop.id}-title`}
              className="tour-stop mt-12 scroll-mt-24 scroll-mb-20 border-t border-line pt-10 first:mt-0 first:border-t-0 first:pt-0 lg:scroll-mb-8"
            >
              <StopBody stop={stop} first={index === 0} onJump={jump} onEnlarge={setPhoto} />
            </section>
          )
        })}

        <section
          id={END_ID}
          aria-labelledby="tour-end-title"
          className="tour-stop mt-12 scroll-mt-24 scroll-mb-20 border border-line bg-paper-deep/50 p-5 sm:p-7 lg:scroll-mb-8"
        >
          <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">End</p>
          <h2 id="tour-end-title" className="mt-2 font-display text-3xl">
            End of the walk
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-ink-soft">
            The lower gates and Yotsutsuji are a complete visit for most people. The summit loop can wait for another morning.
          </p>
          <p className="mt-5 flex flex-wrap gap-2">
            <Link
              to={{ name: 'temple', id: 'fushimi-inari' }}
              className="border border-line bg-paper px-3 py-1.5 text-sm font-medium text-ink no-underline"
            >
              Overview
            </Link>
            <Link
              to={{ name: 'temple', id: 'fushimi-inari', chapter: 'etiquette' }}
              className="border border-cinnabar/35 bg-cinnabar-wash px-3 py-1.5 text-sm font-medium text-ink no-underline"
            >
              Etiquette
            </Link>
            <Link
              to={{ name: 'temple', id: 'fushimi-inari', chapter: 'getting-there' }}
              className="border border-cinnabar/35 bg-cinnabar-wash px-3 py-1.5 text-sm font-medium text-ink no-underline"
            >
              Getting there
            </Link>
          </p>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] lg:hidden">
        <WalkProgress active={active} />
        <div className="flex h-11 max-h-[12dvh] items-stretch">
          <QuietStub stopId={activeStop.id} plate={activeStop.plate} compact />
          <nav aria-label="Walk stops" className="flex min-w-0 flex-1 items-stretch">
            <JumpList active={active} onJump={jump} layout="bar" />
          </nav>
        </div>
      </div>
      <dialog
        ref={photoDialog}
        className="w-[min(100%-2rem,56rem)] border border-line bg-paper p-4 backdrop:bg-ink/60"
        aria-label="Enlarged photo"
        onClose={() => setPhoto(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
      >
        {photo ? (
          <>
            <img src={photo.src} alt={photo.alt} className="max-h-[75dvh] w-full object-contain" />
            <p className="mt-2 text-xs text-ink-muted">
              {photo.caption} Photo: {photo.credit}
            </p>
            <form method="dialog" className="mt-3 text-right">
              <button type="submit" className="border border-ink px-3 py-1.5 text-sm font-medium">
                Close
              </button>
            </form>
          </>
        ) : null}
      </dialog>
    </div>
  )
}
