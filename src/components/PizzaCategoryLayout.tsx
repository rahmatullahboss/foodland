"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductVariantSelector from "./ProductVariantSelector";

interface MenuItemVariant {
  id: string;
  name: string;
  price: number;
}

interface MenuItem {
  id: string;
  nameEn: string;
  descriptionEn: string | null;
  price: number;
  featuredImage: string | null;
  images: string[] | null;
  variants?: MenuItemVariant[];
}

interface PizzaCategoryLayoutProps {
  categoryName: string;
  items: MenuItem[];
}

const PizzaCategoryLayout: React.FC<PizzaCategoryLayoutProps> = ({
  categoryName,
  items,
}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const handleAddToCartClick = (item: MenuItem) => {
    // If item has variants, open selector
    if (item.variants && item.variants.length > 0) {
      setSelectedItem(item);
      setIsSelectorOpen(true);
    } else {
      // Direct add to cart (mock functionality for now)
      console.log(`Added ${item.nameEn} to cart at ${item.price}`);
      // In a real app, you'd call a cart context function here
    }
  };

  const handleVariantAddToCart = (variantId: string, price: number) => {
    console.log(`Added ${selectedItem?.nameEn} (Variant: ${variantId}) to cart at ${price}`);
    // In a real app, you'd call a cart context function here
  };

  // Helper to get display price (lowest variant or base price)
  const getDisplayPrice = (item: MenuItem) => {
    if (item.variants && item.variants.length > 0) {
      const minPrice = Math.min(...item.variants.map((v) => v.price));
      return { price: minPrice, isFrom: true };
    }
    return { price: item.price, isFrom: false };
  };

  return (
    <div className="min-h-screen bg-[#1a102e] text-white selection:bg-[#c6a87c] selection:text-black">
      {/* 1. Hero Section (Arched) */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto">
          {/* Main Title Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 relative z-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#c6a87c] leading-none tracking-tight">
              LOVE OF <br className="hidden md:block" />
              <span className="italic text-white">PIZZA</span>
            </h1>
            
            <div className="mt-8 md:mt-0 max-w-xs text-right hidden md:block">
              <p className="text-white/70 font-sans tracking-widest text-sm mb-4">
                SCROLL TO DISCOVER
              </p>
              <div className="w-full h-[1px] bg-white/20"></div>
            </div>
          </div>

          {/* Arched Images Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Arch 1 */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-t-[200px] overflow-hidden border border-white/10 group">
              <Image 
                src="/images/hero_chili_cartoon.png" // Placeholder or lifestyle image
                alt="Pizza Lifestyle"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

             {/* Arch 2 (Center - slightly taller/different) */}
             <div className="relative h-[400px] md:h-[500px] w-full rounded-t-[200px] overflow-hidden border border-white/10 mt-0 md:-mt-12 group">
              <Image 
                src="/images/hero_sushi_cartoon.png" // Using existing assets as placeholder for now
                alt="Pizza Preparation"
                 fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

             {/* Arch 3 */}
             <div className="relative h-[400px] md:h-[500px] w-full rounded-t-[200px] overflow-hidden border border-white/10 group">
              <Image 
                src="/images/hero_cucumber_cartoon.png" // Placeholder
                alt="Pizza Dining"
                 fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>
          
          {/* Background Decor */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>
      </section>

      {/* 2. Menu Grid */}
      <section className="py-20 px-6 bg-[#150d25] relative">
         {/* Decoration Lines */}
         <div className="absolute top-0 left-10 bottom-0 w-[1px] bg-white/5 hidden md:block"></div>
         <div className="absolute top-0 right-10 bottom-0 w-[1px] bg-white/5 hidden md:block"></div>

        <div className="container mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#c6a87c] font-sans tracking-[0.2em] text-sm uppercase">Our Menu</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 italic">Choose Your Flavor</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {items.map((item) => {
               const { price, isFrom } = getDisplayPrice(item);
               return (
              <div key={item.id} className="group relative flex flex-col items-center text-center">
                {/* Image Container - Floating Circle */}
                <div className="relative w-64 h-64 mb-8">
                    {/* Glowing effect behind */}
                    <div className="absolute inset-0 bg-[#c6a87c]/20 blur-[50px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"></div>
                    
                    <div className="relative w-full h-full animate-float group-hover:scale-110 transition-transform duration-500">
                        <Image
                            src={item.featuredImage || "/placeholder.png"}
                            alt={item.nameEn}
                            fill
                            className="object-cover rounded-full shadow-2xl"
                        />
                    </div>
                     <div className="absolute -top-4 -right-4">
                        <Badge className="bg-[#c6a87c] text-black hover:bg-[#d4b991] border-none text-lg px-3 py-1 font-serif rounded-full whitespace-nowrap">
                            {isFrom && <span className="text-[10px] uppercase tracking-wider mr-1 opacity-70">From</span>}
                            {price}<span className="text-xs align-top ml-0.5">৳</span>
                        </Badge>
                     </div>
                </div>

                {/* Content */}
                <div className="space-y-3 z-10 w-full px-4">
                  <h3 className="text-2xl font-serif text-white uppercase tracking-wide group-hover:text-[#c6a87c] transition-colors duration-300">
                    {item.nameEn}
                  </h3>
                  <p className="text-white/60 font-sans text-sm leading-relaxed min-h-[40px]">
                    {item.descriptionEn || "Delicious pizza with fresh ingredients."}
                  </p>
                  
                  <div className="pt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <Button 
                        onClick={() => handleAddToCartClick(item)}
                        variant="outline" 
                        className="border-[#c6a87c] text-[#c6a87c] hover:bg-[#c6a87c] hover:text-black rounded-none uppercase tracking-widest text-xs h-10 px-8"
                      >
                          Add to Cart
                      </Button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Variant Selector Dialog */}
      {selectedItem && (
        <ProductVariantSelector
          isOpen={isSelectorOpen}
          onClose={() => setIsSelectorOpen(false)}
          productName={selectedItem.nameEn}
          variants={selectedItem.variants || []}
          onAddToCart={handleVariantAddToCart}
        />
      )}
    </div>
  );
};

export default PizzaCategoryLayout;
