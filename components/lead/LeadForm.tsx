"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site, whatsappLink } from "@/lib/site";
import { postLead } from "@/lib/leads/submit";
import { trackLead } from "@/lib/analytics";
import { COMMUNITY_LABELS } from "@/lib/data/communityLabels";

/**
 * Multi-step lead form. On submit it POSTs the lead to /api/lead (which forwards
 * it to the CRM server-side), then shows a confirmation with a WhatsApp button
 * as the guaranteed fallback channel, so a lead is never lost even if the CRM
 * is down or not yet configured.
 */

type Intent = "Buy" | "Sell" | "Invest" | "Relocate";
const INTENTS: Intent[] = ["Buy", "Sell", "Invest", "Relocate"];
const BUDGETS = ["Under AED 10M", "AED 10M - 30M", "AED 30M - 75M", "AED 75M+"];
const TIMEFRAMES = ["Under 3 months", "3-6 months", "6+ months"];
const QUICK_COMMUNITIES = ["Palm Jumeirah", "Dubai Marina", "Downtown Dubai"];

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
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [area, setArea] = useState<string | null>(defaultArea ?? null);
  const [budget, setBudget] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string | null>(null);
  const [showAllCommunities, setShowAllCommunities] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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

  const showDropdown = showAllCommunities || (area !== null && !quickPicks.includes(area));
  const canSubmit = name.trim().length > 1 && contact.trim().length > 3;

  const advance = () => setStep((s) => Math.min(s + 1, flow.length - 1));
  const chooseIntent = (v: Intent) => {
    setIntent(v);
    setStep(1); // auto-advance out of the goal step
  };
  const chooseArea = (v: string | null) => {
    setArea(v);
    setShowAllCommunities(false);
    if (v) advance();
  };

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
      <div className="rounded-lg border border-line bg-elevated p-8 text-center sm:p-10">
        <p className="eyebrow mb-4">Thank you, {name.split(" ")[0]}</p>
        <h3 className="font-display text-2xl text-ink">We&rsquo;ve received your enquiry</h3>
        <p className="mx-auto mt-4 max-w-sm text-muted">
          A private advisor will be in touch shortly. For the fastest response, continue the
          conversation on WhatsApp.
        </p>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-7 inline-block"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-elevated p-6 sm:p-9">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2" aria-hidden="true">
        {flow.map((key, i) => (
          <div key={key} className="flex flex-1 items-center gap-2">
            <div
              className="h-1 flex-1 rounded-full transition-colors duration-500"
              style={{ backgroundColor: i <= stepIndex ? "var(--accent-500)" : "var(--line)" }}
            />
          </div>
        ))}
      </div>
      <p className="eyebrow mb-6">
        Step {stepIndex + 1} / {flow.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          {...variants}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {current === "goal" && (
            <fieldset>
              <legend className="mb-5 font-display text-2xl text-ink">
                How can we help?
              </legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {INTENTS.map((opt) => (
                  <OptionButton key={opt} active={intent === opt} onClick={() => chooseIntent(opt)}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </fieldset>
          )}

          {current === "community" && (
            <fieldset>
              <legend className="mb-4 font-display text-2xl text-ink">Which community?</legend>
              <div className="flex flex-wrap gap-3">
                {quickPicks.map((opt) => (
                  <OptionButton
                    key={opt}
                    small
                    active={area === opt && !showAllCommunities}
                    onClick={() => chooseArea(opt)}
                  >
                    {opt}
                  </OptionButton>
                ))}
                <OptionButton small active={showDropdown} onClick={() => setShowAllCommunities(true)}>
                  Others
                </OptionButton>
              </div>
              {showDropdown && (
                <select
                  className="lux-input lux-select mt-3"
                  value={area && !quickPicks.includes(area) ? area : ""}
                  onChange={(e) => chooseArea(e.target.value || null)}
                >
                  <option value="">Select a community…</option>
                  {COMMUNITY_LABELS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              )}
            </fieldset>
          )}

          {current === "budget" && (
            <fieldset>
              <legend className="mb-4 font-display text-2xl text-ink">Budget</legend>
              <div className="flex flex-wrap gap-3">
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
              <legend className="mb-4 font-display text-2xl text-ink">
                When are you looking to relocate?
              </legend>
              <div className="flex flex-wrap gap-3">
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
              <legend className="mb-1 font-display text-2xl text-ink">Your details</legend>
              <Field label="Full name">
                <input
                  className="lux-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alexander Ross"
                  autoComplete="name"
                />
              </Field>
              <Field label="WhatsApp or email">
                <input
                  className="lux-input"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+971 50 000 0000"
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
      <div className="mt-9 flex items-center justify-between gap-4">
        <button
          type="button"
          className="text-sm text-faint transition-colors hover:text-ink disabled:opacity-0"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={stepIndex === 0}
        >
          ← Back
        </button>

        {current === "contact" ? (
          <button
            type="button"
            className="btn btn-accent disabled:cursor-not-allowed disabled:opacity-40"
            onClick={submit}
            disabled={!canSubmit || sending}
          >
            {sending ? "Sending…" : "Send enquiry"}
          </button>
        ) : (
          <span className="text-xs text-faint">Tap an option to continue</span>
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
      className="rounded-md border text-center transition-all duration-300"
      style={{
        borderColor: active ? "var(--accent-500)" : "var(--line)",
        backgroundColor: active ? "rgba(122,106,77,0.12)" : "var(--bg-inset)",
        color: active ? "var(--accent-600)" : "var(--text-secondary)",
        padding: small ? "0.6rem 1rem" : "1.1rem 1rem",
        fontSize: small ? "0.9rem" : "1rem",
        minHeight: "48px",
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
