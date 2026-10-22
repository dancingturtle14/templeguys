import type { ReactNode } from 'react'
import { Layout } from './components/Layout'
import { metaForRoute, useDocumentMeta } from './lib/documentMeta'
import { jsonLdForRoute } from './lib/jsonLd'
import { useRouter } from './lib/router'
import { regionLabel, religionLabel } from './lib/temples'
import { AboutPage } from './pages/About'
import { ExplorePage } from './pages/Explore'
import { HomePage } from './pages/Home'
import { NotFoundPage } from './pages/NotFound'
import { TempleDetailPage } from './pages/TempleDetail'

function DocumentHead() {
  const { route } = useRouter()
  const { title, description } = metaForRoute(route)
  useDocumentMeta(title, description)
  const jsonLd = jsonLdForRoute(route)
  if (!jsonLd) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function App() {
  const { route } = useRouter()

  let page: ReactNode
  switch (route.name) {
    case 'home':
      page = <HomePage />
      break
    case 'explore':
      page = (
        <ExplorePage
          initialQ={route.q}
          initialRegion={route.region}
          initialReligion={route.religion}
        />
      )
      break
    case 'temple':
      page = <TempleDetailPage id={route.id} chapter={route.chapter ?? 'overview'} />
      break
    case 'region':
      page = (
        <ExplorePage
          initialRegion={route.slug}
          heading={`Sacred places in ${regionLabel(route.slug)}`}
          intro={`Visit guides for key temples, shrines, and houses of worship across ${regionLabel(route.slug)}.`}
        />
      )
      break
    case 'religion':
      page = (
        <ExplorePage
          initialReligion={route.slug}
          heading={`${religionLabel(route.slug)} places of worship`}
          intro={`Browse ${religionLabel(route.slug).toLowerCase()} sacred sites with practical visit guidance.`}
        />
      )
      break
    case 'about':
      page = <AboutPage />
      break
    default:
      page = <NotFoundPage />
  }

  return (
    <Layout>
      <DocumentHead />
      {page}
    </Layout>
  )
}
