import { useState, useEffect } from "react";
import { MapPin, Clock, CheckCircle, Truck, ChefHat, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import LocationTracker from "./LocationTracker";

interface LiveTrackingProps {
  orderId: string;
  onClose: () => void;
}

interface OrderStatus {
  id: string;
  status: 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'out_for_delivery' | 'delivered';
  estimatedTime: string;
  currentLocation?: string;
  deliveryPartner: {
    name: string;
    phone: string;
    rating: number;
    vehicle?: string;
  };
  restaurant: {
    name: string;
    address: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

export const LiveTracking = ({ orderId, onClose }: LiveTrackingProps) => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    id: orderId,
    status: 'preparing',
    estimatedTime: '25 mins',
    currentLocation: 'Green Bowl Cafe, MG Road',
    deliveryPartner: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      rating: 4.8,
      vehicle: 'Bike'
    },
    restaurant: {
      name: 'Green Bowl Cafe',
      address: 'MG Road, Bangalore'
    },
    items: [
      { name: 'Quinoa Power Bowl', quantity: 1, price: 285 },
      { name: 'Green Smoothie', quantity: 2, price: 180 }
    ],
    totalAmount: 465
  });

  const [progress, setProgress] = useState(25);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 5, 100);
        
        // Update status based on progress
        if (newProgress >= 90) {
          setOrderStatus(current => ({ ...current, status: 'delivered' }));
        } else if (newProgress >= 75) {
          setOrderStatus(current => ({ ...current, status: 'out_for_delivery', currentLocation: 'Near your location' }));
        } else if (newProgress >= 50) {
          setOrderStatus(current => ({ ...current, status: 'ready' }));
        } else if (newProgress >= 25) {
          setOrderStatus(current => ({ ...current, status: 'preparing' }));
        }
        
        return newProgress;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = (status: OrderStatus['status']) => {
    switch (status) {
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', label: 'Order Confirmed' };
      case 'preparing':
        return { icon: ChefHat, color: 'text-warning', bg: 'bg-warning/10', label: 'Preparing Food' };
      case 'ready':
        return { icon: Package, color: 'text-primary', bg: 'bg-primary/10', label: 'Ready for Pickup' };
      case 'picked_up':
        return { icon: Truck, color: 'text-accent', bg: 'bg-accent/10', label: 'Picked Up' };
      case 'out_for_delivery':
        return { icon: Truck, color: 'text-accent', bg: 'bg-accent/10', label: 'Out for Delivery' };
      case 'delivered':
        return { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', label: 'Delivered' };
      default:
        return { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Processing' };
    }
  };

  const statusInfo = getStatusInfo(orderStatus.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Tracking</h2>
          <p className="text-muted-foreground">Order #{orderId}</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className={`${statusInfo.bg} p-2 rounded-full`}>
              <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
            </div>
            <div>
              <span>{statusInfo.label}</span>
              <p className="text-sm font-normal text-muted-foreground">
                ETA: {orderStatus.estimatedTime}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{orderStatus.currentLocation}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Partner */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Delivery Partner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="font-semibold text-primary">
                  {orderStatus.deliveryPartner.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{orderStatus.deliveryPartner.name}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-muted-foreground">★</span>
                  <span className="text-sm text-muted-foreground">
                    {orderStatus.deliveryPartner.rating}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Call Partner
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Order Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { status: 'confirmed', time: '2 mins ago', completed: true },
              { status: 'preparing', time: 'Now', completed: orderStatus.status !== 'confirmed' },
              { status: 'ready', time: '15 mins', completed: ['ready', 'picked_up', 'out_for_delivery', 'delivered'].includes(orderStatus.status) },
              { status: 'out_for_delivery', time: '20 mins', completed: ['out_for_delivery', 'delivered'].includes(orderStatus.status) },
              { status: 'delivered', time: '25 mins', completed: orderStatus.status === 'delivered' }
            ].map((step, index) => {
              const stepInfo = getStatusInfo(step.status as OrderStatus['status']);
              const StepIcon = stepInfo.icon;
              
              return (
                <div key={step.status} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? stepInfo.bg : 'bg-muted'
                  }`}>
                    <StepIcon className={`h-4 w-4 ${
                      step.completed ? stepInfo.color : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? '' : 'text-muted-foreground'}`}>
                      {stepInfo.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Live Location Tracking */}
      <LocationTracker
        orderId={orderId}
        restaurantLocation={[77.5946, 12.9716]} // Bangalore coordinates
        deliveryPartner={{
          name: orderStatus.deliveryPartner.name,
          phone: orderStatus.deliveryPartner.phone,
          vehicle: orderStatus.deliveryPartner.vehicle || 'Bike',
          rating: orderStatus.deliveryPartner.rating,
          location: [77.5966, 12.9726] // Delivery partner coordinates
        }}
        onLocationUpdate={(location) => {
          console.log('User location updated:', location);
          // You can update order status with real location here
        }}
      />

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{orderStatus.restaurant.name}</span>
              <Badge variant="outline">Delivery</Badge>
            </div>
            
            {orderStatus.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
            
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{orderStatus.totalAmount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};