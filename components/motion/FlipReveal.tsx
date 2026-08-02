"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal where the child FLIES IN FROM THE RIGHT while flipping on the Y
 * axis, then lands in place. An outer wrapper (kept at its normal position) is
 * what's observed, so the trigger still fires even though the inner element
 * starts off-screen right. Staggered via `delay` for a one-by-one landing.
 * Content is server-rendered; untouched under reduced-motion.
 */
export function FlipReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const el = inner.current;
    if (!o || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    el.style.opacity = "0";
    el.style.transform = "perspective(1300px) translateX(48vw) rotateY(-82deg)";
    el.style.transformOrigin = "center center";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.transition = `opacity 0.8s ${delay}ms var(--ease-lux), transform 1.3s ${delay}ms var(--ease-lux)`;
            el.style.opacity = "1";
            el.style.transform = "perspective(1300px) translateX(0) rotateY(0deg)";
            io.unobserve(o);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(o);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} style={{ willChange: "transform, opacity" }}>
        {children}
      </div>
    </div>
  );
}
