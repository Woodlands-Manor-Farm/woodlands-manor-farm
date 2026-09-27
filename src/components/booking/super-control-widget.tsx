"use client";

import { useEffect } from "react";
import Script from "next/script";

// Per-property availability calendar (one calendar per property).
const PROPERTY_KEY =
  "661996875212C1D39EDFAE01874528537C1A215C461815466468E1920AD595D326C1E267BD2219DF7569AF521F04EA54C5409DF7353E04FD";

// Master calendar, shows all properties at once. Used on /book-direct/.
const MASTER_KEY =
  "661996875212C1D3429A2132A9D44A45327F14D14AB50EA9C6EA9C09D60C1A1A349B2BE2E7383C2B2ABA8DB5DA09DFB594636351FE10660A";

const SCRIPT_SRC = "https://secure.supercontrol.co.uk/components/embed.js";

type SuperControlWindow = Window & {
  superControlCalendarWidgetManualBootstrap?: () => void;
};

type Props = {
  /** SuperControl property ID, required for per-property embed. Omit for the master calendar. */
  propertyId?: string;
  className?: string;
};

export function SuperControlWidget({ propertyId, className }: Props) {
  const isMaster = !propertyId;

  // On client-side navigation between widget pages the <Script> is already
  // loaded and the embed's window.load handler has already run, so it set
  // `superControlCalendarWidgetManualBootstrap` on window. Call it on mount
  // to (re)scan the DOM for the newly-rendered widget div.
  useEffect(() => {
    const bootstrap = (window as SuperControlWindow).superControlCalendarWidgetManualBootstrap;
    if (typeof bootstrap === "function") bootstrap();
  }, [propertyId]);

  return (
    <>
      <div
        className={className}
        data-calendar-key={isMaster ? MASTER_KEY : PROPERTY_KEY}
        data-calendar-property-id={isMaster ? undefined : propertyId}
      >
        <p
          style={{
            padding: "32px 24px",
            textAlign: "center",
            color: "var(--color-text-light)",
            fontSize: 14,
            fontWeight: 300,
          }}
        >
          Loading availability calendar…
        </p>
      </div>
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        id="supercontrol-embed"
        onLoad={() => {
          // embed.js attaches a window.load listener that defines
          // `superControlCalendarWidgetManualBootstrap` and runs it. With
          // afterInteractive the natural load event has typically already
          // fired before the script executes, so the listener never runs.
          // Dispatch a synthetic load to fire it.
          window.dispatchEvent(new Event("load"));
        }}
      />
    </>
  );
}
