import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { PROPERTIES } from "@/lib/constants/properties";
import { SITE } from "@/lib/constants/seo";

const STATIC_PATHS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/bude-holiday-cottages/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/yurts/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/holiday-cottage-direct-booking-woodlands-cornwall/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/special-offers/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/experiences-weddings-events/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/dog-friendly-holiday-cottages-bude/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/reviews/", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about-woodlands-manor-farm-holiday-cottages-with-a-pool/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/on-the-farm/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/the-animals-at-woodlands/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/places-to-eat-in-bude/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/things-to-do-in-bude/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/the-little-extras/", changeFrequency: "monthly", priority: 0.5 },
  { path: "/holiday-cottage-inventory/", changeFrequency: "yearly", priority: 0.4 },
  { path: "/dog-rules/", changeFrequency: "yearly", priority: 0.4 },
  { path: "/contact-us/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/news/", changeFrequency: "weekly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const propertyEntries: MetadataRoute.Sitemap = PROPERTIES.map((p) => ({
    url: `${SITE.url}${p.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE.url}/${post.slug}/`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...propertyEntries, ...blogEntries];
}
