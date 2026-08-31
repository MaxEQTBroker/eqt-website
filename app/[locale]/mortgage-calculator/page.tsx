import type { Metadata } from "next";
import { MortgageCalculator } from "@/components/tools/MortgageCalculator";
import { FaqBlock } from "@/components/ui/FaqBlock";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type Faq = { question: string; answer: string };
type MortgageCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  answer: string;
  answerPoints: string[];
  intro: string;
  faqs: Faq[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<MortgageCopy>("mortgageCalcPage", locale);
  const canonical = locale === "en" ? "/mortgage-calculator" : `/${locale}/mortgage-calculator`;
  const languages: Record<string, string> = { "x-default": "/mortgage-calculator", en: "/mortgage-calculator" };
  if (hasUiTranslation("mortgageCalcPage", "uk")) languages.uk = "/uk/mortgage-calculator";
  if (hasUiTranslation("mortgageCalcPage", "ru")) languages.ru = "/ru/mortgage-calculator";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("mortgageCalcPage", locale)
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function MortgageCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<MortgageCopy>("mortgageCalcPage", locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/mortgage-calculator" },
        ]}
      />
      <FaqJsonLd faqs={c.faqs} />

      <section className="container-lux pb-[var(--section-py)] pt-40">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: c.breadcrumb, href: "/mortgage-calculator" },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] text-ink">{c.h1}</h1>
          {/* Answer-first block for AEO / featured-snippet extraction. */}
          <p className="mt-6 text-lg leading-relaxed text-ink">{c.answer}</p>
          <ul className="mt-4 space-y-2.5">
            {c.answerPoints.map((pt) => (
              <li key={pt} className="flex items-start gap-3 text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                <span className="leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-muted">{c.intro}</p>
        </div>

        <div className="mt-12">
          <MortgageCalculator />
        </div>

        <div className="mt-16 max-w-3xl">
          <FaqBlock faqs={c.faqs} />
        </div>
      </section>
    </>
  );
}
