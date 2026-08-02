import Link from "next/link";
import { getSoldTeaser } from "@/lib/data/repository";
import { SoldCard } from "@/components/ui/SoldCard";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollFlipRow } from "@/components/motion/ScrollFlipRow";
import { BackgroundVideo } from "@/components/motion/BackgroundVideo";

/** Sold teaser over villa footage; cards flip in one by one on scroll. */
export async function SoldTeaser() {
  const records = await getSoldTeaser(3);
  if (!records.length) return null;

  return (
    <section className="relative overflow-hidden">
      <BackgroundVideo
        src="/videos/sold.mp4"
        poster="/videos/sold-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,16,30,0.36) 0%, rgba(8,26,50,0.22) 50%, rgba(6,16,30,0.42) 100%)",
        }}
      />

      <div className="container-lux relative z-10 py-[var(--section-py)]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow mb-4" style={{ color: "#cfe0f4", textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}>
              Proven results
            </p>
            <h2 className="display-h2 max-w-[18ch]" style={{ color: "#ffffff", textShadow: "0 2px 22px rgba(0,0,0,0.65)" }}>
              A track record, not a promise
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/sold"
              className="rounded-full border border-white/50 bg-black/20 px-6 py-3 text-sm text-white backdrop-blur-sm transition-colors duration-300 hover:border-accent-400 hover:text-accent-400"
            >
              View sold portfolio
            </Link>
          </Reveal>
        </div>

        <ScrollFlipRow className="mt-14 grid gap-6 md:grid-cols-3">
          {records.map((record) => (
            <SoldCard key={record.reference} record={record} />
          ))}
        </ScrollFlipRow>
      </div>
    </section>
  );
}
