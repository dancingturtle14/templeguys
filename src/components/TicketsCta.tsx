import type { TempleVisit } from '../types'
import { getFushimiI18n } from '../lib/fushimi-i18n'
import { useRouter } from '../lib/router'

export function TicketsCta({ visit }: { visit: TempleVisit }) {
  const { route } = useRouter()
  const locale = (route.name === 'temple' || route.name === 'temple-tour') ? route.locale : undefined
  const chrome = locale ? getFushimiI18n(locale).chrome : null
  const { entryType, ticketsUrl, ticketsLabel, ticketsNote } = visit

  if (entryType === 'free' && !ticketsUrl) {
    return (
      <div className="border border-line bg-paper-deep/50 p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">Entry</p>
        <p className="mt-2 font-display text-2xl text-ink">Free entry / donation</p>
        {ticketsNote ? <p className="mt-2 text-sm text-ink-soft">{ticketsNote}</p> : null}
      </div>
    )
  }

  if (entryType === 'free' && ticketsUrl) {
    return (
      <div className="border border-cinnabar/30 bg-cinnabar-wash/50 p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">Entry</p>
        <p className="mt-2 font-display text-2xl text-ink">Free entry</p>
        {ticketsNote ? <p className="mt-2 text-sm text-ink-soft">{ticketsNote}</p> : null}
        <a
          href={ticketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex border border-ink bg-ink px-4 py-2.5 text-sm font-semibold text-paper no-underline hover:bg-cinnabar hover:border-cinnabar"
        >
          {ticketsLabel || 'Reserve / check official info'} →
        </a>
      </div>
    )
  }

  if (!ticketsUrl) {
    return (
      <div className="border border-line bg-paper-deep/50 p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">{chrome?.tickets_kicker ?? 'Tickets'}</p>
        <p className="mt-2 font-display text-2xl text-ink">{chrome?.tickets_heading_verify ?? 'Buy on site / verify'}</p>
        {ticketsNote ? <p className="mt-2 text-sm text-ink-soft">{ticketsNote}</p> : null}
      </div>
    )
  }

  return (
    <div className="border border-cinnabar/30 bg-cinnabar-wash/50 p-5">
      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">{chrome?.tickets_kicker ?? 'Tickets'}</p>
      <p className="mt-2 font-display text-2xl text-ink">{ticketsLabel || chrome?.tickets_cta_default || 'Check prices'}</p>
      {ticketsNote ? <p className="mt-2 text-sm text-ink-soft">{ticketsNote}</p> : null}
      <a
        href={ticketsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex border border-ink bg-ink px-4 py-2.5 text-sm font-semibold text-paper no-underline hover:bg-cinnabar hover:border-cinnabar"
      >
        {ticketsLabel || chrome?.tickets_cta_default || 'Check prices'} →
      </a>
      <p className="mt-3 text-xs text-ink-muted">
        {chrome?.tickets_helper ?? 'Opens the booking site we verified. Prices change — confirm on that page before you pay.'}
      </p>
    </div>
  )
}
