"use client";

import { useEffect, useRef, useState } from "react";
import { BackgroundVideo } from "@/components/motion/BackgroundVideo";
import type { TrustSignal } from "@/lib/data/types";

/**
 * Stats over villa footage. The figures CLIMB from 0 as the block scrolls up —
 * tied to scroll position (NOT a pinned scrub), so scrolling never stops: they
 * start rising the moment the zeros appear and reach full by the time the
 * heading leaves the top. SSR renders final values for crawlers; static (full)
 * under reduced-motion.
 */
function parse(text: string) {
  const m = text.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, raw, suffix] = m;
  return {
    prefix,
    num: parseFloat(raw.replace(/,/g, "")),
    suffix,
    decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
  };
}
function fmt(v: number, d: number) {
  return d > 0 ? v.toFixed(d) : Math.round(v).toLocaleString("en-AE");
}

export function StatsConvergeClient({ signals }: { signals: TrustSignal[] }) {
  const items = signals.slice(0, 4);
  const [p, setP] = useState(1); // SSR/full so crawlers get real numbers
  const numbers = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
    const onScroll = () => {
      const el = numbers.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the NUMBERS row first enters at the bottom → 1 by the time it
      // reaches the upper third (so they hit full before scrolling off).
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

  // Ease-IN so the numbers stay low while first visible, then rush to full —
  // the ×1.12 lets them reach 180+ a touch before the row leaves the top.
  const eased = Math.min(1, Math.pow(p, 2) * 1.12);

  return (
    <section aria-label="Track record" className="relative flex min-h-screen items-center overflow-hidden">
      <BackgroundVideo
        src="/videos/stats.mp4"
        poster="/videos/stats-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,16,10,0.62)" }} />

      <div className="container-lux relative z-10 flex w-full flex-col items-center py-24">
        <div className="text-center">
          <p className="eyebrow" style={{ color: "#8fb6e6" }}>
            The numbers
          </p>
          <h2 className="mx-auto mt-4 max-w-[22ch] display-h2" style={{ color: "#f4f8fd" }}>
            A brokerage measured in results
          </h2>
        </div>

        <div ref={numbers} className="mt-16 flex w-full flex-wrap items-start justify-center gap-x-10 gap-y-12 md:mt-20 md:flex-nowrap md:gap-x-6 lg:gap-x-14">
          {items.map((s) => {
            const parsed = parse(s.value);
            const disp = parsed
              ? `${parsed.prefix}${fmt(parsed.num * eased, parsed.decimals)}${parsed.suffix}`
              : s.value;
            return (
              <div key={s.label} className="min-w-[8rem] text-center" style={{ color: "#ffffff" }}>
                <div className="font-display font-semibold leading-none text-[clamp(2.75rem,6.5vw,6rem)]">
                  {disp}
                </div>
                <div className="mt-4 text-sm font-medium" style={{ color: "#dbe7f5" }}>
                  {s.label}
                </div>
                {s.detail && (
                  <div className="mt-1 text-xs" style={{ color: "#9db8d6" }}>
                    {s.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
