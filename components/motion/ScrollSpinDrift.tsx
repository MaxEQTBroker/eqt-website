"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-linked "spin + drift": as the element scrolls up past the viewport it
 * turns on the Y axis, drifts to the left and gently scales/fades — a cinematic
 * pass-by. Content is server-rendered and untouched under reduced-motion.
 */
export function ScrollSpinDrift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      // p: 0 while the card sits low in the viewport, → 1 as it rises past.
      let p = (vh * 0.82 - center) / (vh * 0.62);
      p = Math.max(0, Math.min(1, p));
      const rot = -p * 68; // spin (kept < 90° so card text never mirrors)
      const tx = -(p * p) * 190; // drift left, accelerating
      const scale = 1 - p * 0.12;
      el.style.transform = `perspective(1200px) translateX(${tx}px) rotateY(${rot}deg) scale(${scale})`;
      el.style.opacity = String(1 - p * 0.3);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform, opacity", transformOrigin: "center" }}
    >
      {children}
    </div>
  );
}
