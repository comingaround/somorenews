'use client';

import Link from 'next/link';
import './testfeed-01-container.css';

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

interface TestfeedContainerProps {
  articles: Article[];
  isLoading?: boolean;
  error?: string;
  onRefresh?: () => void;
  currentPage?: number;
}

export default function Testfeed01Container({
  articles,
  isLoading = false,
  error,
  onRefresh,
  currentPage
}: TestfeedContainerProps) {

  // Loading state
  if (isLoading) {
    return (
      <section className="testfeed-01-container">
        <div className="testfeed-container">
          <div className="testfeed-loading">
            <p>Loading articles...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="testfeed-01-container">
        <div className="testfeed-container">
          <div className="testfeed-error">
            <p>Error loading articles: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!articles || articles.length === 0) {
    return (
      <section className="testfeed-01-container">
        <div className="testfeed-container">
          <div className="testfeed-empty">
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
    <section className="testfeed-01-container">
      <div className="testfeed-container">
        {/* Refresh Button */}
        {onRefresh && (
          <div className="testfeed-refresh-wrapper">
            <button onClick={onRefresh} className="testfeed-refresh-button">
              REFRESH
            </button>
            {currentPage && (
              <span className="testfeed-page-counter">Page {currentPage}</span>
            )}
          </div>
        )}

        <div className="testfeed-grid">
          {articles.map((article) => (
            <article key={article.id} className="testfeed-article">
              {/* Article Image */}
              {article.image ? (
                <div className="testfeed-article-image-wrapper">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="testfeed-article-image"
                  />
                </div>
              ) : (
                <div className="testfeed-article-image-placeholder">
                  <span>No Image</span>
                </div>
              )}

              {/* Article Content */}
              <div className="testfeed-article-content">
                {/* Category Tag */}
                {article.category && (
                  <span className="testfeed-article-category">
                    {article.category.toUpperCase()}
                  </span>
                )}

                {/* Title */}
                <h3 className="testfeed-article-title">
                  {article.title}
                </h3>

                {/* Description */}
                {article.description && (
                  <p className="testfeed-article-description">
                    {article.description}
                  </p>
                )}

                {/* Meta Information */}
                <div className="testfeed-article-meta">
                  {/* Author */}
                  {article.author && (
                    <div className="testfeed-article-author">
                      <div className="testfeed-article-author-avatar-placeholder"></div>
                      <div className="testfeed-article-author-info">
                        <p className="testfeed-article-author-name">
                          {article.author}
                        </p>
                        <p className="testfeed-article-author-role">
                          News Author
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Source and Date */}
                  <div className="testfeed-article-info">
                    {article.source && (
                      <span className="testfeed-article-source">{article.source}</span>
                    )}
                    {article.publishedAt && (
                      <span className="testfeed-article-date">
                        {formatDate(article.publishedAt)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/testfeed/${article.id}`}
                  className="testfeed-article-link"
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
