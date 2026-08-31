"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { LeadForm } from "@/components/lead/LeadForm";

/**
 * Thin sticky lead bar for mobile/tablet blog reading. The full multi-step
 * LeadForm otherwise stacks at the very bottom of the article on small screens,
 * so a reader never sees it while reading. This keeps a slim, always-visible
 * bar pinned to the bottom (WhatsApp + Enquire), and opens the full form in a
 * bottom sheet on tap. Hidden on lg+, where the form sits in the sticky sidebar.
 */
export function MobileLeadBar({
  source,
  title,
  cta,
}: {
  source?: string;
  title: string;
  cta: string;
}) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Spacer so the fixed bar never hides the final content on mobile. */}
      <div aria-hidden className="h-16 lg:hidden" />

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-base/95 backdrop-blur lg:hidden"
        style={{
          transform: show ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="container-lux flex items-center gap-2.5 py-2">
          <p className="min-w-0 flex-1 truncate text-sm text-ink">{title}</p>
          <a
            href={whatsappLink(`Hello ${site.name}, I have a question about a property.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: "#25d366" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 0a11.9 11.9 0 0 0-10.2 18l-1.8 6 6.2-1.6A11.9 11.9 0 1 0 12 0zm0 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.8zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.6 2.5 1 3 .8 3.6.8.5 0 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 whitespace-nowrap rounded-full bg-accent-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-on-accent"
          >
            {cta}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-2xl border-t border-line bg-base px-5 pb-8 pt-3">
            <div className="mb-1 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-3xl font-light leading-none text-faint"
              >
                ×
              </button>
            </div>
            <LeadForm source={source} />
          </div>
        </div>
      )}
    </>
  );
}
