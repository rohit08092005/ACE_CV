import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { StartupErrorBoundary, StartupLoaderDismissal } from './components/StartupFallback.jsx'
import './style.scss'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Required #root element was not found.')
}

createRoot(rootElement).render(
  <StrictMode>
    <>
      <StartupLoaderDismissal />
      <StartupErrorBoundary>
        <App />
      </StartupErrorBoundary>
    </>
  </StrictMode>,
)
