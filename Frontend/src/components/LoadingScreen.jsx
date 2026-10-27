const LoadingScreen = ({ message = "Preparing your workspace" }) => (
  <main className="app-loading-screen" aria-live="polite">
    <p className="app-loading-brand">ACE CV</p>
    <p className="app-loading-label">{message}</p>
    <div
      className="app-loading-track"
      role="progressbar"
      aria-label="Loading page"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span className="app-loading-bar" />
    </div>
  </main>
)

export default LoadingScreen