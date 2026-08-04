/**
 * The lead payload the website captures and forwards to the CRM.
 *
 * This is the ONE contract between the site and the CRM. The API route
 * (app/api/lead) forwards this JSON to the CRM webhook; when we know the CRM's
 * exact field names we map them there, so the form and this type never change.
 */
export interface LeadPayload {
  /** Full name. */
  name: string;
  /** Phone (WhatsApp) or email, whatever the visitor typed. */
  contact: string;
  /** Buy / Sell / Invest. */
  intent?: string;
  /** Community of interest (e.g. "Dubai Marina"). */
  area?: string;
  /** Budget band. */
  budget?: string;
  /** Free-text message, if any. */
  message?: string;
  /** Where the lead came from, e.g. "area:dubai-marina", "developer:emaar". */
  source?: string;
  /** Full page URL the form was submitted from. */
  pageUrl?: string;
  /** ISO timestamp, set server-side. */
  submittedAt?: string;
  /** Spam honeypot; must be empty for real submissions. */
  honeypot?: string;
}
