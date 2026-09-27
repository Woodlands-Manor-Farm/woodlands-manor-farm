"use client";

import { useEffect } from "react";
import { BOOK_HREF } from "@/lib/constants/nav";
import { trackMeta } from "@/lib/analytics/track";

/**
 * Fires Meta Pixel conversion events from real user actions, via a single
 * delegated click listener (no need to touch every button):
 *   - Booking CTAs (Check Availability / Book Direct, and #book anchors) -> InitiateCheckout
 *   - Phone (tel:) and email (mailto:) links -> Contact
 * Form submissions fire "Lead" / "Subscribe" from the form components themselves.
 * All events no-op until the Pixel has loaded (i.e. after cookie consent).
 */
export function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        trackMeta("Contact", { method: "phone" });
      } else if (href.startsWith("mailto:")) {
        trackMeta("Contact", { method: "email" });
      } else if (href === BOOK_HREF || href.startsWith("#book")) {
        trackMeta("InitiateCheckout", { content_name: "Check availability" });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
