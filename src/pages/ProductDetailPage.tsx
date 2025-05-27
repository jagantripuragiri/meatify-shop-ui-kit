
import { useState } from "react";
import { ChevronRight, Star, Plus, Minus, Heart, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: "1",
    name: "Fresh Chicken Breast",
    images: [
      "photo-1466721591366-2d5fba72006d",
      "photo-1618160702438-9b02ab6515c9",
      "photo-1535268647677-300dbf3d78d1"
    ],
    price: 280,
    originalPrice: 320,
    rating: 4.5,
    reviewCount: 128,
    weight: "500g",
    description: "Premium quality fresh chicken breast, sourced from trusted farms. Perfect for grilling, roasting, or making healthy meals.",
    nutritionalInfo: {
      calories: "165 per 100g",
      protein: "31g",
      fat: "3.6g",
      carbs: "0g"
    },
    deliveryTime: "30-45 mins"
  };

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent quality! Very fresh and tender.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Priya Singh",
      rating: 4,
      comment: "Good quality meat, delivered on time.",
      date: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-6">
          <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/category/chicken" className="text-gray-600 hover:text-primary">Chicken</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={`https://images.unsplash.com/${product.images[selectedImage]}?auto=format&fit=crop&w=600&q=80`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-gray-200"
                  }`}
                >
                  <img
                    src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=100&q=80`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-600 ml-2">({product.reviewCount} reviews)</span>
                </div>
                <Badge variant="secondary">{product.weight}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                <Badge className="bg-green-100 text-green-800">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              </div>
              <p className="text-sm text-gray-600">Price per {product.weight}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Delivery:</span> {product.deliveryTime}
            </div>

            <div className="flex space-x-4">
              <Button size="lg" className="flex-1 bg-orange-500 hover:bg-orange-600">
                <Plus className="w-5 h-5 mr-2" />
                Add to Cart - ₹{product.price * quantity}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="p-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </TabsContent>
            
            <TabsContent value="nutrition" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{product.nutritionalInfo.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{product.nutritionalInfo.protein}</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{product.nutritionalInfo.fat}</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{product.nutritionalInfo.carbs}</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6 space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default ProductDetailPage;
