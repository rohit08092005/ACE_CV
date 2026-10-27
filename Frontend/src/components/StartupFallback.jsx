import { Component, useEffect } from 'react'

export class StartupErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-loading-screen" role="alert">
          <p className="app-loading-brand">ACE_CV</p>
          <p className="app-loading-label">
            ACE_CV could not finish starting. Please try again.
          </p>
          <button className="app-loading-retry" type="button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </main>
      )
    }

    return this.props.children
  }
}

export function StartupLoaderDismissal() {
  useEffect(() => {
    const loader = document.getElementById('startup-loader')
    document.documentElement.dataset.aceMounted = 'true'

    if (!loader) return undefined

    loader.classList.add('startup-loader--hidden')
    const timeoutId = window.setTimeout(() => loader.remove(), 350)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return null
}
