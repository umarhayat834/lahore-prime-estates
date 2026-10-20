import { readFile, writeFile } from "node:fs/promises";

/**
 * The "full" form must match the builders in `src/lib/images.ts` — it is the key
 * `SmartImage` looks a placeholder up by. "tiny" is the 12px request we store.
 */
const UNSPLASH_SUFFIX = "?auto=format&fit=crop&w=1600&q=80";
const UNSPLASH_TINY = "?auto=format&fit=crop&w=12&h=12&fit=crop&fm=jpg&q=35";
const PEXELS_SUFFIX = "?auto=compress&cs=tinysrgb&w=1600";
const PEXELS_TINY = "?auto=compress&cs=tinysrgb&w=12&h=12&fit=crop";

const src = await readFile("src/lib/images.ts", "utf8");
const jobs = [];
for (const [, id] of src.matchAll(/\bu\("([^"]+)"\)/g))
  jobs.push({
    key: `https://images.unsplash.com/${id}${UNSPLASH_SUFFIX}`,
    tiny: `https://images.unsplash.com/${id}${UNSPLASH_TINY}`,
  });
for (const [, id] of src.matchAll(/\bpx\("([^"]+)"\)/g))
  jobs.push({
    key: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg${PEXELS_SUFFIX}`,
    tiny: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg${PEXELS_TINY}`,
  });

console.log("images:", jobs.length);
const out = {};
let fail = 0;
for (const { key, tiny } of jobs) {
  try {
    const r = await fetch(tiny);
    if (!r.ok) { console.log("HTTP", r.status, key); fail++; continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 100) { console.log("TOO_SMALL", buf.length, key); fail++; continue; }
    out[key] = `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch (e) { console.log("ERR", e.message, key); fail++; }
}

const body = `/**
 * Generated blur placeholders (12px JPEGs, base64) for every remote photo in
 * \`src/lib/images.ts\`. Regenerate with \`node scripts/gen-lqip.mjs\` after you
 * change a photo URL — an unknown URL simply renders without a placeholder.
 */
export const lqip: Record<string, string> = ${JSON.stringify(out, null, 2)};
`;
await writeFile("src/lib/lqip.ts", body);
console.log("wrote", Object.keys(out).length, "placeholders, failures:", fail);
