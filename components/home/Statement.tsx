import { getLocale } from "next-intl/server";
import { RevealText } from "@/components/motion/RevealText";
import { uiContent } from "@/lib/data/i18n/ui";

/** Oversized opening statement, letters materialise like smoke on scroll. */
export async function Statement() {
  const locale = await getLocale();
  const c = uiContent<{ statementEyebrow: string; statement: string }>("home", locale);
  return (
    <section className="container-lux py-[var(--section-py)]">
      <div className="hairline mb-12 max-w-24" />
      <p className="mb-10 text-xs uppercase tracking-[0.26em] text-faint">{c.statementEyebrow}</p>
      <RevealText
        as="h2"
        text={c.statement}
        className="block max-w-[46ch] font-display text-[clamp(1.6rem,3.6vw,3.25rem)] font-medium leading-[1.12] text-ink"
      />
    </section>
  );
}
