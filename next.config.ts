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

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

// OpenNext / Cloudflare dev bindings init (no-op in production runtime).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
