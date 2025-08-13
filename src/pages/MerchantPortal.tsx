import { useState } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  Star, 
  Clock, 
  DollarSign,
  Users,
  Package,
  Settings,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const MerchantPortal = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: "1",
      name: "Mediterranean Quinoa Bowl",
      description: "Fresh quinoa with grilled vegetables, hummus, and tahini dressing",
      price: 450,
      category: "Healthy Bowls",
      isAvailable: true,
      healthScore: 92,
      allergens: ["sesame", "nuts"],
      dietTags: ["vegetarian", "gluten-free", "high-protein"],
      ingredients: ["quinoa", "cucumber", "tomatoes", "hummus", "tahini", "olive oil"]
    },
    {
      id: "2", 
      name: "Grilled Chicken Salad",
      description: "Organic greens with herb-crusted chicken breast and balsamic vinaigrette",
      price: 380,
      category: "Salads",
      isAvailable: true,
      healthScore: 88,
      allergens: ["dairy"],
      dietTags: ["high-protein", "low-carb"],
      ingredients: ["chicken breast", "mixed greens", "cherry tomatoes", "balsamic vinegar"]
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    allergens: [],
    dietTags: [],
    ingredients: []
  });

  const restaurantStats = {
    todayOrders: 47,
    revenue: 18900,
    rating: 4.7,
    avgPrepTime: 22
  };

  const allergenOptions = [
    "nuts", "dairy", "gluten", "soy", "eggs", "fish", "shellfish", "sesame"
  ];

  const dietOptions = [
    "vegetarian", "vegan", "gluten-free", "keto", "low-carb", "high-protein"
  ];

  const toggleAllergen = (allergen: string) => {
    setNewItem(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const toggleDietTag = (tag: string) => {
    setNewItem(prev => ({
      ...prev,
      dietTags: prev.dietTags.includes(tag)
        ? prev.dietTags.filter(t => t !== tag)
        : [...prev.dietTags, tag]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Merchant Portal</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Online
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{restaurantStats.todayOrders}</p>
              <p className="text-sm text-muted-foreground">Today's Orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="bg-success/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <p className="text-2xl font-bold">₹{restaurantStats.revenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Today's Revenue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <p className="text-2xl font-bold">{restaurantStats.rating}</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="bg-warning/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <p className="text-2xl font-bold">{restaurantStats.avgPrepTime}min</p>
              <p className="text-sm text-muted-foreground">Avg Prep Time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="orders">Live Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Restaurant Settings</TabsTrigger>
          </TabsList>

          {/* Menu Management */}
          <TabsContent value="menu" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Menu Items</h2>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Menu Item</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Item Name</Label>
                      <Input
                        id="name"
                        value={newItem.name}
                        onChange={(e) => setNewItem(prev => ({...prev, name: e.target.value}))}
                        placeholder="Mediterranean Quinoa Bowl"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({...prev, description: e.target.value}))}
                        placeholder="Fresh quinoa with grilled vegetables..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newItem.price}
                          onChange={(e) => setNewItem(prev => ({...prev, price: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={newItem.category}
                          onChange={(e) => setNewItem(prev => ({...prev, category: e.target.value}))}
                          placeholder="Healthy Bowls"
                        />
                      </div>
                    </div>
                    
                    {/* Allergen Selection */}
                    <div>
                      <Label>Allergens (Select all that apply)</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {allergenOptions.map((allergen) => (
                          <div key={allergen} className="flex items-center space-x-2">
                            <Checkbox
                              checked={newItem.allergens.includes(allergen)}
                              onCheckedChange={() => toggleAllergen(allergen)}
                            />
                            <label className="text-sm capitalize">{allergen}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Diet Tags */}
                    <div>
                      <Label>Diet Tags</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {dietOptions.map((tag) => (
                          <div key={tag} className="flex items-center space-x-2">
                            <Checkbox
                              checked={newItem.dietTags.includes(tag)}
                              onCheckedChange={() => toggleDietTag(tag)}
                            />
                            <label className="text-sm capitalize">{tag.replace('-', ' ')}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full">Add Item to Menu</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4">
              {menuItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <Badge variant={item.healthScore >= 85 ? "default" : "secondary"} className="text-success">
                            {item.healthScore}% Healthy
                          </Badge>
                          <Switch checked={item.isAvailable} />
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{item.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">₹{item.price}</Badge>
                          <Badge variant="secondary">{item.category}</Badge>
                          {item.dietTags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-success">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {item.allergens.length > 0 && (
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            <span className="text-sm text-warning">
                              Contains: {item.allergens.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Orders */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Live Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Live order management interface would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Restaurant configuration settings would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MerchantPortal;