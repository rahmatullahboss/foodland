"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  id: string;
  nameEn: string;
  descriptionEn: string | null;
  price: number;
  featuredImage: string | null;
  images: string[] | null;
}

interface SetMenuCategoryLayoutProps {
  categoryName: string;
  items: MenuItem[];
}

const SetMenuCategoryLayout: React.FC<SetMenuCategoryLayoutProps> = ({
  categoryName,
  items,
}) => {
  return (
    <div className="min-h-screen bg-[#1a102e] text-white selection:bg-[#c6a87c] selection:text-black font-serif">
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src="/images/set_menu_hero.png"
          alt="Set Menu Feast"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="text-[#c6a87c] tracking-[0.3em] text-sm md:text-base uppercase mb-4 animate-fade-in-up">
                Experience the Taste
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight animate-fade-in-up delay-100">
                {categoryName}
            </h1>
            <div className="w-24 h-[1px] bg-[#c6a87c] animate-scale-x delay-200"></div>
            <p className="mt-6 text-white/80 max-w-2xl text-lg md:text-xl font-sans font-light animate-fade-in-up delay-300">
                Curated combinations for the perfect dining experience.
            </p>
        </div>
      </section>

      {/* 2. Menu Section */}
      <section className="py-20 px-6 relative">
          {/* Decorative Border */}
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-12">
                {items.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`group relative flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 border border-white/10 bg-white/5 hover:border-[#c6a87c]/30 hover:bg-white/[0.07] transition-all duration-500 rounded-sm ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 overflow-hidden aspect-video md:aspect-[4/3] relative rounded-sm">
                             <Image
                                src={item.featuredImage || "/images/set_menu_hero.png"} 
                                alt={item.nameEn}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Price Badge Overlay */}
                             <div className="absolute top-4 right-4 z-10">
                                <Badge className="bg-[#c6a87c] text-black hover:bg-[#d4b991] border-none text-xl px-4 py-2 font-serif rounded-none shadow-lg">
                                    {item.price}<span className="text-sm align-top ml-1">৳</span>
                                </Badge>
                             </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                            <h2 className="text-3xl md:text-4xl text-[#c6a87c]">
                                {item.nameEn}
                            </h2>
                            <div className="w-16 h-[1px] bg-white/20 mx-auto md:mx-0 group-hover:bg-[#c6a87c] transition-colors duration-500"></div>
                            <p className="text-white/70 font-sans text-lg leading-relaxed">
                                {item.descriptionEn || "A delightful combination of our chef's best selections."}
                            </p>
                            
                            <div className="pt-4">
                                <Button 
                                    className="bg-transparent border border-[#c6a87c] text-[#c6a87c] hover:bg-[#c6a87c] hover:text-black rounded-none px-8 py-6 uppercase tracking-widest transition-all duration-300 transform group-hover:-translate-y-1"
                                >
                                    Order Now
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>
      
      {/* 3. Footer Decor */}
      <div className="w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default SetMenuCategoryLayout;
