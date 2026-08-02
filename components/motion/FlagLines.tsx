"use client";

import { useEffect, useRef } from "react";

/**
 * Three bold UAE-flag lines (red / green / black), evenly spaced and parallel,
 * that DRAW themselves down the narrative as you scroll: clean diagonal runs
 * weaving left → right → left to reach each image, with a single clean circular
 * loop at each one. In front of content (never behind text), desktop-only,
 * static under reduced-motion.
 *
 * Route approximates a hand-described path and assumes the alternating image
 * layout (image 1 left, image 2 right, image 3 left); loop centres are tunable.
 */
const W = 100;
const H = 300;
const R = 11; // loop radius
const LOOPS: [number, number][] = [
  [28, 56], // image 1 (left)
  [72, 150], // image 2 (right)
  [28, 244], // image 3 (left)
];

function buildPath() {
  const pts: [number, number][] = [];
  // Smooth S-curve connector (vertical tangents at both ends) so the runs flow
  // rather than reading as stark straight diagonals.
  const curveTo = (x0: number, y0: number, x1: number, y1: number, n: number) => {
    const dy = y1 - y0;
    const c1x = x0;
    const c1y = y0 + dy * 0.5;
    const c2x = x1;
    const c2y = y1 - dy * 0.5;
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const u = 1 - t;
      const x = u * u * u * x0 + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * x1;
      const y = u * u * u * y0 + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * y1;
      pts.push([x, y]);
    }
  };
  const loop = (cx: number, cy: number, n: number) => {
    // one clean full circle starting and ending at the top (−90°)
    for (let i = 0; i <= n; i++) {
      const a = -Math.PI / 2 + (i / n) * 2 * Math.PI;
      pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
    }
  };

  pts.push([50, 3]);
  let prev: [number, number] = [50, 3];
  for (const [lx, ly] of LOOPS) {
    curveTo(prev[0], prev[1], lx, ly - R, 44); // flowing run to the top of the loop
    loop(lx, ly, 60);
    prev = [lx, ly - R];
  }
  curveTo(prev[0], prev[1], 50, 297, 44); // exit to bottom centre

  return (
    `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} ` +
    pts.slice(1).map((p) => `L${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ")
  );
}

const PATH = buildPath();
const COLORS = ["#e4322b", "#00843d", "#0f1c2e"];
const DX = [-3, 0, 3];

export function FlagLines() {
  const wrap = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
    const list = paths.current.filter(Boolean) as SVGPathElement[];
    const lengths = list.map((p) => p.getTotalLength());
    list.forEach((p, i) => {
      p.style.strokeDasharray = `${lengths[i]}`;
      p.style.strokeDashoffset = `${lengths[i]}`;
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      list.forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = clamp((vh - rect.top) / (rect.height + vh * 0.4), 0, 1);
      list.forEach((p, i) => {
        const pp = clamp((progress - i * 0.02) * 1.5, 0, 1);
        p.style.strokeDashoffset = `${lengths[i] * (1 - pp)}`;
      });
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
    <div ref={wrap} className="pointer-events-none absolute inset-0 z-20 hidden lg:block" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" fill="none" className="h-full w-full">
        <g strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.72 }}>
          {COLORS.map((c, i) => (
            <path
              key={c}
              ref={(elp) => { paths.current[i] = elp; }}
              d={PATH}
              stroke={c}
              transform={`translate(${DX[i]} 0)`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
