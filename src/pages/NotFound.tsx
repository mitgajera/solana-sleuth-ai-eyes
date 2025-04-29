
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    toast({
      title: "Page Not Found",
      description: `The page "${location.pathname}" does not exist.`,
      variant: "destructive",
    });
  }, [location.pathname, toast]);

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-md text-center space-y-6 p-8 rounded-lg border bg-card shadow-lg">
        <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight cyber-text-glow">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={goBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button 
            className="gap-2" 
            onClick={goHome}
          >
            <Home className="h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </div>
      
      <div className="mt-8 text-center max-w-md px-4">
        <h3 className="text-lg font-medium mb-2">Looking for something?</h3>
        <ul className="space-y-2">
          <li><a href="/metrics" className="text-primary hover:underline">Solana Metrics Dashboard</a></li>
          <li><a href="/alerts" className="text-primary hover:underline">Security Alerts</a></li>
          <li><a href="/threats" className="text-primary hover:underline">Threat Intelligence</a></li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
