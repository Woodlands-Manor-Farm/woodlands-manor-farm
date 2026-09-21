import type { Metadata } from "next";
import {
  AboutSubnav,
  CtaStrip,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

const PLACES = [
  {
    type: "Pub · 4 miles",
    name: "The Bush Inn",
    body: "Andy & Ruth's local — a 13th-century inn at Morwenstow with seriously good food, dog-friendly bar and views to die for.",
    href: "https://thebushinn.co.uk/",
  },
  {
    type: "Restaurant · 6 miles",
    name: "Life's a Beach",
    body: "Right on Summerleaze beach — proper Cornish food, fresh fish and a sunset view that's hard to beat.",
    href: "https://lifesabeach.info/",
  },
  {
    type: "Restaurant · Bude",
    name: "The Olive Tree",
    body: "The Olive Tree in Bude is one of Ruth and Andy’s local recommendations. Visit its website for current menus and booking information.",
    href: "https://www.olivetreebude.co.uk/",
  },
  {
    type: "Beach café · 4 miles",
    name: "Sandymouth Beach Cafe",
    body: "Family-run beach cafe at Sandymouth with hearty breakfasts, homemade cakes, and that just-came-off-the-sand feeling.",
    href: "https://www.sandymouthcafe.co.uk/",
  },
  {
    type: "Pub · 10 miles",
    name: "Coombe Barton Inn",
    body: "Crab sandwiches at Crackington Haven that have ruined every other crab sandwich for us. Worth the drive.",
    href: "https://www.coombebartoninn.com/",
  },
  {
    type: "Restaurant · 6 miles",
    name: "The Castle Restaurant",
    body: "Bude's go-to for special occasions — modern British, well-sourced, and the kind of place you book in advance.",
    href: "https://www.thecastlebude.co.uk/",
  },
];

export const metadata: Metadata = {
  title: "Places to Eat in Bude",
  description: "Our hand-picked guide to restaurants, pubs, cafés and beach cafes near Bude.",
  alternates: { canonical: "/places-to-eat-in-bude/" },
};

export default function Page() {
  return (
    <>
      <InfoHero
        image="/images/blog-template/50732616e754d9b7.jpg"
        alt="Places to eat in Bude"
        eyebrow="Woodlands Manor Farm · Local guide"
        title={
          <>
            Places to <em>eat</em>
          </>
        }
        description="Where the family go — restaurants, pubs, cafés and beach cafes within a short drive of Woodlands Manor Farm."
      />
      <AboutSubnav activeHref="/places-to-eat-in-bude/" />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>Andy &amp; Ruth&rsquo;s picks</p>
        <h2 className={styles.sectionTitle}>
          Where to eat <em>around Bude</em>
        </h2>
        <p className={styles.sectionBody}>
          Bude punches well above its weight on the food front. From beachside cafes to old
          village pubs to proper restaurants, here&rsquo;s where we send guests when they ask
          where to go.
        </p>

        <div className={styles.restGrid}>
          {PLACES.map((place) => (
            <div key={place.name} className={styles.restCard}>
              <div className={styles.restType}>{place.type}</div>
              <div className={styles.restName}>{place.name}</div>
              <p className={styles.restBody}>{place.body}</p>
              <a href={place.href} target="_blank" rel="noreferrer" className={styles.restLink}>
                Visit website →
              </a>
            </div>
          ))}
        </div>
      </div>

      <CtaStrip
        title="Stay where the food is."
        body="Book your Cornish escape — local recommendations included."
      />
    </>
  );
}
