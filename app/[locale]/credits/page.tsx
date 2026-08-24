import type { Metadata } from "next";
import { photoCredits } from "@/lib/data/mock/heroImages";
import { blogBodyPool } from "@/lib/data/mock/blogBodyImages";
import { uiContent } from "@/lib/data/i18n/ui";

type CreditsCopy = {
  metaTitle: string; metaDescription: string; eyebrow: string; h1: string;
  introBefore: string; introAfter: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<CreditsCopy>("credits", locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "/credits" },
    robots: { index: false },
  };
}

export default async function CreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<CreditsCopy>("credits", locale);
  // Merge hero + blog-body photographers, de-duplicated by profile URL.
  const all = [
    ...photoCredits,
    ...blogBodyPool
      .filter((i) => i.credit && i.creditUrl)
      .map((i) => ({ photographer: i.credit as string, profileUrl: i.creditUrl as string })),
  ];
  const seen = new Set<string>();
  const credits = all.filter((cr) =>
    seen.has(cr.profileUrl) ? false : (seen.add(cr.profileUrl), true),
  );

  return (
    <section className="container-lux pb-[var(--section-py)] pt-40">
      <p className="eyebrow mb-5">{c.eyebrow}</p>
      <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4.5rem)" }}>
        {c.h1}
      </h1>
      <p className="mt-8 max-w-2xl text-lg text-muted">
        {c.introBefore}
        <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="link-quiet">
          Pexels
        </a>
        {c.introAfter}
      </p>

      <ul className="mt-14 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {credits.map((cr) => (
          <li key={cr.profileUrl}>
            <a
              href={cr.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border-b border-line py-3 text-ink transition-colors hover:text-accent-600"
            >
              <span>{cr.photographer}</span>
              <span className="text-accent-500 opacity-0 transition-opacity group-hover:opacity-100">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
