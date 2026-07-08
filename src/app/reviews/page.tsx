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
    text: "This place should be allowed more stars, I can't rate it enough. This was our second visit! It's a beautiful setting, feels so safe, so much to do, so well taken care of — loved reading in the evening listening to the sheep and cows in the distance. Absolutely stunning, recommended to anyone who will listen.",
    initials: "Z",
    name: "Zebraaa",
    source: "TripAdvisor · Jun 2026",
  },
  {
    text: "Our second trip here. Great for the family and dogs. The swimming pool is a real bonus, and it's very close to amazing beaches. Rose Cottage is spacious and well equipped. Andy responded to our messages very quickly which was appreciated — he is a great host. We hope to return very soon.",
    initials: "M",
    name: "Maggie",
    source: "Airbnb · Rose Cottage",
  },
  {
    text: "Amazing peaceful location for a family holiday, deep in the Cornish countryside, yet only 10 minutes drive from exceptional beaches. Ruth and Andy were helpful and friendly and the facilities within the house and grounds were extensive. A very enjoyable place to spend a holiday.",
    initials: "GC",
    name: "Graham C",
    source: "TripAdvisor · May 2026 · Manor House",
  },
  {
    text: "We had a fantastic weekend staying in one of the Yurts. It's extremely family and dog friendly and our kids loved all the facilities including the climbing frame, swimming pool and games room. We enjoyed BBQs both evenings and I would highly recommend a visit!",
    initials: "J",
    name: "Jimmy",
    source: "Airbnb · The Yurts",
  },
  {
    text: "We had an amazing stay in the Manor House, so much space and everything you need for a comfortable stay. Mattresses were so comfy too, lots to do in the surrounding areas and the heated pool was an added bonus. We loved it and will be back — thank you!",
    initials: "DM",
    name: "Donna M",
    source: "TripAdvisor · May 2026 · Manor House",
  },
  {
    text: "Rose Cottage comfortably accommodated three generations aged from less than one to over 60. There was plenty for the children and adults to do at the farm, and the children particularly enjoyed feeding the animals — Sparky was a real hit! We would happily come back.",
    initials: "P",
    name: "Peter",
    source: "Airbnb · Rose Cottage",
  },
  {
    text: "Property was excellent. Beautifully thought out. Shower with constant hot water. Plenty of cooking facilities. A nice big field for dog walking and many other walks nearby. Quiet location.",
    initials: "EB",
    name: "EnglandBanker",
    source: "TripAdvisor · May 2026",
  },
  {
    text: "Our second time staying here as a family of four. Perfect place for the kids to get the outdoor experience, but plenty of on-site amenities to entertain, and well located in Cornwall for beaches and towns. Will come back again.",
    initials: "M",
    name: "Mike",
    source: "Airbnb · 2026",
  },
  {
    text: "A wonderful weekend in the Manor farmhouse with my family and five grandchildren. They absolutely loved exploring the house and playing hide and seek. There was so much space, the children enjoyed the lovely pool and we all had fun in the games room. We can't wait to go back!",
    initials: "HS",
    name: "Hilary S",
    source: "TripAdvisor · Mar 2026 · Manor House",
  },
  {
    text: "Everything is very tastefully and cleverly designed. Andrew is lovely, hospitable and helpful. A wonderful place with a very special aura. Incomparable.",
    initials: "M",
    name: "Max",
    source: "Airbnb · 2026",
  },
  {
    text: "Fabulous location, peace and quiet, amazing walks on the doorstep. Beautiful beaches close by. The cottage is decorated to the highest standard, clean and well equipped — so comfortable and homely. The heated pool was an exciting bonus. We definitely will be back.",
    initials: "SC",
    name: "Steph C",
    source: "TripAdvisor · Feb 2026",
  },
  {
    text: "We had a wonderful stay. The cottage is clean and warm and has everything you need. Ruth and Andy are friendly and welcoming and the animals are adorable. We would definitely come again.",
    initials: "SR",
    name: "Samantha R",
    source: "TripAdvisor · Feb 2026",
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
