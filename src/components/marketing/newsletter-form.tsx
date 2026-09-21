"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { NEWSLETTER } from "@/lib/constants/newsletter";
import { SITE } from "@/lib/constants/seo";

type Status = "idle" | "sending" | "success" | "error";

export function NewsletterForm({
  variant,
  onSuccess,
}: {
  variant: "popup" | "footer";
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [marketing, setMarketing] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    if (!marketing) {
      setStatus("error");
      setMessage("Please tick the box to confirm you'd like to receive our emails.");
      return;
    }
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const response = await fetch(NEWSLETTER.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email") ?? "").trim(),
          website: form.get("website"),
          marketingConsent: marketing,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json() as { status?: string; error?: string };
      if (!response.ok || result.status !== "confirmation_required") {
        throw new Error(result.error || "We couldn’t request your confirmation email. Please try again later.");
      }
      setStatus("success");
      try {
        // This records a request, not confirmed list membership.
        localStorage.setItem("wmf-newsletter-requested", "1");
      } catch { /* Popup suppression is optional. */ }
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error && error.name === "Error"
        ? error.message
        : `Sorry, that didn't go through. Please try again, or email ${SITE.contact.email}.`);
    }
  }

  const popup = variant === "popup";

  if (status === "success") {
    return (
      <div
        role="status"
        className={clsx(
          "text-[14px] font-light leading-6",
          popup ? "text-[var(--color-text-mid)]" : "text-[rgba(247,243,238,0.85)]",
        )}
      >
        <p className={clsx("font-serif text-lg", popup ? "text-[var(--color-deep-green)]" : "text-[var(--color-cream)]")}>
          Check your inbox
        </p>
        <p className="mt-1.5">
          Click the link in your confirmation email to join the Woodlands Newsletter. You won&rsquo;t be added to the list until you confirm.
        </p>
      </div>
    );
  }

  const inputClasses = popup
    ? "w-full rounded border border-[rgba(30,36,34,0.18)] bg-[var(--color-white)] px-3.5 py-2.5 text-[14px] font-light text-[var(--color-text-dark)] outline-none transition-colors placeholder:text-[rgba(30,36,34,0.35)] focus:border-[var(--color-deep-green)]"
    : "w-full rounded border border-[rgba(247,243,238,0.2)] bg-transparent px-3.5 py-2.5 text-[14px] font-light text-[var(--color-cream)] outline-none transition-colors placeholder:text-[rgba(247,243,238,0.55)] focus:border-[var(--color-cream)]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Honeypot: hidden from people (and screen readers), tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${variant}-newsletter-website`}>Leave this field empty</label>
        <input
          id={`${variant}-newsletter-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <div className={clsx("flex flex-col gap-3", popup && "sm:flex-row")}>
        <label className="sr-only" htmlFor={`${variant}-newsletter-email`}>
          Email address
        </label>
        <input
          id={`${variant}-newsletter-email`}
          name="email"
          type="email"
          maxLength={254}
          required
          autoComplete="email"
          placeholder="Email address"
          className={inputClasses}
        />
      </div>
      <label
        className={clsx(
          "flex cursor-pointer items-start gap-2.5 text-[13px] font-light leading-5",
          popup ? "text-[var(--color-text-mid)]" : "text-[rgba(247,243,238,0.85)]",
        )}
      >
        <input
          type="checkbox"
          name="marketingConsent"
          required
          checked={marketing}
          onChange={(e) => {
            setMarketing(e.target.checked);
            if (status === "error") setStatus("idle");
          }}
          className={clsx(
            "mt-0.5 h-4 w-4 shrink-0",
            popup ? "accent-[var(--color-deep-green)]" : "accent-[var(--color-violet)]",
          )}
        />
        <span>I&rsquo;d like to receive occasional emails about offers and news</span>
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className={clsx(
          "rounded px-5 py-2.5 text-[11px] font-normal uppercase tracking-[0.25em] transition-colors disabled:opacity-60",
          popup
            ? "bg-[var(--color-deep-green)] text-[var(--color-cream)] hover:bg-[#3d564c]"
            : "border border-[rgba(247,243,238,0.3)] text-[var(--color-cream)] hover:border-[var(--color-cream)] hover:bg-[rgba(247,243,238,0.08)]",
        )}
      >
        {status === "sending" ? "Signing up…" : "Sign me up"}
      </button>
      {status === "error" && (
        <p role="alert" className={clsx("text-[13px] font-light", popup ? "text-[#a04545]" : "text-[#e8b4b4]")}>
          {message}
        </p>
      )}
      <p
        className={clsx(
          "text-[11px] font-light leading-5",
          popup ? "text-[var(--color-text-light)]" : "text-[rgba(247,243,238,0.85)]",
        )}
      >
        No spam, ever — just offers and farm news about once a month. Unsubscribe any time. See our{" "}
        <Link href="/privacy/" className="underline hover:no-underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
