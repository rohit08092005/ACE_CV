const LoadingScreen = ({
  message = "Preparing your workspace...",
  error,
  onRetry,
}) => (
  <main className="app-loading-screen" aria-live="polite" aria-busy={!error}>
    <p className="app-loading-brand">ACE_CV</p>
    <p className="app-loading-label">{message}</p>
    {error ? (
      <>
        <p className="app-loading-error" role="alert">{error}</p>
        {onRetry && (
          <button className="app-loading-retry" type="button" onClick={onRetry}>
            Try again
          </button>
        )}
      </>
    ) : (
      <div className="app-loading-track" aria-hidden="true">
        <span className="app-loading-bar" />
      </div>
    )}
  </main>
)

export default LoadingScreen