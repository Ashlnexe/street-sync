"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react"; // Imported the specific arrow icon
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { products } from "@/data/products";

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoaded(true); 
  }, []);

  if (!mounted) return null;

  const newInProducts = products.filter(p => p.tags?.includes("NEW IN"));
  const bestSellers = products.filter(p => p.tags?.includes("BESTSELLER"));
  const endOfSeason = products.filter(p => p.tags?.includes("END OF SEASON"));

  return (
    <div 
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
      className="min-h-screen bg-white text-black flex flex-col overflow-x-hidden"
    >
      <Navbar />
      
      <main className="flex-grow pt-16"> 
        <Hero />
        
        {/* 1. NEW IN SECTION */}
        <ProductSection title="New In" products={newInProducts} />

        {/* 2. SHOP THE LOOK SECTION */}
        <section className="w-full py-12 border-b border-gray-200">
          <div className="w-full relative h-[60vh] md:h-[80vh] group cursor-pointer overflow-hidden">
            <Link href="/shop/lookbook" className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="bg-white/95 px-8 py-4 border-2 border-black flex flex-col items-center hover:bg-black hover:text-white transition-colors duration-300">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Shop The Look</h2>
                <span className="text-xs font-bold uppercase tracking-widest mt-2">Explore the drop</span>
              </div>
            </Link>
            <Image 
              src="/lookbook-hero.jpg" 
              alt="Shop The Look" 
              fill 
              className="object-cover object-top" 
            />
          </div>
        </section>

        {/* 3. BEST SELLERS SECTION */}
        <ProductSection title="Best Sellers" products={bestSellers} />

        {/* 4. OUR CATEGORIES */}
        <section className="w-full py-16 px-4 md:px-8 border-b border-gray-200 bg-[#f4f4f4]">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-10 text-center">Our Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[150vh] md:h-[60vh]">
            {[
              { title: "Tees", img: "/category-tees.jpg", link: "/shop/tees" },
              { title: "Hoodies", img: "/category-hoodies.jpg", link: "/shop/hoodies" },
              { title: "Waffle", img: "/category-waffle.jpg", link: "/shop/waffle" },
              { title: "Accessories", img: "/category-acc.jpg", link: "/shop/accessories" }
            ].map((cat, idx) => (
              <Link key={idx} href={cat.link} className="relative group w-full h-full overflow-hidden bg-white">
                <Image 
                  src={cat.img} 
                  alt={cat.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <h3 className="text-white text-3xl font-black uppercase tracking-tighter drop-shadow-lg">
                    {cat.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. END OF SEASON SALE */}
        <ProductSection title="End of Season Sale" products={endOfSeason} />
        
        {/* ========================================== */}
        {/* 6. NEW "DON'T MISS OUT" MARQUEE            */}
        {/* ========================================== */}
        <section className="w-full overflow-hidden border-b border-gray-200 bg-white py-6 md:py-8">
          <div className="flex whitespace-nowrap overflow-hidden">
            <div className="animate-marquee flex gap-12 items-center text-5xl md:text-8xl font-black uppercase tracking-tighter">
              {/* Duplicated 4 times to ensure seamless infinite scrolling */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-12 items-center">
                  <span className="text-black">DON'T MISS OUT</span>
                  {/* Outline Text Effect */}
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>DON'T MISS OUT</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 7. NEW CLUB & SOCIAL CARDS                 */}
        {/* ========================================== */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
          
          {/* THE CLUB CARD */}
          <div className="group flex flex-col justify-between p-8 md:p-14 aspect-square md:aspect-auto md:h-[500px] bg-[#f9f9f9] border-b md:border-b-0 md:border-r border-gray-200 hover:bg-black transition-colors duration-500 cursor-pointer">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black group-hover:text-white transition-colors duration-500 mb-4">
                The Club
              </h2>
              <p className="text-sm md:text-base font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-400 transition-colors duration-500 max-w-md leading-relaxed">
                Join the Street Sync club for exclusive drops, early access, and more.
              </p>
            </div>
            <div className="self-end mt-auto">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-black flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all duration-500">
                <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-black" />
              </div>
            </div>
          </div>

          {/* FOLLOW US CARD */}
          <div className="group flex flex-col justify-between p-8 md:p-14 aspect-square md:aspect-auto md:h-[500px] bg-[#f9f9f9] hover:bg-black transition-colors duration-500 cursor-pointer">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black group-hover:text-white transition-colors duration-500 mb-4">
                Follow Us
              </h2>
              <p className="text-sm md:text-base font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-400 transition-colors duration-500 max-w-md leading-relaxed">
                Stay updated with our latest releases and behind-the-scenes content.
              </p>
            </div>
            <div className="self-end mt-auto">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-black flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all duration-500">
                <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-black" />
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}