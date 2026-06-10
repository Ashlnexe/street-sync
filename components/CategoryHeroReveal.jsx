"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import CategoryShowcase from "./CategoryShowcase";

const TAGLINE = ["WHERE", "YOUR", "FAVOURITE", "MUSIC", "MEETS", "YOUR", "WARDROBE."];

// Tiny helpers
const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 2); // quadratic ease-out

export default function CategoryHeroReveal() {
  const wrapperRef  = useRef(null);
  const categoryRef = useRef(null);
  const textRef     = useRef(null);          // the whole text row
  const wordRefs    = useRef([]);            // one ref per word span

  useEffect(() => {
    const onScroll = () => {
      const wrapper  = wrapperRef.current;
      const category = categoryRef.current;
      const text     = textRef.current;
      if (!wrapper || !category || !text) return;

      if (window.innerWidth < 768) {
        // Disable scroll animation on mobile
        text.style.transform = `translate(-50%, -50%)`;
        wordRefs.current.forEach((el) => {
          if (el) el.style.opacity = 1;
        });
        return;
      }

      const scrollY    = window.scrollY;
      const wrapperTop = wrapper.getBoundingClientRect().top + scrollY;
      const scrolledIn = Math.max(0, scrollY - wrapperTop);
      const categoryH  = category.offsetHeight; // height of the curtain (~100 vh)
      const viewH      = window.innerHeight;

      // Text rises from bottom of hero (+50 vh below centre) → exact centre (0 vh)
      const phase1  = clamp(scrolledIn / categoryH);
      const p1Ease  = easeOut(phase1);
      const yOffset = 50 * (1 - p1Ease); // 50 vh → 0 vh
      text.style.transform = `translate(-50%, calc(-50% + ${yOffset}vh))`;

      // ── PHASE 2  ─────────────────────────────────────────────────────────────
      // 0 → 1 AFTER the curtain is fully gone (scrolledIn > categoryH).
      // Each word lights up sequentially as you keep scrolling.
      const highlightSpace = viewH * 0.9; // 90 vh worth of scroll for the highlight sweep
      const phase2 = clamp((scrolledIn - categoryH) / highlightSpace);

      const n = TAGLINE.length;
      wordRefs.current.forEach((el, i) => {
        if (!el) return;

        // Each word owns an equal slice of the phase2 range
        const sliceStart = i / n;
        const sliceEnd   = (i + 1) / n;
        const t = clamp((phase2 - sliceStart) / (sliceEnd - sliceStart));
        const wordEase = easeOut(t);

        // Dim base (0.22) → fully bright (1.0)
        el.style.opacity = 0.22 + 0.78 * wordEase;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount so initial position is correct
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /*
     *  Scroll budget breakdown (categoryH ≈ 100 vh):
     *
     *  wrapper height  = 100 vh (hero) + categoryH − 100 vh (neg margin) + 200 vh (spacer)
     *                  = categoryH + 200 vh  ≈  300 vh
     *  sticky budget   = wrapper − 100 vh viewport  ≈  200 vh
     *
     *  Phase 1:  0 → 100 vh scroll → curtain lifts, text rises to centre
     *  Phase 2: 100 → 190 vh scroll → words light up one by one
     *  Buffer:  190 → 200 vh → hero sits fully revealed before scrolling away
     */
    <div ref={wrapperRef} className="relative w-full">

      {/* ══ HERO — sticky on desktop, relative on mobile ══ */}
      <div className="relative md:sticky top-0 h-[60vh] md:h-screen z-0 overflow-hidden bg-[#0a0a0a]">
        
        {/* Static full-cover image */}
        <div className="absolute inset-0">
          <Image
            src="/tyler-cars-hero.jpg"
            alt="Where your favourite music meets your wardrobe"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle dark veil */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/40" />
        </div>

        {/* ── Tagline row ── */}
        <div
          ref={textRef}
          className="absolute top-1/2 left-1/2 flex flex-wrap md:flex-nowrap justify-center gap-1.5 md:gap-[0.32em] w-full px-4"
          style={{
            transform: "translate(-50%, -50%)",
            willChange: "transform",
          }}
        >
          {TAGLINE.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordRefs.current[i] = el)}
              className="text-lg sm:text-2xl md:text-[clamp(1.1rem,2.6vw,2.3rem)] font-black tracking-wider uppercase text-white opacity-100 md:opacity-20"
              style={{
                fontFamily: "var(--font-hanken), 'Helvetica Neue', Arial, sans-serif",
                willChange: "opacity",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ══ CATEGORY CURTAIN ══ */}
      <div
        ref={categoryRef}
        className="relative z-10 mt-0 md:-mt-[100vh]"
      >
        <CategoryShowcase />
      </div>

      {/* ══ SPACER for desktop scroll highlight phase ══ */}
      <div className="hidden md:block h-[200vh] relative z-1" />
    </div>
  );
}
