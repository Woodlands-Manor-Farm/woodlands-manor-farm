# Google reviews

## Production

`GOOGLE_PLACES_API_KEY` is an encrypted Cloudflare Worker secret. The server
requests Google's rating, review count and selection of up to five reviews.
Responses are cached at the Cloudflare edge for 24 hours and refreshed on demand.
Google chooses the selection; the reviews page orders those reviews newest first.
The homepage selects up to three five-star reviews from the last six months.

Review cards use the real star rating, author photo, Google profile link and
individual review link supplied by Google. A missing or failed photo falls back
to initials. The existing Airbnb and Tripadvisor quotes are maintained manually
and use initials because we do not have their author photos.

If Google is unavailable, the page retains the curated guest quotes and a link
to Google Maps, without inventing an overall rating or review count.

## Local preview

Either set `GOOGLE_PLACES_API_KEY` in `.env.local`, or keep the key in Cloudflare
and set this instead:

```dotenv
GOOGLE_REVIEWS_PREVIEW_ORIGIN=https://woodlands-manor-farm.woodlands-manor-farm.workers.dev
```

The second option reads the deployed site's public `/api/reviews/?view=all`
feed. It requires this version to have been deployed and works only in
development when no local key is available. Production never uses the preview
proxy. No credentials are sent to the feed. Local environment files are ignored
by Git.
