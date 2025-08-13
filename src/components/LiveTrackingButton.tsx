import { useState } from "react";
import { MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LiveTracking } from "./LiveTracking";

export const LiveTrackingButton = () => {
  const [hasActiveOrder] = useState(true);
  const [orderId] = useState("ORD123456");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <MapPin className="h-4 w-4" />
          {hasActiveOrder && (
            <Badge 
              variant="default" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
            >
              <Truck className="h-3 w-3" />
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Live Order Tracking</SheetTitle>
          <SheetDescription>
            Track your order in real-time
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          {hasActiveOrder ? (
            <LiveTracking orderId={orderId} onClose={() => {}} />
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active orders to track</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};