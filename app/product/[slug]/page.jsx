"use client";
import { useState, use, useEffect } from "react";
import { Minus, Plus, Share, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function ProductPage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-3xl font-black uppercase text-black">Product Not Found</h1>
        <Link href="/" className="mt-4 text-sm font-bold underline">Go back home</Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize || "OS", quantity);
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] pb-24 lg:pb-0"> {/* Added pb-24 for mobile to avoid bottom bar overlap */}
      <Navbar />
      
      <div className="max-w-[1400px] mx-auto px-0 md:px-8 py-0 md:py-12 flex flex-col lg:flex-row gap-0 lg:gap-12 items-start relative mt-16 md:mt-24">
        
        {/* MOBILE CAROUSEL / DESKTOP GRID */}
        {/* On mobile: full width, horizontal swipe. On desktop: sticky, 2 column grid */}
        <div className="w-full lg:w-[55%] lg:sticky lg:top-24 flex lg:grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar z-10 bg-white lg:bg-transparent">
          <div className="min-w-full lg:min-w-0 aspect-[4/5] lg:aspect-square bg-white flex items-center justify-center relative border-b lg:border border-gray-200 snap-start shrink-0 group">
             <Image 
               src={product.image} 
               alt={`${product.title} Front View`} 
               fill 
               className="object-cover" 
             />
             <button className="hidden lg:block absolute bottom-4 right-4 text-gray-400 hover:text-black transition z-10 bg-white/50 rounded-full p-1 opacity-0 group-hover:opacity-100">
               <Plus className="w-5 h-5" />
             </button>
          </div>
          <div className="min-w-full lg:min-w-0 aspect-[4/5] lg:aspect-square bg-white flex items-center justify-center relative border-b lg:border border-gray-200 snap-start shrink-0 group">
             <Image 
               src={product.image} 
               alt={`${product.title} Detail View`} 
               fill 
               className="object-cover" 
             />
             <button className="hidden lg:block absolute bottom-4 right-4 text-gray-400 hover:text-black transition z-10 bg-white/50 rounded-full p-1 opacity-0 group-hover:opacity-100">
               <Plus className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="w-full lg:w-[45%] flex flex-col px-4 pt-6 lg:pt-0 lg:px-0">
          
          <h1 className="text-3xl md:text-5xl font-black uppercase leading-[1.1] mb-3 text-black">
            {product.title}
          </h1>
          
          {product.badges && product.badges.length > 0 && (
            <div className="bg-[#333333] text-white text-[10px] tracking-widest font-bold px-2 py-1 uppercase w-max mb-5">
              {product.badges[0]}
            </div>
          )}

          <div className="text-xl font-bold text-black mb-8">
            {product.salePrice}
          </div>

          <hr className="border-gray-200 mb-8" />

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-black">size: <strong className="uppercase">{selectedSize}</strong></span>
              <button className="text-xs font-bold underline underline-offset-4 text-black hover:text-gray-600 transition">SIZE CHART</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] px-2 h-10 flex items-center justify-center text-sm font-bold border transition-colors
                    ${selectedSize === size ? "bg-black text-white border-black" : "bg-transparent text-black border-gray-300 hover:border-black"}
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* DESKTOP BUY BUTTONS (Hidden on mobile) */}
          <div className="hidden lg:flex gap-3 mb-3">
            <div className="flex items-center border border-gray-300 bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50 transition">
                <Minus className="w-4 h-4 text-black" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-black">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50 transition">
                <Plus className="w-4 h-4 text-black" />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#1a1a1a] hover:bg-black text-white font-bold text-sm tracking-wide uppercase transition-colors"
            >
              Add to cart
            </button>
          </div>
          <button className="hidden lg:block w-full bg-[#1a1a1a] hover:bg-black text-white font-bold text-sm tracking-wide uppercase py-4 transition-colors mb-8">
            Buy it now
          </button>


          {/* Actual Spotify Embed */}
          {product.track && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-black">Behind this piece</span>
              </div>
              
              <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/track/${product.track.spotifyId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          )}

          {/* Promo Banner */}
          <div className="bg-[#ff9e9e] text-black text-sm font-medium px-4 py-4 mb-4">
            use code <span className="font-bold italic">welcom3</span> for 5% off your first order.
          </div>

          {/* Info Blocks */}
          <div className="bg-white border border-gray-200 text-sm font-medium px-4 py-5 mb-4 text-black">
            order before 3 pm for next-day dispatch*
          </div>
          <div className="bg-white border border-gray-200 text-sm font-medium px-4 py-5 mb-8 text-black">
            <span className="font-bold block mb-1">easy exchanges</span>
            within 7 days of delivery*
          </div>

          {/* Share */}
          <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black hover:text-gray-600 transition mb-12">
            Share <Share className="w-4 h-4" />
          </button>


          {/* Product Description / Specs */}
          <div className="flex flex-col gap-6 mb-10 text-sm text-black">
            <div>
              <span className="font-bold block mb-1">style:</span>
              statement streetwear piece
            </div>
            <div>
              <span className="font-bold block mb-1">technical details:</span>
              premium tarnish-free plating, hand-polished finish
            </div>
            <div>
              <span className="font-bold block mb-1">composition:</span>
              stainless steel core / 18k gold physical vapor deposition
            </div>
          </div>

          {/* Accordions */}
          <div className="border-t border-gray-200">
            <details className="group cursor-pointer border-b border-gray-200">
              <summary className="flex items-center justify-between py-4 text-sm font-bold uppercase tracking-wider text-black list-none [&::-webkit-details-marker]:hidden">
                Care Instructions
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-4 text-sm text-gray-600">
                Keep away from harsh chemicals. Clean with a soft, dry cloth. Store in the provided StreetSync pouch when not in use.
              </div>
            </details>

            <details className="group cursor-pointer border-b border-gray-200">
              <summary className="flex items-center justify-between py-4 text-sm font-bold uppercase tracking-wider text-black list-none [&::-webkit-details-marker]:hidden">
                Disclaimer
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-4 text-sm text-gray-600">
                Each piece is custom-packaged. Slight variations in the blister pack artwork may occur.
              </div>
            </details>

            <details className="group cursor-pointer border-b border-gray-200">
              <summary className="flex items-center justify-between py-4 text-sm font-bold uppercase tracking-wider text-black list-none [&::-webkit-details-marker]:hidden">
                Exchange Policy
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-4 text-sm text-gray-600">
                We accept exchanges within 7 days if the blister packaging remains unopened and untampered with.
              </div>
            </details>
          </div>

        </div>
      </div>

      {/* 
        MOBILE STICKY BOTTOM BAR 
        This is the most important conversion element for mobile e-commerce. 
        It stays permanently glued to the bottom of the phone screen.
      */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 z-50 lg:hidden flex gap-2 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
         <div className="flex items-center justify-between border border-gray-300 bg-white rounded-md w-1/3">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3"><Minus className="w-4 h-4 text-black" /></button>
            <span className="text-sm font-bold text-black">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="p-3"><Plus className="w-4 h-4 text-black" /></button>
          </div>
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-[#1a1a1a] active:bg-black text-white font-bold text-sm tracking-wide uppercase rounded-md"
          >
            Add to cart
          </button>
      </div>
    </main>
  );
}
