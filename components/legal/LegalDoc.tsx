import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";

/** Shared date so all three legal pages report the same revision. */
export const LEGAL_UPDATED = "17 August 2026";

/**
 * Shared layout for the site's legal pages (privacy, terms, cookies). Keeps the
 * hero, breadcrumbs and prose rhythm identical across all three.
 */
export function LegalDoc({
  title,
  intro,
  path,
  children,
  eyebrow = "Legal",
  lastUpdatedLabel = "Last updated",
}: {
  title: string;
  intro: ReactNode;
  path: string;
  children: ReactNode;
  eyebrow?: string;
  lastUpdatedLabel?: string;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <section className="container-lux pb-[var(--section-py)] pt-40">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: title, href: path }]} />
        </div>
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="display-hero max-w-[18ch] text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4.5rem)" }}>
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{intro}</p>
        <p className="mt-5 text-sm text-faint">{lastUpdatedLabel} {LEGAL_UPDATED}</p>
        <div className="mt-14 max-w-3xl space-y-12">{children}</div>
      </section>
    </>
  );
}

/** A titled section (h2 + body) inside a legal document. */
export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-tight text-ink">{heading}</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">{children}</div>
    </section>
  );
}

/** Bulleted list matching the accent-dot style used elsewhere on the site. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1 text-accent-500">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
