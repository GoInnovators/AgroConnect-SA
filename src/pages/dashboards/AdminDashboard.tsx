import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Shield,
  Database,
  Settings,
  Activity,
  DollarSign,
  UserCheck,
  Ban
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Mock data for admin metrics
  const systemMetrics = [
    { title: 'Total Users', value: '12,453', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Active Farmers', value: '8,231', change: '+8%', icon: UserCheck, color: 'text-green-600' },
    { title: 'Verified Buyers', value: '1,847', change: '+15%', icon: Shield, color: 'text-purple-600' },
    { title: 'System Uptime', value: '99.9%', change: '+0.1%', icon: Activity, color: 'text-emerald-600' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, transactions: 1200 },
    { month: 'Feb', revenue: 52000, transactions: 1450 },
    { month: 'Mar', revenue: 48000, transactions: 1350 },
    { month: 'Apr', revenue: 61000, transactions: 1680 },
    { month: 'May', revenue: 55000, transactions: 1520 },
    { month: 'Jun', revenue: 67000, transactions: 1890 }
  ];

  const userGrowthData = [
    { month: 'Jan', farmers: 7200, buyers: 1200 },
    { month: 'Feb', farmers: 7450, buyers: 1320 },
    { month: 'Mar', farmers: 7680, buyers: 1450 },
    { month: 'Apr', farmers: 7920, buyers: 1580 },
    { month: 'May', farmers: 8100, buyers: 1720 },
    { month: 'Jun', users: 8231, buyers: 1847 }
  ];

  const alertsData = [
    { id: 1, type: 'security', message: 'Unusual login activity detected', severity: 'high', time: '2 hours ago' },
    { id: 2, type: 'system', message: 'Database backup completed successfully', severity: 'low', time: '4 hours ago' },
    { id: 3, type: 'user', message: 'New farmer verification pending', severity: 'medium', time: '6 hours ago' },
    { id: 4, type: 'payment', message: 'Payment gateway latency increased', severity: 'medium', time: '1 day ago' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management controls</p>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="agri-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change} from last month
                    </p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="agri-card">
                <CardHeader>
                  <CardTitle>Revenue & Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* User Growth Chart */}
              <Card className="agri-card">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="farmers" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="buyers" stroke="hsl(var(--accent))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* System Alerts */}
            <Card className="agri-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>System Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertsData.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="agri-card">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Pending Verifications</h3>
                    <Badge className="bg-yellow-100 text-yellow-800">23 pending</Badge>
                  </div>
                  <div className="grid gap-4">
                    {[
                      { name: 'Sarah Mthembu', type: 'Farmer', location: 'KwaZulu-Natal', status: 'verification' },
                      { name: 'AgriCorp Ltd', type: 'Buyer', location: 'Gauteng', status: 'verification' },
                      { name: 'John Farmers Co-op', type: 'Farmer', location: 'Free State', status: 'verification' }
                    ].map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.type} • {user.location}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="agri-button">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <Ban className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="agri-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Database Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Connection Pool</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Query Performance</span>
                      <Badge className="bg-green-100 text-green-800">Good</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage Usage</span>
                      <Badge className="bg-yellow-100 text-yellow-800">78%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Backup</span>
                      <span className="text-sm text-muted-foreground">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="agri-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>API Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Response Time</span>
                      <span className="text-sm text-muted-foreground">145ms avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate</span>
                      <Badge className="bg-green-100 text-green-800">99.7%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate Limiting</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Requests</span>
                      <span className="text-sm text-muted-foreground">1.2M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="agri-card">
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'User Activity Report', description: 'Detailed user engagement metrics' },
                    { title: 'Financial Summary', description: 'Revenue and transaction analysis' },
                    { title: 'System Performance', description: 'Technical performance metrics' },
                    { title: 'Security Audit', description: 'Security events and compliance' },
                    { title: 'Marketplace Analytics', description: 'Product and transaction insights' },
                    { title: 'Regional Analysis', description: 'Geographic usage patterns' }
                  ].map((report, index) => (
                    <Card key={index} className="border border-border">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{report.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                        <Button size="sm" className="w-full agri-button">
                          Generate Report
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;