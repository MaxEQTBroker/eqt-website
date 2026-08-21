/**
 * Convert sold-property photos to sRGB, web-sized JPEGs so the site can serve them
 * WITHOUT the paid Supabase image-transform endpoint.
 *
 * - Lists the `property-photos` bucket (one folder per property, numbered images).
 * - For each image NOT already recorded in lib/data/converted-sold.json, downloads
 *   the original, converts CMYK -> sRGB and resizes, then uploads it under `sold-web/`
 *   in the same bucket.
 * - Updates the manifest, which the daily workflow commits so the site serves the
 *   converted versions (see lib/images.ts).
 *
 * Runs incrementally: only new images are processed each day.
 * Env: SUPABASE_SERVICE_KEY (required). SUPABASE_URL / SUPABASE_BUCKET optional
 * (they are public and default to the known values).
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://oquqfodpimubvrgkekah.supabase.co";
const BUCKET = process.env.SUPABASE_BUCKET || "property-photos";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const CONVERTED_PREFIX = "sold-web";
const MANIFEST = "lib/data/converted-sold.json";
const MAX_WIDTH = 1600;
const QUALITY = 78;

if (!SERVICE_KEY) {
  // Not configured yet: skip quietly as a no-op so the scheduled run succeeds
  // (no failure emails). Add the SUPABASE_SERVICE_KEY repo secret to enable it.
  console.log("SUPABASE_SERVICE_KEY is not set. Skipping conversion (no-op).");
  process.exit(0);
}

const authHeaders = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };

async function listFolder(prefix) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`, {
    method: "POST",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({
      prefix,
      limit: 1000,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    }),
  });
  if (!res.ok) throw new Error(`list "${prefix}" failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const isImage = (name) => /\.(jpe?g|png|webp)$/i.test(name);
const isFile = (entry) => entry.id !== null && entry.metadata;

async function downloadOriginal(path) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`);
  if (!res.ok) throw new Error(`download "${path}" failed: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadConverted(path, buffer) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${CONVERTED_PREFIX}/${path}`,
    {
      method: "POST",
      headers: { ...authHeaders, "Content-Type": "image/jpeg", "x-upsert": "true" },
      body: buffer,
    },
  );
  if (!res.ok) throw new Error(`upload "${path}" failed: ${res.status} ${await res.text()}`);
}

let manifest;
try {
  manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
} catch {
  manifest = [];
}
const done = new Set(manifest);

const root = await listFolder("");
const folders = root
  .filter((e) => !isFile(e) && e.name !== CONVERTED_PREFIX)
  .map((e) => e.name);
console.log(`Property folders found: ${folders.length}`);

let converted = 0;
let skipped = 0;
let failed = 0;

for (const folder of folders) {
  let files;
  try {
    files = await listFolder(`${folder}/`);
  } catch (e) {
    console.error(e.message);
    continue;
  }
  for (const f of files) {
    if (!isFile(f) || !isImage(f.name)) continue;
    const path = `${folder}/${f.name}`; // "<uuid>/0.jpg"
    const key = `${BUCKET}/${path}`; // "property-photos/<uuid>/0.jpg" (matches crmPhoto)
    if (done.has(key)) {
      skipped++;
      continue;
    }
    try {
      const original = await downloadOriginal(path);
      const out = await sharp(original, { failOn: "none" })
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .toColourspace("srgb")
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();
      await uploadConverted(path, out);
      done.add(key);
      converted++;
      if (converted % 25 === 0) console.log(`converted ${converted}...`);
    } catch (e) {
      failed++;
      console.error(`FAILED ${path}: ${e.message}`);
    }
  }
}

writeFileSync(MANIFEST, JSON.stringify([...done].sort(), null, 0) + "\n");
console.log(`Done. converted=${converted} skipped=${skipped} failed=${failed} total=${done.size}`);
