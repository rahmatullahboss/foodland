
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ClientImage from "./ClientImage";
import { Button } from '@/components/ui/button';
import { IoSearchOutline, IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { SiGoogle, SiUber, SiStripe, SiNike, SiTripadvisor, SiAirbnb } from 'react-icons/si';

const HeroSection = () => {
    return (
        <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#2D1B4E]">
            {/* Background & Animated Ingredients */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Base Gradient */}
                <div className="absolute inset-0 bg-radial-gradient from-[#4a2b7a] via-[#2D1B4E] to-[#1a102e]" />
                
                {/* Floating Ingredients */}
                {/* Top Left - Cucumber */}
                <div className="absolute top-[10%] left-[10%] w-24 h-24 md:w-32 md:h-32 animate-float opacity-90 mix-blend-normal">
                    <ClientImage
                        src="/images/hero_cucumber_cartoon.png"
                        alt="Cucumber"
                        fill
                        className="object-contain animate-rotate-reverse"
                    />
                </div>

                {/* Top Right - Sushi */}
                <div className="absolute top-[15%] right-[15%] w-28 h-28 md:w-40 md:h-40 animate-float-delayed opacity-90 mix-blend-normal">
                     <ClientImage
                        src="/images/hero_sushi_cartoon.png"
                        alt="Sushi"
                        fill
                        className="object-contain animate-rotate"
                    />
                </div>

                 {/* Bottom Left - Bamboo */}
                <div className="absolute bottom-[20%] left-[5%] w-32 h-32 md:w-48 md:h-48 animate-float-slow opacity-90 mix-blend-normal">
                     <ClientImage
                        src="/images/hero_bamboo_cartoon.png"
                        alt="Bamboo"
                        fill
                        className="object-contain rotate-45"
                    />
                </div>

                {/* Bottom Right - Onion */}
                <div className="absolute bottom-[25%] right-[10%] w-20 h-20 md:w-28 md:h-28 animate-float opacity-90 mix-blend-normal">
                     <ClientImage
                        src="/images/hero_onion_cartoon.png"
                        alt="Onion"
                        fill
                        className="object-contain animate-rotate-reverse"
                    />
                </div>

                {/* Center/Random - Chili */}
                <div className="absolute top-[30%] left-[20%] w-16 h-16 md:w-24 md:h-24 animate-float-delayed opacity-90 mix-blend-normal blur-[1px]">
                     <ClientImage
                        src="/images/hero_chili_cartoon.png"
                        alt="Chili"
                        fill
                        className="object-contain rotate-12"
                    />
                </div>
                 <div className="absolute bottom-[30%] right-[25%] w-14 h-14 md:w-20 md:h-20 animate-float-slow opacity-90 mix-blend-normal blur-[2px]">
                     <ClientImage
                        src="/images/hero_chili_cartoon.png"
                        alt="Chili"
                        fill
                        className="object-contain -rotate-45"
                    />
                </div>


                {/* Overlay/Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
                {/* Left Links */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/90">
                    <Link href="/menu" className="hover:text-primary transition-colors">Category</Link>
                    <Link href="/offer" className="hover:text-primary transition-colors">Offer</Link>
                    <Link href="/recipes" className="hover:text-primary transition-colors">Recipes</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                </div>

                {/* Mobile Menu Placeholder (Hamburger would go here) */}
                <div className="md:hidden text-white">
                    {/* Simplified for now */}
                    <span className="font-bold">Category</span>
                </div>

                {/* Center Logo */}
                <div className="absolute left-1/2 top-6 -translate-x-1/2 text-center">
                   <div className="flex flex-col items-center justify-center">
                        <Link href="/" className="text-2xl font-bold font-serif text-white tracking-wider">
                           <span className="italic">Chili</span> <br/>
                           <span>Pepper</span>
                        </Link>
                   </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-6 text-white">
                    <div className="hidden md:flex items-center bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
                        <IoSearchOutline className="w-4 h-4 mr-2 opacity-70" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="bg-transparent border-none outline-none text-xs w-20 placeholder:text-white/50"
                        />
                    </div>
                    <button className="relative hover:text-primary transition-colors">
                        <IoBagOutline className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-3 h-3 flex items-center justify-center rounded-full">5</span>
                    </button>
                    <button className="hover:text-primary transition-colors">
                        <IoPersonOutline className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 -mt-10">
                <div className="space-y-2 animate-in fade-in zoom-in duration-1000">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl text-white leading-tight drop-shadow-2xl">
                        <span className="font-serif italic font-light block md:inline mr-4">Here Is</span> 
                        <span className="font-serif italic font-light block md:inline">Your</span>
                        <br />
                        <span className="font-sans font-bold tracking-tight">Delicious Recipe</span>
                    </h1>
                </div>

                <div className="mt-12 animate-in slide-in-from-bottom duration-1000 delay-300">
                    <Link href="/menu">
                        <Button 
                            size="lg" 
                            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-6 text-sm font-semibold tracking-widest shadow-xl hover:shadow-red-600/20 transition-all transform hover:scale-105"
                        >
                            ORDER NOW
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Footer Brand Logos */}
            <div className="relative z-10 pb-12 px-6">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                   <SiGoogle className="h-6 w-auto text-white hover:text-white" />
                   <SiUber className="h-8 w-auto text-white hover:text-white" />
                   <SiStripe className="h-8 w-auto text-white hover:text-[#635BFF]" />
                   <SiNike className="h-6 w-auto text-white hover:text-white" />
                   <SiTripadvisor className="h-8 w-auto text-white hover:text-[#00BFA5]" />
                   <SiAirbnb className="h-7 w-auto text-white hover:text-[#FF5A5F]" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
