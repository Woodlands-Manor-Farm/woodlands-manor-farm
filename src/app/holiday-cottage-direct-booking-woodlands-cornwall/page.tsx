import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/marketing/marketing.module.css";
import { SuperControlWidget } from "@/components/booking/super-control-widget";
import { PROPERTIES } from "@/lib/constants/properties";
import { SITE } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: "Book Direct — Best Price Guaranteed",
  description:
    "Book a holiday cottage or yurt direct with Woodlands Manor Farm — no booking fees, best price guaranteed, talk to Andy & Ruth direct.",
  alternates: { canonical: "/holiday-cottage-direct-booking-woodlands-cornwall/" },
};

const WHY_REASONS = [
  {
    icon: "🏷️",
    title: "Best price guaranteed",
    body: "We never charge more on our own site than on any third-party platform. Book here and you always get the lowest rate.",
  },
  {
    icon: "💰",
    title: "Zero booking fees",
    body: "No service charge, no credit card surcharge, no platform commission. What you see is what you pay.",
  },
  {
    icon: "👤",
    title: "Talk to Andy & Ruth",
    body: "Call or email us and you speak to the owners — not a call centre. Any question, any special request, any time.",
  },
  {
    icon: "🎁",
    title: "Returning guest discount",
    body: "Come back and you get a discount code at departure. Redeemable on your next direct booking — our way of saying thank you.",
  },
];

export default function Page() {
  return (
    <>
      <section className={styles.hero}>
        <Image
          src="/images/about/f768b622b6cab139.jpg"
          alt="Woodlands Manor Farm — book direct for the best rate"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroSplit}>
          <div className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>Woodlands Manor Farm · Bude, Cornwall</p>
            <h1>
              Book direct.
              <br />
              <em>Best price guaranteed.</em>
            </h1>
            <p>
              No booking fees. No third-party commission. Just the best possible price for your
              stay, direct from Andy and Ruth.
            </p>
          </div>
          <div className={styles.heroBadge}>
            <div className={styles.heroBadgeLabel}>Booking powered by</div>
            <h3>Supercontrol</h3>
            <p className={styles.heroBadgeNote}>
              Secure, trusted booking engine — same system used by the UK&rsquo;s leading holiday
              cottage agencies.
            </p>
            <a href="#booking-widget" className={styles.btnPrimary}>
              Check availability now
            </a>
          </div>
        </div>
      </section>

      <section className={styles.whyStrip}>
        {WHY_REASONS.map((r) => (
          <div key={r.title} className={styles.whyItem}>
            <span className={styles.whyIcon}>{r.icon}</span>
            <div className={styles.whyTitle}>{r.title}</div>
            <p className={styles.whyBody}>{r.body}</p>
          </div>
        ))}
      </section>

      <section
        className={styles.section}
        id="booking-widget"
        style={{ background: "#fff", maxWidth: "none" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p className={styles.eyebrow}>Secure online booking</p>
          <h2 className={styles.sectionTitle}>
            Check availability
            <br />&amp; <em>reserve your stay</em>
          </h2>
          <p className={styles.sectionLead}>
            Select your arrival and departure dates and choose your property from the calendar
            below. The booking system is provided by Supercontrol — the UK&rsquo;s leading
            holiday cottage booking platform — so you can book with complete confidence.
          </p>

          <div
            style={{
              borderRadius: 4,
              padding: 24,
              background: "var(--color-cream)",
              marginTop: 32,
              border: "1px solid rgba(127,151,137,0.18)",
            }}
          >
            <SuperControlWidget />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionCream}`} style={{ maxWidth: "none" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p className={styles.eyebrow}>All nine properties</p>
          <h2 className={styles.sectionTitle}>
            Browse all properties<br />
            then <em>book direct</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
              marginTop: 32,
            }}
          >
            {PROPERTIES.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                style={{
                  background: "#fff",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "box-shadow 0.3s",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
                  <Image src={p.heroImage} alt={p.name} fill sizes="(min-width: 900px) 25vw, 100vw" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "20px 22px 18px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 18,
                      color: "#4a6459",
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-light)",
                      letterSpacing: "0.05em",
                      marginBottom: 14,
                    }}
                  >
                    Sleeps {p.sleeps} · {p.bedrooms} bedroom{p.bedrooms > 1 ? "s" : ""}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--color-violet)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    View &amp; book →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>
          Need a hand? <em>Talk to us.</em>
        </h2>
        <p>
          For group bookings, special requests, or if you just want to chat through the options —
          Andy will pick up.
        </p>
        <div className={styles.finalCtaButtons}>
          <a href={`tel:${SITE.contact.phone}`} className={styles.btnWhite}>
            Call {SITE.contact.phoneDisplay}
          </a>
          <a href={`mailto:${SITE.contact.email}`} className={styles.btnGhost}>
            Email enquiries@woodlandsmanorfarm.co.uk
          </a>
        </div>
      </section>
    </>
  );
}
