"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

/**
 * Editorial tile: a still image that plays a muted video on hover, a slow image
 * zoom, and a "View" box whose border draws itself on hover (sprec-inspired).
 * The whole tile is a link. Video is loaded lazily and only plays on hover.
 */
export function HoverTile({
  href,
  image,
  alt,
  video,
  title,
  subtitle,
  tone = "#cdc2a7",
  ratio = "aspect-[4/5]",
}: {
  href: string;
  image: string;
  alt: string;
  video?: string;
  title: string;
  subtitle?: string;
  tone?: string;
  ratio?: string;
}) {
  const vref = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    const v = vref.current;
    if (!v) return;
    if (!v.src && v.dataset.src) v.src = v.dataset.src;
    v.play().catch(() => {});
  };
  const onLeave = () => vref.current?.pause();

  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative block overflow-hidden"
    >
      <div className={`relative w-full ${ratio}`} style={{ backgroundColor: tone }}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        {video && (
          <video
            ref={vref}
            data-src={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}

        {/* draw-on-hover "View" rectangle (wide, thin, slow) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="relative flex h-[3.25rem] w-[9rem] items-center justify-center">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 180 65" preserveAspectRatio="none" fill="none">
              <rect className="draw-rect" x="1" y="1" width="178" height="63" pathLength={100} stroke="#f6efdd" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#f6efdd]">View</span>
          </span>
        </div>

        {/* label — white, no box (subtle shadow for legibility) */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <h3 className="font-display text-3xl leading-tight text-white sm:text-4xl" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1.5 text-sm text-white/85" style={{ textShadow: "0 1px 14px rgba(0,0,0,0.55)" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
