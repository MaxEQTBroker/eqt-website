/**
 * Reusable, server-rendered FAQ accordion. Real text in the DOM (crawlable +
 * AI-extractable); pair with <FaqJsonLd> on the page for FAQPage structured
 * data. Matches the accordion style used on area pages.
 */
export function FaqBlock({
  faqs,
  eyebrow,
  title,
}: {
  faqs: { question: string; answer: string }[];
  eyebrow?: string;
  title?: string;
}) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <div>
      {(eyebrow || title) && (
        <div className="mb-8">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          {title && <h2 className="display-h2 max-w-[16ch] text-ink">{title}</h2>}
        </div>
      )}
      <div className="divide-y divide-line border-y border-line">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-ink">
              {faq.question}
              <span className="text-accent-500 transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-lg text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
