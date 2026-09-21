/**
 * Scrape the existing WordPress blog from woodlandsmanorfarm.co.uk and
 * convert each post into a markdown file under content/blog/.
 *
 * Steps:
 *   1. fetch the WP post-sitemap.xml to enumerate post URLs
 *   2. for each URL, fetch the HTML, extract title/date/author/feature image/body
 *   3. download images into public/images/blog/<slug>/
 *   4. convert body HTML → markdown (turndown), rewriting image URLs
 *   5. write content/blog/<slug>.md with YAML frontmatter
 *
 * The slug used is the trailing path segment of the WP URL — so the new
 * site's `/[slug]/` route resolves at exactly the same path as before
 * and SEO history is preserved.
 *
 * Usage: `npm run migrate:blog -- [optional-post-slug]`
 */

import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { load } from "cheerio";
import TurndownService from "turndown";

const ROOT = join(import.meta.dirname ?? __dirname, "..");
const CONTENT_DIR = join(ROOT, "content", "blog");
const BLOG_IMAGES_DIR = join(ROOT, "public", "images", "blog");
const SITEMAP_URL = "https://woodlandsmanorfarm.co.uk/post-sitemap.xml";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.keep(["figure", "figcaption"]);

function slugFromUrl(url: string): string {
  return new URL(url).pathname.replace(/^\/|\/$/g, "");
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": "woodlands-blog-migrator/1.0" } });
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  return res.text();
}

async function fetchSitemap(): Promise<string[]> {
  const xml = await fetchText(SITEMAP_URL);
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  // Drop any /posts/ index page; keep only individual post URLs.
  return matches.filter((u) => !u.endsWith("/posts/"));
}

function extFromContentType(ct?: string | null): string | null {
  if (!ct) return null;
  const m = ct.toLowerCase().match(/image\/(jpe?g|png|gif|webp|avif|svg\+xml)/);
  if (!m) return null;
  return m[1] === "jpeg" ? "jpg" : m[1] === "svg+xml" ? "svg" : m[1];
}

function extFromUrl(url: string): string | null {
  if (url.startsWith("data:")) return null;
  // strip query/fragment, take last path segment, then last dot-extension
  const path = url.split("?")[0].split("#")[0];
  const seg = path.split("/").pop() ?? "";
  const m = seg.match(/\.([a-zA-Z0-9]{2,5})$/);
  if (!m) return null;
  const e = m[1].toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"].includes(e)
    ? e === "jpeg"
      ? "jpg"
      : e
    : null;
}

async function downloadImage(url: string, slug: string): Promise<string | null> {
  if (url.startsWith("data:")) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = extFromContentType(res.headers.get("content-type")) ?? extFromUrl(url) ?? "jpg";
    const hash = createHash("sha1").update(buf).digest("hex").slice(0, 12);
    const dir = join(BLOG_IMAGES_DIR, slug);
    mkdirSync(dir, { recursive: true });
    const filename = `${hash}.${ext}`;
    writeFileSync(join(dir, filename), buf);
    return `/images/blog/${slug}/${filename}`;
  } catch (err) {
    console.warn(`[img-fail] ${url}: ${(err as Error).message}`);
    return null;
  }
}

