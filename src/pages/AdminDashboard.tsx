import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  Store, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  const platformStats = {
    totalUsers: 45670,
    activeRestaurants: 1250,
    todayOrders: 8940,
    totalRevenue: 2450000,
    healthScore: 78,
    userGrowth: 12.5,
    restaurantGrowth: 8.2,
    revenueGrowth: 15.3
  };

  const recentAlerts = [
    {
      id: "1",
      type: "allergen",
      message: "New allergen report: Spice Garden - undisclosed nuts in 'Chicken Curry'",
      severity: "high",
      timestamp: "2 minutes ago"
    },
    {
      id: "2", 
      type: "quality",
      message: "Health score below threshold: Urban Bites (65%)",
      severity: "medium",
      timestamp: "15 minutes ago"
    },
    {
      id: "3",
      type: "system",
      message: "Payment gateway experiencing minor delays",
      severity: "low",
      timestamp: "1 hour ago"
    }
  ];

  const topRestaurants = [
    { name: "Green Bowl Cafe", orders: 245, rating: 4.8, healthScore: 95 },
    { name: "Mediterranean Delights", orders: 198, rating: 4.7, healthScore: 88 },
    { name: "Spice Garden", orders: 167, rating: 4.6, healthScore: 78 },
    { name: "Healthy Bites", orders: 143, rating: 4.5, healthScore: 92 },
    { name: "Fresh & Fast", orders: 128, rating: 4.4, healthScore: 85 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive bg-destructive/10";
      case "medium": return "text-warning bg-warning/10";
      default: return "text-primary bg-primary/10";
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "allergen": return AlertTriangle;
      case "quality": return Shield;
      default: return CheckCircle;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">HealthPlate Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                All Systems Operational
              </Badge>
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                View Live Site
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{platformStats.userGrowth}% this month
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Restaurants</p>
                  <p className="text-2xl font-bold">{platformStats.activeRestaurants.toLocaleString()}</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{platformStats.restaurantGrowth}% this month
                  </p>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <Store className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Orders</p>
                  <p className="text-2xl font-bold">{platformStats.todayOrders.toLocaleString()}</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{platformStats.revenueGrowth}% vs yesterday
                  </p>
                </div>
                <div className="bg-success/10 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{(platformStats.totalRevenue / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{platformStats.revenueGrowth}% this month
                  </p>
                </div>
                <div className="bg-warning/10 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="health">Health Monitoring</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Platform Health Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-success" />
                      <span>Platform Health Score</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Health Score</span>
                        <span className="text-2xl font-bold text-success">{platformStats.healthScore}%</span>
                      </div>
                      <Progress value={platformStats.healthScore} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Average health score across all restaurants. Target: 85%
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performing Restaurants */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Restaurants (Today)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topRestaurants.map((restaurant, index) => (
                        <div key={restaurant.name} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold">{restaurant.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {restaurant.orders} orders • ⭐ {restaurant.rating}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            variant={restaurant.healthScore >= 85 ? "default" : "secondary"}
                            className="text-success"
                          >
                            {restaurant.healthScore}% Health
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="restaurants">
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurant Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Restaurant management interface would go here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">User management interface would go here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="health">
                <Card>
                  <CardHeader>
                    <CardTitle>Health & Safety Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Health monitoring dashboard would go here...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <span>Recent Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => {
                    const SeverityIcon = getSeverityIcon(alert.type);
                    return (
                      <div key={alert.id} className="flex space-x-3 p-3 border rounded-lg">
                        <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                          <SeverityIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {alert.timestamp}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Store className="h-4 w-4 mr-2" />
                  Add New Restaurant
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Send Health Alert
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Safety Audit
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Health</span>
                  <Badge variant="secondary" className="text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="secondary" className="text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Gateway</span>
                  <Badge variant="secondary" className="text-warning">
                    <Clock className="h-3 w-3 mr-1" />
                    Minor Delays
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">CDN</span>
                  <Badge variant="secondary" className="text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Operational
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;