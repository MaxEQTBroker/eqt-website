import Script from "next/script";

/**
 * Google Analytics 4. Loads only when NEXT_PUBLIC_GA_ID is set (a "G-XXXXXXX"
 * Measurement ID from your GA4 property), so nothing runs until you add it in
 * Vercel. Page views are automatic; lead submissions fire a `generate_lead`
 * conversion event via lib/analytics `trackLead`.
 */
export function Analytics() {
  // GA Measurement IDs are public (visible in page source), so defaulting it
  // here is safe; NEXT_PUBLIC_GA_ID can still override.
  const id = process.env.NEXT_PUBLIC_GA_ID || "G-HDZC6J8TVK";
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
gtag('config', '${id}');
// Count WhatsApp clicks (the primary enquiry path) + tel/mailto clicks as leads.
document.addEventListener('click', function(e){
  var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
  if(!a) return;
  var h = a.getAttribute('href') || '';
  if(h.indexOf('wa.me')>-1 || h.indexOf('api.whatsapp')>-1 || h.indexOf('whatsapp')>-1){
    gtag('event','generate_lead',{source:'whatsapp'});
  } else if(h.indexOf('tel:')===0){
    gtag('event','generate_lead',{source:'phone'});
  } else if(h.indexOf('mailto:')===0){
    gtag('event','generate_lead',{source:'email'});
  }
}, true);`}
      </Script>
    </>
  );
}
