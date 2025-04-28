
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
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'configured' | 'not-configured'>('checking');
  const { toast } = useToast();

  // Check for existing API key on component mount
  useEffect(() => {
    const checkExistingApiKey = async () => {
      try {
        setIsLoading(true);
        const hasKey = await apiKeyService.hasApiKey();
        
        if (hasKey) {
          const apiKey = await apiKeyService.getApiKey();
          if (apiKey) {
            setApiKeyStatus('configured');
            onApiKeySubmit(apiKey);
            toast({
              title: "Success",
              description: "API key loaded successfully",
            });
          } else {
            setApiKeyStatus('not-configured');
          }
        } else {
          setApiKeyStatus('not-configured');
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
        setApiKeyStatus('not-configured');
        toast({
          title: "Error",
          description: "Failed to fetch API key",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingApiKey();
  }, [onApiKeySubmit, toast]);

  const handleCheckAgain = async () => {
    setIsLoading(true);
    try {
      const hasKey = await apiKeyService.hasApiKey();
      if (hasKey) {
        const apiKey = await apiKeyService.getApiKey();
        if (apiKey) {
          setApiKeyStatus('configured');
          onApiKeySubmit(apiKey);
          toast({
            title: "Success",
            description: "API key loaded successfully",
          });
        } else {
          toast({
            title: "Error",
            description: "API key not found",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "API key not configured",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error checking API key:', error);
      toast({
        title: "Error",
        description: "Failed to check API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (apiKeyStatus === 'checking') {
    return (
      <Card className={cn("cyber-card border-opacity-20", className)}>
        <CardHeader>
          <CardTitle>Checking API Key...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4">Checking for configured API key...</p>
        </CardContent>
      </Card>
    );
  }

  if (apiKeyStatus === 'configured') {
    return (
      <Card className={cn("cyber-card border-opacity-20", className)}>
        <CardHeader>
          <CardTitle>API Key Configured</CardTitle>
          <CardDescription>
            Your Messari API key is configured and ready to use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-green-500 mb-4">✓ API key successfully loaded</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("cyber-card border-opacity-20", className)}>
      <CardHeader>
        <CardTitle>Connect to Messari API</CardTitle>
        <CardDescription>
          Your Messari API key needs to be configured in Supabase Secrets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded p-4 text-amber-800 text-sm">
            <p className="font-semibold mb-1">API Key Required</p>
            <p>Your Messari API key needs to be set as a secret in Supabase:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Go to Supabase Dashboard</li>
              <li>Navigate to Project Settings &gt; Functions</li>
              <li>Add a new secret with name <code className="bg-amber-100 px-1 rounded">MESSARI_API_KEY</code></li>
              <li>Enter your Messari API key as the value</li>
              <li>Click "Check Again" button below after setting the secret</li>
            </ol>
          </div>
          <Button 
            onClick={handleCheckAgain} 
            disabled={isLoading}
            className="w-full bg-cyber-primary hover:bg-cyber-primary/80 text-white"
          >
            {isLoading ? "Checking..." : "Check Again"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Don't have an API key? Contact @PFC_mikey on Telegram for assistance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
