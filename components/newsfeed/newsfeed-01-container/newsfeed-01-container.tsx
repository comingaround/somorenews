'use client';

import './newsfeed-01-container.css';

// TypeScript interfaces for article data
export interface ArticleAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface Article {
  id: string | number;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  author?: ArticleAuthor;
  source?: string;
  publishedAt?: string;
  url?: string;
  category?: string;
}

interface NewsfeedContainerProps {
  articles: Article[];
  isLoading?: boolean;
  error?: string;
}

export default function Newsfeed01Container({
  articles,
  isLoading = false,
  error
}: NewsfeedContainerProps) {

  // Loading state
  if (isLoading) {
    return (
      <section className="newsfeed-01-container">
        <div className="newsfeed-container">
          <div className="newsfeed-loading">
            <p>Loading articles...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="newsfeed-01-container">
        <div className="newsfeed-container">
          <div className="newsfeed-error">
            <p>Error loading articles: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!articles || articles.length === 0) {
    return (
      <section className="newsfeed-01-container">
        <div className="newsfeed-container">
          <div className="newsfeed-empty">
            <p>No articles found. Try adjusting your filters.</p>
          </div>
        </div>
      </section>
    );
  }

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="newsfeed-01-container">
      <div className="newsfeed-container">
        <div className="newsfeed-grid">
          {articles.map((article) => (
            <article key={article.id} className="newsfeed-article">
              {/* Article Image */}
              {article.image ? (
                <div className="newsfeed-article-image-wrapper">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="newsfeed-article-image"
                  />
                </div>
              ) : (
                <div className="newsfeed-article-image-placeholder">
                  <span>No Image</span>
                </div>
              )}

              {/* Article Content */}
              <div className="newsfeed-article-content">
                {/* Category Tag */}
                {article.category && (
                  <span className="newsfeed-article-category">
                    {article.category.toUpperCase()}
                  </span>
                )}

                {/* Title */}
                <h3 className="newsfeed-article-title">
                  {article.title}
                </h3>

                {/* Description */}
                {article.description && (
                  <p className="newsfeed-article-description">
                    {article.description}
                  </p>
                )}

                {/* Meta Information */}
                <div className="newsfeed-article-meta">
                  {/* Author */}
                  {article.author && (
                    <div className="newsfeed-article-author">
                      {article.author.avatar ? (
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="newsfeed-article-author-avatar"
                        />
                      ) : (
                        <div className="newsfeed-article-author-avatar-placeholder"></div>
                      )}
                      <div className="newsfeed-article-author-info">
                        <p className="newsfeed-article-author-name">
                          {article.author.name}
                        </p>
                        {article.author.role && (
                          <p className="newsfeed-article-author-role">
                            {article.author.role}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Source and Date */}
                  <div className="newsfeed-article-info">
                    {article.source && (
                      <span className="newsfeed-article-source">{article.source}</span>
                    )}
                    {article.publishedAt && (
                      <span className="newsfeed-article-date">
                        {formatDate(article.publishedAt)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Read More Link */}
                {article.url && (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="newsfeed-article-link"
                  >
                    READ MORE →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
