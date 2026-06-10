"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, Search, ShoppingBag, User, X, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // --- TOP BAR CAROUSEL & AUDIO STATE ---
  const [topBarIndex, setTopBarIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const topBarSlides = [
    { type: "text", content: "FREE SHIPPING ON PREPAID ORDERS" },
    { type: "music", track: "Adults Are Talking", artist: "The Strokes" } // Update to Street Sync's vibe
  ];

  // Auto-rotate the top bar every 4 seconds (unless music is playing)
  useEffect(() => {
    if (isPlaying) return; // Don't auto-rotate away if they are listening to the song
    
    const interval = setInterval(() => {
      setTopBarIndex((prev) => (prev + 1) % topBarSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, topBarSlides.length]);

  const nextSlide = () => setTopBarIndex((prev) => (prev + 1) % topBarSlides.length);
  const prevSlide = () => setTopBarIndex((prev) => (prev - 1 + topBarSlides.length) % topBarSlides.length);

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

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
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="/pink-white-snippet.mp3" // Ensure this file is in your public/ folder
        onEnded={() => setIsPlaying(false)}
      />

      {/* ========================================== */}
      {/* MAIN NAVBAR                                */}
      {/* ========================================== */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${
          isScrolled ? "bg-white text-black border-b border-gray-200 shadow-sm" : "bg-transparent text-white"
        }`}
      >
        {/* Interactive Top Announcement Bar */}
        <div className={`w-full bg-[#1a1a1a] text-white text-xs flex items-center justify-between px-4 transition-all duration-300 overflow-hidden ${
            isScrolled ? "h-0 opacity-0" : "h-10 opacity-100"
          }`}
        >
          <button onClick={prevSlide} className="p-2 hover:opacity-70 transition-opacity">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 h-full flex items-center justify-center overflow-hidden">
            {topBarSlides[topBarIndex].type === "text" ? (
              <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs animate-in fade-in duration-500 text-center">
                {topBarSlides[topBarIndex].content}
              </span>
            ) : (
              /* The Music Player Slide */
              <button 
                onClick={togglePlay} 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity animate-in fade-in duration-500 max-w-full overflow-hidden"
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${isPlaying ? "bg-red-500 animate-pulse" : "bg-gray-500"}`}></div>
                
                {/* Marquee effect for the song title so it "keeps moving" */}
                <div className="relative flex overflow-hidden whitespace-nowrap w-[150px] md:w-[250px] mask-edges">
                   <div className={`${isPlaying ? "animate-marquee" : ""} inline-block font-bold uppercase tracking-widest text-[10px] md:text-xs`}>
                      <span className="mx-4">{topBarSlides[topBarIndex].track} · {topBarSlides[topBarIndex].artist}</span>
                      <span className="mx-4">{topBarSlides[topBarIndex].track} · {topBarSlides[topBarIndex].artist}</span>
                   </div>
                </div>

                {isPlaying ? <Pause className="w-3 h-3 shrink-0" /> : <Play className="w-3 h-3 shrink-0 ml-0.5" />}
              </button>
            )}
          </div>

          <button onClick={nextSlide} className="p-2 hover:opacity-70 transition-opacity">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Main Nav Links (Transparent -> White on scroll) */}
        <nav className="flex items-center justify-between px-4 py-4 md:px-8">
          <div className="flex md:hidden flex-shrink-0 w-[80px]">
            <Menu onClick={() => setIsMobileMenuOpen(true)} className="w-6 h-6 cursor-pointer hover:opacity-60 transition-opacity" />
          </div>

          <div className="text-xl md:text-2xl font-bold uppercase tracking-tight flex-shrink-0 flex-1 md:flex-none text-center md:text-left">
            <Link href="/">Street Sync™</Link>
          </div>

          <div className="hidden md:flex items-center justify-center gap-6 md:gap-8 text-sm font-medium uppercase flex-1">
            <Link href="/shop/tees" className="hover:opacity-60 transition-opacity">Tees</Link>
            <Link href="/shop/hoodies" className="hover:opacity-60 transition-opacity">Hoodies</Link>
            <Link href="/collections/sunburn" className="hover:opacity-60 transition-opacity">Collabs</Link>
            <Link href="/club" className="hover:opacity-60 transition-opacity">The Club</Link>
          </div>

          <div className="flex items-center justify-end gap-5 flex-shrink-0 w-[80px] md:w-auto">
            <User className="w-5 h-5 cursor-pointer hidden md:block hover:opacity-60 transition-opacity" />
            <Search onClick={openSearch} className="w-5 h-5 cursor-pointer hidden sm:block hover:opacity-60 transition-opacity" />
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:opacity-60 transition-opacity" />
          </div>
        </nav>
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
          <Link href="/shop/tees" onClick={() => setIsMobileMenuOpen(false)}>Tees</Link>
          <Link href="/shop/hoodies" onClick={() => setIsMobileMenuOpen(false)}>Hoodies</Link>
          <Link href="/collections/sunburn" onClick={() => setIsMobileMenuOpen(false)}>Collabs</Link>
          <Link href="/club" onClick={() => setIsMobileMenuOpen(false)}>The Club</Link>
          <Link href="/faqs" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
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
