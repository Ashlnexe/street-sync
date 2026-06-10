"use client";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, onQuickView, isSquare = false }) {
  const { title, salePrice, originalPrice, rating, badges = [], slug, image, hoverImage } = product;

  return (
    <div className="group flex flex-col w-full relative">
      
      {/* Upper Half: Image & Badges (Links to product) */}
      <div className={`relative w-full ${isSquare ? 'aspect-square' : 'aspect-[3/4]'} bg-[#f4f4f4] overflow-hidden`}>
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
        
        {/* Badges - Bottom Left Stack */}
        {badges.length > 0 && (
          <div className="absolute bottom-2 left-2 z-10 flex flex-col gap-1 items-start pointer-events-none">
            {badges.map((badge, idx) => {
              const isSale = badge.toLowerCase().includes('save');
              return (
                <span
                  key={idx}
                  className={`${isSale ? 'bg-green-600' : 'bg-black'} text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 shadow-sm`}
                >
                  {badge}
                </span>
              );
            })}
          </div>
        )}

        {/* Shopping Bag Icon - Bottom Right */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
          }}
          className="absolute bottom-2 right-2 z-30 bg-white border border-black/20 p-1.5 md:p-2 hover:border-black transition-colors rounded-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-4 md:h-4 text-black">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </button>
      </div>

      {/* Lower Half: Product Details (Links to product) */}
      <Link href={`/product/${slug}`} className="pt-2.5 pb-2 block flex-grow">
        <h3 className="text-[11px] md:text-sm font-bold uppercase tracking-tight text-black line-clamp-2 md:truncate group-hover:underline underline-offset-4 decoration-2 leading-tight md:leading-normal">
          {title}
        </h3>
        
        <div className="flex flex-col mt-1.5 md:mt-1">
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
            <span className="text-xs md:text-sm font-medium text-[#c45353] md:text-gray-500">{salePrice}</span>
            {originalPrice && (
              <span className="text-[10px] md:text-xs font-medium text-gray-400 line-through decoration-gray-400">{originalPrice}</span>
            )}
          </div>
          
          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 md:w-3.5 md:h-3.5 ${i < Math.floor(rating || 5) ? 'fill-[#ffb347] text-[#ffb347]' : 'text-gray-300 fill-gray-300'}`} />
              ))}
            </div>
            {rating && (
              <span className="text-[10px] md:text-xs font-bold text-gray-700 ml-0.5">({rating})</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
