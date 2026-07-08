// Temporary diagnostic for the live Google reviews feed. Returns no secret
// VALUES — only whether the key is bound and readable, plus env var NAMES.
export const dynamic = "force-dynamic";

export async function GET() {
  const info: Record<string, unknown> = {};

  info.processEnvHasKey = !!process.env.GOOGLE_PLACES_API_KEY;

  try {
    const mod = await import("@opennextjs/cloudflare");
    info.hasGetContext = typeof mod.getCloudflareContext === "function";
    const ctx = mod.getCloudflareContext?.();
    const env = (ctx?.env ?? undefined) as Record<string, unknown> | undefined;
    info.ctxEnvKeys = env ? Object.keys(env).slice(0, 60) : null;
    info.ctxHasKey = !!(env && env.GOOGLE_PLACES_API_KEY);
  } catch (e) {
    info.ctxError = String(e);
  }

  return Response.json(info);
}
