import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keep search engines off the staging deployment. The workers.dev address is
 * a full copy of the site; if Google indexes it, it competes with the real
 * domain as duplicate content. The header is only added for workers.dev
 * hosts, so it lifts automatically when the custom domain goes live.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".workers.dev")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}
