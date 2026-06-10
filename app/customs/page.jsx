"use client";
import Navbar from "@/components/Navbar";
import { Wrench, Package, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CustomsPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <Navbar />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-24 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left: Copy & Process */}
        <div className="w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-xs font-bold uppercase tracking-widest mb-6">
            <Wrench className="w-3 h-3" /> Bespoke Service
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
            Built for you.
          </h1>
          <p className="text-gray-400 mb-12 max-w-md text-sm leading-relaxed">
            Got a specific car, album, or movie in mind? We do 1-of-1 custom blister packs and keychains. Tell us the vision, we build the reality.
          </p>

          <div className="flex flex-col gap-8 mb-12">
            <div className="flex gap-4">
              <span className="text-2xl font-black text-gray-600">01</span>
              <div>
                <h3 className="font-bold uppercase tracking-wider mb-1">The Vision</h3>
                <p className="text-xs text-gray-400">DM us your car model and the theme for the custom blister pack artwork.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl font-black text-gray-600">02</span>
              <div>
                <h3 className="font-bold uppercase tracking-wider mb-1">The Build</h3>
                <p className="text-xs text-gray-400">We source the casting, design the card, and hand-seal the piece.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl font-black text-gray-600">03</span>
              <div>
                <h3 className="font-bold uppercase tracking-wider mb-1">Delivery</h3>
                <p className="text-xs text-gray-400">Shipped securely to your door. Worldwide shipping available.</p>
              </div>
            </div>
          </div>

          {/* Connect this to your Lynk.id or WhatsApp */}
          <Link href="https://lynk.id/mortic.id" target="_blank" className="inline-flex items-center gap-2 bg-white text-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition">
            Start a Custom Order <Send className="w-4 h-4" />
          </Link>
        </div>

        {/* Right: Big Image Grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
           <div className="aspect-[4/5] bg-gray-800 rounded-sm relative overflow-hidden">
              <Image src="/pink-car-hand.png" alt="Custom Pink Car" fill className="object-cover" />
           </div>
           <div className="aspect-[4/5] bg-gray-800 rounded-sm relative overflow-hidden mt-8">
              <Image src="/beatles-sub.png" alt="Custom Beatles Submarine" fill className="object-cover" />
           </div>
        </div>

      </div>
    </main>
  );
}
