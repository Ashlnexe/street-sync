"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-[#111] flex items-center justify-center flex-col overflow-hidden">
      
      {/* Replace 'src' with a dark, moody streetwear lookbook photo */}
      <div className="absolute inset-0 opacity-60 z-0">
        <Image 
          src="/street-sync-hero.jpg" // Make sure to add this image to your /public folder
          alt="Street Sync Hero"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center mt-12">
        {/* WearADHD relies heavily on lowercase, tight-tracking typography */}
        <h1 className="text-5xl md:text-8xl font-black text-white lowercase tracking-tight drop-shadow-lg max-w-4xl leading-none">
          all day, <br/> high decibels.
        </h1>
        <p className="text-white text-sm md:text-base font-medium tracking-widest uppercase mb-4">
          Music-Inspired Streetwear
        </p>
        <Link 
          href="/shop" 
          className="border-2 border-white text-white bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
        >
          Shop The Drop
        </Link>
      </div>
    </section>
  );
}
