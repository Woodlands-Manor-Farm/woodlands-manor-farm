// Live Google reviews via the Places API (New), fetched server-side.
// The response is cached at Cloudflare's edge for 24h (Workers Cache API)
// and refreshed on demand. Every failure path returns null so the page falls back to
// curated content and never breaks.

export type GoogleReview = {
  name: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
  initial: string;
  color: string;
  photoUrl?: string;
  profileUrl?: string;
  reviewUrl?: string;
};

export type GoogleData = {
  rating: number;
  count: number;
  reviews: GoogleReview[];
};

const PALETTE = ["#c1440e", "#1a8a8a", "#3d1f5c", "#2a6b4f", "#7a4fa0", "#1f5c7a"];

function colorFor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

type PlacesJson = {
  places?: Array<{
    rating?: number;
    userRatingCount?: number;
    reviews?: Array<{
      rating?: number;
      text?: { text?: string };
      originalText?: { text?: string };
      relativePublishTimeDescription?: string;
      publishTime?: string;
      googleMapsUri?: string;
      authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
    }>;
  }>;
};

function httpsUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

export function parseGoogleReviews(json: PlacesJson): GoogleData | null {
  const place = json.places?.[0];
  if (!place || !Number.isFinite(place.rating) || place.rating! < 1 || place.rating! > 5 ||
    !Number.isSafeInteger(place.userRatingCount) || place.userRatingCount! < 0) return null;
  const reviews: GoogleReview[] = (place.reviews ?? []).map((r) => {
    const name = r.authorAttribution?.displayName?.trim() || "Google guest";
    return {
      name,
      rating: Number.isFinite(r.rating) && r.rating! >= 1 && r.rating! <= 5 ? r.rating! : 0,
      text: r.text?.text ?? r.originalText?.text ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
      publishTime: r.publishTime ?? "",
      initial: name.charAt(0).toUpperCase(),
      color: colorFor(name),
      photoUrl: httpsUrl(r.authorAttribution?.photoUri),
      profileUrl: httpsUrl(r.authorAttribution?.uri),
      reviewUrl: httpsUrl(r.googleMapsUri),
    };
  })
    .filter((r) => r.text.length > 0)
    // Newest first — Google returns reviews ranked by relevance, not date,
    // so an older review can otherwise surface at the top of the grid.
    .sort((a, b) => (b.publishTime > a.publishTime ? 1 : b.publishTime < a.publishTime ? -1 : 0));

  return {
    rating: place.rating!,
    count: place.userRatingCount!,
    reviews,
  };
}

// Pick genuine 5-star reviews published within the last `months`, newest
// first. Reviews without a parseable publishTime are excluded so a stale
// cached payload (from before publishTime was requested) can't leak in.
export function pickRecentFiveStar(
  reviews: GoogleReview[],
  { months = 6, limit = 3 }: { months?: number; limit?: number } = {},
): GoogleReview[] {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  return reviews
    .filter((r) => r.rating === 5)
    .filter((r) => {
      const t = Date.parse(r.publishTime);
      return !Number.isNaN(t) && t >= cutoff.getTime();
    })
    .sort((a, b) => (b.publishTime > a.publishTime ? 1 : b.publishTime < a.publishTime ? -1 : 0))
    .slice(0, limit);
}

export async function getPlacesApiKey(): Promise<string | undefined> {
  // On OpenNext/Cloudflare the secret is on the Worker env, which isn't
  // always mirrored to process.env during RSC rendering — read it from the
  // Cloudflare context first, then fall back to process.env.
  // Match on a trimmed key name so a stray space in the Cloudflare secret
  // name (e.g. "GOOGLE_PLACES_API_KEY ") still resolves.
  const pick = (env: Record<string, unknown> | undefined): string | undefined => {
    if (!env) return undefined;
    for (const [k, v] of Object.entries(env)) {
      if (k.trim() === "GOOGLE_PLACES_API_KEY" && typeof v === "string" && v) return v;
    }
    return undefined;
  };

  try {
    const mod = await import("@opennextjs/cloudflare");
    const env = mod.getCloudflareContext?.()?.env as Record<string, unknown> | undefined;
    const fromCtx = pick(env);
    if (fromCtx) return fromCtx;
  } catch {
    // fall through to process.env
  }
  return pick(process.env as Record<string, unknown>);
}

export async function getGoogleReviews(): Promise<GoogleData | null> {
  const key = await getPlacesApiKey();
  if (!key) {
    // Local development can use the deployed site's public feed, keeping the
    // Google API key in Cloudflare. Never proxy in production (or back to self).
    const origin = process.env.GOOGLE_REVIEWS_PREVIEW_ORIGIN;
    if (process.env.NODE_ENV !== "development" || !origin) return null;
    try {
      const base = new URL(origin);
      if (base.protocol !== "https:" || base.username || base.password) return null;
      const url = new URL("/api/reviews/?view=all", base);
      const res = await fetch(url, { signal: AbortSignal.timeout(8000), next: { revalidate: 300 } });
      if (!res.ok) return null;
      const data = await res.json() as GoogleData;
      if (!Array.isArray(data.reviews)) return null;
      return parseGoogleReviews({ places: [{
        rating: data.rating, userRatingCount: data.count,
        reviews: data.reviews.map(r => ({
          rating: r.rating, text: { text: r.text }, publishTime: r.publishTime,
          relativePublishTimeDescription: r.relativeTime, googleMapsUri: r.reviewUrl,
          authorAttribution: { displayName: r.name, photoUri: r.photoUrl, uri: r.profileUrl },
        })),
      }] });
    } catch {
      return null;
    }
  }

  const cacheKey = new Request("https://cache.internal/google-reviews-v2-author-photos");
  // Cloudflare Workers edge cache (available at runtime on workerd).
  const edge = (globalThis as unknown as { caches?: { default?: Cache } }).caches?.default;

  try {
    if (edge) {
      const hit = await edge.match(cacheKey);
      if (hit) return parseGoogleReviews((await hit.json()) as PlacesJson);
    }

    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "places.displayName,places.rating,places.userRatingCount,places.reviews.rating,places.reviews.text,places.reviews.originalText,places.reviews.relativePublishTimeDescription,places.reviews.publishTime,places.reviews.authorAttribution,places.reviews.googleMapsUri",
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        textQuery: "Woodlands Manor Farm, Woodford, Bude, Cornwall",
        languageCode: "en",
      }),
    });
    if (!res.ok) return null;

    const json = (await res.json()) as PlacesJson;
    if (edge) {
      await edge.put(
        cacheKey,
        new Response(JSON.stringify(json), {
          headers: { "Content-Type": "application/json", "Cache-Control": "s-maxage=86400" },
        }),
      );
    }
    return parseGoogleReviews(json);
  } catch {
    return null;
  }
}
