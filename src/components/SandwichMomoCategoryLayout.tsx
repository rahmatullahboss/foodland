"use client";

import { MenuItem } from "@/db/schema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import Header from "./Header";

interface SandwichMomoCategoryLayoutProps {
  categoryName: string;
  items: MenuItem[];
  locale?: string;
}

const ItemSection = ({ item, index, isBengali, emoji }: { item: MenuItem; index: number; isBengali: boolean; emoji: string }) => {
  const isEven = index % 2 === 0;
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const displayName = isBengali ? (item.nameBn || item.nameEn) : item.nameEn;
  const isSandwich = item.id.startsWith('sand_') || item.nameEn.toLowerCase().includes('sandwich');
  const defaultDescription = isSandwich 
    ? "A delicious sandwich crafted with premium ingredients, fresh vegetables and our signature sauce."
    : "Authentic steamed or fried dumplings filled with seasoned meat and spices, served with special dipping sauce.";

  return (
    <section
      ref={targetRef}
      className={`min-h-[80vh] flex items-center justify-center py-24 relative overflow-hidden ${
        isEven ? "bg-[#1c1c1c]" : "bg-[#161616]"
      }`}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
         <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl" />
         <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-amber-500/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${isEven ? "" : "md:flex-row-reverse"}`}>
          
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative flex justify-center">
            <motion.div 
                style={{ y, opacity }}
                className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px]"
            >
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={item.images[0]}
                    alt={item.nameEn}
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                  />
                ) : item.featuredImage ? (
                  <Image
                    src={item.featuredImage}
                    alt={item.nameEn}
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-3xl border border-white/10">
                    <span className="text-8xl">{emoji}</span>
                  </div>
                )}
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 md:right-10 md:top-0 bg-yellow-500 text-black font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12">
                   Popular
                </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 text-center md:text-left px-6 md:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-white/40 text-sm ml-2">(4.8)</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    {displayName}
                </h2>
                
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto md:mx-0 md:pr-8">
                    {item.descriptionEn || defaultDescription}
                </p>

                <div className="flex flex-col md:flex-row items-center gap-6 justify-center md:justify-start">
                    <span className="text-4xl font-bold text-yellow-500">
                        ৳{item.price}
                    </span>
                    <div className="h-12 w-px bg-white/20 hidden md:block" />
                    <Button 
                        size="lg"
                        className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg tracking-wide uppercase font-bold transition-all hover:scale-105"
                    >
                        Order Now <ShoppingCart className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

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
    <div className="bg-[#1c1c1c] text-white overflow-hidden">
      {/* Shared Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1c1c1c]/90" />
        
        <div className="relative z-10 text-center container px-4">
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
             >
                <Badge className="mb-6 bg-yellow-500 hover:bg-yellow-600 text-black border-none px-4 py-1 text-sm uppercase tracking-widest">
                    {isBengali ? 'প্রিমিয়াম সিলেকশন' : 'Premium Selections'}
                </Badge>
                <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-6 shadow-xl">
                    <span className="text-white">{isBengali ? 'স্যান্ডউইচ' : 'Sandwich'}</span>
                    <span className="text-white"> & </span>
                    <span className="text-yellow-500">{isBengali ? 'মোমো' : 'Momo'}</span>
                </h1>
             </motion.div>
        </div>
      </section>

      {/* Sandwich Section Header */}
      {sandwiches.length > 0 && (
        <section className="py-16 bg-[#1c1c1c] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white">
              {isBengali ? 'স্যান্ডউইচ' : 'Sandwich'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
          </motion.div>
        </section>
      )}

      {/* Sandwich Items Stream */}
      <div className="flex flex-col">
        {sandwiches.map((item, index) => (
          <ItemSection key={item.id} item={item} index={index} isBengali={isBengali} emoji="🥪" />
        ))}
      </div>

      {/* Momo Section Header */}
      {momos.length > 0 && (
        <section className="py-16 bg-[#1c1c1c] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white">
              {isBengali ? 'মোমো' : 'Momo'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4" />
          </motion.div>
        </section>
      )}

      {/* Momo Items Stream */}
      <div className="flex flex-col">
        {momos.map((item, index) => (
          <ItemSection key={item.id} item={item} index={index} isBengali={isBengali} emoji="🥟" />
        ))}
      </div>
      
      {/* Bottom Call to Action */}
      <section className="py-24 bg-yellow-500 text-black text-center">
          <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-8">
                {isBengali ? 'ক্ষুধা লেগেছে?' : 'Hungry yet?'}
              </h2>
               <Button 
                size="lg"
                className="bg-black text-white hover:bg-gray-800 rounded-full px-12 py-8 text-xl uppercase font-bold"
               >
                   {isBengali ? 'সম্পূর্ণ মেনু দেখুন' : 'View Full Menu'}
               </Button>
          </div>
      </section>
    </div>
  );
}
