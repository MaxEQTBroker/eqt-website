import Script from "next/script";

/**
 * Google Analytics 4. Loads only when NEXT_PUBLIC_GA_ID is set (a "G-XXXXXXX"
 * Measurement ID from your GA4 property), so nothing runs until you add it in
 * Vercel. Page views are automatic; lead submissions fire a `generate_lead`
 * conversion event via lib/analytics `trackLead`.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
