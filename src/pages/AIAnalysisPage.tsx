
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SecurityAnalyzer from "@/components/dashboard/SecurityAnalyzer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, TrendingUp, AlertTriangle } from "lucide-react";
import SolanaMetricsCard from "@/components/dashboard/SolanaMetricsCard";
import RealTimeNewsFeed from "@/components/dashboard/RealTimeNewsFeed";

const AIAnalysisPage = () => {
  const [activeTab, setActiveTab] = useState("security");
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">
            AI ANALYSIS
          </h1>
          <p className="text-muted-foreground">
            Automated security analysis and insights for Solana ecosystem
          </p>
        </div>
        
        <Tabs defaultValue="security" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Real-time Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="threats" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Threat Intelligence</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="security" className="space-y-4">
            <SecurityAnalyzer />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-amber-500/30 bg-amber-500/10">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <AlertTitle className="text-amber-500">New Vulnerability Detected</AlertTitle>
                  <AlertDescription>
                    A critical vulnerability (CVE-2025-1234) has been disclosed affecting Solana DeFi protocols.
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-green-500/30 bg-green-500/10">
                  <Shield className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-500">Flash Loan Attack Mitigated</AlertTitle>
                  <AlertDescription>
                    Protocol security updates have successfully mitigated recent flash loan attack vectors.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SolanaMetricsCard />
              <RealTimeNewsFeed />
            </div>
          </TabsContent>
          
          <TabsContent value="threats">
            <Card>
              <CardHeader>
                <CardTitle>Active Threat Intelligence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-red-500">Critical Vulnerability (CVE-2025-1234)</h3>
                      <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded-full text-xs">Active</span>
                    </div>
                    <p className="mt-2 text-sm">
                      A critical vulnerability has been disclosed affecting smart contract implementations using a specific arithmetic calculation pattern found in several major DeFi protocols.
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium text-sm">Affected Systems</h4>
                      <ul className="mt-1 list-disc list-inside text-sm text-muted-foreground">
                        <li>Multiple Solana DeFi lending protocols</li>
                        <li>Some automated market makers</li>
                        <li>Certain staking derivatives</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-amber-500/30 bg-amber-500/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-amber-500">Flash Loan Governance Attack</h3>
                      <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs">Mitigated</span>
                    </div>
                    <p className="mt-2 text-sm">
                      Flash loan attack attempted against a major protocol's governance system to pass malicious proposals.
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium text-sm">Mitigation Status</h4>
                      <div className="mt-1 w-full bg-muted h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: '100%' }}></div>
                      </div>
                      <p className="text-xs mt-1 text-green-500">100% complete - Governance timelock added</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-blue-500/30 bg-blue-500/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-blue-500">Phishing Campaign Targeting Solana Users</h3>
                      <span className="bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full text-xs">Ongoing</span>
                    </div>
                    <p className="mt-2 text-sm">
                      Security researchers have identified a new phishing campaign targeting Solana wallet users through fake airdrops and misleading websites.
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">First detected: 3 days ago</span>
                      <span className="text-xs text-muted-foreground">Source: CryptoSecurity Research</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AIAnalysisPage;
