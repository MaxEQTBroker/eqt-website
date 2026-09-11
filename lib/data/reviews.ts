/**
 * Real client reviews. IMPORTANT: only genuine, verifiable reviews belong here,
 * never fabricated ones (fake reviews are a legal risk and a Google spam
 * violation). Populate from EQT's Google Business Profile or other real sources.
 *
 * While this array is empty, the <Testimonials /> section renders nothing, so
 * the site never shows an empty or placeholder testimonials block.
 *
 * Star-rating schema (AggregateRating) is emitted separately in
 * lib/seo/jsonld.tsx and is gated behind NEXT_PUBLIC_REVIEW_RATING /
 * NEXT_PUBLIC_REVIEW_COUNT, so it too only appears with real numbers.
 */
export type Review = {
  author: string;
  /** 1 to 5 */
  rating: number;
  text: string;
  /** e.g. "Google" */
  source?: string;
  /** ISO date, e.g. "2026-08-01" */
  date?: string;
  /** Link to the original review, if public */
  url?: string;
};

export const reviews: Review[] = [];
