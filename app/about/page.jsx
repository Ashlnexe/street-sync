"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Massive Header */}
      <div className="pt-32 pb-16 px-4 md:px-8 border-b border-gray-200">
        <h1 className="text-5xl md:text-8xl lg:text-[10vw] font-black uppercase tracking-tighter leading-none text-black">
          The Process.
        </h1>
      </div>

      {/* Story Section */}
      <div className="flex flex-col lg:flex-row border-b border-gray-200">
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-200 bg-[#f9f9f9]">
          <ArrowDownRight className="w-12 h-12 text-black mb-8" />
          <h2 className="text-3xl font-black uppercase tracking-tight mb-6 text-black">
            Built in Jakarta. <br /> Shipped Worldwide.
          </h2>
          <div className="text-sm text-gray-600 flex flex-col gap-4 leading-relaxed max-w-md">
            <p>
              Mortic started with a simple idea: the things you carry every day should mean something. We didn't want standard merch. We wanted statement pieces.
            </p>
            <p>
              From custom 1-of-1 Hot Wheels blister packs featuring hand-drawn album art, to premium, tarnish-free stainless steel rings inspired by the music that shaped us—every piece is assembled, sealed, and polished with intent.
            </p>
            <p className="font-bold text-black uppercase tracking-widest mt-4">
              We are real people. We care about the details.
            </p>
          </div>
        </div>

        {/* Editorial Image Grid */}
        <div className="w-full lg:w-1/2 p-4 md:p-8 bg-white flex flex-col gap-4">
          <div className="w-full aspect-video bg-gray-100 relative overflow-hidden border border-gray-200">
            <Image 
              src="/bus-drawing.png" 
              alt="Workshop Photo" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex gap-4 h-64">
            <div className="w-1/2 bg-gray-100 relative overflow-hidden border border-gray-200">
              <Image 
                src="/bus-back.png" 
                alt="Detail 1" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="w-1/2 bg-gray-100 relative overflow-hidden border border-gray-200">
              <Image 
                src="/bus-front.jpg" 
                alt="Detail 2" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
