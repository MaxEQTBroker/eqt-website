"use client";

import { useEffect, useRef, useState } from "react";
import type { TrustSignal } from "@/lib/data/types";

/**
 * Big brokerage numbers that climb as the row scrolls up (scroll-linked, not a
 * one-shot). No boxes or dividers — just oversized figures with quiet labels.
 * SSR renders final values for crawlers; static under reduced-motion.
 */
function parse(text: string) {
  const m = text.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, raw, suffix] = m;
  return { prefix, num: parseFloat(raw.replace(/,/g, "")), suffix, decimals: raw.includes(".") ? raw.split(".")[1].length : 0 };
}
const fmt = (v: number, d: number) => (d > 0 ? v.toFixed(d) : Math.round(v).toLocaleString("en-AE"));

export function MetricsClimb({ signals }: { signals: TrustSignal[] }) {
  const items = signals.slice(0, 4);
  const [p, setP] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(clamp((vh - rect.top) / (vh * 0.72), 0, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const eased = Math.min(1, Math.pow(p, 2) * 1.14);

  return (
    <section className="border-t border-line">
      <div ref={ref} className="container-lux flex flex-wrap items-start justify-center gap-x-14 gap-y-12 py-16 md:gap-x-28 md:py-24">
        {items.map((s) => {
          const parsed = parse(s.value);
          const disp = parsed ? `${parsed.prefix}${fmt(parsed.num * eased, parsed.decimals)}${parsed.suffix}` : s.value;
          return (
            <div key={s.label} className="min-w-[7.5rem] text-center">
              <div className="whitespace-nowrap font-display text-[clamp(1.9rem,4vw,3.5rem)] font-medium leading-none text-ink tabular-nums">
                {disp}
              </div>
              <div className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-faint">{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
