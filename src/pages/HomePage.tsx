
import Navbar from "@/components/Navbar";
import BannerSlider from "@/components/BannerSlider";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";

const categories = [
  {
    title: "Chicken",
    image: "photo-1466721591366-2d5fba72006d",
    itemCount: 25,
    link: "/category/chicken"
  },
  {
    title: "Mutton",
    image: "photo-1465379944081-7f47de8d74ac",
    itemCount: 18,
    link: "/category/mutton"
  },
  {
    title: "Seafood",
    image: "photo-1535268647677-300dbf3d78d1",
    itemCount: 32,
    link: "/category/seafood"
  },
  {
    title: "Ready to Cook",
    image: "photo-1618160702438-9b02ab6515c9",
    itemCount: 15,
    link: "/category/ready-to-cook"
  }
];

const featuredProducts = [
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
    name: "Mutton Curry Cut",
    image: "photo-1465379944081-7f47de8d74ac",
    price: 650,
    rating: 4.3,
    weight: "1kg"
  },
  {
    id: "3",
    name: "Fresh Prawns",
    image: "photo-1535268647677-300dbf3d78d1",
    price: 420,
    originalPrice: 480,
    rating: 4.7,
    weight: "500g"
  },
  {
    id: "4",
    name: "Chicken Wings",
    image: "photo-1618160702438-9b02ab6515c9",
    price: 240,
    rating: 4.4,
    weight: "500g",
    isNew: true
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Banner Slider */}
        <BannerSlider />

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
