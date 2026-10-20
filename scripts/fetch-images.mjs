import { mkdir, readFile, writeFile } from "node:fs/promises";

/**
 * Downloads every photo referenced in `src/lib/images.ts` into `public/photos/`
 * and re-keys `src/lib/lqip.ts` to the local paths.
 *
 * Self-hosting matters: the Next image optimiser fetches the source server-side,
 * and hotlinked Unsplash originals (4 MB, 20 s+) blow its timeout, so cards
 * silently drop to the fallback image.
 *
 *   node scripts/fetch-images.mjs
 */
const WIDTH = 1600;

const source = await readFile("src/lib/images.ts", "utf8");
const jobs = [];

for (const [, id] of source.matchAll(/\bu\("([^"]+)"\)/g)) {
  jobs.push({
    file: `${id}.jpg`,
    full: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${WIDTH}&q=80`,
    tiny: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=12&h=12&fit=crop&fm=jpg&q=35`,
  });
}
for (const [, id] of source.matchAll(/\bpx\("([^"]+)"\)/g)) {
  jobs.push({
    file: `pexels-${id}.jpg`,
    full: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${WIDTH}`,
    tiny: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=12&h=12&fit=crop`,
  });
}

await mkdir("public/photos", { recursive: true });
console.log("photos:", jobs.length);

const lqip = {};
const failures = [];
let bytes = 0;

for (const job of jobs) {
  const res = await fetch(job.full);
  if (!res.ok) {
    failures.push(`${res.status} ${job.full}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) {
    failures.push(`TOO_SMALL ${buf.length} ${job.full}`);
    continue;
  }
  await writeFile(`public/photos/${job.file}`, buf);
  bytes += buf.length;

  const tiny = await fetch(job.tiny);
  if (tiny.ok) {
    const small = Buffer.from(await tiny.arrayBuffer());
    if (small.length >= 100) lqip[`/photos/${job.file}`] = `data:image/jpeg;base64,${small.toString("base64")}`;
  }
}

const body = `/**
 * Generated blur placeholders (12px JPEGs, base64) keyed by the local path in
 * \`src/lib/images.ts\`. Refresh with \`node scripts/fetch-images.mjs\` — a photo
 * with no entry simply renders without a placeholder until it loads.
 */
export const lqip: Record<string, string> = ${JSON.stringify(lqip, null, 2)};
`;
await writeFile("src/lib/lqip.ts", body);

console.log(
  "saved", Object.keys(lqip).length, "photos,", (bytes / 1e6).toFixed(1) + " MB, failures:",
  failures.length,
);
for (const f of failures) console.log("  ", f);
