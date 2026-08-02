"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal decorative background video: muted, looping, autoplay, poster
 * fallback. Under prefers-reduced-motion it stays on the poster. Aria-hidden.
 */
export function BackgroundVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.src = src;
    v.load();
    const play = () => v.play().catch(() => {});
    if (v.readyState >= 2) play();
    else v.addEventListener("canplay", play, { once: true });
    return () => v.removeEventListener("canplay", play);
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={className}
    />
  );
}
