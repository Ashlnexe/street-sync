"use client";
import React, { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: 1, title: "TEES", imageLabel: "[Tees Category Image]" },
  { id: 2, title: "HOODIES", imageLabel: "[Hoodies Category Image]" },
  { id: 3, title: "ACCESSORIES", imageLabel: "[Accessories Category Image]" },
];

export default function CategoryShowcase() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);

  return (
    <section className="w-full bg-[#f4f4f4] border-b border-gray-200">
      <div className="flex flex-col lg:flex-row w-full lg:min-h-screen">
        
        {/* Left Side: Category List */}
        <div className="lg:w-1/2 relative min-h-[50vh] lg:min-h-0">
          
          {/* Section Label */}
          <div className="absolute top-6 left-6 lg:top-10 lg:left-10 flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-black" />
            <span className="text-xs font-medium uppercase tracking-widest text-black">
              Our Categories
            </span>
          </div>

          <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 w-full max-w-xl pr-12 lg:pr-20">
            {CATEGORIES.map((cat, idx) => (
              <Link 
                href={`/shop/${cat.title.toLowerCase().replace(" ", "-")}`} 
                key={cat.id}
                onMouseEnter={() => setActiveId(cat.id)}
                className={`block group py-4 md:py-6 border-gray-300 cursor-pointer text-left transition-opacity duration-300 ${activeId === cat.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'} ${idx !== CATEGORIES.length - 1 ? 'border-b' : ''}`}
              >
                <h2 className="text-2xl md:text-4xl font-semibold uppercase text-black tracking-tight">
                  {cat.title}
                </h2>
              </Link>
            ))}
          </div>

        </div>

        {/* Right Side: Showcase Image */}
        <div className="lg:w-1/2 relative bg-[#e5e5e5] min-h-[50vh] lg:min-h-screen overflow-hidden">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`absolute inset-0 flex items-center justify-center text-gray-500 font-bold uppercase text-xl transition-opacity duration-700 ease-in-out ${
                activeId === cat.id ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* PLACEHOLDER: Replace this div with actual <img /> or Next.js <Image /> */}
              <div className="w-full h-full bg-[#eaeaeb] flex items-center justify-center">
                {cat.imageLabel}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
