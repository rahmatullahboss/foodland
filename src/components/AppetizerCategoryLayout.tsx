"use client";

import { MenuItem } from "@/db/schema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "./Header";

import { Badge } from "@/components/ui/badge";

interface AppetizerCategoryLayoutProps {
  categoryName: string;
  items: MenuItem[];
  description?: string | null;
}

const AppetizerItemCard = ({ item, index }: { item: MenuItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-6 group"
    >
      {/* Image Container with Price Badge */}
      <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] mb-6">
        {/* Glowing effect behind */}
        <div className="absolute inset-0 bg-yellow-500/20 blur-[50px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"></div>
        
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-yellow-500/20 group-hover:border-yellow-500/50 transition-colors duration-500 shadow-2xl shadow-black/50">
          <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
          {item.images && item.images.length > 0 ? (
            <Image
              src={item.images[0]}
              alt={item.nameEn}
              fill
              className="object-cover group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ease-in-out"
            />
          ) : item.featuredImage ? (
            <Image
              src={item.featuredImage}
              alt={item.nameEn}
              fill
              className="object-cover group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ease-in-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
               <span className="text-6xl">🍟</span>
            </div>
          )}
        </div>
        
        {/* Price Badge - positioned like Pizza */}
        <div className="absolute -top-2 -right-2 z-20">
          <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 border-none text-lg px-4 py-2 font-bold rounded-full whitespace-nowrap shadow-lg">
            {item.price}<span className="text-xs align-top ml-0.5">৳</span>
          </Badge>
        </div>
      </div>

      <h3 className="text-2xl font-serif text-white uppercase tracking-wide group-hover:text-yellow-500 transition-colors duration-300">
        {item.nameEn}
      </h3>

      <div className="pt-4 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
        <Button 
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-none uppercase tracking-widest text-xs h-10 px-8"
        >
          Add to Cart
        </Button>
      </div>

    </motion.div>
  );
};

export default function AppetizerCategoryLayout({
  items,
}: AppetizerCategoryLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-500 selection:text-black">
      <Header />

      {/* Hero Section (Arched) - Like Pizza */}
      <section className="relative px-6 py-20 md:py-32 pt-24 overflow-hidden">
        <div className="container mx-auto">
          {/* Main Title Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 relative z-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-yellow-500 leading-none tracking-tight">
              APPETIZERS &amp; <br className="hidden md:block" />
              <span className="italic text-white">FRY</span>
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
                src="/images/appetizers/hero_1.png"
                alt="Crispy Wonthons"
                fill
                className="object-cover animate-ken-burns"
              />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

             {/* Arch 2 (Center - slightly taller) */}
             <div className="relative h-[400px] md:h-[500px] w-full rounded-t-[200px] overflow-hidden border border-white/10 mt-0 md:-mt-12 group">
              <Image 
                src="/images/appetizers/hero_2.png"
                alt="Golden French Fries"
                 fill
                className="object-cover animate-ken-burns"
                style={{ animationDelay: "-5s" }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

             {/* Arch 3 */}
             <div className="relative h-[400px] md:h-[500px] w-full rounded-t-[200px] overflow-hidden border border-white/10 group">
              <Image 
                src="/images/appetizers/hero_3.png"
                alt="Loaded Nachos"
                 fill
                className="object-cover animate-ken-burns"
                style={{ animationDelay: "-10s" }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>
          
          {/* Background Decor */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>
      </section>

      {/* Menu Grid Section */}
      <section className="py-20 px-6 bg-[#0a0a0a] relative">
         {/* Decoration Lines */}
         <div className="absolute top-0 left-10 bottom-0 w-[1px] bg-white/5 hidden md:block"></div>
         <div className="absolute top-0 right-10 bottom-0 w-[1px] bg-white/5 hidden md:block"></div>

        <div className="container mx-auto">
          <div className="text-center mb-20">
            <span className="text-yellow-500 font-sans tracking-[0.2em] text-sm uppercase">Our Menu</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 italic">Choose Your Flavor</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <AppetizerItemCard key={item.id} item={item} index={index} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        <p className="text-xl">No appetizers available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* Bottom Pattern/Footer Decoration */}
      <div className="h-24 bg-gradient-to-t from-black to-transparent pointer-events-none relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-900/50 to-transparent" />
      </div>

    </div>
  );
}
