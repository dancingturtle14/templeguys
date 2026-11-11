import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { TempleImage } from './TempleImage'
import { Link } from '../lib/router'
import {
  FUSHIMI_INARI_TOUR,
  tourStopImage,
  type CheckpointKind,
  type TourCheckpoint,
  type TourChip,
  type TourImage,
  type TourStop,
} from '../data/fushimiInariTour'

const STOPS = FUSHIMI_INARI_TOUR.stops
const END_ID = 'tour-end'
const TOUR_END_COPY =
  'The lower gates and Yotsutsuji are a complete visit for most people. The summit loop can wait for another morning.'
const MAPS_WALKING =
  'https://www.google.com/maps/dir/?api=1&destination=Fushimi+Inari+Taisha,+Kyoto&travelmode=walking'

function nextTarget(current: string) {
  if (current === END_ID) return END_ID
  const index = STOPS.findIndex((stop) => stop.id === current)
  if (index === -1 || index >= STOPS.length - 1) return END_ID
  return STOPS[index + 1].id
}

function prevTarget(current: string) {
  if (current === END_ID) return STOPS[STOPS.length - 1].id
  const index = STOPS.findIndex((stop) => stop.id === current)
  if (index <= 0) return STOPS[0].id
  return STOPS[index - 1].id
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
      className={`scroll-mt-24 border bg-paper ${
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
      className="h-1 overflow-hidden bg-paper-deep"
    >
      <span className="block h-full bg-cinnabar" style={{ width: `${(now / STOPS.length) * 100}%` }} />
    </div>
  )
}

/** Museum-clean vertical schematic: path + 6 numbered nodes. */
function RouteSchematic({
  active,
  onJump,
}: {
  active: string
  onJump: (id: string) => void
}) {
  const activeIndex = active === END_ID ? STOPS.length - 1 : STOPS.findIndex((s) => s.id === active)
  const height = 320
  const top = 28
  const bottom = height - 28
  const step = (bottom - top) / (STOPS.length - 1)
  const cx = 36

  return (
    <div className="border border-line bg-paper p-4">
      <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">Route</p>
      <svg
        viewBox={`0 0 160 ${height}`}
        className="mt-3 w-full max-w-[11rem]"
        role="img"
        aria-label="Schematic walking route with six stops"
      >
        <line
          x1={cx}
          y1={top}
          x2={cx}
          y2={bottom}
          stroke="currentColor"
          className="text-line"
          strokeWidth={2}
        />
        {STOPS.map((stop, i) => {
          const y = top + step * i
          const current = active === stop.id || (active === END_ID && i === STOPS.length - 1)
          const past = activeIndex > i
          return (
            <g key={stop.id}>
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
              >
                <circle
                  cx={cx}
                  cy={y}
                  r={current ? 11 : 9}
                  className={
                    current
                      ? 'fill-cinnabar'
                      : past
                        ? 'fill-cinnabar-wash stroke-cinnabar'
                        : 'fill-paper stroke-line'
                  }
                  strokeWidth={current ? 0 : 1.5}
                />
                <text
                  x={cx}
                  y={y + 4}
                  textAnchor="middle"
                  className={current ? 'fill-paper' : 'fill-ink'}
                  style={{ fontSize: '9px', fontWeight: 600 }}
                >
                  {stop.index}
                </text>
                <text
                  x={cx + 22}
                  y={y + 4}
                  className={current ? 'fill-ink' : 'fill-ink-soft'}
                  style={{ fontSize: '11px', fontWeight: current ? 600 : 400 }}
                >
                  {stop.nav}
                  {stop.optional ? ' · opt' : ''}
                </text>
              </a>
            </g>
          )
        })}
      </svg>
      <a
        href={MAPS_WALKING}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 border border-cinnabar/35 bg-cinnabar-wash px-3 py-1.5 text-sm font-medium text-ink no-underline"
      >
        Open walking route in Google Maps
      </a>
    </div>
  )
}

function StopPhoto({
  stop,
  priority = false,
  defer = false,
  onEnlarge,
}: {
  stop: TourStop
  priority?: boolean
  defer?: boolean
  onEnlarge: (image: TourImage) => void
}) {
  const image = tourStopImage(stop)
  if (!image) return null
  return (
    <figure className="mt-4" data-stop-image={stop.id}>
      <button
        type="button"
        className="block w-full border border-line text-left"
        aria-haspopup="dialog"
        aria-label={`Enlarge photo: ${image.alt}`}
        onClick={() => onEnlarge(image)}
      >
        <TempleImage
          src={image.src}
          alt={image.alt}
          priority={priority}
          defer={defer}
          aspect={image.tall ? 'tall' : 'photo'}
        />
      </button>
      <figcaption className="mt-2 text-xs text-ink-muted">
        {image.caption} Photo: {image.credit} Tap the photo to enlarge.
      </figcaption>
    </figure>
  )
}

function StopBody({
  stop,
  first,
  onJump,
  onEnlarge,
  hidePhoto = false,
}: {
  stop: TourStop
  first: boolean
  onJump: (id: string) => void
  onEnlarge: (image: TourImage) => void
  hidePhoto?: boolean
}) {
  return (
    <>
      <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">Stop {stop.index}</p>
      <h2 id={`${stop.id}-title`} className="mt-2 font-display text-3xl text-balance sm:text-4xl">
        {stop.plate}
      </h2>
      <p className="mt-2 max-w-2xl text-ink-soft">{stop.caption}</p>
      {hidePhoto ? null : (
        <StopPhoto stop={stop} priority={first} defer={Boolean(stop.optional)} onEnlarge={onEnlarge} />
      )}
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
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
                  event.preventDefault()
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
              onClick={() => onJump('summit')}
              className="border border-cinnabar bg-cinnabar-wash px-3 py-2 text-sm font-medium"
            >
              Continue to Okumiya
            </button>
          </div>
        </fieldset>
      ) : null}
    </>
  )
}

function PlayerChrome({
  active,
  onJump,
}: {
  active: string
  onJump: (id: string) => void
}) {
  const now = progressNow(active)
  const atStart = active === STOPS[0].id
  const atEnd = active === END_ID
  const prev = prevTarget(active)
  const next = nextTarget(active)
  return (
    <div className="border border-line bg-paper">
      <WalkProgress active={active} />
      <div className="flex flex-nowrap items-stretch gap-0">
        <nav aria-label="Walk stops" className="flex min-w-0 flex-1 flex-nowrap items-stretch">
          <button
            type="button"
            disabled={atStart}
            onClick={() => onJump(prev)}
            className="inline-flex flex-1 items-center justify-center whitespace-nowrap border-r border-line px-2.5 py-2.5 text-xs font-semibold text-ink disabled:text-ink-muted"
          >
            Prev
          </button>
          <p className="inline-flex items-center justify-center whitespace-nowrap border-r border-line px-2.5 py-2.5 text-xs font-semibold text-cinnabar tabular-nums">
            {`${now} / ${STOPS.length}`}
          </p>
          <button
            type="button"
            disabled={atEnd}
            onClick={() => onJump(next)}
            className="inline-flex flex-1 items-center justify-center whitespace-nowrap border-r border-line px-2.5 py-2.5 text-xs font-semibold text-ink disabled:text-ink-muted"
          >
            Next
          </button>
          <a
            href={`#${nextTarget(active === END_ID ? 'descent' : active)}`}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
              event.preventDefault()
              onJump(nextTarget(active === END_ID ? 'descent' : active))
            }}
            className="inline-flex flex-1 items-center justify-center whitespace-nowrap border-r border-line px-2.5 py-2.5 text-xs font-semibold text-ink no-underline"
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
            className="inline-flex flex-1 items-center justify-center whitespace-nowrap px-2.5 py-2.5 text-xs font-semibold text-cinnabar no-underline"
          >
            End
          </a>
        </nav>
      </div>
    </div>
  )
}

