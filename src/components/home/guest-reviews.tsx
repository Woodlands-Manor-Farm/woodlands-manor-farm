"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

export type HomeReview = {
  text: string;
  initials: string;
  name: string;
  unit: string;
};

// Renders the homepage "What guests are saying" cards. The server passes a
// curated set of recent 5-star reviews (also used as the static/SSR content
// and the no-JS fallback); after hydration we pull the latest 5-star reviews
// from the live Google feed and, if there are fewer than three, top up with
// the curated ones so there are always three recent cards.
export function GuestReviews({ fallback }: { fallback: HomeReview[] }) {
  const [reviews, setReviews] = useState<HomeReview[]>(fallback);

  useEffect(() => {
    let active = true;
    fetch("/api/reviews/")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { reviews?: HomeReview[] } | null) => {
        if (!active || !data?.reviews?.length) return;
        const merged = [...data.reviews];
        for (const f of fallback) {
          if (merged.length >= 3) break;
          if (!merged.some((r) => r.name === f.name && r.text === f.text)) merged.push(f);
        }
        setReviews(merged.slice(0, 3));
      })
      .catch(() => {
        /* keep the curated fallback on any error */
      });
    return () => {
      active = false;
    };
  }, [fallback]);

  return (
    <div className={styles.reviewsGrid}>
      {reviews.map((r) => (
        <div key={`${r.name}-${r.unit}`} className={styles.reviewCard}>
          <p className={styles.reviewText}>{r.text}</p>
          <div className={styles.reviewAuthor}>
            <div className={styles.reviewAvatar}>{r.initials}</div>
            <div>
              <div className={styles.reviewName}>{r.name}</div>
              <div className={styles.reviewUnit}>{r.unit}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
