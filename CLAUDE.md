# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**So, more news?** (somorenews.com) - A privacy-first news aggregator with personalized filtering.

### Key Features
- Filter news by topics (politics, technology, sports, etc.)
- Block unwanted content (by keywords in title or full article)
- No data collection - all personalization happens client-side
- User preferences set via question form, stored locally

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Custom CSS (NOT Tailwind, NOT CSS Modules)
- **News Sources**: Will use NewsAPI + RSS feeds
- **Deployment**: TBD

## Component Architecture

### Directory Structure

```
app/
├── page.tsx                    # Home page
├── about/
│   └── page.tsx               # About page
├── layout.tsx                 # Root layout
└── globals.css                # Global styles (mostly empty, component-specific CSS preferred)

components/
├── about/
│   ├── about-01-hero/
│   │   ├── about-01-hero.tsx
│   │   └── about-01-hero.css
│   └── about-02-container/
├── general/
│   ├── footer/
│   └── navbar/
├── home/
│   ├── home-01-hero/
│   │   ├── home-01-hero.tsx
│   │   └── home-01-hero.css
│   └── home-02-container/
└── newsfeed/

for-claude/
├── bugs/                      # Bug reports and issues
└── examples/                  # Code examples and references
```

### Component Naming Convention

**Pattern**: `{page}-{number}-{section}`

Examples:
- `home-01-hero` - First section (hero) on home page
- `home-02-container` - Second section (container) on home page
- `about-01-hero` - First section on about page

**Rules**:
1. Each component gets its own folder
2. Component file and folder have the same name
3. Each component has its own CSS file (no CSS modules)
4. Numbers (01, 02, 03) indicate section order on the page
5. General/shared components go in `components/general/`

### Component Structure

Each component follows this structure:

```tsx
// components/home/home-01-hero/home-01-hero.tsx
import './home-01-hero.css';

export default function Home01Hero() {
  return (
    <div className="home-01-hero">
      {/* Component content */}
    </div>
  );
}
```

### Page Structure

Pages import and compose components:

```tsx
// app/page.tsx
import Home01Hero from "@/components/home/home-01-hero/home-01-hero";

export default function Home() {
  return (
    <Home01Hero />
  );
}
```

**Key Points**:
- Use `@/components` path alias for imports
- Pages are kept minimal - they only compose components
- Each page can have multiple numbered sections

## Design System

### Final Color Scheme

**Palette**: Light & Clean aesthetic
- **Primary (Coral)**: `#F4A261` - CTA buttons, accent elements
- **Secondary (Sandy Yellow)**: `#E9C46A` - Tags, secondary accents
- **Additional (Teal)**: `#2A9D8F` - Borders, feature highlights
- **Text Primary**: `#1a202c` - Main text, logo
- **Text Secondary**: `#4a5568` - Body text, descriptions
- **Background**: `#ffffff` - Clean white backgrounds

### Color Application Guidelines

- **Logo**: Black (`#1a202c`)
- **CTA Buttons**: Coral (`#F4A261`)
- **Feature Card Borders**: Teal (`#2A9D8F`)
- **Feature Titles**: Teal (`#2A9D8F`)
- **News Tags**: Sandy Yellow (`#E9C46A`)
- **Nav Links**: Gray (`#4a5568`), hover Teal (`#2A9D8F`)
- **Backgrounds**: Pure white with subtle borders

### CSS Guidelines

1. **No Tailwind** - Use custom CSS only
2. **No CSS Modules** - Regular CSS files with descriptive class names
3. **Component-scoped styles** - Each component has its own CSS file
4. **Class naming**: Use descriptive names (`.hero-title`, `.feature-card`, `.news-tag`)
5. **Responsive design**: Mobile-first approach with media queries

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Git Workflow

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Your message here"

# Push to GitHub
git push origin main
```

### Adding New Components

1. Create folder: `components/{page}/{page}-{number}-{section}/`
2. Create component file: `{page}-{number}-{section}.tsx`
3. Create CSS file: `{page}-{number}-{section}.css`
4. Import CSS at top of component file
5. Export default function with PascalCase name
6. Import component in relevant page file

Example:
```tsx
// components/home/home-03-features/home-03-features.tsx
import './home-03-features.css';

export default function Home03Features() {
  return (
    <section className="home-03-features">
      {/* Features content */}
    </section>
  );
}
```

```tsx
// app/page.tsx
import Home01Hero from "@/components/home/home-01-hero/home-01-hero";
import Home03Features from "@/components/home/home-03-features/home-03-features";

export default function Home() {
  return (
    <>
      <Home01Hero />
      <Home03Features />
    </>
  );
}
```

## News Aggregation Strategy

### Phase 1: MVP
- **NewsAPI** free tier (100 requests/day)
- Hand-picked RSS feeds from major outlets
- 20-30 curated sources

### Phase 2: Scale
- Upgrade NewsAPI to paid tier ($449/month)
- Add more international sources
- 5,000-10,000 active users supported

### Phase 3: Custom
- Build proprietary aggregator
- Combine multiple APIs + RSS + web scraping
- Full control and lower long-term costs

### News Sources
- **Global**: BBC, Reuters, AP, Guardian (RSS)
- **Lithuanian**: LRT, Delfi, 15min (RSS)
- **Tech**: TechCrunch, Ars Technica, The Verge
- **API**: NewsAPI for search and filtering

## For Claude Reference

### Important Directories
- `/for-claude/bugs/` - Check here for bug reports
- `/for-claude/examples/` - Check here for code examples

### When Making Changes
1. Always follow the component naming convention
2. Keep components modular and self-contained
3. Use the established color scheme
4. Write custom CSS, not Tailwind classes
5. Update this CLAUDE.md if you establish new patterns

### Common Tasks
- **New page component**: Follow `{page}-{number}-{section}` pattern
- **Styling**: Use component-specific CSS file
- **Colors**: Reference the Design System section above
- **Imports**: Use `@/components` path alias

## Project Goals

1. **Privacy-first**: No user tracking, no data collection
2. **User control**: Granular filtering and blocking
3. **Clean UX**: Minimal, readable interface
4. **Performance**: Fast load times, efficient filtering
5. **Transparency**: Clear about what's shown and why

## Notes

- This is a TypeScript project (`.tsx` files)
- Custom CSS only - no Tailwind, no CSS Modules
- Component-based architecture with numbered sections
- Focus on simplicity and user privacy
