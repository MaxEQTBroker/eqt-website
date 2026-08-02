"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic hero background video — enhancement only. The hero heading/CTAs are
 * real server-rendered HTML on top; this is a muted, looping, decorative layer.
 *
 * - Poster (a real frame) shows instantly and remains if video never plays.
 * - JS picks the desktop or vertical-mobile source and starts playback.
 * - Under prefers-reduced-motion the video never loads — just the poster.
 */
export function HeroVideo({
  desktopSrc,
  mobileSrc,
  poster,
  tone = "#eae6df",
}: {
  desktopSrc: string;
  mobileSrc: string;
  poster: string;
  tone?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // keep the poster only

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    v.src = isMobile ? mobileSrc : desktopSrc;
    v.load();

    const play = () => {
      v.play().catch(() => {
        /* autoplay may be blocked; poster remains */
      });
    };
    if (v.readyState >= 2) play();
    else v.addEventListener("canplay", play, { once: true });

    return () => v.removeEventListener("canplay", play);
  }, [desktopSrc, mobileSrc]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ backgroundColor: tone }}>
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
      {/* Mostly-clear video; a faint top wash for header legibility, then a
          bottom gradient that resolves to the page's white (#fff) so the hero
          blends seamlessly into the next section with no visible line. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 12%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.5) 78%, rgba(255,255,255,0.92) 93%, #ffffff 100%)",
        }}
      />
    </div>
  );
}
