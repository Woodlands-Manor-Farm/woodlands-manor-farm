"use client";

import { useState } from "react";
import { ReviewerAvatar } from "./reviewer-avatar";
import { ReviewStars } from "./review-stars";
import { GoogleMark } from "./google-mark";
import styles from "@/app/reviews/reviews.module.css";

export type GuestStory = {
  id: string;
  name: string;
  text: string;
  platform: "Google" | "Airbnb" | "Tripadvisor";
  detail: string;
  rating: number;
  photoUrl?: string;
  profileUrl?: string;
  reviewUrl?: string;
  color: string;
};

function ReviewCard({ review, featured }: { review: GuestStory; featured: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const limit = featured ? 330 : 370;
  const canExpand = review.text.length > limit;
  const excerpt = canExpand && !expanded ? `${review.text.slice(0, limit).replace(/\s+\S*$/, "")}…` : review.text;
  const author = <>
    <ReviewerAvatar name={review.name} photoUrl={review.photoUrl} color={review.color} size={48} />
    <span><span className={styles.reviewerName}>{review.name}</span><span className={styles.reviewDate}>{review.detail || "Guest review"}</span></span>
  </>;

  return (
    <article className={`${styles.reviewCard} ${featured ? styles.featuredCard : ""}`}>
      <div className={styles.reviewTop}>
        {review.profileUrl
          ? <a className={styles.reviewer} href={review.profileUrl} target="_blank" rel="noreferrer" aria-label={`${review.name}'s Google profile`}>{author}</a>
          : <div className={styles.reviewer}>{author}</div>}
        <span className={styles.quoteMark} aria-hidden="true">“</span>
      </div>
      <ReviewStars rating={review.rating} className={styles.stars} />
      <blockquote className={styles.reviewQuote}><p>{excerpt}</p></blockquote>
      {canExpand && <button className={styles.expandButton} type="button" aria-expanded={expanded} aria-label={`${expanded ? "Show less of" : "Read full review by"} ${review.name}`} onClick={() => setExpanded(!expanded)}>{expanded ? "Show less" : "Read full review"} <span aria-hidden="true">{expanded ? "−" : "+"}</span></button>}
      <div className={styles.reviewFoot}>
        <span className={styles.reviewPlatform}>
          {review.platform === "Google" && <GoogleMark size={16} />}
          {review.platform === "Airbnb" && <span className={styles.airbnbDot} aria-hidden="true" />}
          {review.platform === "Tripadvisor" && <span className={styles.tripadvisorDot} aria-hidden="true" />}
          {review.platform === "Google" ? "Google Maps" : review.platform}
        </span>
        {review.reviewUrl && <a href={review.reviewUrl} target="_blank" rel="noreferrer" className={styles.sourceLink} aria-label={`Read ${review.name}'s review on Google Maps`}>View review <span aria-hidden="true">↗</span></a>}
      </div>
    </article>
  );
}

export function ReviewCollection({ reviews }: { reviews: GuestStory[] }) {
  const [platform, setPlatform] = useState("All stays");
  const [visible, setVisible] = useState(5);
  const filtered = platform === "All stays" ? reviews : reviews.filter(r => r.platform === platform);
  const platforms = ["All stays", "Google", "Airbnb", "Tripadvisor"];
  return <>
    <div className={styles.filterRow}>
      <div className={styles.filters} role="group" aria-label="Filter reviews by platform">
        {platforms.map(label => {
          const count = label === "All stays" ? reviews.length : reviews.filter(r => r.platform === label).length;
          if (!count) return null;
          return <button key={label} type="button" aria-pressed={platform === label} className={`${styles.filter} ${platform === label ? styles.filterActive : ""}`} onClick={() => { setPlatform(label); setVisible(5); }}>{label}<span>{count}</span></button>;
        })}
      </div>
      <p className={styles.resultCount} role="status" aria-live="polite">{filtered.length} guest stories</p>
    </div>
    <div className={styles.reviewGrid}>
      {filtered.slice(0, visible).map((review, index) => <ReviewCard key={review.id} review={review} featured={index === 0} />)}
    </div>
    {visible < filtered.length && <div className={styles.moreWrap}><button className={styles.moreButton} type="button" onClick={() => setVisible(count => count + 6)}>More guest stories <span aria-hidden="true">↓</span></button><p>{Math.min(visible, filtered.length)} of {filtered.length} stories</p></div>}
  </>;
}
