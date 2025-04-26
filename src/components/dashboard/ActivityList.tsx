
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle } from "lucide-react";

export interface ActivityItem {
  id: string;
  type: "transaction" | "alert" | "news";
  title: string;
  description: string;
  timestamp: string;
  risk?: "high" | "medium" | "low" | "none";
}

interface ActivityListProps {
  items: ActivityItem[];
  className?: string;
}

const ActivityList: React.FC<ActivityListProps> = ({ items, className }) => {
  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case "high":
        return "bg-red-500/20 text-red-500 border-red-500/30";
      case "medium":
        return "bg-amber-500/20 text-amber-500 border-amber-500/30";
      case "low":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-green-500/20 text-green-500 border-green-500/30";
    }
  };

  const getActivityIcon = (type: string, risk?: string) => {
    if (type === "alert" || risk === "high" || risk === "medium") {
      return <AlertTriangle className="h-4 w-4 text-cyber-warning" />;
    }
    return <Shield className="h-4 w-4 text-cyber-primary" />;
  };

  return (
    <Card className={cn("cyber-card h-full border-opacity-20", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {getActivityIcon(item.type, item.risk)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{item.title}</p>
                    <time className="text-xs text-muted-foreground">{item.timestamp}</time>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  {item.risk && (
                    <Badge variant="outline" className={cn("mt-2 text-xs", getRiskColor(item.risk))}>
                      {item.risk.toUpperCase()} RISK
                    </Badge>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ActivityList;
