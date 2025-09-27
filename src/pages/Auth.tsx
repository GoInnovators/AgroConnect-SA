import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sprout,
  Mail,
  Lock,
  User,
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, UserRole } from "@/contexts/UserContext";
import { supabase } from "@/lib/utils";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [selectedRole, setSelectedRole] = useState<UserRole>("farmer");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent, isLogin: boolean = true) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create mock user based on role
    const mockUser = {
      id: "1",
      name: isLogin ? "John Doe" : "New User",
      email: "user@example.com",
      role: selectedRole as UserRole,
    };

    setUser(mockUser);

    // Redirect to appropriate dashboard
    const roleRoutes = {
      admin: "/admin",
      farmer: "/farmer",
      buyer: "/buyer",
    };

    navigate(roleRoutes[selectedRole]);
    setIsLoading(false);
  };

  const login = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (!error) {
      navigate("/farmer");
    } else {
      console.log(formData);
      alert("Error during login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-field flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-4xl animate-grow">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Get Started Today
            </h2>
            <p className="text-muted-foreground">
              Join thousands of farmers and buyers already using our platform
            </p>
          </div>

          <Card className="agri-card shadow-glow">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    Sign In to Your Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => login(e)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          onChange={(e) =>
                            setFormData((prev) => {
                              return { ...prev, email: e.target.value };
                            })
                          }
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
                          onChange={(e) =>
                            setFormData((prev) => {
                              return { ...prev, password: e.target.value };
                            })
                          }
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
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </form>
                </CardContent>
              </TabsContent>

              <TabsContent value="register">
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    Create Your Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => handleSubmit(e, false)}
                    className="space-y-4"
                  >
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
                      <Select
                        value={selectedRole}
                        onValueChange={(value: UserRole) =>
                          setSelectedRole(value)
                        }
                      >
                        <SelectTrigger className="border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="farmer">Farmer </SelectItem>
                          <SelectItem value="buyer">Buyer </SelectItem>
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
                      By signing up, you agree to our{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
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
