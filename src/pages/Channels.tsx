import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Clock,
  Users,
  Search,
  Filter,
  Video,
  Camera,
  Upload,
  Plane,
  Play,
  Pause,
  Download
} from 'lucide-react';
import LocationMap from '@/components/Map/LocationMap';

const Channels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const insuranceProviders = [
    {
      id: 1,
      name: 'Santam Agriculture',
      type: 'insurance',
      rating: 4.8,
      specialties: ['Crop Insurance', 'Livestock', 'Weather Protection'],
      location: 'Cape Town',
      phone: '+27 21 915 8000',
      email: 'agriculture@santam.co.za',
      description: 'Comprehensive agricultural insurance solutions for South African farmers.',
      responseTime: '2 hours',
      clientCount: '15,000+'
    },
    {
      id: 2,
      name: 'Hollard Agri',
      type: 'insurance',
      rating: 4.6,
      specialties: ['Multi-Peril Crop', 'Hail Insurance', 'Farm Assets'],
      location: 'Johannesburg',
      phone: '+27 11 351 5000',
      email: 'agri@hollard.co.za',
      description: 'Tailored insurance products for commercial and emerging farmers.',
      responseTime: '4 hours',
      clientCount: '8,500+'
    }
  ];

  const logisticsProviders = [
    {
      id: 3,
      name: 'FreshProduce Logistics',
      type: 'logistics',
      rating: 4.9,
      specialties: ['Cold Chain', 'Fresh Produce', 'Last Mile Delivery'],
      location: 'Durban',
      phone: '+27 31 205 8000',
      email: 'bookings@freshlogistics.co.za',
      description: 'Specialized cold-chain logistics for fresh agricultural products.',
      responseTime: '1 hour',
      clientCount: '2,500+'
    },
    {
      id: 4,
      name: 'AgriTransport Solutions',
      type: 'logistics',
      rating: 4.7,
      specialties: ['Bulk Transport', 'Grain Handling', 'Storage Solutions'],
      location: 'Bloemfontein',
      phone: '+27 51 444 9000',
      email: 'operations@agritransport.co.za',
      description: 'Efficient transport and storage solutions for agricultural commodities.',
      responseTime: '3 hours',
      clientCount: '5,200+'
    },
    {
      id: 5,
      name: 'Rural Connect Delivery',
      type: 'logistics',
      rating: 4.5,
      specialties: ['Rural Areas', 'Small Farmers', 'Flexible Scheduling'],
      location: 'Pietermaritzburg',
      phone: '+27 33 386 2000',
      email: 'connect@ruraldelivery.co.za',
      description: 'Connecting smallholder farmers to markets with reliable transport.',
      responseTime: '2 hours',
      clientCount: '12,000+'
    }
  ];

  const allProviders = [...insuranceProviders, ...logisticsProviders];

  const filteredProviders = allProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesFilter = activeFilter === 'all' || provider.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getProviderIcon = (type: string) => {
    return type === 'insurance' ? Shield : Truck;
  };

  const getProviderColor = (type: string) => {
    return type === 'insurance' ? 'bg-blue-500' : 'bg-green-500';
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Provider Channels</h1>
          <p className="text-muted-foreground">
            Connect with trusted providers and monitor your fields with advanced technology
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="providers" className="space-y-6">
             <TabsList className="grid w-full grid-cols-3 lg:w-[600px] mx-auto">
            <TabsTrigger value="providers" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security & Insurance</span>
            </TabsTrigger>
            <TabsTrigger value="drone" className="flex items-center space-x-2">
              <Plane className="h-4 w-4" />
              <span>Drone Monitoring</span>
               </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Provider Locations</span>
            </TabsTrigger>
          </TabsList>

          {/* Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            {/* Search and Filter */}
            <Card className="agri-card animate-slide-up">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search providers or specialties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={activeFilter === 'all' ? 'default' : 'outline'}
                      onClick={() => setActiveFilter('all')}
                      className={activeFilter === 'all' ? 'agri-button' : ''}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      All
                    </Button>
                    <Button
                      variant={activeFilter === 'insurance' ? 'default' : 'outline'}
                      onClick={() => setActiveFilter('insurance')}
                      className={activeFilter === 'insurance' ? 'agri-button' : ''}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Insurance
                    </Button>
                    <Button
                      variant={activeFilter === 'logistics' ? 'default' : 'outline'}
                      onClick={() => setActiveFilter('logistics')}
                      className={activeFilter === 'logistics' ? 'agri-button' : ''}
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Logistics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProviders.map((provider, index) => (
                <Card 
                  key={provider.id} 
                  className="agri-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 animate-grow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 ${getProviderColor(provider.type)} rounded-lg`}>
                          {React.createElement(getProviderIcon(provider.type), { 
                            className: "h-6 w-6 text-white" 
                          })}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium ml-1">{provider.rating}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {provider.type === 'insurance' ? 'Insurance' : 'Logistics'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{provider.description}</p>
                    
                    {/* Specialties */}
                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-foreground mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 py-3 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <Clock className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">Response</div>
                        <div className="text-sm font-medium">{provider.responseTime}</div>
                      </div>
                      <div className="text-center">
                        <Users className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">Clients</div>
                        <div className="text-sm font-medium">{provider.clientCount}</div>
                      </div>
                      <div className="text-center">
                        <MapPin className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="text-sm font-medium">{provider.location}</div>
                      </div>
                    </div>

                    {/* Contact Options */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 hover:bg-primary/10 hover:border-primary"
                        onClick={() => window.open(`tel:${provider.phone}`, '_self')}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 hover:bg-primary/10 hover:border-primary"
                        onClick={() => window.open(`mailto:${provider.email}`, '_self')}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                      <Button className="flex-1 agri-button">
                        Contact Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No providers found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find relevant providers.
                </p>
              </div>
            )}

           {/* Map Section with LocationMap Component */}
            <Card className="agri-card animate-slide-up" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Provider Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LocationMap providers={filteredProviders} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drone Monitoring Tab */}
          <TabsContent value="drone" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Live Video Feed */}
              <Card className="agri-card animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Video className="mr-2 h-5 w-5 text-primary" />
                      Live Video Feed
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">LIVE</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">Drone Camera Feed</p>
                        <p className="text-sm opacity-70">Field monitoring in real-time</p>
                        {/* TODO: integrate drone video streaming API here */}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => setIsRecording(!isRecording)}
                      >
                        {isRecording ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                        {isRecording ? 'Pause' : 'Start'}
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4 mr-1" />
                        Capture
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Resolution: 1920x1080</span>
                    <span>Signal: Strong</span>
                  </div>
                </CardContent>
              </Card>

              {/* Photo Upload & Gallery */}
              <Card className="agri-card animate-slide-up" style={{ animationDelay: '100ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="mr-2 h-5 w-5 text-primary" />
                    Field Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Upload field photos</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Drag and drop or click to select
                        </p>
                      </label>
                    </div>

                    {/* Photo Gallery */}
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {uploadedImages.map((src, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={src}
                              alt={`Field photo ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg"></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monitoring Analytics */}
            <Card className="agri-card animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plane className="mr-2 h-5 w-5 text-primary" />
                  Field Monitoring Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">85%</div>
                    <div className="text-sm text-muted-foreground">Crop Health Score</div>
                    <div className="text-xs text-green-600 mt-1">↑ 5% from last week</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">12.5ha</div>
                    <div className="text-sm text-muted-foreground">Area Monitored</div>
                    <div className="text-xs text-blue-600 mt-1">Real-time coverage</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-2">3</div>
                    <div className="text-sm text-muted-foreground">Alerts Today</div>
                    <div className="text-xs text-orange-600 mt-1">Irrigation needed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </TabsContent>
          {/* Provider Locations Map */}
          <TabsContent value="map" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Provider Locations Map</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationMap providers={filteredProviders} />
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Location Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Providers</span>
                        <span className="font-semibold">{filteredProviders.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance Providers</span>
                        <span className="font-semibold">
                          {filteredProviders.filter(p => p.type === 'insurance').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Logistics Providers</span>
                        <span className="font-semibold">
                          {filteredProviders.filter(p => p.type === 'logistics').length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Coverage Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Array.from(new Set(filteredProviders.map(p => p.location))).map(location => (
                        <div key={location} className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{location}</span>
                          <Badge variant="secondary" className="text-xs">
                            {filteredProviders.filter(p => p.location === location).length}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Channels;