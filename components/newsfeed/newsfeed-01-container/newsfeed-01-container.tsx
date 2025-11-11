'use client';

import Link from 'next/link';
import './newsfeed-01-container.css';

// TypeScript interfaces for article data (matching NewsAPI response)
export interface NewsAPISource {
  id: string | null;
  name: string;
}

export interface NewsAPIArticle {
  source: NewsAPISource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Internal Article interface for our component
export interface Article {
  id: string | number;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  author?: string;
  source?: string;
  publishedAt?: string;
  url?: string;
  category?: string;
}

interface NewsfeedContainerProps {
  articles: Article[];
  isLoading?: boolean;
  error?: string;
  onRefresh?: () => void;
}

export default function Newsfeed01Container({
  articles,
  isLoading = false,
  error,
  onRefresh
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
        {/* Refresh Button */}
        {onRefresh && (
          <div className="newsfeed-refresh-wrapper">
            <button onClick={onRefresh} className="newsfeed-refresh-button">
              REFRESH
            </button>
          </div>
        )}

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
                      <div className="newsfeed-article-author-avatar-placeholder"></div>
                      <div className="newsfeed-article-author-info">
                        <p className="newsfeed-article-author-name">
                          {article.author}
                        </p>
                        <p className="newsfeed-article-author-role">
                          News Author
                        </p>
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
                <Link
                  href={`/newsfeed/${article.id}`}
                  className="newsfeed-article-link"
                >
                  READ MORE →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
