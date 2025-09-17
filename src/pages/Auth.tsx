import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sprout, Mail, Lock, User, ArrowRight, Shield, TrendingUp, Users, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent, isLogin: boolean = true) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mock user based on role
    const mockUser = {
      id: '1',
      name: isLogin ? 'John Doe' : 'New User',
      email: 'user@example.com',
      role: selectedRole as UserRole
    };
    
    setUser(mockUser);
    
    // Redirect to appropriate dashboard
    const roleRoutes = {
      admin: '/admin',
      farmer: '/farmer', 
      buyer: '/buyer'
    };
    
    navigate(roleRoutes[selectedRole]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-field flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-4xl animate-grow">
        {/* About Section */}
        <Card className="agri-card shadow-glow mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Link to="/" className="inline-flex items-center space-x-3 group">
                <div className="p-3 bg-gradient-primary rounded-xl group-hover:shadow-glow transition-all duration-300">
                  <Sprout className="h-8 w-8 text-primary-foreground" />
                </div>
              </Link>
              <h1 className="text-3xl font-bold mt-4 text-foreground">Welcome to AgriAI Connect</h1>
              <p className="text-lg text-muted-foreground">Empowering South African Agriculture with AI</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">What We Do</h3>
                <p className="text-muted-foreground mb-4">
                  AgriAI Connect bridges the gap between smallholder farmers and modern markets through 
                  intelligent technology solutions. We provide AI-powered demand forecasting, quality grading, 
                  dynamic pricing, and optimized logistics.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">AI demand forecasting & dynamic pricing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Quality grading with computer vision</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span className="text-sm">Route optimization & cold-chain solutions</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Problems We Solve</h3>
                <div className="space-y-3 text-muted-foreground">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-foreground mb-1">Market Fragmentation</p>
                    <p className="text-sm">Connect farmers directly to verified buyers, eliminating middlemen</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-foreground mb-1">Information Gaps</p>
                    <p className="text-sm">Real-time market data and pricing transparency</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-foreground mb-1">Limited Access to Finance</p>
                    <p className="text-sm">Unlock credit and insurance through our platform partnerships</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Get Started Today</h2>
            <p className="text-muted-foreground">Join thousands of farmers and buyers already using our platform</p>
          </div>

          <Card className="agri-card shadow-glow">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-xl text-center">Sign In to Your Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="farmer@example.com"
                        className="pl-10 border-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="agri-button w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Signing In..."
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="text-xl text-center">Create Your Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Farmer"
                        className="pl-10 border-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">User Type</Label>
                    <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farmer">Farmer (Primary User)</SelectItem>
                        <SelectItem value="buyer">Buyer (Enterprise)</SelectItem>
                        <SelectItem value="admin">Admin (Super User)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="farmer@example.com"
                        className="pl-10 border-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="agri-button w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Creating Account..."
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By signing up, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </CardContent>
            </TabsContent>
            </Tabs>
          </Card>

          <div className="text-center mt-6">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;