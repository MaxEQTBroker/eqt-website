import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/data/blog";
import { bodyImagesFor } from "@/lib/data/mock/blogBodyImages";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

/** SSG: pre-render every post at build time. */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage.url],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

/** Stable anchor id from a section heading (for the table of contents). */
function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);
  // Editorial photos woven between sections to break up the text.
  const bodyImages = bodyImagesFor(post.slug, 2);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <ArticleJsonLd post={post} />
      <FaqJsonLd faqs={post.faqs} />

      {/* Header */}
      <article className="container-lux pt-40">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Journal", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <p className="eyebrow mt-8 mb-4">
            {post.category} · {post.readingMinutes} min read
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] text-ink">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-faint">
            {post.author.name}
            {post.author.credential ? ` · ${post.author.credential}` : ""} · Published{" "}
            {formatDate(post.publishedAt)}
            {post.updatedAt !== post.publishedAt ? ` · Updated ${formatDate(post.updatedAt)}` : ""}
          </p>
        </div>

        {/* Hero image */}
        <div
          className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-lg"
          style={{ backgroundColor: post.heroImage.tone }}
        >
          <Image
            src={post.heroImage.url}
            alt={post.heroImage.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Article body + sticky enquiry sidebar (form on the left on desktop) */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14">
          <div className="mx-auto w-full max-w-3xl lg:order-2 lg:mx-0">
          <p className="post-intro border-l-2 border-accent-500 pl-6 text-xl leading-relaxed text-ink">
            {post.intro}
          </p>

          {/* Key takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="mt-10 rounded-lg border border-line bg-elevated p-7 md:p-8">
              <p className="eyebrow mb-4">Key takeaways</p>
              <ul className="space-y-3">
                {post.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex gap-3 text-lg leading-relaxed text-ink">
                    <span className="mt-1 text-accent-500">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of contents (longer guides only) */}
          {post.sections.length >= 4 && (
            <nav aria-label="Contents" className="mt-8 rounded-lg border border-line bg-elevated p-7 md:p-8">
              <p className="eyebrow mb-4">In this guide</p>
              <ol className="space-y-2">
                {post.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${sectionId(s.heading)}`} className="text-muted transition-colors hover:text-accent-500">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Body */}
          <div className="mt-14 space-y-14">
            {post.sections.map((section, si) => {
              // Weave a photo in after the 2nd and 4th sections (when available).
              const img = si === 1 ? bodyImages[0] : si === 3 ? bodyImages[1] : null;
              return (
                <Fragment key={section.heading}>
                  <Reveal>
                    <section id={sectionId(section.heading)} className="scroll-mt-28">
                      <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-ink">
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-4">
                        {section.body.map((para, i) => (
                          <p key={i} className="text-lg leading-relaxed text-muted">
                            {para}
                          </p>
                        ))}
                      </div>
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="mt-5 space-y-2.5">
                          {section.bullets.map((b, i) => (
                            <li key={i} className="flex gap-3 text-lg leading-relaxed text-muted">
                              <span className="mt-1 text-accent-500">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  </Reveal>
                  {img && (
                    <Reveal>
                      <figure
                        className="relative aspect-[16/9] overflow-hidden rounded-lg"
                        style={{ backgroundColor: img.tone }}
                      >
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 768px) 768px, 100vw"
                          className="object-cover"
                        />
                      </figure>
                    </Reveal>
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* FAQ */}
          {post.faqs.length > 0 && (
            <div className="mt-16 border-t border-line pt-12">
              <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-ink">
                Frequently asked
              </h2>
              <div className="mt-8 divide-y divide-line border-y border-line">
                {post.faqs.map((faq) => (
                  <details key={faq.question} className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-ink">
                      {faq.question}
                      <span className="text-accent-500 transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-lg leading-relaxed text-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Related internal links */}
          {post.relatedLinks && post.relatedLinks.length > 0 && (
            <div className="mt-16 border-t border-line pt-12">
              <p className="eyebrow mb-6">Explore next</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {post.relatedLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group flex items-center justify-between gap-4 rounded-lg border border-line px-5 py-4 text-ink transition-colors hover:border-accent-500"
                    >
                      <span>{l.label}</span>
                      <span className="text-accent-500 transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          </div>

          <aside className="lg:order-1 lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow mb-2">Speak with a private advisor</p>
            <p className="mb-4 text-sm text-muted">
              Have a question about this? Send your brief and we&rsquo;ll reply personally, or message
              us on WhatsApp.
            </p>
            <a
              href={whatsappLink(`Hello ${site.name}, I read your guide on ${post.title} and have a question.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-whatsapp mb-5 inline-block text-sm"
            >
              Message us on WhatsApp
            </a>
            <LeadForm source={`blog:${post.slug}`} />
          </aside>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line">
          <div className="container-lux py-[var(--section-py)]">
            <p className="eyebrow mb-10">Keep reading</p>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group grid grid-cols-[100px_1fr] gap-5">
                  <div
                    className="relative aspect-square overflow-hidden rounded-md"
                    style={{ backgroundColor: rp.heroImage.tone }}
                  >
                    <Image
                      src={rp.heroImage.url}
                      alt={rp.heroImage.alt}
                      fill
                      sizes="100px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="eyebrow mb-2">{rp.category}</p>
                    <h3 className="font-display text-xl leading-snug text-ink transition-opacity group-hover:opacity-70">
                      {rp.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
