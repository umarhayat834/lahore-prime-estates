import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Tailwind v4 runs as a Turbopack loader, so `@theme` and the utilities compile. */
  turbopack: {
    // Without this, Turbopack walks up to a package-lock.json outside the project.
    root: path.dirname(fileURLToPath(import.meta.url)),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    /** Only these optimiser qualities may be requested from `next/image`. */
    qualities: [60, 75, 85],
  },
};

export default nextConfig;
