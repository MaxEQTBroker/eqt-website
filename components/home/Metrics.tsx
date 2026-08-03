import { getTrustSignals } from "@/lib/data/repository";
import { CountUp } from "@/components/motion/CountUp";

/** Climbing brokerage numbers on the beige canvas, separated by clean lines. */
export async function Metrics() {
  const signals = await getTrustSignals();
  return (
    <section className="border-y border-line">
      <div className="container-lux grid grid-cols-2 md:grid-cols-4">
        {signals.map((s, i) => (
          <div
            key={s.label}
            className={`px-3 py-14 text-center md:py-20 ${i > 0 ? "md:border-l md:border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""}`}
          >
            <CountUp text={s.value} className="block font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-ink" />
            <div className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-faint">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
