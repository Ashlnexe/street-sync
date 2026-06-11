"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import MarqueeNav from "@/components/MarqueeNav";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import ShopTheLook from "@/components/ShopTheLook";
import StickyBestSellers from "@/components/StickyBestSellers";
import CategoryShowcase from "@/components/CategoryShowcase";
import { products } from "@/data/products";

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setMounted(true);
    setLoaded(true);
  }, []);

  if (!mounted) return null;

  const newInProducts = products.filter(p => p.tags?.includes("NEW IN"));
  const bestSellers = products.filter(p => p.tags?.includes("BESTSELLER"));
  const endOfSeason = products.filter(p => p.tags?.includes("END OF SEASON"));

  const baseMarquee = [
    {
      id: "g1",
      slug: "fell-in-love",
      title: "FELL IN LOVE IN OCT V2 WASHED OVERSIZED TEE",
      salePrice: "₹ 1,799.00",
      rating: "4.7",
      badges: ["BESTSELLER", "BACK IN STOCK"],
      image: "/products/product-50.jpeg",
    },
    {
      id: "g2",
      slug: "music-money-fashion",
      title: "MUSIC MONEY FASHION WAFFLE OVERSIZED FULL SLEEVE",
      salePrice: "₹ 1,699.00",
      originalPrice: "₹ 2,199.00",
      rating: "4.7",
      badges: ["BESTSELLER", "ALL SEASON", "SAVE 23%"],
      image: "/products/product-53.jpeg",
      hoverImage: "/products/product-53-hover.jpeg",
    },
    {
      id: "g3",
      slug: "less-i-know",
      title: "THE LESS I KNOW THE BETTER OVERSIZED TEE",
      salePrice: "₹ 1,499.00",
      rating: "4.7",
      badges: [],
      image: "/products/product-56.jpeg",
    },
    {
      id: "g4",
      slug: "90210-waffle",
      title: "90210 WAFFLE OVERSIZED FULL SLEEVE",
      salePrice: "₹ 1,799.00",
      originalPrice: "₹ 1,999.00",
      rating: "4.5",
      badges: ["BESTSELLER", "BACK IN STOCK", "SAVE 10%"],
      image: "/products/product-57.jpeg",
    }
  ];

  const marqueeProducts = Array.from({ length: 15 }, (_, i) => ({
    ...baseMarquee[i % 4],
    id: `g${i + 1}`,
  }));

  return (
    <div
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
      className="min-h-screen bg-white text-black flex flex-col"
    >
      <Navbar />

      <main className="flex-grow">
        <Hero />

        <ProductSection title="New In" subtitle="concrete rhythm. minimal form." products={newInProducts} />


        {/* END OF SEASON */}
        <ProductSection title="End of Season Sale" subtitle="last few sizes. move quick." products={endOfSeason} />

        {/* ========================================== */}
        {/* MARQUEE NAV - Category Selector             */}
        {/* ========================================== */}
        <MarqueeNav initialActive={0} />

        {/* ========================================== */}
        {/* GRID BELOW MARQUEE NAV                     */}
        {/* ========================================== */}
        <section className="w-full px-4 md:px-8 py-8 mb-12">
          <div className="flex md:grid md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4 md:px-0 md:mx-0">
            {marqueeProducts.map((product, idx) => (
              <div key={idx} className="min-w-[160px] shrink-0 md:min-w-0 md:shrink snap-start">
                <ProductCard product={product} onQuickView={(p) => setSelectedProduct(p)} isSquare={true} />
              </div>
            ))}
          </div>
        </section>

        {/* SHOP THE LOOK */}
        <ShopTheLook />

        {/* STICKY BEST SELLERS */}
        <StickyBestSellers />

        {/* ========================================== */}
        {/* CATEGORY SHOWCASE                          */}
        {/* ========================================== */}
        <CategoryShowcase />

        <QuickViewModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </main>
    </div>
  );
}