import type { Metadata } from "next";
import Image from "next/image";
import {
  AboutSubnav,
  CtaStrip,
  InfoCardGrid,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

export const metadata: Metadata = {
  title: "Holiday Cottages in Cornwall with a Pool — Heated Indoor, Open All Year",
  description:
    "Holiday cottages in Bude, North Cornwall with a heated indoor pool — kept at a warm 31°C and open 8am–8pm every day of the year, free for every guest. A 17th-century working farm run by Andy & Ruth Peters.",
  alternates: { canonical: "/about-woodlands-manor-farm-holiday-cottages-with-a-pool/" },
};

export default function AboutPage() {
  return (
    <>
      <InfoHero
        image="/images/about/f768b622b6cab139.jpg"
        alt="About Woodlands Manor Farm"
        eyebrow="Woodlands Manor Farm · Bude, Cornwall"
        title={
          <>
            About Woodlands<br />
            <em>Manor Farm</em>
          </>
        }
        description="A 17th-century working farm in the Coombe Valley — seven cottages, two yurts, a heated pool and the warmest welcome in Cornwall."
      />
      <AboutSubnav activeHref="/about-woodlands-manor-farm-holiday-cottages-with-a-pool/" />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>Andy &amp; Ruth Peters</p>
        <h2 className={styles.sectionTitle}>
          A farm <em>escape</em> like no other
        </h2>
        <p className={styles.sectionBody}>
          Woodlands Manor Farm is a 17th-century working farm set at the top of the Coombe Valley,
          two miles from the North Cornwall coast. Andy and Ruth Peters moved from London in 2019
          — swapping software companies for a life of sunshine, animals and making sure guests
          have the best holiday they&rsquo;ve ever had. Seven cottages, two luxury Mongolian yurts,
          a heated indoor pool and two miles of coastline on the doorstep.
        </p>
      </div>

      <section className={styles.split}>
        <div className={styles.splitImg}>
          <Image
            src="/images/home/cc82e0f15a7b2058.jpg"
            alt="Heated indoor swimming pool at Woodlands Manor Farm holiday cottages, Bude, Cornwall"
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
          />
        </div>
        <div className={styles.splitContent}>
          <p className={styles.eyebrow}>Open every day, all year</p>
          <h2 className={styles.sectionTitle}>
            Holiday cottages with a <em>heated indoor pool</em>
          </h2>
          <p>
            Our indoor pool is the heart of Woodlands — heated to a warm 31°C so everyone
            enjoys a swim, not just the brave. It&rsquo;s open from 8am to 8pm every single day
            of the year, and it&rsquo;s free for every guest: all seven cottages and both yurts
            include full pool access, with no booking or time slots needed.
          </p>
          <p>
            Rainy February half term or blazing August week, the pool means the holiday never
            stops. Morning lengths before breakfast, an afternoon splash with the children, a
            quiet evening swim — it&rsquo;s yours whenever you want it.
          </p>
        </div>
      </section>

      <section className={styles.split}>
        <div className={styles.splitImg}>
          <Image
            src="/images/about/f768b622b6cab139.jpg"
            alt="The Peters family at Woodlands Manor Farm"
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
          />
        </div>
        <div className={styles.splitContent}>
          <p className={styles.eyebrow}>Your hosts</p>
          <h2 className={styles.sectionTitle}>
            Andy &amp; <em>Ruth Peters</em>
          </h2>
          <p>
            We moved from London in September 2019, swapping a life running software companies for
            a life in sunny Bude and tourism. We love the change, and our goal is to ensure you
            have the best holiday possible with family and friends — making happy memories that
            last a lifetime.
          </p>
          <p>
            We are always available by phone or email and genuinely love hearing from guests. The
            farm, the animals, the pool — it is all here because we believe you deserve a holiday
            where you never have to worry about a single thing.
          </p>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.bandInner}>
          <p className={styles.eyebrow} style={{ textAlign: "center" }}>
            Everything at Woodlands
          </p>
          <h2
            className={styles.sectionTitle}
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            What you&rsquo;ll <em>find here</em>
          </h2>
          <InfoCardGrid
            cards={[
              {
                icon: "🏡",
                title: "7 Holiday Cottages",
                body: "From cosy two-bedroom retreats to the 12-person Manor House. Every cottage is equipped to the highest standard with quality linen, Smart TVs, super-fast WiFi and a welcome basket.",
              },
              {
                icon: "⛺",
                title: "2 Luxury Yurts",
                body: "Budhyn and Fenton — two authentic Mongolian yurts with Nordpeis stoves, super king beds, private kitchens, private shower rooms and Weber BBQs. Glamping at its finest.",
                variant: "violet",
              },
              {
                icon: "🏊",
                title: "Heated Indoor Pool",
                body: "A large heated indoor swimming pool maintained at 31°C year-round, open from 8am to 8pm daily. Free to all guests, no booking required.",
                variant: "gold",
              },
              {
                icon: "🎮",
                title: "Games Room",
                body: "Table tennis, pool, foosball, giant Connect Four, darts and a full soft play area. Perfect for rainy days and evenings in.",
                variant: "dark",
              },
              {
                icon: "🐮",
                title: "Farm Animals",
                body: "Ponies, alpacas, pygmy goats, Kune Kune pigs, sheep, rabbits, chickens and Growler the cat. Ruth's feed the animals tour runs every Sunday and Wednesday morning.",
              },
              {
                icon: "🌿",
                title: "Woodland & Playing Field",
                body: "An ancient bluebell woodland carpeted in April and May, plus a large flat playing field with a proper playground, swings, slide and 5-a-side goals.",
                variant: "violet",
              },
            ]}
          />
        </div>
      </section>

      <CtaStrip
        title="Ready to book your stay?"
        body="Best price guaranteed when you book direct with Andy and Ruth."
      />
    </>
  );
}
