'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from "@/components/general/navbar/navbar";
import { Article, NewsAPIArticle } from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";
import './article-detail.css';

export default function ArticleDetail() {
  const params = useParams();
  const articleId = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

        if (!apiKey) {
          throw new Error('API key not found');
        }

        // Paywalled sources to filter out
        const paywalledSources = [
          'Bloomberg',
          'The Wall Street Journal',
          'Financial Times',
          'The New York Times',
          'The Washington Post',
          'The Economist',
          'Barron\'s',
          'MarketWatch',
          'The Times',
          'The Telegraph'
        ];

        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();

        // Filter out paywalled sources
        const filteredArticles = data.articles.filter((article: NewsAPIArticle) =>
          !paywalledSources.includes(article.source.name)
        );

        // Find the specific article by index from filtered list
        const foundArticle = filteredArticles[parseInt(articleId)];

        if (!foundArticle) {
          throw new Error('Article not found');
        }

        // Map to our Article format
        const mappedArticle: Article = {
          id: parseInt(articleId),
          title: foundArticle.title,
          description: foundArticle.description || undefined,
          content: foundArticle.content || undefined,
          image: foundArticle.urlToImage || undefined,
          author: foundArticle.author || undefined,
          source: foundArticle.source.name,
          publishedAt: foundArticle.publishedAt,
          url: foundArticle.url,
        };

        setArticle(mappedArticle);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <p>Loading article...</p>
        </main>
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Navbar />
        <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <p>Error: {error || 'Article not found'}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <article className="article-detail">
          <div className="article-detail-container">
            {article.image && (
              <div className="article-detail-image-wrapper">
                <img
                  src={article.image}
                  alt={article.title}
                  className="article-detail-image"
                />
              </div>
            )}

            <div className="article-detail-content">
              <h1 className="article-detail-title">{article.title}</h1>

              <div className="article-detail-meta">
                {article.author && (
                  <span className="article-detail-author">By {article.author}</span>
                )}
                {article.source && (
                  <span className="article-detail-source">{article.source}</span>
                )}
                {article.publishedAt && (
                  <span className="article-detail-date">
                    {formatDate(article.publishedAt)}
                  </span>
                )}
              </div>

              {article.description && (
                <p className="article-detail-description">{article.description}</p>
              )}

              {article.content && (
                <div className="article-detail-body">
                  <p>{article.content.replace(/\[\+\d+ chars\]$/, '')}</p>
                </div>
              )}

              <div className="article-detail-notice">
                <p><strong>Note:</strong> NewsAPI free tier provides article previews only. For the full article, please visit the source link below.</p>
              </div>

              {article.url && (
                <div className="article-detail-footer">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-detail-source-link"
                  >
                    Read full article at {article.source} →
                  </a>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
