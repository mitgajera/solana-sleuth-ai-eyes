
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, AlertTriangle, Shield, Search, AlertCircle, LineChart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface ThreatDetail {
  id: string;
  name: string;
  type: 'vulnerability' | 'exploit' | 'scam' | 'malware';
  status: 'active' | 'mitigated' | 'investigating';
  severity: 'critical' | 'high' | 'medium' | 'low';
  discoveredAt: string;
  affectedUsers: number;
  description: string;
  mitigation: string;
  targets: string[];
  mitigationProgress: number;
  detailedAnalysis?: string;
  impactAssessment?: {
    financial: string;
    technical: string;
    reputational: string;
    timeline?: {
      date: string;
      event: string;
    }[];
  };
  indicators?: {
    type: string;
    value: string;
    description: string;
  }[];
  relatedThreats?: {
    id: string;
    name: string;
    type: string;
    status: string;
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
    case 'investigating':
      return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
    case 'mitigated':
      return 'bg-green-500/20 text-green-500 border-green-500/30';
    default:
      return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
  }
};

const getTypeIcon = (type: string) => {
  switch(type) {
    case 'vulnerability':
      return <Shield className="h-5 w-5" />;
    case 'exploit':
      return <AlertTriangle className="h-5 w-5" />;
    case 'scam':
      return <AlertCircle className="h-5 w-5" />;
    case 'malware':
      return <Search className="h-5 w-5" />;
    default:
      return <AlertTriangle className="h-5 w-5" />;
  }
};

