import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

/**
 * Temporary placeholder for routes being built in later iterations. Still
 * server-rendered with real content and a working CTA so nothing dead-ends.
 */
export function ComingSoon({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="container-lux flex min-h-[70svh] flex-col justify-center py-40">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h1 className="display-hero max-w-[14ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}>
        {title}
      </h1>
      <p className="mt-8 max-w-xl text-lg text-muted">{body}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)}
          className="btn btn-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire on WhatsApp
        </a>
        <Link href="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
    </section>
  );
}
