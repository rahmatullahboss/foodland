"use client";

import React from 'react';
import Link from 'next/link';
import { IoSearchOutline, IoBagOutline, IoPersonOutline, IoHomeOutline } from 'react-icons/io5';

const Header: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 md:px-12 bg-transparent">
      {/* Left Links */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/90">
        <Link href="/en" className="hover:text-[#c6a87c] transition-colors flex items-center gap-2">
          <IoHomeOutline className="w-4 h-4" />
          Home
        </Link>
        <Link href="/en/categories" className="hover:text-[#c6a87c] transition-colors">Category</Link>
        <Link href="/en/categories" className="hover:text-[#c6a87c] transition-colors">Offer</Link>
        <Link href="/en/contact" className="hover:text-[#c6a87c] transition-colors">Contact</Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-4 text-white">
        <Link href="/en" className="hover:text-[#c6a87c] transition-colors">
          <IoHomeOutline className="w-5 h-5" />
        </Link>
        <Link href="/en/categories" className="font-bold">Menu</Link>
      </div>

      {/* Center Logo - styled like hero */}
      <div className="absolute left-1/2 top-3 -translate-x-1/2 text-center">
        <Link href="/en" className="text-xl md:text-2xl font-serif text-[#c6a87c] tracking-wider hover:text-white transition-colors">
          <span className="italic text-white">Food</span>land
        </Link>
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
        <button className="relative hover:text-[#c6a87c] transition-colors">
          <IoBagOutline className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-3 h-3 flex items-center justify-center rounded-full">5</span>
        </button>
        <button className="hover:text-[#c6a87c] transition-colors">
          <IoPersonOutline className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Header;
