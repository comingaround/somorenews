'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/general/navbar/navbar";
import Newsfeed01Container from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";
import { Article, NewsAPIArticle } from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";

export default function Newsfeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchNews = async () => {
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

        // Filter out paywalled sources and map to our Article format
        const filteredArticles = data.articles.filter((article: NewsAPIArticle) =>
          !paywalledSources.includes(article.source.name)
        );

        // Take first 12 non-paywalled articles
        const mappedArticles: Article[] = filteredArticles
          .slice(0, 12)
          .map((article: NewsAPIArticle, index: number) => ({
            id: index,
            title: article.title,
            description: article.description || undefined,
            content: article.content || undefined,
            image: article.urlToImage || undefined,
            author: article.author || undefined,
            source: article.source.name,
            publishedAt: article.publishedAt,
            url: article.url,
          }));

        setArticles(mappedArticles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <Newsfeed01Container
        articles={articles}
        isLoading={loading}
        error={error}
      />
    </>
  );
}
