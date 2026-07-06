import type { Metadata } from "next";
import { ListingPage } from "@/components/listing/listing-page";
import { YURT_CARDS } from "@/lib/data/listing-content";

export const metadata: Metadata = {
  title: "Glamping Yurts in Cornwall — Luxury Mongolian Yurts near Bude",
  description:
    "Luxury glamping in Cornwall — two authentic hand-crafted Mongolian yurts at Woodlands Manor Farm near Bude. Kingsize bed and two singles, high-end wood burner, private kitchen and bathroom, dogs welcome, open all year, with access to the heated indoor pool. Sleeps 4 each.",
  alternates: { canonical: "/yurts/" },
  openGraph: {
    title: "Glamping Yurts in Cornwall — Woodlands Manor Farm, Bude",
    description:
      "Authentic Mongolian glamping near Bude, North Cornwall — Budhyn & Fenton yurts with wood burners, private kitchens and bathrooms, and heated indoor pool access. Open all year.",
    images: ["/images/budhyn-yurt/budhyn-exterior-hero.jpg"],
  },
};

export default function YurtsPage() {
  return (
    <ListingPage
      hero={{
        image: "/images/budhyn-yurt/budhyn-exterior-hero.jpg",
        alt: "Authentic Mongolian glamping yurt in the meadow at Woodlands Manor Farm, Bude, Cornwall",
        eyebrow: "Woodlands Manor Farm · Bude, North Cornwall",
        title: (
          <>
            Glamping yurts <em>in Cornwall</em>
          </>
        ),
        description:
          "Two authentic hand-crafted Mongolian yurts in a secluded corner of the farm by the pond, looking down over the woodland. Each sleeps four with a kingsize bed and two singles, its own private kitchen and bathroom, a high-end wood burner for cosy winters, and its own BBQ and picnic bench — plus full run of the farm, including the heated indoor pool. Open all year. Dogs welcome.",
      }}
      yurts={YURT_CARDS}
      yurtsHeading="Budhyn & Fenton"
    />
  );
}
