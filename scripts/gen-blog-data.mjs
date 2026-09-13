// Precompute blog posts (frontmatter + rendered HTML) into a bundled JSON so
// the site never touches the filesystem at runtime. Reading markdown with `fs`
// works at build time but not inside the Cloudflare Worker (workerd), which is
// why blog post pages 404 in production. This runs from next.config at build.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const OUT = path.join(process.cwd(), "src", "lib", "generated-blog.json");

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
    posts.push({
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      author: data.author ?? null,
      excerpt: data.excerpt ?? null,
      featureImage: data.feature_image ?? data.featureImage ?? null,
      category: data.category ?? null,
      contentHtml: processed.toString(),
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
