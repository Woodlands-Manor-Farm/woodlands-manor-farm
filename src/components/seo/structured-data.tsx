import { SITE } from "@/lib/constants/seo";

/**
 * JSON-LD structured data describing the business as a lodging with an
 * indoor pool. Helps search engines surface rich results for queries like
 * "holiday cottages with a pool in Cornwall" and "farm stay Cornwall".
 */
export function StructuredData() {
  const heroImage = `${SITE.url}/images/cottages/9792dd1b5f66d139.jpg`;

  const lodging = {
    "@context": "https://schema.org",
    "@type": "Resort",
    "@id": `${SITE.url}/#lodging`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    image: heroImage,
    logo: `${SITE.url}/images/wmf-logo.png`,
    priceRange: SITE.priceRange,
    petsAllowed: true,
    currenciesAccepted: "GBP",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.contact.address.street,
      addressLocality: SITE.contact.address.city,
      addressRegion: SITE.contact.address.region,
      postalCode: SITE.contact.address.postalCode,
      addressCountry: SITE.contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: SITE.contact.googleMapsUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 115,
      bestRating: 5,
      worstRating: 1,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Heated indoor swimming pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pet/dog friendly", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free on-site parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Games room", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-site farm animals", value: true },
      { "@type": "LocationFeatureSpecification", name: "Self-catering", value: true },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.tagline,
    inLanguage: "en-GB",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodging) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
