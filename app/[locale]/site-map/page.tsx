import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  getAreas,
  getDevelopers,
  getPropertyGuides,
} from "@/lib/data/repository";
import { getAllPosts } from "@/lib/data/blog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type SiteMapCopy = {
  metaTitle: string; metaDescription: string; breadcrumb: string; eyebrow: string; h1: string;
  groupMain: string; groupNeighbourhoods: string; groupDevelopers: string;
  groupPropertyTypes: string; groupJournal: string;
  mainLinks: { label: string; href: string }[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<SiteMapCopy>("siteMap", locale);
  const canonical = locale === "en" ? "/site-map" : `/${locale}/site-map`;
  const languages: Record<string, string> = { "x-default": "/site-map", en: "/site-map" };
  if (hasUiTranslation("siteMap", "uk")) languages.uk = "/uk/site-map";
  if (hasUiTranslation("siteMap", "ru")) languages.ru = "/ru/site-map";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("siteMap", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

function Group({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="border-t border-line pt-8">
      <h2 className="eyebrow mb-4">{title}</h2>
      <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-muted transition-colors hover:text-accent-500">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function SiteMapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<SiteMapCopy>("siteMap", locale);
  const [areas, developers, guides, posts] = await Promise.all([
    getAreas(locale),
    getDevelopers(locale),
    getPropertyGuides(locale),
    getAllPosts(locale),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/site-map" },
        ]}
      />
      <section className="container-lux pb-[var(--section-py)] pt-40">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: c.breadcrumb, href: "/site-map" }]} />
        </div>
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="display-h2 text-ink">{c.h1}</h1>

        <div className="mt-12 space-y-10">
          <Group title={c.groupMain} links={c.mainLinks} />
          <Group title={c.groupNeighbourhoods} links={areas.map((a) => ({ label: a.label, href: `/areas/${a.slug}` }))} />
          <Group title={c.groupDevelopers} links={developers.map((d) => ({ label: d.name, href: `/developers/${d.slug}` }))} />
          <Group title={c.groupPropertyTypes} links={guides.map((g) => ({ label: g.label, href: `/property/${g.slug}` }))} />
          <Group title={c.groupJournal} links={posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))} />
        </div>
      </section>
    </>
  );
}
