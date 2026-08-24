import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllSoldReferences, getSoldByReference } from "@/lib/data/repository";
import { LeadForm } from "@/components/lead/LeadForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { formatAed, formatSqft } from "@/lib/format";
import { crmPhoto } from "@/lib/images";
import { site, whatsappLink } from "@/lib/site";

export async function generateStaticParams() {
  const refs = await getAllSoldReferences();
  return refs.map((reference) => ({ reference: encodeURIComponent(reference) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reference: string }>;
}): Promise<Metadata> {
  const { reference } = await params;
  const record = await getSoldByReference(decodeURIComponent(reference));
  if (!record) return {};
  return {
    title: `${record.title} — Sold by ${site.name}`,
    description: `A completed EQT sale in ${record.areaLabel}. ${record.note ?? "Part of our verified Dubai track record."}`,
    alternates: { canonical: `/sold/${encodeURIComponent(record.reference)}` },
    openGraph: record.image ? { images: [record.image.url] } : undefined,
  };
}

export default async function SoldDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const record = await getSoldByReference(decodeURIComponent(reference));
  if (!record) notFound();

  const soldYear = record.soldDate.slice(0, 4);
  const photos =
    record.images && record.images.length > 0
      ? record.images
      : record.image
        ? [record.image]
        : [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Sold Portfolio", path: "/sold" },
          { name: record.title, path: `/sold/${encodeURIComponent(record.reference)}` },
        ]}
      />

      <article className="container-lux pt-40">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Sold Portfolio", href: "/sold" },
            { name: record.title, href: `/sold/${encodeURIComponent(record.reference)}` },
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16 lg:items-start">
          {/* Left rail: enquiry form */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow mb-2">Want a result like this?</p>
            <p className="mb-4 text-sm text-muted">
              Tell us your brief and we&apos;ll advise on comparable opportunities in{" "}
              {record.areaLabel}, or what your own property could achieve.
            </p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'm interested in results like ${record.title} (${record.reference}).`)}
              className="link-whatsapp mb-5 inline-block text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
            <LeadForm defaultArea={record.areaLabel} source={`sold:${record.reference}`} />
          </aside>

          {/* Right: the record */}
          <div className="min-w-0">
            {/* Photo gallery — every photo carries a "Sold" badge. */}
            {photos.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {photos.map((ph, i) => (
                  <div
                    key={`${ph.url}-${i}`}
                    className={`relative overflow-hidden rounded-lg ${
                      i === 0 ? "aspect-[16/10] sm:col-span-2" : "aspect-[4/3]"
                    }`}
                    style={{ backgroundColor: ph.tone ?? "var(--bg-inset)" }}
                  >
                    <Image
                      src={crmPhoto(ph.url, i === 0 ? 1600 : 900)}
                      alt={ph.alt}
                      fill
                      priority={i === 0}
                      sizes={i === 0 ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 400px, 50vw"}
                      // Supabase transform already converts CMYK→sRGB + resizes.
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink shadow-sm">
                      {soldYear ? `Sold ${soldYear}` : "Sold"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg"
                style={{ backgroundColor: "var(--bg-inset)" }}
              >
                <span className="font-display text-5xl tracking-[0.3em] text-faint">EQT</span>
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink shadow-sm">
                  {soldYear ? `Sold ${soldYear}` : "Sold"}
                </div>
              </div>
            )}

            <p className="eyebrow mt-8">{record.areaLabel}</p>
            <h1 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight text-ink">
              {record.title}
            </h1>
            <p className="mt-4 text-2xl text-accent-500">
              {record.priceLabel ?? formatAed(record.soldPriceAed, "Price confidential")}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
              {record.bedrooms > 0 && (
                <div>
                  <dt className="text-sm text-faint">Bedrooms</dt>
                  <dd className="mt-1 text-ink">{record.bedrooms}</dd>
                </div>
              )}
              {record.areaSqft > 0 && (
                <div>
                  <dt className="text-sm text-faint">Size</dt>
                  <dd className="mt-1 text-ink">{formatSqft(record.areaSqft)}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-faint">Type</dt>
                <dd className="mt-1 text-ink">{record.type}</dd>
              </div>
              {soldYear && (
                <div>
                  <dt className="text-sm text-faint">Completed</dt>
                  <dd className="mt-1 text-ink">{soldYear}</dd>
                </div>
              )}
            </dl>

            {record.note && (
              <p className="mt-8 border-l-2 border-accent-500 pl-6 text-lg italic leading-relaxed text-muted">
                “{record.note}”
              </p>
            )}

            <p className="mt-8 pb-2 text-xs italic text-faint">
              Reference {record.reference}. Details shared for track-record purposes; some
              transactions are completed confidentially.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
