"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Cinematic hero background with a subtle GSAP parallax + slow scale.
 * Enhancement only: the image is a real, server-rendered element; if GSAP
 * never runs (no JS / reduced motion / mobile) it simply sits still.
 */
export function HeroMedia({
  imageUrl,
  alt,
  tone,
}: {
  imageUrl: string;
  alt: string;
  tone?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (prefersReduced || isMobile) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Slow ambient scale-in on load.
      gsap.fromTo(
        imgRef.current,
        { scale: 1.12 },
        { scale: 1, duration: 2.4, ease: "power2.out" },
      );
      // Parallax drift as the hero scrolls away, transform only.
      gsap.to(imgRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: tone ?? "#f2ede4" }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt}
        className="h-full w-full object-cover will-change-transform"
        style={{ transformOrigin: "center" }}
        fetchPriority="high"
      />
      {/* Bright, airy scrim, whitens top (header), bottom (hero copy) and the
          lower-left where the headline sits, so dark text stays legible while
          the image still reads bright. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 46%, rgba(255,255,255,0.9) 100%), radial-gradient(135% 105% at 12% 62%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0) 55%)",
        }}
      />
    </div>
  );
}
