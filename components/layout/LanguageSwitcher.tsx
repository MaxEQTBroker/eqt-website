"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const FLAGS: Record<string, string> = { en: "🇬🇧", uk: "🇺🇦", ru: "🇷🇺" };
const CODES: Record<string, string> = { en: "EN", uk: "UK", ru: "RU" };

/**
 * Flag language switcher. Keeps the current path, swaps the locale.
 * `onSelect` lets the caller close the mobile menu after a switch.
 * `size="lg"` is the tappable variant used inside the menu overlay.
 */
export function LanguageSwitcher({
  color,
  onSelect,
  size = "sm",
}: {
  color?: string;
  onSelect?: () => void;
  size?: "sm" | "lg";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const active = useLocale();

  const lg = size === "lg";

  return (
    <div
      className={lg ? "flex items-center gap-4" : "flex items-center gap-1.5"}
      style={color ? { color } : undefined}
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => {
            router.replace(pathname, { locale: loc });
            onSelect?.();
          }}
          aria-current={loc === active ? "true" : undefined}
          title={CODES[loc]}
          className={
            lg
              ? "flex items-center gap-2 py-1 text-sm font-medium uppercase tracking-[0.18em] transition-opacity"
              : "flex items-center gap-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-100"
          }
          style={{ opacity: loc === active ? 1 : lg ? 0.6 : 0.45 }}
        >
          <span aria-hidden="true" className={lg ? "text-lg leading-none" : "text-sm leading-none"}>
            {FLAGS[loc]}
          </span>
          <span>{CODES[loc]}</span>
        </button>
      ))}
    </div>
  );
}
