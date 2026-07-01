export const SITE = {
  name: "Woodlands Manor Farm",
  tagline: "Holiday Cottages with a Pool in Bude, Cornwall",
  description:
    "A 17th-century farm stay in the Coombe Valley near Bude, Cornwall. Eight self-catering holiday cottages and two yurts with a heated indoor pool, farm animals and a warm Cornish welcome — the perfect family base for exploring Cornwall.",
  url: "https://woodlandsmanorfarm.co.uk",
  locale: "en_GB",
  priceRange: "££",
  geo: {
    // Approximate — verify exact coordinates against the Google Maps pin before publishing.
    latitude: 50.8924,
    longitude: -4.5283,
  },
  twitterHandle: "@woodlandsmanorfarm",
  contact: {
    phone: "+447887677354",
    phoneDisplay: "07887 677 354",
    email: "enquiries@woodlandsmanorfarm.co.uk",
    address: {
      street: "Woodford",
      city: "Bude",
      region: "Cornwall",
      postalCode: "EX23 9HT",
      country: "GB",
    },
    what3words: "valid.camps.entry",
    googleMapsUrl: "https://maps.app.goo.gl/CUDSFvUtqPuTt6zs6",
  },
} as const;
