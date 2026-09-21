"use client";

import { CONSENT_EVENT } from "@/lib/analytics/consent";

export function CookieSettingsButton() {
  return <button type="button" className="hover:text-[var(--color-cream)]" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}>Cookie settings</button>;
}
