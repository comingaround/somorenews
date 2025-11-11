'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "@/components/general/navbar/navbar";
import { Article } from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";
import './article-detail.css';

export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve articles from localStorage
    if (typeof window !== 'undefined') {
      const storedArticles = localStorage.getItem('newsfeed_articles');
      if (storedArticles) {
        const articles: Article[] = JSON.parse(storedArticles);
        const foundArticle = articles.find(a => a.id === articleId);
        setArticle(foundArticle || null);
      }
    }
    setLoading(false);
  }, [articleId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="article-detail-container">
          <div className="article-detail-loading">Loading article...</div>
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="article-detail-container">
          <div className="article-detail-error">
            Article not found. Please return to the newsfeed.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <article className="article-detail-container">
        <div className="article-detail-content">
          {/* Source Badge */}
          <span className="article-detail-source-badge">
            {article.source?.toUpperCase() || 'NEWS'}
          </span>

          {/* Title */}
          <h1 className="article-detail-title">{article.title}</h1>

          {/* Date */}
          {article.publishedAt && (
            <div className="article-detail-date">
              {formatDate(article.publishedAt)}
            </div>
          )}

          {/* Separator */}
          <hr className="article-detail-separator" />

          {/* Article Image */}
          {article.image && (
            <div className="article-detail-image-wrapper">
              <img
                src={article.image}
                alt={article.title}
                className="article-detail-image"
              />
            </div>
          )}

          {/* Description */}
          {article.description && (
            <div className="article-detail-description">
              {article.description}
            </div>
          )}

          {/* Content */}
          {article.content && (
            <div className="article-detail-body">
              {article.content.replace(/\[\+\d+ chars\]$/, '')}
            </div>
          )}

          {/* Separator */}
          <hr className="article-detail-separator" />

          {/* Action Buttons */}
          <div className="article-detail-actions">
            <button
              onClick={() => router.back()}
              className="article-detail-back-button"
            >
              ← BACK TO NEWSFEED
            </button>
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-detail-link-button"
              >
                READ FULL ARTICLE AT SOURCE →
              </a>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
