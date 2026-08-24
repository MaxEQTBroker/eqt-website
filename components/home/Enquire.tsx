import { getLocale } from "next-intl/server";
import { RevealText } from "@/components/motion/RevealText";
import { site, whatsappLink } from "@/lib/site";
import { uiContent } from "@/lib/data/i18n/ui";

/** Closing, minimal enquiry moment, WhatsApp-first, generous whitespace. */
export async function Enquire() {
  const locale = await getLocale();
  const c = uiContent<{ enquireHeading: string; enquireBody: string }>("home", locale);
  return (
    <section className="container-lux py-[var(--section-py)] text-center">
      <RevealText
        as="h2"
        text={c.enquireHeading}
        className="mx-auto block max-w-[22ch] font-display text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[1.08] text-ink"
      />
      <p className="mx-auto mt-8 max-w-lg text-lg text-muted">
        {c.enquireBody}
      </p>
      <div className="mt-11 flex flex-col items-center justify-center gap-8 sm:flex-row">
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
