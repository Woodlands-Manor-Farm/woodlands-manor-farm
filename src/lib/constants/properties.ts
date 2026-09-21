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
    shortDescription: "Rose Cottage in Bude sleeps 8, with a double bedroom and bathroom downstairs, three bedrooms upstairs and access to the heated indoor pool.",
    href: "/rose-cottage/",
    heroImage: "/images/rose-cottage/rose-lounge-upstairs.jpg",
    superControlId: "562739",
  },
  {
    slug: "jasmine-cottage",
    name: "Jasmine Cottage",
    type: "cottage",
    sleeps: 6,
    bedrooms: 3,
    shortDescription: "Jasmine Cottage in Bude sleeps 6 in three double bedrooms. A secret bookcase door connects to Lavender when booked together for 10 guests.",
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
    shortDescription: "Lavender Cottage in Bude sleeps 4 on one level, with two bathrooms. Book with Jasmine to sleep 10, connected by a secret bookcase door.",
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
    shortDescription: "The Coach House in Bude sleeps 2, with a super-king bedroom, shower room and access to the heated indoor pool.",
    href: "/the-coach-house/",
    heroImage: "/images/the-coach-house/coach-bedroom.jpg",
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
    shortDescription: "Honeysuckle Cottage in Bude sleeps 2, with its living space, bedroom and bathroom all on the ground floor, plus heated indoor pool access.",
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
    shortDescription: "Budhyn Yurt in Bude sleeps 4 in a super-king bed and two singles, with a private kitchen and bathroom, wood burner and heated indoor pool access.",
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
    shortDescription: "Fenton Yurt in Bude sleeps 4 in a super-king bed and two singles, with a private kitchen and bathroom, wood burner and heated indoor pool access.",
    href: "/fenton-yurt/",
    heroImage: "/images/fenton-yurt/fenton-exterior-hero.jpg",
    superControlId: "593172",
  },
];

export const COTTAGES = PROPERTIES.filter((p) => p.type === "cottage");
export const YURTS = PROPERTIES.filter((p) => p.type === "yurt");

// Standard capacity, excluding camp beds which require advance agreement.
export const TOTAL_GUEST_CAPACITY = PROPERTIES.reduce((total, property) => total + property.sleeps, 0);
export const CAMP_BED_NOTE = "Camp beds can be added by prior agreement.";
