import type { Metadata } from "next";
import Link from "next/link";
import {
  getAreas,
  getDevelopers,
  getPropertyGuides,
} from "@/lib/data/repository";
import { getAllPosts } from "@/lib/data/blog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Site Map",
  description: "Every page on the EQT website in one place — communities, developers, property types, guides and the journal.",
  alternates: { canonical: "/site-map" },
};

const MAIN = [
  { label: "Home", href: "/" },
  { label: "About EQT", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Active listings", href: "/listings" },
  { label: "Sold portfolio", href: "/sold" },
  { label: "Free valuation", href: "/valuation" },
  { label: "Market insights", href: "/market" },
  { label: "Buying guide", href: "/guides/buying-property-in-dubai" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

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

export default async function SiteMapPage() {
  const [areas, developers, guides, posts] = await Promise.all([
    getAreas(),
    getDevelopers(),
    getPropertyGuides(),
    getAllPosts(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Site Map", path: "/site-map" },
        ]}
      />
      <section className="container-lux pb-[var(--section-py)] pt-40">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Site map", href: "/site-map" }]} />
        </div>
        <p className="eyebrow mb-5">Site map</p>
        <h1 className="display-h2 text-ink">Every page, in one place</h1>

        <div className="mt-12 space-y-10">
          <Group title="Main pages" links={MAIN} />
          <Group title="Neighbourhoods" links={areas.map((a) => ({ label: a.label, href: `/areas/${a.slug}` }))} />
          <Group title="Developers" links={developers.map((d) => ({ label: d.name, href: `/developers/${d.slug}` }))} />
          <Group title="Property types" links={guides.map((g) => ({ label: g.label, href: `/property/${g.slug}` }))} />
          <Group title="Journal" links={posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))} />
        </div>
      </section>
    </>
  );
}
