import Navbar from "@/components/general/navbar/navbar";
import Newsfeed01Container from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";
import { Article } from "@/components/newsfeed/newsfeed-01-container/newsfeed-01-container";

export default function Newsfeed() {
  // Mock data - this will be replaced with real API data
  const mockArticles: Article[] = [
    {
      id: 1,
      title: "CLIMATE SCIENTISTS WARN OF ACCELERATING ARCTIC ICE MELT",
      description: "New research shows Arctic ice is melting at unprecedented rates, with significant implications for global sea levels and weather patterns. Scientists urge immediate action.",
      image: "/placeholder-news-1.jpg",
      category: "HUMAN & ENVIRONMENT",
      author: {
        name: "Dr. Sarah Johnson",
        role: "Environmental Correspondent",
      },
      source: "BBC News",
      publishedAt: "2024-01-15T10:30:00Z",
      url: "https://example.com/article-1"
    },
    {
      id: 2,
      title: "BREAKTHROUGH IN RENEWABLE ENERGY STORAGE TECHNOLOGY",
      description: "Researchers have developed a new battery technology that could revolutionize renewable energy storage, making solar and wind power more reliable and cost-effective.",
      category: "ACADEMIC",
      author: {
        name: "Michael Chen",
        role: "Science Editor",
      },
      source: "Reuters",
      publishedAt: "2024-01-15T09:15:00Z",
      url: "https://example.com/article-2"
    },
    {
      id: 3,
      title: "INTERNATIONAL SUMMIT ADDRESSES OCEAN PLASTIC POLLUTION",
      description: "World leaders gather to discuss comprehensive strategies for combating ocean plastic pollution, with binding commitments expected by end of week.",
      image: "/placeholder-news-2.jpg",
      category: "POLITICAL",
      author: {
        name: "Emma Williams",
        role: "Political Analyst",
      },
      source: "The Guardian",
      publishedAt: "2024-01-14T16:45:00Z",
      url: "https://example.com/article-3"
    },
    {
      id: 4,
      title: "NEW STUDY REVEALS BENEFITS OF URBAN GREEN SPACES",
      description: "Comprehensive research demonstrates how urban parks and green spaces significantly improve mental health and community wellbeing in cities worldwide.",
      category: "HUMAN & ENVIRONMENT",
      author: {
        name: "Dr. James Martinez",
        role: "Urban Planning Expert",
      },
      source: "AP News",
      publishedAt: "2024-01-14T14:20:00Z",
      url: "https://example.com/article-4"
    }
  ];

  return (
    <>
      <Navbar />
      <Newsfeed01Container articles={mockArticles} />
    </>
  );
}
