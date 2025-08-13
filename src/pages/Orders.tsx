import { OrderStatus } from "@/components/OrderStatus";

const Orders = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">HealthPlate</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Orders Content */}
      <div className="container mx-auto px-4 py-8">
        <OrderStatus />
      </div>
    </div>
  );
};

export default Orders;