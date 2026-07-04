import { SITE } from "./seo";

/**
 * Site-wide LodgingBusiness schema — rendered once in the root layout.
 * Amenities listed here are shared across all nine properties.
 */
export const LODGING_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.contact.phone,
  email: SITE.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.contact.address.street,
    addressLocality: SITE.contact.address.city,
    addressRegion: SITE.contact.address.region,
    postalCode: SITE.contact.address.postalCode,
    addressCountry: SITE.contact.address.country,
  },
  petsAllowed: true,
  // Google reviews score as of July 2026 — update when it changes.
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    reviewCount: 116,
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Heated indoor swimming pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Games room", value: true },
    { "@type": "LocationFeatureSpecification", name: "Working farm with animals", value: true },
    { "@type": "LocationFeatureSpecification", name: "Dog friendly", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
  ],
} as const;
