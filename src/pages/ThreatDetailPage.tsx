
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, FileText, ExternalLink, BookmarkPlus, Check, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface ThreatDetail {
  id: string;
  title: string;
  description: string;
  discoveredAt: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'mitigated' | 'monitoring';
  mitigationProgress: number;
  mitigationDescription: string;
  targetVectors: string[];
  technicalDetails?: string;
  timeline?: {
    date: string;
    event: string;
  }[];
  recommendations?: string[];
  externalReferences?: {
    title: string;
    url: string;
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

const getStatusStyles = (status: string) => {
  switch(status) {
    case 'active':
      return 'bg-red-500/20 text-red-500 border-red-500/30';
    case 'mitigated':
      return 'bg-green-500/20 text-green-500 border-green-500/30';
    case 'monitoring':
      return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
    default:
      return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
  }
};

// Mock data - would be replaced with real API call
const mockThreatsData: Record<string, ThreatDetail> = {
  "flash-loan-attack": {
    id: "flash-loan-attack",
    title: "Flash Loan Governance Attack",
    description: "Flash loan attack attempted against a major protocol's governance system to pass malicious proposals.",
    discoveredAt: "1 week ago",
    severity: "high",
    status: "mitigated",
    mitigationProgress: 100,
    mitigationDescription: "Governance timelock added. Flash loan protection implemented. Security audit completed.",
    targetVectors: ["DAO governance", "DeFi protocols"],
    technicalDetails: `The attack leveraged a flash loan to borrow a significant amount of governance tokens, 
    allowing the attacker to temporarily gain enough voting power to propose and potentially pass malicious 
    governance proposals. The attack vector specifically targeted protocols without governance timelocks, 
    allowing for same-block proposal and execution. The borrowed tokens were returned in the same transaction, 
    making the attack cost-efficient and difficult to detect in real-time.
    
    Code used in the attack:
    function executeAttack(address target, uint256 amount) external {
      // Borrow tokens via flash loan
      flashLoanProvider.borrow(amount);
      
      // Use borrowed tokens to gain voting power
      governanceToken.delegate(address(this));
      
      // Submit and execute malicious proposal
      target.submitProposal(maliciousProposal);
      target.executeProposal(proposalId);
      
      // Return borrowed tokens
      flashLoanProvider.repay(amount);
    }`,
    timeline: [
      {
        date: "April 22, 2025",
        event: "First detection of attack pattern in testnet environment"
      },
      {
        date: "April 23, 2025",
        event: "Attack attempted on mainnet but failed due to insufficient borrowed funds"
      },
      {
        date: "April 24, 2025",
        event: "Second attack attempt with increased borrowed amount"
      },
      {
        date: "April 24, 2025",
        event: "Protocol team alerted and emergency pause activated"
      },
      {
        date: "April 25, 2025",
        event: "Governance timelock implemented and protocol reactivated"
      }
    ],
    recommendations: [
      "Implement governance timelocks for all DAO-controlled protocols",
      "Add flash loan protection measures to governance contracts",
      "Use token voting snapshots taken at least 1 block before proposal submissions",
      "Consider implementing voting power accrual over time to prevent sudden power accumulation"
    ],
    externalReferences: [
      {
        title: "Understanding Flash Loan Attacks in DeFi - Messari Research",
        url: "https://messari.io/report/flash-loan-attacks"
      },
      {
        title: "Security Best Practices for Governance Systems - Solana Foundation",
        url: "https://solana.org/security/governance-best-practices"
      }
    ]
  },
  "dns-spoofing": {
    id: "dns-spoofing",
    title: "DNS Spoofing Attack Targeting Solana Users",
    description: "Sophisticated DNS spoofing attack redirecting users to malicious sites that mimic popular Solana wallets and DeFi interfaces.",
    discoveredAt: "2 days ago",
    severity: "critical",
    status: "active",
    mitigationProgress: 45,
    mitigationDescription: "Major DNS providers alerted. Browser extension warnings deployed.",
    targetVectors: ["Wallet users", "DeFi interfaces"],
    technicalDetails: `The attack involves compromising DNS resolution to redirect users attempting to access legitimate Solana 
    services to nearly identical phishing sites. The attackers have created pixel-perfect replicas of popular wallet 
    interfaces and DeFi applications. When users connect their wallets or enter seed phrases, the credentials are stolen.
    
    The attackers are using a combination of techniques:
    1. DNS cache poisoning
    2. BGP hijacking in some cases
    3. Compromised routers with modified DNS settings
    
    The phishing sites use valid SSL certificates obtained through legitimate certificate authorities, making them 
    appear secure to end users. The domains typically use homograph attacks (visually similar characters) or 
    typosquatting to appear legitimate.`,
    timeline: [
      {
        date: "April 27, 2025",
        event: "First reports of users losing funds after visiting what appeared to be legitimate sites"
      },
      {
        date: "April 28, 2025",
        event: "Pattern identified linking multiple reports to DNS resolution issues"
      },
      {
        date: "April 28, 2025",
        event: "Security researchers confirm DNS spoofing attack in progress"
      }
    ],
    recommendations: [
      "Always verify wallet addresses before approving transactions",
      "Use hardware wallets when possible",
      "Bookmark legitimate sites rather than using search engines",
      "Enable DNSSEC where available",
      "Check for subtle differences in URLs and interface elements"
    ],
    externalReferences: [
      {
        title: "Ongoing DNS Spoofing Campaign - Security Advisory",
        url: "https://security.example.com/advisories/dns-spoofing-solana"
      },
      {
        title: "How to Protect Against DNS Attacks - Blockchain Security Guide",
        url: "https://example.org/blockchain-security/dns-protection"
      }
    ]
  }
};

const ThreatDetailPage: React.FC = () => {
  const { threatId } = useParams<{ threatId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [threatDetail, setThreatDetail] = useState<ThreatDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchThreatDetail = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (threatId && mockThreatsData[threatId]) {
          setThreatDetail(mockThreatsData[threatId]);
        } else {
          toast({
            title: "Threat not found",
            description: "The requested threat details could not be found.",
            variant: "destructive",
          });
          navigate("/threats");
        }
      } catch (error) {
        console.error("Error fetching threat details:", error);
        toast({
          title: "Error",
          description: "Failed to load threat details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchThreatDetail();
  }, [threatId, navigate, toast]);

  const handleAnalysis = () => {
    navigate(`/threats/${threatId}/analysis`);
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "Threat analysis report has been generated and downloaded.",
      });
      setIsGeneratingReport(false);
    }, 1500);
  };

  const handleAddToWatchlist = () => {
    setIsAddedToWatchlist(true);
    toast({
      title: "Added to Watchlist",
      description: "Threat has been added to your security watchlist.",
    });
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
            Back to Threats
          </Button>
        </div>
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="h-8 w-8 rounded-full border-4 border-t-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading threat details...</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  if (!threatDetail) {
    return (
      <DashboardLayout>
        <div className="flex justify-start mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Threats
          </Button>
        </div>
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center">
              <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Threat Not Found</h2>
              <p className="text-muted-foreground">The threat you're looking for doesn't exist or has been removed.</p>
              <Button className="mt-4" onClick={() => navigate("/threats")}>View All Threats</Button>
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
          Back to Threats
        </Button>
        
        <div className="flex gap-2">
          <Badge className={getSeverityStyles(threatDetail.severity)}>
            {threatDetail.severity.charAt(0).toUpperCase() + threatDetail.severity.slice(1)}
          </Badge>
          
          <Badge className={getStatusStyles(threatDetail.status)}>
            {threatDetail.status.charAt(0).toUpperCase() + threatDetail.status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="border-b">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-2xl font-bold">
              {threatDetail.title}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Discovered {threatDetail.discoveredAt}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p>{threatDetail.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Target Vectors</h3>
                <div className="flex flex-wrap gap-2">
                  {threatDetail.targetVectors.map((vector, index) => (
                    <Badge key={index} variant="outline">
                      {vector}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Mitigation Progress</h3>
                <Progress value={threatDetail.mitigationProgress} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">{threatDetail.mitigationDescription}</p>
              </div>
              
              {threatDetail.recommendations && (
                <div>
                  <h3 className="font-medium mb-2">Recommendations</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {threatDetail.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm">{recommendation}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="technical" className="p-6">
              {threatDetail.technicalDetails ? (
                <div>
                  <h3 className="font-medium mb-2">Technical Analysis</h3>
                  <Card className="bg-muted/30 border-muted">
                    <CardContent className="py-4">
                      <pre className="text-sm font-mono whitespace-pre-wrap overflow-auto max-h-[400px]">
                        {threatDetail.technicalDetails}
                      </pre>
                    </CardContent>
                  </Card>
                  
                  {threatDetail.externalReferences && (
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">External References</h3>
                      <div className="space-y-2">
                        {threatDetail.externalReferences.map((ref, index) => (
                          <a 
                            key={index} 
                            href={ref.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <span>{ref.title}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">No technical details available</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="timeline" className="p-6">
              {threatDetail.timeline ? (
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-border"></div>
                  <div className="space-y-6">
                    {threatDetail.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 z-10"></div>
                        <div>
                          <p className="font-medium">{event.date}</p>
                          <p className="text-sm text-muted-foreground">{event.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">No timeline available</p>
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
            onClick={handleAnalysis}
          >
            Full Analysis
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

export default ThreatDetailPage;
