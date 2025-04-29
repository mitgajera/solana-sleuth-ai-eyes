
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Loader, Eye, ShieldAlert, AlertTriangle, Clock, Calendar } from "lucide-react";
import { mockAlerts } from "@/services/mockData";

// Alert severity colors
const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'bg-red-500/20 text-red-500 border-red-500/30';
    case 'high':
      return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
    case 'low':
      return 'bg-green-500/20 text-green-500 border-green-500/30';
    default:
      return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
  }
};

const AlertDetailPage: React.FC = () => {
  const { alertId } = useParams<{ alertId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [alert, setAlert] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  
  useEffect(() => {
    const fetchAlert = async () => {
      try {
        setIsLoading(true);
        // In a real app, we would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API call
        
        const foundAlert = mockAlerts.find(a => a.id === alertId);
        
        if (foundAlert) {
          setAlert(foundAlert);
          setIsInWatchlist(Math.random() > 0.5); // Randomly set watchlist status for demo
        } else {
          toast({
            title: "Alert not found",
            description: `No alert with ID ${alertId} exists.`,
            variant: "destructive",
          });
          navigate("/alerts");
        }
      } catch (error) {
        console.error("Error fetching alert details:", error);
        toast({
          title: "Error loading alert",
          description: "Could not load alert details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (alertId) {
      fetchAlert();
    }
  }, [alertId, navigate, toast]);
  
  const handleBack = () => {
    navigate("/alerts");
  };
  
  const handleGenerateReport = async () => {
    try {
      setIsGeneratingReport(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
      
      toast({
        title: "Report Generated",
        description: "The detailed report has been generated and saved.",
      });
      
      // In a real app, we would handle the report generation and download
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Report Generation Failed",
        description: "Could not generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };
  
  const handleAddToWatchlist = async () => {
    try {
      setIsAddingToWatchlist(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate processing
      
      setIsInWatchlist(!isInWatchlist);
      
      toast({
        title: isInWatchlist ? "Removed from Watchlist" : "Added to Watchlist",
        description: isInWatchlist 
          ? "This alert has been removed from your watchlist." 
          : "This alert has been added to your watchlist.",
      });
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast({
        title: "Action Failed",
        description: "Could not update watchlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToWatchlist(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-20" />
          </div>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-3" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!alert) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Alert Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The alert you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={handleBack}>Go Back to Alerts</Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">
              Alert Details
            </h1>
            <p className="text-muted-foreground">
              Detailed information about the selected security alert
            </p>
          </div>
          
          <Button variant="outline" onClick={handleBack}>
            Back to Alerts
          </Button>
        </div>
        
        <Card className="cyber-card border-opacity-20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-semibold mb-1">{alert.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Detected {formatTimeAgo(alert.timestamp)}</span>
                  <span className="text-muted-foreground">•</span>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(alert.timestamp)}</span>
                </CardDescription>
              </div>
              
              <Badge className={`${getSeverityColor(alert.severity)} border px-3 py-1`}>
                {alert.severity}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-muted/30 rounded-md p-4">
              <p className="font-medium mb-1">Alert Description</p>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-3">Alert Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card rounded-md border border-border/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Alert Type</p>
                  <p className="font-semibold">{alert.type}</p>
                </div>
                <div className="bg-card rounded-md border border-border/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Source</p>
                  <p className="font-semibold">{alert.source}</p>
                </div>
                <div className="bg-card rounded-md border border-border/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    {alert.status === 'Resolved' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <ShieldAlert className="h-4 w-4 text-amber-500" />
                    )}
                    <p className="font-semibold">{alert.status}</p>
                  </div>
                </div>
                <div className="bg-card rounded-md border border-border/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Affected Address</p>
                  <p className="font-mono text-sm truncate">{alert.affectedAddress}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-md font-medium mb-3">Technical Details</h3>
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="mb-2 bg-background">
                  <TabsTrigger value="details">Analysis</TabsTrigger>
                  <TabsTrigger value="transactions">Related Transactions</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="bg-card/30 rounded-md border border-border/30 p-4">
                    <p className="font-medium mb-2">Impact Analysis</p>
                    <p className="text-sm text-muted-foreground">{alert.technicalDetails?.impact || "No impact analysis available."}</p>
                  </div>
                  
                  <div className="bg-card/30 rounded-md border border-border/30 p-4">
                    <p className="font-medium mb-2">Recommendation</p>
                    <p className="text-sm text-muted-foreground">{alert.technicalDetails?.recommendation || "No recommendations available."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="transactions">
                  <div className="bg-muted/30 border border-border/30 rounded-md p-4 space-y-2">
                    {alert.relatedTransactions?.length > 0 ? (
                      alert.relatedTransactions.map((tx: any, index: number) => (
                        <div key={index} className="p-2 rounded-md bg-card/30 border border-border/20">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <p className="font-mono text-xs text-muted-foreground truncate">
                                {tx.hash}
                              </p>
                              <p className="text-sm font-medium">{tx.type}</p>
                            </div>
                            <Badge>{tx.status}</Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-sm text-muted-foreground py-4">
                        No related transactions found.
                      </p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="logs">
                  <div className="bg-muted/50 border border-border/30 rounded-md">
                    <div className="font-mono text-xs p-4 max-h-[300px] overflow-y-auto">
                      {alert.logs?.length > 0 ? (
                        alert.logs.map((log: string, index: number) => (
                          <div key={index} className="pb-1">
                            <span className="text-muted-foreground mr-2">[{index}]</span>
                            <span>{log}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-sm text-muted-foreground py-4">
                          No logs available for this alert.
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-3">Security Analysis</h3>
              <div className="bg-muted/30 rounded-md border border-border/30 p-4">
                <p className="text-sm text-muted-foreground">
                  {alert.securityAnalysis || "No security analysis available for this alert."}
                </p>
                
                <div className="mt-4">
                  <Button variant="secondary" size="sm" className="text-sm">
                    Generate Security Analysis
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2 pb-6">
            <Button 
              onClick={handleGenerateReport} 
              disabled={isGeneratingReport}
              className="w-full sm:w-auto"
            >
              {isGeneratingReport ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
            
            <Button 
              variant={isInWatchlist ? "outline" : "secondary"}
              onClick={handleAddToWatchlist}
              disabled={isAddingToWatchlist}
              className="w-full sm:w-auto"
            >
              {isAddingToWatchlist ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <></>
              )}
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AlertDetailPage;
