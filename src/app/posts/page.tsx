import type { Metadata } from "next";
import { NewsListing } from "@/components/blog/news-listing";

// Alias of /news/ — both URLs exist in the WP sitemap.
export const metadata: Metadata = {
  title: "Posts",
  description: "All blog posts and guides from Woodlands Manor Farm.",
  alternates: { canonical: "/news/" },
};

export default function PostsPage() {
  return <NewsListing />;
}
