# TempleGuys design system

## Intent
Editorial travel magazine × calm sacred places. Premium, quiet, content-first — built for high organic PV reading sessions, not startup-gradient chrome.

## Palette
| Token | Hex | Role |
| --- | --- | --- |
| `cream` | `#F7F3EB` | Page background |
| `cream-deep` | `#EFE6D8` | Soft bands / panels |
| `parchment` | `#E8DFD0` | Image placeholders |
| `ink` | `#1C1917` | Primary text, dark UI |
| `ink-soft` | `#44403C` | Body secondary |
| `ink-muted` | `#78716C` | Meta / captions |
| `gold` | `#9A7B4F` | Single accent |
| `gold-soft` | `#C4A574` | Soft accent / icons on dark |
| `gold-wash` | `#F0E6D4` | Accent chips / note panels |
| `line` | `#D6CBB8` | Borders |

One accent per view (gold). No purple, no glow, no multicolor gradients on UI chrome. Image-load fallbacks may use a warm stone wash.

## Typography
- **Display:** Fraunces (optical size) — headings, brand, section titles
- **Body / UI:** Source Sans 3
- Headings use `text-balance`; paragraphs use `text-pretty`
- No custom letter-spacing

## Layout & IA
```
/                     Home — hero, featured, region/religion chips, how-it-works
/explore              Directory — search + region + tradition filters
/region/:slug         Region landing (unique H1, filtered set)
/religion/:slug       Tradition landing (unique H1, filtered set)
/temple/:id           Detail — hero, quick facts, visit guide, related
/about                About, respect note, photo credits
```

Source of truth: `src/data/temples.json`.

## UX patterns
- Mobile-first; sticky header with blur
- Cards: warm border, soft shadow, 4:3 cover crop
- Detail pages: sticky aside with ad slot + on-this-page
- Filters prefer pretty URLs (`/region/...`, `/religion/...`) when a single facet is active
- `content-visibility: auto` on below-fold cards/sections
- Hero LCP image uses `fetchpriority="high"`; others `loading="lazy"`
- `min-h-dvh` / `h-dvh` (never `h-screen`)
- Respects `prefers-reduced-motion`

## Ads (future)
`AdSlot` components reserve dashed placeholders with `/* ADSENSE_SLOT */` comments. No AdSense scripts in v1.

## Soft CTA
Footer only: discreet link to `hktemplegifts.com`. No hard sell in guides.
