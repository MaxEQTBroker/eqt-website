import { RevealText } from "@/components/motion/RevealText";

/** Oversized opening statement — letters materialise like smoke on scroll. */
export function Statement() {
  return (
    <section className="container-lux py-[var(--section-py)]">
      <div className="hairline mb-12 max-w-24" />
      <p className="mb-10 text-xs uppercase tracking-[0.26em] text-accent-600">EQT · Dubai</p>
      <RevealText
        as="h2"
        text="A private brokerage for Dubai's most exceptional homes — represented quietly, for a few."
        className="block max-w-[18ch] font-display text-[clamp(2rem,5.2vw,5rem)] font-medium leading-[1.04] text-ink"
      />
    </section>
  );
}
