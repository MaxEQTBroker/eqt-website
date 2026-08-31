"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { site, whatsappLink } from "@/lib/site";

/**
 * Thumb-friendly sticky WhatsApp button, the primary, mobile-first lead
 * capture. Fades in after the user scrolls past the hero.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On blog post pages a dedicated sticky lead bar handles WhatsApp + Enquire,
  // so the floating button is hidden there to avoid two overlapping controls.
  if (pathname.startsWith("/blog/")) return null;

  return (
    <a
      href={whatsappLink(`Hello ${site.name}, I'd like to enquire about a property.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-500 sm:bottom-7 sm:right-7"
      style={{
        backgroundColor: "#25d366",
        transform: visible ? "scale(1)" : "scale(0)",
        opacity: visible ? 1 : 0,
      }}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#04310f" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.44 9.44 0 01-4.81-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 01-1.45-5.03c0-5.21 4.25-9.45 9.47-9.45 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 012.77 6.68c0 5.21-4.25 9.45-9.46 9.45zm8.05-17.5A11.36 11.36 0 0012.04.6C5.8.6.72 5.68.72 11.92c0 2.1.55 4.15 1.6 5.96L.6 24l6.28-1.65a11.33 11.33 0 005.16 1.31h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.02z" />
      </svg>
    </a>
  );
}
