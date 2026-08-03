"use client";

import { useEffect, useState } from "react";

/**
 * Big, bold stat rails on BOTH sides. The numbers CLIMB with scroll position
 * (0 at top → full at bottom). As the visitor nears the end of the page the two
 * rails slide toward the centre and fade, "converging" into the video stats
 * finale. Desktop-only, non-blocking, disabled under prefers-reduced-motion.
 */
type Stat = {
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
  decimals: number;
};

const LEFT: Stat[] = [
  { label: "Transacted", target: 3.2, prefix: "AED ", suffix: "B+", decimals: 1 },
  { label: "Prime homes sold", target: 180, suffix: "+", decimals: 0 },
];
const RIGHT: Stat[] = [
  { label: "Years in business", target: 12, decimals: 0 },
  { label: "Avg. days to offer", target: 24, decimals: 0 },
];

export function ScrollStatsRail() {
  const [p, setP] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!enabled) return null;

  const ease = 1 - Math.pow(1 - p, 2);
  const visible = p > 0.14 && p < 0.99;
  const converge = Math.min(1, Math.max(0, (p - 0.78) / 0.15));
  const opacity = visible ? 1 - converge : 0;
  const shiftVw = converge * 30;

  return (
    <>
      <Rail side="left" stats={LEFT} ease={ease} progress={p} opacity={opacity} shiftVw={shiftVw} />
      <Rail side="right" stats={RIGHT} ease={ease} progress={p} opacity={opacity} shiftVw={shiftVw} />
    </>
  );
}

function Rail({
  side,
  stats,
  ease,
  progress,
  opacity,
  shiftVw,
}: {
  side: "left" | "right";
  stats: Stat[];
  ease: number;
  progress: number;
  opacity: number;
  shiftVw: number;
}) {
  const isLeft = side === "left";
  const tx = isLeft ? `${shiftVw}vw` : `-${shiftVw}vw`;

  return (
    <aside
      aria-hidden="true"
      className={`pointer-events-none fixed top-1/2 z-30 hidden xl:block ${isLeft ? "left-5" : "right-5"}`}
      style={{
        transform: `translateY(-50%) translateX(${tx})`,
        opacity,
        transition: "opacity 0.4s var(--ease-lux)",
      }}
    >
      <div className={`flex items-stretch gap-3 ${isLeft ? "" : "flex-row-reverse"}`}>
        <div className="relative w-px overflow-hidden rounded-full bg-line">
          <div
            className="absolute inset-x-0 top-0 bg-accent-500"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <div
          className={`flex flex-col gap-6 rounded-lg border border-line bg-base/70 px-5 py-5 backdrop-blur-md ${
            isLeft ? "" : "text-right"
          }`}
        >
          {stats.map((s) => {
            const v = s.target * ease;
            const disp =
              s.decimals > 0 ? v.toFixed(s.decimals) : Math.round(v).toLocaleString("en-AE");
            return (
              <div key={s.label}>
                <div className="font-display text-4xl font-semibold leading-none text-accent-600">
                  {s.prefix ?? ""}
                  {disp}
                  {s.suffix ?? ""}
                </div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
