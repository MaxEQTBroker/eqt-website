import { RevealText } from "@/components/motion/RevealText";

/** Oversized opening statement, letters materialise like smoke on scroll. */
export function Statement() {
  return (
    <section className="container-lux py-[var(--section-py)]">
      <div className="hairline mb-12 max-w-24" />
      <p className="mb-10 text-xs uppercase tracking-[0.26em] text-accent-600">EQT · Dubai</p>
      <RevealText
        as="h2"
        text="A private brokerage for Dubai's most exceptional homes, represented quietly, and offered to a select few who value discretion above all."
        className="block max-w-[46ch] font-display text-[clamp(1.6rem,3.6vw,3.25rem)] font-medium leading-[1.12] text-ink"
      />
    </section>
  );
}
