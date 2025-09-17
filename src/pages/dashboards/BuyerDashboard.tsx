import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  FileText,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Contract {
  id: string;
  title: string;
  farmers: string[];
  status: 'draft' | 'active' | 'pending' | 'completed';
  totalValue: number;
  startDate: string;
  endDate: string;
  products: string[];
}

const BuyerDashboard = () => {
  const [showCreateContract, setShowCreateContract] = useState(false);
  const [newContract, setNewContract] = useState({
    title: '',
    description: '',
    products: '',
    quantity: '',
    price: '',
    duration: '',
    terms: ''
  });

  // Mock data for buyer metrics
  const buyerStats = [
    { title: 'Active Contracts', value: '24', change: '+6', icon: FileText },
    { title: 'Total Spend', value: 'R2.1M', change: '+15%', icon: ShoppingCart },
    { title: 'Supplier Network', value: '156', change: '+12', icon: Users },
    { title: 'Quality Score', value: '4.7/5', change: '+0.3', icon: TrendingUp }
  ];

  const purchaseData = [
    { month: 'Jan', vegetables: 45000, fruits: 32000, grains: 28000 },
    { month: 'Feb', vegetables: 52000, fruits: 38000, grains: 31000 },
    { month: 'Mar', vegetables: 48000, fruits: 35000, grains: 29000 },
    { month: 'Apr', vegetables: 61000, fruits: 42000, grains: 35000 },
    { month: 'May', vegetables: 55000, fruits: 39000, grains: 32000 },
    { month: 'Jun', vegetables: 67000, fruits: 45000, grains: 38000 }
  ];

  const supplierData = [
    { region: 'KwaZulu-Natal', suppliers: 45, value: 'R450K' },
    { region: 'Free State', suppliers: 38, value: 'R380K' },
    { region: 'Western Cape', suppliers: 32, value: 'R520K' },
    { region: 'Limpopo', suppliers: 28, value: 'R290K' },
    { region: 'Gauteng', suppliers: 13, value: 'R180K' }
  ];

  const contracts: Contract[] = [
    {
      id: '1',
      title: 'Summer Vegetable Supply 2024',
      farmers: ['Sarah Mthembu', 'John Farmer', 'Green Valley Co-op'],
      status: 'active',
      totalValue: 450000,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      products: ['Tomatoes', 'Peppers', 'Cucumbers']
    },
    {
      id: '2',
      title: 'Maize Contract Q2',
      farmers: ['Johannes van der Merwe', 'Maize Masters Ltd'],
      status: 'pending',
      totalValue: 280000,
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      products: ['Yellow Maize', 'White Maize']
    },
    {
      id: '3',
      title: 'Organic Fruit Partnership',
      farmers: ['David Ntuli', 'Organic Orchards'],
      status: 'draft',
      totalValue: 320000,
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      products: ['Avocados', 'Oranges', 'Apples']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateContract = () => {
    console.log('Creating contract:', newContract);
    setNewContract({
      title: '',
      description: '',
      products: '',
      quantity: '',
      price: '',
      duration: '',
      terms: ''
    });
    setShowCreateContract(false);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Manage your agricultural procurement and supplier relationships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {buyerStats.map((stat, index) => (
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
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Purchase Trends */}
              <Card className="agri-card">
                <CardHeader>
                  <CardTitle>Purchase Trends by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={purchaseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="vegetables" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="fruits" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="grains" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Supplier Distribution */}
              <Card className="agri-card">
                <CardHeader>
                  <CardTitle>Supplier Distribution by Region</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={supplierData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="suppliers" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <Card className="agri-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Contract Management</CardTitle>
                  <Dialog open={showCreateContract} onOpenChange={setShowCreateContract}>
                    <DialogTrigger asChild>
                      <Button className="agri-button">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Contract
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Contract</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Contract Title</Label>
                            <Input
                              id="title"
                              value={newContract.title}
                              onChange={(e) => setNewContract({...newContract, title: e.target.value})}
                              placeholder="e.g., Summer Vegetable Supply 2024"
                            />
                          </div>
                          <div>
                            <Label htmlFor="duration">Contract Duration</Label>
                            <Input
                              id="duration"
                              value={newContract.duration}
                              onChange={(e) => setNewContract({...newContract, duration: e.target.value})}
                              placeholder="e.g., 6 months"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newContract.description}
                            onChange={(e) => setNewContract({...newContract, description: e.target.value})}
                            placeholder="Contract overview and objectives..."
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="products">Products Required</Label>
                            <Input
                              id="products"
                              value={newContract.products}
                              onChange={(e) => setNewContract({...newContract, products: e.target.value})}
                              placeholder="e.g., Tomatoes, Peppers, Cucumbers"
                            />
                          </div>
                          <div>
                            <Label htmlFor="quantity">Total Quantity</Label>
                            <Input
                              id="quantity"
                              value={newContract.quantity}
                              onChange={(e) => setNewContract({...newContract, quantity: e.target.value})}
                              placeholder="e.g., 10 tons"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="price">Budget/Price Range</Label>
                          <Input
                            id="price"
                            value={newContract.price}
                            onChange={(e) => setNewContract({...newContract, price: e.target.value})}
                            placeholder="e.g., R15-18 per kg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="terms">Terms & Conditions</Label>
                          <Textarea
                            id="terms"
                            value={newContract.terms}
                            onChange={(e) => setNewContract({...newContract, terms: e.target.value})}
                            placeholder="Payment terms, quality requirements, delivery schedule..."
                          />
                        </div>
                        <div className="flex space-x-2 pt-4">
                          <Button onClick={handleCreateContract} className="agri-button">
                            Create Contract
                          </Button>
                          <Button variant="outline" onClick={() => setShowCreateContract(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <Card key={contract.id} className="border border-border">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{contract.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {contract.farmers.length} farmer{contract.farmers.length !== 1 ? 's' : ''} • 
                              {contract.products.join(', ')}
                            </p>
                          </div>
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">R{contract.totalValue.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{contract.startDate} - {contract.endDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{contract.farmers.join(', ')}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          {contract.status === 'draft' && (
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="agri-card">
              <CardHeader>
                <CardTitle>Supplier Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {[
                    { name: 'Sarah Mthembu', location: 'KwaZulu-Natal', specialty: 'Organic Vegetables', rating: 4.9, contracts: 5 },
                    { name: 'Johannes van der Merwe', location: 'Free State', specialty: 'Grains & Cereals', rating: 4.7, contracts: 3 },
                    { name: 'Green Valley Co-op', location: 'Western Cape', specialty: 'Mixed Farming', rating: 4.8, contracts: 8 },
                    { name: 'David Ntuli', location: 'Limpopo', specialty: 'Fruits & Nuts', rating: 4.6, contracts: 4 }
                  ].map((supplier, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground">{supplier.specialty} • {supplier.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <span className="text-sm font-medium">{supplier.rating}/5</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className={`w-3 h-3 ${i < Math.floor(supplier.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</div>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{supplier.contracts} active contracts</p>
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
                  <CardTitle>Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Cost per kg</span>
                      <span className="font-semibold">R12.45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cost Reduction This Year</span>
                      <span className="text-green-600 font-semibold">-8.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Quality Score Improvement</span>
                      <span className="text-green-600 font-semibold">+12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Supplier Reliability</span>
                      <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="agri-card">
                <CardHeader>
                  <CardTitle>ROI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Annual Procurement</span>
                      <span className="font-semibold">R2.1M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cost Savings</span>
                      <span className="text-green-600 font-semibold">R172K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Quality Improvement</span>
                      <span className="text-blue-600 font-semibold">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Overall ROI</span>
                      <Badge className="bg-green-100 text-green-800">+28%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;