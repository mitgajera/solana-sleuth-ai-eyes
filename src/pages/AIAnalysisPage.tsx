
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Zap, AlertCircle, Sparkles, Clock, BarChart2, RefreshCw, Send, FileText, ChevronDown, DownloadCloud } from "lucide-react";

type InsightType = 'security' | 'market' | 'governance' | 'trend';

interface AIInsight {
  id: string;
  title: string;
  summary: string;
  detail: string;
  type: InsightType;
  confidence: number;
  generatedAt: string;
  sources: string[];
  relevance: number;
  trend: 'up' | 'down' | 'neutral';
}

const AIAnalysisPage: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  
  const [insights] = useState<AIInsight[]>([
    {
      id: 'insight-1',
      title: 'Increased Phishing Risk for Phantom Wallet Users',
      summary: 'AI analysis detected a 43% rise in sophisticated phishing attempts targeting Phantom Wallet users over the past 7 days.',
      detail: 'Our AI has identified a new wave of highly sophisticated phishing campaigns specifically targeting Phantom Wallet users. The attacks leverage fake airdrops and use convincing clone sites with valid-looking SSL certificates. The campaign appears to be operated by the same group behind previous attacks based on infrastructure overlaps and TTP patterns. We\'re seeing a 43% increase in these attacks over the past week, with particularly high activity in the APAC region during their business hours. The attackers are primarily targeting users who have recently interacted with popular NFT marketplaces.',
      type: 'security',
      confidence: 89,
      generatedAt: '2 hours ago',
      sources: ['Transaction patterns', 'Dark web monitoring', 'User reports'],
      relevance: 9,
      trend: 'up'
    },
    {
      id: 'insight-2',
      title: 'Governance Participation Correlation with Token Price',
      summary: 'Statistical analysis reveals a strong positive correlation between governance participation rates and token price movements.',
      detail: 'Our AI has conducted a time-series analysis across 28 Solana ecosystem projects and identified a statistically significant correlation (r=0.72, p<0.01) between governance participation rates and positive token price movements in the following 14-day period. Projects with >15% increase in governance participation showed an average of 12.3% price appreciation compared to their peers. This pattern is particularly pronounced in projects with market caps between $50M-$200M. The relationship appears causal rather than merely correlative, as governance participation typically precedes price movements, and the effect persists after controlling for general market conditions and project-specific announcements.',
      type: 'governance',
      confidence: 76,
      generatedAt: '1 day ago',
      sources: ['On-chain governance data', 'Market price feeds', 'Social sentiment'],
      relevance: 7,
      trend: 'up'
    },
    {
      id: 'insight-3',
      title: 'Emerging Security Risk: Cross-Program Invocation Exploits',
      summary: 'Pattern analysis has identified an emerging vulnerability pattern affecting cross-program invocation implementations.',
      detail: 'Our AI system has identified a concerning pattern in recent security incidents across multiple Solana projects. Through static analysis of exploited contracts and dynamic monitoring of attack patterns, we\'ve detected a common vulnerability class affecting cross-program invocation (CPI) implementations. The vulnerability stems from insecure handling of return data from trusted program calls, allowing attackers to manipulate execution flow in certain circumstances. This vulnerability pattern has been positively identified in 7 projects, 3 of which have already been exploited. We estimate approximately 12% of audited Solana programs may contain variants of this issue, with DeFi protocols at highest risk.',
      type: 'security',
      confidence: 92,
      generatedAt: '12 hours ago',
      sources: ['Contract audit results', 'Exploit pattern analysis', 'Security incident reports'],
      relevance: 10,
      trend: 'up'
    },
    {
      id: 'insight-4',
      title: 'Market Sentiment Analysis Predicts Short-Term Volatility',
      summary: 'AI-powered sentiment analysis across multiple data sources indicates increased market volatility in the next 72 hours.',
      detail: 'By analyzing sentiment patterns across social media, news sources, trading forums, and on-chain metrics, our AI model predicts increased SOL price volatility in the next 72 hours. The current sentiment distribution shows abnormal divergence between retail and institutional signals. Social sentiment has increased 35% over baseline with substantial discord between short-term traders and long-term holders. Meanwhile, derivatives markets show increasing open interest without corresponding spot volume growth. This pattern has historically preceded volatility events by 48-96 hours with 78% accuracy. Key indicators to monitor include funding rates and social volume-to-trading volume ratios.',
      type: 'market',
      confidence: 81,
      generatedAt: '6 hours ago',
      sources: ['Social sentiment analysis', 'Derivatives metrics', 'On-chain flows'],
      relevance: 8,
      trend: 'neutral'
    },
    {
      id: 'insight-5',
      title: 'Developer Activity Trend Analysis',
      summary: 'Analysis of GitHub activity shows a 28% increase in developer engagement across Solana ecosystem projects.',
      detail: 'Our AI has analyzed developer activity across the Solana ecosystem by monitoring GitHub repositories, contribution patterns, and development velocity metrics. Data shows a sustainable 28% increase in active developers contributing to core Solana repositories and key ecosystem projects over the last quarter. Most notably, we\'re seeing significant growth in security-focused contributions, optimization efforts, and cross-chain interoperability features. This represents the highest sustained development growth since the initial mainnet launch period. Developer retention has also improved, with 67% of new contributors from Q1 remaining active in Q2. These metrics have historically been leading indicators of ecosystem growth by 6-9 months.',
      type: 'trend',
      confidence: 95,
      generatedAt: '3 days ago',
      sources: ['GitHub data', 'Developer surveys', 'Grant program metrics'],
      relevance: 7,
      trend: 'up'
    },
    {
      id: 'insight-6',
      title: 'NFT Market Wash Trading Detection',
      summary: 'AI cluster analysis identified 12 significant wash trading rings manipulating NFT collection floors.',
      detail: 'Using graph analysis and behavioral clustering algorithms, our AI has identified 12 distinct wash trading networks operating across major Solana NFT marketplaces. These networks comprise approximately 280 wallets and have artificially inflated the floor prices of 17 collections by an average of 31%. The most sophisticated ring employs 64 wallets with carefully balanced transaction patterns designed to avoid simplistic wash trading detection. Transaction timing analysis suggests bot-driven automation with human oversight. The activity has increased by 47% following the recent market downturn, likely as a strategy to maintain perceived collection value during decreased organic demand.',
      type: 'security',
      confidence: 88,
      generatedAt: '2 days ago',
      sources: ['Transaction graph analysis', 'Wallet clustering', 'Price-volume anomalies'],
      relevance: 9,
      trend: 'up'
    }
  ]);

  const handleGenerateInsight = () => {
    if (!query.trim()) {
      toast({
        title: "Query required",
        description: "Please enter a question or topic for analysis",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "AI Analysis Complete",
        description: "New insights have been generated based on your query.",
      });
    }, 2500);
  };

  const handleRefreshInsights = () => {
    setLoading(true);
    
    // Simulate refreshing insights
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Insights Refreshed",
        description: "AI has analyzed the latest data and updated all insights.",
      });
    }, 1500);
  };
  
  const handleExportInsights = () => {
    toast({
      title: "Insights Exported",
      description: "The analysis report has been exported to PDF.",
    });
  };
  
  const getTypeStyles = (type: InsightType) => {
    switch(type) {
      case 'security':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'market':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'governance':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'trend':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30';
    }
  };
  
  const getInsightByTab = (tab: string) => {
    if (tab === 'all') return insights;
    return insights.filter(insight => insight.type === tab);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">AI ANALYSIS</h1>
        <p className="text-muted-foreground">AI-powered insights from Messari data</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-cyan-500" />
              AI Insight Generator
            </CardTitle>
            <CardDescription>
              Ask a question or request analysis on any Solana ecosystem topic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea 
                placeholder="Example: Analyze recent wallet exploit patterns and suggest security improvements" 
                className="min-h-[100px] resize-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                <span>AI analyzes on-chain data, security feeds, and market information from trusted sources</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Analysis typically takes 15-30 seconds</span>
            </div>
            <Button onClick={handleGenerateInsight} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate Insights
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-cyan-500" />
              AI Analytics Summary
            </CardTitle>
            <CardDescription>
              Current system status and analysis metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Data freshness</span>
                <span className="font-medium">3 minutes ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Insights generated (24h)</span>
                <span className="font-medium">42</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg. confidence score</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Security alerts triggered</span>
                <span className="font-medium">7</span>
              </div>
            </div>
            
            <div className="pt-2 space-y-2">
              <h4 className="text-sm font-medium">Top Analysis Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-center gap-2 rounded-md bg-cyan-950/20 p-2">
                  <Badge className="bg-red-500/20 text-red-500 border-red-500/30">32%</Badge>
                  <span className="text-xs">Security</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-md bg-cyan-950/20 p-2">
                  <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">28%</Badge>
                  <span className="text-xs">Market</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-md bg-cyan-950/20 p-2">
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">22%</Badge>
                  <span className="text-xs">Trends</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-md bg-cyan-950/20 p-2">
                  <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">18%</Badge>
                  <span className="text-xs">Governance</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <h2 className="text-xl font-medium">AI-Generated Insights</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 md:flex-none"
            onClick={handleExportInsights}
          >
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button 
            size="sm"
            className="flex-1 md:flex-none"
            onClick={handleRefreshInsights}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh Insights
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full md:w-auto mb-4 grid grid-cols-5 md:inline-flex">
          <TabsTrigger value="all">All Insights</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="trend">Trends</TabsTrigger>
        </TabsList>
        
        {['all', 'security', 'market', 'governance', 'trend'].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {getInsightByTab(tab).map(insight => (
              <Card key={insight.id} className={activeInsight === insight.id ? "border-cyan-500/50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-3 w-3" /> Generated {insight.generatedAt}
                      </CardDescription>
                    </div>
                    <Badge className={getTypeStyles(insight.type)}>
                      {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{insight.summary}</p>
                  
                  {activeInsight === insight.id && (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Detailed Analysis</h4>
                        <p className="text-sm text-muted-foreground">{insight.detail}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Data Sources</h4>
                        <div className="flex flex-wrap gap-2">
                          {insight.sources.map((source, index) => (
                            <Badge key={index} variant="outline" className="bg-cyan-950/20">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Confidence Score</p>
                          <p className="text-lg font-bold">{insight.confidence}%</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Relevance Rating</p>
                          <p className="text-lg font-bold">{insight.relevance}/10</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Trend Direction</p>
                          <p className={`text-lg font-bold ${
                            insight.trend === 'up' ? 'text-green-500' : 
                            insight.trend === 'down' ? 'text-red-500' : ''
                          }`}>
                            {insight.trend.charAt(0).toUpperCase() + insight.trend.slice(1)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-cyan-950/20">
                      {insight.confidence}% confidence
                    </Badge>
                    <Badge variant="outline" className="bg-cyan-950/20">
                      Relevance: {insight.relevance}/10
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveInsight(activeInsight === insight.id ? null : insight.id)}
                  >
                    {activeInsight === insight.id ? "Show Less" : "Expand"}
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${
                      activeInsight === insight.id ? "rotate-180" : ""
                    }`} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {getInsightByTab(tab).length === 0 && (
              <Card className="py-8">
                <CardContent className="flex flex-col items-center justify-center text-center p-6">
                  <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No insights available</h3>
                  <p className="text-sm text-muted-foreground">
                    No AI insights have been generated for this category yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Generate Custom Reports</CardTitle>
          <CardDescription>Create detailed AI analysis reports for specific research needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center p-2 rounded-md bg-cyan-950/20 flex-1">
              <FileText className="h-5 w-5 text-cyan-500 mr-3" />
              <span>Security Vulnerability Assessment</span>
            </div>
            <Button variant="outline" size="sm">Generate</Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center p-2 rounded-md bg-cyan-950/20 flex-1">
              <FileText className="h-5 w-5 text-cyan-500 mr-3" />
              <span>Market Sentiment Analysis</span>
            </div>
            <Button variant="outline" size="sm">Generate</Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center p-2 rounded-md bg-cyan-950/20 flex-1">
              <FileText className="h-5 w-5 text-cyan-500 mr-3" />
              <span>Ecosystem Growth Trends</span>
            </div>
            <Button variant="outline" size="sm">Generate</Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AIAnalysisPage;
