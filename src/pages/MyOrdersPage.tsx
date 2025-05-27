
import { useState } from "react";
import { Search, Filter, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  date: string;
  status: "delivered" | "pending" | "cancelled" | "processing";
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

const orders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    items: [
      { name: "Fresh Chicken Breast", quantity: 2, price: 280 },
      { name: "Mutton Curry Cut", quantity: 1, price: 650 }
    ],
    total: 1210
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "processing",
    items: [
      { name: "Fresh Prawns", quantity: 1, price: 420 },
      { name: "Chicken Wings", quantity: 2, price: 240 }
    ],
    total: 900
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "cancelled",
    items: [
      { name: "Fish Curry Cut", quantity: 1, price: 380 }
    ],
    total: 430
  },
  {
    id: "ORD-004",
    date: "2024-01-01",
    status: "delivered",
    items: [
      { name: "Chicken Drumsticks", quantity: 3, price: 240 },
      { name: "Mutton Biryani Cut", quantity: 1, price: 680 }
    ],
    total: 1400
  }
];

const MyOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "pending":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <Badge variant="secondary" className="text-sm">
            {filteredOrders.length} order(s)
          </Badge>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders by ID or item name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold text-gray-800">{order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Ordered on {new Date(order.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {item.name} x {item.quantity}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">₹{order.total}</p>
                    <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to={`/order/${order.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    
                    {order.status === "delivered" && (
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No orders found</h2>
            <p className="text-gray-500 mb-8">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Start shopping to see your orders here"
              }
            </p>
            <Link to="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrdersPage;
