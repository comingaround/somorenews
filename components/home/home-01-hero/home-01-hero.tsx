import './home-01-hero.css';

export default function Home01Hero() {
  return (
    <div className="mockups-container">
      <h1 className="mockups-title">So, more news? - Final Color Scheme</h1>
      <p className="mockups-subtitle">Light & Clean with Coral primary (#F4A261, #E9C46A, #2A9D8F)</p>

      {/* Final Choice */}
      <section className="mockup-section final-choice">
        <div className="theme-label">Final Choice: Coral Primary - Light & Clean aesthetic</div>
        <div className="mockup-content">
          <header className="header">
            <h1 className="logo">So, more news?</h1>
            <nav className="nav">
              <a href="#" className="nav-link">Feed</a>
              <a href="#" className="nav-link">Settings</a>
              <a href="/about" className="nav-link">About</a>
            </nav>
          </header>

          <div className="hero">
            <h2 className="hero-title">News without the noise</h2>
            <p className="hero-text">
              Privacy-first news aggregator. Filter what you want, block what you don't.
              No tracking, no algorithms, just transparency.
            </p>
            <button className="cta-button">Get Started</button>
          </div>

          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Filter Topics</h3>
              <p className="feature-text">Choose exactly what interests you</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚫</div>
              <h3 className="feature-title">Block Content</h3>
              <p className="feature-text">Never see unwanted topics again</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Privacy First</h3>
              <p className="feature-text">Your data stays on your device</p>
            </div>
          </div>

          <div className="news-preview">
            <div className="news-card">
              <span className="news-tag">Technology</span>
              <h4 className="news-title">Example headline about technology news</h4>
              <p className="news-excerpt">Brief excerpt from the article would appear here...</p>
            </div>
            <div className="news-card">
              <span className="news-tag">Politics</span>
              <h4 className="news-title">Example headline about political events</h4>
              <p className="news-excerpt">Brief excerpt from the article would appear here...</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}