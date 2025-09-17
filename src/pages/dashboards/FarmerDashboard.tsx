import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sprout, 
  TrendingUp, 
  DollarSign, 
  Package,
  Plus,
  Download,
  Upload,
  Calendar,
  MapPin,
  FileText
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FarmerDashboard = () => {
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: 'yield',
    crop: '',
    quantity: '',
    date: '',
    notes: ''
  });

  // Mock data for farmer metrics
  const farmerStats = [
    { title: 'Total Revenue', value: 'R125,430', change: '+18%', icon: DollarSign },
    { title: 'Active Listings', value: '12', change: '+3', icon: Package },
    { title: 'Crop Yield', value: '2.8 tons', change: '+12%', icon: Sprout },
    { title: 'Market Rating', value: '4.8/5', change: '+0.2', icon: TrendingUp }
  ];

  const yieldData = [
    { month: 'Jan', tomatoes: 450, maize: 1200, potatoes: 800 },
    { month: 'Feb', tomatoes: 520, maize: 1100, potatoes: 750 },
    { month: 'Mar', tomatoes: 480, maize: 1350, potatoes: 900 },
    { month: 'Apr', tomatoes: 600, maize: 1250, potatoes: 850 },
    { month: 'May', tomatoes: 580, maize: 1400, potatoes: 920 },
    { month: 'Jun', tomatoes: 650, maize: 1300, potatoes: 980 }
  ];

  const expenseData = [
    { category: 'Seeds', amount: 15000 },
    { category: 'Fertilizer', amount: 22000 },
    { category: 'Labor', amount: 35000 },
    { category: 'Equipment', amount: 18000 },
    { category: 'Fuel', amount: 12000 }
  ];

  const recentRecords = [
    { id: 1, type: 'yield', crop: 'Tomatoes', quantity: '150kg', date: '2024-01-15', notes: 'Good harvest quality' },
    { id: 2, type: 'expense', crop: 'General', quantity: 'R2,500', date: '2024-01-14', notes: 'Fertilizer purchase' },
    { id: 3, type: 'livestock', crop: 'Chickens', quantity: '50 birds', date: '2024-01-12', notes: 'Monthly count' },
    { id: 4, type: 'yield', crop: 'Maize', quantity: '500kg', date: '2024-01-10', notes: 'Early harvest test' }
  ];

  const handleAddRecord = () => {
    // Add logic to save the record
    console.log('Adding record:', newRecord);
    setNewRecord({ type: 'yield', crop: '', quantity: '', date: '', notes: '' });
    setShowAddRecord(false);
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export functionality
    console.log('Exporting farmer records to CSV...');
    // This would generate and download a CSV file with all farmer records
  };

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'yield': return 'bg-green-100 text-green-800';
      case 'expense': return 'bg-red-100 text-red-800';
      case 'livestock': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Track your farming operations and market performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {farmerStats.map((stat, index) => (
            <Card key={index} className="agri-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} this month</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="records">My Records</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Yield Tracking */}
              <Card className="agri-card">
                <CardHeader>
                  <CardTitle>Crop Yield Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yieldData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="tomatoes" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="maize" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="potatoes" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Expense Breakdown */}
              <Card className="agri-card">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expenseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <Card className="agri-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Farm Records</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleExportCSV}>
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button onClick={() => setShowAddRecord(true)} className="agri-button">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Record
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {showAddRecord && (
                  <Card className="mb-6 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Record</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="type">Record Type</Label>
                          <select
                            id="type"
                            value={newRecord.type}
                            onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="yield">Crop Yield</option>
                            <option value="expense">Expense</option>
                            <option value="livestock">Livestock</option>
                            <option value="maintenance">Equipment Maintenance</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="crop">Crop/Category</Label>
                          <Input
                            id="crop"
                            value={newRecord.crop}
                            onChange={(e) => setNewRecord({...newRecord, crop: e.target.value})}
                            placeholder="e.g., Tomatoes, General"
                          />
                        </div>
                        <div>
                          <Label htmlFor="quantity">Quantity/Amount</Label>
                          <Input
                            id="quantity"
                            value={newRecord.quantity}
                            onChange={(e) => setNewRecord({...newRecord, quantity: e.target.value})}
                            placeholder="e.g., 150kg, R2,500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newRecord.date}
                            onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          value={newRecord.notes}
                          onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                          placeholder="Additional notes about this record..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleAddRecord} className="agri-button">
                          Save Record
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddRecord(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-4">
                  {recentRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getRecordTypeColor(record.type)}>
                          {record.type}
                        </Badge>
                        <div>
                          <p className="font-medium">{record.crop}</p>
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{record.quantity}</p>
                        <p className="text-sm text-muted-foreground">{record.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="agri-card">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={yieldData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="tomatoes" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="agri-card">
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Best Performing Crop</span>
                    <Badge className="bg-green-100 text-green-800">Tomatoes</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Highest Revenue Month</span>
                    <span className="font-semibold">June</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Yield Increase</span>
                    <span className="text-green-600 font-semibold">+12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cost Efficiency</span>
                    <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <Card className="agri-card">
              <CardHeader>
                <CardTitle>Active Market Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {[
                    { product: 'Organic Tomatoes', price: 'R15.50/kg', quantity: '500kg', status: 'active' },
                    { product: 'Fresh Eggs', price: 'R2.80/dozen', quantity: '200 dozen', status: 'active' },
                    { product: 'Sweet Potatoes', price: 'R12.00/kg', quantity: '300kg', status: 'pending' }
                  ].map((listing, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{listing.product}</p>
                        <p className="text-sm text-muted-foreground">{listing.quantity} available</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{listing.price}</p>
                        <Badge className={listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
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

export default FarmerDashboard;