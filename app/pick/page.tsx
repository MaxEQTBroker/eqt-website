import type { Metadata } from "next";
import Image from "next/image";

/**
 * Internal photo-picker (noindex). Numbered candidates per community so the
 * client can choose which images to use. Not linked in nav.
 */
export const metadata: Metadata = {
  title: "Photo picker (internal)",
  robots: { index: false, follow: false },
};

type Cand = { id: string; url: string; note?: string };

const palm: Cand[] = [
  { id: "PALM-01", url: "/images/_pick/palm-jumeirah/1.jpg", note: "brochure" },
  { id: "PALM-02", url: "/images/_pick/palm-jumeirah/2.jpg", note: "brochure" },
  { id: "PALM-03", url: "/images/_pick/palm-jumeirah/3.jpg", note: "brochure" },
  { id: "PALM-04", url: "/images/_pick/palm-jumeirah/4.jpg", note: "brochure" },
  { id: "PALM-05", url: "/images/_pick/palm-jumeirah/5.jpg", note: "brochure" },
  { id: "PALM-06", url: "/images/_pick/palm-jumeirah/6.jpg", note: "brochure" },
  { id: "PALM-07", url: "/images/_pick/palm-jumeirah/7.jpg", note: "brochure" },
  { id: "PALM-08", url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80", note: "stock · Palm aerial" },
  { id: "PALM-09", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&q=80", note: "stock · Dubai skyline" },
  { id: "PALM-10", url: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1400&q=80", note: "stock · beachfront" },
];

const albarari: Cand[] = [
  { id: "AB-01", url: "/images/_pick/al-barari/1.jpg", note: "brochure" },
  { id: "AB-02", url: "/images/_pick/al-barari/2.jpg", note: "brochure" },
  { id: "AB-03", url: "/images/_pick/al-barari/3.jpg", note: "brochure · may be a text slide" },
  { id: "AB-04", url: "/images/_pick/al-barari/4.jpg", note: "brochure · may be a text slide" },
  { id: "AB-05", url: "/images/_pick/al-barari/5.jpg", note: "brochure" },
  { id: "AB-06", url: "/images/_pick/al-barari/6.jpg", note: "brochure" },
  { id: "AB-07", url: "/images/_pick/al-barari/7.jpg", note: "brochure" },
  { id: "AB-08", url: "/images/_pick/al-barari/8.jpg", note: "brochure" },
  { id: "AB-09", url: "/images/_pick/al-barari/9.jpg", note: "brochure" },
  { id: "AB-10", url: "/images/_pick/al-barari/10.jpg", note: "brochure" },
];

// Jumeirah Islands: no photos in the asset library — online candidates only.
const jumeirah: Cand[] = [
  { id: "JI-01", url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&q=80", note: "stock" },
  { id: "JI-02", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80", note: "stock" },
  { id: "JI-03", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80", note: "stock" },
  { id: "JI-04", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80", note: "stock" },
  { id: "JI-05", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80", note: "stock" },
  { id: "JI-06", url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80", note: "stock" },
  { id: "JI-07", url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1400&q=80", note: "stock" },
  { id: "JI-08", url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80", note: "stock" },
];

function Grid({ title, note, items }: { title: string; note: string; items: Cand[] }) {
  return (
    <section className="container-lux py-14">
      <h2 className="font-display text-4xl text-ink">{title}</h2>
      <p className="mt-2 text-muted">{note}</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <figure key={c.id} className="overflow-hidden rounded-lg border border-line bg-elevated">
            <div className="relative aspect-[3/2] bg-inset">
              <Image src={c.url} alt={c.id} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              <span className="absolute left-3 top-3 rounded-md bg-accent-500 px-2.5 py-1 text-sm font-semibold text-white shadow">
                {c.id}
              </span>
            </div>
            {c.note && <figcaption className="px-4 py-2 text-xs text-faint">{c.note}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

export default function PickPage() {
  return (
    <>
      <section className="container-lux pb-4 pt-40">
        <p className="eyebrow mb-4">Internal · photo picker</p>
        <h1 className="display-hero text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4.5rem)" }}>
          Pick the photos
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Browse the numbered candidates below and just tell me the IDs you want —
          e.g. &ldquo;Hero: PALM-03; Palm card: PALM-01; Al Barari: AB-07, AB-08;
          Jumeirah Islands: JI-02, JI-05.&rdquo; Brochure shots are real; anything
          marked <em>stock</em> is a placeholder we can replace with real
          photography later. A few Al Barari frames are brochure text-slides —
          just skip those.
        </p>
      </section>

      <Grid
        title="Palm Jumeirah"
        note="Real brochure photography (PALM-01–07) plus a few stock options."
        items={palm}
      />
      <Grid
        title="Al Barari"
        note="Brochure frames — pick the clean photos (skip any with text)."
        items={albarari}
      />
      <Grid
        title="Jumeirah Islands"
        note="No photos in the library yet — online/stock candidates to choose from (or send a JI brochure and I'll pull real ones)."
        items={jumeirah}
      />
    </>
  );
}
