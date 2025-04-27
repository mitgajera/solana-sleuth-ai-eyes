
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const DataSourcesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">DATA SOURCES</h1>
        <p className="text-muted-foreground">Configure and manage Messari API data sources</p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Connected Data Sources</h2>
          <p className="text-muted-foreground">This feature will display and manage data sources from the Messari API.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataSourcesPage;
