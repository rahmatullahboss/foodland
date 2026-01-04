"use client";

import React from 'react';
import Link from 'next/link';
import { IoSearchOutline, IoBagOutline, IoPersonOutline, IoHomeOutline } from 'react-icons/io5';

interface HeaderProps {
  variant?: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ variant = 'dark' }) => {
  const bgClass = variant === 'light' 
    ? 'bg-white/10 backdrop-blur-md' 
    : 'bg-black/40 backdrop-blur-md';
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 ${bgClass} border-b border-white/10`}>
      {/* Left Links */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/90">
        <Link href="/en" className="hover:text-primary transition-colors flex items-center gap-2">
          <IoHomeOutline className="w-4 h-4" />
          Home
        </Link>
        <Link href="/en/categories" className="hover:text-primary transition-colors">Category</Link>
        <Link href="/en/categories" className="hover:text-primary transition-colors">Offer</Link>
        <Link href="/en/contact" className="hover:text-primary transition-colors">Contact</Link>
      </div>

      {/* Mobile - Home + Menu */}
      <div className="md:hidden flex items-center gap-4 text-white">
        <Link href="/en" className="hover:text-primary transition-colors">
          <IoHomeOutline className="w-5 h-5" />
        </Link>
        <Link href="/en/categories" className="font-bold">Menu</Link>
      </div>

      {/* Center Logo */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 text-center">
        <Link href="/en" className="text-xl font-bold font-serif text-white tracking-wider hover:text-primary transition-colors">
          <span className="italic">Food</span>land
        </Link>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-5 text-white">
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
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-3 h-3 flex items-center justify-center rounded-full">0</span>
        </button>
        <button className="hover:text-primary transition-colors">
          <IoPersonOutline className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Header;
