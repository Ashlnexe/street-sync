"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { products as allProducts } from "@/data/products";
import { usePathname } from "next/navigation";

export default function CollectionPage({ params }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  
  // Extract collection from URL
  const pathParts = pathname.split('/');
  const rawCollection = pathParts[pathParts.length - 1] || 'collection';
  const collectionTitle = rawCollection.replace(/-/g, ' ');

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
            {collectionTitle}
          </h1>
          <p className="text-neutral-500 text-xs md:text-sm font-normal mt-2 tracking-wide lowercase">
            curated for the culture.
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
