"use client";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal"; // Assuming you have this from mortic

export default function ProductSection({ title, products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-12 px-4 md:px-8 border-b border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-black">{title}</h2>
        <Link href="/shop" className="text-xs md:text-sm font-bold uppercase tracking-widest underline underline-offset-4 hover:text-gray-500 text-black transition-colors">
          View all
        </Link>
      </div>

      <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4 md:px-0 md:mx-0">
        {products.map((product, idx) => (
          <ProductCard 
            key={idx} 
            product={product} 
            onQuickView={(p) => {
              setSelectedProduct(p);
              setIsModalOpen(true);
            }} 
          />
        ))}
      </div>

      {isModalOpen && (
        <QuickViewModal 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
}
