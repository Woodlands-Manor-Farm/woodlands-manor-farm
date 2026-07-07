import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/marketing/marketing.module.css";
import { BOOK_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/seo";

const REVIEWS = [
  {
    text: "Really beautiful authentic old Manor House with quirky rooms and period features. Beautiful flat stone floors and huge fireplace. Brilliant place for multiple families with kids. Highly recommend.",
    initials: "AK",
    name: "Alex K.",
    source: "Manor House · 2023",
  },
  {
    text: "Such a beautiful spot! Everything kitted out with the guest in mind. Andrew was very helpful and happy to help at a moment's notice. We are looking to book again with friends!",
    initials: "EM",
    name: "Emma M.",
    source: "Lavender Cottage · 2024",
  },
  {
    text: "We absolutely loved our stay in one of the beautiful yurts. Andrew has really thought about everything you might need. We are already looking at staying again! Highly recommend!",
    initials: "JP",
    name: "John & Pippa",
    source: "Budhyn Yurt · 2024",
  },
  {
    text: "Loads of space, the kitchen is really well equipped and bedrooms all really comfy. The indoor pool and games room was a godsend on a pretty wet week — the kids loved it all.",
    initials: "CP",
    name: "Claire P.",
    source: "Manor House · 2023",
  },
  {
    text: "Perfect family base — two lounges meant the kids had their space and we had ours. Stone fireplace lit beautifully. Andy is a brilliant host and the whole experience was effortless.",
    initials: "TH",
    name: "The Holland family",
    source: "Rose Cottage · 2024",
  },
  {
    text: "Beautiful cottage, lovely owners and the kids absolutely loved feeding the animals. Will be back!",
    initials: "TB",
    name: "The Bryant family",
    source: "Jasmine Cottage · 2024",
  },
  {
    text: "Loved the openness and light — and not having to do stairs with our toddler was a godsend. Beautiful conversion. We've already booked to come back next year.",
    initials: "ST",
    name: "Sarah & Tom",
    source: "The Stables · 2024",
  },
  {
    text: "Romantic, peaceful and quietly luxurious. The roll-top bath sealed the deal. We'll be back. Andy was endlessly helpful with restaurant recommendations.",
    initials: "LM",
    name: "L & M",
    source: "Honeysuckle · 2024",
  },
];

const STATS = [
  { num: "4.9", sub: "Avg booking.com" },
  { num: "5★", sub: "TripAdvisor" },
  { num: "850+", sub: "Reviews" },
  { num: "12 yrs", sub: "Welcoming guests" },
];

export const metadata: Metadata = {
  title: "Guest Reviews",
  description:
    "Real reviews from real guests at Woodlands Manor Farm — 5-star rated on TripAdvisor, Booking.com and Airbnb.",
  alternates: { canonical: "/reviews/" },
};

export default function Page() {
  return (
    <>
      <section className={styles.hero} style={{ height: "55vh", minHeight: 440 }}>
        <Image
          src="/images/home/4c4e10cb7708c56e.jpg"
          alt="Guest reviews of Woodlands Manor Farm"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 45%" }}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroSplit}>
          <div className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>From the guests themselves</p>
            <h1>
              What our <em>guests say</em>
            </h1>
            <p>
              5-star rated on TripAdvisor, Booking.com and Airbnb. Six Booking.com Traveller
              Choice Awards in 2026 alone. Most importantly: guests come back.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.statsBanner}>
        {STATS.map((s) => (
          <div key={s.sub}>
            <div className={styles.statBig}>{s.num}</div>
            <div className={styles.statSub}>{s.sub}</div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>Real stays · real guests</p>
        <h2 className={styles.sectionTitle}>
          What guests <em>are saying</em>
        </h2>

        <div className={styles.reviewsGrid}>
          {REVIEWS.map((r) => (
            <article key={`${r.name}-${r.source}`} className={styles.reviewCard}>
              <div className={styles.reviewStars}>★ ★ ★ ★ ★</div>
              <p className={styles.reviewText}>{r.text}</p>
              <div className={styles.reviewMeta}>
                <div className={styles.reviewAvatar}>{r.initials}</div>
                <div>
                  <div className={styles.reviewName}>{r.name}</div>
                  <div className={styles.reviewSource}>{r.source}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>
          Join them — <em>book your stay</em>
        </h2>
        <p>Best price guaranteed when you book direct with Andy and Ruth.</p>
        <div className={styles.finalCtaButtons}>
          <Link href={BOOK_HREF} className={styles.btnWhite}>
            Check availability
          </Link>
          <a href={`tel:${SITE.contact.phone}`} className={styles.btnGhost}>
            Call {SITE.contact.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
