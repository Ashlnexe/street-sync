import React from "react";
import ProductCard from "./ProductCard";

export default function StickyBestSellers({ bestSellers = [] }) {

  // Duplicate them so there are enough to demonstrate scrolling
  const scrollProducts = [...bestSellers, ...bestSellers, ...bestSellers];

  return (
    <section className="w-full bg-[#f4f4f4] border-b border-gray-200 relative">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Sticky Header */}
        <div className="w-full lg:w-1/2 relative">
          <div className="flex flex-col items-center text-center pt-12 pb-6 px-4 lg:sticky lg:top-0 lg:min-h-screen lg:justify-center">
            <h2 className="text-2xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight text-black">
              BEST SELLERS
            </h2>
            <p className="text-neutral-500 text-xs lg:text-base font-normal mt-2 tracking-wide lowercase">
              move in frequency. all in one place.
            </p>
          </div>
        </div>

        {/* Right Side: Scrolling Products */}
        <div className="w-full lg:w-1/2 p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {scrollProducts.map((product, idx) => (
              <ProductCard 
                key={idx} 
                product={product} 
                isSquare={true} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
