// Live Google reviews via the Places API (New), fetched server-side.
// The response is cached at Cloudflare's edge for 24h (Workers Cache API)
// so Google is called at most about once a day per location — well inside
// the free tier. Every failure path returns null so the page falls back to
// curated content and never breaks.

export type GoogleReview = {
  name: string;
  rating: number;
  text: string;
  relativeTime: string;
  initial: string;
  color: string;
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
      authorAttribution?: { displayName?: string };
    }>;
  }>;
};

function parse(json: PlacesJson): GoogleData | null {
  const place = json.places?.[0];
  if (!place) return null;
  const reviews: GoogleReview[] = (place.reviews ?? []).map((r) => {
    const name = r.authorAttribution?.displayName?.trim() || "Google guest";
    return {
      name,
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
      initial: name.charAt(0).toUpperCase(),
      color: colorFor(name),
    };
  }).filter((r) => r.text.length > 0);

  return {
    rating: place.rating ?? 4.9,
    count: place.userRatingCount ?? 116,
    reviews,
  };
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
  if (!key) return null;

  const cacheKey = new Request("https://cache.internal/google-reviews-v1");
  // Cloudflare Workers edge cache (available at runtime on workerd).
  const edge = (globalThis as unknown as { caches?: { default?: Cache } }).caches?.default;

  try {
    if (edge) {
      const hit = await edge.match(cacheKey);
      if (hit) return parse((await hit.json()) as PlacesJson);
    }

    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "places.displayName,places.rating,places.userRatingCount,places.reviews",
      },
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
    return parse(json);
  } catch {
    return null;
  }
}
