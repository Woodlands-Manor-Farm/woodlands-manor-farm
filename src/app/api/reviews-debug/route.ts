import { getPlacesApiKey } from "@/lib/google-reviews";

// Temporary diagnostic for the live Google reviews feed. Returns no secrets.
export const dynamic = "force-dynamic";

export async function GET() {
  const key = await getPlacesApiKey();
  const info: Record<string, unknown> = {
    hasKey: !!key,
    keyLength: key ? key.length : 0,
  };

  if (!key) return Response.json(info);

  try {
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
    info.status = res.status;
    const json = (await res.json()) as {
      places?: Array<{
        displayName?: { text?: string };
        rating?: number;
        userRatingCount?: number;
        reviews?: unknown[];
      }>;
      error?: { message?: string; status?: string };
    };
    info.placesFound = json.places?.length ?? 0;
    info.firstPlace = json.places?.[0]?.displayName?.text ?? null;
    info.rating = json.places?.[0]?.rating ?? null;
    info.ratingCount = json.places?.[0]?.userRatingCount ?? null;
    info.reviewsReturned = json.places?.[0]?.reviews?.length ?? 0;
    if (json.error) info.googleError = `${json.error.status}: ${json.error.message}`;
  } catch (e) {
    info.exception = String(e);
  }

  return Response.json(info);
}
