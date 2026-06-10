"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] md:h-screen bg-[#111] flex items-center justify-center flex-col overflow-x-hidden">
      
      {/* Hero Video Background */}
      <div className="absolute inset-0 opacity-60 z-0 bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-center grayscale"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center mt-12 w-full max-w-7xl mx-auto">

        <h1 
          className="text-[15vw] sm:text-[18vw] md:text-[16vw] font-black text-white uppercase tracking-tighter drop-shadow-2xl leading-none select-none origin-center"
          style={{ transform: "scaleX(1.1)" }}
        >
          SYNCED
        </h1>

        <Link 
          href="/shop" 
          className="w-full md:w-auto border-2 border-white text-white bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-wider hover:bg-green-600 hover:border-green-600 hover:text-white transition-colors duration-300"
        >
          Shop The Drop
        </Link>
      </div>
    </section>
  );
}
