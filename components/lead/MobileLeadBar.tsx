"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { uiContent } from "@/lib/data/i18n/ui";
import { LeadForm, INTENTS, type Intent } from "@/components/lead/LeadForm";

/**
 * Sticky bottom lead capture for mobile/tablet blog reading. Instead of a single
 * button, it surfaces step one of the lead form directly ("How can we help?"
 * with Buy / Sell / Invest / Relocate). Tapping a choice opens the full form in
 * a bottom sheet, pre-selected on that intent and advanced to the next step.
 * Hidden on lg+, where the form lives in the sticky sidebar.
 */
type GoalCopy = {
  legendGoal: string;
  intentBuy: string;
  intentSell: string;
  intentInvest: string;
  intentRelocate: string;
};

export function MobileLeadBar({ source }: { source?: string }) {
  const locale = useLocale();
  const c = uiContent<GoalCopy>("leadForm", locale);
  const labels: Record<Intent, string> = {
    Buy: c.intentBuy,
    Sell: c.intentSell,
    Invest: c.intentInvest,
    Relocate: c.intentRelocate,
  };

  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<Intent | undefined>(undefined);
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

  const openWith = (i: Intent) => {
    setPicked(i);
    setOpen(true);
  };

  return (
    <>
      {/* Spacer so the fixed bar never hides the final content on mobile. */}
      <div aria-hidden className="h-24 lg:hidden" />

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-base/95 backdrop-blur lg:hidden"
        style={{
          transform: show ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="container-lux py-2">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
            {c.legendGoal}
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {INTENTS.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => openWith(i)}
                className="flex min-h-[38px] items-center justify-center rounded-full border border-line bg-elevated px-1 py-1.5 text-center text-[12px] font-medium leading-tight text-ink transition-colors hover:border-accent-500 active:border-accent-500 active:bg-accent-500 active:text-on-accent"
              >
                {labels[i]}
              </button>
            ))}
          </div>
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
          <div className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-2xl border-t border-line bg-base px-5 pb-8 pt-3">
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
            <LeadForm source={source} initialIntent={picked} />
          </div>
        </div>
      )}
    </>
  );
}
