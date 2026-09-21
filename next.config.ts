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
  // Owner-supplied current menus replace the old downloads.
  { source: "/wp-content/uploads/2023/01/2023-Menu.pdf", destination: "/menus/private-chef-menu.pdf" },
  { source: "/wp-content/uploads/2023/11/woodlands-beauty-treatments.pdf", destination: "/menus/spa-treatments-menu.pdf" },
  // Retained legacy aliases
  { source: "/elementor-10201", destination: "/bude-holiday-cottages/" },
  { source: "/about", destination: "/on-the-farm/" },
  { source: "/what-to-do-woodlands", destination: "/about-woodlands-manor-farm-holiday-cottages-with-a-pool/" },
  // Changed slugs
  { source: "/cottages-bude", destination: "/bude-holiday-cottages/" },
  { source: "/yurts-bude", destination: "/yurts/" },
  { source: "/yurts-devon", destination: "/yurts/" },
  { source: "/local-bude-restaurants", destination: "/the-best-bude-restaurants/" },
  { source: "/book-direct", destination: "/holiday-cottage-direct-booking-woodlands-cornwall/" },
  // Merged About pages -> the page that now holds their content
  { source: "/the-animals-at-woodlands", destination: "/on-the-farm/" },
  { source: "/local-towns-and-villages-near-bude", destination: "/beaches-and-walks-near-bude/" },
  // Removed section pages -> closest live page
  { source: "/bude-wood-turning-coures", destination: "/things-to-do-in-bude/" },
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
