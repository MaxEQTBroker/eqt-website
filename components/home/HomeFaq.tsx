import { getLocale } from "next-intl/server";
import { uiContent } from "@/lib/data/i18n/ui";
import { FaqBlock } from "@/components/ui/FaqBlock";
import { FaqJsonLd } from "@/lib/seo/jsonld";

type HomeFaqCopy = {
  faqEyebrow?: string;
  faqTitle?: string;
  faqs?: { question: string; answer: string }[];
};

/** Homepage FAQ: crawlable Q&A copy + FAQPage schema (AEO + adds indexable text). */
export async function HomeFaq() {
  const locale = await getLocale();
  const c = uiContent<HomeFaqCopy>("home", locale);
  if (!c.faqs || c.faqs.length === 0) return null;
  return (
    <section className="container-lux py-20 md:py-28">
      <FaqJsonLd faqs={c.faqs} />
      <FaqBlock eyebrow={c.faqEyebrow} title={c.faqTitle} faqs={c.faqs} />
    </section>
  );
}
