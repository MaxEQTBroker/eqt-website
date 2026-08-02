import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { site, whatsappLink } from "@/lib/site";

/** Closing lead-capture section: WhatsApp-first, with the multi-step form. */
export function LeadSection() {
  return (
    <section id="enquire" className="border-t border-line bg-elevated">
      <div className="container-lux grid gap-14 py-[var(--section-py)] lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4">Begin the conversation</p>
          <h2 className="display-h2 max-w-[14ch] text-ink">
            Speak with a private advisor
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">
            Tell us what you&apos;re looking for. We&apos;ll respond personally,
            usually within the hour, with a shortlist matched to your brief.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to speak with an advisor.`)}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
            </a>
            <a href={`mailto:${site.contact.email}`} className="btn btn-ghost">
              {site.contact.email}
            </a>
          </div>

          <p className="mt-8 text-sm text-faint">
            Prefer to call? {site.contact.phone}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
