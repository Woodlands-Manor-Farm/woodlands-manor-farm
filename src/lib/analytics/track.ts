type MetaParams = Record<string, unknown>;
type FbqWindow = Window & { fbq?: (...args: unknown[]) => void };

/**
 * Fire a Meta Pixel standard event. No-op unless the Pixel has actually
 * loaded, which only happens on the production domain after the visitor has
 * accepted analytics cookies. Safe to call from anywhere.
 */
export function trackMeta(event: string, params?: MetaParams) {
  if (typeof window === "undefined") return;
  const fbq = (window as FbqWindow).fbq;
  if (typeof fbq === "function") fbq("track", event, params);
}
