
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Shield, Clock, Bell, BellOff, Filter, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

type Alert = {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  timestamp: string;
  isRead: boolean;
  source: string;
};

const AlertsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'alert-1',
      title: 'Unusual transaction pattern detected',
      description: 'A series of high-value transactions from flagged address 0x1a2b...3c4d has been detected.',
      severity: 'high',
      timestamp: '10 minutes ago',
      isRead: false,
      source: 'Transaction Monitor'
    },
    {
      id: 'alert-2',
      title: 'New security vulnerability disclosed',
      description: 'A critical vulnerability (CVE-2025-1234) has been disclosed affecting Solana DeFi protocols.',
      severity: 'critical',
      timestamp: '1 hour ago',
      isRead: false,
      source: 'Security Feed'
    },
    {
      id: 'alert-3',
      title: 'Whale wallet movement detected',
      description: 'A wallet containing over 500,000 SOL has started moving funds to exchanges.',
      severity: 'medium',
      timestamp: '3 hours ago',
      isRead: true,
      source: 'Whale Watch'
    },
    {
      id: 'alert-4',
      title: 'Smart contract anomaly identified',
      description: 'Unusual call pattern detected in the contract at address 5TUfcg...k9jF.',
      severity: 'medium',
      timestamp: '5 hours ago',
      isRead: true,
      source: 'Contract Monitor'
    },
    {
      id: 'alert-5',
      title: 'Potential front-running attempt detected',
      description: 'Multiple transactions attempting to front-run DEX trades have been identified.',
      severity: 'high',
      timestamp: '1 day ago',
      isRead: true,
      source: 'MEV Scanner'
    },
    {
      id: 'alert-6',
      title: 'Governance proposal attacked',
      description: 'A flash loan attack attempt against governance proposal #235 was detected and prevented.',
      severity: 'critical',
      timestamp: '1 day ago',
      isRead: true,
      source: 'Governance Watch'
    },
    {
      id: 'alert-7',
      title: 'API endpoint latency increase',
      description: 'The main RPC endpoint is experiencing higher than normal latency (350ms vs 120ms avg).',
      severity: 'low',
      timestamp: '2 days ago',
      isRead: true,
      source: 'Infrastructure Monitor'
    }
  ]);

  const markAsRead = (id: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
    
    toast({
      title: "Alert marked as read",
      description: "The alert has been marked as read and will be moved to the archive after 7 days.",
    });
  };

  const markAllAsRead = () => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert => ({ ...alert, isRead: true }))
    );
    
    toast({
      title: "All alerts marked as read",
      description: "All alerts have been marked as read.",
    });
  };

  const filterAlerts = (alerts: Alert[], tab: string) => {
    const filtered = alerts.filter(alert => {
      const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           alert.description.toLowerCase().includes(searchQuery.toLowerCase());
                           
      if (!matchesSearch) return false;
      
      if (tab === 'unread') return !alert.isRead;
      if (tab === 'critical') return alert.severity === 'critical';
      if (tab === 'high') return alert.severity === 'high';
      
      return true;
    });
    
    return filtered;
  };

  const getSeverityStyles = (severity: AlertSeverity) => {
    switch(severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'high':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">ALERTS</h1>
        <p className="text-muted-foreground">Security alerts and notifications from Messari intelligence</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="relative w-full md:w-96">
          <Input
            type="search"
            placeholder="Search alerts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 md:flex-none"
            onClick={markAllAsRead}
          >
            <BellOff className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 md:flex-none"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button 
            size="sm"
            className="flex-1 md:flex-none"
          >
            <Bell className="mr-2 h-4 w-4" />
            Configure Alerts
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full md:w-auto mb-4 grid grid-cols-4 md:inline-flex">
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="unread">Unread ({alerts.filter(a => !a.isRead).length})</TabsTrigger>
          <TabsTrigger value="critical">Critical ({alerts.filter(a => a.severity === 'critical').length})</TabsTrigger>
          <TabsTrigger value="high">High ({alerts.filter(a => a.severity === 'high').length})</TabsTrigger>
        </TabsList>
        
        {['all', 'unread', 'critical', 'high'].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filterAlerts(alerts, tab).length > 0 ? (
              filterAlerts(alerts, tab).map(alert => (
                <Card 
                  key={alert.id} 
                  className={`border-l-4 ${
                    alert.severity === 'critical' ? 'border-l-red-500' : 
                    alert.severity === 'high' ? 'border-l-amber-500' : 
                    alert.severity === 'medium' ? 'border-l-yellow-500' : 
                    'border-l-green-500'
                  } ${!alert.isRead ? 'bg-muted/30' : ''}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{alert.title}</CardTitle>
                          {!alert.isRead && (
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                          )}
                        </div>
                        <CardDescription className="flex items-center text-xs gap-2">
                          <Clock className="h-3 w-3" /> {alert.timestamp}
                          <span>•</span>
                          <span>{alert.source}</span>
                        </CardDescription>
                      </div>
                      <Badge className={getSeverityStyles(alert.severity)}>
                        <AlertCircle className="mr-1 h-3 w-3" />
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{alert.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    {!alert.isRead && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(alert.id)}
                      >
                        <Eye className="mr-2 h-3 w-3" />
                        Mark as read
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      <Shield className="mr-2 h-3 w-3" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="py-8">
                <CardContent className="flex flex-col items-center justify-center text-center p-6">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No alerts found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery 
                      ? "No alerts match your search query. Try different keywords." 
                      : "There are no alerts in this category."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
};

export default AlertsPage;
