import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/data/blog";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/site";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

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
};

const catId = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-");

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

      {/* Category jump nav */}
      <section className="sticky top-20 z-30 border-y border-line bg-base">
        <nav className="container-lux flex flex-wrap gap-x-6 gap-y-2 py-4 text-xs uppercase tracking-[0.18em]" aria-label={c.browse}>
          <span className="text-faint">{c.browse}</span>
          {c.categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat.name).length;
            if (!count) return null;
            return (
              <a key={cat.name} href={`#${catId(cat.name)}`} className="text-accent-600 transition-opacity hover:opacity-60">
                {cat.label} <span className="text-faint">({count})</span>
              </a>
            );
          })}
        </nav>
      </section>

      {/* Grouped by category */}
      {c.categories.map((cat) => {
        const items = rest.filter((p) => p.category === cat.name);
        if (items.length === 0) return null;
        return (
          <section key={cat.name} id={catId(cat.name)} className="scroll-mt-32 border-t border-line first:border-t-0">
            <div className="container-lux py-[var(--section-py)]">
              <div className="mb-12 max-w-2xl">
                <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight text-ink">{cat.label}</h2>
                <p className="mt-3 text-muted">{cat.blurb}</p>
              </div>
              <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {items.map((post, i) => (
                  <Reveal key={post.slug} delay={(i % 3) * 80}>
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <div
                        className="relative mb-6 aspect-[3/2] overflow-hidden rounded-lg"
                        style={{ backgroundColor: post.heroImage.tone }}
                      >
                        <Image
                          src={post.heroImage.url}
                          alt={post.heroImage.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                      </div>
                      <p className="eyebrow mb-3">
                        {catLabel(post.category)} · {post.readingMinutes} {c.minRead}
                      </p>
                      <h3 className="font-display text-2xl leading-snug text-ink transition-opacity group-hover:opacity-70">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
