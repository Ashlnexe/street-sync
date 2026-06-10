"use client";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

export default function ProductSection({ title, subtitle, products, tabs }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Default to the first tab (usually "All") if tabs exist
  const [activeTab, setActiveTab] = useState(tabs ? tabs[0].id : null);

  if (!products || products.length === 0) return null;

  // Filter products based on the active selection tab
  const displayProducts = tabs && activeTab !== "all" 
    ? products.filter(p => p.category === activeTab) 
    : products;

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8">
      
      {/* Title Header */}
      <div className="flex flex-col items-center text-center pt-12 pb-6 px-4">
        <h2 className="text-3xl font-black uppercase tracking-tight text-black">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-500 text-xs font-normal mt-2 tracking-wide lowercase">
            {subtitle}
          </p>
        )}
      </div>

      {/* ========================================== */}
      {/* THE SELECTION COMPONENT (Clickable Tabs)   */}
      {/* ========================================== */}
      {tabs && (
        <div className="flex items-center justify-center gap-3 overflow-x-auto no-scrollbar mb-8 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-black border-b-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-8 md:gap-4 pb-4">
        {displayProducts.map((product, idx) => (
          <ProductCard 
            key={idx} 
            product={product} 
            onQuickView={(p) => setSelectedProduct(p)} 
          />
        ))}
      </div>

      {/* Minimalist View All Button */}
      <div className="w-full flex justify-center pt-8 pb-4">
        <Link href="/shop" className="border border-black text-black text-xs font-medium uppercase tracking-widest px-10 py-3 rounded-md transition-all duration-200 active:bg-green-600 active:text-white active:border-green-600 hover:bg-black hover:text-white">
          view all
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
