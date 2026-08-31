"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { site, whatsappLink } from "@/lib/site";
import { uiContent } from "@/lib/data/i18n/ui";

/**
 * UAE mortgage calculator. Encodes the CBUAE loan-to-value caps and the usual
 * upfront transaction costs so a buyer sees, from a price + salary, the cash
 * they need up front and the monthly repayment. Rates/fees are constants below
 * so they stay easy to update when regulations change.
 */
type MortgageCopy = {
  eyebrow: string;
  price: string; priceHint: string;
  buyerType: string; expat: string; national: string;
  purchaseType: string; firstReady: string; secondProp: string; offPlan: string;
  downPayment: string; minNote: string;
  rate: string; term: string; years: string;
  income: string; incomeOptional: string;
  resultsHeading: string;
  downPaymentLabel: string; loanAmount: string; monthlyPayment: string;
  upfrontHeading: string; upfrontNote: string;
  dldFee: string; agencyFee: string; mortgageReg: string; otherFees: string; totalCash: string;
  affordHeading: string; affordOk: string; affordOver: string;
  ctaText: string; disclaimer: string;
};

// --- Regulatory constants (edit here when CBUAE / DLD rules change) ---
const DLD_TRANSFER = 0.04;      // 4% Dubai Land Department transfer fee
const AGENCY_FEE = 0.02;        // 2% agency commission
const MORTGAGE_REG = 0.0025;    // 0.25% of the loan (mortgage registration)
const OTHER_FIXED = 8_000;      // trustee + valuation + admin, rounded
const DBR_CAP = 0.5;            // debt-burden ratio: repayments ≤ 50% of income

type Buyer = "expat" | "national";
type Purchase = "firstReady" | "secondProp" | "offPlan";

/** Minimum down-payment share for a buyer + purchase category. */
function minDownShare(buyer: Buyer, purchase: Purchase, price: number): number {
  let base: number;
  if (purchase === "offPlan") base = 0.5;
  else if (purchase === "secondProp") base = buyer === "national" ? 0.35 : 0.4;
  else base = price >= 5_000_000 ? (buyer === "national" ? 0.25 : 0.3) : (buyer === "national" ? 0.15 : 0.2);
  return base;
}

function fmtAed(n: number): string {
  return `AED ${Math.round(n).toLocaleString("en-US")}`;
}

