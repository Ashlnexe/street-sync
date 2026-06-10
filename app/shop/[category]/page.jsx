"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { products as allProducts } from "@/data/products";
import { usePathname } from "next/navigation";

export default function CategoryPage({ params }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  
  // Extract category from URL, default to 'all' if not found
  const pathParts = pathname.split('/');
  const rawCategory = pathParts[pathParts.length - 1] || 'all';
  const categoryTitle = rawCategory.replace(/-/g, ' ');

  // For now, since we only have a few products in data/products.js,
  // we'll just show all products to prevent empty pages, or filter by category if you add them later.
  const displayProducts = allProducts; 

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header & Filters */}
      <div className="pt-24 pb-6 px-4 md:px-8 border-b border-gray-200 sticky top-0 bg-white z-30">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black">
            {categoryTitle}
          </h1>
          <p className="text-neutral-500 text-xs md:text-sm font-normal mt-2 tracking-wide lowercase">
            culture observed. signal received.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
          ))}
        </div>
      </div>

      <QuickViewModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
