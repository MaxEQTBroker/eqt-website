"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic hero background video, enhancement only. The hero heading/CTAs are
 * real server-rendered HTML on top; this is a muted, looping, decorative layer.
 *
 * - Poster (a real frame) shows instantly and remains if video never plays.
 * - JS picks the desktop or vertical-mobile source and starts playback.
 * - Under prefers-reduced-motion the video never loads, just the poster.
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

    // Respect data-saver / very slow connections: keep the poster, skip the video.
    const conn = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData || conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return;

    let started = false;
    const start = () => {
      const el = videoRef.current;
      if (started || !el) return;
      started = true;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      el.src = isMobile ? mobileSrc : desktopSrc;
      el.load();
      const play = () => el.play().catch(() => {});
      if (el.readyState >= 2) play();
      else el.addEventListener("canplay", play, { once: true });
    };

    // Defer loading the multi-MB video until the browser is idle, so it never
    // competes with the LCP paint (the poster + heading render immediately).
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(start, { timeout: 2500 });
    } else {
      timer = setTimeout(start, 1200);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (idleId !== undefined && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
    };
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
      {/* Flat, even wash (no gradient) so clean white text reads over the
          footage. */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(12,19,36,0.34)" }} />
    </div>
  );
}
