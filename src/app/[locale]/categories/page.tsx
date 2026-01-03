import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Category data with generated images

const categories = [
  { id: "cat_pizza", name: "Pizza", image: "/images/category_pizza_1767458191066.png", description: "Authentic Italian pizzas with premium toppings" },
  { id: "cat_burger", name: "Burger & Sandwich", image: "/images/category_burger_1767458206673.png", description: "Gourmet burgers and delicious sandwiches" },
  { id: "cat_pasta", name: "Pasta & Chowmein", image: "/images/category_pasta_1767458227513.png", description: "Creamy pastas and flavorful noodles" },
  { id: "cat_rice", name: "Rice & Biryani", image: "/images/category_rice_1767458244434.png", description: "Aromatic biryanis and fried rice specialties" },
  { id: "cat_setmenu", name: "Set Menu", image: "/images/category_setmenu_1767458264895.png", description: "Complete meal packages for the perfect dining experience" },
  { id: "cat_chicken", name: "Chicken & Beef", image: "/images/category_chicken_1767458291345.png", description: "Sizzling grilled meats and curries" },
  { id: "cat_seafood", name: "Seafood", image: "/images/category_seafood_1767458309199.png", description: "Fresh catches from the sea" },
  { id: "cat_soup", name: "Soup", image: "/images/category_soup_1767458326427.png", description: "Hot and comforting soups" },
  { id: "cat_appetizer", name: "Appetizers & Fry", image: "/images/category_appetizer_1767458347302.png", description: "Crispy starters and fried delights" },
  { id: "cat_drinks", name: "Drinks & Desserts", image: "/images/category_drinks_1767458363774.png", description: "Refreshing beverages and sweet treats" },
  { id: "cat_platter", name: "Party Platter", image: "/images/category_setmenu_1767458264895.png", description: "Grand platters for celebrations" },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-[#0d0a15] to-neutral-950">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link href="/en" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-primary tracking-[0.3em] text-sm uppercase font-sans">Explore Our Menu</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4">
              All <span className="italic text-primary">Categories</span>
            </h1>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-display text-xl">
              Discover the full range of culinary delights we have crafted for you
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} href={`/en/category/${category.id}`}>
                <div 
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/40 transition-all duration-500 bg-[#111] hover:shadow-2xl hover:shadow-primary/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                  
                  {/* Glowing Border Effect on Hover */}
                  <div className="absolute inset-0 rounded-3xl ring-2 ring-transparent group-hover:ring-primary/40 transition-all duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-serif text-white group-hover:text-primary transition-colors duration-300 mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-400 font-sans text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-sm uppercase tracking-widest font-sans">Explore Menu</span>
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </div>
                  </div>
                  
                  {/* Category Number Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="text-5xl font-serif text-white/10 group-hover:text-primary/20 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer Gradient */}
      <div className="h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
