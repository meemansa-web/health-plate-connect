import { useState } from "react";
import { Search, MapPin, Filter, Users, Clock, Star, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-food.jpg";
import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SmartFilters } from "@/components/SmartFilters";
import { GroupOrderButton } from "@/components/GroupOrderButton";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [showFilters, setShowFilters] = useState(false);

  const featuredRestaurants = [
    {
      id: "1",
      name: "Green Bowl Cafe",
      cuisine: "Healthy, Salads",
      rating: 4.8,
      deliveryTime: "25-30 min",
      image: restaurant1,
      healthScore: 95,
      priceRange: "₹₹",
      tags: ["Vegan Friendly", "Gluten Free Options"],
      allergens: ["nuts", "dairy"],
      distance: "0.8 km"
    },
    {
      id: "2", 
      name: "Spice Garden",
      cuisine: "Indian, North Indian",
      rating: 4.6,
      deliveryTime: "35-40 min",
      image: restaurant2,
      healthScore: 78,
      priceRange: "₹₹₹",
      tags: ["Popular", "Family Friendly"],
      allergens: ["dairy", "gluten"],
      distance: "1.2 km"
    },
    {
      id: "3",
      name: "Mediterranean Delights",
      cuisine: "Mediterranean, Healthy",
      rating: 4.7,
      deliveryTime: "20-25 min", 
      image: restaurant3,
      healthScore: 88,
      priceRange: "₹₹₹",
      tags: ["Heart Healthy", "Low Carb"],
      allergens: ["nuts"],
      distance: "0.5 km"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">HealthPlate</h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <GroupOrderButton />
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover
                <span className="block text-accent">Healthy Food</span>
                Near You
              </h2>
              <p className="text-xl text-white/90 max-w-lg">
                Smart diet filters, allergen warnings, and group ordering made simple.
                Your health-conscious food journey starts here.
              </p>
              
              {/* Search Bar */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-4">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                    <Input
                      placeholder="Search restaurants, cuisines..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                  </div>
                  <Button 
                    variant="secondary"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                
                {showFilters && (
                  <SmartFilters />
                )}
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroImage}
                alt="Healthy food dishes"
                className="rounded-2xl shadow-2xl hover-lift"
              />
              <div className="absolute -bottom-4 -right-4 bg-success text-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span className="font-semibold">Health First</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Delivery</h3>
              <p className="text-sm text-muted-foreground">Order food</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Dine-In</h3>
              <p className="text-sm text-muted-foreground">Book table</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="bg-success/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold">Waitless</h3>
              <p className="text-sm text-muted-foreground">Skip queues</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="bg-warning/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold">Health</h3>
              <p className="text-sm text-muted-foreground">Diet filters</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Restaurants</h2>
            <p className="text-muted-foreground">Discover top-rated healthy options near you</p>
          </div>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Health Focus Section */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Health, Our Priority</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced allergen detection, nutritional information, and smart diet filters
              to help you make informed food choices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Allergen Alerts</h3>
              <p className="text-muted-foreground">
                Automatic warnings for your dietary restrictions and allergies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Scores</h3>
              <p className="text-muted-foreground">
                Nutritional ratings to help you choose healthier options.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Filters</h3>
              <p className="text-muted-foreground">
                Filter by diet type, calories, ingredients, and more.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;