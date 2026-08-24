import { getAllPropertyTypeSlugs, getPropertyGuideBySlug } from "../lib/data/repository";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT =
  "/private/tmp/claude-501/-Users-maxkarnaukh-Desktop-EQT-New-Website/fe6963d1-f6e8-476b-9d35-932c4bda245a/scratchpad/property";
mkdirSync(`${OUT}/out`, { recursive: true });

const slugs = await getAllPropertyTypeSlugs();
const slim = [];
for (const slug of slugs) {
  const g = await getPropertyGuideBySlug(slug);
  if (!g) continue;
  slim.push({
    slug: g.slug,
    title: g.title,
    headline: g.headline,
    intro: g.intro,
    keyFacts: g.keyFacts,
    faqs: g.faqs,
    sections: (g.sections ?? []).map((s) => ({ heading: s.heading, body: s.body, bullets: s.bullets ?? [] })),
    keywords: g.keywords ?? [],
  });
}

const N = 3;
const nb = Math.ceil(slim.length / N);
for (let i = 0; i < nb; i++) {
  writeFileSync(`${OUT}/prop-en-${i}.json`, JSON.stringify(slim.slice(i * N, i * N + N), null, 2));
}
console.log(`property guides=${slim.length} batches=${nb}`);
