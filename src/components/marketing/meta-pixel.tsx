"use client";

import { useEffect } from "react";
import { ANALYTICS } from "@/lib/constants/analytics";
import {
  CONSENT_CHANGED,
  CONSENT_KEY,
  isProductionHost,
  readAnalyticsChoice,
  type AnalyticsChoice,
} from "@/lib/analytics/consent";

const SCRIPT_ID = "wmf-meta-pixel";

type FbqWindow = Window & {
  fbq?: ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue?: unknown[];
    loaded?: boolean;
    version?: string;
    push?: unknown;
  };
  _fbq?: unknown;
};

function clearMetaCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, ".woodlandsmanorfarm.co.uk"];
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.trim().split("=")[0];
    if (name === "_fbp" || name === "_fbc") {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
      });
    }
  });
}

function applyChoice(choice: AnalyticsChoice | null) {
  const id = ANALYTICS.metaPixelId;
  const w = window as FbqWindow;
  const allowed = choice === "accepted" && isProductionHost(window.location.hostname);

  if (!allowed || !id) {
    document.getElementById(SCRIPT_ID)?.remove();
    clearMetaCookies();
    return;
  }
  if (document.getElementById(SCRIPT_ID)) return;

  // Standard Meta Pixel bootstrap — only runs once the visitor has accepted.
  if (!w.fbq) {
    const n: FbqWindow["fbq"] = function (...args: unknown[]) {
      if (n!.callMethod) {
        n!.callMethod(...args);
      } else {
        n!.queue!.push(args);
      }
    } as FbqWindow["fbq"];
    n!.push = n;
    n!.loaded = true;
    n!.version = "2.0";
    n!.queue = [];
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  w.fbq!("init", id);
  w.fbq!("track", "PageView");
}

/**
 * Meta (Facebook) Pixel, gated on the same cookie-consent choice as Google
 * Analytics. Renders nothing — the consent banner lives in the GoogleAnalytics
 * component; this simply loads or unloads the Pixel to match the choice.
 */
export function MetaPixel() {
  useEffect(() => {
    const update = () => {
      let choice: AnalyticsChoice | null = null;
      try {
        choice = readAnalyticsChoice(localStorage.getItem(CONSENT_KEY));
      } catch {
        /* No stored choice yet — treat as not accepted. */
      }
      applyChoice(choice);
    };

    update();

    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) update();
    };
    window.addEventListener(CONSENT_CHANGED, update);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CONSENT_CHANGED, update);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
