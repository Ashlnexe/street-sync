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
    <div ref={wrapperRef} style={{ position: "relative" }}>

      {/* ══ HERO — sticky, z-index 0, sits behind everything ══ */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 0,
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {/* Static full-cover image — no parallax */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/tyler-cars-hero.jpg"
            alt="Where your favourite music meets your wardrobe"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          {/* Subtle dark veil so white text reads cleanly */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.40) 100%)",
            }}
          />
        </div>

        {/* ── Tagline row
             Initially positioned 38 vh BELOW the vertical centre.
             The scroll handler raises it to exactly centre (translateY -50%)
             as the curtain lifts, then freezes it there. ── */}
        <div
          ref={textRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            // Initial transform — scroll handler overrides this on every tick
            transform: "translate(-50%, calc(-50% + 50vh))",
            display: "flex",
            gap: "0 0.32em",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {TAGLINE.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordRefs.current[i] = el)}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-hanken), 'Helvetica Neue', Arial, sans-serif",
                fontSize: "clamp(1.1rem, 2.6vw, 2.3rem)",
                fontWeight: 800,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                color: "#fff",
                opacity: 0.22,          // start dim; scroll handler brightens each word
                willChange: "opacity",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ══ CATEGORY CURTAIN — z-index 10, scrolls away naturally ══ */}
      <div
        ref={categoryRef}
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "-100vh", // pull up to cover the hero completely at scroll=0
        }}
      >
        <CategoryShowcase />
      </div>

      {/* ══ SPACER — transparent; extends sticky budget for phase-2 highlighting ══ */}
      <div
        style={{
          height: "200vh",
          position: "relative",
          zIndex: 1,
          // no background → hero shows through
        }}
      />
    </div>
  );
}
