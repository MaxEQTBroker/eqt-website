"use client";

import { useEffect, useRef, type ElementType } from "react";

/**
 * Heading whose letters materialise like smoke on scroll-in, each glyph fades
 * up from a blur with a randomised delay. Content-first: the full text is
 * server-rendered (split into spans, so it's real, selectable, crawlable text);
 * the animation is applied only on capable clients after hydration. Static under
 * reduced-motion.
 */
export function RevealText({
  text,
  as,
  className = "",
  once = true,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "span") as ElementType;
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
    letters.forEach((l) => {
      l.style.opacity = "0";
      l.style.filter = "blur(10px)";
      l.style.transform = "translateY(0.32em)";
      l.style.willChange = "opacity, filter, transform";
    });

    const play = () => {
      letters.forEach((l) => {
        const delay = Math.random() * 480; // "random smoke" scatter
        l.style.transition = `opacity 0.7s ${delay}ms cubic-bezier(0.22,1,0.36,1), filter 0.7s ${delay}ms cubic-bezier(0.22,1,0.36,1), transform 0.7s ${delay}ms cubic-bezier(0.22,1,0.36,1)`;
        l.style.opacity = "1";
        l.style.filter = "blur(0px)";
        l.style.transform = "translateY(0)";
      });
    };
    const reset = () => {
      letters.forEach((l) => {
        l.style.transition = "none";
        l.style.opacity = "0";
        l.style.filter = "blur(10px)";
        l.style.transform = "translateY(0.32em)";
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            play();
            if (once) io.unobserve(el);
          } else if (!once) {
            reset();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {Array.from(word).map((ch, ci) => (
            <span key={ci} data-l className="inline-block">
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
