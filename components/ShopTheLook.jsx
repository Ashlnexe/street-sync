import React from "react";
import Image from "next/image";

const LOOKS = [
  { id: 1, image: "/looks/look-1.jpeg" },
  { id: 2, image: "/looks/look-2.jpeg" },
  { id: 3, image: "/looks/look-3.jpeg" },
  { id: 4, video: "/looks/look-4.mp4" },
  { id: 5, image: "/looks/look-5.jpeg" },
  { id: 6, image: "/looks/look-6.jpeg" },
  { id: 7, image: "/looks/look-7.jpeg" },
  { id: 8, image: "/looks/look-8.jpeg" },
];

export default function ShopTheLook() {
  return (
    <section className="w-full pt-12 md:pt-20 pb-0 bg-white font-sans border-t border-gray-200">
      {/* Section Header */}
      <div className="mb-8 md:mb-16 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">
          Shop The Look
        </h2>
      </div>

      {/* Grid: Connected images edge-to-edge */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-full">
        {LOOKS.map((look) => (
          <div key={look.id} className="relative group cursor-pointer w-full aspect-[4/5] md:aspect-[9/16] bg-[#f4f4f4] overflow-hidden">
            
            {look.video ? (
              <video 
                src={look.video} 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            ) : look.image ? (
              <Image 
                src={look.image} 
                alt={`Look ${look.id}`} 
                fill 
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105" 
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-bold uppercase transition-transform duration-700 group-hover:scale-105">
                [Look 0{look.id}]
              </div>
            )}

            {/* Optional: A subtle dark overlay to make white text pop */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

            {/* Campaign Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs space-y-4 z-10 px-4">
              <p className="text-white font-mono text-[10px] md:text-xs tracking-widest uppercase drop-shadow text-center">
                [ CULTURE OBSERVED // DROP 01 ]
              </p>
              <button className="w-full border border-white bg-white/10 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-3.5 rounded-full transition-colors active:bg-green-600 active:border-green-600 hover:bg-white hover:text-black">
                shop the look
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
