import { RevealText } from "@/components/motion/RevealText";
import { site, whatsappLink } from "@/lib/site";

/** Closing, minimal enquiry moment, WhatsApp-first, generous whitespace. */
export function Enquire() {
  return (
    <section className="container-lux py-[var(--section-py)] text-center">
      <RevealText
        as="h2"
        text="The best villas in Dubai are sold privately."
        className="mx-auto block max-w-[22ch] font-display text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[1.08] text-ink"
      />
      <p className="mx-auto mt-8 max-w-lg text-lg text-muted">
        Search a private database of off-market homes, and speak with an advisor who answers personally, usually within the hour.
      </p>
      <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row">
        <a
          href={whatsappLink(`Hello ${site.name}, I'd like access to your private listings.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-whatsapp"
        >
          WhatsApp
        </a>
        <a href={`mailto:${site.contact.email}`} className="link-quiet">
          {site.contact.email}
        </a>
      </div>
    </section>
  );
}
