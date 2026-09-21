import Script from "next/script";
import { ANALYTICS } from "@/lib/constants/analytics";

/**
 * Google Analytics 4 (gtag.js). Renders nothing — and sets no cookies — until
 * `ANALYTICS.gaMeasurementId` is set (see lib/constants/analytics.ts).
 */
export function GoogleAnalytics() {
  const id = ANALYTICS.gaMeasurementId;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)});`}
      </Script>
    </>
  );
}
