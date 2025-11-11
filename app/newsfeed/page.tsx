'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from "@/components/general/navbar/navbar";
import Newsfeed01Container from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";
import { Article, NewsAPIArticle } from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";

export default function Newsfeed() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params or defaults
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'breaking news'
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('search') || ''
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );
  const [totalResults, setTotalResults] = useState(0);

  const articlesPerPage = 4;

  // Update URL when state changes
  const updateURL = (page: number, category: string, search: string) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (search) {
      params.set('search', search);
    } else {
      params.set('category', category);
    }
    router.push(`/newsfeed?${params.toString()}`, { scroll: false });
  };

  const fetchNews = async (query: string, page: number) => {
    setLoading(true);
    setError('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

      if (!apiKey) {
        throw new Error('API key not found');
      }

      console.log(`[FETCH] Query: ${query}, Page: ${page}`);

      // Use /everything endpoint with query parameter (search in title only)
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&searchIn=title&pageSize=${articlesPerPage}&page=${page}&sortBy=popularity&language=en&apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();

      console.log(`[FETCH COMPLETE] Total results: ${data.totalResults}, Fetched: ${data.articles.length}`);

      // Map to our Article format
      const mappedArticles: Article[] = data.articles.map((article: NewsAPIArticle, index: number) => ({
        id: `${page}-${index}`,
        title: article.title,
        description: article.description || undefined,
        content: article.content || undefined,
        image: article.urlToImage || undefined,
        author: article.author || undefined,
        source: article.source.name,
        publishedAt: article.publishedAt,
        url: article.url,
        category: query
      }));

      setArticles(mappedArticles);
      setTotalResults(data.totalResults);

      // Store articles in localStorage for detail page access
      if (typeof window !== 'undefined') {
        localStorage.setItem('newsfeed_articles', JSON.stringify(mappedArticles));
      }

    } catch (err) {
      console.error('[FETCH ERROR]', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch based on search query or selected category
    const query = searchQuery || selectedCategory;
    fetchNews(query, currentPage);
  }, [selectedCategory, searchQuery, currentPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when selecting category
    setCurrentPage(1); // Reset to page 1 when category changes
    updateURL(1, category, '');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(''); // Clear category when searching
    setCurrentPage(1); // Reset to page 1 when searching
    updateURL(1, '', query);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updateURL(newPage, selectedCategory, searchQuery);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateURL(newPage, selectedCategory, searchQuery);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / articlesPerPage);

  return (
    <>
      <Navbar />
      <Newsfeed01Container
        articles={articles}
        isLoading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
    </>
  );
}
