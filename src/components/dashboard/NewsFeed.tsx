
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  category: "security" | "fraud" | "hack" | "general";
  relevance: number;
  url: string;
}

interface NewsFeedProps {
  items: NewsItem[];
  className?: string;
}

const NewsCategory = {
  security: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  fraud: "bg-amber-500/20 text-amber-500 border-amber-500/30",
  hack: "bg-red-500/20 text-red-500 border-red-500/30",
  general: "bg-gray-500/20 text-gray-500 border-gray-500/30"
};

const NewsRelevance = (relevance: number) => {
  if (relevance >= 8) return "bg-green-500/20 text-green-500 border-green-500/30";
  if (relevance >= 5) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
  return "bg-gray-500/20 text-gray-500 border-gray-500/30";
};

const NewsIcon = {
  security: "🔒",
  fraud: "⚠️",
  hack: "⚡",
  general: "📰"
};

const NewsItem: React.FC<{ item: NewsItem }> = ({ item }) => {
  return (
    <div className="p-3 border-b border-border last:border-none hover:bg-muted/20 transition-colors">
      <div className="flex gap-3">
        <div className="text-xl">{NewsIcon[item.category]}</div>
        <div className="flex-1">
          <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">{item.source} • {item.timestamp}</p>
            <div className="flex gap-2">
              <Badge variant="outline" className={cn("text-xs", NewsCategory[item.category])}>
                {item.category.toUpperCase()}
              </Badge>
              <Badge variant="outline" className={cn("text-xs", NewsRelevance(item.relevance))}>
                {item.relevance}/10
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsFeed: React.FC<NewsFeedProps> = ({ items, className }) => {
  return (
    <Card className={cn("cyber-card h-full border-opacity-20", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Security News</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto scrollbar-thumb-muted scrollbar-track-card">
          {items.map(item => (
            <NewsItem key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsFeed;
