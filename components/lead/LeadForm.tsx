"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site, whatsappLink } from "@/lib/site";

/**
 * Multi-step lead form, WhatsApp-first. On submit it composes a prefilled
 * WhatsApp message (the fastest conversion path in this market). The
 * `onSubmitLead` seam is where a CRM POST gets wired later — the UI won't change.
 */

type Intent = "Buy" | "Sell" | "Invest";
const INTENTS: Intent[] = ["Buy", "Sell", "Invest"];
const AREAS = ["Palm Jumeirah", "Al Barari", "Jumeirah Islands", "Not sure yet"];
const BUDGETS = ["Under AED 10M", "AED 10M – 30M", "AED 30M – 75M", "AED 75M+"];

const steps = ["Intent", "Preferences", "Contact"] as const;

export function LeadForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const canNext = useMemo(() => {
    if (step === 0) return intent !== null;
    if (step === 1) return area !== null && budget !== null;
    if (step === 2) return name.trim().length > 1 && contact.trim().length > 3;
    return false;
  }, [step, intent, area, budget, name, contact]);

  const message = useMemo(
    () =>
      `Hello ${site.name}, I'd like to enquire.\n\n` +
      `• Intent: ${intent ?? "—"}\n` +
      `• Area: ${area ?? "—"}\n` +
      `• Budget: ${budget ?? "—"}\n` +
      `• Name: ${name || "—"}\n` +
      `• Contact: ${contact || "—"}`,
    [intent, area, budget, name, contact],
  );

  function submit() {
    // SEAM: later, POST to the CRM here before/after opening WhatsApp.
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  const variants = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
      };

  return (
    <div className="rounded-lg border border-line bg-elevated p-6 sm:p-9">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2" aria-hidden="true">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className="h-1 flex-1 rounded-full transition-colors duration-500"
              style={{ backgroundColor: i <= step ? "var(--accent-500)" : "var(--line)" }}
            />
          </div>
        ))}
      </div>
      <p className="eyebrow mb-6">
        Step {step + 1} / {steps.length} · {steps[step]}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          {...variants}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <fieldset>
              <legend className="mb-5 font-display text-2xl text-ink">
                How can we help?
              </legend>
              <div className="grid grid-cols-3 gap-3">
                {INTENTS.map((opt) => (
                  <OptionButton key={opt} active={intent === opt} onClick={() => setIntent(opt)}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <div className="space-y-7">
              <fieldset>
                <legend className="mb-4 font-display text-2xl text-ink">Which community?</legend>
                <div className="flex flex-wrap gap-3">
                  {AREAS.map((opt) => (
                    <OptionButton key={opt} small active={area === opt} onClick={() => setArea(opt)}>
                      {opt}
                    </OptionButton>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-4 font-display text-2xl text-ink">Budget</legend>
                <div className="flex flex-wrap gap-3">
                  {BUDGETS.map((opt) => (
                    <OptionButton key={opt} small active={budget === opt} onClick={() => setBudget(opt)}>
                      {opt}
                    </OptionButton>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {step === 2 && (
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

      {/* Controls */}
      <div className="mt-9 flex items-center justify-between gap-4">
        <button
          type="button"
          className="text-sm text-faint transition-colors hover:text-ink disabled:opacity-0"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          ← Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            className="btn btn-accent disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-whatsapp disabled:cursor-not-allowed disabled:opacity-40"
            onClick={submit}
            disabled={!canNext}
          >
            Send on WhatsApp
          </button>
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
        backgroundColor: active ? "rgba(11,79,158,0.10)" : "var(--bg-inset)",
        color: active ? "var(--accent-400)" : "var(--text-secondary)",
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
