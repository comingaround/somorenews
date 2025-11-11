import './home-03-news-grid.css';

export default function Home03NewsGrid() {
  // Mock data - will be replaced with real API data later
  const popularNews = [
    {
      id: 1,
      title: 'ESKIMOS BEGAN TO BUILD HUT',
      author: {
        name: 'Jesikaj Loljpoutr',
        role: 'News Author',
        avatar: '/placeholder-avatar.jpg'
      },
      image: '/placeholder-news-1.jpg'
    },
    {
      id: 2,
      title: 'THE OZONE LAYER WAS REPAIRED',
      author: {
        name: 'Edvardo Kluewa',
        role: 'News Author',
        avatar: '/placeholder-avatar.jpg'
      },
      image: '/placeholder-news-2.jpg'
    }
  ];

  const hotNews = [
    {
      id: 1,
      title: 'AMAZON IN BLACKOUT',
      description: 'The Forests Of The Amazon Are Being Destroyed Every Day And There Is No Support Institution And Many Things Will Happen Soon ....',
      author: {
        name: 'Martin Moiuytre',
        role: 'News Author',
        avatar: '/placeholder-avatar.jpg'
      },
      image: '/placeholder-news-3.jpg'
    }
  ];

  return (
    <section className="home-03-news-grid">
      <div className="news-grid-container">
        {/* Left Column: Popular News */}
        <div className="news-column">
          <h2 className="news-column-title">POPULAR NEWS</h2>

          <div className="news-cards">
            {popularNews.map((article) => (
              <article key={article.id} className="news-card news-card-horizontal">
                <div className="news-card-image-wrapper">
                  <div className="news-card-image-placeholder">
                    <span>Image</span>
                  </div>
                </div>

                <div className="news-card-content">
                  <h3 className="news-card-title">{article.title}</h3>

                  <div className="news-card-author">
                    <div className="news-card-avatar-placeholder"></div>
                    <div className="news-card-author-info">
                      <p className="news-card-author-name">{article.author.name}</p>
                      <p className="news-card-author-role">{article.author.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="news-pagination">
            <button className="news-pagination-btn news-pagination-prev">
              <span>&lt;</span>
            </button>
            <button className="news-pagination-btn news-pagination-next news-pagination-active">
              <span>&gt;</span>
            </button>
            <span className="news-pagination-dots">. . . . . .</span>
            <a href="#" className="news-pagination-link">See All</a>
          </div>
        </div>

        {/* Right Column: Hot News */}
        <div className="news-column">
          <h2 className="news-column-title">HOT NEWS</h2>

          <div className="news-cards">
            {hotNews.map((article) => (
              <article key={article.id} className="news-card news-card-vertical">
                <div className="news-card-image-wrapper">
                  <div className="news-card-image-placeholder news-card-image-large">
                    <span>Image</span>
                  </div>

                  {/* Page indicator circles */}
                  <div className="news-card-indicators">
                    <button className="news-card-indicator">↑</button>
                    <div className="news-card-page">01</div>
                    <button className="news-card-indicator">↓</button>
                  </div>
                </div>

                <div className="news-card-content">
                  <h3 className="news-card-title news-card-title-large">{article.title}</h3>
                  <p className="news-card-description">{article.description}</p>
                  <a href="#" className="news-card-more">More</a>

                  <div className="news-card-author">
                    <div className="news-card-avatar-placeholder"></div>
                    <div className="news-card-author-info">
                      <p className="news-card-author-name">{article.author.name}</p>
                      <p className="news-card-author-role">{article.author.role}</p>
                    </div>
                  </div>

                  {/* Social icons */}
                  <div className="news-card-social">
                    <button className="news-card-social-btn">↻</button>
                    <button className="news-card-social-btn">◎</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
