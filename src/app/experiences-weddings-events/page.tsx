import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/marketing/marketing.module.css";
import { SITE } from "@/lib/constants/seo";
import { BOOK_HREF } from "@/lib/constants/nav";

const EXPERIENCES = [
  {
    img: "/images/home/57c6f3124406e0a5.jpg",
    alt: "Feeding the animals at Woodlands",
    type: "Free with every stay",
    name: "Feed the Animals tour",
    body: "Ruth runs a guided tour every Sunday and Wednesday morning — meet the alpacas, ponies, pigs, sheep, rabbits and chickens. The most-mentioned highlight in our guest reviews.",
    detail: "Sundays & Wednesdays · No booking needed",
  },
  {
    img: "/images/home/c2909c0800e4042d.jpg",
    alt: "Indoor heated swimming pool",
    type: "Wellness",
    name: "Pool sessions",
    body: "Heated indoor pool kept at 30°C all year. Open 8am–8pm daily. We can also arrange morning lane swims and evening hot tub sessions for groups of 6+ on request.",
    detail: "8am–8pm daily · Free for guests",
  },
  {
    img: "/images/home/3c62af48f5d7d88b.jpg",
    alt: "Children playing in the meadow",
    type: "Outdoors",
    name: "Pony experience",
    body: "An hour with Lulu, the gentlest pony on the farm — grooming, leading and brushing. Brilliant for children aged 3+. Costs £35, runs in school holidays, book at least a week ahead.",
    detail: "School holidays · From £35",
  },
  {
    img: "/images/home/53289620864625e8.jpg",
    alt: "Bluebell woodland walk",
    type: "Spring only",
    name: "Bluebell walk & cream tea",
    body: "April–May only — guided morning walk through the bluebell woodland, finishing with a Cornish cream tea on the terrace. Beautiful for couples and families alike.",
    detail: "April & May · From £18 pp",
  },
  {
    img: "/images/animals/d2e104531205804a.jpg",
    alt: "Wedding setup at Woodlands",
    type: "Exclusive use",
    name: "Weddings & events",
    body: "Hire the whole farm exclusively for your wedding, milestone birthday, corporate retreat or family reunion. All 9 properties (44 guests), pool, games room, and the courtyard for ceremony or party.",
    detail: "Up to 44 guests · Bespoke",
  },
  {
    img: "/images/blog-template/dcf926b3c1174be3.jpg",
    alt: "Yoga retreat at Woodlands",
    type: "Wellness retreat",
    name: "Yoga & wellness retreats",
    body: "We host independent retreat leaders running yoga, breathwork and wellness weekends. Get in touch for available dates or to book the farm for your own retreat.",
    detail: "Weekend dates · Enquire",
  },
];

export const metadata: Metadata = {
  title: "Experiences, Weddings & Events",
  description:
    "Hire Woodlands Manor Farm exclusively for weddings, family celebrations, retreats — or join the Feed the Animals tour, pony experience or bluebell walk.",
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
              Free farm tours, hands-on pony experiences, Cornish cream teas and exclusive-use
              hire for the celebrations that matter most.
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
          over the whole farm.
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
            weekends — book the entire farm exclusively for up to 44 guests across all 9
            properties, with the pool, games room, fields and animals all to yourselves.
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
