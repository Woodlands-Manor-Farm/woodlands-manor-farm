import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keep search engines off the staging deployment. The workers.dev address is
 * a full copy of the site; if Google indexes it, it competes with the real
 * domain as duplicate content. The header is only added for workers.dev
 * hosts, so it lifts automatically when the custom domain goes live.
 */
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "");
  if (path === "/win-a-weekend-at-woodlands-manor-farm" || path === "/competition") {
    return new NextResponse(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Competition closed — Woodlands Manor Farm</title></head><body style="margin:0;background:#f7f3ee;color:#2d4338;font:18px/1.7 system-ui"><main style="max-width:640px;margin:12vh auto;padding:24px"><h1>This competition has closed</h1><p>Entries are no longer being accepted. Thank you for your interest in Woodlands Manor Farm.</p><p><a href="/special-offers/">See our current offers</a> or <a href="/">visit the homepage</a>.</p></main></body></html>`, {
      status: 410,
      headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, follow" },
    });
  }
  const response = NextResponse.next();
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".workers.dev")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}
