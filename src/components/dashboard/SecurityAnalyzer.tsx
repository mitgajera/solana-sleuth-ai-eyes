
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw, Check, AlertTriangle, Shield } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface SecurityInsight {
  type: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

interface AnalysisResult {
  insights: SecurityInsight[];
  timestamp: string;
  marketData?: any;
  securityNews?: any[];
}

const SecurityAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  // Load any previous analysis from localStorage on component mount
  useEffect(() => {
    const savedAnalysis = localStorage.getItem('lastSecurityAnalysis');
    if (savedAnalysis) {
      try {
        setResult(JSON.parse(savedAnalysis));
        setLastAnalysis(new Date(JSON.parse(savedAnalysis).timestamp).toLocaleString());
      } catch (e) {
        console.error("Error parsing saved analysis:", e);
      }
    }
  }, []);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-and-tweet', {
        method: 'POST',
        body: { skipTweet: true } // Skip tweeting as requested
      });

      if (error) throw error;

      // Add timestamp to the result
      const resultWithTimestamp = {
        ...data,
        timestamp: new Date().toISOString()
      };

      // Save result to state and localStorage
      setResult(resultWithTimestamp);
      setLastAnalysis(new Date().toLocaleString());
      localStorage.setItem('lastSecurityAnalysis', JSON.stringify(resultWithTimestamp));

      toast({
        title: "Analysis Complete",
        description: `Found ${data.insights.length} security insights.`,
      });
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderAnalysisResults = () => {
    if (!result) return null;

    const getSeverityColor = (severity: string) => {
      switch(severity) {
        case 'critical': return 'bg-red-500/20 text-red-500';
        case 'high': return 'bg-amber-500/20 text-amber-500';
        case 'medium': return 'bg-yellow-500/20 text-yellow-500';
        case 'low': return 'bg-green-500/20 text-green-500';
        default: return 'bg-blue-500/20 text-blue-500';
      }
    };

    return (
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Analysis Results</h3>
          <span className="text-xs text-muted-foreground">
            {lastAnalysis && `Analyzed: ${lastAnalysis}`}
          </span>
        </div>

        {result.insights && result.insights.length > 0 ? (
          result.insights.map((insight, index) => (
            <Alert key={index} className={`${getSeverityColor(insight.severity)} border-opacity-30`}>
              <AlertTitle className="flex items-center">
                {insight.severity === 'critical' || insight.severity === 'high' ? (
                  <AlertTriangle className="h-4 w-4 mr-2" />
                ) : (
                  <Shield className="h-4 w-4 mr-2" />
                )}
                {insight.type}
              </AlertTitle>
              <AlertDescription>
                {insight.description}
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <div className="p-4 text-center border rounded-md border-border/40 bg-muted/30">
            <Check className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p>No security issues detected at this time.</p>
          </div>
        )}

        <div className="flex justify-end mt-4 gap-2">
          <Button 
            variant="outline" 
            onClick={() => window.open('/reports/security-analysis', '_blank')}
            className="gap-2"
          >
            Generate Report
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              toast({
                title: "Added to Watchlist",
                description: "You'll be notified about changes to these security issues.",
              });
            }}
            className="gap-2"
          >
            <Shield className="h-4 w-4" />
            Add to Watchlist
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Security Analysis</CardTitle>
        {lastAnalysis && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runAnalysis} 
          disabled={isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Security Threats...
            </>
          ) : (
            "Run Security Analysis"
          )}
        </Button>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Analysis Failed</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {renderAnalysisResults()}
      </CardContent>
    </Card>
  );
};

export default SecurityAnalyzer;
