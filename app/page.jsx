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
import { useProducts } from "@/hooks/use-products";

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, loading } = useProducts();

  useEffect(() => {
    setMounted(true);
    setLoaded(true);
  }, []);

  if (!mounted) return null;

  const newInProducts = products.filter(p => p.tags?.includes("NEW IN"));
  const bestSellers = products.filter(p => p.tags?.includes("BESTSELLER"));
  const endOfSeason = products.filter(p => p.tags?.includes("END OF SEASON"));

  const fallbackMarquee = [
    {
      id: "g1",
      slug: "static-heavy-zip-hoodie",
      title: "Static Heavy Zip-Up Hoodie",
      salePrice: "₹ 0.00",
      rating: "4.9",
      badges: ["BESTSELLER", "LAST FEW SIZES"],
      image: "/products/product-1.jpeg",
    },
    {
      id: "g2",
      slug: "noise-waffle-full-sleeve",
      title: "Noise Complaint Waffle Full Sleeve",
      salePrice: "₹ 0.00",
      rating: "4.8",
      badges: ["BESTSELLER"],
      image: "/products/product-2.jpeg",
    },
    {
      id: "g3",
      slug: "reverb-baby-tee",
      title: "Reverb Cropped Baby Tee",
      salePrice: "₹ 0.00",
      rating: "4.9",
      badges: ["BESTSELLER", "RESTOCKED"],
      image: "/products/product-3.jpeg",
      hoverImage: "/products/product-3-hover.jpeg",
    },
    {
      id: "g4",
      slug: "midnight-echo-oversized",
      title: "Midnight Echo Oversized Tee",
      salePrice: "₹ 0.00",
      rating: "5",
      badges: ["BESTSELLER", "BACK IN STOCK"],
      image: "/products/product-45.jpeg",
    }
  ];

  const baseMarquee = products && products.length > 0 ? products : fallbackMarquee;

  const marqueeProducts = Array.from({ length: 15 }, (_, i) => ({
    ...baseMarquee[i % baseMarquee.length],
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
        <StickyBestSellers bestSellers={bestSellers} />

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