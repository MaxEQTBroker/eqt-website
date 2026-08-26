"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { site, whatsappLink } from "@/lib/site";
import { postLead } from "@/lib/leads/submit";
import { trackLead } from "@/lib/analytics";
import { COMMUNITY_LABELS } from "@/lib/data/communityLabels";
import { uiContent } from "@/lib/data/i18n/ui";

/**
 * Multi-step lead form. On submit it POSTs the lead to /api/lead (which forwards
 * it to the CRM server-side), then shows a confirmation with a WhatsApp button
 * as the guaranteed fallback channel, so a lead is never lost even if the CRM
 * is down or not yet configured.
 */

type Intent = "Buy" | "Sell" | "Invest" | "Relocate";
const INTENTS: Intent[] = ["Buy", "Sell", "Invest", "Relocate"];
const QUICK_COMMUNITIES = ["Palm Jumeirah", "Dubai Marina", "Downtown Dubai"];

type LeadCopy = {
  step: string; of: string; legendGoal: string;
  intentBuy: string; intentSell: string; intentInvest: string; intentRelocate: string;
  legendCommunity: string; allCommunities: string; legendBudget: string;
  budgetUnder10: string; budget10to30: string; budget30to75: string; budget75plus: string;
  legendTimeframe: string; timeUnder3: string; time3to6: string; time6plus: string;
  legendContact: string; fullName: string; fullNamePlaceholder: string;
  contactLabel: string; contactPlaceholder: string; back: string; sending: string;
  send: string; tapToContinue: string; notSureYet: string; selectCommunity: string;
  closeList: string; close: string; searchPlaceholder: string; noMatches: string;
  thankYou: string; successHeading: string; successBody: string; continueWhatsapp: string;
};

type StepKey = "goal" | "community" | "budget" | "timeframe" | "contact";

/**
 * @param defaultArea  When set (e.g. embedded on an area page), the community is
 *                     preselected and shown first in the options.
 * @param source       Attribution for the CRM, e.g. "area:dubai-marina".
 */
