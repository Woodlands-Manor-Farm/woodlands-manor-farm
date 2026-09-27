import type { Metadata } from "next";
import { PropertyPage } from "@/components/property/property-page";
import { PROPERTY_CONTENT } from "@/lib/data/property-content";
import { PROPERTIES } from "@/lib/constants/properties";

const SLUG = "budhyn-yurt" as const;
const property = PROPERTIES.find((p) => p.slug === SLUG)!;
const content = PROPERTY_CONTENT[SLUG];

export const metadata: Metadata = {
  title: `${property.name}, Glamping in Bude`,
  description: property.shortDescription,
  alternates: { canonical: property.href },
  openGraph: {
    title: `${property.name}, Woodlands Manor Farm`,
    description: property.shortDescription,
    images: [content.gallery[0]?.src].filter(Boolean) as string[],
  },
};

export default function Page() {
  return <PropertyPage data={content} />;
}
