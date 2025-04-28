
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Eye, Calendar, ArrowRight, Shield, ExternalLink, Search, Map, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface ThreatItem {
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
}

const ThreatsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [threats] = useState<ThreatItem[]>([
    {
      id: 'threat-1',
      name: 'Phantom Wallet Phishing Campaign',
      type: 'scam',
      status: 'active',
      severity: 'high',
      discoveredAt: '12 hours ago',
      affectedUsers: 187,
      description: 'A sophisticated phishing campaign targeting Phantom wallet users through fake airdrops and malicious websites.',
      mitigation: 'User education campaign launched. Security advisory published. Domains reported for takedown.',
      targets: ['Phantom users', 'NFT collectors', 'New SOL holders'],
      mitigationProgress: 45
    },
    {
      id: 'threat-2',
      name: 'Arithmetic Overflow Vulnerability',
      type: 'vulnerability',
      status: 'mitigated',
      severity: 'critical',
      discoveredAt: '3 days ago',
      affectedUsers: 1200,
      description: 'Critical arithmetic overflow vulnerability found in multiple Solana programs allowing attackers to manipulate token balances.',
      mitigation: 'Patches released for affected protocols. Emergency governance votes executed for program upgrades.',
      targets: ['DeFi protocols', 'Lending platforms', 'Token wrappers'],
      mitigationProgress: 100
    },
    {
      id: 'threat-3',
      name: 'Vanity Address Generation Exploit',
      type: 'exploit',
      status: 'investigating',
      severity: 'medium',
      discoveredAt: '1 day ago',
      affectedUsers: 32,
      description: 'New exploit using similar-looking characters in vanity addresses to trick users into sending funds to attacker-controlled accounts.',
      mitigation: 'Analysis in progress. Advisory drafted. Wallet providers contacted for UI improvements.',
      targets: ['General users', 'P2P transactions'],
      mitigationProgress: 25
    },
    {
      id: 'threat-4',
      name: 'RPC Endpoint Denial of Service',
      type: 'exploit',
      status: 'mitigated',
      severity: 'high',
      discoveredAt: '5 days ago',
      affectedUsers: 0,
      description: 'Coordinated denial of service attack against major Solana RPC providers causing transaction delays and app disruptions.',
      mitigation: 'Rate limiting improved. Traffic filtering rules updated. Infrastructure capacity increased.',
      targets: ['RPC providers', 'Infrastructure'],
      mitigationProgress: 95
    },
    {
      id: 'threat-5',
      name: 'Malicious Browser Extension',
      type: 'malware',
      status: 'active',
      severity: 'critical',
      discoveredAt: '2 days ago',
      affectedUsers: 219,
      description: 'Browser extension masquerading as wallet helper that captures seed phrases and private keys from users.',
      mitigation: 'Reports filed with browser stores. User alerts published. Scanning tools updated to detect the malware.',
      targets: ['Browser wallet users', 'Chrome/Firefox users'],
      mitigationProgress: 60
    },
    {
      id: 'threat-6',
      name: 'Flash Loan Governance Attack',
      type: 'exploit',
      status: 'mitigated',
      severity: 'high',
      discoveredAt: '1 week ago',
      affectedUsers: 0,
      description: 'Flash loan attack attempted against a major protocol's governance system to pass malicious proposals.',
      mitigation: 'Governance timelock added. Flash loan protection implemented. Security audit completed.',
      targets: ['DAO governance', 'DeFi protocols'],
      mitigationProgress: 100
    }
  ]);

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

  const filterThreats = (threats: ThreatItem[], tab: string) => {
    return threats.filter(threat => {
      const matchesSearch = 
        threat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        threat.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      
      if (tab === 'active') return threat.status === 'active';
      if (tab === 'investigating') return threat.status === 'investigating';
      if (tab === 'mitigated') return threat.status === 'mitigated';
      
      return true;
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">THREATS</h1>
        <p className="text-muted-foreground">Identified threats and vulnerabilities on Solana blockchain</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="relative w-full md:w-96">
          <Input
            type="search"
            placeholder="Search threats..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 md:flex-none"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Time Range
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 md:flex-none"
          >
            <Map className="mr-2 h-4 w-4" />
            Threat Map
          </Button>
          <Button 
            size="sm"
            className="flex-1 md:flex-none"
            onClick={() => toast({
              title: "Threat analysis refreshed",
              description: "The threat database has been updated with the latest intelligence.",
            })}
          >
            <Shield className="mr-2 h-4 w-4" />
            Refresh Analysis
          </Button>
        </div>
      </div>
      
      <Card className="mb-6 bg-gradient-to-r from-red-500/10 to-transparent border-red-500/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-red-500/20 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Critical Alert: Active Phishing Campaign</h2>
              <p className="text-muted-foreground mb-2">
                New wave of phishing emails targeting Solana users with fake update notifications and airdrops.
                Always verify the sources of communications and never share your seed phrase.
              </p>
              <Button variant="outline" size="sm" className="border-red-500/30 hover:bg-red-500/20">
                <Eye className="mr-2 h-4 w-4" />
                View Detailed Advisory
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-cyan-500/20 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-cyan-500" />
                </div>
                <Badge className="bg-red-500/20 text-red-500 border-red-500/30">+5</Badge>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-xs text-muted-foreground">Active Threats</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-cyan-500/20 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-cyan-500" />
                </div>
                <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">+2</Badge>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold">8</h3>
                <p className="text-xs text-muted-foreground">Vulnerabilities</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-cyan-500/20 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-cyan-500" />
                </div>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">-3</Badge>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold">36</h3>
                <p className="text-xs text-muted-foreground">Mitigated (30d)</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-cyan-500/20 p-2 rounded-full">
                  <Search className="h-5 w-5 text-cyan-500" />
                </div>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">+12%</Badge>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold">92%</h3>
                <p className="text-xs text-muted-foreground">Detection Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4 w-full md:w-auto">
          <TabsTrigger value="all">All Threats</TabsTrigger>
          <TabsTrigger value="active">Active ({threats.filter(t => t.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="investigating">Investigating ({threats.filter(t => t.status === 'investigating').length})</TabsTrigger>
          <TabsTrigger value="mitigated">Mitigated ({threats.filter(t => t.status === 'mitigated').length})</TabsTrigger>
        </TabsList>
        
        {['all', 'active', 'investigating', 'mitigated'].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filterThreats(threats, tab).map(threat => (
              <Card key={threat.id} className="overflow-hidden">
                <div className={`h-1 w-full ${
                  threat.severity === 'critical' ? 'bg-red-500' : 
                  threat.severity === 'high' ? 'bg-amber-500' : 
                  threat.severity === 'medium' ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        threat.type === 'vulnerability' ? 'bg-blue-500/20' : 
                        threat.type === 'exploit' ? 'bg-amber-500/20' : 
                        threat.type === 'scam' ? 'bg-red-500/20' : 
                        'bg-purple-500/20'
                      }`}>
                        {getTypeIcon(threat.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{threat.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" /> Discovered {threat.discoveredAt}
                          {threat.affectedUsers > 0 && (
                            <>
                              <span>•</span>
                              <span>{threat.affectedUsers} affected users</span>
                            </>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getSeverityStyles(threat.severity)}>
                        {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                      </Badge>
                      <Badge className={getStatusStyles(threat.status)}>
                        {threat.status.charAt(0).toUpperCase() + threat.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">{threat.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Target Vectors</h4>
                    <div className="flex flex-wrap gap-2">
                      {threat.targets.map((target, index) => (
                        <Badge key={index} variant="outline" className="bg-cyan-950/20">
                          {target}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">Mitigation Progress</h4>
                      <span className="text-xs text-muted-foreground">{threat.mitigationProgress}%</span>
                    </div>
                    <Progress value={threat.mitigationProgress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground truncate max-w-[70%]">{threat.mitigation}</p>
                  <Button size="sm" variant="outline">
                    Full Analysis <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {filterThreats(threats, tab).length === 0 && (
              <Card className="py-8">
                <CardContent className="flex flex-col items-center justify-center text-center p-6">
                  <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No threats found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery 
                      ? "No threats match your search query. Try different keywords." 
                      : "There are no threats in this category."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>External Threat Intelligence</CardTitle>
            <CardDescription>Connect with external security feeds and resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-cyan-500 mr-3" />
                <span>Solana Foundation Security Advisories</span>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-cyan-500 mr-3" />
                <span>Messari Security Research</span>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center">
                <Map className="h-5 w-5 text-cyan-500 mr-3" />
                <span>Global Threat Map</span>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ThreatsPage;
