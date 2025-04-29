
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, AlertTriangle, Shield, FileText, BookmarkPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AlertDetail {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: string;
  timestamp: string;
  source: string;
  affectedAddresses?: string[];
  technicalDetails?: string;
  recommendedActions?: string[];
  relatedIncidents?: {
    id: string;
    title: string;
    date: string;
  }[];
}

const getSeverityStyles = (severity: string) => {
  switch(severity) {
    case 'critical':
      return 'bg-red-500/20 text-red-500 border-red-500/30';
    case 'high':
      return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
    case 'low':
      return 'bg-green-500/20 text-green-500 border-green-500/30';
    default:
      return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
  }
};

// Mock data - would be replaced with real API call
const mockAlertsData: Record<string, AlertDetail> = {
  "unusual-transaction": {
    id: "unusual-transaction",
    title: "Unusual transaction pattern detected",
    description: "A series of high-value transactions from flagged address 0x1a2b...3c4d has been detected.",
    severity: "high",
    status: "Active",
    timestamp: "10 minutes ago",
    source: "Transaction Monitor",
    affectedAddresses: [
      "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s",
      "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a"
    ],
    technicalDetails: "Multiple transactions exceeding 10,000 SOL were executed within a 5-minute window from addresses previously associated with suspicious activity. The pattern matches known strategies for token price manipulation and potential rug pulls.",
    recommendedActions: [
      "Monitor the flagged address for further activity",
      "Consider adding the address to your watchlist",
      "Exercise caution when interacting with projects associated with this address"
    ],
    relatedIncidents: [
      {
        id: "tx-pattern-1",
        title: "Similar pattern detected last month",
        date: "March 24, 2025"
      }
    ]
  },
  "new-vulnerability": {
    id: "new-vulnerability",
    title: "New security vulnerability disclosed",
    description: "A critical vulnerability (CVE-2025-1234) has been disclosed affecting Solana DeFi protocols.",
    severity: "critical",
    status: "Active",
    timestamp: "1 hour ago",
    source: "Security Feed",
    technicalDetails: "CVE-2025-1234 affects smart contract implementations using a specific arithmetic calculation pattern found in several major DeFi protocols. The vulnerability allows an attacker to potentially drain funds by exploiting an overflow condition during collateral calculations.",
    recommendedActions: [
      "Immediately update affected protocols to the latest version",
      "Avoid using vulnerable protocols until patches are confirmed",
      "Monitor your positions in affected protocols"
    ],
    relatedIncidents: [
      {
        id: "related-vuln-1",
        title: "Previous arithmetic vulnerability (CVE-2024-5678)",
        date: "November 12, 2024"
      }
    ]
  },
  "whale-movement": {
    id: "whale-movement",
    title: "Whale wallet movement detected",
    description: "A wallet containing over 500,000 SOL has started moving funds to exchanges.",
    severity: "medium",
    status: "Monitoring",
    timestamp: "3 hours ago",
    source: "Whale Watch",
    affectedAddresses: [
      "Sol1n1SqbvP5csyn2fzkZTFdKCFpkDxr7zdCuEKoHTk"
    ],
    technicalDetails: "Wallet containing approximately 528,420 SOL (valued at $78.9M) has moved 125,000 SOL to Binance and 75,000 SOL to OKX within the past 3 hours. This represents a significant portion of their holdings and may signal potential selling pressure.",
    recommendedActions: [
      "Monitor SOL price action over the next 24-48 hours",
      "Be aware of increased volatility potential",
      "Consider hedging strategies if you have significant SOL exposure"
    ]
  }
};

const AlertDetailPage: React.FC = () => {
  const { alertId } = useParams<{ alertId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [alertDetail, setAlertDetail] = useState<AlertDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAlertDetail = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (alertId && mockAlertsData[alertId]) {
          setAlertDetail(mockAlertsData[alertId]);
        } else {
          toast({
            title: "Alert not found",
            description: "The requested alert details could not be found.",
            variant: "destructive",
          });
          navigate("/alerts");
        }
      } catch (error) {
        console.error("Error fetching alert details:", error);
        toast({
          title: "Error",
          description: "Failed to load alert details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlertDetail();
  }, [alertId, navigate, toast]);

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "Security analysis report has been generated and downloaded.",
      });
      setIsGeneratingReport(false);
    }, 1500);
  };

  const handleAddToWatchlist = () => {
    setIsAddedToWatchlist(true);
    toast({
      title: "Added to Watchlist",
      description: "Alert has been added to your security watchlist.",
    });
  };

  const handleViewAllAlerts = () => {
    navigate("/alerts");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Alerts
          </Button>
        </div>
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="h-8 w-8 rounded-full border-4 border-t-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading alert details...</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  if (!alertDetail) {
    return (
      <DashboardLayout>
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Alerts
          </Button>
        </div>
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center">
              <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Alert Not Found</h2>
              <p className="text-muted-foreground">The alert you're looking for doesn't exist or has been removed.</p>
              <Button className="mt-4" onClick={() => navigate("/alerts")}>View All Alerts</Button>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Alerts
        </Button>
        
        <Badge className={getSeverityStyles(alertDetail.severity)}>
          {alertDetail.severity.charAt(0).toUpperCase() + alertDetail.severity.slice(1)}
        </Badge>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              {alertDetail.title}
            </CardTitle>
            <Badge variant="outline">
              {alertDetail.status}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {alertDetail.timestamp} • {alertDetail.source}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p>{alertDetail.description}</p>
              </div>
              
              {alertDetail.affectedAddresses && (
                <div>
                  <h3 className="font-medium mb-2">Affected Addresses</h3>
                  <div className="space-y-2">
                    {alertDetail.affectedAddresses.map((address, index) => (
                      <div key={index} className="flex items-center p-2 bg-muted/30 rounded-md font-mono text-sm overflow-auto">
                        {address}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {alertDetail.relatedIncidents && (
                <div>
                  <h3 className="font-medium mb-2">Related Incidents</h3>
                  <div className="space-y-2">
                    {alertDetail.relatedIncidents.map((incident, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                        <div>
                          <p className="font-medium">{incident.title}</p>
                          <p className="text-sm text-muted-foreground">{incident.date}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/alerts/${incident.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="technical" className="pt-4">
              {alertDetail.technicalDetails && (
                <div>
                  <h3 className="font-medium mb-2">Technical Details</h3>
                  <Card className="bg-muted/30 border-muted">
                    <CardContent className="py-4">
                      <p className="text-sm font-mono">{alertDetail.technicalDetails}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="actions" className="pt-4">
              {alertDetail.recommendedActions && (
                <div>
                  <h3 className="font-medium mb-2">Recommended Actions</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {alertDetail.recommendedActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button 
          variant="outline" 
          className="gap-2" 
          onClick={handleAddToWatchlist}
          disabled={isAddedToWatchlist}
        >
          {isAddedToWatchlist ? (
            <>
              <Check className="h-4 w-4" />
              Added to Watchlist
            </>
          ) : (
            <>
              <BookmarkPlus className="h-4 w-4" />
              Add to Watchlist
            </>
          )}
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={handleViewAllAlerts}
          >
            View All Alerts
          </Button>
          
          <Button 
            className="gap-2" 
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlertDetailPage;
