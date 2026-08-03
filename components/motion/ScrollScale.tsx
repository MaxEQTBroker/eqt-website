"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Subtly scales its child as it passes through the viewport (gerax-style) — a
 * slow zoom that adds life without motion noise. Pure enhancement; static under
 * reduced-motion. Best wrapped around an image inside an `overflow-hidden` box.
 */
export function ScrollScale({
  children,
  from = 1.12,
  to = 1.0,
  className = "",
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the element's centre is at the bottom of the viewport → 1 at top.
      const center = rect.top + rect.height / 2;
      const p = clamp(1 - center / vh, 0, 1);
      const scale = from + (to - from) * p;
      el.style.transform = `scale(${scale.toFixed(4)})`;
    };
    el.style.willChange = "transform";
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [from, to]);

  return (
    <div ref={ref} className={className} style={{ position: "relative", height: "100%", width: "100%" }}>
      {children}
    </div>
  );
}
