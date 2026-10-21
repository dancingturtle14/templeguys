/** Placeholder for future AdSense / display ads — no scripts in v1. */
export function AdSlot({ label = 'Advertisement' }: { label?: string }) {
  return (
    <aside
      className="border border-dashed border-line bg-paper-deep/70 px-4 py-6 text-center"
      aria-label="Advertisement placeholder"
      data-ad-slot="reserved"
    >
      {/* ADSENSE_SLOT: mount display unit here later */}
      <p className="text-sm text-ink-muted">{label} slot</p>
      <p className="mt-1 text-xs text-ink-muted/80">Reserved for partners — not live yet</p>
    </aside>
  )
}
