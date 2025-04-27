
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const AIAnalysisPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">AI ANALYSIS</h1>
        <p className="text-muted-foreground">AI-powered insights from Messari data</p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">AI Insights</h2>
          <p className="text-muted-foreground">This feature will display AI-generated insights from the Messari API.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAnalysisPage;
