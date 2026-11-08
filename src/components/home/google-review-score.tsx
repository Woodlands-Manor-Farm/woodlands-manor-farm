"use client";

import { useGoogleSummary } from "@/components/home/use-google-summary";

// Trust-bar score, e.g. "4.9 · 122 reviews", read from the live Google feed so
// it always matches the reviews page and the hero banner.
export function GoogleReviewScore({ className }: { className?: string }) {
  const { rating, count } = useGoogleSummary();
  return <span className={className}>{rating.toFixed(1)} · {count} reviews</span>;
}
