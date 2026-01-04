"use client";

import { MenuItem } from "@/db/schema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Header from "./Header";

interface JuiceCategoryLayoutProps {
  categoryName: string;
  items: MenuItem[];
  description?: string | null;
}

export default function JuiceCategoryLayout({
  categoryName,
  items,
  description,
}: JuiceCategoryLayoutProps) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-serif relative overflow-hidden">
      {/* Shared Header */}
      <Header />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 py-16 pt-24 relative z-10">
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-pink-500/50 text-pink-400 uppercase tracking-widest text-xs px-3 py-1">
              Fresh & Organic
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-lg">
              {categoryName}
            </h1>
            {description && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans font-light leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        </header>

        {items.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl mb-2">Unavailable</h3>
            <p>No juice items currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-[#222] rounded-3xl p-4 border border-white/5 hover:border-pink-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] flex flex-col"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-5 bg-[#151515]">
                  {/* Price Tag */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-white font-sans font-bold px-3 py-1.5 rounded-full border border-white/10 text-sm">
                      ৳{item.price}
                    </span>
                  </div>

                  {item.images && item.images.length > 0 ? (
                    <Image
                      src={item.images[0]}
                      alt={item.nameEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                  ) : item.featuredImage ? (
                    <Image
                      src={item.featuredImage}
                      alt={item.nameEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center flex-col gap-2 text-gray-600">
                        <span className="text-4xl opacity-20">🥤</span>
                    </div>
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-100 mb-2 truncate group-hover:text-pink-400 transition-colors">
                    {item.nameEn}
                  </h3>
                  <div className="flex justify-between items-end mt-auto">
                    <p className="text-sm text-gray-400 font-sans line-clamp-2 leading-relaxed flex-grow pr-4">
                      {item.descriptionEn || "Delicious and refreshing."}
                    </p>
                    <Button 
                        size="icon"
                        className="rounded-full h-11 w-11 bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-600/20 transition-transform active:scale-95 shrink-0"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Order</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
