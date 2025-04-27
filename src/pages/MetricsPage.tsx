
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const MetricsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">METRICS</h1>
        <p className="text-muted-foreground">Key performance indicators and metrics from Messari API</p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Blockchain Analytics</h2>
          <p className="text-muted-foreground">This feature will display metrics and analytics from the Messari API.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MetricsPage;
