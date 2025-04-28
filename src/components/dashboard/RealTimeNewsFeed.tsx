import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { messariService, SolanaNewsItem } from "@/services/messariService";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";

interface RealTimeNewsFeedProps {
  className?: string;
}

const NewsCategory = {
  security: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  fraud: "bg-amber-500/20 text-amber-500 border-amber-500/30",
  hack: "bg-red-500/20 text-red-500 border-red-500/30",
  general: "bg-gray-500/20 text-gray-500 border-gray-500/30"
};

const NewsIcon = {
  security: "🔒",
  fraud: "⚠️",
  hack: "⚡",
  general: "📰"
};

const categorizeNews = (title: string, content: string): 'security' | 'fraud' | 'hack' | 'general' => {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content?.toLowerCase() || '';
  const combinedText = lowerTitle + ' ' + lowerContent;
  
  if (combinedText.includes('hack') || combinedText.includes('exploit') || combinedText.includes('breach')) {
    return 'hack';
  } else if (combinedText.includes('scam') || combinedText.includes('fraud') || combinedText.includes('phish')) {
    return 'fraud';
  } else if (combinedText.includes('security') || combinedText.includes('protect') || combinedText.includes('vulnerability')) {
    return 'security';
  } else {
    return 'general';
  }
};

const calculateRelevance = (title: string, content: string): number => {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content?.toLowerCase() || '';
  let score = 5; // Base score
  
  // Check for Solana mentions
  if (lowerTitle.includes('solana')) score += 2;
  
  // Keywords that add to relevance
  const keywords = ['security', 'hack', 'scam', 'fraud', 'exploit', 'breach', 'vulnerability', 'attack'];
  keywords.forEach(keyword => {
    if (lowerTitle.includes(keyword)) score += 1;
    if (lowerContent.includes(keyword)) score += 0.5;
  });
  
  // Cap the score at 10
  return Math.min(Math.round(score), 10);
};

const RealTimeNewsFeed: React.FC<RealTimeNewsFeedProps> = ({ className }) => {
  const [news, setNews] = useState<Array<SolanaNewsItem & { category: 'security' | 'fraud' | 'hack' | 'general', relevance: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const data = await messariService.getSolanaNews();
        let newsItems = messariService.transformNewsData(data);
        
        if (newsItems.length === 0) {
          // If no real data, use mock data
          newsItems = mockNews;
        }
        
        // Enrich news with category and relevance
        const enrichedNews = newsItems.map(item => ({
          ...item,
          category: categorizeNews(item.title, item.content || ''),
          relevance: calculateRelevance(item.title, item.content || '')
        }));
        
        setNews(enrichedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        toast({
          title: "Error",
          description: "Could not fetch news data. Using mock data instead.",
          variant: "destructive",
        });
        
        // Use mock data as fallback
        const enrichedMockNews = mockNews.map(item => ({
          ...item,
          category: categorizeNews(item.title, item.content || ''),
          relevance: calculateRelevance(item.title, item.content || '')
        }));
        
        setNews(enrichedMockNews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [toast]);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      
      // If the date is today, show time
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} today`;
      }
      
      // If the date is yesterday
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      if (date.toDateString() === yesterday.toDateString()) {
        return `yesterday`;
      }
      
      // Otherwise show date
      return `${date.toLocaleDateString()}`;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className={cn("cyber-card h-full border-opacity-20", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Security News</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto scrollbar-thumb-muted scrollbar-track-card">
          {isLoading ? (
            <div className="space-y-4 p-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between pt-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            news.map(item => (
              <div key={item.id} className="p-3 border-b border-border last:border-none hover:bg-muted/20 transition-colors">
                <div className="flex gap-3">
                  <div className="text-xl">{NewsIcon[item.category]}</div>
                  <div className="flex-1">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-start gap-1 hover:text-cyber-primary transition-colors"
                    >
                      <h3 className="font-medium text-sm line-clamp-2 flex-1">{item.title}</h3>
                      <ExternalLink className="h-3 w-3 flex-shrink-0 mt-1" />
                    </a>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">
                        {item.author?.name || 'Unknown'} • {formatDate(item.published_at)}
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={cn("text-xs", NewsCategory[item.category])}>
                          {item.category.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={cn("text-xs", "bg-green-500/20 text-green-500 border-green-500/30")}>
                          {item.relevance}/10
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No news available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Mock news data for fallback
const mockNews = [
  {
    id: "news1",
    title: "New phishing campaign targeting Solana users discovered",
    content: "Security researchers have identified a new phishing campaign targeting Solana wallet users through fake airdrops.",
    source: "CryptoSecurity",
    published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    author: {
      name: "CryptoSecurity"
    },
    url: "#",
    references: []
  },
  {
    id: "news2",
    title: "Major exchange enhances security measures for Solana withdrawals",
    content: "Following recent security incidents, a major cryptocurrency exchange has implemented additional verification steps for Solana withdrawals.",
    source: "CoinDesk",
    published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    author: {
      name: "CoinDesk"
    },
    url: "#",
    references: []
  },
  {
    id: "news3",
    title: "Hackers drain $3M from vulnerable Solana DeFi protocol",
    content: "A Solana-based DeFi protocol has been exploited, with attackers making off with approximately $3 million worth of cryptocurrencies.",
    source: "BlockchainTimes",
    published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    author: {
      name: "BlockchainTimes"
    },
    url: "#",
    references: []
  },
  {
    id: "news4",
    title: "Solana Foundation releases security best practices guide",
    content: "The Solana Foundation has published a comprehensive guide on security best practices for developers building on the blockchain.",
    source: "SolanaNews",
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    author: {
      name: "SolanaNews"
    },
    url: "#",
    references: []
  },
  {
    id: "news5",
    title: "New on-chain analysis reveals suspicious token distribution patterns",
    content: "Researchers have identified unusual token distribution patterns that may indicate market manipulation on several Solana-based tokens.",
    source: "CryptoAnalytics",
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    author: {
      name: "CryptoAnalytics"
    },
    url: "#",
    references: []
  }
];

export default RealTimeNewsFeed;
