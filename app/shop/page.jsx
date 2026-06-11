"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { useProducts } from "@/hooks/use-products";

export default function ShopPage() {
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products: allProducts, loading } = useProducts();

  const filteredProducts = filter === "all"
    ? allProducts
    : allProducts.filter(p => p.category === filter);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header & Filters */}
      <div className="pt-24 pb-0 px-4 md:px-8 border-b border-gray-200 sticky top-0 bg-white z-30">
        <div className="flex flex-col items-start mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black">
            ALL PRODUCTS
          </h1>
          <p className="text-neutral-500 text-xs md:text-sm font-normal mt-2 tracking-wide lowercase">
            concrete rhythm. full frequency.
          </p>
        </div>
        
        <div className="flex gap-6 overflow-x-auto no-scrollbar w-full">
          {["all", "tees", "hoodies", "waffle"].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[10px] md:text-xs font-bold uppercase tracking-widest pb-3 border-b-[3px] transition-colors whitespace-nowrap ${filter === cat ? "border-black text-black" : "border-transparent text-gray-400 hover:text-black"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 md:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm uppercase tracking-widest">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
