"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { site, whatsappLink } from "@/lib/site";
import { postLead } from "@/lib/leads/submit";
import { trackLead } from "@/lib/analytics";
import { COMMUNITY_LABELS } from "@/lib/data/communityLabels";
import { uiContent } from "@/lib/data/i18n/ui";

/**
 * Seller-focused valuation lead magnet. Captures the property details plus
 * contact, then forwards to the CRM (intent "Sell", source "valuation") so an
 * advisor can prepare and send the valuation. WhatsApp is the fast-path fallback.
 */
type ValCopy = {
  eyebrow: string; community: string; selectCommunity: string; other: string;
  propertyType: string; selectType: string; typeApartment: string; typeVilla: string;
  typePenthouse: string; typeTownhouse: string; typeMansion: string; typePlot: string;
  bedrooms: string; selectBeds: string; studio: string; size: string; sizePlaceholder: string;
  fullName: string; namePlaceholder: string; contactLabel: string; contactPlaceholder: string;
  sending: string; submit: string; disclaimer: string; thankYou: string;
  successHeading: string; successBody: string; continueWhatsapp: string;
};

export function ValuationForm({ source = "valuation" }: { source?: string } = {}) {
  const locale = useLocale();
  const c = uiContent<ValCopy>("valuationForm", locale);
  // Value/label pairs: the value is stored/sent to the CRM, the label is shown.
  const PROPERTY_TYPES: { value: string; label: string }[] = [
    { value: "Apartment", label: c.typeApartment },
    { value: "Villa", label: c.typeVilla },
    { value: "Penthouse", label: c.typePenthouse },
    { value: "Townhouse", label: c.typeTownhouse },
    { value: "Mansion", label: c.typeMansion },
    { value: "Plot", label: c.typePlot },
  ];
  const BEDROOMS: { value: string; label: string }[] = [
    { value: "Studio", label: c.studio },
    { value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" },
    { value: "4", label: "4" }, { value: "5+", label: "5+" },
  ];
  const [community, setCommunity] = useState("");
  const [ptype, setPtype] = useState("");
  const [beds, setBeds] = useState("");
  const [size, setSize] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const canSubmit =
    community !== "" && ptype !== "" && name.trim().length > 1 && contact.trim().length > 3;

  const details = [ptype, beds && `${beds} bed`, size && `${size} sqft`, community]
    .filter(Boolean)
    .join(", ");

  const message =
    `Hello ${site.name}, I'd like a valuation.\n\n` +
    `• Property: ${details}\n` +
    `• Name: ${name}\n` +
    `• Contact: ${contact}`;

  async function submit() {
    if (sending || !canSubmit) return;
    setSending(true);
    // Fire the conversion event first so it's captured even on a slow network.
    trackLead({ source, intent: "Sell" });
    await postLead({
      name,
      contact,
      intent: "Sell",
      area: community || undefined,
      source,
      message: `Valuation request: ${details}`,
      honeypot,
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
    });
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-line bg-elevated p-8 text-center sm:p-10">
        <p className="eyebrow mb-4">{c.thankYou}, {name.split(" ")[0]}</p>
        <h3 className="font-display text-2xl text-ink">{c.successHeading}</h3>
        <p className="mx-auto mt-4 max-w-sm text-muted">
          {c.successBody.replace("{community}", community)}
        </p>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-7 inline-block"
        >
          {c.continueWhatsapp}
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-elevated p-6 sm:p-9">
      <p className="eyebrow mb-6">{c.eyebrow}</p>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">{c.community}</span>
          <select className="lux-input lux-select" value={community} onChange={(e) => setCommunity(e.target.value)}>
            <option value="">{c.selectCommunity}</option>
            {COMMUNITY_LABELS.map((label) => (
              <option key={label} value={label}>{label}</option>
            ))}
            <option value="Other">{c.other}</option>
          </select>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm text-muted">{c.propertyType}</span>
            <select className="lux-input lux-select" value={ptype} onChange={(e) => setPtype(e.target.value)}>
              <option value="">{c.selectType}</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-muted">{c.bedrooms}</span>
            <select className="lux-input lux-select" value={beds} onChange={(e) => setBeds(e.target.value)}>
              <option value="">{c.selectBeds}</option>
              {BEDROOMS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm text-muted">{c.size}</span>
          <input
            className="lux-input"
            value={size}
            onChange={(e) => setSize(e.target.value.replace(/[^0-9,]/g, ""))}
            placeholder={c.sizePlaceholder}
            inputMode="numeric"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm text-muted">{c.fullName}</span>
            <input className="lux-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={c.namePlaceholder} autoComplete="name" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-muted">{c.contactLabel}</span>
            <input className="lux-input" value={contact} onChange={(e) => setContact(e.target.value)} placeholder={c.contactPlaceholder} autoComplete="tel" />
          </label>
        </div>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <button
        type="button"
        className="btn btn-accent mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        onClick={submit}
        disabled={!canSubmit || sending}
      >
        {sending ? c.sending : c.submit}
      </button>
      <p className="mt-4 text-xs text-faint">{c.disclaimer}</p>

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
        .lux-input::placeholder { color: var(--text-tertiary); }
        .lux-input:focus { outline: none; border-color: var(--accent-500); }
        .lux-select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          padding-right: 2.75rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9' fill='none'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%233d4c67' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }
      `}</style>
    </div>
  );
}
