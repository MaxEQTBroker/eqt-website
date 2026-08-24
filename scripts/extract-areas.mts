import { getAllAreaSlugs, getAreaBySlug } from "../lib/data/repository";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT =
  "/private/tmp/claude-501/-Users-maxkarnaukh-Desktop-EQT-New-Website/fe6963d1-f6e8-476b-9d35-932c4bda245a/scratchpad/areas";
mkdirSync(OUT, { recursive: true });

const slugs = await getAllAreaSlugs();
const slim = [];
for (const slug of slugs) {
  const a = await getAreaBySlug(slug);
  if (!a) continue;
  slim.push({
    slug: a.slug,
    // label (brand name) is NOT translated
    headline: a.headline,
    intro: a.intro,
    keyFacts: a.keyFacts,
    faqs: a.faqs,
    sections: (a.sections ?? []).map((s) => ({ heading: s.heading, body: s.body, bullets: s.bullets ?? [] })),
    keywords: a.keywords ?? [],
  });
}

const N = 3;
const nb = Math.ceil(slim.length / N);
for (let i = 0; i < nb; i++) {
  writeFileSync(`${OUT}/area-en-${i}.json`, JSON.stringify(slim.slice(i * N, i * N + N), null, 2));
}
writeFileSync(`${OUT}/_slugs.json`, JSON.stringify(slim.map((p) => p.slug), null, 2));
console.log(`areas=${slim.length} batches=${nb} (${N}/batch)`);
