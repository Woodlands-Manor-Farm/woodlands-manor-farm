import type { Metadata } from "next";
import { ListingPage } from "@/components/listing/listing-page";
import { COTTAGE_CARDS, YURT_CARDS } from "@/lib/data/listing-content";

export const metadata: Metadata = {
  title: "Holiday Cottages in Bude, Cornwall — with Heated Indoor Pool",
  description:
    "Dog-friendly holiday cottages in Bude, North Cornwall on a farm — seven characterful cottages and two glamping yurts sleeping 2 to 12, all with heated indoor pool, games room and farm animals. Book direct, no fees.",
  alternates: { canonical: "/bude-holiday-cottages/" },
  openGraph: {
    title: "Holiday Cottages in Bude, Cornwall — Woodlands Manor Farm",
    description:
      "Seven cottages and two yurts on a Cornish farm near Bude, with heated indoor pool, games room and animals. Book direct, no fees.",
    images: ["/images/cottages/9792dd1b5f66d139.jpg"],
  },
};

export default function CottagesPage() {
  return (
    <ListingPage
      hero={{
        image: "/images/cottages/9792dd1b5f66d139.jpg",
        alt: "Woodlands Manor Farm courtyard — Bude, Cornwall",
        eyebrow: "Woodlands Manor Farm · Bude, Cornwall",
        title: (
          <>
            Cottages &amp; <em>yurts</em>
          </>
        ),
        description:
          "Seven characterful cottages and two Mongolian glamping yurts, sleeping 2 to 12. All with access to the heated indoor pool, games room, farm animals and two miles of Cornish coastline.",
      }}
      cottages={COTTAGE_CARDS}
      yurts={YURT_CARDS}
    />
  );
}
