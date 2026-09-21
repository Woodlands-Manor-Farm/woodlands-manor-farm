import assert from "node:assert/strict";
import test from "node:test";
import { getGoogleReviews, parseGoogleReviews, pickRecentFiveStar } from "../src/lib/google-reviews";

const place = { rating: 4.9, userRatingCount: 121 };

test("reviewer photos, profile links, source links and actual star ratings survive parsing", () => {
  const result = parseGoogleReviews({ places: [{ ...place, reviews: [{
    rating: 4, text: { text: "A lovely stay." }, publishTime: "2026-08-01T10:00:00Z",
    relativePublishTimeDescription: "a month ago",
    authorAttribution: { displayName: "Sample Guest", photoUri: "https://lh3.googleusercontent.com/a/example", uri: "https://www.google.com/maps/contrib/example" },
    googleMapsUri: "https://www.google.com/maps/reviews/example",
  }] }] });
  assert.equal(result?.count, 121);
  assert.equal(result?.reviews[0].rating, 4);
  assert.equal(result?.reviews[0].photoUrl, "https://lh3.googleusercontent.com/a/example");
  assert.equal(result?.reviews[0].profileUrl, "https://www.google.com/maps/contrib/example");
  assert.equal(result?.reviews[0].reviewUrl, "https://www.google.com/maps/reviews/example");
});

test("missing or invalid photos and profile URLs leave usable initial-based reviews", () => {
  const result = parseGoogleReviews({ places: [{ ...place, reviews: [
    { text: { text: "No photo provided" }, authorAttribution: { displayName: "Guest One" } },
    { rating: 5, text: { text: "Bad URLs" }, authorAttribution: { displayName: "Guest Two", photoUri: "javascript:alert(1)", uri: "https://user:password@example.com" }, googleMapsUri: "http://example.com" },
  ] }] });
  assert.equal(result?.reviews.length, 2);
  assert.equal(result?.reviews[0].initial, "G");
  assert.equal(result?.reviews[0].rating, 0);
  for (const review of result!.reviews) {
    assert.equal(review.photoUrl, undefined);
    assert.equal(review.profileUrl, undefined);
    assert.equal(review.reviewUrl, undefined);
  }
});

test("unavailable totals do not become invented ratings and reviews are sorted newest first", () => {
  assert.equal(parseGoogleReviews({ places: [{}] }), null);
  assert.equal(parseGoogleReviews({ places: [{ rating: 9, userRatingCount: 100 }] }), null);
  assert.equal(parseGoogleReviews({ places: [{ rating: 4.9, userRatingCount: -1 }] }), null);
  const result = parseGoogleReviews({ places: [{ ...place, reviews: [
    { rating: 5, text: { text: "Older" }, publishTime: "2025-02-01T12:00:00Z" },
    { rating: 4, text: { text: "Newer" }, publishTime: "2026-08-01T12:00:00Z" },
    { rating: 5, text: { text: "" } },
  ] }] });
  assert.deepEqual(result?.reviews.map(r => r.text), ["Newer", "Older"]);
});

test("homepage still selects only recent five-star reviews with their attribution", () => {
  const now = new Date().toISOString();
  const result = parseGoogleReviews({ places: [{ ...place, reviews: [
    { rating: 4, text: { text: "Recent four star" }, publishTime: now },
    { rating: 5, text: { text: "Recent five star" }, publishTime: now, authorAttribution: { photoUri: "https://lh3.googleusercontent.com/a/photo" } },
    { rating: 5, text: { text: "Old five star" }, publishTime: "2000-01-01T12:00:00Z" },
  ] }] });
  const picks = pickRecentFiveStar(result!.reviews);
  assert.equal(picks.length, 1);
  assert.equal(picks[0].text, "Recent five star");
  assert.equal(picks[0].photoUrl, "https://lh3.googleusercontent.com/a/photo");
});

test("local preview reads the public feed, rejects older payloads and never proxies in production", async (t) => {
  const variables = ["NODE_ENV", "GOOGLE_PLACES_API_KEY", "GOOGLE_REVIEWS_PREVIEW_ORIGIN"];
  const previous = Object.fromEntries(variables.map(key => [key, process.env[key]]));
  delete process.env.GOOGLE_PLACES_API_KEY;
  process.env.NODE_ENV = "development";
  process.env.GOOGLE_REVIEWS_PREVIEW_ORIGIN = "https://preview.example.com";
  const data = parseGoogleReviews({ places: [{ ...place, reviews: [{
    rating: 5, text: { text: "A real feed review" }, publishTime: new Date().toISOString(),
    authorAttribution: { displayName: "Guest", photoUri: "https://lh3.googleusercontent.com/a/photo" },
  }] }] });
  let payload: unknown = data;
  let requests = 0;
  t.mock.method(globalThis, "fetch", async (url: URL, options: RequestInit) => {
    requests++;
    assert.equal(url.href, "https://preview.example.com/api/reviews/?view=all");
    assert.equal(options.headers, undefined);
    return Response.json(payload);
  });
  try {
    assert.deepEqual(await getGoogleReviews(), data);
    payload = { reviews: [{ name: "Old feed guest", text: "An excerpt" }] };
    assert.equal(await getGoogleReviews(), null);
    process.env.NODE_ENV = "production";
    assert.equal(await getGoogleReviews(), null);
    assert.equal(requests, 2);
  } finally {
    for (const key of variables) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});