function escapeFrontmatter(s: string): string {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

async function migratePost(url: string) {
  const slug = slugFromUrl(url);
  const outPath = join(CONTENT_DIR, `${slug}.md`);
  if (existsSync(outPath)) {
    console.log(`[skip] ${slug} (already exists — delete the file to re-migrate)`);
    return;
  }

  const html = await fetchText(url);
  const $ = load(html);

  const title =
    $("h1.entry-title").first().text().trim() ||
    $('meta[property="og:title"]').attr("content") ||
    $("title").text().trim();
  const date =
    $('meta[property="article:published_time"]').attr("content") ||
    $("time").attr("datetime") ||
    "";
  const author = $('meta[name="author"]').attr("content") || $(".author").first().text().trim() || "Woodlands Manor Farm";
  const excerpt = $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content") || "";
  const featureImageUrl = $('meta[property="og:image"]').attr("content");

  // The site is Elementor-built; the article body lives in
  // .elementor-widget-theme-post-content. Try selectors in order of
  // specificity and fall back to <article> as a last resort.
  let body =
    $(".elementor-widget-theme-post-content .elementor-widget-container").first().html() ||
    $(".elementor-widget-theme-post-content").first().html() ||
    $(".entry-content").first().html() ||
    $("article").first().html();
  if (!body) {
    console.warn(`[no-body] ${slug}`);
    return;
  }

  const $body = load(`<div>${body}</div>`);

  // Strip out related-post / share / nav widgets that sometimes appear
  // inside the post content widget on Elementor pages.
  $body(
    ".elementor-widget-loop-grid, .elementor-widget-share-buttons, .recent-posts, .related-posts, nav, .elementor-widget-author-box, .elementor-widget-post-info, .elementor-widget-post-navigation, .elementor-widget-divider",
  ).remove();

  // Download every image and rewrite to local path. The site uses
  // NitroPack lazy-loading: real URLs live in `nitro-lazy-src` /
  // `nitro-lazy-srcset` while `src` is a tiny SVG placeholder.
  // Resolution order: nitro-lazy-src → nitro-lazy-srcset → data-src →
  // srcset → src. If the only thing we can find is a data: URL, drop
  // the <img> entirely so it doesn't pollute the markdown.
  const pickFromSrcset = (srcset?: string) => {
    if (!srcset) return undefined;
    const last = srcset.split(",").pop()?.trim().split(/\s+/)[0];
    return last && !last.startsWith("data:") ? last : undefined;
  };

  const imgs = $body("img").toArray();
  for (const el of imgs) {
    const $el = $body(el);
    const candidates: (string | undefined)[] = [
      $el.attr("nitro-lazy-src"),
      pickFromSrcset($el.attr("nitro-lazy-srcset")),
      $el.attr("data-src"),
      pickFromSrcset($el.attr("srcset")),
      $el.attr("src"),
    ];
    const src = candidates.find((c) => c && !c.startsWith("data:"));
    if (!src) {
      $el.remove();
      continue;
    }
    const local = await downloadImage(src, slug);
    if (local) {
      $el.attr("src", local);
      [
        "srcset",
        "data-src",
        "nitro-lazy-src",
        "nitro-lazy-srcset",
        "nitro-lazy-empty",
        "data-nitro-empty-id",
      ].forEach((a) => $el.removeAttr(a));
    } else {
      $el.remove();
    }
  }

  let featureImageLocal: string | undefined;
  if (featureImageUrl) {
    featureImageLocal = (await downloadImage(featureImageUrl, slug)) ?? undefined;
  }

  const cleanedHtml = $body("div").first().html() ?? "";
  const md = turndown.turndown(cleanedHtml);

  const frontmatter = [
    "---",
    `title: ${escapeFrontmatter(title)}`,
    `slug: ${escapeFrontmatter(slug)}`,
    date ? `date: ${escapeFrontmatter(date)}` : "",
    `author: ${escapeFrontmatter(author)}`,
    excerpt ? `excerpt: ${escapeFrontmatter(excerpt)}` : "",
    featureImageLocal ? `feature_image: ${escapeFrontmatter(featureImageLocal)}` : "",
    `source_url: ${escapeFrontmatter(url)}`,
    "---",
    "",
    md,
    "",
  ]
    .filter(Boolean)
    .join("\n");

  mkdirSync(CONTENT_DIR, { recursive: true });
  writeFileSync(outPath, frontmatter);
  console.log(`[ok] ${slug}`);
}

async function main() {
  const requestedSlug = process.argv[2];
  const urls = (await fetchSitemap()).filter((url) => {
    const slug = slugFromUrl(url);
    // The owner has retired this competition. Never re-import its entry form.
    return slug !== "win-a-weekend-at-woodlands-manor-farm" && (!requestedSlug || slug === requestedSlug);
  });
  if (requestedSlug && !urls.length) throw new Error("No eligible post found for the requested slug");
  console.log(`Found ${urls.length} posts to migrate.\n`);

  for (const url of urls) {
    try {
      await migratePost(url);
    } catch (err) {
      console.error(`[fail] ${url}: ${(err as Error).message}`);
    }
  }

  console.log("\nDone. Review files in content/blog/ and edit slugs/excerpts if needed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
