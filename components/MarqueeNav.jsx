import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const MARQUEE_TEXT = "All Day, High Decibels™";
const CATEGORIES = [
  "Best Sellers",
  "Hoodies",
  "Full Sleeves",
  "Baby Tees",
  "Shorts",
  "Caps",
  "Accessories",
];

export default function MarqueeNav({ initialActive = 2 }) {
  const [activeIdx, setActiveIdx] = useState(initialActive);
  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    centerActive();
  }, [activeIdx]);

  function centerActive() {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const items = track.querySelectorAll("[data-cat]");
    const activeEl = items[activeIdx];
    if (!activeEl) return;

    const wrapWidth = wrap.offsetWidth;
    const activeLeft = activeEl.offsetLeft;
    const activeWidth = activeEl.offsetWidth;
    const offset = activeLeft - wrapWidth / 2 + activeWidth / 2;

    track.style.transform = `translateX(${-Math.max(0, offset - 60)}px)`;
  }

  const getItemStyle = (i) => {
    const dist = Math.abs(i - activeIdx);
    const color = dist === 0 ? "#111" : dist === 1 ? "#999" : "#ccc";
    return {
      color,
      transition: "color 0.3s ease",
    };
  };

  return (
    <div style={{ width: "100%", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      {/* Marquee Section */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          padding: "14px 0",
          whiteSpace: "nowrap",
          display: "flex",
          backgroundColor: "#000",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            // Increased duration for a slower scroll and updated animation name
            animation: "marquee-scroll-right 30s linear infinite",
          }}
        >
          {/* Duplicated text enough times to create a seamless infinite loop */}
          {[...Array(6)].map((_, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                textTransform: "uppercase",
                paddingRight: "3rem",
                color: "#fff",
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Nav Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 20px",
          borderBottom: "none",
        }}
      >
        <div
          ref={wrapRef}
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {CATEGORIES.map((name, i) => (
              <span
                key={name}
                data-cat
                onClick={() => setActiveIdx(i)}
                style={{
                  ...getItemStyle(i),
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "0 2rem",
                  cursor: "pointer",
                  userSelect: "none",
                  flexShrink: 0,
                  display: "flex",       // Flex ensures the arrow and text align correctly
                  alignItems: "center",
                }}
              >
                {i === activeIdx && (
                  <ArrowRight 
                    size={34} 
                    strokeWidth={1.5}
                    style={{ 
                      color: "#111", 
                      marginRight: "12px"
                    }}
                  />
                )}
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* View all */}
        <ViewAllButton />
      </div>

      {/* Keyframe injection: moving from -50% to 0 moves the text to the right */}
      <style>{`
        @keyframes marquee-scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function ViewAllButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        border: "1px solid #aaa",
        background: hovered ? "#f5f5f5" : "transparent",
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        fontWeight: 400,
        padding: "8px 24px",
        borderRadius: 6,
        cursor: "pointer",
        color: "#111",
        transition: "all 0.2s ease",
      }}
    >
      view all
    </button>
  );
}
