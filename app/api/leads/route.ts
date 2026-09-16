import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * RETIRED (security): the on-site lead viewer was removed. It authenticated via a
 * key in the query string (?key=...), which leaks the admin key into server/access
 * logs, browser history, and Referer headers, and exposed every lead's PII.
 *
 * Leads are still captured: app/api/lead POST stores each one in Supabase (backup)
 * and forwards it to the CRM. Review leads in the CRM, or directly in the Supabase
 * dashboard — not over a public web URL. This endpoint now returns 410 Gone and
 * reads no data.
 */
export function GET() {
  return NextResponse.json(
    { ok: false, error: "gone", message: "The lead viewer has been retired. Use the CRM." },
    { status: 410, headers: { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" } },
  );
}
