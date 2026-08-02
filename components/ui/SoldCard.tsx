import Image from "next/image";
import type { SoldRecord } from "@/lib/data/types";
import { formatAed, formatSqft } from "@/lib/format";

/** Server-rendered sold-record card. Doubles as transaction proof for AEO. */
export function SoldCard({ record }: { record: SoldRecord }) {
  const soldYear = record.soldDate.slice(0, 4);
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-elevated">
      {record.image && (
        <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: record.image.tone }}>
          <Image
            src={record.image.url}
            alt={record.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute right-4 top-4 rounded-full border border-accent-500/60 bg-base/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-400 backdrop-blur-sm">
            Sold {soldYear}
          </div>
        </div>
      )}
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-faint">{record.areaLabel}</p>
        <h3 className="mt-2 font-display text-xl text-ink">{record.title}</h3>
        <p className="mt-2 text-accent-400">
          {record.priceLabel ?? formatAed(record.soldPriceAed, "Price confidential")}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-faint">
          <span>{record.bedrooms} bed</span>
          <span>{formatSqft(record.areaSqft)}</span>
          <span>{record.type}</span>
        </div>
        {record.note && <p className="mt-4 text-sm italic text-muted">“{record.note}”</p>}
      </div>
    </article>
  );
}
