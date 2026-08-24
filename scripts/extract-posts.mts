import { getAllPosts } from "../lib/data/blog";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT =
  "/private/tmp/claude-501/-Users-maxkarnaukh-Desktop-EQT-New-Website/fe6963d1-f6e8-476b-9d35-932c4bda245a/scratchpad/xlate";
mkdirSync(OUT, { recursive: true });

const posts = await getAllPosts();
const slim = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  intro: p.intro,
  keyTakeaways: p.keyTakeaways ?? [],
  sections: p.sections.map((s) => ({ heading: s.heading, body: s.body, bullets: s.bullets ?? [] })),
  faqs: p.faqs,
  relatedLinks: p.relatedLinks ?? [],
  keywords: p.keywords,
}));

const N = 4;
const nb = Math.ceil(slim.length / N);
for (let i = 0; i < nb; i++) {
  writeFileSync(`${OUT}/en-${i}.json`, JSON.stringify(slim.slice(i * N, i * N + N), null, 2));
}
writeFileSync(`${OUT}/_slugs.json`, JSON.stringify(slim.map((p) => p.slug), null, 2));
console.log(`posts=${slim.length} batches=${nb} (${N}/batch)`);
