# SanctaWay

Quiet pilgrimage atlas — visit guides for temples, churches, mosques, shrines, and sacred places worldwide.

**Domain:** sanctaway.com (production later)  
**Live:** https://sanctaway.com (GitHub Pages + custom domain)

## Quick start

```bash
cd /workspace/templeguys
npm install
npm run dev
```

### Production preview

```bash
npm run build
npm run preview
```

## Stack
- Vite + React + TypeScript
- Tailwind CSS v4
- Client-side History API router
- Content in `src/data/temples.json` (JSON-first; CMS later if needed)

## Design
- Philosophy: [DESIGN.md](./DESIGN.md) — **Threshold Atlas**
- Brand: [BRAND.md](./BRAND.md)
- Mood board: [design/moodboard-threshold-atlas.png](./design/moodboard-threshold-atlas.png)

## GitHub Pages
`vite.config.ts` sets `base: '/'` (apex). `public/CNAME` → `sanctaway.com`. Build copies `dist/index.html` → `dist/404.html` for SPA deep-link fallback.
