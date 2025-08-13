import { useState } from "react";
import { Clock, MapPin, Phone, Star, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LiveTracking } from "./LiveTracking";

interface Order {
  id: string;
  restaurantName: string;
  items: string[];
  total: number;
  status: 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  estimatedTime: string;
  deliveryPartner?: {
    name: string;
    phone: string;
    rating: number;
  };
  orderTime: string;
  isGroupOrder?: boolean;
  groupMembers?: number;
}

export const OrderStatus = () => {
  const [trackingOrder, setTrackingOrder] = useState<string | null>(null);
  
  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      restaurantName: "Green Bowl Cafe",
      items: ["Quinoa Power Bowl", "Green Smoothie x2"],
      total: 465,
      status: "preparing",
      estimatedTime: "20 mins",
      orderTime: "2:30 PM",
      deliveryPartner: {
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        rating: 4.8
      }
    },
    {
      id: "ORD-2024-002",
      restaurantName: "Mediterranean Delights",
      items: ["Greek Salad", "Hummus Bowl", "Pita Bread"],
      total: 680,
      status: "out_for_delivery",
      estimatedTime: "10 mins",
      orderTime: "1:45 PM",
      isGroupOrder: true,
      groupMembers: 3,
      deliveryPartner: {
        name: "Priya Sharma",
        phone: "+91 87654 32109",
        rating: 4.9
      }
    },
    {
      id: "ORD-2024-003",
      restaurantName: "Spice Garden",
      items: ["Dal Makhani", "Butter Naan x2", "Jeera Rice"],
      total: 520,
      status: "delivered",
      estimatedTime: "Delivered",
      orderTime: "12:15 PM",
      deliveryPartner: {
        name: "Amit Singh",
        phone: "+91 76543 21098",
        rating: 4.7
      }
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-purple-100 text-purple-800';
      case 'out_for_delivery':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Orders</h2>
          <p className="text-muted-foreground">Track your recent orders</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{order.restaurantName}</CardTitle>
                  <p className="text-sm text-muted-foreground">Order #{order.id.split('-')[2]}</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                  {order.isGroupOrder && (
                    <Badge variant="outline" className="ml-2">
                      Group Order ({order.groupMembers})
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Order Items */}
              <div>
                <p className="text-sm font-medium mb-1">Items:</p>
                <p className="text-sm text-muted-foreground">
                  {order.items.join(', ')}
                </p>
              </div>

              {/* Order Details */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{order.orderTime}</span>
                  </div>
                  {order.status !== 'delivered' && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>ETA: {order.estimatedTime}</span>
                    </div>
                  )}
                </div>
                <div className="font-semibold">
                  ₹{order.total}
                </div>
              </div>

              {/* Delivery Partner */}
              {order.deliveryPartner && order.status !== 'delivered' && (
                <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {order.deliveryPartner.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.deliveryPartner.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">
                          {order.deliveryPartner.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {order.status !== 'delivered' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setTrackingOrder(order.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Live Tracking
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                      <LiveTracking 
                        orderId={order.id} 
                        onClose={() => setTrackingOrder(null)} 
                      />
                    </DialogContent>
                  </Dialog>
                )}
                
                <Button variant="outline" size="sm" className="flex-1">
                  {order.status === 'delivered' ? 'Reorder' : 'Help'}
                </Button>
                
                {order.status === 'delivered' && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Rate Order
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No orders yet</h3>
                <p className="text-muted-foreground">Your order history will appear here</p>
              </div>
              <Button>
                Start Ordering
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};