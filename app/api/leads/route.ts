import { NextResponse } from "next/server";
import { listLeads } from "@/lib/leads/store";

export const dynamic = "force-dynamic";

type LeadRow = {
  submitted_at?: string; name?: string; contact?: string; intent?: string;
  area?: string; budget?: string; timeframe?: string; source?: string;
  page_url?: string; message?: string;
};

function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

function page(leads: LeadRow[], key: string): string {
  const rows = leads
    .map((l) => {
      const when = l.submitted_at ? new Date(l.submitted_at).toLocaleString("en-GB", { timeZone: "Asia/Dubai" }) : "";
      const page = l.page_url ? esc(l.page_url.replace(/^https?:\/\/[^/]+/, "")) : "";
      return `<tr>
        <td class="mono">${esc(when)}</td>
        <td><strong>${esc(l.name)}</strong></td>
        <td>${esc(l.contact)}</td>
        <td>${esc(l.intent)}</td>
        <td>${esc(l.area)}</td>
        <td>${esc(l.budget || l.timeframe)}</td>
        <td>${esc(l.source)}</td>
        <td class="mono small">${page}</td>
      </tr>`;
    })
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>EQT Leads</title>
<style>
  :root{--navy:#16223b;--pearl:#edeff4;--line:#c3cad9;--blue:#2e5d93;--muted:#3d4c67}
  *{box-sizing:border-box} body{margin:0;background:var(--pearl);color:var(--navy);font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif}
  header{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:24px 28px;border-bottom:1px solid var(--line)}
  h1{margin:0;font-size:20px;letter-spacing:.02em} .count{color:var(--muted);font-size:14px}
  .wrap{padding:20px 28px;overflow-x:auto}
  table{border-collapse:collapse;width:100%;min-width:820px;background:#fff;border:1px solid var(--line);border-radius:10px;overflow:hidden}
  th,td{text-align:left;padding:11px 14px;border-bottom:1px solid var(--line);vertical-align:top}
  th{background:#e3e7f0;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
  tr:last-child td{border-bottom:0} tr:hover td{background:#f5f7fb}
  .mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;color:var(--muted)} .small{font-size:11.5px}
  a.dl{color:var(--blue);text-decoration:none;font-size:13px} .empty{padding:60px 28px;color:var(--muted);text-align:center}
</style></head><body>
<header><h1>EQT Leads</h1><div class="count">${leads.length} lead${leads.length === 1 ? "" : "s"} · <a class="dl" href="/api/leads?key=${encodeURIComponent(key)}&format=json">download JSON</a></div></header>
${leads.length
    ? `<div class="wrap"><table><thead><tr><th>When (Dubai)</th><th>Name</th><th>Contact</th><th>Intent</th><th>Community</th><th>Budget / When</th><th>Source</th><th>Page</th></tr></thead><tbody>${rows}</tbody></table></div>`
    : `<div class="empty">No leads stored yet. New submissions will appear here automatically.</div>`}
</body></html>`;
}

/**
 * Private lead viewer. Renders a clean HTML table (or JSON with &format=json)
 * only when ?key=... matches ADMIN_LEADS_KEY. 404 when the key is unset (feature
 * off), 401 on a wrong key. Never indexable.
 */
export async function GET(req: Request) {
  const secret = process.env.ADMIN_LEADS_KEY;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 404 });
  }
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (key !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const leads = (await listLeads(500)) as LeadRow[];
  if (url.searchParams.get("format") === "json") {
    return NextResponse.json(
      { ok: true, count: leads.length, leads },
      { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
    );
  }
  return new NextResponse(page(leads, secret), {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}
