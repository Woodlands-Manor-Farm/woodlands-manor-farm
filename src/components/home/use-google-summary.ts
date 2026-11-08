"use client";

import { useEffect, useState } from "react";

// Single source of truth for the Google rating + review count shown across the
// home page (hero banner and trust bar). It reads the same live feed the
// reviews page uses (/api/reviews/?view=all, edge-cached for 24h), so every
// visible number matches Google and climbs automatically as reviews come in.
// The fallback keeps a sensible figure if the feed is briefly unavailable.
export type GoogleSummary = { rating: number; count: number };

const FALLBACK: GoogleSummary = { rating: 4.9, count: 122 };

// Module-level cache so the hero and trust bar share one request per page load.
let cached: GoogleSummary | null = null;
let inflight: Promise<GoogleSummary | null> | null = null;

function load(): Promise<GoogleSummary | null> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetch("/api/reviews/?view=all")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { rating?: number; count?: number } | null) => {
        if (data && typeof data.rating === "number" && data.rating >= 1 && data.rating <= 5 &&
          typeof data.count === "number" && Number.isInteger(data.count) && data.count > 0) {
          cached = { rating: data.rating, count: data.count };
          return cached;
        }
        return null;
      })
      .catch(() => null)
      .finally(() => { inflight = null; });
  }
  return inflight;
}

export function useGoogleSummary(): GoogleSummary {
  const [summary, setSummary] = useState<GoogleSummary>(cached ?? FALLBACK);
  useEffect(() => {
    let active = true;
    load().then((data) => { if (active && data) setSummary(data); });
    return () => { active = false; };
  }, []);
  return summary;
}
