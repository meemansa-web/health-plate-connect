import { useState } from "react";
import { Leaf, Heart, Zap, Shield, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export const SmartFilters = () => {
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [healthScore, setHealthScore] = useState([70]);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState([45]);
  const [minRating, setMinRating] = useState([4.0]);

  const dietOptions = [
    { id: "vegetarian", label: "Vegetarian", icon: Leaf, color: "text-success" },
    { id: "vegan", label: "Vegan", icon: Heart, color: "text-success" },
    { id: "keto", label: "Keto", icon: Zap, color: "text-primary" },
    { id: "gluten-free", label: "Gluten Free", icon: Shield, color: "text-warning" },
    { id: "low-carb", label: "Low Carb", icon: Heart, color: "text-primary" },
    { id: "high-protein", label: "High Protein", icon: Zap, color: "text-accent" }
  ];

  const allergenOptions = [
    "Nuts", "Dairy", "Gluten", "Soy", "Eggs", "Fish", "Shellfish", "Sesame"
  ];

  const toggleDiet = (dietId: string) => {
    setSelectedDiets(prev => 
      prev.includes(dietId) 
        ? prev.filter(id => id !== dietId)
        : [...prev, dietId]
    );
  };

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev => 
      prev.includes(allergen) 
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-6">
      {/* Diet Preferences */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Leaf className="h-4 w-4" />
          <span>Diet Preferences</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {dietOptions.map((diet) => {
            const Icon = diet.icon;
            const isSelected = selectedDiets.includes(diet.id);
            return (
              <Button
                key={diet.id}
                variant={isSelected ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleDiet(diet.id)}
                className={`justify-start space-x-2 ${
                  isSelected 
                    ? "bg-white/20 text-white border-white/40" 
                    : "bg-white/5 text-white/80 border-white/20 hover:bg-white/10"
                }`}
              >
                <Icon className={`h-4 w-4 ${diet.color}`} />
                <span>{diet.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Allergen Exclusions */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>Exclude Allergens</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {allergenOptions.map((allergen) => {
            const isSelected = selectedAllergens.includes(allergen);
            return (
              <Button
                key={allergen}
                variant="outline"
                size="sm"
                onClick={() => toggleAllergen(allergen)}
                className={`text-xs ${
                  isSelected 
                    ? "bg-warning/20 text-white border-warning/40" 
                    : "bg-white/5 text-white/80 border-white/20 hover:bg-white/10"
                }`}
              >
                {allergen}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Health Score */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Heart className="h-4 w-4" />
          <span>Minimum Health Score: {healthScore[0]}%</span>
        </h3>
        <Slider
          value={healthScore}
          onValueChange={setHealthScore}
          max={100}
          min={0}
          step={5}
          className="w-full"
        />
      </div>

      {/* Delivery Time */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Max Delivery Time: {maxDeliveryTime[0]} min</span>
        </h3>
        <Slider
          value={maxDeliveryTime}
          onValueChange={setMaxDeliveryTime}
          max={90}
          min={15}
          step={5}
          className="w-full"
        />
      </div>

      {/* Minimum Rating */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Star className="h-4 w-4" />
          <span>Minimum Rating: {minRating[0].toFixed(1)} ⭐</span>
        </h3>
        <Slider
          value={minRating}
          onValueChange={setMinRating}
          max={5}
          min={3}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Active Filters Summary */}
      {(selectedDiets.length > 0 || selectedAllergens.length > 0) && (
        <div>
          <h4 className="text-white font-medium mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedDiets.map((diet) => (
              <Badge key={diet} variant="secondary" className="bg-white/20 text-white">
                {dietOptions.find(d => d.id === diet)?.label}
              </Badge>
            ))}
            {selectedAllergens.map((allergen) => (
              <Badge key={allergen} variant="destructive" className="bg-warning/20 text-white">
                No {allergen}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button 
          className="flex-1 bg-white text-primary hover:bg-white/90"
          onClick={() => console.log('Apply filters')}
        >
          Apply Filters
        </Button>
        <Button 
          variant="outline"
          className="bg-white/5 text-white border-white/20 hover:bg-white/10"
          onClick={() => {
            setSelectedDiets([]);
            setSelectedAllergens([]);
            setHealthScore([70]);
            setMaxDeliveryTime([45]);
            setMinRating([4.0]);
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};