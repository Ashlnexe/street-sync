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
        <h1 className="text-[18vw] md:text-[15vw] font-black tracking-tighter leading-none whitespace-nowrap select-none flex items-center gap-2 md:gap-4">
          SYNC
          <svg className="w-[0.7em] h-[0.7em] mt-2 md:mt-4" viewBox="0 0 496 512" fill="currentColor">
            <path d="M245.83 214.87l-33.22 17.28c-9.43-19.58-25.24-19.93-27.46-19.93-22.13 0-33.22 14.61-33.22 43.84 0 23.57 9.21 43.84 33.22 43.84 14.47 0 24.65-7.09 30.57-21.26l30.55 15.5c-6.17 11.51-25.69 38.98-65.1 38.98-22.6 0-73.96-10.32-73.96-77.05 0-58.69 43-77.06 72.63-77.06 30.72-.01 52.7 11.95 65.99 35.86zm143.05 0l-32.78 17.28c-9.5-19.77-25.72-19.93-27.9-19.93-22.14 0-33.22 14.61-33.22 43.84 0 23.55 9.23 43.84 33.22 43.84 14.45 0 24.65-7.09 30.54-21.26l31 15.5c-2.1 3.75-21.39 38.98-65.09 38.98-22.69 0-73.96-9.87-73.96-77.05 0-58.67 42.97-77.06 72.63-77.06 30.71-.01 52.58 11.95 65.56 35.86zM247.56 8.05C104.74 8.05 0 123.11 0 256.05c0 138.49 113.6 248 247.56 248 129.93 0 248.44-100.87 248.44-248 0-137.87-106.62-248-248.44-248zm.87 450.81c-112.54 0-203.7-93.04-203.7-202.81 0-105.42 85.43-203.27 203.72-203.27 112.53 0 202.82 89.46 202.82 203.26-.01 112.47-89.07 202.82-202.84 202.82z"/>
          </svg>
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

        {/* Right: Links */}
        <div className="w-full lg:flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 mb-8">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">home</Link>
              <Link href="/shop/tees" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">tees</Link>
              <Link href="/shop/hoodies" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">hoodies</Link>
              <Link href="/shop/baby-tees" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">baby tees</Link>
              <Link href="/shop/accessories" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">accessories</Link>
              <Link href="/collections" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">collections</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">contact</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">about us</Link>
              <Link href="/faq" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">faq</Link>
              <Link href="/careers" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">careers</Link>
              <Link href="/partnerships" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">partnerships/licensing</Link>
              <Link href="/legal" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">legal</Link>
              <Link href="/terms" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">terms of service</Link>
              <Link href="/privacy" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">privacy policy</Link>
              <Link href="/returns" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">return policy</Link>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="/helpdesk" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">helpdesk</Link>
              <Link href="/track-order" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">track order</Link>
              <Link href="/your-orders" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">your orders</Link>
              <Link href="/exchange" className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all lowercase">exchange</Link>
            </div>
          </div>
          
          <div className="text-[13px] text-white font-medium leading-relaxed max-w-3xl mt-auto pt-8">
            street sync, in sync with the pulse, and all related logos are trademarks or registered trademarks of street sync in indonesia and/or other countries. all other third-party trademarks are the property of their respective owners.
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full border-t border-gray-800 px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500 font-bold tracking-wider uppercase">
          © 2026 - sync
        </p>
        <p className="text-xs text-gray-500 text-center md:text-right">
          jakarta, indonesia · worldwide shipping
        </p>
      </div>

    </footer>
  );
}
