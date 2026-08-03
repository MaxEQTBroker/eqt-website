import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/data/blog";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal, Dubai Property Guides & Market Insight",
  description:
    "Answer-first guides to buying, selling and investing in Dubai's finest communities, freehold ownership, the Golden Visa, Palm Jumeirah villa prices and more, from EQT's private office.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Journal, ${site.name}`,
    description: "Dubai luxury property guides, community insight and market data.",
  },
};

/** Long-form editorial reads as human dates without Intl locale surprises. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
        ]}
      />

      {/* Masthead */}
      <section className="container-lux pb-4 pt-40">
        <p className="eyebrow mb-4">The EQT Journal</p>
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

      {/* The rest */}
      {rest.length > 0 && (
        <section className="border-t border-line">
          <div className="container-lux grid gap-x-8 gap-y-16 py-[var(--section-py)] md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 90}>
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
                    {post.category} · {formatDate(post.publishedAt)}
                  </p>
                  <h3 className="font-display text-2xl leading-snug text-ink transition-opacity group-hover:opacity-70">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
