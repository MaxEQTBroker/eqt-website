"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { site, whatsappLink } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

/** Nav items map to translation keys (labels come from messages/<locale>.json). */
const NAV: { href: string; key: string }[] = [
  { href: "/", key: "home" },
  { href: "/team", key: "team" },
  { href: "/areas", key: "neighborhoods" },
  { href: "/developers", key: "developers" },
  { href: "/sold", key: "sold" },
  { href: "/listings", key: "active" },
  { href: "/property", key: "propertyTypes" },
  { href: "/market", key: "market" },
  { href: "/valuation", key: "valuation" },
  { href: "/blog", key: "resources" },
];

/**
 * Minimal editorial header: MENU (left) · logo (center) · language switcher +
 * INQUIRE (right). "Menu" opens a full-screen overlay with oversized serif links.
 */
export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  // Only the home page has a dark full-bleed hero video behind the header, so
  // only there does the header sit on dark and need light text at the top.
  const isHome = pathname === "/";
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

  // Navy by default (readable on the light pearl pages); white only at the top
  // of the home page over its dark hero; pearl while the dark menu overlay is open.
  const barColor = open ? "#e8ecf4" : !scrolled && isHome ? "#ffffff" : "var(--text-primary)";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: !open && scrolled ? "var(--bg-base)" : "transparent",
        borderBottom: !open && scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="container-lux relative z-50 flex h-11 items-center justify-between">
        {/* Left, Menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group flex items-center gap-3"
          style={{ color: barColor }}
          aria-expanded={open}
          aria-label={open ? tc("close") : tc("menu")}
        >
          {open ? (
            <span className="text-[2rem] font-light leading-none" aria-hidden="true">
              ×
            </span>
          ) : (
            <>
              <span className="relative block h-3 w-6">
                <span className="absolute left-0 top-0 h-[2px] w-6" style={{ backgroundColor: barColor }} />
                <span className="absolute bottom-0 left-0 h-[2px] w-6" style={{ backgroundColor: barColor }} />
              </span>
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.24em]">
                {tc("menu")}
              </span>
            </>
          )}
        </button>

        {/* Center, logo */}
        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <Image src="/brand/logo-mark.png" alt="EQT logo" width={20} height={20} priority className="h-5 w-5" />
          <span className="font-display text-lg leading-none tracking-[0.3em]" style={{ color: barColor }}>
            {site.name}
          </span>
        </Link>

        {/* Right, language switcher (desktop) + Inquire */}
        <div className="flex items-center gap-5">
          {/* Language switcher: desktop always; on mobile it appears when the
              menu is open (so it's the single switcher, none duplicated below). */}
          <div className={open ? "flex" : "hidden sm:flex"}>
            <LanguageSwitcher color={barColor} onSelect={() => setOpen(false)} />
          </div>
          {!open && (
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-opacity hover:opacity-60"
              style={{ color: barColor }}
            >
              {tc("inquire")}
            </a>
          )}
        </div>
      </div>

      {/* Full-screen menu overlay */}
      <div
        className="fixed inset-0 z-40 overflow-y-auto overscroll-contain"
        style={{
          backgroundColor: "#0d1730",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.7s var(--ease-lux)",
        }}
      >
        <div className="relative flex min-h-full flex-col px-0 py-24">
          <nav aria-label="Primary" className="container-lux my-auto flex flex-col items-start">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block w-fit py-1.5 font-display leading-[1.12] text-[clamp(1.35rem,4vw,2.6rem)] transition-colors hover:text-[color:var(--accent-400)]"
                style={{
                  color: "#e8ecf4",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ${0.12 + i * 0.06}s var(--ease-lux), transform 0.6s ${0.12 + i * 0.06}s var(--ease-lux), color 0.3s`,
                }}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div
            className="container-lux absolute inset-x-0 bottom-12 flex flex-col items-end gap-3 text-right text-sm"
            style={{
              color: "#93a0b8",
              opacity: open ? 1 : 0,
              transition: `opacity 0.6s ${0.12 + NAV.length * 0.06}s var(--ease-lux)`,
            }}
          >
            {/* Language switcher inside the overlay: the reliable mobile control,
                large tap targets, and it closes the menu after switching. */}
            <div className="mb-2 w-fit" style={{ color: "#e8ecf4" }}>
              <LanguageSwitcher size="lg" onSelect={() => setOpen(false)} />
            </div>
            <a href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)} target="_blank" rel="noopener noreferrer" className="w-fit whitespace-nowrap transition-colors hover:text-[#e8ecf4]">
              {site.contact.phone} · WhatsApp
            </a>
            <a href={`mailto:${site.contact.email}`} className="w-fit whitespace-nowrap transition-colors hover:text-[#e8ecf4]">
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
