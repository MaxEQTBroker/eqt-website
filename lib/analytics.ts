type Gtag = (command: string, action: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/**
 * Fire a lead-conversion event. Safe no-op when analytics isn't configured.
 * In GA4, mark `generate_lead` as a Conversion to see it in reports/Ads.
 */
export function trackLead(params: { source?: string; intent?: string } = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "generate_lead", { ...params });
  window.dataLayer?.push({ event: "generate_lead", ...params });
}
