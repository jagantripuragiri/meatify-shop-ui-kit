
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: 1,
    title: "Fresh Chicken",
    subtitle: "Farm Fresh & Premium Quality",
    discount: "Up to 30% OFF",
    image: "photo-1466721591366-2d5fba72006d",
    bgColor: "from-green-400 to-green-600"
  },
  {
    id: 2,
    title: "Premium Mutton",
    subtitle: "Tender & Juicy Cuts",
    discount: "Special Offer 25% OFF",
    image: "photo-1465379944081-7f47de8d74ac",
    bgColor: "from-orange-400 to-red-500"
  },
  {
    id: 3,
    title: "Fresh Seafood",
    subtitle: "Ocean Fresh Daily",
    discount: "Buy 2 Get 1 Free",
    image: "photo-1535268647677-300dbf3d78d1",
    bgColor: "from-blue-400 to-blue-600"
  }
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ${
            index === currentSlide ? "translate-x-0" : 
            index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`w-full h-full bg-gradient-to-r ${banner.bgColor} flex items-center`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                <p className="text-lg mb-3">{banner.subtitle}</p>
                <div className="text-xl font-semibold bg-white text-primary px-4 py-2 rounded-lg inline-block">
                  {banner.discount}
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src={`https://images.unsplash.com/${banner.image}?auto=format&fit=crop&w=400&q=80`}
                  alt={banner.title}
                  className="w-64 h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
