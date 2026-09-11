import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/**
 * Branded, trilingual 404. Rendered whenever a page calls notFound() (an
 * unknown area, developer, blog slug, listing reference) or a path inside a
 * locale doesn't resolve. Copy is inline (three locales) so the page never
 * depends on a translation block being present.
 */

type Copy = {
  code: string;
  h1: string;
  intro: string;
  links: { label: string; href: string }[];
};

const COPY: Record<string, Copy> = {
  en: {
    code: "Error 404",
    h1: "This page isn't here",
    intro:
      "The page you're looking for may have sold, moved, or never existed. Explore our current collection instead, or speak with a private advisor.",
    links: [
      { label: "Return home", href: "/" },
      { label: "Active properties", href: "/listings" },
      { label: "Neighborhoods", href: "/areas" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  uk: {
    code: "Помилка 404",
    h1: "Цієї сторінки немає",
    intro:
      "Сторінку, яку ви шукаете, можливо, продано, переміщено або її ніколи не існувало. Перегляньте нашу поточну колекцію або зверніться до приватного консультанта.",
    links: [
      { label: "На головну", href: "/" },
      { label: "Активні обʼєкти", href: "/listings" },
      { label: "Райони", href: "/areas" },
      { label: "Звʼязатися з нами", href: "/contact" },
    ],
  },
  ru: {
    code: "Ошибка 404",
    h1: "Этой страницы нет",
    intro:
      "Возможно, страница, которую вы ищете, продана, перемещена или никогда не существовала. Посмотрите нашу текущую коллекцию или обратитесь к частному консультанту.",
    links: [
      { label: "На главную", href: "/" },
      { label: "Активные объекты", href: "/listings" },
      { label: "Районы", href: "/areas" },
      { label: "Связаться с нами", href: "/contact" },
    ],
  },
};

export default async function NotFound() {
  let locale = "en";
  try {
    locale = await getLocale();
  } catch {
    locale = "en";
  }
  const c = COPY[locale] ?? COPY.en;

  return (
    <section className="container-lux flex min-h-[70vh] flex-col justify-center pb-[var(--section-py)] pt-40">
      <p className="eyebrow mb-5">{c.code}</p>
      <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
        {c.h1}
      </h1>
      <p className="mt-8 max-w-2xl text-lg text-muted">{c.intro}</p>
      <nav className="mt-10 flex flex-wrap gap-3" aria-label={c.h1}>
        {c.links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className={
              i === 0
                ? "rounded-lg bg-accent-500 px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90"
                : "rounded-lg border border-line bg-elevated px-6 py-3 text-sm text-ink transition-colors duration-300 hover:border-accent-500"
            }
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
