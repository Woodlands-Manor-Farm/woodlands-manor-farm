import type { CSSProperties } from "react";

export function ReviewStars({ rating, className }: { rating: number; className?: string }) {
  if (!rating) return null;
  return <span className={className} role="img" aria-label={`${rating} out of 5 stars`} style={{ display: "inline-flex", gap: 3 }}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} aria-hidden="true" style={{ display: "inline-block", position: "relative", color: "#c4c8bf", lineHeight: 1 }}>
        ★<span style={{ position: "absolute", inset: 0, width: `${Math.min(1, Math.max(0, rating - i)) * 100}%`, overflow: "hidden", color: "var(--review-star-color, #947029)" } as CSSProperties}>★</span>
      </span>
    ))}
  </span>;
}