// Mock threat details - would be replaced with API data
const mockThreatDetails: Record<string, ThreatDetail> = {
  "threat-1": {
    id: "threat-1",
    name: "Phantom Wallet Phishing Campaign",
    type: "scam",
    status: "active",
    severity: "high",
    discoveredAt: "12 hours ago",
    affectedUsers: 187,
    description: "A sophisticated phishing campaign targeting Phantom wallet users through fake airdrops and malicious websites.",
    mitigation: "User education campaign launched. Security advisory published. Domains reported for takedown.",
    targets: ["Phantom users", "NFT collectors", "New SOL holders"],
    mitigationProgress: 45,
    detailedAnalysis: "This phishing campaign uses sophisticated social engineering tactics, including fake airdrop announcements and cloned websites that mimic legitimate Phantom wallet interfaces. The attackers are using Telegram channels and fake Twitter accounts to distribute links to these malicious sites.\n\nWhen users connect their wallets to these sites, the attackers gain approval to drain tokens and NFTs. The campaign has been active for approximately 72 hours and has already affected 187 users with an estimated total loss of approximately 2,800 SOL (~$420,000).\n\nThe primary distribution vectors include:\n1. Fake Telegram channels pretending to offer exclusive airdrops\n2. Promoted tweets with misleading information\n3. Discord spam messages targeting NFT community servers",
    impactAssessment: {
      financial: "Estimated 2,800 SOL (~$420,000) stolen to date. Potential for significantly more damage if not mitigated quickly.",
      technical: "Low to moderate technical sophistication. The attack relies primarily on social engineering rather than technical vulnerabilities.",
      reputational: "High impact on user trust in the Phantom wallet and Solana ecosystem, particularly for newer users who may be less familiar with security best practices.",
      timeline: [
        { date: "April 26, 2025", event: "First reports of suspicious airdrops in Discord communities" },
        { date: "April 27, 2025", event: "Identified first phishing domains and wallet drains" },
        { date: "April 28, 2025", event: "Public security advisory issued" },
        { date: "April 28, 2025", event: "Domain takedown requests submitted" }
      ]
    },
    indicators: [
      { type: "Domain", value: "phantom-wallet.org", description: "Fake Phantom wallet site" },
      { type: "Domain", value: "phantom-airdrop.com", description: "Fake airdrop claim site" },
      { type: "Wallet", value: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4", description: "Attacker wallet receiving stolen funds" },
      { type: "Social", value: "@phantom_official_airdrop", description: "Fake Telegram channel" }
    ],
    relatedThreats: [
      { 
        id: "related-1",
        name: "Similar Metamask phishing campaign (Ethereum)",
        type: "scam",
        status: "active"
      },
      {
        id: "related-2",
        name: "Previous Phantom wallet drain (December 2024)",
        type: "scam",
        status: "mitigated"
      }
    ]
  },
  "threat-5": {
    id: "threat-5",
    name: "Malicious Browser Extension",
    type: "malware",
    status: "active",
    severity: "critical",
    discoveredAt: "2 days ago",
    affectedUsers: 219,
    description: "Browser extension masquerading as wallet helper that captures seed phrases and private keys from users.",
    mitigation: "Reports filed with browser stores. User alerts published. Scanning tools updated to detect the malware.",
    targets: ["Browser wallet users", "Chrome/Firefox users"],
    mitigationProgress: 60,
    detailedAnalysis: "A sophisticated browser extension malware has been identified targeting Solana users. This malware masquerades as a helpful wallet utility extension that promises to enhance wallet functionality, monitor for airdrops, or optimize gas fees. Once installed, the extension monitors clipboard activity for wallet seed phrases and private keys, and can also inject malicious code into wallet websites to steal credentials during login.\n\nThe extension operates with advanced evasion techniques, including delayed activation to avoid detection during security reviews and dynamic code loading to hide malicious functionality. According to our analysis, the extension has been downloaded approximately 5,700 times across Chrome and Firefox browsers, with 219 confirmed compromised wallets to date.\n\nThe malware authors used sophisticated techniques to boost the extension's visibility, including fake reviews, artificial download counts, and SEO manipulation to appear high in search results.",
    impactAssessment: {
      financial: "Estimated 15,800 SOL (~$2.37M) stolen. Additional tokens and NFTs valued at approximately $850,000 also compromised.",
      technical: "High technical sophistication. The malware employs obfuscation, delayed payload activation, and anti-debugging techniques.",
      reputational: "Moderate impact on the broader Solana ecosystem. Significant trust concerns for browser-based wallet solutions.",
      timeline: [
        { date: "April 25, 2025", event: "First user reports of suspicious wallet drains" },
        { date: "April 26, 2025", event: "Extension identified as malware vector" },
        { date: "April 27, 2025", event: "Reports filed with Chrome and Firefox web stores" },
        { date: "April 28, 2025", event: "Public security advisory issued" },
        { date: "April 29, 2025", event: "Chrome extension removed, Firefox still pending review" }
      ]
    },
    indicators: [
      { type: "Extension", value: "Solana Wallet Helper", description: "Malicious Chrome extension" },
      { type: "Extension", value: "Solana Wallet Pro Tools", description: "Malicious Firefox extension" },
      { type: "Domain", value: "sol-wallet-helper-api.com", description: "Command & control server" },
      { type: "Wallet", value: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1", description: "Primary attacker wallet" }
    ],
    relatedThreats: [
      { 
        id: "related-1",
        name: "Similar Chrome extension malware from March 2025",
        type: "malware",
        status: "mitigated"
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

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchThreatDetail = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (threatId && mockThreatDetails[threatId]) {
          setThreatDetail(mockThreatDetails[threatId]);
        } else {
          toast({
            title: "Threat not found",
            description: "The requested threat analysis could not be found.",
            variant: "destructive",
          });
          navigate("/threats");
        }
      } catch (error) {
        console.error("Error fetching threat details:", error);
        toast({
          title: "Error",
          description: "Failed to load threat analysis.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchThreatDetail();
  }, [threatId, navigate, toast]);

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
              <p className="text-muted-foreground">Loading threat analysis...</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  if (!threatDetail) {
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
              <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Threat Not Found</h2>
              <p className="text-muted-foreground">The threat analysis you're looking for doesn't exist or has been removed.</p>
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
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${ 
              threatDetail.type === 'vulnerability' ? 'bg-blue-500/20' : 
              threatDetail.type === 'exploit' ? 'bg-amber-500/20' : 
              threatDetail.type === 'scam' ? 'bg-red-500/20' : 
              'bg-purple-500/20' 
            }`}>
              {getTypeIcon(threatDetail.type)}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                {threatDetail.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-3 w-3" /> Discovered {threatDetail.discoveredAt}
                {threatDetail.affectedUsers > 0 && (
                  <>
                    <span>•</span>
                    <span>{threatDetail.affectedUsers} affected users</span>
                  </>
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="analysis" className="w-full mb-6">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="related">Related Threats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p>{threatDetail.description}</p>
                </div>
                
                {threatDetail.detailedAnalysis && (
                  <div>
                    <h3 className="font-medium mb-2">Technical Analysis</h3>
                    <div className="whitespace-pre-line bg-muted/30 p-4 rounded-md">
                      {threatDetail.detailedAnalysis}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium mb-2">Target Vectors</h3>
                  <div className="flex flex-wrap gap-2">
                    {threatDetail.targets.map((target, index) => (
                      <Badge key={index} variant="outline" className="bg-cyan-950/20">
                        {target}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">Mitigation Progress</h3>
                    <span className="text-sm text-muted-foreground">{threatDetail.mitigationProgress}%</span>
                  </div>
                  <Progress value={threatDetail.mitigationProgress} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">{threatDetail.mitigation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="indicators" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Threat Indicators</CardTitle>
              <CardDescription>Observed indicators associated with this threat</CardDescription>
            </CardHeader>
            <CardContent>
              {threatDetail.indicators && threatDetail.indicators.length > 0 ? (
                <div className="space-y-4">
                  {threatDetail.indicators.map((indicator, index) => (
                    <div key={index} className="p-3 border border-border rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">{indicator.type}</span>
                        <Badge variant="outline" className="bg-cyan-950/20">{indicator.value}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{indicator.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No indicators available for this threat</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impact" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Impact Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              {threatDetail.impactAssessment ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Financial Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{threatDetail.impactAssessment.financial}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Technical Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{threatDetail.impactAssessment.technical}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Reputational Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{threatDetail.impactAssessment.reputational}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {threatDetail.impactAssessment.timeline && (
                    <div>
                      <h3 className="text-sm font-medium mb-3">Timeline</h3>
                      <div className="relative pl-6 border-l border-border space-y-4">
                        {threatDetail.impactAssessment.timeline.map((event, index) => (
                          <div key={index} className="relative">
                            <div className="absolute -left-[23px] w-5 h-5 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{event.date}</p>
                              <p className="text-sm text-muted-foreground">{event.event}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <LineChart className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No impact assessment available for this threat</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="related" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Related Threats</CardTitle>
              <CardDescription>Other threats that may be connected to this incident</CardDescription>
            </CardHeader>
            <CardContent>
              {threatDetail.relatedThreats && threatDetail.relatedThreats.length > 0 ? (
                <div className="space-y-3">
                  {threatDetail.relatedThreats.map((related, index) => (
                    <div key={index} className="p-3 border border-border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">{related.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="bg-cyan-950/20">{related.type}</Badge>
                          <Badge 
                            className={
                              related.status === 'active' ? 'bg-red-500/20 text-red-500 border-red-500/30' : 
                              related.status === 'investigating' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 
                              'bg-green-500/20 text-green-500 border-green-500/30'
                            }
                          >
                            {related.status.charAt(0).toUpperCase() + related.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No related threats identified</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between">
        <Button variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          Add to Watchlist
        </Button>
        
        <Button>Generate Report</Button>
      </div>
    </DashboardLayout>
  );
};

export default ThreatDetailPage;
