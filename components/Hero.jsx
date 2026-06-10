"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center pt-20 bg-gray-50">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom duration-1000">
        <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4">New Collection</span>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black mb-6 leading-none">
          Sync With <br /> The Streets
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl">
          Premium streetwear designed for the modern minimal aesthetic. Clean lines, bold statements.
        </p>
        <Link 
          href="/shop" 
          className="bg-black text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-green-600 transition-colors duration-300 rounded-md"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
