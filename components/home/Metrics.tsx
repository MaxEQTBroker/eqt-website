import { getLocale } from "next-intl/server";
import { getTrustSignals } from "@/lib/data/repository";
import { MetricsClimb } from "@/components/home/MetricsClimb";
import { uiContent } from "@/lib/data/i18n/ui";

/** Server wrapper: fetches the figures, hands them to the climbing display.
 * Numeric values stay as-is; only the labels/details are localized. */
export async function Metrics() {
  const locale = await getLocale();
  const signals = await getTrustSignals();
  const t = uiContent<{ metrics?: { label: string; detail: string }[] }>("home", locale).metrics;
  const localized = t
    ? signals.map((s, i) => ({ ...s, label: t[i]?.label ?? s.label, detail: t[i]?.detail ?? s.detail }))
    : signals;
  return <MetricsClimb signals={localized} />;
}
