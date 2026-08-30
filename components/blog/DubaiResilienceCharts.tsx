/**
 * Custom charts for the "COVID vs Gulf crisis" resilience article. Hand-authored
 * inline SVG so they are theme-aware (brand tokens), need no chart library, and
 * pass the site CSP. Data is from Dubai Land Department transactions (via
 * dxbinteract), 2019-2026. Single accent series throughout; the one comparison
 * chart uses a muted "shock" tone for COVID against the accent for 2026.
 */

const ACCENT = "var(--color-accent-500)";
const SHOCK = "#c2664f"; // muted terracotta, legible in both themes
const INK = "var(--color-ink)";
const MUTED = "var(--color-muted)";
const FAINT = "var(--color-faint)";
const LINE = "var(--color-line)";

function Figure({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <figure className="my-10 rounded-lg border border-line bg-elevated p-5 md:p-7">
      <figcaption className="mb-5">
        <p className="font-display text-lg text-ink">{title}</p>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </figcaption>
      <div className="overflow-x-auto">{children}</div>
      <p className="mt-4 text-xs text-faint">Source: EQT analysis of Dubai Land Department transactions (via dxbinteract). Figures are historical and indicative.</p>
    </figure>
  );
}

/** Chart 1: annual home sales 2019-2026 (bar). */
function AnnualSales() {
  const data = [
    { y: "2019", v: 35589 }, { y: "2020", v: 31757, tag: "COVID" }, { y: "2021", v: 55801 },
    { y: "2022", v: 90619 }, { y: "2023", v: 125695 }, { y: "2024", v: 173349 },
    { y: "2025", v: 204950, tag: "record" }, { y: "2026", v: 105054, tag: "8 months" },
  ];
  const W = 760, H = 300, padL = 8, padR = 8, padT = 34, padB = 44;
  const max = 210000;
  const bw = (W - padL - padR) / data.length;
  const barW = bw * 0.56;
  const yFor = (v: number) => padT + (1 - v / max) * (H - padT - padB);
  const base = H - padB;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[560px]" role="img" aria-label="Dubai annual home sales 2019 to 2026">
      <line x1={padL} y1={base} x2={W - padR} y2={base} stroke={LINE} strokeWidth="1.5" />
      {data.map((d, i) => {
        const x = padL + i * bw + (bw - barW) / 2;
        const y = yFor(d.v);
        const fill = d.tag === "COVID" ? SHOCK : d.y === "2026" ? "var(--color-accent-400)" : ACCENT;
        return (
          <g key={d.y}>
            <rect x={x} y={y} width={barW} height={base - y} rx="4" fill={fill} />
            <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK} style={{ fontVariantNumeric: "tabular-nums" }}>
              {(d.v / 1000).toFixed(0)}k
            </text>
            <text x={x + barW / 2} y={base + 18} textAnchor="middle" fontSize="12.5" fill={FAINT}>{d.y}</text>
            {d.tag && d.tag !== "record" && (
              <text x={x + barW / 2} y={base + 34} textAnchor="middle" fontSize="10.5" fill={d.tag === "COVID" ? SHOCK : FAINT} fontWeight="600">{d.tag}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Chart 2: peak-to-trough drop in MONTHLY sales during each shock. */
function ShockDrop() {
  const rows = [
    { label: "COVID (2020)", pct: 67, color: SHOCK, note: "Feb to May 2020" },
    { label: "Gulf crisis (2026)", pct: 23, color: ACCENT, note: "peak to summer low" },
  ];
  const W = 760, H = 168, padL = 170, padR = 70, padT = 16, rowH = 58;
  const maxPct = 75;
  const scale = (p: number) => (p / maxPct) * (W - padL - padR);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label="Peak to trough drop in monthly home sales, COVID versus 2026 conflict">
      {rows.map((r, i) => {
        const y = padT + i * rowH;
        const w = scale(r.pct);
        return (
          <g key={r.label}>
            <text x={padL - 14} y={y + 21} textAnchor="end" fontSize="13.5" fill={INK} fontWeight="500">{r.label}</text>
            <text x={padL - 14} y={y + 38} textAnchor="end" fontSize="11" fill={FAINT}>{r.note}</text>
            <rect x={padL} y={y} width={w} height="30" rx="4" fill={r.color} />
            <text x={padL + w + 12} y={y + 21} fontSize="16" fontWeight="700" fill={INK} style={{ fontVariantNumeric: "tabular-nums" }}>-{r.pct}%</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Chart 3: ready-villa median price per sq ft, 2019-2026 (line). */
function PriceLine() {
  const data = [754, 719, 886, 968, 1094, 1285, 1443, 1551];
  const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
  const W = 760, H = 300, padL = 44, padR = 20, padT = 30, padB = 40;
  const min = 600, max = 1650;
  const xFor = (i: number) => padL + (i / (data.length - 1)) * (W - padL - padR);
  const yFor = (v: number) => padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
  const path = data.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");
  const base = H - padB;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[560px]" role="img" aria-label="Dubai ready villa price per square foot, 2019 to 2026">
      {[800, 1000, 1200, 1400, 1600].map((g) => (
        <g key={g}>
          <line x1={padL} y1={yFor(g)} x2={W - padR} y2={yFor(g)} stroke={LINE} strokeWidth="1" opacity="0.6" />
          <text x={padL - 8} y={yFor(g) + 4} textAnchor="end" fontSize="11" fill={FAINT}>{g}</text>
        </g>
      ))}
      <line x1={padL} y1={base} x2={W - padR} y2={base} stroke={LINE} strokeWidth="1.5" />
      <path d={path} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={xFor(i)} cy={yFor(v)} r="4.5" fill="var(--color-base)" stroke={ACCENT} strokeWidth="2.5" />
      ))}
      {/* labelled points: COVID dip and 2026 high */}
      <text x={xFor(1)} y={yFor(719) + 22} textAnchor="middle" fontSize="12" fontWeight="600" fill={SHOCK} style={{ fontVariantNumeric: "tabular-nums" }}>719</text>
      <text x={xFor(1)} y={yFor(719) + 37} textAnchor="middle" fontSize="10.5" fill={SHOCK}>COVID: prices fell</text>
      <text x={xFor(7)} y={yFor(1551) - 14} textAnchor="end" fontSize="12.5" fontWeight="700" fill={INK} style={{ fontVariantNumeric: "tabular-nums" }}>AED 1,551</text>
      <text x={xFor(7)} y={yFor(1551) - 29} textAnchor="end" fontSize="10.5" fill={FAINT}>record, through the war</text>
      {years.map((yr, i) => (
        <text key={yr} x={xFor(i)} y={base + 20} textAnchor="middle" fontSize="12" fill={FAINT}>{yr}</text>
      ))}
    </svg>
  );
}

export function DubaiResilienceCharts() {
  return (
    <div className="my-4">
      <Figure title="Dubai home sales, 2019 to 2026" sub="Annual transactions across ready and off-plan apartments and villas. 2025 was the busiest year on record; 2026 covers the first eight months, through the Gulf crisis.">
        <AnnualSales />
      </Figure>
      <Figure title="How hard did each shock hit? Peak-to-trough drop in monthly sales" sub="COVID collapsed monthly deals by two-thirds. The 2026 Gulf crisis trimmed them by less than a quarter, from an all-time high.">
        <ShockDrop />
      </Figure>
      <Figure title="Prices told the real story: ready villa price per sq ft" sub="Prices softened through COVID but kept climbing through the 2026 conflict, reaching a record high.">
        <PriceLine />
      </Figure>
    </div>
  );
}
