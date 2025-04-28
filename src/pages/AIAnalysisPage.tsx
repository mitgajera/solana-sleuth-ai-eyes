
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SecurityAnalyzer from "@/components/dashboard/SecurityAnalyzer";

const AIAnalysisPage = () => {
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

        <SecurityAnalyzer />
      </div>
    </DashboardLayout>
  );
};

export default AIAnalysisPage;
