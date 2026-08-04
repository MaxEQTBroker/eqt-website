import type { LeadPayload } from "./types";

/**
 * Send a lead to our own API route (which forwards it to the CRM server-side).
 * Never throws: returns { ok } so the form can always fall through to WhatsApp.
 */
export async function postLead(payload: LeadPayload): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
    return { ok: Boolean(json.ok) };
  } catch {
    return { ok: false };
  }
}
