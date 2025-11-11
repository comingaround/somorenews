import './home-01-hero.css';

export default function Home01Hero() {
  return (
    <section className="home-01-hero">
      <div className="hero-container">
        {/* Main Headline */}
        <h1 className="hero-title">
          TODAY <span className="hero-title-accent">NEWS</span>
        </h1>

        {/* Search and Filter Section */}
        <div className="hero-controls">
          {/* Search Bar */}
          <div className="hero-search">
            <svg className="hero-search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="SEARCH...."
              className="hero-search-input"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="hero-categories">
            <button className="hero-category">ACADEMIC</button>
            <button className="hero-category hero-category-active">HUMAN & ENVIRONMENT</button>
            <button className="hero-category">SPORTS</button>
            <button className="hero-category">POLITICAL</button>
            <button className="hero-category">MUSIC</button>
            <button className="hero-category">FINANCIAL MARKET</button>
            <button className="hero-category">OTHER</button>
          </div>
        </div>
      </div>
    </section>
  );
}