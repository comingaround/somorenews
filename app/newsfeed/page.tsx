'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/general/navbar/navbar";
import Newsfeed01Container from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";
import { Article, NewsAPIArticle } from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";

export default function Newsfeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayPage, setDisplayPage] = useState(1);

  const fetchNews = async () => {
    setLoading(true);
    setError('');

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

      let collectedArticles: Article[] = [];
      let page = currentPage;
      let startPage = currentPage; // Track which page we started from
      let attempts = 0;

      // Keep fetching until we have 12 valid articles
      while (collectedArticles.length < 12 && attempts < 10) {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&page=${page}&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();

        // Check if we've run out of articles - reset to page 1
        if (!data.articles || data.articles.length === 0) {
          if (page === 1) {
            // Already at page 1 and no articles, something is wrong
            break;
          }
          // Reset to beginning
          page = 1;
          startPage = 1; // Update startPage since we reset
          setCurrentPage(1);
          continue;
        }

        // Filter out paywalled sources
        const validArticles = data.articles.filter((article: NewsAPIArticle) =>
          !paywalledSources.includes(article.source.name)
        );

        // Map to our Article format and add to collection
        const mapped: Article[] = validArticles.map((article: NewsAPIArticle, index: number) => ({
          id: collectedArticles.length + index,
          title: article.title,
          description: article.description || undefined,
          content: article.content || undefined,
          image: article.urlToImage || undefined,
          author: article.author || undefined,
          source: article.source.name,
          publishedAt: article.publishedAt,
          url: article.url,
        }));

        collectedArticles = [...collectedArticles, ...mapped];
        page++;
        attempts++;
      }

      // If we don't have enough articles after all attempts, reset to page 1
      if (collectedArticles.length < 12) {
        setCurrentPage(1);
        setDisplayPage(1);
      } else {
        // Take exactly 12 articles
        setArticles(collectedArticles.slice(0, 12));
        // Update currentPage for next refresh
        setCurrentPage(page);
        // Update display page to show which page user is viewing
        setDisplayPage(startPage);
      }

      // Make sure we always set articles even if less than 12
      if (collectedArticles.length > 0) {
        setArticles(collectedArticles.slice(0, 12));
        setDisplayPage(startPage);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <Newsfeed01Container
        articles={articles}
        isLoading={loading}
        error={error}
        onRefresh={fetchNews}
        currentPage={displayPage}
      />
    </>
  );
}
