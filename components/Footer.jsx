"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white overflow-hidden flex flex-col mt-auto">

      {/* Trust Signals Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-gray-800">
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col items-center text-center justify-center">
          <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Customer Service</h4>
          <p className="text-sm text-gray-400">we're real people. we reply. we care.</p>
        </div>
        <div className="p-8 md:p-12 border-b md:border-b-0 lg:border-r border-gray-800 flex flex-col items-center text-center justify-center">
          <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Fast Dispatch</h4>
          <p className="text-sm text-gray-400">orders are packed and shipped within 24-48 hours.</p>
        </div>
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col items-center text-center justify-center">
          <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Worldwide Shipping</h4>
          <p className="text-sm text-gray-400">we ship globally. wherever you are, we got you.</p>
        </div>
        <div className="p-8 md:p-12 flex flex-col items-center text-center justify-center">
          <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Secure Payment</h4>
          <p className="text-sm text-gray-400">your payment information is processed securely.</p>
        </div>
      </div>

      {/* Big Typography Row */}
      <div className="w-full border-b border-gray-800 overflow-hidden flex items-center justify-center py-6 md:py-10">
        <h1 className="text-[18vw] md:text-[15vw] font-black tracking-tighter leading-none whitespace-nowrap select-none">
          Mortic™
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between">

        {/* Left: Spotify */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-widest">On Rotation</span>
          </div>
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/album/3mH6qwIy9crq0I9YQbOuDf?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <p className="text-xs text-gray-500 font-mono">Frank Ocean — Blonde</p>
        </div>

        {/* Right: Real links only */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Find Us</h4>
          <div className="flex flex-col gap-4">
            <a href="https://www.instagram.com/mortic.id" target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors lowercase">
              instagram
            </a>
            <a href="https://www.tiktok.com/@mortic.id" target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors lowercase">
              tiktok
            </a>
            <a href="https://shopee.co.id/mortic.id" target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors lowercase">
              shopee
            </a>
            <a href="https://wa.me/628XXXXXXX" target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors lowercase">
              whatsapp
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <p className="text-xs text-gray-500 lowercase">jakarta, indonesia</p>
            <p className="text-xs text-gray-500 lowercase">worldwide shipping</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full border-t border-gray-800 px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500 font-bold tracking-wider uppercase">
          © 2026 - mortic
        </p>
        <p className="text-xs text-gray-500 text-center md:text-right">
          jakarta, indonesia · worldwide shipping
        </p>
      </div>

    </footer>
  );
}
