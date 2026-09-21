// Precompute blog posts (frontmatter + rendered HTML) into a bundled JSON so
// the site never touches the filesystem at runtime. Reading markdown with `fs`
// works at build time but not inside the Cloudflare Worker (workerd), which is
// why blog post pages 404 in production. This runs from next.config at build.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import sharp from "sharp";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUT = path.join(process.cwd(), "src", "lib", "generated-blog.json");

// Read intrinsic dimensions for a local image (cached), so we can add
// width/height to <img> tags and reserve layout space (prevents CLS).
const dimCache = new Map();
async function imgDims(src) {
  if (!src.startsWith("/images/")) return null;
  if (dimCache.has(src)) return dimCache.get(src);
  let dims = null;
  try {
    const meta = await sharp(path.join(PUBLIC_DIR, src)).metadata();
    if (meta.width && meta.height) dims = { w: meta.width, h: meta.height };
  } catch {
    dims = null;
  }
  dimCache.set(src, dims);
  return dims;
}

// Add lazy-loading, async decoding and intrinsic dimensions to blog images.
async function enhanceImages(html) {
  const srcs = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]);
  const dims = {};
  for (const s of new Set(srcs)) dims[s] = await imgDims(s);
  return html.replace(/<img\b([^>]*)>/g, (_full, attrs) => {
    const sm = attrs.match(/src="([^"]+)"/);
    let add = ' loading="lazy" decoding="async"';
    if (sm && dims[sm[1]] && !/\bwidth=/.test(attrs)) {
      add += ` width="${dims[sm[1]].w}" height="${dims[sm[1]].h}"`;
    }
    return `<img${attrs}${add}>`;
  });
}

async function main() {
  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))
    : [];

  const posts = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = data.slug ?? file.replace(/\.md$/, "");
    const processed = await remark().use(remarkHtml).process(content);
    const contentHtml = await enhanceImages(processed.toString());
    posts.push({
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      author: data.author ?? null,
      excerpt: data.excerpt ?? null,
      featureImage: data.feature_image ?? data.featureImage ?? null,
      category: data.category ?? null,
      contentHtml,
    });
  }

  // Newest first for stable output.
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  fs.writeFileSync(OUT, `${JSON.stringify(posts, null, 0)}\n`);
  console.log(`gen-blog-data: wrote ${posts.length} posts -> ${path.relative(process.cwd(), OUT)}`);
}

main().catch((err) => {
  console.error("gen-blog-data failed:", err);
  process.exit(1);
});
