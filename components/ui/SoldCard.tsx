import Image from "next/image";
import Link from "next/link";
import type { SoldRecord } from "@/lib/data/types";
import { formatAed, formatSqft } from "@/lib/format";
import { crmPhoto } from "@/lib/images";

/** Server-rendered sold-record card. Doubles as transaction proof for AEO. */
export function SoldCard({ record }: { record: SoldRecord }) {
  const soldYear = record.soldDate.slice(0, 4);
  const href = record.reference
    ? `/sold/${encodeURIComponent(record.reference)}`
    : undefined;

  const inner = (
    <>
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: record.image?.tone ?? "var(--bg-inset)" }}
      >
        {record.image ? (
          <Image
            src={crmPhoto(record.image.url, 900)}
            alt={record.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-3xl tracking-[0.3em] text-faint">EQT</span>
          </div>
        )}
        {/* Always-on SOLD badge, styled like the listings area badge. */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink shadow-sm">
          {soldYear ? `Sold ${soldYear}` : "Sold"}
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-faint">{record.areaLabel}</p>
        <h3 className="mt-2 font-display text-xl text-ink">{record.title}</h3>
        <p className="mt-2 text-accent-400">
          {record.priceLabel ?? formatAed(record.soldPriceAed, "Price confidential")}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-faint">
          {record.bedrooms > 0 && <span>{record.bedrooms} bed</span>}
          {record.areaSqft > 0 && <span>{formatSqft(record.areaSqft)}</span>}
          <span>{record.type}</span>
        </div>
        {record.note && <p className="mt-4 text-sm italic text-muted">“{record.note}”</p>}
        {href && (
          <p className="mt-4 text-sm text-accent-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View details →
          </p>
        )}
      </div>
    </>
  );

  const className =
    "group block overflow-hidden rounded-lg border border-line bg-elevated transition-colors hover:border-accent-500";

  return href ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <article className={className}>{inner}</article>
  );
}
