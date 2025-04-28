
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, RefreshCw, Check, X, Link, Database, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DataSource = {
  id: string;
  name: string;
  type: 'api' | 'blockchain' | 'oracle';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  healthScore: number;
};

const DataSourcesPage: React.FC = () => {
  const { toast } = useToast();
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: 'ds-1',
      name: 'Messari API',
      type: 'api',
      status: 'connected',
      lastSync: '2 minutes ago',
      healthScore: 98,
    },
    {
      id: 'ds-2',
      name: 'Solana Mainnet',
      type: 'blockchain',
      status: 'connected',
      lastSync: '1 minute ago',
      healthScore: 100,
    },
    {
      id: 'ds-3',
      name: 'Chainlink Price Feed',
      type: 'oracle',
      status: 'connected',
      lastSync: '5 minutes ago',
      healthScore: 95,
    },
    {
      id: 'ds-4',
      name: 'CoinGecko API',
      type: 'api',
      status: 'error',
      lastSync: '3 hours ago',
      healthScore: 45,
    },
    {
      id: 'ds-5',
      name: 'Solana Devnet',
      type: 'blockchain',
      status: 'disconnected',
      lastSync: '1 day ago',
      healthScore: 0,
    }
  ]);

  const handleRefreshSource = (id: string) => {
    setDataSources(prevSources => 
      prevSources.map(source => 
        source.id === id 
          ? { ...source, lastSync: 'Just now', status: 'connected', healthScore: Math.min(100, source.healthScore + 5) } 
          : source
      )
    );
    
    toast({
      title: "Data Source Refreshed",
      description: `The connection has been refreshed successfully.`,
    });
  };

  const handleToggleSource = (id: string, enabled: boolean) => {
    setDataSources(prevSources => 
      prevSources.map(source => 
        source.id === id 
          ? { 
              ...source, 
              status: enabled ? 'connected' : 'disconnected',
              lastSync: enabled ? 'Just now' : source.lastSync,
              healthScore: enabled ? 80 : 0
            } 
          : source
      )
    );
    
    toast({
      title: enabled ? "Data Source Enabled" : "Data Source Disabled",
      description: enabled 
        ? `The data source is now active and collecting data.` 
        : `The data source has been disconnected.`,
    });
  };

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    const newSource: DataSource = {
      id: `ds-${dataSources.length + 1}`,
      name: 'New Data Source',
      type: 'api',
      status: 'connected',
      lastSync: 'Just now',
      healthScore: 85,
    };
    
    setDataSources(prev => [...prev, newSource]);
    setIsAddingSource(false);
    
    toast({
      title: "New Data Source Added",
      description: "The new data source has been connected successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">DATA SOURCES</h1>
        <p className="text-muted-foreground">Configure and manage Messari API data sources</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Connected Data Sources</h2>
        <Button 
          onClick={() => setIsAddingSource(true)}
          className="bg-cyan-900/20 hover:bg-cyan-800/30 text-cyan-500"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Data Source
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {dataSources.map((source) => (
          <Card key={source.id} className={source.status === 'error' ? 'border-red-500/30' : source.status === 'disconnected' ? 'border-gray-500/30' : 'border-green-500/30'}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{source.name}</CardTitle>
                  <CardDescription>
                    {source.type === 'api' && 'REST API'}
                    {source.type === 'blockchain' && 'Blockchain Node'}
                    {source.type === 'oracle' && 'Oracle Feed'}
                  </CardDescription>
                </div>
                <Badge className={
                  source.status === 'connected' ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                  source.status === 'error' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                  'bg-gray-500/20 text-gray-500 border-gray-500/30'
                }>
                  {source.status === 'connected' && <Check className="mr-1 h-3 w-3" />}
                  {source.status === 'error' && <X className="mr-1 h-3 w-3" />}
                  {source.status === 'disconnected' && <Link className="mr-1 h-3 w-3" />}
                  {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-3 w-3" /> Last sync
                  </span>
                  <span>{source.lastSync}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Shield className="mr-1 h-3 w-3" /> Health score
                  </span>
                  <span className={
                    source.healthScore > 80 ? 'text-green-500' :
                    source.healthScore > 50 ? 'text-amber-500' :
                    'text-red-500'
                  }>
                    {source.healthScore}/100
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center mt-4">
                  <span className="text-muted-foreground">Enabled</span>
                  <Switch 
                    checked={source.status !== 'disconnected'} 
                    onCheckedChange={(checked) => handleToggleSource(source.id, checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                disabled={source.status === 'disconnected'}
                onClick={() => handleRefreshSource(source.id)}
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Refresh Connection
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isAddingSource && (
        <Card className="mb-6 border-dashed border-cyan-500/30">
          <CardHeader>
            <CardTitle>Add New Data Source</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSource} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Data Source Name</Label>
                <Input id="name" placeholder="e.g. Solana RPC Node" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">Connection URL</Label>
                <Input id="url" placeholder="https://" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Data Source Type</Label>
                <select id="type" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="api">API</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="oracle">Oracle</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apikey">API Key (if required)</Label>
                <Input id="apikey" type="password" placeholder="Enter your API key" />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingSource(false)}>Cancel</Button>
            <Button onClick={handleAddSource}>Add Data Source</Button>
          </CardFooter>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Data Source Documentation</CardTitle>
          <CardDescription>Learn how to connect and configure different data sources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <Database className="h-8 w-8 text-cyan-500" />
            <div>
              <h3 className="font-medium">Messari API Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Set up and configure the Messari API to access comprehensive blockchain and crypto asset data.
              </p>
              <Button variant="link" className="p-0 h-auto text-sm mt-1">View Documentation</Button>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Shield className="h-8 w-8 text-cyan-500" />
            <div>
              <h3 className="font-medium">Security Best Practices</h3>
              <p className="text-sm text-muted-foreground">
                Learn about the recommended security practices for managing API keys and connections.
              </p>
              <Button variant="link" className="p-0 h-auto text-sm mt-1">View Documentation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DataSourcesPage;
