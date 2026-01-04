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

      <h3 className="text-xl md:text-2xl font-bold text-yellow-500 mb-4 uppercase tracking-wide">
        {item.nameEn}
      </h3>

      <Button 
          variant="outline"
          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-none uppercase tracking-widest text-xs h-10 px-8"
      >
        Add to Cart
      </Button>

    </motion.div>
  );
};

export default function AppetizerCategoryLayout({
  categoryName,
  items,
  description,
}: AppetizerCategoryLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-500 selection:text-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 flex items-center justify-center overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />
         
         <div className="container relative z-10 text-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl md:text-7xl font-black text-yellow-500 mb-4 uppercase drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    {categoryName}
                </h1>
                <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mb-6" />
                <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
                   {description || "Start your meal with our crispy, savory, and delicious selections."}
                </p>
            </motion.div>
         </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
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
