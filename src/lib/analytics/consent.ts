export const CONSENT_KEY = "wmf-analytics-choice";
export const CONSENT_EVENT = "wmf-cookie-settings";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsChoice = "accepted" | "declined";

export function readAnalyticsChoice(value: string | null, now = Date.now()): AnalyticsChoice | null {
  try {
    const record = JSON.parse(value ?? "null");
    if ((record?.choice === "accepted" || record?.choice === "declined") &&
      Number.isFinite(record.savedAt) && record.savedAt <= now && now - record.savedAt < CONSENT_MAX_AGE) {
      return record.choice;
    }
  } catch { /* Invalid or old choices require a fresh decision. */ }
  return null;
}

export function isProductionHost(host: string) {
  return host === "woodlandsmanorfarm.co.uk" || host === "www.woodlandsmanorfarm.co.uk";
}
