import { Star, Clock, MapPin, Heart, AlertTriangle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    deliveryTime: string;
    image: string;
    healthScore: number;
    priceRange: string;
    tags: string[];
    allergens: string[];
    distance: string;
  };
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const getHealthScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getHealthScoreBg = (score: number) => {
    if (score >= 85) return "bg-success/10";
    if (score >= 70) return "bg-warning/10";
    return "bg-destructive/10";
  };

  return (
    <Card className="overflow-hidden hover-lift cursor-pointer shadow-card">
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Health Score Badge */}
        <div className={`absolute top-3 left-3 ${getHealthScoreBg(restaurant.healthScore)} px-2 py-1 rounded-full`}>
          <span className={`text-sm font-semibold ${getHealthScoreColor(restaurant.healthScore)}`}>
            {restaurant.healthScore}% Healthy
          </span>
        </div>
        
        {/* Heart Button */}
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
        
        {/* Allergen Warning */}
        {restaurant.allergens.length > 0 && (
          <div className="absolute bottom-3 left-3 bg-warning/90 text-white px-2 py-1 rounded-full flex items-center space-x-1">
            <AlertTriangle className="h-3 w-3" />
            <span className="text-xs font-medium">Allergens</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Restaurant Info */}
          <div>
            <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
            <p className="text-muted-foreground text-sm">{restaurant.cuisine}</p>
          </div>
          
          {/* Rating and Time */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{restaurant.rating}</span>
              <span className="text-muted-foreground">({Math.floor(Math.random() * 500) + 100})</span>
            </div>
            
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{restaurant.distance}</span>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {restaurant.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs">
              {restaurant.priceRange}
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button className="flex-1" size="sm" onClick={() => window.location.href = `/restaurant/${restaurant.id}`}>
              Order Now
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Group</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};