"use client";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

export default function ProductSection({ title, products, tabs }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Default to the first tab (usually "All") if tabs exist
  const [activeTab, setActiveTab] = useState(tabs ? tabs[0].id : null);

  if (!products || products.length === 0) return null;

  // Filter products based on the active selection tab
  const displayProducts = tabs && activeTab !== "all" 
    ? products.filter(p => p.category === activeTab) 
    : products;

  return (
    <section className="w-full py-16 md:py-20 px-4 md:px-8 border-b border-gray-200">
      
      {/* Title Header */}
      <div className="flex items-center justify-between mb-16 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-bold uppercase text-black leading-none">
          {title}
        </h2>
        <Link href="/shop" className="hidden md:flex items-center justify-center text-sm font-medium border border-black/20 rounded-md px-8 py-2.5 hover:border-black transition-colors text-black lowercase">
          view all
        </Link>
      </div>

      {/* ========================================== */}
      {/* THE SELECTION COMPONENT (Clickable Tabs)   */}
      {/* ========================================== */}
      {tabs && (
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mb-8 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 text-[10px] md:text-xs font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4 md:px-0 md:mx-0">
        {displayProducts.map((product, idx) => (
          <ProductCard 
            key={idx} 
            product={product} 
            onQuickView={(p) => setSelectedProduct(p)} 
          />
        ))}
      </div>

      {/* Mobile View All Link */}
      <div className="md:hidden mt-6 flex justify-center w-full">
        <Link href="/shop" className="text-xs font-bold uppercase tracking-widest underline underline-offset-4 hover:text-gray-500 text-black transition-colors">
          View all
        </Link>
      </div>

      <QuickViewModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}
