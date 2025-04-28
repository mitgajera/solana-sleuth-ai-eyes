
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const SecurityAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-and-tweet', {
        method: 'POST'
      });

      if (error) throw error;

      toast({
        title: "Analysis Complete",
        description: `Posted ${data.tweets.length} tweets with security insights.`,
      });
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={runAnalysis} 
          disabled={isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Run Security Analysis & Tweet"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SecurityAnalyzer;
