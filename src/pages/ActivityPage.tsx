
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const ActivityPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">ACTIVITY</h1>
        <p className="text-muted-foreground">Monitor transaction activity on the Solana blockchain</p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Transaction Activity</h2>
          <p className="text-muted-foreground">This feature will display real-time transaction data from the Messari API.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActivityPage;
