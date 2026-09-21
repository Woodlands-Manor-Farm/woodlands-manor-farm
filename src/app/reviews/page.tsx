import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BOOK_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/seo";
import { getGoogleReviews } from "@/lib/google-reviews";
import { CURATED_REVIEWS } from "@/lib/data/guest-reviews";
import { GoogleMark } from "@/components/reviews/google-mark";
import { ReviewStars } from "@/components/reviews/review-stars";
import { ReviewerAvatar } from "@/components/reviews/reviewer-avatar";
import { ReviewCollection, type GuestStory } from "@/components/reviews/review-collection";
import styles from "./reviews.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Guest Reviews — Stories from a Stay at Woodlands",
  description: "Read guest stories from Woodlands Manor Farm: family holidays, peaceful cottage stays and yurt adventures near Bude. Reviews from Google, Airbnb and Tripadvisor.",
  alternates: { canonical: "/reviews/" },
};

export default async function Page() {
  const live = await getGoogleReviews();
  const googleReviews: GuestStory[] = (live?.reviews ?? []).map((r, i) => ({
    ...r,
    id: `google-${i}-${r.name}`,
    platform: "Google",
    detail: r.relativeTime || (r.publishTime && !Number.isNaN(Date.parse(r.publishTime))
      ? new Date(r.publishTime).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "Google review"),
    reviewUrl: r.reviewUrl || r.profileUrl || SITE.contact.googleMapsUrl,
  }));
  const curated: GuestStory[] = CURATED_REVIEWS.map((r, i) => ({
    id: `guestbook-${i}`,
    name: r.name,
    text: r.text,
    platform: r.source.startsWith("Airbnb") ? "Airbnb" : "Tripadvisor",
    detail: r.source.split(" · ").slice(1).join(" · "),
    rating: 5,
    color: ["#6b796b", "#8e7368", "#82768c", "#607a7b"][i % 4],
  }));
  const reviews = [...googleReviews, ...curated];

  return <div className={styles.page}>
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrowLight}>The Woodlands guestbook</p>
          <h1>Good holidays.<br /><em>Lovely memories.</em></h1>
          <p className={styles.heroIntro}>The morning swims. The muddy wellies. The &ldquo;can we stay a little longer?&rdquo; moments. Here&rsquo;s Woodlands, in our guests&rsquo; own words.</p>
          <a href="#guest-stories" className={styles.heroLink}>Read their stories <span aria-hidden="true">↓</span></a>
        </div>
        <figure className={styles.heroPhoto}>
          <Image src="/images/home/4c4e10cb7708c56e.jpg" alt="Stone holiday cottages and a sunny terrace overlooking the countryside at Woodlands Manor Farm" fill priority sizes="(min-width: 900px) 48vw, 100vw" />
          <figcaption>A little corner of Cornwall to come back to.</figcaption>
        </figure>
      </div>
    </header>

    <div className={styles.ratingWrap}>
      <div className={styles.ratingPanel}>
        <div className={styles.googleSummary}>
          <span className={styles.googleLabel}><GoogleMark size={24} /> Google Maps reviews</span>
          {live ? <div className={styles.scoreRow}>
            <strong className={styles.score}>{live.rating.toFixed(1)}</strong>
            <div><ReviewStars rating={live.rating} className={styles.summaryStars} /><p>from {live.count.toLocaleString("en-GB")} guest reviews</p></div>
          </div> : <p className={styles.summaryFallback}>Find us in our guests&rsquo; good books.</p>}
        </div>
        <div className={styles.ratingPeople}>
          {googleReviews.length > 0 && <div className={styles.avatarStack} aria-hidden="true">{googleReviews.slice(0, 4).map(r => <ReviewerAvatar key={r.id} name={r.name} photoUrl={r.photoUrl} color={r.color} size={42} />)}</div>}
          <a href={SITE.contact.googleMapsUrl} target="_blank" rel="noreferrer" className={styles.textLink}>Read all reviews on Google <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.otherPlatforms}>
          <span>More stories from</span>
          <div><span className={styles.airbnbWord}>Airbnb</span><span className={styles.platformDivider} /><Image src="/images/awards/tripadvisor.png" alt="Tripadvisor" width={108} height={25} /></div>
        </div>
      </div>
    </div>

    <section id="guest-stories" className={styles.stories} aria-labelledby="stories-heading">
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>Little moments, lasting memories</p><h2 id="stories-heading">A stay worth<br /><em>writing home about.</em></h2></div>
        <div className={styles.sectionIntro}><p>Family get-togethers, escapes for two and first adventures under canvas. Every stay has its own story.</p><p className={styles.selectionNote}>{googleReviews.length ? "Google’s selection is shown newest first, alongside guest quotes selected from Airbnb and Tripadvisor." : "A selection of guest quotes from Airbnb and Tripadvisor. Visit Google for our latest Google reviews."}</p></div>
      </div>
      <ReviewCollection reviews={reviews} />
    </section>

    <section className={styles.invitation} aria-labelledby="invitation-heading">
      <div className={styles.invitationPhoto}><Image src="/images/home/farm-courtyard-cottages.jpg" alt="The courtyard and old tree at Woodlands Manor Farm" fill sizes="(min-width: 760px) 45vw, 100vw" /></div>
      <div className={styles.invitationCopy}><p className={styles.eyebrow}>Your own Woodlands story</p><h2 id="invitation-heading">Same lovely place.<br /><em>Your kind of holiday.</em></h2><p>Find your cottage or yurt, bring your favourite people, and make a few memories of your own.</p><Link href={BOOK_HREF} className={styles.bookButton}>Find your stay <span aria-hidden="true">↗</span></Link><a href={`mailto:${SITE.contact.email}`} className={styles.invitationContact}>Or have a chat with Ruth &amp; Andy →</a></div>
    </section>
  </div>;
}
