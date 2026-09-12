import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  featureImage?: string;
  category: string;
};

export type BlogPostFull = BlogPost & {
  contentHtml: string;
};

// Posts migrated from WordPress carry no category in their frontmatter, so we
// derive a short display label from the slug/title for the news cards. A
// `category` field in frontmatter (if ever added) always takes precedence.
const CATEGORY_RULES: Array<[RegExp, string]> = [
  [/award|wins-|-wins/, "Awards"],
  [/win-a|win-the|competition|giveaway/, "Competition"],
  [/yurt|glamping/, "Glamping"],
  [/alpaca|animal|feed-the/, "Farm life"],
  [/restaurant|pub|-eat|dining|foodie|cafe/, "Food & drink"],
  [/beach/, "Beaches"],
  [/whats-on|what-s-on|festival|christmas|event|half-term|summer|winter-break/, "What's on"],
  [/surf|fishing|cycling|golf|tee-off|swimming|walk|kayak|riding/, "Things to do"],
  [/shopping|reasons|ideas|family|guide|things-to/, "Local guide"],
];

function categoryFor(slug: string, title: string): string {
  const hay = `${slug} ${title}`.toLowerCase();
  for (const [re, label] of CATEGORY_RULES) {
    if (re.test(hay)) return label;
  }
  return "Journal";
}

// "2026-02-07T22:08:24+00:00" -> "7 Feb 2026". Falls back to the raw string
// if the date can't be parsed so a card never renders an empty label.
export function formatPostDate(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function readPostFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

function parseMeta(filename: string): BlogPost {
  const file = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data } = matter(file);
  const slug = (data.slug as string) ?? filename.replace(/\.md$/, "");
  const title = (data.title as string) ?? slug;
  return {
    slug,
    title,
    date: (data.date as string) ?? "",
    author: data.author as string | undefined,
    excerpt: data.excerpt as string | undefined,
    featureImage:
      (data.feature_image as string | undefined) ?? (data.featureImage as string | undefined),
    category: (data.category as string | undefined) ?? categoryFor(slug, title),
  };
}

export function getAllPosts(): BlogPost[] {
  return readPostFiles()
    .map(parseMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): string[] {
  return readPostFiles().map((f) => parseMeta(f).slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPostFull | null> {
  const file = readPostFiles().find((f) => parseMeta(f).slug === slug);
  if (!file) return null;
  const meta = parseMeta(file);
  const fullPath = path.join(BLOG_DIR, file);
  const { content } = matter(fs.readFileSync(fullPath, "utf8"));
  const processed = await remark().use(remarkHtml).process(content);
  return { ...meta, contentHtml: processed.toString() };
}
