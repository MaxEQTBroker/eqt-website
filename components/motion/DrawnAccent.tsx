"use client";

import { useEffect, useRef } from "react";

/**
 * Minimalist abstract line-art that DRAWS ITSELF when scrolled into view
 * (animated stroke-dashoffset), then rests. Decorative, aria-hidden, and static
 * under prefers-reduced-motion. Flowing contour-style curves in the accent blue.
 */
export function DrawnAccent({
  className = "",
  color = "var(--accent-500)",
  strokeWidth = 1.25,
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = Array.from(el.querySelectorAll("path"));

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = reduced ? "0" : String(len);
    });
    if (reduced || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            paths.forEach((p, i) => {
              p.style.transition = `stroke-dashoffset 1.8s ${0.18 * i}s cubic-bezier(0.22,1,0.36,1)`;
              p.style.strokeDashoffset = "0";
            });
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 300"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <path d="M6 168 C 64 158, 96 96, 150 24" opacity="0.35" />
      <path d="M18 210 C 84 132, 156 108, 232 44" opacity="0.7" />
      <path d="M40 250 C 118 176, 196 156, 292 92" opacity="0.5" />
      <path d="M70 288 C 150 224, 228 210, 300 156" opacity="0.3" />
    </svg>
  );
}
