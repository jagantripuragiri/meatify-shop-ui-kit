
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  itemCount: number;
  link: string;
}

const CategoryCard = ({ title, image, itemCount, link }: CategoryCardProps) => {
  return (
    <Link to={link}>
      <Card className="hover-scale cursor-pointer overflow-hidden group">
        <div className="relative h-40 bg-gradient-to-br from-orange-100 to-green-100">
          <img
            src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=400&q=80`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{itemCount} items</p>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
