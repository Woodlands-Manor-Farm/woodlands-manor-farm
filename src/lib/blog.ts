import postsData from "./generated-blog.json";

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

type RawPost = {
  slug: string;
  title: string;
  date: string;
  author: string | null;
  excerpt: string | null;
  featureImage: string | null;
  category: string | null;
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

function toMeta(p: RawPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    author: p.author ?? undefined,
    excerpt: p.excerpt ?? undefined,
    featureImage: p.featureImage ?? undefined,
    category: p.category ?? categoryFor(p.slug, p.title),
  };
}

const POSTS = postsData as RawPost[];

export function getAllPosts(): BlogPost[] {
  return POSTS.map(toMeta).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPostFull | null> {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  return { ...toMeta(post), contentHtml: post.contentHtml };
}
