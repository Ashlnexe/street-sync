"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, Search, ShoppingBag, User, X, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const searchInputRef = useRef(null);
  
  const { toggleCart, cartCount } = useCart();



  // --- SCROLL & MODAL LOGIC ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  const openSearch = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(true);
  };

  return (
    <>


      {/* ========================================== */}
      {/* MAIN NAVBAR                                */}
      {/* ========================================== */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${
          isScrolled || isShopHovered || isCollectionsHovered ? "bg-white text-black border-b border-gray-200 shadow-sm" : "bg-transparent text-white"
        }`}
        onMouseLeave={() => { setIsShopHovered(false); setIsCollectionsHovered(false); }}
      >
        {/* Mobile Announcement Ticker */}
        <div className={`w-full bg-black text-white py-2.5 overflow-hidden whitespace-nowrap select-none border-b border-neutral-900 transition-all duration-300 ${
            isScrolled ? "h-0 opacity-0 py-0 border-transparent" : "h-9 opacity-100"
          }`}
        >
          <div className="inline-block animate-pulse font-mono text-[10px] tracking-widest uppercase px-4 text-center w-full">
            STREETSYNC // <span className="text-green-400">MOVE IN FREQUENCY</span> • SIGNAL ACTIVE
          </div>
        </div>

        {/* Main Nav Links (Transparent -> White on scroll) */}
        <nav className="flex items-center justify-between px-4 py-4 md:px-8">
          <div className="flex md:hidden flex-shrink-0 w-[80px]">
            <Menu onClick={() => setIsMobileMenuOpen(true)} className="w-6 h-6 cursor-pointer hover:text-green-500 transition-colors" />
          </div>

          <div className="text-xl md:text-2xl font-bold uppercase tracking-tight flex-shrink-0 flex-1 md:flex-none text-center md:text-left">
            <Link href="/">Street Sync™</Link>
          </div>

          <div className="hidden md:flex items-center justify-center gap-6 md:gap-8 text-sm font-medium uppercase flex-1">
            <div 
              onMouseEnter={() => { setIsShopHovered(true); setIsCollectionsHovered(false); }}
              className="py-4"
            >
              <Link href="/shop" className={`transition-colors ${isShopHovered ? 'border-b-2 border-black pb-1' : 'hover:text-green-500'}`}>
                Shop
              </Link>
            </div>
            <Link href="/women" onMouseEnter={() => { setIsShopHovered(false); setIsCollectionsHovered(false); }} className="hover:text-green-500 transition-colors py-4">Women</Link>
            <div 
              onMouseEnter={() => { setIsCollectionsHovered(true); setIsShopHovered(false); }}
              className="py-4"
            >
              <Link href="/collections" className={`transition-colors ${isCollectionsHovered ? 'border-b-2 border-black pb-1' : 'hover:text-green-500'}`}>
                Collections
              </Link>
            </div>
            <Link href="/about" onMouseEnter={() => { setIsShopHovered(false); setIsCollectionsHovered(false); }} className="hover:text-green-500 transition-colors py-4">About Us</Link>
            <Link href="/faqs" onMouseEnter={() => { setIsShopHovered(false); setIsCollectionsHovered(false); }} className="hover:text-green-500 transition-colors py-4">Faqs</Link>
          </div>

          <div className="flex items-center justify-end gap-4 md:gap-5 flex-shrink-0 w-[80px] md:w-auto">
            <User className="w-5 h-5 cursor-pointer hidden md:block hover:text-green-500 transition-colors" />
            <Search onClick={openSearch} className="w-5 h-5 cursor-pointer hover:text-green-500 transition-colors" />
            <div className="relative cursor-pointer hover:text-green-500 transition-colors" onClick={toggleCart}>
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-green-500 text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </nav>

        {/* Shop Mega Menu Dropdown */}
        <div 
          className={`absolute top-full left-0 w-full bg-[#f8f8f8] border-t border-gray-200 transition-all duration-300 overflow-hidden ${
            isShopHovered ? "max-h-[600px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 flex gap-12 text-black">
            {/* Left Links */}
            <div className="flex gap-16 min-w-[300px]">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Clothing</span>
                <Link href="/shop/t-shirts" className="text-sm font-medium hover:text-green-500 lowercase">t-shirts</Link>
                <Link href="/shop/shirts" className="text-sm font-medium hover:text-green-500 lowercase">shirts</Link>
                <Link href="/shop/vests" className="text-sm font-medium hover:text-green-500 lowercase">vests</Link>
                <Link href="/shop/hoodies" className="text-sm font-medium hover:text-green-500 lowercase">hoodies</Link>
                <Link href="/shop/baby-tees" className="text-sm font-medium hover:text-green-500 lowercase">baby tees</Link>
                <Link href="/shop/full-sleeve" className="text-sm font-medium hover:text-green-500 lowercase">full sleeve</Link>
                <Link href="/shop/pants" className="text-sm font-medium hover:text-green-500 lowercase">pants</Link>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">More</span>
                <Link href="/shop/best-sellers" className="text-sm font-medium hover:text-green-500 lowercase">best sellers</Link>
                <Link href="/shop/basics" className="text-sm font-medium hover:text-green-500 lowercase">basics</Link>
                <Link href="/shop/back-in-stock" className="text-sm font-medium hover:text-green-500 lowercase">back in stock</Link>
                <Link href="/shop/special-prices" className="text-sm font-medium hover:text-green-500 lowercase">special prices</Link>
                <Link href="/shop/bundles" className="text-sm font-medium hover:text-green-500 lowercase">bundles</Link>
              </div>
            </div>

            {/* Right Images */}
            <div className="flex-1 grid grid-cols-3 gap-6">
              <Link href="/shop/t-shirts" className="group flex flex-col gap-3">
                <div className="relative aspect-square w-full bg-white overflow-hidden">
                  <img src="/products/product-10.jpeg" alt="T-Shirts" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xl font-black uppercase tracking-tight">T-Shirts</span>
              </Link>
              <Link href="/shop/hoodies" className="group flex flex-col gap-3">
                <div className="relative aspect-square w-full bg-white overflow-hidden">
                  <img src="/products/product-15.jpeg" alt="Hoodies" className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xl font-black uppercase tracking-tight">Hoodies</span>
              </Link>
              <Link href="/shop/women" className="group flex flex-col gap-3">
                <div className="relative aspect-square w-full bg-white overflow-hidden">
                  <img src="/products/product-62.jpeg" alt="Woman" className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xl font-black uppercase tracking-tight">Woman</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Collections Mega Menu Dropdown */}
        <div 
          className={`absolute top-full left-0 w-full bg-[#f8f8f8] border-t border-gray-200 transition-all duration-300 overflow-hidden ${
            isCollectionsHovered ? "max-h-[600px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 flex gap-12 text-black">
            {/* 3 Image Columns */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
              <Link href="/collections/fall-winter" className="group flex flex-col gap-3">
                <div className="relative aspect-square w-full bg-white overflow-hidden">
                  <img src="/products/product-45.jpeg" alt="Fall/Winter" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xl font-black uppercase tracking-tight">Fall/Winter</span>
              </Link>
              <Link href="/collections/sunburn" className="group flex flex-col gap-3">
                <div className="relative aspect-square w-full bg-white overflow-hidden">
                  <img src="/products/product-5.jpeg" alt="Sunburn X Street Sync" className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xl font-black uppercase tracking-tight">Sunburn X Street Sync</span>
              </Link>
              <Link href="/collections/spring-summer" className="group flex flex-col gap-3">
                <div className="relative aspect-square w-full bg-white overflow-hidden">
                  <img src="/products/product-6.jpeg" alt="Spring/Summer" className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xl font-black uppercase tracking-tight">Spring/Summer</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* MOBILE MENU DRAWER                         */}
      {/* ========================================== */}
      <div 
        className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <span className="text-xl font-black uppercase tracking-tighter text-black">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
            <X className="w-6 h-6 text-black" />
          </button>
        </div>
        
        <div className="flex flex-col p-6 gap-6 text-3xl font-black uppercase tracking-tighter text-black">
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link href="/women" onClick={() => setIsMobileMenuOpen(false)}>Women</Link>
          <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link href="/faqs" onClick={() => setIsMobileMenuOpen(false)}>Faqs</Link>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gray-50 border-t border-gray-200 flex justify-around">
          <button className="flex flex-col items-center gap-2 text-xs font-bold uppercase text-black hover:opacity-60 transition-opacity">
            <User className="w-5 h-5" /> Account
          </button>
          <button onClick={openSearch} className="flex flex-col items-center gap-2 text-xs font-bold uppercase text-black hover:opacity-60 transition-opacity">
            <Search className="w-5 h-5" /> Search
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* FULL SCREEN SEARCH TAKEOVER                */}
      {/* ========================================== */}
      <div 
        className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-500 ease-in-out flex flex-col ${
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 md:p-8">
          <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-black">Search</span>
          <button onClick={() => setIsSearchOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 max-w-5xl mx-auto w-full -mt-20">
          <form className="w-full relative group" onSubmit={(e) => e.preventDefault()}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="WHAT ARE YOU LOOKING FOR?"
              className="w-full text-2xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black border-b-[3px] border-gray-300 focus:border-black py-4 bg-transparent outline-none placeholder:text-gray-300 transition-colors"
            />
            <button type="submit" className="absolute right-0 bottom-4 md:bottom-6 text-gray-300 group-focus-within:text-black transition-colors hover:scale-110 transform duration-200">
               <ArrowRight className="w-8 h-8 md:w-12 md:h-12" />
            </button>
          </form>

          <div className="w-full mt-16 flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Popular Searches</span>
            <div className="flex flex-wrap gap-3">
              {['oversized tee', 'zip-up hoodie', 'waffle full sleeve', 'baby tee', 'music money fashion'].map((term) => (
                <button 
                  key={term} 
                  onClick={() => {
                    if(searchInputRef.current) {
                       searchInputRef.current.value = term;
                       searchInputRef.current.focus();
                    }
                  }}
                  className="px-6 py-3 border border-gray-200 text-xs md:text-sm font-bold uppercase text-black hover:border-black hover:bg-gray-50 transition-colors rounded-full"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
