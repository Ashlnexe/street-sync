"use client";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, onQuickView }) {
  const { title, salePrice, originalPrice, rating, badges = [], slug, image, hoverImage } = product;

  return (
    <div className="group flex flex-col shrink-0 w-[75vw] md:w-full snap-start relative">
      
      {/* Upper Half: Image & Badges (Links to product) */}
      <div className="relative w-full aspect-[3/4] bg-[#f4f4f4] overflow-hidden">
        <Link href={`/product/${slug}`} className="absolute inset-0 z-0 block">
          {image ? (
            <>
              <Image 
                src={image} 
                alt={title} 
                fill 
                className="object-cover object-center transition-opacity duration-500 ease-in-out group-hover:opacity-0" 
              />
              {hoverImage && (
                <Image 
                  src={hoverImage} 
                  alt={`${title} alternate`} 
                  fill 
                  className="object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" 
                />
              )}
            </>
          ) : (
            <span className="flex items-center justify-center h-full text-gray-400 text-sm font-bold uppercase">No Image</span>
          )}
        </Link>
        
        {/* Badges - Top Left Stack */}
        {badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-black text-white text-[10px] md:text-xs font-black px-2 py-1 uppercase tracking-widest leading-none shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Hover Button - Bottom Anchored, Slide Up */}
        <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button 
            onClick={(e) => {
              e.preventDefault(); // Prevents the link underneath from triggering
              e.stopPropagation();
              if (onQuickView) onQuickView(product);
            }}
            className="w-full bg-white text-black font-black uppercase text-xs md:text-sm py-3.5 border-t border-gray-200 hover:bg-black hover:text-white transition-colors"
          >
            Choose options
          </button>
        </div>
      </div>

      {/* Lower Half: Product Details (Links to product) */}
      <Link href={`/product/${slug}`} className="pt-3 pb-2 block flex-grow">
        <h3 className="text-sm md:text-base font-bold uppercase tracking-tight text-black truncate group-hover:underline underline-offset-4 decoration-2">
          {title}
        </h3>
        
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm md:text-base font-black text-black">{salePrice}</span>
            {originalPrice && (
              <span className="text-xs md:text-sm font-bold text-gray-500 line-through">{originalPrice}</span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
              ))}
            </div>
            <span className="text-xs font-bold text-black">({rating || "5.0"})</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
