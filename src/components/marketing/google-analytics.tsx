"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ANALYTICS } from "@/lib/constants/analytics";
import { CONSENT_EVENT, CONSENT_KEY, isProductionHost, readAnalyticsChoice, type AnalyticsChoice } from "@/lib/analytics/consent";

const SCRIPT_ID = "wmf-google-analytics";
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, ".woodlandsmanorfarm.co.uk"];
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.trim().split("=")[0];
    if (name === "_ga" || name.startsWith("_ga_")) {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
      });
    }
  });
}

function applyChoice(choice: AnalyticsChoice | null) {
  const id = ANALYTICS.gaMeasurementId;
  const analyticsWindow = window as AnalyticsWindow;
  const allowed = choice === "accepted" && isProductionHost(window.location.hostname);
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = !allowed;
  if (!allowed) {
    analyticsWindow.gtag?.("consent", "update", { analytics_storage: "denied" });
    document.getElementById(SCRIPT_ID)?.remove();
    clearAnalyticsCookies();
    return;
  }
  if (!id || document.getElementById(SCRIPT_ID)) return;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  // gtag expects an Arguments object in dataLayer (Google’s command format).
  // eslint-disable-next-line prefer-rest-params
  analyticsWindow.gtag = function () { analyticsWindow.dataLayer!.push(arguments); };
  const gtag = analyticsWindow.gtag;
  gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
  });
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  gtag("config", id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: `${window.location.origin}${window.location.pathname}`,
  });
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

export function GoogleAnalytics() {
  const [open, setOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let choice: AnalyticsChoice | null = null;
    try { choice = readAnalyticsChoice(localStorage.getItem(CONSENT_KEY)); } catch { /* Ask for this visit. */ }
    applyChoice(choice);
    setOpen(!choice);
    const reopen = () => {
      setOpen(true);
      requestAnimationFrame(() => heading.current?.focus());
    };
    const sync = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY && event.key !== null) return;
      const next = readAnalyticsChoice(event.newValue);
      applyChoice(next);
      setOpen(!next);
    };
    window.addEventListener(CONSENT_EVENT, reopen);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, reopen);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function choose(choice: AnalyticsChoice) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, savedAt: Date.now() })); } catch { /* Choice still applies for this visit. */ }
    applyChoice(choice);
    setOpen(false);
  }

  if (!open) return null;
  return (
    <section aria-labelledby="cookie-choice-title" className="fixed bottom-4 right-4 z-[600] w-[calc(100%-2rem)] max-w-md rounded-lg border border-[var(--color-deep-green)] bg-[var(--color-cream)] p-5 text-[var(--color-text-dark)] shadow-xl">
      <h2 id="cookie-choice-title" ref={heading} tabIndex={-1} className="font-serif text-xl outline-none">Your cookie choices</h2>
      <p className="my-3 text-sm leading-6">May we use Google Analytics cookies to understand how our website is used? You can change your choice in Cookie settings at any time.</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("accepted")} className="rounded border border-[var(--color-deep-green)] px-4 py-2 text-sm hover:bg-white">Accept analytics</button>
        <button type="button" onClick={() => choose("declined")} className="rounded border border-[var(--color-deep-green)] px-4 py-2 text-sm hover:bg-white">Necessary only</button>
      </div>
      <Link href="/privacy/" className="mt-3 inline-block text-sm underline">Privacy policy</Link>
    </section>
  );
}
