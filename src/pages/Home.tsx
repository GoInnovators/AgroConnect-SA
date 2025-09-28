import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sprout,
  TrendingUp,
  Shield,
  Truck,
  Brain,
  Users,
  MapPin,
  Clock,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Advanced demand forecasting and quality grading using computer vision and machine learning",
    },
    {
      icon: Truck,
      title: "Delivery",
      description:
        "Offer an efficient and reliable delivery of products to buyers.",
    },
    {
      icon: Users,
      title: "Marketplace Connect",
      description:
        "Direct connection between farmers and verified buyers with secure transactions",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-field opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Empowering Smallholder Farmers with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AgroConnect bridges the gap between farmers and markets through
              intelligent forecasting, quality grading, and delivery services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="agri-button text-lg px-8 py-4">
                <Link to="/auth">Get Started Today</Link>
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 opacity-20 animate-float">
            <Sprout className="h-16 w-16 text-primary" />
          </div>
          <div className="absolute top-32 right-10 opacity-20 animate-float delay-1000">
            <TrendingUp className="h-12 w-12 text-primary" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Comprehensive Agricultural Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From ordering products through our marketplace to delivery
              services, we provide end-to-end solutions for modern agricultural
              challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="agri-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2 animate-grow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-earth">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-12">
            Transforming South African Agriculture
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Farmers Connected" },
              { number: "500+", label: "Verified Buyers" },
              { number: "95%", label: "Price Improvement" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div
                key={index}
                className="animate-grow"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="agri-card p-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Join thousands of farmers already benefiting from AI-powered
              agricultural solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="agri-button">
                <Link to="/auth">Start Your Journey</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/channels">Find Partners</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