function resolveJump(id: string): { stopId: string; focusId: string } {
  if (id === END_ID) return { stopId: END_ID, focusId: END_ID }
  const asStop = STOPS.find((stop) => stop.id === id)
  if (asStop) return { stopId: asStop.id, focusId: asStop.id }
  const owner = STOPS.find((stop) => stop.checkpoints.some((item) => item.id === id))
  if (owner) return { stopId: owner.id, focusId: id }
  return { stopId: STOPS[0].id, focusId: STOPS[0].id }
}

export function TourWalk() {
  const [active, setActive] = useState<string>(STOPS[0].id)
  const [photo, setPhoto] = useState<TourImage | null>(null)
  const photoDialog = useRef<HTMLDialogElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const dialog = photoDialog.current
    if (!dialog) return
    if (photo && !dialog.open) dialog.showModal()
    if (!photo && dialog.open) dialog.close()
  }, [photo])

  const jump = useCallback((id: string) => {
    const { stopId, focusId } = resolveJump(id)
    setActive(stopId)
    const url = `${window.location.pathname}${window.location.search}#${focusId}`
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== url) {
      window.history.pushState(null, '', url)
    }
    requestAnimationFrame(() => {
      const target = document.getElementById(focusId)
      if (target) {
        let node: HTMLElement | null = target
        while (node) {
          if (node instanceof HTMLDetailsElement) node.open = true
          node = node.parentElement
        }
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        const heading =
          target.querySelector('h2, h3') ??
          (target.tagName === 'H2' || target.tagName === 'H3' ? target : null)
        if (heading instanceof HTMLElement) {
          heading.tabIndex = -1
          heading.focus({ preventScroll: true })
        }
      } else if (stageRef.current) {
        stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }, [])

  useEffect(() => {
    const fromHash = window.location.hash.replace(/^#/, '')
    if (!fromHash) return
    if (
      fromHash === END_ID ||
      STOPS.some((stop) => stop.id === fromHash || stop.checkpoints.some((c) => c.id === fromHash))
    ) {
      jump(fromHash)
    }
  }, [jump])

  return (
    <div className="tour-walk lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
      <aside className="mb-6 space-y-4 lg:mb-0">
        <div className="lg:sticky lg:top-24 lg:space-y-4">
          <RouteSchematic active={active} onJump={jump} />
          <div className="hidden lg:block">
            <PlayerChrome active={active} onJump={jump} />
          </div>
        </div>
      </aside>

      <div ref={stageRef} className="min-w-0 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] lg:pb-8">
        {/* Player stage: one visible stop at a time (others stay in DOM for SSR / hash). */}
        {STOPS.map((stop, index) => {
          const onStage = active === stop.id
          if (stop.optional) {
            return (
              <details
                id={stop.id}
                key={stop.id}
                hidden={!onStage}
                className="tour-stop scroll-mt-24 border border-line"
              >
                <summary className="cursor-pointer list-none px-4 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="text-[0.65rem] font-semibold uppercase text-cinnabar">
                    Stop {stop.index} · optional
                  </span>
                  <span className="mt-1 block font-display text-3xl text-ink">Summit loop</span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    Closed until you open it. Continue only if you are going past Yotsutsuji.
                  </span>
                  <StopPhoto stop={stop} onEnlarge={setPhoto} />
                </summary>
                <div className="border-t border-line px-4 py-6 sm:px-6">
                  <StopBody stop={stop} first={false} onJump={jump} onEnlarge={setPhoto} hidePhoto />
                </div>
              </details>
            )
          }
          return (
            <section
              id={stop.id}
              key={stop.id}
              hidden={!onStage}
              aria-labelledby={`${stop.id}-title`}
              className="tour-stop scroll-mt-24 border border-line bg-paper p-5 sm:p-7"
            >
              <StopBody stop={stop} first={index === 0} onJump={jump} onEnlarge={setPhoto} />
            </section>
          )
        })}

        <section
          id={END_ID}
          hidden={active !== END_ID}
          aria-labelledby="tour-end-title"
          className="tour-stop scroll-mt-24 border border-line bg-paper-deep/50 p-5 sm:p-7"
        >
          <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">End</p>
          <h2 id="tour-end-title" className="mt-2 font-display text-3xl">
            End of the walk
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-ink-soft">{TOUR_END_COPY}</p>
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

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper pb-[max(1rem,env(safe-area-inset-bottom,0px))] lg:hidden">
        <PlayerChrome active={active} onJump={jump} />
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
