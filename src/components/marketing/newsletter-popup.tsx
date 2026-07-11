"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { NEWSLETTER } from "@/lib/constants/newsletter";
import { NewsletterForm } from "./newsletter-form";

const DISMISSED_KEY = "wmf-newsletter-dismissed-at";
const SUBSCRIBED_KEY = "wmf-newsletter-subscribed";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  // Toggled one frame after mount so the CSS transition plays.
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("newsletter") === "preview";
    if (!NEWSLETTER.formActionUrl && !preview) return;

    if (!preview) {
      try {
        if (localStorage.getItem(SUBSCRIBED_KEY)) return;
        const dismissedAt = Number(localStorage.getItem(DISMISSED_KEY) ?? 0);
        const cooldownMs = NEWSLETTER.dismissCooldownDays * 24 * 60 * 60 * 1000;
        if (Date.now() - dismissedAt < cooldownMs) return;
      } catch {
        // localStorage unavailable — fall through and show the popup.
      }
    }

    const timer = setTimeout(() => setOpen(true), preview ? 500 : NEWSLETTER.popupDelayMs);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    dialogRef.current?.focus();
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const dismiss = useCallback(() => {
    setOpen(false);
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {
      // Private browsing — the popup may reappear next visit, which is fine.
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[500] flex items-center justify-center bg-[rgba(5,12,8,0.55)] p-5 backdrop-blur-sm transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
      )}
      onClick={dismiss}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "relative grid w-full max-w-xl overflow-hidden rounded-lg bg-[var(--color-cream)] shadow-2xl outline-none transition-all duration-500 md:max-w-3xl md:grid-cols-[1fr_1.2fr]",
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close signup popup"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(247,243,238,0.85)] text-lg leading-none text-[var(--color-text-mid)] transition-colors hover:bg-[var(--color-white)] hover:text-[var(--color-text-dark)]"
        >
          ×
        </button>

        <div className="relative hidden min-h-[360px] md:block">
          <Image
            src="/images/cottages/9792dd1b5f66d139.jpg"
            alt="Holiday cottages at Woodlands Manor Farm"
            fill
            sizes="(min-width: 768px) 320px, 0px"
            className="object-cover"
          />
        </div>

        <div className="px-7 py-9 md:px-9">
          <p className="eyebrow mb-3">Last-minute escapes</p>
          <h2
            id="newsletter-popup-title"
            className="mb-3 font-serif text-[26px] leading-tight text-[var(--color-deep-green)] md:text-3xl"
          >
            Be first to hear about <em className="italic">last-minute offers</em>
          </h2>
          <p className="mb-6 text-[14px] font-light leading-6 text-[var(--color-text-mid)]">
            Join our list for late-availability deals and a short monthly newsletter with news
            from the farm — new arrivals in the animal barn, what&rsquo;s on in Bude, and the
            odd special offer just for subscribers.
          </p>
          <NewsletterForm variant="popup" onSuccess={() => setTimeout(dismiss, 3500)} />
        </div>
      </div>
    </div>
  );
}
