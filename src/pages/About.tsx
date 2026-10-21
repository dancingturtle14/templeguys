import { Breadcrumb } from '../components/Breadcrumb'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', to: { name: 'home' } }, { label: 'About' }]} />
      <h1 className="mt-6 font-display text-4xl text-balance">About TempleGuys</h1>
      <div className="mt-6 space-y-4 text-pretty text-ink-soft">
        <p>
          TempleGuys is an informational visit-guide site for the world’s great temples and sacred
          places. We gather practical details — hours, dress, etiquette, routes, and seasonal tips —
          so travellers can visit with clarity and respect.
        </p>
        <p>
          Hours and access rules change. When something may be uncertain, we say{' '}
          <strong className="font-semibold text-ink">verify before visit</strong>. We do not invent
          consecration claims or speak for any faith community.
        </p>
        <p>
          This prototype is built for high-quality reading and browsing. Accounts and feedback tools
          may arrive later; v1 is open to everyone without login.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Photo credits</h2>
        <p className="mt-3 text-pretty text-ink-soft">
          Hero photography uses Unsplash source URLs for prototype atmosphere. Replace with licensed
          or owned images before production launch. Fallback silhouettes appear if a remote image
          fails to load.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Respect</h2>
        <p className="mt-3 text-pretty text-ink-soft">
          Sacred sites remain places of living worship. Follow local caretakers, posted rules, and
          community guidance above any travel tip on this site.
        </p>
      </section>
    </div>
  )
}
