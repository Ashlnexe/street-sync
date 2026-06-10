import React from "react";

// Mock data generating 8 items for the 2 rows of 4
const LOOKS = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  imageLabel: `[Look 0${i + 1}]`,
}));

export default function ShopTheLook() {
  return (
    <section className="w-full pt-16 md:pt-20 pb-0 bg-white font-sans border-b border-gray-200">
      {/* Section Header */}
      <div className="mb-8 md:mb-12 flex justify-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase text-black leading-none">
          Shop The Look
        </h2>
      </div>

      {/* Grid: Connected images edge-to-edge */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 w-full">
        {LOOKS.map((look) => (
          <div key={look.id} className="relative group cursor-pointer w-full aspect-[3/4] md:aspect-[9/16] bg-[#f4f4f4] overflow-hidden">
            
            {/* PLACEHOLDER: Replace with your actual <img /> or Next.js <Image /> */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-bold uppercase transition-transform duration-700 group-hover:scale-105">
              {look.imageLabel}
            </div>

            {/* Optional: A subtle dark overlay to make white text pop */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Transparent Overlaid Button */}
            <button className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[70%] max-w-[200px] py-2.5 bg-transparent border border-white/70 text-white text-xs md:text-sm font-medium lowercase tracking-wide rounded-md hover:bg-white/10 transition-colors backdrop-blur-sm z-10">
              shop the look
            </button>

          </div>
        ))}
      </div>
    </section>
  );
}
