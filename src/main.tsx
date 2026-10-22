import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { RouterProvider } from './lib/router'
import './index.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('missing #root')

const app = (
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>
)

// Prerendered routes already contain the visit guide. Unknown URLs use the
// empty SPA shell in 404.html and mount from scratch.
if (rootEl.childElementCount > 0) hydrateRoot(rootEl, app)
else createRoot(rootEl).render(app)
