import type { BlogPost } from "../blog";
import uk from "./blog-uk.json";
import ru from "./blog-ru.json";

/** Translatable fields of a post; everything else (hero, author, dates, category,
 * readingMinutes) is inherited from the English base. Missing slug => English. */
export type PostOverlay = Partial<
  Pick<
    BlogPost,
    "title" | "excerpt" | "intro" | "keyTakeaways" | "sections" | "faqs" | "relatedLinks" | "keywords"
  >
>;

const MAPS: Record<string, Record<string, PostOverlay>> = {
  uk: uk as Record<string, PostOverlay>,
  ru: ru as Record<string, PostOverlay>,
};

/** Overlay a locale's translated fields onto an English post (fallback = English). */
export function localizePost(post: BlogPost, locale?: string): BlogPost {
  if (!locale || locale === "en") return post;
  const overlay = MAPS[locale]?.[post.slug];
  return overlay ? { ...post, ...overlay } : post;
}

/** True when a real translation exists for this post in this locale. Used to
 * noindex not-yet-translated uk/ru pages so they never rank as English duplicates. */
export function hasPostTranslation(slug: string, locale?: string): boolean {
  if (!locale || locale === "en") return true;
  return Boolean(MAPS[locale]?.[slug]);
}
