import type { LeadPayload } from "./types";

/**
 * Email a lead notification so leads land in an inbox instantly, no CRM needed.
 * Uses the Resend HTTP API (no SDK). Best-effort and non-blocking: never throws,
 * no-ops if env vars aren't set, so email trouble can't break the form.
 *
 * Env (server-side):
 *   RESEND_API_KEY      from resend.com (free tier is plenty for leads)
 *   LEAD_NOTIFY_EMAIL   where to send (e.g. m.karnaukh@eqt.ae); comma-separate for several
 *   LEAD_FROM_EMAIL     (optional) verified sender; defaults to onboarding@resend.dev
 */
export async function notifyLead(lead: LeadPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = process.env.LEAD_FROM_EMAIL || "EQT Leads <onboarding@resend.dev>";
  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Contact", lead.contact],
    ["Looking to", lead.intent],
    ["Community", lead.area],
    ["Budget", lead.budget],
    ["Timeframe", lead.timeframe],
    ["Message", lead.message],
    ["Source", lead.source],
    ["Page", lead.pageUrl],
    ["Submitted", lead.submittedAt],
  ];
  const html =
    `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#16223b">` +
    `<h2 style="margin:0 0 12px">New EQT enquiry</h2>` +
    `<table style="border-collapse:collapse">` +
    rows
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#6c7891">${k}</td><td style="padding:4px 0"><strong>${String(v)}</strong></td></tr>`,
      )
      .join("") +
    `</table></div>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: `New lead: ${lead.name || "enquiry"}${lead.area ? ` · ${lead.area}` : ""}`,
        html,
        reply_to: lead.contact?.includes("@") ? lead.contact : undefined,
      }),
    });
  } catch (err) {
    console.error("[lead] email notify failed (non-fatal):", err);
  }
}
