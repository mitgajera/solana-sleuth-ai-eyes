
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const AlertsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">ALERTS</h1>
        <p className="text-muted-foreground">Security alerts and notifications from Messari intelligence</p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Security Alerts</h2>
          <p className="text-muted-foreground">This feature will display security alerts from the Messari API.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlertsPage;
