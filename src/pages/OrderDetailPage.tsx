
import { ChevronLeft, Package, MapPin, Phone, CheckCircle, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const OrderDetailPage = () => {
  const order = {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    deliveredDate: "2024-01-16",
    items: [
      {
        id: "1",
        name: "Fresh Chicken Breast",
        image: "photo-1466721591366-2d5fba72006d",
        quantity: 2,
        price: 280,
        weight: "500g"
      },
      {
        id: "2",
        name: "Mutton Curry Cut",
        image: "photo-1465379944081-7f47de8d74ac",
        quantity: 1,
        price: 650,
        weight: "1kg"
      }
    ],
    subtotal: 1210,
    deliveryFee: 50,
    total: 1260,
    deliveryAddress: {
      name: "John Doe",
      phone: "+91 9876543210",
      address: "123 Main Street, Apartment 4B, Mumbai, 400001"
    },
    paymentMethod: "Credit Card",
    trackingSteps: [
      { title: "Order Placed", time: "Jan 15, 2024 - 2:30 PM", completed: true },
      { title: "Order Confirmed", time: "Jan 15, 2024 - 2:45 PM", completed: true },
      { title: "Preparing Your Order", time: "Jan 15, 2024 - 3:00 PM", completed: true },
      { title: "Out for Delivery", time: "Jan 16, 2024 - 10:00 AM", completed: true },
      { title: "Delivered", time: "Jan 16, 2024 - 11:30 AM", completed: true }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/orders">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Orders
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order {order.id}</h1>
            <p className="text-gray-600">
              Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Tracking */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order Tracking
              </h3>
              
              <div className="space-y-4">
                {order.trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-500" : "bg-gray-200"
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        step.completed ? "text-gray-800" : "text-gray-500"
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Items</h3>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=100&q=80`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.weight}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{item.price * item.quantity}</p>
                      <p className="text-sm text-gray-600">₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Delivery Address */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Delivery Address
              </h3>
              
              <div className="space-y-2">
                <p className="font-medium text-gray-800">{order.deliveryAddress.name}</p>
                <p className="text-gray-600">{order.deliveryAddress.address}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{order.deliveryAddress.phone}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Delivered
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{order.subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">₹{order.deliveryFee}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span className="text-primary">₹{order.total}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium">{order.paymentMethod}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivered On</span>
                    <span className="font-medium">
                      {new Date(order.deliveredDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Reorder Items
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Invoice
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailPage;
