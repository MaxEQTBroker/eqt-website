import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/data/blog";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/site";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";
import { BLOG_SECTIONS, sectionKeyFor } from "@/lib/data/blogSections";
import { BlogBrowser, type BlogCard, type BrowserCopy } from "@/components/blog/BlogBrowser";

type BlogIndexCopy = {
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  minRead: string;
  readGuide: string;
  browse: string;
  categories: { name: string; label: string; blurb: string }[];
  browser?: Partial<BrowserCopy> & { sections?: Record<string, string> };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<BlogIndexCopy>("blogIndex", locale);
  const canonical = locale === "en" ? "/blog" : `/${locale}/blog`;
  const languages: Record<string, string> = { "x-default": "/blog", en: "/blog" };
  if (hasUiTranslation("blogIndex", "uk")) languages.uk = "/uk/blog";
  if (hasUiTranslation("blogIndex", "ru")) languages.ru = "/ru/blog";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("blogIndex", locale) ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: `${c.breadcrumb}, ${site.name}`,
      description: c.ogDescription,
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<BlogIndexCopy>("blogIndex", locale);
  const posts = await getAllPosts(locale);
  const [lead, ...rest] = posts;
  const catLabel = (name: string) => c.categories.find((x) => x.name === name)?.label ?? name;

  // Card data for the interactive browser (search string precomputed server-side
  // so filtering is instant and the payload stays lean).
  const cards: BlogCard[] = rest.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    section: sectionKeyFor(p),
    catLabel: catLabel(p.category),
    readingMinutes: p.readingMinutes,
    img: { url: p.heroImage.url, tone: p.heroImage.tone ?? "#141821", alt: p.heroImage.alt },
    search: [p.title, p.excerpt, ...(p.keywords ?? [])].join(" ").toLowerCase(),
  }));
  const b = c.browser ?? {};
  const browserCopy: BrowserCopy = {
    searchPlaceholder: b.searchPlaceholder ?? "Search guides",
    all: b.all ?? "All",
    showing: b.showing ?? "Showing {n} of {total}",
    noResults: b.noResults ?? "No guides match your search.",
    clear: b.clear ?? "Clear filters",
    prev: b.prev ?? "Prev",
    next: b.next ?? "Next",
    minRead: c.minRead,
    sections: BLOG_SECTIONS.map((s) => ({ key: s.key, label: b.sections?.[s.key] ?? s.label })),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/blog" },
        ]}
      />

      {/* Masthead */}
      <section className="container-lux pb-4 pt-40">
        <p className="eyebrow mb-4">{c.eyebrow}</p>
        <RevealText
          as="h1"
          text={c.h1}
          className="block font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[1.02] text-ink"
        />
        <p className="mt-6 max-w-2xl text-lg text-muted">{c.intro}</p>
      </section>

      {/* Lead story */}
      {lead && (
        <section className="container-lux py-[var(--section-py)]">
          <Reveal>
            <Link href={`/blog/${lead.slug}`} className="group grid gap-8 md:grid-cols-2 md:items-center">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
                style={{ backgroundColor: lead.heroImage.tone }}
              >
                <Image
                  src={lead.heroImage.url}
                  alt={lead.heroImage.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div>
                <p className="eyebrow mb-4">
                  {catLabel(lead.category)} · {lead.readingMinutes} {c.minRead}
                </p>
                <h2 className="font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-tight text-ink">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-xl text-muted">{lead.excerpt}</p>
                <span className="link-quiet mt-7 inline-block">{c.readGuide}</span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* Interactive browser: instant search + topic filters + pagination */}
      <BlogBrowser posts={cards} copy={browserCopy} />
    </>
  );
}
