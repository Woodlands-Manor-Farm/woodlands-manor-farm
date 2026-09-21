import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants/seo";
import { getGoogleReviews, pickRecentFiveStar } from "@/lib/google-reviews";

// Recent 5-star Google reviews for the homepage "What guests are saying"
// widget. The underlying Google fetch is edge-cached for 24h, so this stays
// cheap; the response itself is cached at the edge for a day too.
export const dynamic = "force-dynamic";

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "G";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function monthYear(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function tidy(text: string): string {
  if (text.length <= 320) return text;
  return `${text.slice(0, 300).replace(/\s+\S*$/, "")}…`;
}

export async function GET(request: Request) {
  const data = await getGoogleReviews();
  // The complete public selection powers local previews without sharing the
  // server's API key. The default response stays small for the homepage widget.
  if (new URL(request.url).searchParams.get("view") === "all") {
    return NextResponse.json(data, {
      status: data ? 200 : 503,
      headers: { "Cache-Control": data ? "public, max-age=300, s-maxage=86400" : "no-store" },
    });
  }
  const picks = data ? pickRecentFiveStar(data.reviews, { months: 6, limit: 3 }) : [];
  const reviews = picks.map((r) => {
    const my = monthYear(r.publishTime);
    return {
      text: tidy(r.text),
      initials: initialsFor(r.name),
      name: r.name,
      unit: my ? `Google Maps · ${my}` : "Google Maps",
      photoUrl: r.photoUrl,
      profileUrl: r.profileUrl,
      reviewUrl: r.reviewUrl || r.profileUrl || SITE.contact.googleMapsUrl,
      color: r.color,
    };
  });
  return NextResponse.json(
    { reviews },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=86400" } },
  );
}
