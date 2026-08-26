import type { LeadPayload } from "./types";

/**
 * Persist a lead to Supabase (a `leads` table) as an on-site backup of the CRM,
 * so leads can be reviewed without opening the CRM. Best-effort and non-blocking:
 * never throws, and silently no-ops if Supabase env vars aren't configured, so a
 * storage hiccup can never break the lead form or the CRM forward.
 *
 * Env (server-side, already used for sold images):
 *   SUPABASE_URL           e.g. https://xxxx.supabase.co
 *   SUPABASE_SERVICE_KEY   service-role key (bypasses RLS; server-only)
 *
 * Table (run once in the Supabase SQL editor):
 *   create table if not exists public.leads (
 *     id uuid primary key default gen_random_uuid(),
 *     name text, contact text, intent text, area text, budget text,
 *     timeframe text, message text, source text, page_url text,
 *     submitted_at timestamptz default now()
 *   );
 */
export async function storeLead(lead: LeadPayload): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return; // not configured yet: skip quietly

  try {
    await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: lead.name ?? null,
        contact: lead.contact ?? null,
        intent: lead.intent ?? null,
        area: lead.area ?? null,
        budget: lead.budget ?? null,
        timeframe: lead.timeframe ?? null,
        message: lead.message ?? null,
        source: lead.source ?? null,
        page_url: lead.pageUrl ?? null,
        submitted_at: lead.submittedAt ?? new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("[lead] Supabase store failed (non-fatal):", err);
  }
}

/** Read recent leads back for the private viewer. Returns [] if not configured. */
export async function listLeads(limit = 200): Promise<unknown[]> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(
      `${url}/rest/v1/leads?select=*&order=submitted_at.desc&limit=${limit}`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" },
    );
    if (!res.ok) return [];
    return (await res.json()) as unknown[];
  } catch {
    return [];
  }
}
