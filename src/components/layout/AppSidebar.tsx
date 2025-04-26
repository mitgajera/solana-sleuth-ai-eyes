
import React from "react";
import { 
  Activity, 
  AlertTriangle, 
  BarChart2, 
  Database, 
  Eye, 
  Home, 
  Shield, 
  Zap
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AppSidebar: React.FC = () => {
  return (
    <Sidebar defaultCollapsed={false}>
      <SidebarHeader className="py-6">
        <div className="flex items-center px-4">
          <Eye className="h-8 w-8 mr-2 text-cyber-primary" />
          <div className="flex flex-col">
            <h2 className="cyber-text-glow text-lg font-bold font-mono">SOLANA SLEUTH</h2>
            <p className="text-xs text-cyber-secondary">AI EYES</p>
          </div>
        </div>
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>

      <SidebarContent className="px-1">
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <Home className="h-5 w-5 mr-3" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <Activity className="h-5 w-5 mr-3" />
                  <span>Activity</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <BarChart2 className="h-5 w-5 mr-3" />
                  <span>Metrics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <Database className="h-5 w-5 mr-3" />
                  <span>Data Sources</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Security</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <AlertTriangle className="h-5 w-5 mr-3 text-cyber-warning" />
                  <span>Alerts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <Shield className="h-5 w-5 mr-3 text-cyber-primary" />
                  <span>Threats</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <Zap className="h-5 w-5 mr-3 text-cyber-accent" />
                  <span>AI Analysis</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-cyber-text/70">
          <p>© 2025 Solana Sleuth</p>
          <p>Powered by Messari APIs</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
