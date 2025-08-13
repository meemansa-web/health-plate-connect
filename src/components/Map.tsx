import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

interface MapProps {
  deliveryLocation?: [number, number];
  userLocation?: [number, number];
  restaurantLocation?: [number, number];
  showRoute?: boolean;
  className?: string;
}

const Map = ({ 
  deliveryLocation, 
  userLocation, 
  restaurantLocation, 
  showRoute = false,
  className = "w-full h-96"
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenSet, setIsTokenSet] = useState<boolean>(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 12,
      center: userLocation || [-74.0066, 40.7135], // Default to NYC
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for different locations
    if (userLocation) {
      new mapboxgl.Marker({ color: '#3B82F6' })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><strong>Your Location</strong></div>'))
        .addTo(map.current);
    }

    if (restaurantLocation) {
      new mapboxgl.Marker({ color: '#EF4444' })
        .setLngLat(restaurantLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><strong>Restaurant</strong></div>'))
        .addTo(map.current);
    }

    if (deliveryLocation) {
      new mapboxgl.Marker({ color: '#10B981' })
        .setLngLat(deliveryLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><strong>Delivery Partner</strong></div>'))
        .addTo(map.current);
    }

    // Fit map to show all markers
    if (userLocation || restaurantLocation || deliveryLocation) {
      const bounds = new mapboxgl.LngLatBounds();
      
      if (userLocation) bounds.extend(userLocation);
      if (restaurantLocation) bounds.extend(restaurantLocation);
      if (deliveryLocation) bounds.extend(deliveryLocation);
      
      map.current.fitBounds(bounds, { padding: 50 });
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isTokenSet) {
    return (
      <Card className={`${className} flex items-center justify-center p-6`}>
        <div className="text-center space-y-4 max-w-md">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Setup Mapbox</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please enter your Mapbox public token to enable the map. 
              Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
            </p>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Enter Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              type="password"
            />
            <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
              Initialize Map
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
    </div>
  );
};

export default Map;