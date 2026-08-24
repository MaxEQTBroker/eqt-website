import { getAllDeveloperSlugs, getDeveloperBySlug } from "../lib/data/repository";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT =
  "/private/tmp/claude-501/-Users-maxkarnaukh-Desktop-EQT-New-Website/fe6963d1-f6e8-476b-9d35-932c4bda245a/scratchpad/dev";
mkdirSync(`${OUT}/out`, { recursive: true });

const slugs = await getAllDeveloperSlugs();
const slim = [];
for (const slug of slugs) {
  const d = await getDeveloperBySlug(slug);
  if (!d) continue;
  slim.push({
    slug: d.slug,
    tagline: d.tagline,
    intro: d.intro,
    keyFacts: d.keyFacts,
    signature: d.signature,
    faqs: d.faqs,
    sections: (d.sections ?? []).map((s) => ({ heading: s.heading, body: s.body, bullets: s.bullets ?? [] })),
    keywords: d.keywords ?? [],
  });
}

const N = 3;
const nb = Math.ceil(slim.length / N);
for (let i = 0; i < nb; i++) {
  writeFileSync(`${OUT}/dev-en-${i}.json`, JSON.stringify(slim.slice(i * N, i * N + N), null, 2));
}
console.log(`developers=${slim.length} batches=${nb}`);
