import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/marketing/marketing.module.css";
import { BOOK_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/seo";
import { getGoogleReviews } from "@/lib/google-reviews";

// Rendered per request so the live Google feed stays fresh (the fetch itself
// is edge-cached for 24h, so Google is only called about once a day).
export const dynamic = "force-dynamic";

// The Google summary — fallback values if the live feed is unavailable.
const GOOGLE = { rating: "4.9", count: 116, url: SITE.contact.googleMapsUrl };

// Fallback Google reviews, used only if the live feed can't be reached.
const FALLBACK_GOOGLE_REVIEWS = [
  {
    name: "F7543RYgrahamc",
    initial: "F",
    color: "#3d1f5c",
    date: "4 weeks ago",
    text: "Amazing peaceful location for a family holiday, deep in the Cornish countryside, yet only 10 minutes drive from…",
  },
  {
    name: "julie Jesson",
    initial: "j",
    color: "#c1440e",
    date: "4 weeks ago",
    text: "These cottages are truly amazing. We stayed in honeysuckle cottage for 5 nights. What a lovely…",
  },
  {
    name: "Philip Turner",
    initial: "P",
    color: "#1a8a8a",
    date: "a month ago",
    text: "WE JUST LOVE WOODLANDS MANOR FARM. Stayed there for the past five years and forward booked again for next…",
  },
  {
    name: "U226FAdonnam",
    initial: "U",
    color: "#3d1f5c",
    date: "a month ago",
    text: "We had an amazing stay in the Manor House, so much space and everything you need for a comfortable stay.",
  },
];

// Curated reviews from across Google, Booking.com, TripAdvisor & Airbnb.
const CURATED = [
  {
    text: "Really beautiful authentic old Manor House with quirky rooms and period features. Beautiful flat stone floors and huge fireplace. Brilliant place for multiple families with kids. Highly recommend.",
    initials: "AK",
    name: "Alex K.",
    source: "Manor House · Google",
  },
  {
    text: "Such a beautiful spot! Everything kitted out with the guest in mind. Andrew was very helpful and happy to help at a moment's notice. We are looking to book again with friends!",
    initials: "EM",
    name: "Emma M.",
    source: "Lavender Cottage · Booking.com",
  },
  {
    text: "We absolutely loved our stay in one of the beautiful yurts. Andrew has really thought about everything you might need. We are already looking at staying again! Highly recommend!",
    initials: "JP",
    name: "John & Pippa",
    source: "Budhyn Yurt · TripAdvisor",
  },
  {
    text: "Loads of space, the kitchen is really well equipped and bedrooms all really comfy. The indoor pool and games room was a godsend on a pretty wet week — the kids loved it all.",
    initials: "CP",
    name: "Claire P.",
    source: "Manor House · Google",
  },
  {
    text: "Perfect family base — two lounges meant the kids had their space and we had ours. Stone fireplace lit beautifully. Andy is a brilliant host and the whole experience was effortless.",
    initials: "TH",
    name: "The Holland family",
    source: "Rose Cottage · Booking.com",
  },
  {
    text: "Beautiful cottage, lovely owners and the kids absolutely loved feeding the animals. Will be back!",
    initials: "TB",
    name: "The Bryant family",
    source: "Jasmine Cottage · Airbnb",
  },
  {
    text: "Loved the openness and light — and not having to do stairs with our toddler was a godsend. Beautiful conversion. We've already booked to come back next year.",
    initials: "ST",
    name: "Sarah & Tom",
    source: "The Stables · Google",
  },
  {
    text: "Romantic, peaceful and quietly luxurious. The roll-top bath sealed the deal. We'll be back. Andy was endlessly helpful with restaurant recommendations.",
    initials: "LM",
    name: "L & M",
    source: "Honeysuckle · TripAdvisor",
  },
];

function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Guest Reviews",
  description:
    "Real guest reviews of Woodlands Manor Farm — rated 4.9 out of 5 across 116 Google reviews, plus 5-star ratings on TripAdvisor, Booking.com and Airbnb.",
  alternates: { canonical: "/reviews/" },
};

export default async function Page() {
  const live = await getGoogleReviews();
  const rating = live ? live.rating.toString() : GOOGLE.rating;
  const count = live ? live.count : GOOGLE.count;
  const googleReviews =
    live && live.reviews.length > 0
      ? live.reviews.slice(0, 8).map((r) => ({
          name: r.name,
          initial: r.initial,
          color: r.color,
          date: r.relativeTime,
          text: r.text,
        }))
      : FALLBACK_GOOGLE_REVIEWS;

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
              Rated {rating} out of 5 across {count} Google reviews, and 5-star rated on
              TripAdvisor, Booking.com and Airbnb. Most importantly: guests come back.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        {/* Google rating summary */}
        <div className={styles.gHeader}>
          <div>
            <div className={styles.gHeaderName}>{SITE.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", marginTop: 10 }}>
              <span className={styles.gHeaderScore}>{rating}</span>
              <span style={{ fontSize: 13, color: "var(--color-text-light)", textAlign: "left", lineHeight: 1.3 }}>
                Out of 5<br />stars
              </span>
              <span className={styles.gHeaderStars}>★★★★★</span>
              <GoogleG size={26} />
            </div>
            <div className={styles.gHeaderMeta} style={{ marginTop: 12 }}>
              Overall rating out of <strong>{count} Google reviews</strong>
            </div>
          </div>
        </div>

        {/* Live-style Google reviews */}
        <div className={styles.gReviewsGrid}>
          {googleReviews.map((r) => (
            <article key={r.name} className={styles.gReviewCard}>
              <div className={styles.gReviewTop}>
                <div className={styles.gAvatar} style={{ background: r.color }}>{r.initial}</div>
                <div className={styles.gWho}>
                  <div className={styles.gName}>{r.name}</div>
                  <div className={styles.gDate}>{r.date}</div>
                </div>
                <GoogleG />
              </div>
              <div className={styles.gStars}>★★★★★</div>
              <p className={styles.gText}>{r.text}</p>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a href={GOOGLE.url} target="_blank" rel="noreferrer" className={styles.gAllBtn}>
            <GoogleG size={18} /> Read all our reviews on Google
          </a>
        </div>
      </section>

      <section className={styles.section} style={{ paddingTop: 0 }}>
        <p className={styles.eyebrow}>More from our guests</p>
        <h2 className={styles.sectionTitle}>
          Real stays, <em>real reviews</em>
        </h2>
        <p className={styles.gCuratedNote}>Across Google, Booking.com, TripAdvisor &amp; Airbnb</p>

        <div className={styles.reviewsGrid}>
          {CURATED.map((r) => (
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
