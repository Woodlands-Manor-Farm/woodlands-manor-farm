import { execSync } from "node:child_process";
import type { NextConfig } from "next";

// Regenerate the bundled blog data before the build compiles. This keeps
// src/lib/generated-blog.json in sync with content/blog/*.md without relying
// on the filesystem at runtime (which is unavailable in the Cloudflare Worker).
// Non-fatal: on failure we fall back to the committed JSON.
try {
  execSync("node scripts/gen-blog-data.mjs", { stdio: "inherit" });
} catch (err) {
  console.warn("next.config: gen-blog-data skipped:", (err as Error).message);
}

// 301 redirects from old WordPress URLs whose slug changed or whose page was
// removed, so inbound links and Google rankings carry over to the new site.
// Sources are written without a trailing slash; trailingSlash: true keeps the
// destination canonical.
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Changed slugs
  { source: "/cottages-bude", destination: "/bude-holiday-cottages/" },
  { source: "/yurts-bude", destination: "/yurts/" },
  { source: "/yurts-devon", destination: "/yurts/" },
  { source: "/local-bude-restaurants", destination: "/the-best-bude-restaurants/" },
  { source: "/book-direct", destination: "/holiday-cottage-direct-booking-woodlands-cornwall/" },
  // Removed section pages -> closest live page
  { source: "/woodlands-manor-farm-local-beaches", destination: "/beaches-and-walks-near-bude/" },
  { source: "/local-surf-schools-bude", destination: "/things-to-do-in-bude/" },
  { source: "/fishing-in-and-around-bude", destination: "/things-to-do-in-bude/" },
  { source: "/bude-wood-turning-coures", destination: "/things-to-do-in-bude/" },
  { source: "/whats-on-in-bude-cornwall-february-half-term", destination: "/news/" },
  // Old cycling pages -> current cycling post
  {
    source: "/north-cornwall-cycling-routes-woodlands-manor-farm",
    destination: "/discover-the-breathtaking-cycling-routes-of-north-cornwall/",
  },
  {
    source: "/cycling-in-cornwall-woodlands-manor-farm",
    destination: "/discover-the-breathtaking-cycling-routes-of-north-cornwall/",
  },
  // Old individual beach pages -> beaches & walks
  { source: "/widemouth-bay", destination: "/beaches-and-walks-near-bude/" },
  { source: "/summerleaze-beach", destination: "/beaches-and-walks-near-bude/" },
  { source: "/sandymouth", destination: "/beaches-and-walks-near-bude/" },
  { source: "/northcott-mouth", destination: "/beaches-and-walks-near-bude/" },
  { source: "/crooklets", destination: "/beaches-and-walks-near-bude/" },
  { source: "/duckpool", destination: "/beaches-and-walks-near-bude/" },
  { source: "/crackington-haven", destination: "/beaches-and-walks-near-bude/" },
  // Legacy alias URLs -> canonical page (replaces the old alias pages)
  { source: "/posts", destination: "/news/" },
  { source: "/out-about", destination: "/things-to-do-in-bude/" },
  { source: "/terms", destination: "/terms-conditions/" },
  { source: "/hotel-term-condition", destination: "/terms-conditions/" },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // statusCode 301 (rather than permanent: true, which emits 308) — a
    // traditional 301 for the SEO migration.
    return LEGACY_REDIRECTS.map((r) => ({ ...r, statusCode: 301 as const }));
  },
};

export default nextConfig;

// OpenNext / Cloudflare dev bindings init (no-op in production runtime).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
