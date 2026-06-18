import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LangProvider } from './contexts/LangContext'
import { TSPProvider } from './contexts/TSPContext'
import './fonts.css'
import './index.css'
import App from './App'

// PWA freshness: when a newly-deployed service worker takes control, reload
// once so the user always lands on the latest build instead of a stale cache.
// Gated on an existing controller so first-ever visits don't reload needlessly.
if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
  let reloaded = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloaded) return
    reloaded = true
    window.location.reload()
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <TSPProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TSPProvider>
    </LangProvider>
  </StrictMode>,
)
