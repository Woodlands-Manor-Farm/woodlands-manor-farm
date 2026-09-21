import type { Metadata } from "next";
import ReviewsPage from "../reviews/page";

// Alias of /reviews/ — both URLs exist in the WP sitemap.
// Inlined (rather than re-exporting default) because Next's static page
// collection breaks on `export { default } from` at the page boundary.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "What Our Visitors Say",
  description: "What guests say about staying at Woodlands Manor Farm in Bude, Cornwall.",
  alternates: { canonical: "/reviews/" },
};

export default function Page() {
  return <ReviewsPage />;
}
