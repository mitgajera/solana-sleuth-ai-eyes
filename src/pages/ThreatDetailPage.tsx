
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle as AlertTriangleIcon, Clock, Calendar, CheckCircle2, Eye, Loader } from "lucide-react";
import { mockThreats } from "@/services/mockData";

// Threat level colors
const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
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

// Get progress color based on percentage
const getProgressColor = (percent: number) => {
  if (percent <= 25) return "bg-red-500";
  if (percent <= 50) return "bg-orange-500";
  if (percent <= 75) return "bg-yellow-500";
  return "bg-green-500";
};

const ThreatDetailPage: React.FC = () => {
  const { threatId } = useParams<{ threatId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [threat, setThreat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [securityScore, setSecurityScore] = useState<number>(0);
  
  useEffect(() => {
    const fetchThreat = async () => {
      try {
        setIsLoading(true);
        // In a real app, we would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
        
        const foundThreat = mockThreats.find(t => t.id === threatId);
        
        if (foundThreat) {
          setThreat(foundThreat);
          setIsInWatchlist(Math.random() > 0.5); // Randomly set watchlist status for demo
          
          // Generate a security score between 30-95
          setSecurityScore(Math.floor(Math.random() * 65) + 30);
        } else {
          toast({
            title: "Threat not found",
            description: `No threat with ID ${threatId} exists.`,
            variant: "destructive",
          });
          navigate("/threats");
        }
      } catch (error) {
        console.error("Error fetching threat details:", error);
        toast({
          title: "Error loading threat",
          description: "Could not load threat details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (threatId) {
      fetchThreat();
    }
  }, [threatId, navigate, toast]);
  
  const handleBack = () => {
    navigate("/threats");
  };
  
  const handleGenerateReport = async () => {
    try {
      setIsGeneratingReport(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
      
      toast({
        title: "Report Generated",
        description: "The detailed threat intelligence report has been generated and saved.",
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
          ? "This threat has been removed from your watchlist." 
          : "This threat has been added to your watchlist.",
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
  
  if (!threat) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <AlertTriangleIcon className="h-16 w-16 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Threat Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The threat intelligence report you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={handleBack}>Go Back to Threats</Button>
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
              Threat Intelligence
            </h1>
            <p className="text-muted-foreground">
              Detailed information about the selected threat
            </p>
          </div>
          
          <Button variant="outline" onClick={handleBack}>
            Back to Threats
          </Button>
        </div>
        
        <Card className="cyber-card border-opacity-20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-semibold mb-1">{threat.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Identified {formatTimeAgo(threat.dateIdentified)}</span>
                  <span className="text-muted-foreground">•</span>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(threat.dateIdentified)}</span>
                </CardDescription>
              </div>
              
              <Badge className={`${getLevelColor(threat.level)} border px-3 py-1`}>
                {threat.level}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-muted/30 rounded-md p-4">
              <p className="font-medium mb-1">Threat Summary</p>
              <p className="text-sm text-muted-foreground">{threat.description}</p>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-3">Threat Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card rounded-md border border-border/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Type</p>
                  <p className="font-semibold">{threat.type}</p>
                </div>
                <div className="bg-card rounded-md border border-border/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Origin</p>
                  <p className="font-semibold">{threat.origin}</p>
                </div>
                <div className="bg-card rounded-md border border-border/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    {threat.status === 'Mitigated' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
                    )}
                    <p className="font-semibold">{threat.status}</p>
                  </div>
                </div>
                <div className="bg-card rounded-md border border-border/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Affected Systems</p>
                  <p className="font-medium">{threat.affectedSystems.join(", ")}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/30 rounded-md border border-border/30 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <p className="font-medium">Threat Mitigation Progress</p>
                <p className="text-sm text-muted-foreground">{threat.mitigationProgress || 0}% Complete</p>
              </div>
              <Progress 
                value={threat.mitigationProgress || 0} 
                className={`h-2 ${getProgressColor(threat.mitigationProgress || 0)}`} 
              />
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-md font-medium mb-3">Technical Analysis</h3>
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="mb-2 bg-background">
                  <TabsTrigger value="details">Attack Vector</TabsTrigger>
                  <TabsTrigger value="ioc">Indicators of Compromise</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="bg-card/30 rounded-md border border-border/30 p-4">
                    <p className="font-medium mb-2">Attack Methodology</p>
                    <p className="text-sm text-muted-foreground">{threat.attackVector?.methodology || "No attack methodology information available."}</p>
                  </div>
                  
                  <div className="bg-card/30 rounded-md border border-border/30 p-4">
                    <p className="font-medium mb-2">Technical Impact</p>
                    <p className="text-sm text-muted-foreground">{threat.attackVector?.impact || "No impact analysis available."}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="ioc">
                  <div className="bg-muted/30 border border-border/30 rounded-md">
                    <div className="p-4 space-y-3">
                      <p className="font-medium mb-2">Known Indicators</p>
                      
                      {threat.indicatorsOfCompromise?.length > 0 ? (
                        threat.indicatorsOfCompromise.map((ioc: any, index: number) => (
                          <div key={index} className="p-2 rounded-md bg-card/30 border border-border/20">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <p className="font-medium text-sm">{ioc.type}</p>
                                <p className="font-mono text-xs text-muted-foreground truncate">
                                  {ioc.value}
                                </p>
                              </div>
                              <Badge variant="outline">{ioc.confidence}% confidence</Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-sm text-muted-foreground py-4">
                          No indicators of compromise found.
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline">
                  <div className="bg-muted/30 border border-border/30 rounded-md p-4">
                    <div className="space-y-4 relative">
                      {threat.timeline?.length > 0 ? (
                        threat.timeline.map((event: any, index: number) => (
                          <div key={index} className="ml-6 relative pb-4">
                            {/* Timeline connector */}
                            {index < threat.timeline.length - 1 && (
                              <div className="absolute left-[-12px] top-2 bottom-0 w-[2px] bg-border"></div>
                            )}
                            
                            {/* Timeline dot */}
                            <div className="absolute left-[-16px] top-1 h-4 w-4 rounded-full bg-primary"></div>
                            
                            <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-sm text-muted-foreground py-4">
                          No timeline events available.
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
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                  <div className="bg-card/40 p-4 rounded-full h-20 w-20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl font-bold">{securityScore}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium mb-1">Security Assessment</p>
                    <p className="text-sm text-muted-foreground">
                      {securityScore >= 70 
                        ? "This threat has been effectively contained and poses minimal risk to network integrity." 
                        : securityScore >= 40 
                          ? "This threat requires attention and has potential to escalate if not addressed promptly."
                          : "This threat poses a serious risk to system security and requires immediate mitigation."}
                    </p>
                  </div>
                </div>
                
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

export default ThreatDetailPage;
