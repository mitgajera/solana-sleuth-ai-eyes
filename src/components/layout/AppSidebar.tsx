import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  AlertTriangle, 
  BarChart2, 
  Database, 
  Home, 
  Shield, 
  Zap,
  Menu,
  PanelLeft, // Import PanelLeft icon for sidebar toggle
  Eye
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Fixed position menu button for when sidebar is collapsed */}
      {state === "collapsed" && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50" 
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-4 w-4" />
          <span className="sr-only">Open Sidebar</span>
        </Button>
      )}

      <Sidebar>
        <SidebarHeader className="py-6">
          <div className="flex items-center px-4">
            <Eye className="h-8 w-8 mr-2 text-cyber-primary" />
            <div className="flex flex-col">
              <h2 className="cyber-text-glow text-lg font-bold font-mono">SOLANA SLEUTH</h2>
              <p className="text-xs text-cyber-secondary">AI EYES</p>
            </div>
          </div>
          <SidebarTrigger className="h-7 w-7" />
        </SidebarHeader>

        <SidebarContent className="px-1">
          <SidebarGroup>
            <SidebarGroupLabel>Analytics</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full" asChild isActive={isActive("/")} tooltip="Dashboard">
                    <Link to="/">
                      <Home className="h-5 w-5 mr-3" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full" asChild isActive={isActive("/activity")} tooltip="Activity">
                    <Link to="/activity">
                      <Activity className="h-5 w-5 mr-3" />
                      <span>Activity</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full" asChild isActive={isActive("/metrics")} tooltip="Metrics">
                    <Link to="/metrics">
                      <BarChart2 className="h-5 w-5 mr-3" />
                      <span>Metrics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full" asChild isActive={isActive("/data-sources")} tooltip="Data Sources">
                    <Link to="/data-sources">
                      <Database className="h-5 w-5 mr-3" />
                      <span>Data Sources</span>
                    </Link>
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
                  <SidebarMenuButton className="w-full" asChild isActive={isActive("/alerts")} tooltip="Alerts">
                    <Link to="/alerts">
                      <AlertTriangle className="h-5 w-5 mr-3 text-cyber-warning" />
                      <span>Alerts</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full" asChild isActive={isActive("/threats")} tooltip="Threats">
                    <Link to="/threats">
                      <Shield className="h-5 w-5 mr-3 text-cyber-primary" />
                      <span>Threats</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full" asChild isActive={isActive("/ai-analysis")} tooltip="AI Analysis">
                    <Link to="/ai-analysis">
                      <Zap className="h-5 w-5 mr-3 text-cyber-accent" />
                      <span>AI Analysis</span>
                    </Link>
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
    </>
  );
};

export default AppSidebar;
