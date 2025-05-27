
import { useState } from "react";
import { ChevronRight, Filter, Grid, List } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

const products = [
  {
    id: "1",
    name: "Fresh Chicken Breast",
    image: "photo-1466721591366-2d5fba72006d",
    price: 280,
    originalPrice: 320,
    rating: 4.5,
    weight: "500g",
    isNew: true
  },
  {
    id: "2",
    name: "Chicken Curry Cut",
    image: "photo-1618160702438-9b02ab6515c9",
    price: 260,
    rating: 4.3,
    weight: "1kg"
  },
  {
    id: "3",
    name: "Chicken Drumsticks",
    image: "photo-1466721591366-2d5fba72006d",
    price: 240,
    rating: 4.4,
    weight: "500g"
  },
  {
    id: "4",
    name: "Boneless Chicken",
    image: "photo-1618160702438-9b02ab6515c9",
    price: 350,
    originalPrice: 380,
    rating: 4.6,
    weight: "500g"
  },
  {
    id: "5",
    name: "Chicken Wings",
    image: "photo-1466721591366-2d5fba72006d",
    price: 220,
    rating: 4.2,
    weight: "500g"
  },
  {
    id: "6",
    name: "Whole Chicken",
    image: "photo-1618160702438-9b02ab6515c9",
    price: 400,
    rating: 4.5,
    weight: "1.5kg"
  }
];

const CategoryPage = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-6">
          <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-800 font-medium">Chicken</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>

              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Weight</h4>
                {["500g", "1kg", "1.5kg", "2kg"].map((weight) => (
                  <div key={weight} className="flex items-center space-x-2">
                    <Checkbox id={weight} />
                    <label htmlFor={weight} className="text-sm text-gray-600">{weight}</label>
                  </div>
                ))}
              </div>

              {/* Type */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Type</h4>
                {["Boneless", "Curry Cut", "Whole", "Wings"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={type} />
                    <label htmlFor={type} className="text-sm text-gray-600">{type}</label>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Chicken Products</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
