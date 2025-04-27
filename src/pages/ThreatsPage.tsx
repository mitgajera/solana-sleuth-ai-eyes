
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const ThreatsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">THREATS</h1>
        <p className="text-muted-foreground">Identified threats and vulnerabilities on Solana blockchain</p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Threat Analysis</h2>
          <p className="text-muted-foreground">This feature will display threat intelligence from the Messari API.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ThreatsPage;
