import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { metaForRoute } from './lib/documentMeta'
import { getHtmlLang } from './lib/fushimi-i18n'
import { RouterProvider, parsePath } from './lib/router'

/** Render one sitemap path to HTML plus the document title and description. */
export function render(pathnameAndSearch: string) {
  const queryAt = pathnameAndSearch.indexOf('?')
  const pathname = queryAt === -1 ? pathnameAndSearch : pathnameAndSearch.slice(0, queryAt)
  const search = queryAt === -1 ? '' : pathnameAndSearch.slice(queryAt)
  const route = parsePath(pathname, search)
  const { title, description } = metaForRoute(route)
  const locale = route.name === 'temple' || route.name === 'temple-tour' ? route.locale : undefined
  const lang = getHtmlLang(locale)
  const html = renderToString(
    <StrictMode>
      <RouterProvider location={{ pathname, search }}>
        <App />
      </RouterProvider>
    </StrictMode>,
  )
  return { html, title, description, lang }
}
