export type PropertyType = "cottage" | "yurt";

export type Property = {
  slug: string;
  name: string;
  type: PropertyType;
  sleeps: number;
  bedrooms: number;
  shortDescription: string;
  href: string;
  heroImage: string;
  /** SuperControl property ID — used by the booking widget embed. */
  superControlId: string;
};

/**
 * Single source of truth for the 9 letting units. Slugs match the existing
 * WordPress URLs exactly so SEO history is preserved.
 */
export const PROPERTIES: Property[] = [
  {
    slug: "the-manor-house",
    name: "The Manor House",
    type: "cottage",
    sleeps: 12,
    bedrooms: 6,
    shortDescription:
      "The original 17th-century farmhouse — six bedrooms, sleeps twelve, perfect for large family gatherings.",
    href: "/the-manor-house/",
    heroImage: "/images/the-manor-house/manor-exterior-garden.jpg",
    superControlId: "563129",
  },
  {
    slug: "rose-cottage",
    name: "Rose Cottage",
    type: "cottage",
    sleeps: 8,
    bedrooms: 4,
    shortDescription: "Two-lounge converted barn with stone fireplace, sleeps 8.",
    href: "/rose-cottage/",
    heroImage: "/images/rose-cottage/rose-lounge.jpg",
    superControlId: "562739",
  },
  {
    slug: "jasmine-cottage",
    name: "Jasmine Cottage",
    type: "cottage",
    sleeps: 6,
    bedrooms: 3,
    shortDescription: "Light-filled cottage with a private patio overlooking the meadow.",
    href: "/jasmine-cottage/",
    heroImage: "/images/jasmine-cottage/jasmine-lounge.jpg",
    superControlId: "577259",
  },
  {
    slug: "lavender-cottage",
    name: "Lavender Cottage",
    type: "cottage",
    sleeps: 4,
    bedrooms: 2,
    shortDescription: "Cosy stone cottage with woodburner and country-style kitchen.",
    href: "/lavender-cottage/",
    heroImage: "/images/lavender-cottage/lavender-lounge.jpg",
    superControlId: "577258",
  },
  {
    slug: "the-coach-house",
    name: "The Coach House",
    type: "cottage",
    sleeps: 2,
    bedrooms: 1,
    shortDescription: "Ivy-clad couples' retreat with vaulted beams and super-king bed.",
    href: "/the-coach-house/",
    heroImage: "/images/the-coach-house/coach-exterior.jpg",
    superControlId: "565805",
  },
  {
    slug: "the-stables",
    name: "The Stables",
    type: "cottage",
    sleeps: 4,
    bedrooms: 2,
    shortDescription: "Single-storey conversion with valley views and freestanding bath.",
    href: "/the-stables/",
    heroImage: "/images/the-stables/stables-exterior-pond.jpg",
    superControlId: "565803",
  },
  {
    slug: "honeysuckle-cottage",
    name: "Honeysuckle Cottage",
    type: "cottage",
    sleeps: 2,
    bedrooms: 1,
    shortDescription: "Intimate one-bedroom cottage ideal for couples.",
    href: "/honeysuckle-cottage/",
    heroImage: "/images/honeysuckle-cottage/honeysuckle-kitchen-lounge.jpg",
    superControlId: "565804",
  },
  {
    slug: "budhyn-yurt",
    name: "Budhyn Yurt",
    type: "yurt",
    sleeps: 4,
    bedrooms: 1,
    shortDescription: "Authentic Mongolian yurt in a secluded spot by the pond — wood burner, private kitchen & bathroom, sleeps 4.",
    href: "/budhyn-yurt/",
    heroImage: "/images/budhyn-yurt/budhyn-exterior-hero.jpg",
    superControlId: "593204",
  },
  {
    slug: "fenton-yurt",
    name: "Fenton Yurt",
    type: "yurt",
    sleeps: 4,
    bedrooms: 1,
    shortDescription: "Sister yurt to Budhyn, nestled by the woodland — wood burner, private kitchen & bathroom, sleeps 4.",
    href: "/fenton-yurt/",
    heroImage: "/images/fenton-yurt/fenton-exterior-hero.jpg",
    superControlId: "593172",
  },
];

export const COTTAGES = PROPERTIES.filter((p) => p.type === "cottage");
export const YURTS = PROPERTIES.filter((p) => p.type === "yurt");
