
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { apiKeyService } from "@/services/apiKeyService";

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  className?: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit, className }) => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check for existing API key on component mount
  useEffect(() => {
    const checkExistingApiKey = async () => {
      try {
        const savedApiKey = await apiKeyService.getApiKey();
        if (savedApiKey) {
          setApiKey(savedApiKey);
          onApiKeySubmit(savedApiKey);
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
        toast({
          title: "Error",
          description: "Failed to fetch existing API key",
          variant: "destructive",
        });
      }
    };

    checkExistingApiKey();
  }, [onApiKeySubmit, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await apiKeyService.saveApiKey(apiKey);
      onApiKeySubmit(apiKey);
      
      toast({
        title: "Success",
        description: "API key saved successfully",
      });
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: "Error",
        description: "Failed to save API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn("cyber-card border-opacity-20", className)}>
      <CardHeader>
        <CardTitle>Connect to Messari API</CardTitle>
        <CardDescription>
          Enter your Messari API key to access real-time data and insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your Messari API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-background border-cyber-primary/30 focus:border-cyber-primary"
            />
            <p className="text-xs text-muted-foreground">
              Don't have an API key? Contact @PFC_mikey on Telegram for assistance.
            </p>
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-cyber-primary hover:bg-cyber-primary/80 text-white"
          >
            {isLoading ? "Saving..." : "Connect to API"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
