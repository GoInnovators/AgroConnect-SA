import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Star, 
  MapPin, 
  Truck, 
  Shield,
  Clock,
  Filter
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  farmer: string;
  location: string;
  category: string;
  qualityGrade: 'A+' | 'A' | 'B+' | 'B';
  price: number;
  unit: string;
  quantity: string;
  rating: number;
  verified: boolean;
  harvestDate: string;
  description: string;
  image: string;
}

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [qualityFilter, setQualityFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const products: Product[] = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      farmer: 'Sarah Mthembu',
      location: 'KwaZulu-Natal',
      category: 'vegetables',
      qualityGrade: 'A+',
      price: 15.50,
      unit: 'kg',
      quantity: '500kg available',
      rating: 4.9,
      verified: true,
      harvestDate: '2024-01-15',
      description: 'Fresh organic tomatoes, pesticide-free, perfect for retail',
      image: 'tomatoes'
    },
    {
      id: '2',
      name: 'Yellow Maize',
      farmer: 'Johannes van der Merwe',
      location: 'Free State',
      category: 'grains',
      qualityGrade: 'A',
      price: 4.20,
      unit: 'kg',
      quantity: '2 tons available',
      rating: 4.7,
      verified: true,
      harvestDate: '2024-01-10',
      description: 'Grade 1 yellow maize, moisture content 12.5%',
      image: 'maize'
    },
    {
      id: '3',
      name: 'Free-Range Eggs',
      farmer: 'Maria Santos',
      location: 'Western Cape',
      category: 'livestock',
      qualityGrade: 'A+',
      price: 2.80,
      unit: 'dozen',
      quantity: '200 dozen available',
      rating: 4.8,
      verified: true,
      harvestDate: '2024-01-16',
      description: 'Fresh free-range eggs from pasture-raised hens',
      image: 'eggs'
    },
    {
      id: '4',
      name: 'Avocados',
      farmer: 'David Ntuli',
      location: 'Limpopo',
      category: 'fruits',
      qualityGrade: 'A',
      price: 28.00,
      unit: 'kg',
      quantity: '300kg available',
      rating: 4.6,
      verified: true,
      harvestDate: '2024-01-12',
      description: 'Premium Hass avocados, export quality',
      image: 'avocados'
    },
    {
      id: '5',
      name: 'Butternut Squash',
      farmer: 'Grace Mokoena',
      location: 'Gauteng',
      category: 'vegetables',
      qualityGrade: 'B+',
      price: 8.50,
      unit: 'kg',
      quantity: '150kg available',
      rating: 4.4,
      verified: false,
      harvestDate: '2024-01-14',
      description: 'Fresh butternut squash, great for local markets',
      image: 'butternut'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesQuality = qualityFilter === 'all' || product.qualityGrade === qualityFilter;
    const matchesLocation = locationFilter === 'all' || product.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesQuality && matchesLocation;
  });

  const getQualityColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800 border-green-200';
      case 'A': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B+': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'B': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agricultural Marketplace</h1>
          <p className="text-muted-foreground">
            Discover quality products from verified farmers across South Africa
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products or farmers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="livestock">Livestock</SelectItem>
                </SelectContent>
              </Select>

              <Select value={qualityFilter} onValueChange={setQualityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Quality Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="A+">Grade A+</SelectItem>
                  <SelectItem value="A">Grade A</SelectItem>
                  <SelectItem value="B+">Grade B+</SelectItem>
                  <SelectItem value="B">Grade B</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                  <SelectItem value="Free State">Free State</SelectItem>
                  <SelectItem value="Western Cape">Western Cape</SelectItem>
                  <SelectItem value="Limpopo">Limpopo</SelectItem>
                  <SelectItem value="Gauteng">Gauteng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="agri-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {product.farmer}</p>
                  </div>
                  {product.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getQualityColor(product.qualityGrade)}>
                    Grade {product.qualityGrade}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{product.description}</p>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Harvested {product.harvestDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        R{product.price}
                        <span className="text-sm font-normal text-muted-foreground">/{product.unit}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{product.quantity}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 agri-button">
                      Contact Farmer
                    </Button>
                    <Button variant="outline" size="icon">
                      <Truck className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;