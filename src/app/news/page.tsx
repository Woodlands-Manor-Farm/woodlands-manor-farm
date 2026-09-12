import type { Metadata } from "next";
import { NewsListing } from "@/components/blog/news-listing";

export const metadata: Metadata = {
  title: "News & Stories",
  description:
    "News, guides and stories from Woodlands Manor Farm — Bude, Cornwall and what's on at the farm.",
  alternates: { canonical: "/news/" },
};

export default function NewsPage() {
  return <NewsListing />;
}
