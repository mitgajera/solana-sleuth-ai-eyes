
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, DollarSign, BarChart3 } from "lucide-react";
import { messariService } from "@/services/messariService";
import { useToast } from "@/hooks/use-toast";

interface SolanaMetricsCardProps {
  className?: string;
}

const SolanaMetricsCard: React.FC<SolanaMetricsCardProps> = ({ className }) => {
  const [solanaData, setSolanaData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSolanaData = async () => {
      try {
        setIsLoading(true);
        const data = await messariService.getSolanaAssetData();
        const transformedData = messariService.transformSolanaData(data);
        setSolanaData(transformedData);
      } catch (error) {
        console.error("Error fetching Solana data:", error);
        toast({
          title: "Error",
          description: "Could not fetch Solana metrics. Please check your API key configuration.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolanaData();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchSolanaData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [toast]);

  const formatCurrency = (value: number): string => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const formatNumber = (value: number): string => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(0);
  };

  return (
    <Card className={cn("cyber-card h-full border-opacity-20", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Solana Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : solanaData?.marketData ? (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center text-muted-foreground text-sm">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>Price</span>
              </div>
              <p className="text-2xl font-bold">
                ${solanaData.marketData.price_usd.toFixed(2)}
              </p>
              <div className={cn(
                "text-xs font-medium flex items-center",
                solanaData.marketData.percent_change_24h >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {solanaData.marketData.percent_change_24h >= 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(solanaData.marketData.percent_change_24h).toFixed(2)}% (24h)
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-muted-foreground text-sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>Volume (24h)</span>
              </div>
              <p className="text-2xl font-bold">
                {formatCurrency(solanaData.marketData.volume_last_24_hours)}
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-muted-foreground text-sm">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
                </svg>
                <span>Market Cap</span>
              </div>
              <p className="text-2xl font-bold">
                {formatCurrency(solanaData.marketCap || 0)}
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center text-muted-foreground text-sm">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
                <span>Active Addresses</span>
              </div>
              <p className="text-2xl font-bold">
                {formatNumber(solanaData.activeAddresses || 246000)}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32">
            <p className="text-muted-foreground">No metrics data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolanaMetricsCard;
