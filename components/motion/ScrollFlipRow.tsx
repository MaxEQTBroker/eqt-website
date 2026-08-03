"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

/**
 * A grid whose children FLIP IN ON SCROLL, one after another, like the "Where
 * we operate" card, but sequential across the row. The rotation is tied to
 * scroll position (you set the pace by scrolling), single-face (never mirrors),
 * and fades in as each card turns to face you. SSR renders the cards normally;
 * untouched under reduced-motion.
 */
export function ScrollFlipRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const items = Children.toArray(children);
  const wrap = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
    const n = items.length;
    const stagger = 0.5 / n; // each card starts after the previous
    const dur = 0.34; // scroll-fraction each flip takes (smaller = faster)

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Complete over a shorter pass so the flips feel quicker.
      const progress = clamp((vh * 0.92 - rect.top) / (vh * 0.8), 0, 1);
      refs.current.forEach((c, i) => {
        if (!c) return;
        const lp = clamp((progress - i * stagger) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - lp, 3);
        const angle = (1 - eased) * -88; // -88° (edge) → 0° (facing)
        const tx = (1 - eased) * 46; // fly in from the right (vw) as it flips
        c.style.transform = `perspective(1400px) translateX(${tx}vw) rotateY(${angle}deg)`;
        const edge = Math.abs(Math.cos((angle * Math.PI) / 180));
        c.style.opacity = String(clamp(edge * 2.6, 0, 1));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  return (
    <div ref={wrap} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          ref={(elp) => { refs.current[i] = elp; }}
          style={{ willChange: "transform, opacity", transformOrigin: "center center" }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
