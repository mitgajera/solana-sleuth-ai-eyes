
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for charts
const performanceData = [
  { name: 'Jan', transactions: 4000, blockTime: 65 },
  { name: 'Feb', transactions: 3000, blockTime: 55 },
  { name: 'Mar', transactions: 5000, blockTime: 45 },
  { name: 'Apr', transactions: 2780, blockTime: 40 },
  { name: 'May', transactions: 1890, blockTime: 35 },
  { name: 'Jun', transactions: 2390, blockTime: 30 },
  { name: 'Jul', transactions: 3490, blockTime: 25 },
];

const securityData = [
  { name: 'Mon', vulnerabilities: 12, patches: 10 },
  { name: 'Tue', vulnerabilities: 19, patches: 15 },
  { name: 'Wed', vulnerabilities: 10, patches: 8 },
  { name: 'Thu', vulnerabilities: 5, patches: 5 },
  { name: 'Fri', vulnerabilities: 7, patches: 7 },
  { name: 'Sat', vulnerabilities: 4, patches: 3 },
  { name: 'Sun', vulnerabilities: 2, patches: 2 },
];

const adoptionData = [
  { name: 'Q1', users: 2400, apps: 140 },
  { name: 'Q2', users: 1398, apps: 150 },
  { name: 'Q3', users: 9800, apps: 230 },
  { name: 'Q4', users: 3908, apps: 340 },
];

const MetricsPage: React.FC = () => {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Metrics updated",
      description: "The latest metrics have been loaded from Messari API",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold cyber-text-glow font-mono tracking-tight mb-1">METRICS</h1>
        <p className="text-muted-foreground">Key performance indicators and metrics from Messari API</p>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="performance">Network Performance</TabsTrigger>
          <TabsTrigger value="security">Security Metrics</TabsTrigger>
          <TabsTrigger value="adoption">Adoption & Growth</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Transaction Volume & Block Time</span>
                <button 
                  onClick={handleRefresh} 
                  className="text-xs bg-cyan-900/20 hover:bg-cyan-800/30 text-cyan-500 px-3 py-1 rounded-full transition-colors"
                >
                  Refresh Data
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis yAxisId="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(24, 24, 27, 0.9)", 
                        borderColor: "rgba(63, 63, 70, 0.5)",
                        color: "#f1f5f9" 
                      }} 
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="transactions" stroke="#8884d8" activeDot={{ r: 8 }} name="Transactions" />
                    <Line yAxisId="right" type="monotone" dataKey="blockTime" stroke="#82ca9d" name="Avg. Block Time (ms)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Average TPS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">3,582</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right h-3 w-3 mr-1"></span>
                  <span>+5.2% from last month</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Validator Count</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">1,785</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right h-3 w-3 mr-1"></span>
                  <span>+12 new validators this week</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Network Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">99.98%</p>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Security Vulnerabilities & Patches</span>
                <button 
                  onClick={handleRefresh} 
                  className="text-xs bg-cyan-900/20 hover:bg-cyan-800/30 text-cyan-500 px-3 py-1 rounded-full transition-colors"
                >
                  Refresh Data
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={securityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(24, 24, 27, 0.9)", 
                        borderColor: "rgba(63, 63, 70, 0.5)",
                        color: "#f1f5f9" 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="vulnerabilities" fill="#ff4d4f" name="Vulnerabilities Detected" />
                    <Bar dataKey="patches" fill="#52c41a" name="Patches Applied" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Current Risk Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">82/100</p>
                <p className="text-xs text-amber-500 flex items-center mt-1">Medium Risk</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Audit Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">94%</p>
                <p className="text-xs text-muted-foreground mt-1">3 audits in progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Alerts (Last 24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">7</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="i-lucide-arrow-down-right h-3 w-3 mr-1"></span>
                  <span>-12% from yesterday</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="adoption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>User Growth & App Development</span>
                <button 
                  onClick={handleRefresh} 
                  className="text-xs bg-cyan-900/20 hover:bg-cyan-800/30 text-cyan-500 px-3 py-1 rounded-full transition-colors"
                >
                  Refresh Data
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={adoptionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(24, 24, 27, 0.9)", 
                        borderColor: "rgba(63, 63, 70, 0.5)",
                        color: "#f1f5f9" 
                      }} 
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="users" fill="#8884d8" name="Active Users (thousands)" />
                    <Bar yAxisId="right" dataKey="apps" fill="#82ca9d" name="Active dApps" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">New Wallets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">14,325</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right h-3 w-3 mr-1"></span>
                  <span>+21.3% from last month</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Developer Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">583</p>
                <p className="text-xs text-muted-foreground mt-1">Active contributors last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">TVL Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">+8.2%</p>
                <p className="text-xs text-muted-foreground mt-1">Month-over-month change</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default MetricsPage;
