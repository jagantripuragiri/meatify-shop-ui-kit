
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  weight: string;
  isNew?: boolean;
}

const ProductCard = ({ id, name, image, price, originalPrice, rating, weight, isNew }: ProductCardProps) => {
  return (
    <Card className="hover-scale cursor-pointer overflow-hidden group relative">
      {isNew && (
        <Badge className="absolute top-2 left-2 z-10 bg-green-500">
          New
        </Badge>
      )}
      
      <Link to={`/product/${id}`}>
        <div className="relative h-48 bg-gray-50">
          <img
            src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=400&q=80`}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{rating}</span>
        </div>

        <p className="text-sm text-gray-600 mt-1">{weight}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
            )}
          </div>
          
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