export function LeadForm({
  defaultArea,
  source,
}: { defaultArea?: string; source?: string } = {}) {
  const reduce = useReducedMotion();
  const locale = useLocale();
  const c = uiContent<LeadCopy>("leadForm", locale);
  const intentLabels: Record<Intent, string> = {
    Buy: c.intentBuy, Sell: c.intentSell, Invest: c.intentInvest, Relocate: c.intentRelocate,
  };
  const BUDGETS = [c.budgetUnder10, c.budget10to30, c.budget30to75, c.budget75plus];
  const TIMEFRAMES = [c.timeUnder3, c.time3to6, c.time6plus];
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [area, setArea] = useState<string | null>(defaultArea ?? null);
  const [budget, setBudget] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string | null>(null);
  const [showAllCommunities, setShowAllCommunities] = useState(false);
  const [communityQuery, setCommunityQuery] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  // Portal target only exists on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const relocating = intent === "Relocate";

  // The question flow adapts to intent: Relocate just asks the timeframe (no
  // community/budget). Selecting an option auto-advances to the next question.
  const flow: StepKey[] = relocating
    ? ["goal", "timeframe", "contact"]
    : ["goal", "community", "budget", "contact"];
  const stepIndex = Math.min(step, flow.length - 1);
  const current = flow[stepIndex];

  // Three quick community picks (+ an "Others" dropdown). On an area page, that
  // community leads the quick picks.
  const quickPicks = useMemo(() => {
    if (defaultArea && !QUICK_COMMUNITIES.includes(defaultArea)) {
      return [defaultArea, ...QUICK_COMMUNITIES].slice(0, 3);
    }
    return QUICK_COMMUNITIES;
  }, [defaultArea]);

  const canSubmit = name.trim().length > 1 && contact.trim().length > 3;

  const advance = () => setStep((s) => Math.min(s + 1, flow.length - 1));
  const chooseIntent = (v: Intent) => {
    setIntent(v);
    setStep(1); // auto-advance out of the goal step
  };
  const chooseArea = (v: string | null) => {
    setArea(v);
    setShowAllCommunities(false);
    setCommunityQuery("");
    if (v) advance();
  };

  // Close the community overlay on Escape.
  useEffect(() => {
    if (!showAllCommunities) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAllCommunities(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showAllCommunities]);

  // Track the visual viewport so the community popup (and its search field) stay
  // centred in the *visible* area rather than behind the on-screen keyboard on
  // iOS/Android. When the keyboard opens the visual viewport shrinks; we pin the
  // popup layer to it so the input never ends up hidden under the keyboard.
  const [viewport, setViewport] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  useEffect(() => {
    if (!showAllCommunities) return;
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (!vv) return;
    const update = () =>
      setViewport({ top: vv.offsetTop, left: vv.offsetLeft, width: vv.width, height: vv.height });
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      setViewport(null);
    };
  }, [showAllCommunities]);

  const filteredCommunities = useMemo(() => {
    const q = communityQuery.trim().toLowerCase();
    const all = [...COMMUNITY_LABELS, c.notSureYet];
    return q ? all.filter((c) => c.toLowerCase().includes(q)) : all;
  }, [communityQuery]);

  const message = useMemo(
    () =>
      `Hello ${site.name}, I'd like to enquire.\n\n` +
      `• Looking to: ${intent ?? ""}\n` +
      (area ? `• Community: ${area}\n` : "") +
      (relocating ? `• Relocation timeframe: ${timeframe ?? ""}\n` : `• Budget: ${budget ?? ""}\n`) +
      `• Name: ${name || ""}\n` +
      `• Contact: ${contact || ""}`,
    [intent, area, budget, timeframe, relocating, name, contact],
  );

  async function submit() {
    if (sending) return;
    setSending(true);
    // Fire the conversion event first so it's captured even on a slow network.
    trackLead({ source, intent: intent ?? undefined });
    // Forward to the CRM (best-effort). We still show success + WhatsApp even if
    // this fails, so the lead is never lost.
    await postLead({
      name,
      contact,
      intent: intent ?? undefined,
      area: area ?? undefined,
      budget: relocating ? undefined : budget ?? undefined,
      timeframe: relocating ? timeframe ?? undefined : undefined,
      message: relocating && timeframe ? `Relocation timeframe: ${timeframe}` : undefined,
      source,
      honeypot,
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
    });
    setSending(false);
    setSent(true);
  }

  const variants = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
      };

  if (sent) {
    return (
      <div className="rounded-lg border border-line bg-elevated p-6 text-center sm:p-8">
        <p className="eyebrow mb-4">{c.thankYou}, {name.split(" ")[0]}</p>
        <h3 className="font-display text-xl text-ink">{c.successHeading}</h3>
        <p className="mx-auto mt-4 max-w-sm text-muted">{c.successBody}</p>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-7 inline-block"
        >
          {c.continueWhatsapp}
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-elevated p-5 sm:p-6">
      {/* Progress */}
      <div className="mb-5 flex items-center gap-2" aria-hidden="true">
        {flow.map((key, i) => (
          <div key={key} className="flex flex-1 items-center gap-2">
            <div
              className="h-1 flex-1 rounded-full transition-colors duration-500"
              style={{ backgroundColor: i <= stepIndex ? "var(--accent-500)" : "var(--line)" }}
            />
          </div>
        ))}
      </div>
      <p className="eyebrow mb-5">
        {c.step} {stepIndex + 1} {c.of} {flow.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          {...variants}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {current === "goal" && (
            <fieldset>
              <legend className="mb-4 font-display text-xl text-ink">
                {c.legendGoal}
              </legend>
              <div className="grid grid-cols-2 gap-2.5">
                {INTENTS.map((opt) => (
                  <OptionButton key={opt} active={intent === opt} onClick={() => chooseIntent(opt)}>
                    {intentLabels[opt]}
                  </OptionButton>
                ))}
              </div>
            </fieldset>
          )}

          {current === "community" && (
            <fieldset>
              <legend className="mb-4 font-display text-xl text-ink">{c.legendCommunity}</legend>
              <div className="flex flex-wrap gap-2.5">
                {quickPicks.map((opt) => (
                  <OptionButton key={opt} small active={area === opt} onClick={() => chooseArea(opt)}>
                    {opt}
                  </OptionButton>
                ))}
                {area && !quickPicks.includes(area) && (
                  <OptionButton small active onClick={() => setShowAllCommunities(true)}>
                    {area}
                  </OptionButton>
                )}
                <OptionButton small active={false} onClick={() => setShowAllCommunities(true)}>
                  {c.allCommunities}
                </OptionButton>
              </div>
            </fieldset>
          )}

          {current === "budget" && (
            <fieldset>
              <legend className="mb-4 font-display text-xl text-ink">{c.legendBudget}</legend>
              <div className="flex flex-wrap gap-2.5">
                {BUDGETS.map((opt) => (
                  <OptionButton
                    key={opt}
                    small
                    active={budget === opt}
                    onClick={() => {
                      setBudget(opt);
                      advance();
                    }}
                  >
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </fieldset>
          )}

          {current === "timeframe" && (
            <fieldset>
              <legend className="mb-4 font-display text-xl text-ink">
                {c.legendTimeframe}
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {TIMEFRAMES.map((opt) => (
                  <OptionButton
                    key={opt}
                    small
                    active={timeframe === opt}
                    onClick={() => {
                      setTimeframe(opt);
                      advance();
                    }}
                  >
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </fieldset>
          )}

          {current === "contact" && (
            <div className="space-y-5">
              <legend className="mb-1 font-display text-xl text-ink">{c.legendContact}</legend>
              <Field label={c.fullName}>
                <input
                  className="lux-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={c.fullNamePlaceholder}
                  autoComplete="name"
                />
              </Field>
              <Field label={c.contactLabel}>
                <input
                  className="lux-input"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={c.contactPlaceholder}
                  autoComplete="tel"
                />
              </Field>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Honeypot: hidden from people, bots tend to fill it. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {/* Controls: choices auto-advance, so only Back + the final Send show. */}
      <div className="mt-7 flex items-center justify-between gap-4">
        <button
          type="button"
          className="text-sm text-faint transition-colors hover:text-ink disabled:opacity-0"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={stepIndex === 0}
        >
          ← {c.back}
        </button>

        {current === "contact" ? (
          <button
            type="button"
            className="btn btn-accent disabled:cursor-not-allowed disabled:opacity-40"
            onClick={submit}
            disabled={!canSubmit || sending}
          >
            {sending ? c.sending : c.send}
          </button>
        ) : (
          <span className="text-xs text-faint">{c.tapToContinue}</span>
        )}
      </div>

      <style>{`
        .lux-input {
          width: 100%;
          background: var(--bg-inset);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 0.9rem 1rem;
          color: var(--text-primary);
          font-size: 1rem;
          transition: border-color var(--dur-fast) var(--ease-lux);
        }
        .lux-input::placeholder { color: var(--text-tertiary); }
        .lux-input:focus { outline: none; border-color: var(--accent-500); }
        .lux-select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          padding-right: 2.75rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9' fill='none'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%237a6a4d' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }
      `}</style>

      {/* Community picker overlay: a fixed drawer on the right that escapes any
          sticky/overflow clipping, always scrolls, and closes via ×, backdrop,
          or Escape. */}
      {mounted && showAllCommunities && createPortal(
        <div className="fixed inset-0 z-[2147483000]" role="dialog" aria-modal="true" aria-label={c.selectCommunity}>
          {/* Transparent click-catcher: closes on outside click without darkening the screen. */}
          <button
            type="button"
            aria-label={c.closeList}
            onClick={() => setShowAllCommunities(false)}
            className="absolute inset-0 cursor-default"
          />
          {/* Positioning layer pinned to the visual viewport so the popup stays
              above the keyboard on mobile. pointer-events-none lets outside taps
              fall through to the click-catcher above; the popup re-enables them. */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center p-4"
            style={
              viewport
                ? {
                    top: viewport.top,
                    left: viewport.left,
                    width: viewport.width,
                    height: viewport.height,
                    right: "auto",
                    bottom: "auto",
                  }
                : undefined
            }
          >
          {/* Compact popup, centred in the visible viewport. */}
          <div className="pointer-events-auto flex max-h-full w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-line bg-elevated shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-display text-lg text-ink">{c.selectCommunity}</p>
              <button
                type="button"
                onClick={() => setShowAllCommunities(false)}
                aria-label={c.close}
                className="text-2xl leading-none text-faint transition-colors hover:text-ink"
              >
                &times;
              </button>
            </div>
            <div className="border-b border-line p-3">
              <input
                autoFocus
                value={communityQuery}
                onChange={(e) => setCommunityQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                className="lux-input"
              />
            </div>
            {/* data-lenis-prevent lets this list scroll natively instead of the
                smooth-scroll library eating the wheel and scrolling the page. */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-2" data-lenis-prevent>
              {filteredCommunities.length === 0 ? (
                <p className="px-3 py-6 text-sm text-faint">{c.noMatches}</p>
              ) : (
                filteredCommunities.map((c) => {
                  const selected = area === c;
                  return (
                    <button
                      type="button"
                      key={c}
                      onClick={() => chooseArea(c)}
                      className="block w-full rounded-md px-4 py-2.5 text-left text-[0.95rem] transition-colors hover:bg-[rgba(174,138,84,0.1)]"
                      style={{
                        color: selected ? "var(--accent-600)" : "var(--text-primary)",
                        backgroundColor: selected ? "rgba(174,138,84,0.12)" : "transparent",
                      }}
                    >
                      {c}
                    </button>
                  );
                })
              )}
            </div>
          </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

function OptionButton({
  children,
  active,
  onClick,
  small,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="flex items-center justify-center rounded-md border text-center leading-tight transition-all duration-300"
      style={{
        borderColor: active ? "var(--accent-500)" : "var(--line)",
        backgroundColor: active ? "rgba(174,138,84,0.12)" : "var(--bg-inset)",
        color: active ? "var(--accent-600)" : "var(--text-secondary)",
        padding: small ? "0.55rem 0.85rem" : "0.85rem 0.6rem",
        fontSize: small ? "0.875rem" : "0.95rem",
        minHeight: "46px",
      }}
    >
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      {children}
    </label>
  );
}
