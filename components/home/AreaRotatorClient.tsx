"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Area } from "@/lib/data/types";

/**
 * Scroll-driven 3D "spin" showcase (Apple-style). As you scroll through a
 * pinned section, a panel rotates in 3D on the Y axis; each time it turns
 * edge-on (invisible), the hidden face swaps to the next community — so the
 * area changes mid-spin. This is CSS 3D + GSAP ScrollTrigger — no video, no
 * paid tooling.
 *
 * PROGRESSIVE ENHANCEMENT: the server renders a plain, crawlable grid of area
 * links (StaticGrid). Only desktop + motion-allowed clients upgrade to the 3D
 * stage after hydration, so mobile / reduced-motion / no-JS keep the grid.
 */
export function AreaRotatorClient({ areas }: { areas: Area[] }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (!reduced && desktop && areas.length >= 2) setActive(true);
  }, [areas.length]);

  return active ? <Stage areas={areas} /> : <StaticGrid areas={areas} />;
}

/* Distinct image pools for the two side cards (left ≠ right, and they cycle
   through different photos as they flip — never repeating or mirroring). */
const LEFT_IMAGES = [
  "/images/palm-jumeirah/6.jpg",
  "/images/al-barari/1.jpg",
  "/images/palm-jumeirah/2.jpg",
  "/images/al-barari/3.jpg",
  "/images/palm-jumeirah/4.jpg",
  "/images/al-barari/9.jpg",
];
const RIGHT_IMAGES = [
  "/images/al-barari/2.jpg",
  "/images/palm-jumeirah/1.jpg",
  "/images/palm-jumeirah/5.jpg",
  "/images/palm-jumeirah/3.jpg",
  "/images/palm-jumeirah/7.jpg",
];

/* ── The 3D rotating stage (desktop enhancement) ─────────────────────────── */
function Stage({ areas }: { areas: Area[] }) {
  const outer = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const leftCard = useRef<HTMLDivElement>(null);
  const rightCard = useRef<HTMLDivElement>(null);
  const len = areas.length;

  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  currentRef.current = current;

  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(0);
  const leftIdxRef = useRef(0);
  const rightIdxRef = useRef(0);
  leftIdxRef.current = leftIdx;
  rightIdxRef.current = rightIdx;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

    const st = ScrollTrigger.create({
      trigger: outer.current!,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        // Single-face flip: the angle stays within ±90° (so the card never
        // shows a mirrored back), and the image swaps at edge-on where the card
        // has faded to ~0.
        const t = self.progress * (len - 1);
        const seg = clamp(Math.floor(t), 0, len - 2);
        const f = clamp(t - seg, 0, 1);
        const angle = f < 0.5 ? f * 180 : (f - 1) * 180;
        const showIdx = f < 0.5 ? seg : seg + 1;
        if (card.current) {
          card.current.style.transform = `rotateY(${angle}deg)`;
          const edge = Math.abs(Math.cos((angle * Math.PI) / 180));
          card.current.style.opacity = String(clamp(edge * 3.2, 0.05, 1));
        }
        // Side cards: single-face flips (no mirroring) cycling through distinct
        // image pools, same speed, mirrored motion (opposite tilt) for balance.
        // Speed 4 → 5 images shown, so neither pool repeats within the section.
        const sideT = self.progress * 4;
        const sk = Math.floor(sideT);
        const sf = sideT - sk;
        const sAngle = sf < 0.5 ? sf * 180 : (sf - 1) * 180;
        const sStep = sf < 0.5 ? sk : sk + 1;
        const sEdge = Math.abs(Math.cos((sAngle * Math.PI) / 180));
        const sOpacity = String(clamp(sEdge * 3.2, 0.05, 1));
        if (leftCard.current) {
          leftCard.current.style.transform = `rotateY(${sAngle}deg)`;
          leftCard.current.style.opacity = sOpacity;
        }
        if (rightCard.current) {
          rightCard.current.style.transform = `rotateY(${-sAngle}deg)`;
          rightCard.current.style.opacity = sOpacity;
        }
        const li = sStep % LEFT_IMAGES.length;
        const ri = sStep % RIGHT_IMAGES.length;
        if (leftIdxRef.current !== li) setLeftIdx(li);
        if (rightIdxRef.current !== ri) setRightIdx(ri);

        if (currentRef.current !== showIdx) setCurrent(showIdx);
      },
    });

    ScrollTrigger.refresh();
    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={outer}
      style={{ height: `${len * 100}vh` }}
      aria-label="Communities"
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4">
        <p className="eyebrow absolute left-1/2 top-28 -translate-x-1/2">Where we operate</p>

        {/* Background side cards — bigger, full-opacity, same spin speed. */}
        <div className="absolute left-[1%] top-1/2 hidden -translate-y-1/2 lg:block" style={{ perspective: "1500px" }} aria-hidden="true">
          <SideCard cardRef={leftCard} src={LEFT_IMAGES[leftIdx]} tone="#dfe3e6" />
        </div>
        <div className="absolute right-[1%] top-1/2 hidden -translate-y-1/2 lg:block" style={{ perspective: "1500px" }} aria-hidden="true">
          <SideCard cardRef={rightCard} src={RIGHT_IMAGES[rightIdx]} tone="#e4e7e1" />
        </div>

        {/* Main flipping card (single face — never mirrors) */}
        <div style={{ perspective: "1600px" }}>
          <div
            ref={card}
            style={{
              position: "relative",
              width: "min(72vw, 680px)",
              height: "min(52vh, 430px)",
              willChange: "transform, opacity",
            }}
          >
            <Face area={areas[current]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SideCard({
  cardRef,
  src,
  tone,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  src: string;
  tone: string;
}) {
  return (
    <div
      ref={cardRef}
      className="overflow-hidden rounded-lg shadow-2xl"
      style={{
        position: "relative",
        width: "clamp(240px, 24vw, 460px)",
        height: "clamp(320px, 30vw, 600px)",
        willChange: "transform, opacity",
        backgroundColor: tone,
      }}
    >
      <Image src={src} alt="" fill sizes="460px" className="object-cover" />
    </div>
  );
}

function Face({ area }: { area: Area }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: area.heroImage.tone,
      }}
    >
      <Image
        src={area.heroImage.url}
        alt={area.heroImage.alt}
        fill
        sizes="900px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
        <h3 className="font-display text-4xl text-ink sm:text-5xl">{area.label}</h3>
        <p className="mt-2 max-w-md text-muted">{area.headline}</p>
        <Link
          href={`/areas/${area.slug}`}
          className="mt-4 inline-block text-accent-500 hover:underline"
        >
          Explore the guide →
        </Link>
      </div>
    </div>
  );
}

/* ── Static fallback grid (SSR / mobile / reduced-motion / no-JS) ─────────── */
function StaticGrid({ areas }: { areas: Area[] }) {
  return (
    <section className="container-lux py-[var(--section-py)]" aria-label="Communities">
      <p className="eyebrow mb-4">Where we operate</p>
      <h2 className="display-h2 max-w-[18ch] text-ink">
        Four communities. Every one, definitively covered.
      </h2>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((area) => (
          <Link
            key={area.slug}
            href={`/areas/${area.slug}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-lg"
            style={{ backgroundColor: area.heroImage.tone }}
          >
            <Image
              src={area.heroImage.url}
              alt={area.heroImage.alt}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-2xl text-ink">{area.label}</h3>
              <p className="mt-1 text-sm text-accent-500">Explore the guide →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
