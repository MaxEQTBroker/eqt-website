import { NextResponse } from "next/server";
import { listLeads } from "@/lib/leads/store";

export const dynamic = "force-dynamic";

/**
 * Private lead viewer. Returns recent leads as JSON only when the request
 * carries the correct secret (?key=... matching ADMIN_LEADS_KEY). Guards against
 * exposing PII: 404 when the key is unset (feature off) and 401 on a wrong key.
 */
export async function GET(req: Request) {
  const secret = process.env.ADMIN_LEADS_KEY;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 404 });
  }
  const key = new URL(req.url).searchParams.get("key");
  if (key !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const leads = await listLeads(300);
  return NextResponse.json(
    { ok: true, count: leads.length, leads },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
  );
}
