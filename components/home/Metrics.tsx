import { getTrustSignals } from "@/lib/data/repository";
import { MetricsClimb } from "@/components/home/MetricsClimb";

/** Server wrapper: fetches the figures, hands them to the climbing display. */
export async function Metrics() {
  const signals = await getTrustSignals();
  return <MetricsClimb signals={signals} />;
}
