
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Calendar, Shield, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PhishingAdvisoryPage: React.FC = () => {
  const navigate = useNavigate();

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
        
        <Badge className="bg-red-500/20 text-red-500 border-red-500/30">
          Critical Alert
        </Badge>
      </div>
      
      <Card className="mb-6 bg-gradient-to-r from-red-500/10 to-transparent border-red-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-2xl">Active Phishing Campaign</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Calendar className="h-3 w-3" /> Issued: April 28, 2025
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Summary</h3>
            <p>
              The Solana Sleuth security team has detected a sophisticated phishing campaign targeting Solana users through fake airdrop announcements and elaborate imitation websites. The campaign is actively ongoing and has already affected at least 187 users with an estimated loss of over 2,800 SOL.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Attack Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm">Attack Vectors:</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-muted-foreground">
                  <li>Fake social media accounts impersonating legitimate Solana projects</li>
                  <li>Phishing emails announcing "exclusive" airdrops</li>
                  <li>Telegram channels with fake announcements</li>
                  <li>Malicious browser extensions mimicking wallet helpers</li>
                  <li>Fraudulent websites with URLs similar to legitimate Solana projects</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm">Targets:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-cyan-950/20">Phantom users</Badge>
                  <Badge variant="outline" className="bg-cyan-950/20">NFT collectors</Badge>
                  <Badge variant="outline" className="bg-cyan-950/20">New SOL holders</Badge>
                  <Badge variant="outline" className="bg-cyan-950/20">DeFi users</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm">Technical Indicators:</h4>
                <div className="mt-2 space-y-2">
                  <div className="p-2 border border-border rounded-md">
                    <p className="font-medium text-xs">Known malicious domains:</p>
                    <code className="text-xs block mt-1 text-muted-foreground">phantom-airdrops.com</code>
                    <code className="text-xs block text-muted-foreground">solana-event2025.net</code>
                    <code className="text-xs block text-muted-foreground">phantom-wallet.org</code>
                  </div>
                  <div className="p-2 border border-border rounded-md">
                    <p className="font-medium text-xs">Attacker wallet addresses:</p>
                    <code className="text-xs block mt-1 text-muted-foreground">JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4</code>
                    <code className="text-xs block text-muted-foreground">5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Impact Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Financial Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Estimated 2,800 SOL (~$420,000) stolen to date. Additional tokens and NFTs also compromised.</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Technical Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Low to moderate. The attack relies primarily on social engineering rather than exploiting technical vulnerabilities.</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">User Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">187 confirmed affected users. Potential trust damage to legitimate projects and wallet providers.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Mitigation Steps</h3>
            <p className="mb-4">The following actions are being taken to mitigate this threat:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li className="flex items-center">
                <span className="h-5 w-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                </span>
                <span>Security advisory published to alert the Solana community (Complete)</span>
              </li>
              <li className="flex items-center">
                <span className="h-5 w-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                </span>
                <span>Malicious domains reported for takedown (Complete)</span>
              </li>
              <li className="flex items-center">
                <span className="h-5 w-5 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
                </span>
                <span>User education campaign launched through official channels (In Progress - 45%)</span>
              </li>
              <li className="flex items-center">
                <span className="h-5 w-5 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
                </span>
                <span>Wallet providers contacted to implement additional verification UI (In Progress)</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-muted/50 border border-muted-foreground flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                </span>
                <span>Browser stores contacted to remove malicious extensions (Pending)</span>
              </li>
            </ol>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Recommendations for Users</h3>
            <div className="space-y-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                <h4 className="font-medium text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Verify Sources
                </h4>
                <p className="text-sm text-muted-foreground mt-1">Always verify the authenticity of communications before clicking links. Official projects will never ask for your seed phrase.</p>
              </div>
              
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                <h4 className="font-medium text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Check URLs Carefully
                </h4>
                <p className="text-sm text-muted-foreground mt-1">Look for subtle misspellings or character substitutions in website URLs. Use bookmarks for important sites.</p>
              </div>
              
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                <h4 className="font-medium text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Never Share Your Seed Phrase
                </h4>
                <p className="text-sm text-muted-foreground mt-1">No legitimate project, wallet, or service will ever ask for your seed phrase or private keys.</p>
              </div>
              
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                <h4 className="font-medium text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Use Hardware Wallets
                </h4>
                <p className="text-sm text-muted-foreground mt-1">Consider using a hardware wallet for additional security, especially for larger holdings.</p>
              </div>
              
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                <h4 className="font-medium text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Report Suspicious Activity
                </h4>
                <p className="text-sm text-muted-foreground mt-1">Report suspicious websites, social media accounts, or communications to Solana Security.</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <Shield className="h-4 w-4" />
            Copy Threat Indicators
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open('https://docs.solana.com/security', '_blank')}>
              View Solana Security Guide <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button>
              Download Full Report
            </Button>
          </div>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
};

export default PhishingAdvisoryPage;
