"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated "climbing" number. SSR-safe and content-first: the final value is
 * rendered in the server HTML (so crawlers/AEO get the real figure), and the
 * count-up from zero only runs on the client once the stat scrolls into view.
 * Respects prefers-reduced-motion.
 *
 * Pass a display string like "AED 3.2B+", "180+", "24" or "72%", the numeric
 * part is parsed out and animated, prefix/suffix are preserved.
 */
function parse(text: string) {
  const match = text.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, rawNum, suffix] = match;
  const num = parseFloat(rawNum.replace(/,/g, ""));
  const decimals = rawNum.includes(".") ? rawNum.split(".")[1].length : 0;
  return { prefix, num, suffix, decimals };
}

function format(value: number, decimals: number) {
  return decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("en-AE");
}

export function CountUp({
  text,
  duration = 1900,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const parsed = parse(text);
  const ref = useRef<HTMLSpanElement>(null);
  // Start at the final value so SSR + first client render show the real number.
  const [display, setDisplay] = useState(parsed ? parsed.num : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
              setDisplay(parsed.num * eased);
              if (p < 1) requestAnimationFrame(tick);
              else setDisplay(parsed.num);
            };
            // Snap to zero the moment it enters view, then climb.
            setDisplay(0);
            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!parsed) return <span className={className}>{text}</span>;

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {format(display, parsed.decimals)}
      {parsed.suffix}
    </span>
  );
}
