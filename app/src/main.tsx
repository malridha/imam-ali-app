import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LangProvider } from './contexts/LangContext'
import { TSPProvider } from './contexts/TSPContext'
import './index.css'
import App from './App'

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
