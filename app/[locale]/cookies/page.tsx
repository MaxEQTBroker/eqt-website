import type { Metadata } from "next";
import { LegalContent, type LegalDocContent } from "@/components/legal/LegalContent";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

const SLUG = "cookies";
const PATH = "/cookies";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<LegalDocContent>(SLUG, locale);
  const canonical = locale === "en" ? PATH : `/${locale}${PATH}`;
  const languages: Record<string, string> = { "x-default": PATH, en: PATH };
  if (hasUiTranslation(SLUG, "uk")) languages.uk = `/uk${PATH}`;
  if (hasUiTranslation(SLUG, "ru")) languages.ru = `/ru${PATH}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation(SLUG, locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = uiContent<LegalDocContent>(SLUG, locale);
  const common = uiContent<{ eyebrow: string; lastUpdated: string }>("legalCommon", locale);
  return <LegalContent doc={doc} path={PATH} eyebrow={common.eyebrow} lastUpdatedLabel={common.lastUpdated} />;
}
