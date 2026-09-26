import { SITE } from "@/lib/constants/seo";

/**
 * Builds a schema.org BreadcrumbList for a page's position in the site
 * hierarchy. Render the result with the <JsonLd> component. Each item's
 * `path` is site-relative (e.g. "/bude-holiday-cottages/").
 */
export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
