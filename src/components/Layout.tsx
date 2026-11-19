import { useEffect, type ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { getFushimiI18n, getHtmlLang } from '../lib/fushimi-i18n'
import { useRouter } from '../lib/router'

export function Layout({ children }: { children: ReactNode }) {
  const { route } = useRouter()
  const locale = route.name === 'temple' || route.name === 'temple-tour' ? route.locale : undefined
  const skip = locale ? getFushimiI18n(locale).chrome.skip_to_content : undefined
  useEffect(() => {
    document.documentElement.lang = getHtmlLang(locale)
  }, [locale])
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        {skip || 'Skip to content'}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
