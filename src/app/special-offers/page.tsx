import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/marketing/marketing.module.css";
import { BOOK_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/seo";
import { CAMP_BED_NOTE, TOTAL_GUEST_CAPACITY } from "@/lib/constants/properties";

const OFFERS = [
  {
    label: "Last-minute",
    title: "Late availability discount",
    save: "Up to 20% off",
    body: "Stays starting within the next 14 days qualify for our last-minute discount. Subject to availability across all cottages and yurts. Best applied to short midweek breaks.",
    footer: "Book direct",
    variant: "lastMin" as const,
  },
  {
    label: "Multi-night",
    title: "Stay longer, save more",
    save: "10% off 7+ nights",
    body: "Stay seven nights or more on a single booking and we apply a 10% discount automatically at checkout. Available all year round, except Christmas & New Year.",
    footer: "Auto-applied",
  },
  {
    label: "Returning guests",
    title: "We love you back",
    save: "Up to 15% off",
    body: "Returning guests receive a personal discount code at departure, redeemable on the next direct booking. Lost your code? Call Andy and he&rsquo;ll reissue it.",
    footer: "Email Andy",
  },
  {
    label: "Seasonal",
    title: "Bluebell breaks — April & May",
    save: "From £495 / 4 nights",
    body: "Time your visit for our magical bluebell woodland walks. Four-night midweek breaks in our smaller cottages, with a bottle of Camel Valley fizz on arrival.",
    footer: "Limited dates",
    variant: "seasonal" as const,
  },
  {
    label: "Group booking",
    title: "Take the whole farm",
    save: "Group discount",
    body: `Booking 3+ properties on the same dates qualifies for an exclusive-use group rate. Up to ${TOTAL_GUEST_CAPACITY} guests across seven cottages and two yurts. ${CAMP_BED_NOTE} Call Andy direct to discuss.`,
    footer: "Call to book",
  },
  {
    label: "Out of season",
    title: "Quiet midweek breaks",
    save: "From £325 / 3 nights",
    body: "Three-night midweek breaks in November, January, February & March in selected cottages. Wood burners on, pool warm, fewer people on the farm.",
    footer: "Off-peak only",
  },
];

export const metadata: Metadata = {
  title: "Special Offers",
  description:
    "Last-minute deals, seasonal breaks, multi-night discounts and returning guest offers at Woodlands Manor Farm in Bude, Cornwall.",
  alternates: { canonical: "/special-offers/" },
};

export default function Page() {
  return (
    <>
      <section className={styles.hero} style={{ height: "60vh", minHeight: 460 }}>
        <Image
          src="/images/home/cc82e0f15a7b2058.jpg"
          alt="Special offers at Woodlands Manor Farm"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 45%" }}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroSplit}>
          <div className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>Save when you book direct</p>
            <h1>
              Special <em>offers</em>
            </h1>
            <p>
              Last-minute deals, seasonal breaks, returning-guest discounts and group rates — all
              applied automatically when you book direct with Andy and Ruth.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>Currently available</p>
        <h2 className={styles.sectionTitle}>
          Pick the offer that <em>fits your stay</em>
        </h2>
        <p className={styles.sectionLead}>
          Most of our discounts apply automatically at the booking stage. A few are reserved for
          returning guests or group bookings — drop us a line if you&rsquo;re unsure which applies
          to you.
        </p>

        <div className={styles.offerGrid}>
          {OFFERS.map((o) => (
            <div
              key={o.title}
              className={`${styles.offerCard} ${
                o.variant === "lastMin"
                  ? styles.offerCardLastMin
                  : o.variant === "seasonal"
                    ? styles.offerCardSeasonal
                    : ""
              }`}
            >
              <div className={styles.offerLabel}>{o.label}</div>
              <div className={styles.offerTitle}>{o.title}</div>
              <div className={styles.offerSave}>{o.save}</div>
              <p className={styles.offerBody}>{o.body}</p>
              <div className={styles.offerFooter}>
                <span>{o.footer}</span>
                <Link href={BOOK_HREF} style={{ color: "var(--color-violet)", textDecoration: "none" }}>
                  Book →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>
          Need a custom <em>quote?</em>
        </h2>
        <p>
          Call Andy direct for group bookings, exclusive-use enquiries or anything that
          doesn&rsquo;t fit a standard offer.
        </p>
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
