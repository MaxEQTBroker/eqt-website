import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/data/blog";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources, Dubai Property Guides & Market Insight",
  description:
    "Answer-first guides to buying, selling and investing in Dubai's finest communities, freehold ownership, the Golden Visa, Palm Jumeirah villa prices and more, from EQT's private office.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Resources, ${site.name}`,
    description: "Dubai luxury property guides, community insight and market data.",
  },
};

/** Category display order + one-line descriptions for the grouped index. */
const CATEGORIES: { name: string; blurb: string }[] = [
  { name: "Buyer Guides", blurb: "How to buy, finance and own property in Dubai." },
  { name: "Seller Guides", blurb: "How to sell your Dubai property for the best price." },
  { name: "Investment", blurb: "Yields, ROI, strategy and where to invest." },
  { name: "Market & Data", blurb: "Prices, forecasts and the market outlook." },
  { name: "Community Guides", blurb: "Where to live and what your money buys, area by area." },
];

const catId = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-");

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/blog" },
        ]}
      />

      {/* Masthead */}
      <section className="container-lux pb-4 pt-40">
        <p className="eyebrow mb-4">EQT Resources</p>
        <RevealText
          as="h1"
          text="Dubai property, explained."
          className="block font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[1.02] text-ink"
        />
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Clear, direct answers to the questions serious buyers, sellers and investors ask about
          Dubai&rsquo;s finest communities, written by the people who transact in them.
        </p>
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
                  {lead.category} · {lead.readingMinutes} min read
                </p>
                <h2 className="font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-tight text-ink">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-xl text-muted">{lead.excerpt}</p>
                <span className="link-quiet mt-7 inline-block">Read the guide</span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* Category jump nav */}
      <section className="sticky top-20 z-30 border-y border-line bg-base">
        <nav className="container-lux flex flex-wrap gap-x-6 gap-y-2 py-4 text-xs uppercase tracking-[0.18em]" aria-label="Browse by category">
          <span className="text-faint">Browse</span>
          {CATEGORIES.map((c) => {
            const count = posts.filter((p) => p.category === c.name).length;
            if (!count) return null;
            return (
              <a key={c.name} href={`#${catId(c.name)}`} className="text-accent-600 transition-opacity hover:opacity-60">
                {c.name} <span className="text-faint">({count})</span>
              </a>
            );
          })}
        </nav>
      </section>

      {/* Grouped by category */}
      {CATEGORIES.map((cat) => {
        const items = rest.filter((p) => p.category === cat.name);
        if (items.length === 0) return null;
        return (
          <section key={cat.name} id={catId(cat.name)} className="scroll-mt-32 border-t border-line first:border-t-0">
            <div className="container-lux py-[var(--section-py)]">
              <div className="mb-12 max-w-2xl">
                <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight text-ink">{cat.name}</h2>
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
                        {post.category} · {post.readingMinutes} min read
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
