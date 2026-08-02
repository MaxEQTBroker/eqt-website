"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { primaryNav, site, whatsappLink } from "@/lib/site";

/**
 * Floating "bubble" header: the logo and the nav/CTA each sit in their own
 * frosted, rounded chip so they stay legible over the hero video (rather than
 * text floating directly on the footage). Nav links are server-rendered.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const bubble = "border border-line/60 bg-base/75 backdrop-blur-md shadow-[0_6px_24px_rgba(9,18,30,0.06)]";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-lux flex h-20 items-center justify-between">
        {/* Logo bubble */}
        <Link
          href="/"
          className={`flex items-center gap-2.5 rounded-full px-4 py-2 ${bubble}`}
          aria-label={`${site.name} home`}
        >
          <Image src="/brand/logo-mark.png" alt="EQT logo" width={28} height={28} priority className="h-7 w-7" />
          <span className="font-display text-xl leading-none tracking-[0.3em] text-ink">{site.name}</span>
        </Link>

        {/* Desktop nav bubble */}
        <nav aria-label="Primary" className={`hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex ${bubble}`}>
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:bg-inset hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-full bg-accent-500 px-5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-accent-600"
          >
            Enquire
          </a>
        </nav>

        {/* Mobile trigger bubble */}
        <button
          type="button"
          className={`flex h-11 w-11 items-center justify-center rounded-full md:hidden ${bubble}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span className="absolute left-0 h-px w-5 bg-ink transition-transform duration-300" style={{ top: open ? "50%" : 0, transform: open ? "rotate(45deg)" : "none" }} />
            <span className="absolute left-0 top-1/2 h-px w-5 bg-ink transition-opacity duration-300" style={{ opacity: open ? 0 : 1 }} />
            <span className="absolute bottom-0 left-0 h-px w-5 bg-ink transition-transform duration-300" style={{ bottom: open ? "auto" : 0, top: open ? "50%" : "auto", transform: open ? "rotate(-45deg)" : "none" }} />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 top-20 z-40 flex flex-col bg-base px-6 pb-10 pt-8 transition-all duration-400 md:hidden"
        style={{ transform: open ? "translateY(0)" : "translateY(-8px)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-line py-5 font-display text-3xl text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)} className="btn btn-accent mt-8 w-full" target="_blank" rel="noopener noreferrer">
          Enquire on WhatsApp
        </a>
      </div>
    </header>
  );
}
