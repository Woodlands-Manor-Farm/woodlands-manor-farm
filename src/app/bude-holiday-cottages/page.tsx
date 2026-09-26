import type { Metadata } from "next";
import { ListingPage } from "@/components/listing/listing-page";
import { Faq, type FaqItem } from "@/components/seo/faq";
import { COTTAGE_CARDS, YURT_CARDS } from "@/lib/data/listing-content";

const FAQS: FaqItem[] = [
  {
    q: "Are dogs allowed at Woodlands Manor Farm?",
    a: "Yes — Woodlands is a dog-friendly farm and most of our cottages welcome dogs. There are miles of on-site woodland and coast-path walks straight from the gate, and several dog-friendly beaches nearby.",
    link: { href: "/dog-rules/", label: "See our dog rules" },
  },
  {
    q: "Is there an indoor pool, and is it heated?",
    a: "Yes. Our heated indoor pool is kept at 30°C and is open to all guests from 8am to 8pm every day of the year, free of charge and with no need to book.",
    link: { href: "/on-the-farm/", label: "More about the farm & facilities" },
  },
  {
    q: "How many people can you sleep?",
    a: "From couples in a cosy cottage or yurt (sleeping 2) right up to large gatherings. The Manor House alone sleeps 12, and you can book several cottages together — or the whole farm — for bigger groups and celebrations.",
    link: { href: "/special-offers/", label: "Group & whole-farm enquiries" },
  },
  {
    q: "Are the cottages self-catering?",
    a: "Yes, every cottage and yurt is fully self-catering, with a well-equipped kitchen and a complimentary welcome pack on arrival. You can also pre-order a breakfast hamper or arrange a private chef.",
    link: { href: "/the-little-extras/", label: "See the little extras" },
  },
  {
    q: "How far are the beaches?",
    a: "Our nearest beach, Duckpool, is about 2 miles away, and the town beaches at Bude are around 6 miles. The South West Coast Path is just a couple of miles from the farm.",
    link: { href: "/beaches-and-walks-near-bude/", label: "Local beaches & walks" },
  },
  {
    q: "Is there free parking and Wi-Fi?",
    a: "Yes — there is free on-site parking, complimentary super-fast Wi-Fi throughout all the cottages and yurts, and a free EV charging point for guests.",
  },
  {
    q: "Is it a good place for families?",
    a: "Very much so. Alongside the indoor pool there is a games room, a playground and playing field, and free Feed the Animals sessions twice a week where children can meet the ponies, alpacas, goats and pigs.",
    link: { href: "/on-the-farm/", label: "Life on the farm" },
  },
  {
    q: "How do I get the best price?",
    a: "Always by booking direct with us — you will get our best rate with no booking fees or commission. Returning guests receive a discount, and we offer group rates for multiple cottages or whole-farm stays.",
    link: { href: "/special-offers/", label: "Current offers" },
  },
];

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
    <>
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
      <Faq items={FAQS} />
    </>
  );
}
