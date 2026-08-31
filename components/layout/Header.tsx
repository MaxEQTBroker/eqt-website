"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { site, whatsappLink } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Nav labels come from messages/<locale>.json. The overlay shows a few primary
 * "money" paths (large) and everything else grouped under one Resources block,
 * so the menu reads cleanly instead of a flat list of ten.
 */
const PRIMARY: { href: string; key: string }[] = [
  { href: "/listings", key: "active" },
  { href: "/sell", key: "sell" },
  { href: "/sold", key: "sold" },
  { href: "/team", key: "team" },
];

const RESOURCES: { href: string; key: string }[] = [
  { href: "/areas", key: "neighborhoods" },
  { href: "/developers", key: "developers" },
  { href: "/property", key: "propertyTypes" },
  { href: "/market", key: "market" },
  { href: "/valuation", key: "valuation" },
  { href: "/mortgage-calculator", key: "mortgageCalculator" },
  { href: "/blog", key: "guides" },
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

  // Switching language navigates the page, which can remount the header. If the
  // menu was open, reopen it after that navigation so the user stays in place.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("eqt-menu-open") === "1") {
        sessionStorage.removeItem("eqt-menu-open");
        setOpen(true);
      }
    } catch {}
  }, []);

  // Never leave a stale reopen flag once the menu is closed.
  useEffect(() => {
    if (!open) {
      try {
        sessionStorage.removeItem("eqt-menu-open");
      } catch {}
    }
  }, [open]);

  // Remember an open menu across a language switch (see effect above).
  const rememberMenu = () => {
    if (!open) return;
    try {
      sessionStorage.setItem("eqt-menu-open", "1");
    } catch {}
  };

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
            <LanguageSwitcher color={barColor} onSelect={rememberMenu} />
          </div>
          {!open && (
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tc("inquire")} on WhatsApp`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition-colors hover:bg-[#1ebe5b]"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M12 0a11.9 11.9 0 0 0-10.2 18l-1.8 6 6.2-1.6A11.9 11.9 0 1 0 12 0zm0 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.8zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.6 2.5 1 3 .8 3.6.8.5 0 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
              </svg>
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
            {PRIMARY.map((item, i) => (
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

            {/* Everything else under one Resources block. */}
            <div
              className="mt-12 w-full max-w-2xl"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ${0.12 + PRIMARY.length * 0.06}s var(--ease-lux), transform 0.6s ${0.12 + PRIMARY.length * 0.06}s var(--ease-lux)`,
              }}
            >
              <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.24em]" style={{ color: "#6b7a96" }}>
                {t("resources")}
              </p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                {RESOURCES.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block w-fit font-display text-lg leading-tight transition-colors hover:text-[color:var(--accent-400)]"
                      style={{ color: "#cfd8e8" }}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* pointer-events-none so this full-width bar doesn't sit over and
              block the nav links behind it; children re-enable their own. */}
          <div
            className="container-lux pointer-events-none absolute inset-x-0 bottom-12 flex flex-col items-end gap-3 text-right text-sm"
            style={{
              color: "#93a0b8",
              opacity: open ? 1 : 0,
              transition: `opacity 0.6s ${0.12 + (PRIMARY.length + 1) * 0.06}s var(--ease-lux)`,
            }}
          >
            {/* Language switcher inside the overlay: switching locale keeps the
                menu open (no setOpen(false)). */}
            <div className="pointer-events-auto mb-2 w-fit" style={{ color: "#e8ecf4" }}>
              <LanguageSwitcher size="lg" onSelect={rememberMenu} />
            </div>
            <a href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)} target="_blank" rel="noopener noreferrer" className="pointer-events-auto w-fit whitespace-nowrap transition-colors hover:text-[#e8ecf4]">
              {site.contact.phone} · WhatsApp
            </a>
            <a href={`mailto:${site.contact.email}`} className="pointer-events-auto w-fit whitespace-nowrap transition-colors hover:text-[#e8ecf4]">
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
