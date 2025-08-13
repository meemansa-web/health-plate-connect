import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
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
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>('');
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);

  const initializeMap = async (apiKey: string) => {
    if (!mapContainer.current) return;

    try {
      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places']
      });

      const { Map } = await loader.importLibrary('maps');
      const { AdvancedMarkerElement } = await loader.importLibrary('marker');

      // Initialize map
      map.current = new Map(mapContainer.current, {
        zoom: 12,
        center: userLocation ? { lat: userLocation[1], lng: userLocation[0] } : { lat: 40.7135, lng: -74.0066 }, // Default to NYC
        mapId: 'DEMO_MAP_ID',
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Clear existing markers
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];

      // Add markers for different locations
      if (userLocation) {
        const userMarker = new google.maps.Marker({
          position: { lat: userLocation[1], lng: userLocation[0] },
          map: map.current,
          title: 'Your Location',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#3B82F6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8,
          }
        });

        const userInfoWindow = new google.maps.InfoWindow({
          content: '<div class="p-2 font-medium">Your Location</div>'
        });

        userMarker.addListener('click', () => {
          userInfoWindow.open(map.current, userMarker);
        });

        markers.current.push(userMarker);
      }

      if (restaurantLocation) {
        const restaurantMarker = new google.maps.Marker({
          position: { lat: restaurantLocation[1], lng: restaurantLocation[0] },
          map: map.current,
          title: 'Restaurant',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#EF4444',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8,
          }
        });

        const restaurantInfoWindow = new google.maps.InfoWindow({
          content: '<div class="p-2 font-medium">Restaurant</div>'
        });

        restaurantMarker.addListener('click', () => {
          restaurantInfoWindow.open(map.current, restaurantMarker);
        });

        markers.current.push(restaurantMarker);
      }

      if (deliveryLocation) {
        const deliveryMarker = new google.maps.Marker({
          position: { lat: deliveryLocation[1], lng: deliveryLocation[0] },
          map: map.current,
          title: 'Delivery Partner',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#10B981',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8,
          }
        });

        const deliveryInfoWindow = new google.maps.InfoWindow({
          content: '<div class="p-2 font-medium">Delivery Partner</div>'
        });

        deliveryMarker.addListener('click', () => {
          deliveryInfoWindow.open(map.current, deliveryMarker);
        });

        markers.current.push(deliveryMarker);
      }

      // Fit map to show all markers
      if (markers.current.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.current.forEach(marker => {
          const position = marker.getPosition();
          if (position) {
            bounds.extend(position);
          }
        });
        map.current.fitBounds(bounds);
        
        // Ensure minimum zoom level
        const listener = google.maps.event.addListener(map.current, 'idle', () => {
          if (map.current!.getZoom()! > 15) map.current!.setZoom(15);
          google.maps.event.removeListener(listener);
        });
      }

      // Add route if requested
      if (showRoute && userLocation && restaurantLocation) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: '#3B82F6',
            strokeWeight: 4,
            strokeOpacity: 0.8,
          },
          suppressMarkers: true, // We already have custom markers
        });

        directionsRenderer.setMap(map.current);

        directionsService.route({
          origin: { lat: userLocation[1], lng: userLocation[0] },
          destination: { lat: restaurantLocation[1], lng: restaurantLocation[0] },
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === 'OK' && result) {
            directionsRenderer.setDirections(result);
          }
        });
      }

    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  };

  const handleApiKeySubmit = () => {
    if (googleMapsApiKey.trim()) {
      setIsApiKeySet(true);
      initializeMap(googleMapsApiKey.trim());
    }
  };

  useEffect(() => {
    return () => {
      // Clean up markers
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];
    };
  }, []);

  if (!isApiKeySet) {
    return (
      <Card className={`${className} flex items-center justify-center p-6`}>
        <div className="text-center space-y-4 max-w-md">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Setup Google Maps</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please enter your Google Maps API key to enable the map. 
              Get your API key from <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a>
            </p>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Enter Google Maps API key..."
              value={googleMapsApiKey}
              onChange={(e) => setGoogleMapsApiKey(e.target.value)}
              type="password"
            />
            <Button onClick={handleApiKeySubmit} disabled={!googleMapsApiKey.trim()}>
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