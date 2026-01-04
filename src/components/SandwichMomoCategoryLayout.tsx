"use client";

import { MenuItem } from "@/db/schema";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "./Header";

interface SandwichMomoCategoryLayoutProps {
  categoryName: string;
  items: MenuItem[];
  locale?: string;
}

export default function SandwichMomoCategoryLayout({
  items,
  locale = 'en',
}: SandwichMomoCategoryLayoutProps) {
  const isBengali = locale === 'bn';
  // Separate items into sandwiches and momos
  const sandwiches = items.filter(item => 
    item.id.startsWith('sand_') || item.nameEn.toLowerCase().includes('sandwich')
  );
  const momos = items.filter(item => 
    item.id.startsWith('momo_') || item.nameEn.toLowerCase().includes('momo')
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Shared Header */}
      <Header />

      {/* Background Decorative Food Border */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top Border - Food items */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-40" />
        {/* Bottom Border - Food items */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-40 rotate-180" />
        {/* Left Border */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#1a1a1a] to-transparent" />
        {/* Right Border */}
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#1a1a1a] to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-16">
        
        {/* Sandwich Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#c6a87c] font-serif tracking-wide">
              {isBengali ? 'স্যান্ডউইচ' : 'Sandwich'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#c6a87c] to-transparent mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {sandwiches.map((item, index) => (
              <ProductCard key={item.id} item={item} index={index} emoji="🥪" isBengali={isBengali} />
            ))}
          </div>
        </section>

        {/* Momo Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#c6a87c] font-serif tracking-wide">
              {isBengali ? 'মোমো' : 'Momo'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#c6a87c] to-transparent mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {momos.map((item, index) => (
              <ProductCard key={item.id} item={item} index={index} emoji="🥟" isBengali={isBengali} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProductCard({ item, index, emoji, isBengali }: { item: MenuItem; index: number; emoji: string; isBengali: boolean }) {
  const hasImage = (item.images && item.images.length > 0) || item.featuredImage;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col items-center text-center"
    >
      {/* Circular Image Container */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#c6a87c]/20 blur-2xl scale-0 group-hover:scale-110 transition-all duration-500" />
        
        {/* Image Circle with Border */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#c6a87c]/40 group-hover:border-[#c6a87c] transition-all duration-300 shadow-2xl">
          {hasImage ? (
            <Image
              src={item.images?.[0] || item.featuredImage || ""}
              alt={item.nameEn}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
              <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Name */}
      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-[#c6a87c] transition-colors duration-300">
        {isBengali ? (item.nameBn || item.nameEn) : item.nameEn}
      </h3>

      {/* Price */}
      <p className="text-xl font-bold text-[#c6a87c]">
        {item.price}/-
      </p>
    </motion.div>
  );
}
