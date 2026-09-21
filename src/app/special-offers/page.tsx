import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/marketing/marketing.module.css";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { BOOK_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/seo";
import { TOTAL_GUEST_CAPACITY } from "@/lib/constants/properties";

type Offer = {
  key: string;
  label: string;
  title: string;
  save?: string;
  body: string;
  variant?: "lastMin" | "seasonal";
  cta: "notify" | "book" | "contact";
  note?: string;
};

const OFFERS: Offer[] = [
  {
    key: "lastmin",
    label: "When available",
    title: "Last-minute deals",
    save: "Late availability",
    body: "When we have late availability, we list the discount right here. Please check back regularly — or sign up below and we’ll email you the moment a deal goes live.",
    variant: "lastMin",
    cta: "notify",
  },
  {
    key: "season",
    label: "When available",
    title: "Out-of-season breaks",
    save: "Quiet midweek dates",
    body: "Off-peak offers on quieter midweek dates appear here whenever they’re on. Please check back regularly, or sign up below to be first to hear.",
    variant: "seasonal",
    cta: "notify",
  },
  {
    key: "returning",
    label: "Returning guests",
    title: "10% off your next stay",
    save: "10% off · book direct",
    body: "Stayed with us before? We’ll email you a personal 10% discount code when you leave, to use on your next direct booking. Lost your code? Just ask Andy.",
    cta: "book",
    note: "Personal code",
  },
  {
    key: "group",
    label: "Groups & whole-farm",
    title: "Take the whole farm",
    body: `Booking three or more properties — or the whole farm for up to ${TOTAL_GUEST_CAPACITY} guests? Contact Andy for a group discount tailored to your dates.`,
    cta: "contact",
  },
];

const WHY = [
  { icon: "💷", title: "Best price, direct", body: "Book direct for our best rate — no third-party mark-up or commission." },
  { icon: "🎟️", title: "No booking fees", body: "Zero booking or card fees. The price you see is the price you pay." },
  { icon: "🤝", title: "Straight to Andy & Ruth", body: "Deal directly with your hosts — not a call centre or agency." },
  { icon: "🗓️", title: "Flexible & personal", body: "Tailor dates, add extras or ask anything — just get in touch." },
];

export const metadata: Metadata = {
  title: "Special Offers",
  description:
    "Last-minute deals, out-of-season breaks, a returning-guest discount and group rates at Woodlands Manor Farm, Bude — all when you book direct.",
  alternates: { canonical: "/special-offers/" },
};

export default function Page() {
  return (
    <>
      <section className={styles.hero} style={{ height: "60vh", minHeight: 460 }}>
        <Image
          src="/images/home/cc82e0f15a7b2058.jpg"
          alt="Special offers at Woodlands Manor Farm"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 45%" }}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroSplit}>
          <div className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>Save when you book direct</p>
            <h1>
              Special <em>offers</em>
            </h1>
            <p>
              Our current deals live on this page — plus every direct booking gets our best rate,
              with no fees. New last-minute and seasonal offers are added here as they come up.
            </p>
          </div>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeLabel}>Book direct</span>
            <h3>Best price, guaranteed</h3>
            <p className={styles.heroBadgeNote}>
              No booking fees, no commission — and you’re dealing straight with Andy &amp; Ruth.
            </p>
            <Link href={BOOK_HREF} className={styles.btnPrimary}>
              Check availability
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.whyStrip}>
        {WHY.map((w) => (
          <div key={w.title} className={styles.whyItem}>
            <span className={styles.whyIcon} aria-hidden="true">
              {w.icon}
            </span>
            <div className={styles.whyTitle}>{w.title}</div>
            <p className={styles.whyBody}>{w.body}</p>
          </div>
        ))}
      </div>

      <section className={styles.section}>
        <p className={styles.eyebrow}>Currently available</p>
        <h2 className={styles.sectionTitle}>
          Offers that <em>fit your stay</em>
        </h2>
        <p className={styles.sectionLead}>
          Some of our deals come and go with the seasons and late availability — we list those here
          the moment they’re on, so it’s worth checking back. Others are always here for returning
          guests and groups.
        </p>

        <div className={`${styles.offerGrid} ${styles.offerGridTwo}`}>
          {OFFERS.map((o) => (
            <div
              key={o.key}
              className={`${styles.offerCard} ${
                o.variant === "lastMin"
                  ? styles.offerCardLastMin
                  : o.variant === "seasonal"
                    ? styles.offerCardSeasonal
                    : ""
              }`}
            >
              <div className={styles.offerLabel}>{o.label}</div>
              <div className={styles.offerTitle}>{o.title}</div>
              {o.save ? <div className={styles.offerSave}>{o.save}</div> : null}
              <p className={styles.offerBody}>{o.body}</p>

              {o.cta === "contact" ? (
                <div className={styles.offerFooterContact}>
                  <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>
                  <a href={`tel:${SITE.contact.phone}`}>Call Andy on {SITE.contact.phoneDisplay}</a>
                </div>
              ) : (
                <div className={styles.offerFooter}>
                  <span>{o.cta === "notify" ? "Added here when live" : o.note}</span>
                  {o.cta === "notify" ? (
                    <a href="#offers-signup" style={{ color: "var(--color-violet)", textDecoration: "none" }}>
                      Get notified →
                    </a>
                  ) : (
                    <Link href={BOOK_HREF} style={{ color: "var(--color-violet)", textDecoration: "none" }}>
                      Book →
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="offers-signup" className={`${styles.section} ${styles.sectionDark}`} style={{ maxWidth: "none" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gap: 40 }}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Be first to know</p>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
              Get our offers <em>before anyone else</em>
            </h2>
            <p className={`${styles.sectionLead} ${styles.sectionLeadLight}`} style={{ marginBottom: 0 }}>
              Last-minute and out-of-season deals go fast. Join our newsletter and we’ll email you
              the moment a new offer goes live — no spam, unsubscribe any time.
            </p>
          </div>
          <div style={{ maxWidth: 520 }}>
            <NewsletterForm variant="footer" />
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>
          Planning a <em>group stay?</em>
        </h2>
        <p>
          Call or email Andy for group bookings, exclusive-use enquiries or anything that
          doesn’t fit a standard offer.
        </p>
        <div className={styles.finalCtaButtons}>
          <Link href={BOOK_HREF} className={styles.btnWhite}>
            Check availability
          </Link>
          <a href={`tel:${SITE.contact.phone}`} className={styles.btnGhost}>
            Call {SITE.contact.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
