import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

/**
 * Three ways to work with EQT. On hover, the others blur and dim while the
 * focused one stays sharp (Kumara-style). One clear intent per option.
 */
export function Approach() {
  const options = [
    { label: "Buy", desc: "Find your address across Dubai's finest communities.", href: "/listings" },
    { label: "Sell", desc: "A discreet valuation and a quiet, qualified sale.", href: whatsappLink(`Hello ${site.name}, I'd like a valuation.`), external: true },
    { label: "Invest", desc: "Build a portfolio with off-market access.", href: whatsappLink(`Hello ${site.name}, I'd like to discuss investing.`), external: true },
  ];

  return (
    <section className="border-y border-line">
      <div className="group container-lux grid md:grid-cols-3">
        {options.map((o, i) => {
          const cls =
            "flex flex-col justify-between gap-10 py-11 transition-all duration-500 group-hover:opacity-40 group-hover:blur-[2px] hover:!opacity-100 hover:!blur-0 md:py-14" +
            (i > 0 ? " border-t border-line md:border-l md:border-t-0" : "");
          const inner = (
            <>
              <span className="text-[0.7rem] uppercase tracking-[0.24em] text-accent-600">0{i + 1}</span>
              <span className="block">
                <span className="block font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-none text-ink">{o.label}</span>
                <span className="mt-3 block max-w-xs text-sm text-muted">{o.desc}</span>
              </span>
            </>
          );
          return o.external ? (
            <a key={o.label} href={o.href} target="_blank" rel="noopener noreferrer" className={`${cls} md:pl-10`}>
              {inner}
            </a>
          ) : (
            <Link key={o.label} href={o.href} className={`${cls} md:pr-10`}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
