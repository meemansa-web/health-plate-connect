import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Map from './Map';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface DeliveryPartner {
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  location: [number, number];
}

interface LocationTrackerProps {
  orderId: string;
  restaurantLocation?: [number, number];
  deliveryPartner?: DeliveryPartner;
  onLocationUpdate?: (location: LocationData) => void;
}

const LocationTracker = ({ 
  orderId, 
  restaurantLocation = [-74.0066, 40.7135], // Default NYC coordinates
  deliveryPartner,
  onLocationUpdate 
}: LocationTrackerProps) => {
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  const startTracking = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      toast({
        title: "Location Error",
        description: "Your browser doesn't support location tracking",
        variant: "destructive",
      });
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // Cache location for 1 minute
    };

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      const location: [number, number] = [longitude, latitude];
      
      setUserLocation(location);
      setLocationError('');
      
      const locationData: LocationData = {
        latitude,
        longitude,
        accuracy,
        timestamp: Date.now()
      };
      
      onLocationUpdate?.(locationData);
      
      if (!isTracking) {
        toast({
          title: "Location Found",
          description: `Your location has been updated (±${Math.round(accuracy)}m accuracy)`,
        });
      }
    };

    const error = (err: GeolocationPositionError) => {
      let message = 'Unable to retrieve your location';
      
      switch (err.code) {
        case err.PERMISSION_DENIED:
          message = 'Location access denied. Please enable location permissions.';
          break;
        case err.POSITION_UNAVAILABLE:
          message = 'Location information is unavailable.';
          break;
        case err.TIMEOUT:
          message = 'Location request timed out.';
          break;
      }
      
      setLocationError(message);
      toast({
        title: "Location Error",
        description: message,
        variant: "destructive",
      });
    };

    if (isTracking) {
      // Start continuous tracking
      const id = navigator.geolocation.watchPosition(success, error, options);
      setWatchId(id);
    } else {
      // Get current position once
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };

  const stopTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
    toast({
      title: "Tracking Stopped",
      description: "Location tracking has been disabled",
    });
  };

  const toggleTracking = () => {
    if (isTracking) {
      stopTracking();
    } else {
      setIsTracking(true);
      startTracking();
    }
  };

  useEffect(() => {
    // Get initial location
    startTracking();
    
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (isTracking && !watchId) {
      startTracking();
    }
  }, [isTracking]);

  return (
    <div className="space-y-6">
      {/* Location Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Live Location Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={isTracking ? "default" : "secondary"}>
                {isTracking ? "Active" : "Inactive"}
              </Badge>
              {userLocation && (
                <span className="text-sm text-muted-foreground">
                  Location updated
                </span>
              )}
            </div>
            <Button 
              onClick={toggleTracking}
              variant={isTracking ? "destructive" : "default"}
              size="sm"
            >
              {isTracking ? "Stop Tracking" : "Start Tracking"}
            </Button>
          </div>
          
          {locationError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{locationError}</p>
            </div>
          )}
          
          {userLocation && (
            <div className="text-sm text-muted-foreground">
              <p>Your coordinates: {userLocation[1].toFixed(6)}, {userLocation[0].toFixed(6)}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivery Partner Info */}
      {deliveryPartner && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Partner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{deliveryPartner.name}</p>
                <p className="text-sm text-muted-foreground">{deliveryPartner.vehicle}</p>
                <p className="text-sm">⭐ {deliveryPartner.rating}/5</p>
              </div>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map */}
      <Card>
        <CardContent className="p-0">
          <Map
            userLocation={userLocation}
            restaurantLocation={restaurantLocation}
            deliveryLocation={deliveryPartner?.location}
            showRoute={true}
            className="w-full h-96 rounded-b-lg"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationTracker;