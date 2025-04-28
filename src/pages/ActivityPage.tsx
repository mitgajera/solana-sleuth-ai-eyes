
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SolanaTransactions from "@/components/dashboard/SolanaTransactions";

const ActivityPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">ACTIVITY</h1>
        <p className="text-muted-foreground">Monitor transaction activity on the Solana blockchain</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <SolanaTransactions />
      </div>
    </DashboardLayout>
  );
};

export default ActivityPage;
