# NewsAPI - /everything Endpoint Documentation

Source: https://newsapi.org/docs/endpoints/everything

## Overview
The /everything endpoint enables searching across millions of articles from 150,000+ news sources and blogs, suited for article discovery and analysis.

## Endpoint URL
```
https://newsapi.org/v2/everything
```

## Required Parameters

### apiKey (REQUIRED)
- Your API key
- Can be provided via query parameter OR `X-Api-Key` HTTP header
- Example: `apiKey=YOUR_API_KEY_HERE`

**Note:** You MUST provide at least ONE of the following: `q`, `sources`, or `domains`

## Optional Parameters

### Search & Filtering

**q** (query)
- Keywords or phrases to search for in article title and body
- Supports advanced search operators:
  - **Exact phrases**: Use quotes - `"electric cars"`
  - **Required terms**: Use + prefix - `+bitcoin`
  - **Excluded terms**: Use - prefix - `-bitcoin`
  - **Boolean logic**: AND, OR, NOT operators
  - **Grouping**: Use parentheses - `crypto AND (ethereum OR litecoin) NOT bitcoin`
- Max length: 500 characters
- Must be URL-encoded
- Example: `q=bitcoin`

**searchIn**
- Restrict search to specific fields
- Options: `title`, `description`, `content`
- Default: searches all fields
- Comma-separated for multiple: `title,description`
- Example: `searchIn=title`

**sources**
- Comma-separated string of news source identifiers
- Maximum: 20 sources
- Cannot be mixed with `domains` parameter
- Example: `sources=bbc-news,techcrunch,the-verge`

**domains**
- Comma-separated string of domains to restrict search
- Example: `domains=bbc.co.uk,techcrunch.com`

**excludeDomains**
- Comma-separated string of domains to exclude from results
- Example: `excludeDomains=bloomberg.com`

### Date Range

**from**
- Oldest article date to fetch
- Format: ISO 8601 - `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`
- Example: `from=2024-11-01`

**to**
- Newest article date to fetch
- Format: ISO 8601 - `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`
- Example: `to=2024-11-11`

### Language & Sorting

**language**
- 2-letter ISO-639-1 language code
- Supported languages:
  - `ar` - Arabic
  - `de` - German
  - `en` - English
  - `es` - Spanish
  - `fr` - French
  - `he` - Hebrew
  - `it` - Italian
  - `nl` - Dutch
  - `no` - Norwegian
  - `pt` - Portuguese
  - `ru` - Russian
  - `sv` - Swedish
  - `ud` - Urdu
  - `zh` - Chinese
- Example: `language=en`

**sortBy**
- Order to sort articles
- Options:
  - `relevancy` - Most relevant results first
  - `popularity` - Most popular sources first
  - `publishedAt` - Newest articles first (default)
- Example: `sortBy=publishedAt`

### Pagination

**pageSize**
- Number of results to return per page
- Default: 100
- Maximum: 100
- Example: `pageSize=12`

**page**
- Page number to return
- Default: 1
- Use for pagination through results
- Example: `page=2`

## Response Format

Returns JSON with the following structure:

```json
{
  "status": "ok",
  "totalResults": 12345,
  "articles": [
    {
      "source": {
        "id": "techcrunch",
        "name": "TechCrunch"
      },
      "author": "John Doe",
      "title": "Article Title Here",
      "description": "Article description text",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2024-11-11T10:30:00Z",
      "content": "Article content preview (truncated to ~200 chars) [+1234 chars]"
    }
  ]
}
```

### Response Fields

- **status**: "ok" or "error"
- **totalResults**: Total number of articles matching the query
- **articles**: Array of article objects
  - **source.id**: Identifier for the source
  - **source.name**: Display name of the source
  - **author**: Author of the article (may be null)
  - **title**: Article headline
  - **description**: Article description/summary
  - **url**: Direct link to the article
  - **urlToImage**: URL to article image
  - **publishedAt**: Publication date in ISO 8601 format
  - **content**: Article content preview (truncated to ~200 characters on free tier)

## Important Notes & Limitations

1. **Search Parameter Required**: You MUST specify at least one of: `q`, `sources`, or `domains`

2. **Content Truncation**: Free tier provides only ~200 characters of content followed by `[+X chars]` indicator

3. **Date Range Limitations**: Results limited by your subscription plan's timeframe

4. **Rate Limits**: Subject to your API plan's rate limits

5. **Boolean Search Examples**:
   ```
   crypto AND (ethereum OR litecoin) NOT bitcoin
   "artificial intelligence" AND (openai OR google)
   +technology +innovation -controversy
   ```

6. **URL Encoding**: Remember to URL-encode special characters in query parameters

## Example Requests

### Basic Search
```
https://newsapi.org/v2/everything?q=bitcoin&apiKey=YOUR_API_KEY
```

### Search with Date Range
```
https://newsapi.org/v2/everything?q=technology&from=2024-11-01&to=2024-11-11&apiKey=YOUR_API_KEY
```

### Search Specific Domains
```
https://newsapi.org/v2/everything?q=AI&domains=techcrunch.com,theverge.com&apiKey=YOUR_API_KEY
```

### Advanced Boolean Search
```
https://newsapi.org/v2/everything?q=crypto AND (ethereum OR bitcoin)&sortBy=popularity&apiKey=YOUR_API_KEY
```

### Paginated Results
```
https://newsapi.org/v2/everything?q=sports&pageSize=12&page=2&apiKey=YOUR_API_KEY
```

## Best Practices

1. **Use Specific Queries**: More specific searches return better results
2. **Filter by Date**: Narrow date ranges improve relevance
3. **Sort Appropriately**: Use `relevancy` for searches, `publishedAt` for news feeds
4. **Handle Pagination**: Don't fetch all results at once, paginate as needed
5. **Cache Results**: Reduce API calls by caching recent searches
6. **Handle Errors**: Always check `status` field in response

## Use Cases

- Article discovery and research
- News aggregation
- Historical analysis
- Topic monitoring
- Content curation
- Search functionality for news websites
