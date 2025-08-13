import { useState } from "react";
import { CreditCard, Smartphone, Wallet, Shield, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  isGroupOrder?: boolean;
  splitBetween?: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  available: boolean;
}

export const PaymentDialog = ({ 
  isOpen, 
  onClose, 
  orderTotal, 
  isGroupOrder = false, 
  splitBetween = 1 
}: PaymentDialogProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const { toast } = useToast();

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay',
      available: true
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'PhonePe, Google Pay, Paytm',
      available: true
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Paytm, MobiKwik, Freecharge',
      available: true
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Successful! 🎉",
      description: `Payment of ₹${isGroupOrder ? (orderTotal / splitBetween).toFixed(2) : orderTotal} completed successfully.`,
    });
    
    setIsProcessing(false);
    onClose();
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || value;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value.replace(/\D/g, ''));
    if (formatted.length <= 19) {
      setCardDetails(prev => ({ ...prev, number: formatted }));
    }
  };

  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.length >= 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}` : cleaned;
    if (formatted.length <= 5) {
      setCardDetails(prev => ({ ...prev, expiry: formatted }));
    }
  };

  const individualAmount = isGroupOrder ? orderTotal / splitBetween : orderTotal;
  const convenienceFee = Math.round(individualAmount * 0.02);
  const totalAmount = individualAmount + convenienceFee;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Secure Payment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Order Total</span>
                  <span>₹{orderTotal.toFixed(2)}</span>
                </div>
                
                {isGroupOrder && (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Split between {splitBetween} people</span>
                      <span>₹{individualAmount.toFixed(2)}</span>
                    </div>
                    <Separator />
                  </>
                )}
                
                <div className="flex justify-between text-sm">
                  <span>Your Share</span>
                  <span>₹{individualAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Convenience Fee</span>
                  <span>₹{convenienceFee}</span>
                </div>
                
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total to Pay</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                
                {isGroupOrder && (
                  <Badge variant="secondary" className="w-full justify-center">
                    Group Order - UPI Split Bill
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Choose Payment Method</Label>
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-colors ${
                    selectedMethod === method.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        selectedMethod === method.id ? 'bg-primary/20' : 'bg-muted'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Payment Details */}
          {selectedMethod === 'card' && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <Label className="text-base font-semibold">Card Details</Label>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails(prev => ({ 
                          ...prev, 
                          cvv: e.target.value.replace(/\D/g, '').slice(0, 4) 
                        }))}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails(prev => ({ 
                        ...prev, 
                        name: e.target.value.toUpperCase() 
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedMethod === 'upi' && (
            <Card>
              <CardContent className="p-4">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-muted rounded-lg mx-auto flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">QR Code</p>
                  </div>
                  <div>
                    <p className="font-medium">Scan QR Code</p>
                    <p className="text-sm text-muted-foreground">
                      Use any UPI app to scan and pay
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Or enter UPI ID</p>
                    <Input 
                      placeholder="yourname@paytm" 
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Badge */}
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your payment is secured with 256-bit SSL encryption</span>
          </div>

          {/* Pay Button */}
          <Button 
            onClick={handlePayment}
            className="w-full h-12 text-lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              `Pay ₹${totalAmount.toFixed(2)}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};