/**
 * Analytics configuration.
 *
 * Google Analytics 4: paste your Measurement ID (looks like "G-XXXXXXXXXX")
 * from Google Analytics → Admin → Data streams → your web stream. Until it is
 * set, no Google Analytics script loads and no GA cookies are set. With an ID,
 * it loads only on the production domain after the visitor accepts analytics.
 *
 * Cloudflare Web Analytics is enabled in the Cloudflare dashboard (server-side,
 * cookieless) and needs no configuration here.
 */
export const ANALYTICS: { gaMeasurementId: string } = {
  gaMeasurementId: "G-0ZPYCREFWT",
};
