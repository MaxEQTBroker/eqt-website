import { NextResponse } from "next/server";

// Diagnostic: confirms the CRM listings env wiring without exposing secrets.
// Visit /api/listings-status after redeploying to verify.
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.CRM_LISTINGS_URL;
  const token = process.env.CRM_LISTINGS_TOKEN;

  let crmStatus: number | null = null;
  let count: number | null = null;
  let error: string | null = null;

  if (url) {
    try {
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: "no-store",
      });
      crmStatus = res.status;
      if (res.ok) {
        const data = await res.json();
        const arr = Array.isArray(data) ? data : (data?.listings ?? data?.records ?? []);
        count = Array.isArray(arr) ? arr.length : null;
      }
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    urlConfigured: Boolean(url),
    tokenConfigured: Boolean(token),
    crmStatus, // 200 = good, 401 = bad/missing token, null = url not set
    count, // number of active listings the CRM returned
    error,
  });
}
