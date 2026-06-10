import React from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function StickyBestSellers() {
  // Grab best sellers from data
  const bestSellers = products.filter(p => p.tags?.includes("BESTSELLER"));
  
  // Duplicate them so there are enough to demonstrate scrolling
  const scrollProducts = [...bestSellers, ...bestSellers, ...bestSellers];

  return (
    <section className="w-full bg-[#f4f4f4] border-b border-gray-200 relative">
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* Left Side: Sticky Header */}
        <div className="lg:w-1/2 relative">
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col items-center justify-center text-center p-12 lg:p-8">
            <h2 className="text-5xl md:text-7xl font-bold uppercase text-black mb-4 tracking-tight">
              Best Sellers
            </h2>
            <p className="text-sm md:text-base font-medium text-gray-600 tracking-wide lowercase">
              most loved pieces. all in one place.
            </p>
          </div>
        </div>

        {/* Right Side: Scrolling Products */}
        <div className="lg:w-1/2 p-4 md:p-8">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {scrollProducts.map((product, idx) => (
              <ProductCard 
                key={idx} 
                product={product} 
                isSquare={true} 
                // Since this section is bg-white, the default ProductCard bg-[#f4f4f4] will provide a nice contrast
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
