import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/leads/types";
import { storeLead } from "@/lib/leads/store";

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

  if (!data.name?.trim() || !data.contact?.trim()) {
    return NextResponse.json({ ok: false, error: "name_and_contact_required" }, { status: 422 });
  }

  const lead: LeadPayload = {
    name: data.name.trim(),
    contact: data.contact.trim(),
    intent: data.intent,
    area: data.area,
    budget: data.budget,
    timeframe: data.timeframe,
    message: data.message,
    source: data.source ?? "website",
    pageUrl: data.pageUrl,
    submittedAt: new Date().toISOString(),
  };

  // Backup every lead to our own Supabase store (best-effort) so leads are
  // reviewable on-site without opening the CRM. Never blocks the response.
  await storeLead(lead);

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
