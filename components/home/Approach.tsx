import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

/**
 * Three ways to work with EQT. On hover, only the *content* zooms (the bordered
 * column stays put, so the divider lines never move or cross).
 */
export function Approach() {
  const options = [
    { label: "Buy", desc: "Find your address across Dubai's finest communities.", href: "/listings", external: false },
    { label: "Sell", desc: "A discreet valuation and a quiet, qualified sale.", href: whatsappLink(`Hello ${site.name}, I'd like a valuation.`), external: true },
    { label: "Invest", desc: "Build a portfolio with off-market access.", href: whatsappLink(`Hello ${site.name}, I'd like to discuss investing.`), external: true },
  ];

  return (
    <section className="border-y border-line">
      <div className="container-lux grid md:grid-cols-3">
        {options.map((o, i) => {
          const btnCls =
            "group block py-9 md:py-11" +
            (i > 0 ? " border-t border-line md:border-l md:border-t-0 md:pl-10" : " md:pr-10");
          const inner = (
            <div
              className="flex flex-col gap-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.09]"
              style={{ transformOrigin: "left center" }}
            >
              <span className="text-[0.7rem] uppercase tracking-[0.24em] text-faint">0{i + 1}</span>
              <span className="block">
                <span className="block font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-none text-ink">{o.label}</span>
                <span className="mt-3 block max-w-xs text-sm text-muted">{o.desc}</span>
              </span>
            </div>
          );
          return o.external ? (
            <a key={o.label} href={o.href} target="_blank" rel="noopener noreferrer" className={btnCls}>
              {inner}
            </a>
          ) : (
            <Link key={o.label} href={o.href} className={btnCls}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
