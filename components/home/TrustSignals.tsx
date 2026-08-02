import { getTrustSignals } from "@/lib/data/repository";
import { StatsConvergeClient } from "./StatsConvergeClient";

/**
 * Server wrapper for the converging stats moment. Fetches the figures through
 * the data seam (SSR-rendered for crawlers) and hands them to the client
 * scroll animation.
 */
export async function TrustSignals() {
  const signals = await getTrustSignals();
  return <StatsConvergeClient signals={signals} />;
}
