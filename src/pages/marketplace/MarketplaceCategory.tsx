import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Shield, Filter } from "lucide-react";
import { Link } from "react-router-dom";

import { getLocation } from "@/lib/utils";
import { categories } from "@/lib/constants";
import { farmers } from "@/lib/demoData";

const MarketplaceCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [qualityFilter, setQualityFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [userLocation, setUserLocation] = useState(null);
  const [sortedFarmers, setSortedFarmers] = useState(farmers);

  // Get user location
  useEffect(() => {
    setUserLocation(getLocation());

    const pathname = window.location.pathname;
    const category = pathname.substring(pathname.lastIndexOf("/") + 1);
    setCategoryFilter(category);
  }, []);

  // Haversine formula to calculate distance in km
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    console.log(d);
    return d;
  };

  // Filter and sort farmers based on user location and filters
  useEffect(() => {
    if (!userLocation) return;

    const filtered = farmers
      .filter((farmer) => {
        const matchesSearch =
          farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          farmer.farmer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          categoryFilter === "all" || farmer.category === categoryFilter;
        const matchesQuality =
          qualityFilter === "all" || farmer.qualityGrade === qualityFilter;
        const matchesLocation =
          locationFilter === "all" || farmer.location === locationFilter;

        return (
          matchesSearch && matchesCategory && matchesQuality && matchesLocation
        );
      })
      .map((farmer) => ({
        ...farmer,
        distance: getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lon,
          farmer.lat,
          farmer.lon
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    setSortedFarmers(filtered);
  }, [userLocation, searchTerm, categoryFilter, qualityFilter, locationFilter]);

  const getQualityColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800 border-green-200";
      case "A":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "B+":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "B":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {categories.find((cat) => cat.key === categoryFilter)?.value}
          </h1>
          <p className="text-muted-foreground">
            Discover quality farmers from verified farmers across South Africa
          </p>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedFarmers.length} farmer
            {sortedFarmers.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* farmers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedFarmers.map((farmer) => (
            <Card
              key={farmer.id}
              className="agri-card hover:shadow-glow transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  className="w-full h-full object-cover"
                />
                {farmer.verified && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{farmer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      by {farmer.farmer}
                    </p>
                  </div>
                  {farmer.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{farmer.rating}</span>
                  </div>
                  {farmer?.distance && (
                    <span className="text-sm text-muted-foreground">
                      {farmer?.distance.toFixed(2)} km away
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">
                  {farmer.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{farmer.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex space-x-2">
                    <Button asChild className="flex-1 agri-button">
                      <Link to={`/marketplace/supplier/${farmer.id}`}>
                        View Farmer
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedFarmers.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No farmers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceCategory;
