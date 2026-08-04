"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { postLead } from "@/lib/leads/submit";
import { trackLead } from "@/lib/analytics";
import { COMMUNITY_LABELS } from "@/lib/data/communityLabels";

/**
 * Seller-focused valuation lead magnet. Captures the property details plus
 * contact, then forwards to the CRM (intent "Sell", source "valuation") so an
 * advisor can prepare and send the valuation. WhatsApp is the fast-path fallback.
 */
const PROPERTY_TYPES = ["Apartment", "Villa", "Penthouse", "Townhouse", "Mansion", "Plot"];
const BEDROOMS = ["Studio", "1", "2", "3", "4", "5+"];

export function ValuationForm({ source = "valuation" }: { source?: string } = {}) {
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
    trackLead({ source, intent: "Sell" });
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-line bg-elevated p-8 text-center sm:p-10">
        <p className="eyebrow mb-4">Thank you, {name.split(" ")[0]}</p>
        <h3 className="font-display text-2xl text-ink">Your valuation is on its way</h3>
        <p className="mx-auto mt-4 max-w-sm text-muted">
          An advisor will prepare a valuation for your {ptype.toLowerCase()} in {community} and be in
          touch shortly. For the fastest response, continue on WhatsApp.
        </p>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-7 inline-block"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-elevated p-6 sm:p-9">
      <p className="eyebrow mb-6">Free property valuation</p>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Community</span>
          <select className="lux-input lux-select" value={community} onChange={(e) => setCommunity(e.target.value)}>
            <option value="">Select a community…</option>
            {COMMUNITY_LABELS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm text-muted">Property type</span>
            <select className="lux-input lux-select" value={ptype} onChange={(e) => setPtype(e.target.value)}>
              <option value="">Select type…</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-muted">Bedrooms</span>
            <select className="lux-input lux-select" value={beds} onChange={(e) => setBeds(e.target.value)}>
              <option value="">Select…</option>
              {BEDROOMS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm text-muted">Approximate size (sq ft) — optional</span>
          <input
            className="lux-input"
            value={size}
            onChange={(e) => setSize(e.target.value.replace(/[^0-9,]/g, ""))}
            placeholder="e.g. 2,400"
            inputMode="numeric"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm text-muted">Full name</span>
            <input className="lux-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alexander Ross" autoComplete="name" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-muted">WhatsApp or email</span>
            <input className="lux-input" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+971 50 000 0000" autoComplete="tel" />
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
        {sending ? "Sending…" : "Get my valuation"}
      </button>
      <p className="mt-4 text-xs text-faint">Free and without obligation. Your details are shared only with EQT.</p>

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
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9' fill='none'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%237a6a4d' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }
      `}</style>
    </div>
  );
}
