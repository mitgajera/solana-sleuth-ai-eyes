
import React, { useState, useEffect } from "react";
import { Activity, ShieldAlert, Flag, Zap } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityList from "@/components/dashboard/ActivityList";
import SecurityScoreCard from "@/components/dashboard/SecurityScoreCard";
import ThreatMap from "@/components/dashboard/ThreatMap";
import NewsFeed from "@/components/dashboard/NewsFeed";
import ApiKeyInput from "@/components/dashboard/ApiKeyInput";
import { mockActivities, mockNews, mockStats } from "@/services/mockData";
import { apiKeyService } from "@/services/apiKeyService";

const Dashboard: React.FC = () => {
  const [apiKeyEntered, setApiKeyEntered] = useState<boolean>(false);
  
  // Check for existing API key on component mount
  useEffect(() => {
    const hasApiKey = apiKeyService.hasApiKey();
    if (hasApiKey) {
      setApiKeyEntered(true);
    }
  }, []);

  const handleApiKeySubmit = (apiKey: string) => {
    // The API key is now stored by the ApiKeyInput component
    setApiKeyEntered(true);
  };

  if (!apiKeyEntered) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="max-w-md w-full">
            <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">SOLANA SLEUTH DASHBOARD</h1>
        <p className="text-muted-foreground">Real-time security and fraud detection for Solana blockchain</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Suspicious Transactions" 
          value={mockStats.suspiciousTransactions.value}
          icon={<Activity size={18} />}
          trend={mockStats.suspiciousTransactions.trend}
        />
        <StatCard 
          title="Security Risk Score" 
          value={mockStats.riskScore.value}
          icon={<ShieldAlert size={18} />}
          trend={mockStats.riskScore.trend}
        />
        <StatCard 
          title="Flagged Addresses" 
          value={mockStats.flaggedAddresses.value}
          icon={<Flag size={18} />}
          trend={mockStats.flaggedAddresses.trend}
        />
        <StatCard 
          title="Security Incidents" 
          value={mockStats.securityIncidents.value}
          icon={<Zap size={18} />}
          trend={mockStats.securityIncidents.trend}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ThreatMap className="lg:col-span-2" />
        <SecurityScoreCard score={72} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityList items={mockActivities} />
        <NewsFeed items={mockNews} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
