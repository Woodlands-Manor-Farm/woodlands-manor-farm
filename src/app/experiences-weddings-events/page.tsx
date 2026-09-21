import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/marketing/marketing.module.css";
import { SITE } from "@/lib/constants/seo";
import { BOOK_HREF } from "@/lib/constants/nav";
import { CAMP_BED_NOTE, TOTAL_GUEST_CAPACITY } from "@/lib/constants/properties";

const EXPERIENCES = [
  {
    img: "/images/farm/feeding-goats.jpg",
    alt: "Children feeding the pygmy goats at Woodlands",
    type: "Free with every stay",
    name: "Feed the Animals tour",
    body: "Join Ruth on Wednesdays at 8am or Sundays at 8.30am to meet the alpacas, ponies, pigs, sheep, rabbits and chickens. Free for all Woodlands guests; please book in advance.",
    detail: "Wed 8am · Sun 8.30am · Advance booking",
  },
  {
    img: "/images/home/c2909c0800e4042d.jpg",
    alt: "Indoor heated swimming pool",
    type: "Wellness",
    name: "Pool sessions",
    body: "Heated indoor pool kept at 30°C all year, so whatever the weather or season, it is ready to be enjoyed. Open 8am–8pm daily.",
    detail: "8am–8pm daily · Free for guests",
  },
  {
    img: "/images/farm/lulu-pony.jpg",
    alt: "Grooming Lulu the mini Shetland pony",
    type: "Outdoors",
    name: "Pony experience",
    body: "Spend half an hour with Lulu, grooming, leading and brushing. £25 per half-hour session, for ages 3 and above. A maximum of two children can join each session, with no limit on accompanying adults. Available all year; please book in advance.",
    detail: "£25 per half hour · Ages 3+ · Book in advance",
  },
  {
    img: "/images/bude/surf-lesson-bude.jpg",
    alt: "Children learning to surf on the waves at Bude, Cornwall",
    type: "Adventure",
    name: "Surfing & Outdoor Adventure",
    body: "We will arrange the right instructors to fit your needs, private or larger groups, families or more experienced surfers. We have the local knowledge to ensure you have a fabulous time.",
    detail: "All abilities · Advance booking required",
  },
  {
    img: "/images/animals/d2e104531205804a.jpg",
    alt: "Wedding setup at Woodlands",
    type: "Exclusive use",
    name: "Weddings & events",
    body: `Hire the whole farm exclusively for your wedding, milestone birthday, corporate retreat or family reunion. Seven cottages and two yurts accommodate ${TOTAL_GUEST_CAPACITY} guests, with the pool and games room, plus a variety of locations to choose from — the courtyard, orchard and playing field. ${CAMP_BED_NOTE}`,
    detail: `Sleeps ${TOTAL_GUEST_CAPACITY} · Camp beds by prior agreement`,
  },
  {
    img: "/images/blog-template/dcf926b3c1174be3.jpg",
    alt: "Yoga retreat at Woodlands",
    type: "Wellness retreat",
    name: "Yoga & wellness retreats",
    body: "Talk to Woodlands and we can advise you on the best places for pottery, art, glass and jewellery workshops, as well as yoga, Pilates or open-water swimming locations. Get in touch with Ruth and Andy to arrange.",
    detail: "Weekend dates · Enquire",
  },
];

export const metadata: Metadata = {
  title: "Experiences, Weddings & Events",
  description:
    "Hire Woodlands Manor Farm exclusively for weddings, family celebrations, retreats — or join the Feed the Animals tour, pony experience or a surf lesson.",
  alternates: { canonical: "/experiences-weddings-events/" },
};

export default function Page() {
  return (
    <>
      <section className={styles.hero}>
        <Image
          src="/images/animals/d2e104531205804a.jpg"
          alt="Experiences at Woodlands Manor Farm"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 50%" }}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroSplit}>
          <div className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>More than a place to stay</p>
            <h1>
              Experiences,
              <br />
              <em>weddings &amp; events</em>
            </h1>
            <p>
              Free farm tours, hands-on pony experiences, surfing and outdoor adventures, and
              exclusive-use hire for the celebrations that matter most.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>What we offer</p>
        <h2 className={styles.sectionTitle}>
          Things to <em>do here</em>
        </h2>
        <p className={styles.sectionLead}>
          Some are free with every stay (the Feed the Animals tour, pool sessions). Others are
          bookable add-ons (pony experiences, retreats). And some — weddings, exclusive-use — take
          over the whole farm. Please book animal experiences and other experiences in advance,
          including activities arranged through our partners.
        </p>

        <div className={styles.experienceGrid}>
          {EXPERIENCES.map((e) => (
            <article key={e.name} className={styles.expCard}>
              <div className={styles.expCardImg}>
                <Image src={e.img} alt={e.alt} fill sizes="(min-width: 900px) 33vw, 100vw" />
              </div>
              <div className={styles.expCardBody}>
                <div className={styles.expType}>{e.type}</div>
                <div className={styles.expName}>{e.name}</div>
                <p className={styles.expBody}>{e.body}</p>
                <div className={styles.expDetail}>{e.detail}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`} style={{ maxWidth: "none" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Exclusive use</p>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
            Take the whole farm <em>for your event</em>
          </h2>
          <p className={`${styles.sectionLead} ${styles.sectionLeadLight}`}>
            Reunions, weddings, milestone birthdays, corporate retreats, school trips, hen
            weekends — book the entire farm exclusively for up to {TOTAL_GUEST_CAPACITY} guests
            across seven cottages and two yurts, with the pool, games room, fields and animals
            all to yourselves. {CAMP_BED_NOTE}
          </p>
          <Link
            href={`mailto:${SITE.contact.email}?subject=Exclusive use enquiry`}
            className={styles.btnPrimary}
            style={{ marginTop: 16, display: "inline-block" }}
          >
            Email the team
          </Link>
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>
          Plan something <em>memorable</em>
        </h2>
        <p>Book a stay or call to discuss exclusive-use, weddings, or a custom experience.</p>
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
