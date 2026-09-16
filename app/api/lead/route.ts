import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/leads/types";
import { storeLead } from "@/lib/leads/store";
import { notifyLead } from "@/lib/leads/notify";
import { rateLimit, clientIp } from "@/lib/security/rateLimit";

// Cap each field so a bot can't push megabytes into the CRM / Supabase / email.
const MAX = { name: 120, contact: 200, area: 120, intent: 60, budget: 120, timeframe: 120, message: 4000, source: 120, pageUrl: 500 };
function cap(v: unknown, n: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t ? t.slice(0, n) : undefined;
}

/**
 * Health/config check (safe: booleans only, never the secret values).
 * GET /api/lead lets us confirm the CRM env vars actually reached the running
 * deployment without exposing anything.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    webhookConfigured: Boolean(process.env.CRM_LEAD_WEBHOOK_URL),
    apiKeyConfigured: Boolean(process.env.CRM_LEAD_API_KEY),
  });
}

/**
 * Lead intake endpoint. The browser POSTs a LeadPayload here; this server route
 * forwards it to the CRM. Running server-side keeps the CRM credentials out of
 * the browser and avoids CORS issues.
 *
 * CONFIG (Vercel env vars, all server-side, NOT NEXT_PUBLIC):
 *   CRM_LEAD_WEBHOOK_URL   the CRM endpoint that accepts an inbound lead (POST JSON)
 *   CRM_LEAD_API_KEY       (optional) auth token/key for the CRM
 *   CRM_LEAD_AUTH_HEADER   (optional) header to send the key in. Default "Authorization"
 *   CRM_LEAD_AUTH_SCHEME   (optional) prefix for the value. Default "Bearer" (set "" for a raw key)
 *
 * Until CRM_LEAD_WEBHOOK_URL is set, this still returns ok:true so the form's
 * WhatsApp fallback keeps working and no lead is lost.
 */
export async function POST(req: Request) {
  // Rate limit: max 5 submissions per minute per IP (best-effort, per instance).
  if (!rateLimit(`lead:${clientIp(req)}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  // Reject oversized bodies before parsing (defence against payload-bomb spam).
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 20_000) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let data: LeadPayload;
  try {
    data = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Spam honeypot: bots fill hidden fields. Pretend success, forward nothing.
  if (data.honeypot && data.honeypot.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = cap(data.name, MAX.name);
  const contact = cap(data.contact, MAX.contact);
  if (!name || !contact) {
    return NextResponse.json({ ok: false, error: "name_and_contact_required" }, { status: 422 });
  }

  const lead: LeadPayload = {
    name,
    contact,
    intent: cap(data.intent, MAX.intent),
    area: cap(data.area, MAX.area),
    budget: cap(data.budget, MAX.budget),
    timeframe: cap(data.timeframe, MAX.timeframe),
    message: cap(data.message, MAX.message),
    source: cap(data.source, MAX.source) ?? "website",
    pageUrl: cap(data.pageUrl, MAX.pageUrl),
    submittedAt: new Date().toISOString(),
  };

  // Backup every lead to our own Supabase store + email a notification
  // (both best-effort, so leads are reviewable without the CRM). Never fatal.
  await Promise.allSettled([storeLead(lead), notifyLead(lead)]);

  const webhook = process.env.CRM_LEAD_WEBHOOK_URL;
  if (!webhook) {
    // Not wired yet: log so we can see leads in server logs, but don't fail.
    console.warn("[lead] CRM_LEAD_WEBHOOK_URL not set; captured but not forwarded:", lead.name, lead.contact);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const key = process.env.CRM_LEAD_API_KEY;
    if (key) {
      const header = process.env.CRM_LEAD_AUTH_HEADER || "Authorization";
      const scheme = process.env.CRM_LEAD_AUTH_SCHEME ?? "Bearer";
      headers[header] = scheme ? `${scheme} ${key}` : key;
    }

    const res = await fetch(webhook, {
      method: "POST",
      headers,
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      console.error("[lead] CRM rejected the lead:", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, delivered: false, status: res.status }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] forwarding to CRM failed:", err);
    return NextResponse.json({ ok: false, delivered: false }, { status: 502 });
  }
}
