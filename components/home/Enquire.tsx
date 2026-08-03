import { RevealText } from "@/components/motion/RevealText";
import { site, whatsappLink } from "@/lib/site";

/** Closing, minimal enquiry moment — WhatsApp-first, generous whitespace. */
export function Enquire() {
  return (
    <section className="container-lux py-[var(--section-py)] text-center">
      <RevealText
        as="h2"
        text="Begin a private conversation."
        className="mx-auto block max-w-[16ch] font-display text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.05] text-ink"
      />
      <p className="mx-auto mt-8 max-w-md text-lg text-muted">
        Tell us what you&apos;re looking for. We respond personally, usually within the hour.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
        >
          Enquire on WhatsApp
        </a>
        <a href={`mailto:${site.contact.email}`} className="btn btn-ghost">
          {site.contact.email}
        </a>
      </div>
    </section>
  );
}
