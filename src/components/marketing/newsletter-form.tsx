"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { NEWSLETTER } from "@/lib/constants/newsletter";
import { SITE } from "@/lib/constants/seo";

type Status = "idle" | "sending" | "success" | "error";

type MailchimpResponse = { result: string; msg: string };

/** Subscribe via Mailchimp's JSONP endpoint so the visitor never leaves the page. */
function subscribeMailchimp(actionUrl: string, params: URLSearchParams) {
  return new Promise<MailchimpResponse>((resolve, reject) => {
    const cbName = `__mcJsonp${Date.now()}`;
    const w = window as unknown as Record<string, ((data: MailchimpResponse) => void) | undefined>;
    const script = document.createElement("script");
    const cleanup = () => {
      delete w[cbName];
      script.remove();
    };
    w[cbName] = (data) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("Mailchimp request failed"));
    };
    const url = new URL(actionUrl.replace("/subscribe/post?", "/subscribe/post-json?"));
    params.set("c", cbName);
    params.forEach((value, key) => url.searchParams.set(key, value));
    script.src = url.toString();
    document.body.appendChild(script);
  });
}

/**
 * Subscribe via a cross-origin form POST (Brevo and most other providers).
 * The response is opaque under `no-cors`, so a resolved fetch is treated as
 * success — the provider sends its own confirmation email either way.
 */
async function subscribeGeneric(actionUrl: string, params: URLSearchParams) {
  await fetch(actionUrl, { method: "POST", mode: "no-cors", body: params });
}

export function NewsletterForm({
  variant,
  onSuccess,
}: {
  variant: "popup" | "footer";
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value.trim();
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement).value;

    // Humans never see the honeypot field; a filled value means a spam bot.
    // Show the success state so the bot moves on, but send nothing.
    if (honeypot) {
      setStatus("success");
      return;
    }

    // Field names for both providers: Mailchimp reads EMAIL/FNAME,
    // Brevo reads EMAIL/FIRSTNAME; each ignores the other's extras.
    // email_address_check is Brevo's honeypot — must be sent empty.
    const params = new URLSearchParams({
      EMAIL: email,
      FNAME: firstName,
      FIRSTNAME: firstName,
      email,
      email_address_check: "",
      locale: "en",
    });

    setStatus("sending");
    try {
      const actionUrl = NEWSLETTER.formActionUrl;
      if (!actionUrl) {
        // Preview mode (no form URL configured yet) — pretend it worked.
        await new Promise((r) => setTimeout(r, 600));
      } else if (actionUrl.includes("list-manage.com")) {
        const res = await subscribeMailchimp(actionUrl, params);
        if (res.result !== "success") {
          const alreadySubscribed = /already subscribed|is already/i.test(res.msg);
          if (!alreadySubscribed) throw new Error(res.msg);
        }
      } else {
        await subscribeGeneric(actionUrl, params);
      }
      setStatus("success");
      try {
        localStorage.setItem("wmf-newsletter-subscribed", "1");
      } catch {
        // Private browsing — popup suppression just won't persist.
      }
      onSuccess?.();
    } catch {
      setStatus("error");
      setMessage(
        `Sorry, that didn't go through. Please try again, or email us at ${SITE.contact.email}.`,
      );
    }
  }

  const popup = variant === "popup";

  if (status === "success") {
    return (
      <div
        role="status"
        className={clsx(
          "text-[14px] font-light leading-6",
          popup ? "text-[var(--color-text-mid)]" : "text-[rgba(247,243,238,0.7)]",
        )}
      >
        <p className={clsx("font-serif text-lg", popup ? "text-[var(--color-deep-green)]" : "text-[var(--color-cream)]")}>
          Lovely — you&rsquo;re on the list.
        </p>
        <p className="mt-1.5">
          Keep an eye out for a confirmation email so we know we&rsquo;ve got the right address.
        </p>
      </div>
    );
  }

  const inputClasses = popup
    ? "w-full rounded border border-[rgba(30,36,34,0.18)] bg-[var(--color-white)] px-3.5 py-2.5 text-[14px] font-light text-[var(--color-text-dark)] outline-none transition-colors placeholder:text-[rgba(30,36,34,0.35)] focus:border-[var(--color-deep-green)]"
    : "w-full rounded border border-[rgba(247,243,238,0.2)] bg-transparent px-3.5 py-2.5 text-[14px] font-light text-[var(--color-cream)] outline-none transition-colors placeholder:text-[rgba(247,243,238,0.35)] focus:border-[var(--color-cream)]";

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
        <label className="sr-only" htmlFor={`${variant}-newsletter-name`}>
          First name
        </label>
        <input
          id={`${variant}-newsletter-name`}
          name="firstName"
          autoComplete="given-name"
          placeholder="First name"
          className={inputClasses}
        />
        <label className="sr-only" htmlFor={`${variant}-newsletter-email`}>
          Email address
        </label>
        <input
          id={`${variant}-newsletter-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className={inputClasses}
        />
      </div>
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
          popup ? "text-[var(--color-text-light)]" : "text-[rgba(247,243,238,0.35)]",
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
