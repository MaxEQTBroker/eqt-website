"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { primaryNav, site, whatsappLink } from "@/lib/site";

/**
 * Minimal editorial header (111 West 57th-inspired): MENU (left) · logo
 * (center) · INQUIRE (right), no buttons cluttering the bar. "Menu" opens a
 * slow full-screen overlay with oversized serif links. Transparent white over
 * the hero video, solid beige once scrolled. All nav links are server-rendered.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const barColor = open ? "#e8e0cd" : scrolled ? "var(--text-primary)" : "#ffffff";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: !open && scrolled ? "var(--bg-base)" : "transparent",
        borderBottom: !open && scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="container-lux flex h-20 items-center justify-between">
        {/* Left, Menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group flex items-center gap-3"
          style={{ color: barColor }}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3 w-6">
            <span className="absolute left-0 h-px w-6 transition-all duration-300" style={{ backgroundColor: barColor, top: open ? "50%" : 0, transform: open ? "rotate(45deg)" : "none" }} />
            <span className="absolute bottom-0 left-0 h-px w-6 transition-all duration-300" style={{ backgroundColor: barColor, bottom: open ? "auto" : 0, top: open ? "50%" : "auto", transform: open ? "rotate(-45deg)" : "none" }} />
          </span>
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.24em]">
            {open ? "Close" : "Menu"}
          </span>
        </button>

        {/* Center, logo */}
        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <Image src="/brand/logo-mark.png" alt="EQT logo" width={28} height={28} priority className="h-7 w-7" />
          <span className="font-display text-2xl leading-none tracking-[0.32em]" style={{ color: barColor }}>
            {site.name}
          </span>
        </Link>

        {/* Right, Inquire */}
        <a
          href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-opacity hover:opacity-60"
          style={{ color: barColor }}
        >
          Inquire
        </a>
      </div>

      {/* Full-screen menu overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center"
        style={{
          backgroundColor: "#241d14",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.7s var(--ease-lux)",
        }}
      >
        <nav aria-label="Primary" className="container-lux">
          {primaryNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block w-fit py-2 font-display leading-[1.08] text-[clamp(2.4rem,7vw,5.5rem)] transition-colors hover:text-[color:var(--accent-400)]"
              style={{
                color: "#e8e0cd",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ${0.12 + i * 0.07}s var(--ease-lux), transform 0.6s ${0.12 + i * 0.07}s var(--ease-lux), color 0.3s`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className="container-lux mt-14 flex flex-col gap-2 text-sm"
          style={{
            color: "#b9ac90",
            opacity: open ? 1 : 0,
            transition: `opacity 0.6s ${0.12 + primaryNav.length * 0.07}s var(--ease-lux)`,
          }}
        >
          <a href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)} target="_blank" rel="noopener noreferrer" className="w-fit transition-colors hover:text-[#e8e0cd]">
            {site.contact.phone} · WhatsApp
          </a>
          <a href={`mailto:${site.contact.email}`} className="w-fit transition-colors hover:text-[#e8e0cd]">
            {site.contact.email}
          </a>
        </div>
      </div>
    </header>
  );
}
