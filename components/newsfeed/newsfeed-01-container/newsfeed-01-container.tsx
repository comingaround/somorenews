'use client';

import React from 'react';
import Link from 'next/link';
import './newsfeed-01-container.css';

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
  currentPage?: number;
  totalPages?: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

export default function Newsfeed01Container({
  articles,
  isLoading = false,
  error,
  currentPage = 1,
  totalPages = 1,
  onNextPage,
  onPrevPage,
  selectedCategory = 'politics',
  onCategoryChange,
  searchQuery = '',
  onSearch
}: NewsfeedContainerProps) {

  const [searchInput, setSearchInput] = React.useState('');

  const categories = [
    { id: 'breaking news', label: 'BREAKING NEWS' },
    { id: 'politics', label: 'POLITICS' },
    { id: 'celebrities', label: 'CELEBRITIES' },
    { id: 'technology', label: 'TECHNOLOGY' },
    { id: 'sports', label: 'SPORTS' },
    { id: 'cars', label: 'AUTO INDUSTRY' },
    { id: 'video games', label: 'VIDEO GAMES' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() && onSearch) {
      onSearch(searchInput.trim());
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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

  return (
    <section className="newsfeed-01-container">
      <div className="newsfeed-container">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="newsfeed-search-form">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for articles..."
            className="newsfeed-search-input"
          />
          <button type="submit" className="newsfeed-search-button">
            SEARCH
          </button>
        </form>

        {/* Category Tabs */}
        <div className="newsfeed-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange?.(cat.id)}
              className={`newsfeed-category ${selectedCategory === cat.id && !searchQuery ? 'newsfeed-category-active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles Grid - 2x2 */}
        {articles.length > 0 ? (
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
        ) : (
          <div className="newsfeed-empty">
            <p>No articles found for this category.</p>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="newsfeed-pagination">
          <button
            onClick={onPrevPage}
            className="newsfeed-pagination-button"
            disabled={currentPage === 1}
          >
            PREVIOUS PAGE
          </button>
          <span className="newsfeed-page-counter">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={onNextPage}
            className="newsfeed-pagination-button"
            disabled={currentPage >= totalPages}
          >
            NEXT PAGE
          </button>
        </div>
      </div>
    </section>
  );
}
