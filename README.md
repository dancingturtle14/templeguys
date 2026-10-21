# TempleGuys

Informational visit-guide prototype for the world’s key temples — browse by region and tradition, read practical etiquette and travel notes.

## Quick start

```bash
cd /workspace/templeguys
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Production preview

```bash
npm run build
npm run preview
```

Or serve the static build:

```bash
npm run build
npx --yes serve dist
```

## Stack
- Vite + React + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Client-side router (History API) — no React Router dependency
- Temple data in `src/data/temples.json`

## Scripts
| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Typecheck + production bundle → `dist/` |
| `npm run preview` | Preview `dist/` with Vite |
| `npm run lint` | Oxlint |

## Content notes
- Hours and access can change; copy often says **verify before visit**
- Tone is respectful across faiths; no invented consecration claims
- Photos are Unsplash URLs for prototype atmosphere — replace before launch (see About)

## Design
See [DESIGN.md](./DESIGN.md) for palette, type, and IA.

## GitHub Pages

Live QA: https://dancingturtle14.github.io/templeguys/

`vite.config.ts` sets `base: '/templeguys/'`. The client router strips/prefixes that base via `import.meta.env.BASE_URL`. Build copies `dist/index.html` → `dist/404.html` for SPA deep-link fallback on Pages.
