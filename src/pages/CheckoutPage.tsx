
import { useState } from "react";
import { Check, MapPin, CreditCard, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const cartItems = [
    { name: "Fresh Chicken Breast", quantity: 2, price: 280 },
    { name: "Mutton Curry Cut", quantity: 1, price: 650 },
    { name: "Fresh Prawns", quantity: 1, price: 420 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const steps = [
    { id: 1, title: "Address", icon: MapPin },
    { id: 2, title: "Payment", icon: CreditCard },
    { id: 3, title: "Review", icon: Check }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 ${
                currentStep >= step.id ? "text-primary font-medium" : "text-gray-500"
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-px mx-4 ${
                  currentStep > step.id ? "bg-primary" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Delivery Address</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter full address" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Enter city" />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="Enter pincode" />
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="mt-6" 
                  onClick={() => setCurrentStep(2)}
                >
                  Continue to Payment
                </Button>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Method</h3>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1">UPI Payment</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1">Cash on Delivery</Label>
                      <Truck className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Review Order
                  </Button>
                </div>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Review Order</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Delivery Address</h4>
                    <p className="text-sm text-gray-600">
                      John Doe<br />
                      123 Main Street, Apartment 4B<br />
                      Mumbai, 400001<br />
                      +91 9876543210
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Payment Method</h4>
                    <p className="text-sm text-gray-600">
                      {paymentMethod === "card" && "Credit/Debit Card"}
                      {paymentMethod === "upi" && "UPI Payment"}
                      {paymentMethod === "cod" && "Cash on Delivery"}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Place Order
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">₹{deliveryFee}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
