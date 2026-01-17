import React, { useRef, useEffect, useState } from 'react';

const IMAGE_COUNT = 9;
const IMAGE_FILENAMES = Array.from({ length: IMAGE_COUNT }, (_, i) => `/image (${i + 1}).jpeg`);
const COLUMN_WIDTH = 240; // px
const IMAGE_GAP = 32; // px
const LOOP_DURATION = 50 * 1000; // ms (50s, double speed)

function prefersReducedMotion() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

const SideImageColumn = () => {
  const containerRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    let start;
    let frame;
    const totalHeight = container.scrollHeight;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % LOOP_DURATION;
      // Calculate scroll position (from bottom to top)
      const progress = elapsed / LOOP_DURATION;
      const scrollY = totalHeight * progress;
      container.style.transform = `translateY(-${scrollY}px)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isReducedMotion]);

  // Only show on desktop
  if (typeof window !== 'undefined') {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return null;
  }

  return (
    <aside
      aria-hidden="true"
      tabIndex={-1}
      className="side-image-column"
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: COLUMN_WIDTH,
        height: '100vh',
        background: 'var(--canvas, #F6F5F2)',
        zIndex: 0,
        display: 'none', // default hidden
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: IMAGE_GAP,
          paddingTop: IMAGE_GAP,
          paddingBottom: IMAGE_GAP,
          opacity: 0.7,
          filter: 'grayscale(0.3)',
          willChange: 'transform',
        }}
      >
        {IMAGE_FILENAMES.concat(IMAGE_FILENAMES[0]).map((src, idx) => (
          <img
            key={src + idx}
            src={src}
            alt=""
            draggable={false}
            style={{
              width: '100%',
              maxWidth: COLUMN_WIDTH,
              height: 'auto',
              objectFit: 'contain',
              pointerEvents: 'none',
              userSelect: 'none',
              border: 'none',
              boxShadow: 'none',
              margin: 0,
              opacity: 0.85,
              transition: 'none',
            }}
          />
        ))}
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .side-image-column {
            display: block !important;
          }
        }
        @media (max-width: 1023px) {
          .side-image-column {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
};

export default SideImageColumn;
