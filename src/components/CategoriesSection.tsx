"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Category data with generated images
const categories = [
  { id: "cat_pizza", name: "Pizza", image: "/images/category_pizza_1767458191066.png" },
  { id: "cat_burger", name: "Burger & Sandwich", image: "/images/category_burger_1767458206673.png" },
  { id: "cat_pasta", name: "Pasta & Chowmein", image: "/images/category_pasta_1767458227513.png" },
  { id: "cat_rice", name: "Rice & Biryani", image: "/images/category_rice_1767458244434.png" },
  { id: "cat_setmenu", name: "Set Menu", image: "/images/category_setmenu_1767458264895.png" },
  { id: "cat_chicken", name: "Chicken & Beef", image: "/images/category_chicken_1767458291345.png" },
  { id: "cat_seafood", name: "Seafood", image: "/images/category_seafood_1767458309199.png" },
  { id: "cat_soup", name: "Soup", image: "/images/category_soup_1767458326427.png" },
  { id: "cat_appetizer", name: "Appetizers & Fry", image: "/images/category_appetizer_1767458347302.png" },
  { id: "cat_drinks", name: "Drinks & Desserts", image: "/images/category_drinks_1767458363774.png" },
  { id: "cat_platter", name: "Party Platter", image: "/images/category_setmenu_1767458264895.png" }, // Fallback image
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};


export default function CategoriesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-neutral-950 via-[#0d0a15] to-neutral-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary tracking-[0.3em] text-sm uppercase font-sans">Explore Our Menu</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mt-4">
            Food <span className="italic text-primary">Categories</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-display text-lg">
            From sizzling pizzas to refreshing drinks, discover a world of flavors crafted with passion
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6"
        >
          {categories.slice(0, 6).map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/en/category/${category.id}`}>
                <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/30 transition-all duration-500 bg-[#111]">
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-lg md:text-xl font-serif text-white group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="mt-2 opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-xs text-primary/80 uppercase tracking-widest">View Menu</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Second Row - Remaining Categories */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-6"
        >
          {categories.slice(6).map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/en/category/${category.id}`}>
                <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/30 transition-all duration-500 bg-[#111]">
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-lg md:text-xl font-serif text-white group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="mt-2 opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-xs text-primary/80 uppercase tracking-widest">View Menu</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            asChild
            size="lg" 
            className="rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-black border border-primary/30 hover:border-primary px-8 py-6 text-lg font-serif group transition-all duration-300"
          >
            <Link href="/en/categories">
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
