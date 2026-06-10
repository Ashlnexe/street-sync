"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-black hover:text-green-600 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="text-2xl font-black tracking-tighter text-black uppercase">
            Street<span className="text-green-600">Sync</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide uppercase text-black">
            <Link href="/shop" className="hover:text-green-600 transition-colors">Shop</Link>
            <Link href="/collections" className="hover:text-green-600 transition-colors">Collections</Link>
            <Link href="/about" className="hover:text-green-600 transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-black hover:text-green-600 transition-colors cursor-pointer"
              aria-label="Open cart"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-black tracking-tighter text-black uppercase" onClick={() => setIsMobileMenuOpen(false)}>
                Street<span className="text-green-600">Sync</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            <div className="flex flex-col gap-4 text-lg font-bold tracking-wide uppercase text-black">
              <Link href="/shop" className="hover:text-green-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <Link href="/collections" className="hover:text-green-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
              <Link href="/about" className="hover:text-green-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
