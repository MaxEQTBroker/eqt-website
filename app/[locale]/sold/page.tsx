import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getSoldRecords } from "@/lib/data/repository";
import { SoldCard } from "@/components/ui/SoldCard";
import { Reveal } from "@/components/motion/Reveal";
import {
  BreadcrumbJsonLd,
  SoldCollectionJsonLd,
} from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type SoldCopy = {
  metaTitle: string; metaDescription: string; breadcrumb: string; eyebrow: string;
  h1: string; intro: string; communityLabel: string; allCommunities: string;
  apply: string; reset: string; resultSingular: string; resultPlural: string;
  inArea: string; pageOf: string; prev: string; next: string; emptyHeading: string;
  emptyBody: string; emptyCta: string; ctaEyebrow: string; ctaHeading: string; ctaValuation: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<SoldCopy>("sold", locale);
  const canonical = locale === "en" ? "/sold" : `/${locale}/sold`;
  const languages: Record<string, string> = { "x-default": "/sold", en: "/sold" };
  if (hasUiTranslation("sold", "uk")) languages.uk = "/uk/sold";
  if (hasUiTranslation("sold", "ru")) languages.ru = "/ru/sold";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("sold", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

type SearchParams = { area?: string; page?: string };

const PER_PAGE = 9;

export default async function SoldPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const c = uiContent<SoldCopy>("sold", locale);
  const sp = await searchParams;
  const allSold = await getSoldRecords();

  // Communities that actually have sold records (for the dropdown).
  const communities = Array.from(
    new Map(allSold.map((r) => [r.area, r.areaLabel])).entries(),
  )
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
  const validSlugs = new Set(communities.map((c) => c.slug));

  const activeArea = sp.area && validSlugs.has(sp.area) ? sp.area : "all";
  const records =
    activeArea === "all" ? allSold : allSold.filter((r) => r.area === activeArea);
  const activeLabel = communities.find((c) => c.slug === activeArea)?.label;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(records.length / PER_PAGE));
  const page = Math.min(Math.max(1, Number(sp.page) || 1), totalPages);
  const pageRecords = records.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    if (activeArea !== "all") params.set("area", activeArea);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/sold?${qs}` : "/sold";
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/sold" },
        ]}
      />
      <SoldCollectionJsonLd records={records} />

      {/* Header */}
      <section className="container-lux pb-16 pt-40">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          {c.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{c.intro}</p>
      </section>

      {/* Filter: community */}
      <section className="container-lux">
        <div className="rounded-lg border border-line bg-elevated p-6 sm:p-8">
          <form method="get" action="/sold" className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="block sm:max-w-xs sm:flex-1">
              <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-faint">{c.communityLabel}</span>
              <select
                name="area"
                defaultValue={activeArea}
                className="w-full rounded-md border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-inset)", color: "var(--text-primary)" }}
              >
                <option value="all">{c.allCommunities}</option>
                {communities.map((com) => (
                  <option key={com.slug} value={com.slug}>
                    {com.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-accent">
                {c.apply}
              </button>
              <Link href="/sold" className="btn btn-ghost">
                {c.reset}
              </Link>
            </div>
          </form>
        </div>
        <p className="mt-6 text-sm text-faint" aria-live="polite">
          {records.length} {records.length === 1 ? c.resultSingular : c.resultPlural}
          {activeLabel && ` ${c.inArea.replace("{area}", activeLabel)}`}
          {totalPages > 1 && ` · ${c.pageOf.replace("{page}", String(page)).replace("{total}", String(totalPages))}`}
        </p>
      </section>

      {/* Results */}
      <section className="container-lux py-16">
        {records.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageRecords.map((record, i) => (
                <Reveal key={record.reference} delay={(i % 3) * 90}>
                  <SoldCard record={record} />
                </Reveal>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-14 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                {page > 1 && (
                  <Link href={hrefFor(page - 1)} className="rounded-md border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent-500 hover:text-ink">
                    ← {c.prev}
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={hrefFor(p)}
                    aria-current={p === page ? "page" : undefined}
                    className={
                      "min-w-[2.5rem] rounded-md border px-3 py-2 text-center text-sm transition-colors " +
                      (p === page
                        ? "border-accent-500 bg-accent-500 text-white"
                        : "border-line text-muted hover:border-accent-500 hover:text-ink")
                    }
                    style={p === page ? { backgroundColor: "var(--accent-500)", color: "#fff" } : undefined}
                  >
                    {p}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link href={hrefFor(page + 1)} className="rounded-md border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent-500 hover:text-ink">
                    {c.next} →
                  </Link>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-line bg-elevated p-12 text-center">
            <h2 className="font-display text-2xl text-ink">
              {c.emptyHeading}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">{c.emptyBody}</p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to see your track record.`)}
              className="btn btn-accent mt-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.emptyCta}
            </a>
          </div>
        )}
      </section>

      {/* Closing CTA */}
      <section className="border-t border-line bg-elevated">
        <div className="container-lux flex flex-col items-start gap-8 py-[var(--section-py)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-4">{c.ctaEyebrow}</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">
              {c.ctaHeading}
            </h2>
          </div>
          <Link href="/valuation" className="btn btn-accent">
            {c.ctaValuation}
          </Link>
        </div>
      </section>
    </>
  );
}
