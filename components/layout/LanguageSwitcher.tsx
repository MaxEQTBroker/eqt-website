"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const FLAGS: Record<string, string> = { en: "🇬🇧", uk: "🇺🇦", ru: "🇷🇺" };
const CODES: Record<string, string> = { en: "EN", uk: "UK", ru: "RU" };

/** Flag language switcher. Keeps the current path, swaps the locale. */
export function LanguageSwitcher({ color }: { color?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const active = useLocale();

  return (
    <div className="flex items-center gap-1.5" style={color ? { color } : undefined} aria-label="Language">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === active ? "true" : undefined}
          title={CODES[loc]}
          className="flex items-center gap-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-100"
          style={{ opacity: loc === active ? 1 : 0.45 }}
        >
          <span aria-hidden="true" className="text-sm leading-none">{FLAGS[loc]}</span>
          <span>{CODES[loc]}</span>
        </button>
      ))}
    </div>
  );
}
