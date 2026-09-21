"use client";

import { useState } from "react";
import { SITE } from "@/lib/constants/seo";
import styles from "./contact.module.css";

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json() as { status?: string; error?: string };
      if (!response.ok || result.status !== "accepted") {
        throw new Error(result.error || "We couldn’t confirm your message was sent. Please email or call us.");
      }
      setSubmitted(true);
    } catch (failure) {
      setError(failure instanceof Error && failure.name === "Error"
        ? failure.message : "We couldn’t confirm your message was sent. Please email or call us.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>Get in touch</p>
          <h1 className={styles.title}>
            Talk to <em>Andy &amp; Ruth</em>
          </h1>
          <p className={styles.subtitle}>
            We reply personally to every email. For urgent enquiries or group bookings, calling is
            usually quickest.
          </p>
        </div>
      </header>

      <section className={styles.layout}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Send us a message</h2>
          {submitted ? (
            <div className={styles.success}>
              <h3>Thank you for your message</h3>
              <p>
                Your message has been accepted for delivery to Andy and Ruth. If it&rsquo;s urgent, please call us
                on {SITE.contact.phoneDisplay}.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={styles.form}
            >
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" maxLength={120} autoComplete="name" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" maxLength={254} autoComplete="email" required />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone (optional)</label>
                  <input id="phone" name="phone" type="tel" maxLength={50} autoComplete="tel" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="topic">Enquiry about</label>
                  <select id="topic" name="topic" defaultValue="">
                    <option value="" disabled>
                      Choose…
                    </option>
                    <option>Booking enquiry</option>
                    <option>Group / exclusive use</option>
                    <option>Wedding or event</option>
                    <option>Existing booking</option>
                    <option>Press / partnership</option>
                    <option>Something else</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} maxLength={5000} required />
              </div>
              <button type="submit" className={styles.submit} disabled={sending}>
                {sending ? "Sending…" : "Send message"}
              </button>
              {error && <p role="alert">{error}</p>}
              <p className={styles.formNote}>
                Or email us directly at <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>.
              </p>
            </form>
          )}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <p className={styles.infoLabel}>Phone</p>
            <a href={`tel:${SITE.contact.phone}`} className={styles.infoLink}>
              {SITE.contact.phoneDisplay}
            </a>
            <p className={styles.infoMeta}>
              Best for urgent queries &amp; group bookings. Andy will pick up.
            </p>
          </div>
          <div className={styles.infoCard}>
            <p className={styles.infoLabel}>Email</p>
            <a href={`mailto:${SITE.contact.email}`} className={styles.infoLink}>
              {SITE.contact.email}
            </a>
            <p className={styles.infoMeta}>We reply personally to every email.</p>
          </div>
          <div className={styles.infoCard}>
            <p className={styles.infoLabel}>Address</p>
            <address className={styles.infoAddress}>
              Woodlands Manor Farm
              <br />
              {SITE.contact.address.street}, {SITE.contact.address.city}
              <br />
              {SITE.contact.address.region} {SITE.contact.address.postalCode}
            </address>
            <p className={styles.infoMeta}>2 miles to Duckpool Beach · 6 miles to Bude town</p>
          </div>
          <div className={styles.infoCard}>
            <p className={styles.infoLabel}>What3Words</p>
            <span className={styles.what3words}>{`///${SITE.contact.what3words}`}</span>
            <p className={styles.infoMeta}>
              Satnav can be unreliable in this area — use What3Words or the Google Maps link
              below for accurate directions.
            </p>
            <a
              href={SITE.contact.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.directionsLink}
            >
              Open in Google Maps →
            </a>
          </div>
        </aside>
      </section>

      <section className={styles.infoBand}>
        <div className={styles.infoBandInner}>
          <div>
            <p className={styles.eyebrow}>Visiting tips</p>
            <h2 className={styles.bandTitle}>
              Useful to know <em>before you arrive</em>
            </h2>
          </div>
          <ul className={styles.tipsList}>
            <li>
              <strong>Check-in</strong> from 4pm — check-out by 10am.
            </li>
            <li>
              <strong>Well-behaved dogs</strong> very welcome in all cottages and yurts.
            </li>
            <li>
              <strong>EV charging</strong> point available on site. Download the app shown on the charger and pay the stated price.
            </li>
            <li>
              <strong>Super-fast WiFi</strong> throughout the farm.
            </li>
            <li>
              <strong>Sainsbury&rsquo;s grocery delivery</strong> direct to your door is a popular
              option.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