export function MortgageCalculator() {
  const locale = useLocale();
  const c = uiContent<MortgageCopy>("mortgageCalculator", locale);

  const [price, setPrice] = useState(3_000_000);
  const [buyer, setBuyer] = useState<Buyer>("expat");
  const [purchase, setPurchase] = useState<Purchase>("firstReady");
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(4.25);
  const [term, setTerm] = useState(25);
  const [income, setIncome] = useState<number | "">("");

  const minPct = Math.round(minDownShare(buyer, purchase, price) * 100);
  // Keep the down payment at/above the regulatory floor for the chosen category.
  const effectiveDownPct = Math.max(downPct, minPct);

  const calc = useMemo(() => {
    const down = price * (effectiveDownPct / 100);
    const loan = Math.max(price - down, 0);
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly = r > 0 && n > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / Math.max(n, 1);
    const dld = price * DLD_TRANSFER;
    const agency = price * AGENCY_FEE;
    const reg = loan * MORTGAGE_REG;
    const other = OTHER_FIXED;
    const upfront = down + dld + agency + reg + other;
    const incomeNum = typeof income === "number" ? income : 0;
    const dbr = incomeNum > 0 ? monthly / incomeNum : null;
    return { down, loan, monthly, dld, agency, reg, other, upfront, dbr };
  }, [price, effectiveDownPct, rate, term, income]);

  const waMessage =
    `Hello ${site.name}, I used your mortgage calculator.\n\n` +
    `• Price: ${fmtAed(price)}\n` +
    `• Down payment: ${effectiveDownPct}% (${fmtAed(calc.down)})\n` +
    `• Estimated monthly: ${fmtAed(calc.monthly)}\n\n` +
    `Could you help me get pre-approved?`;

  const rows: { label: string; value: string }[] = [
    { label: c.dldFee, value: fmtAed(calc.dld) },
    { label: c.agencyFee, value: fmtAed(calc.agency) },
    { label: c.mortgageReg, value: fmtAed(calc.reg) },
    { label: c.otherFees, value: fmtAed(calc.other) },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
      {/* Inputs */}
      <div className="rounded-lg border border-line bg-elevated p-6 sm:p-9">
        <p className="eyebrow mb-6">{c.eyebrow}</p>
        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm text-muted">{c.price}</span>
            <input
              className="lux-input"
              inputMode="numeric"
              value={price ? price.toLocaleString("en-US") : ""}
              onChange={(e) => setPrice(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
            />
            <span className="mt-1.5 block text-xs text-faint">{c.priceHint}</span>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-muted">{c.buyerType}</span>
              <select className="lux-input lux-select" value={buyer} onChange={(e) => setBuyer(e.target.value as Buyer)}>
                <option value="expat">{c.expat}</option>
                <option value="national">{c.national}</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">{c.purchaseType}</span>
              <select className="lux-input lux-select" value={purchase} onChange={(e) => setPurchase(e.target.value as Purchase)}>
                <option value="firstReady">{c.firstReady}</option>
                <option value="secondProp">{c.secondProp}</option>
                <option value="offPlan">{c.offPlan}</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 flex items-baseline justify-between text-sm text-muted">
              <span>{c.downPayment}</span>
              <span className="font-medium text-ink">{effectiveDownPct}% · {fmtAed(calc.down)}</span>
            </span>
            <input
              type="range"
              min={minPct}
              max={90}
              step={1}
              value={effectiveDownPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="lux-range"
            />
            <span className="mt-1.5 block text-xs text-faint">
              {c.minNote.replace("{pct}", String(minPct))}
            </span>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-muted">{c.rate}</span>
              <input
                className="lux-input"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value.replace(/[^0-9.]/g, "")) || 0)}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">{c.term} ({c.years})</span>
              <input
                className="lux-input"
                inputMode="numeric"
                value={term}
                onChange={(e) => setTerm(Math.min(Number(e.target.value.replace(/[^0-9]/g, "")) || 0, 30))}
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm text-muted">{c.income} <span className="text-faint">· {c.incomeOptional}</span></span>
            <input
              className="lux-input"
              inputMode="numeric"
              value={income === "" ? "" : income.toLocaleString("en-US")}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, "");
                setIncome(v === "" ? "" : Number(v));
              }}
            />
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-lg border border-line bg-inset/40 p-6 sm:p-9">
        <p className="eyebrow mb-6">{c.resultsHeading}</p>

        <div className="flex items-baseline justify-between border-b border-line pb-5">
          <span className="text-muted">{c.monthlyPayment}</span>
          <span className="font-display text-3xl text-accent-500">{fmtAed(calc.monthly)}</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <dt className="text-sm text-faint">{c.downPaymentLabel}</dt>
            <dd className="mt-1 text-ink">{fmtAed(calc.down)}</dd>
          </div>
          <div>
            <dt className="text-sm text-faint">{c.loanAmount}</dt>
            <dd className="mt-1 text-ink">{fmtAed(calc.loan)}</dd>
          </div>
        </div>

        <div className="mt-7 border-t border-line pt-6">
          <p className="mb-1 text-sm font-medium text-ink">{c.upfrontHeading}</p>
          <p className="mb-4 text-xs text-faint">{c.upfrontNote}</p>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">{c.downPaymentLabel}</dt>
              <dd className="text-ink">{fmtAed(calc.down)}</dd>
            </div>
            {rows.map((row) => (
              <div key={row.label} className="flex justify-between">
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-ink">{row.value}</dd>
              </div>
            ))}
            <div className="flex justify-between border-t border-line pt-3 font-medium">
              <dt className="text-ink">{c.totalCash}</dt>
              <dd className="text-accent-500">{fmtAed(calc.upfront)}</dd>
            </div>
          </dl>
        </div>

        {calc.dbr !== null && (
          <div className="mt-6 rounded-md border border-line px-4 py-3 text-sm">
            <p className="font-medium text-ink">{c.affordHeading}</p>
            <p className="mt-1 text-muted">
              {(calc.dbr <= DBR_CAP ? c.affordOk : c.affordOver).replace(
                "{pct}",
                String(Math.round(calc.dbr * 100)),
              )}
            </p>
          </div>
        )}

        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-7 w-full"
        >
          {c.ctaText}
        </a>
        <p className="mt-4 text-xs text-faint">{c.disclaimer}</p>
      </div>

      <style>{`
        .lux-input {
          width: 100%;
          background: var(--bg-inset);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 0.9rem 1rem;
          color: var(--text-primary);
          font-size: 1rem;
          transition: border-color var(--dur-fast) var(--ease-lux);
        }
        .lux-input:focus { outline: none; border-color: var(--accent-500); }
        .lux-select {
          appearance: none; -webkit-appearance: none; cursor: pointer; padding-right: 2.75rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9' fill='none'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%233d4c67' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 1rem center;
        }
        .lux-range { width: 100%; accent-color: var(--accent-500); cursor: pointer; }
      `}</style>
    </div>
  );
}
