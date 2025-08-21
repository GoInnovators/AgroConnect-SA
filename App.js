import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  Star, 
  MapPin, 
  Clock,
  Settings,
  Eye,
  TrendingUp,
  Truck,
  Smartphone,
  Globe,
  Shield,
  CreditCard,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

const AgroConnectSA = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const products = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      grade: 'Grade A',
      rating: 4.8,
      farmer: 'Thabo Mthembu',
      location: 'Limpopo Province',
      price: 45,
      aiPrice: 'R42-48/kg',
      weight: '500kg available',
      days: '3 days',
      tags: ['Organic', 'Fresh', 'Grade A'],
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Sweet Maize',
      grade: 'Grade A',
      rating: 4.9,
      farmer: 'Nomsa Dlamini',
      location: 'KwaZulu-Natal',
      price: 25,
      aiPrice: 'R23-27/kg',
      weight: '2 tons available',
      days: '1 days',
      tags: ['Sweet', 'Fresh', 'Local'],
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Baby Potatoes',
      grade: 'Grade A',
      rating: 4.7,
      farmer: 'Johannes van der Merwe',
      location: 'Western Cape',
      price: 35,
      aiPrice: 'R32-38/kg',
      weight: '800kg available',
      days: 'Ready Now',
      tags: ['Premium', 'Baby', 'Ready'],
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Leafy Greens Mix',
      grade: 'Grade A',
      rating: 4.6,
      farmer: 'Sipho Khumalo',
      location: 'Gauteng',
      price: 55,
      aiPrice: 'R52-58/kg',
      weight: '200kg available',
      days: '2 days',
      tags: ['Organic', 'Mixed', 'Nutritious'],
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f8015?w=400&h=300&fit=crop'
    }
  ];

  const features = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'AI-Powered Pricing',
      category: 'Smart Technology',
      description: 'Machine learning algorithms analyze market trends, weather data, and demand patterns to provide optimal pricing recommendations for your crops.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Image Quality Grading',
      category: 'Computer Vision',
      description: 'Upload photos of your produce for instant AI-powered quality assessment. Get Grade A-C ratings that buyers trust.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Demand Forecasting',
      category: 'Predictive Analytics',
      description: 'Predict future crop demand using Prophet and ARIMA models. Plan your planting and harvesting for maximum profitability.'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Smart Logistics',
      category: 'Route Optimization',
      description: 'Optimize delivery routes and reduce transportation costs with our logistics optimization engine powered by OR-Tools.'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Multi-Platform Access',
      category: 'Universal Access',
      description: 'Access the marketplace via web, mobile app, USSD (*123#), and IVR systems. Works even with basic feature phones.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Offline-First Design',
      category: 'Always Available',
      description: 'Continue working even without internet connection. Data syncs automatically when you\'re back online.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'POPIA Compliant',
      category: 'Data Protection',
      description: 'Your data is protected according to South African privacy laws. Secure, encrypted, and transparently managed.'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Integrated Finance',
      category: 'Financial Services',
      description: 'Access credit facilities and crop insurance directly through the platform. Partner with leading financial institutions.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Farmers' },
    { number: '50+', label: 'Crop Varieties' },
    { number: 'R2.5M+', label: 'Trade Value' },
    { number: '9/10', label: 'Satisfaction Rate' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEmailSubmit = () => {
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">AgroConnect SA</h1>
                  <p className="text-xs text-gray-500">Smart Farming Marketplace</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#marketplace" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                Marketplace
              </a>
              <a href="#farmers" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                For Farmers
              </a>
              <a href="#buyers" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                For Buyers
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                About
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  3
                </span>
              </div>
              <button className="flex items-center text-gray-700 hover:text-green-600">
                <User className="w-5 h-5 mr-1" />
                Sign In
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-green-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#marketplace" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                  Marketplace
                </a>
                <a href="#farmers" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                  For Farmers
                </a>
                <a href="#buyers" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                  For Buyers
                </a>
                <a href="#about" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                  About
                </a>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-3">
                    <button className="flex items-center text-gray-700 hover:text-green-600 mr-4">
                      <User className="w-5 h-5 mr-1" />
                      Sign In
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-green-600 via-green-500 to-blue-500 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="text-white">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  AI-Powered Agricultural Marketplace
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Transforming
                <br />
                <span className="text-orange-400">South African</span>
                <br />
                Agriculture
              </h1>
              
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                Connect smallholder farmers with buyers through AI-driven pricing, 
                quality grading, and smart logistics. Building a sustainable future for 
                South African agriculture.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors flex items-center justify-center">
                  Start Selling Crops
                  <span className="ml-2">→</span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors">
                  Find Fresh Produce
                </button>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  Multi-Platform Access
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  AI-Driven Pricing
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  POPIA Compliant
                </span>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&h=800&fit=crop"
                  alt="Farmer with tablet in field"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fresh Crops Marketplace
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover quality produce from verified South African farmers. All prices optimized 
              with our AI pricing engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-md text-xs font-medium text-gray-700">
                    {product.grade}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                    {product.days}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating} • {product.farmer}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-2xl font-bold text-green-600">R{product.price}/kg</span>
                      <div className="text-xs text-gray-500">AI: {product.aiPrice}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">{product.weight}</div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              View All Listings
            </button>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Platform Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <br />
              <span className="text-orange-500">Grow Your Agricultural Business</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with practical farming needs 
              to create the most advanced agricultural marketplace in South Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group hover:bg-gray-50 p-6 rounded-xl transition-colors">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                
                <div className="text-sm text-gray-500 font-medium mb-2">{feature.category}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-8">
              Ready to revolutionize your agricultural business?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Start Free Trial
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">AgroConnect SA</h3>
                  <p className="text-sm text-green-200">Smart Farming Marketplace</p>
                </div>
              </div>
              <p className="text-green-200 mb-6 text-sm leading-relaxed">
                Connecting South African farmers with buyers through AI-powered technology. 
                Building a sustainable future for agriculture.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-green-200 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-green-200 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-green-200 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-green-200 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#marketplace" className="text-green-200 hover:text-white block">Marketplace</a>
                <a href="#farmers" className="text-green-200 hover:text-white block">For Farmers</a>
                <a href="#buyers" className="text-green-200 hover:text-white block">For Buyers</a>
                <a href="#pricing" className="text-green-200 hover:text-white block">Pricing</a>
                <a href="#support" className="text-green-200 hover:text-white block">Support</a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-sm">
                <a href="#ai-pricing" className="text-green-200 hover:text-white block">AI Pricing</a>
                <a href="#quality-grading" className="text-green-200 hover:text-white block">Quality Grading</a>
                <a href="#smart-logistics" className="text-green-200 hover:text-white block">Smart Logistics</a>
                <a href="#credit-insurance" className="text-green-200 hover:text-white block">Credit & Insurance</a>
                <a href="#mobile-access" className="text-green-200 hover:text-white block">Mobile Access</a>
              </div>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-green-300" />
                  <span className="text-green-200">hello@agroconnect.co.za</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-300" />
                  <span className="text-green-200">+27 (0) 11 123 4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-green-300" />
                  <span className="text-green-200">Johannesburg, South Africa</span>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold mb-2">Stay Updated</h5>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-l-lg text-gray-900 text-sm focus:outline-none"
                  />
                  <button
                    onClick={handleEmailSubmit}
                    className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors text-sm"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-green-200">
              <p>© 2024 AgroConnect SA. All rights reserved. POPIA Compliant.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#privacy" className="hover:text-white">Privacy Policy</a>
                <a href="#terms" className="hover:text-white">Terms of Service</a>
                <a href="#cookies" className="hover:text-white">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgroConnectSA;
