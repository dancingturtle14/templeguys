import { join } from 'node:path'

const SITE = 'https://sanctaway.com'

export function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/** Pathnames from public/sitemap.xml, in file order. */
export function sitemapPathnames(xml) {
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1])
  if (locs.length === 0) throw new Error('sitemap has no <loc> entries')
  return locs.map((loc) => {
    const url = new URL(loc)
    if (url.origin !== SITE) throw new Error(`sitemap loc is not ${SITE}: ${loc}`)
    return `${url.pathname}${url.search}`
  })
}

/** GitHub Pages directory index that matches the History API path. */
export function pageOutputPath(distDir, pathname) {
  const clean = pathname.split('?')[0]
  if (clean === '/' || clean === '') return join(distDir, 'index.html')
  if (!clean.startsWith('/') || clean.includes('..') || clean.includes('\\')) {
    throw new Error(`unsafe pathname: ${pathname}`)
  }
  const rel = clean.replace(/^\/+/, '').replace(/\/+$/, '')
  if (!rel) return join(distDir, 'index.html')
  return join(distDir, rel, 'index.html')
}

const ROOT = '<div id="root"></div>'

/**
 * Fill the Vite SPA shell with prerendered content.
 * Leaves GTM, stylesheet, and module script untouched.
 */
export function applyShell(template, { html, title, description, canonical, lang = 'en', keywords }) {
  if (!template.includes(ROOT)) {
    throw new Error('SPA shell is missing <div id="root"></div>')
  }
  if (!/<title>[\s\S]*?<\/title>/.test(template)) {
    throw new Error('SPA shell is missing <title>')
  }
  if (!/<meta name="description" content="[^"]*"\s*\/?>/.test(template)) {
    throw new Error('SPA shell is missing meta description')
  }
  if (!html || !html.trim()) throw new Error('refusing to write an empty #root')

  const headExtras = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  ]
  if (Array.isArray(keywords) && keywords.length > 0) {
    headExtras.push(`<meta name="keywords" content="${escapeHtml(keywords.join(', '))}" />`)
  }
  const headExtraBlock = headExtras.join('\n    ')

  let page = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    )
    .replace('</head>', `    ${headExtraBlock}\n  </head>`)
    .replace(ROOT, `<div id="root">${html}</div>`)
  if (lang && /<html\b[^>]*\blang="[^"]*"/.test(page)) {
    page = page.replace(/<html([^>]*?)\slang="[^"]*"/, `<html$1 lang="${escapeHtml(lang)}"`)
  }
  return page
}

export function canonicalUrl(pathname) {
  const path = pathname.split('?')[0]
  if (path === '/' || path === '') return `${SITE}/`
  const clean = `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}/`
  return `${SITE}${clean}`
}


/** Fushimi locale paths, written into public/sitemap.xml. */
export function fushimiI18nPathnames() {
  const locales = ['ja', 'zh-hant', 'zh-hans', 'ko', 'es', 'th']
  const chapters = ['visit', 'etiquette', 'getting-there', 'best-time', 'notes']
  const out = []
  for (const locale of locales) {
    out.push(`/${locale}/temple/fushimi-inari/`)
    for (const chapter of chapters) out.push(`/${locale}/temple/fushimi-inari/${chapter}/`)
    out.push(`/${locale}/temple/fushimi-inari/tour/`)
  }
  return out
}

/** Sensō-ji locale paths, written into public/sitemap.xml. */
export function sensoJiI18nPathnames() {
  const locales = ['ja', 'zh-hant', 'zh-hans', 'ko', 'es', 'th']
  const chapters = ['visit', 'etiquette', 'getting-there', 'best-time', 'notes']
  const out = []
  for (const locale of locales) {
    out.push(`/${locale}/temple/senso-ji/`)
    for (const chapter of chapters) out.push(`/${locale}/temple/senso-ji/${chapter}/`)
    out.push(`/${locale}/temple/senso-ji/tour/`)
  }
  return out
}
