
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full cyber-grid-bg">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
