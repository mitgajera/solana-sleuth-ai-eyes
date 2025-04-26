
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn("cyber-card border-opacity-20", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-cyber-primary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`text-xs font-medium mt-1 ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.positive ? '+' : '-'}{Math.abs(trend.value)}%
            <span className="text-muted-foreground ml-1">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
