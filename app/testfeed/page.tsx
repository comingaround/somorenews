'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/general/navbar/navbar";
import Testfeed01Container from "@/components/testfeed/testfeed-01-container/testfeed-01-container";
import { Article, NewsAPIArticle } from "@/components/testfeed/testfeed-01-container/testfeed-01-container";

export default function Testfeed() {
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

      // Paywalled sources to filter out (only most aggressive paywalls)
      const paywalledSources = [
        'Bloomberg',
        'Financial Times'
      ];

      let collectedArticles: Article[] = [];
      let page = currentPage;
      let startPage = currentPage; // Track which page we started from
      let attempts = 0;
      let totalFetched = 0;
      let totalFiltered = 0;

      // Countries to fetch from (for testing purposes to get more articles)
      const countries = ['us', 'gb'];

      console.log(`[FETCH START] Starting from page ${currentPage}`);

      // Keep fetching until we have 12 valid articles
      while (collectedArticles.length < 12 && attempts < 10) {
        // Fetch from both countries
        const fetchPromises = countries.map(country =>
          fetch(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=20&page=${page}&apiKey=${apiKey}`)
        );

        const responses = await Promise.all(fetchPromises);

        // Check if all responses are ok
        for (const response of responses) {
          if (!response.ok) {
            throw new Error('Failed to fetch news');
          }
        }

        const allData = await Promise.all(responses.map(r => r.json()));

        // Log each country's contribution
        allData.forEach((data, index) => {
          console.log(`[FETCH] Page ${page} - ${countries[index].toUpperCase()}: ${data.articles?.length || 0} articles`);
        });

        // Combine articles from all countries
        const combinedArticles = allData.flatMap(data => data.articles || []);

        // Check if we've run out of articles - reset to page 1
        if (!combinedArticles || combinedArticles.length === 0) {
          console.log(`[FETCH] Page ${page} returned no articles from any country. Ran out of content.`);
          if (page === 1) {
            // Already at page 1 and no articles, something is wrong
            break;
          }
          // Reset to beginning
          page = 1;
          startPage = 1; // Update startPage since we reset
          setCurrentPage(1);
          console.log(`[FETCH] Resetting to page 1`);
          continue;
        }

        totalFetched += combinedArticles.length;
        console.log(`[FETCH] Page ${page}: Fetched ${combinedArticles.length} articles from ${countries.join(', ').toUpperCase()}`);

        // Filter out paywalled sources
        const blockedInThisPage = combinedArticles
          .filter((article: NewsAPIArticle) => paywalledSources.includes(article.source.name))
          .map((article: NewsAPIArticle) => article.source.name);

        const validArticles = combinedArticles.filter((article: NewsAPIArticle) =>
          !paywalledSources.includes(article.source.name)
        );

        const filteredCount = combinedArticles.length - validArticles.length;
        totalFiltered += filteredCount;

        if (blockedInThisPage.length > 0) {
          console.log(`[FILTER] Page ${page}: Blocked ${blockedInThisPage.length} articles from: ${blockedInThisPage.join(', ')}`);
        }
        console.log(`[FILTER] Page ${page}: ${validArticles.length} valid articles after filtering`);

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

      console.log(`[FETCH COMPLETE] Total fetched: ${totalFetched}, Filtered out: ${totalFiltered}, Collected: ${collectedArticles.length}`);

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
      <Testfeed01Container
        articles={articles}
        isLoading={loading}
        error={error}
        onRefresh={fetchNews}
        currentPage={displayPage}
      />
    </>
  );
}
