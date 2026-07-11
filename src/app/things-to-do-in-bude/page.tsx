import type { Metadata } from "next";
import {
  AboutSubnav,
  CtaStrip,
  InfoCardGrid,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

const ATTRACTIONS = [
  {
    distance: "30 miles",
    name: "Tintagel Castle",
    body: "One of the most spectacular historic sites in Britain. Built half on the mainland and half on a jagged headland, it is associated with the legend of King Arthur. English Heritage site — book in advance.",
    href: "https://www.english-heritage.org.uk/visit/places/tintagel-castle/",
  },
  {
    distance: "60 miles",
    name: "Lost Gardens of Heligan",
    body: "One of the most mysterious estates in England. Lost to the brambles since WW1, re-awakened in 1990 to become Europe's largest garden restoration project. 200 acres of paradise for explorers and garden lovers.",
    href: "https://www.heligan.com/",
  },
  {
    distance: "60 miles",
    name: "The Eden Project",
    body: "Home to the world's largest indoor rainforest. Eden's tropical biome houses an incredible selection of plants. One of Cornwall's most iconic attractions — book well in advance in summer.",
    href: "https://www.edenproject.com/",
  },
  {
    distance: "14 miles",
    name: "Clovelly",
    body: "A picturesque North Devon fishing village with steep cobbled streets and timeless charm. Famously car-free — transport relies on donkeys and sledges. Stunning views of the Bristol Channel.",
    href: "https://www.clovelly.co.uk/",
  },
  {
    distance: "25 miles",
    name: "Boscastle",
    body: "A charming village in a deep valley on the North Cornwall coast. Famous for its natural harbour and the Museum of Witchcraft and Magic. Perfect for hikers, history enthusiasts and nature lovers.",
    href: "https://www.visitcornwall.com/boscastle",
  },
  {
    distance: "20 miles",
    name: "St Nectan's Glen",
    body: "One of Cornwall's most unspoilt hidden corners. A waterfall, ancient woodland and cafe in a genuinely magical setting. Voted an area of outstanding natural beauty and an SSSI.",
    href: "https://www.st-nectansglen.co.uk/",
  },
  {
    distance: "14 miles",
    name: "The Milky Way Adventure Park",
    body: "A fantastic adventure park for the whole family — rides, shows, indoor play and outdoor attractions. Perfect for a full day out with children of all ages.",
    href: "https://www.themilkyway.co.uk/",
  },
  {
    distance: "50 miles",
    name: "Padstow",
    body: "Cornwall's most celebrated foodie destination. Rick Stein restaurants, the National Lobster Hatchery, wildlife boat trips and a beautiful harbour town. Worth the hour's drive.",
    href: "https://padstowlive.com/",
  },
  {
    distance: "28 miles",
    name: "Bodmin Steam Railway",
    body: "Cornwall's premier steam railway — a 13-mile round trip through stunning scenery. Christmas specials with Santa, dining services and murder mystery events on selected dates.",
    href: "https://bodminrailway.co.uk/",
  },
];

export const metadata: Metadata = {
  title: "Things to Do in Bude",
  description:
    "Beaches, surf schools, coastal walks, gardens and family days out within easy reach of Woodlands Manor Farm.",
  alternates: { canonical: "/things-to-do-in-bude/" },
};

export default function Page() {
  return (
    <>
      <InfoHero
        image="/images/bude/bude-sea-pool.jpg"
        alt="Bude sea pool below the cliffs at Summerleaze Beach"
        eyebrow="Woodlands Manor Farm · Bude, Cornwall"
        title={
          <>
            Things to do<br />
            <em>in &amp; around Bude</em>
          </>
        }
        description="Two miles from the farm, Cornwall begins in earnest. Beaches, coastline, castles, gardens and adventures — Andy and Ruth's personal picks."
      />
      <AboutSubnav activeHref="/things-to-do-in-bude/" />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>North Cornwall &amp; North Devon</p>
        <h2 className={styles.sectionTitle}>
          Things to do <em>in &amp; around Bude</em>
        </h2>
        <p className={styles.sectionBody}>
          Woodlands is perfectly located on the North Cornwall / North Devon border, putting you
          within easy reach of some of England&rsquo;s finest beaches, coastline, gardens and
          attractions. Here are Andy and Ruth&rsquo;s personal picks.
        </p>

        <h3 className={styles.subHeading}>Beaches nearby</h3>
        <InfoCardGrid
          twoColumn
          cards={[
            {
              icon: "🏖️",
              title: "Duckpool Beach — 2 miles",
              body: "Our closest beach. A stunning, wild National Trust beach at the foot of the Coombe Valley. Dog-friendly all year round. Rock pools, stream, and one of the most unspoilt stretches of North Cornwall coastline.",
            },
            {
              icon: "🏊",
              title: "Summerleaze & Crooklets, Bude — 6 miles",
              body: "Bude's two main town beaches. Summerleaze has the famous tidal sea pool — one of the finest outdoor swimming spots in England. Crooklets is the main surf beach. Both have beach cafes.",
              variant: "violet",
            },
            {
              icon: "🏖️",
              title: "Sandymouth & Northcott Mouth — 4 miles",
              body: "Two spectacular National Trust beaches within a couple of miles of each other. Sandymouth has dramatic rock formations and a lovely beach cafe. Northcott Mouth is quieter and wilder.",
            },
            {
              icon: "🏖️",
              title: "Widemouth Bay — 8 miles",
              body: "One of the most popular beaches in North Cornwall — vast expanses of golden sand at low tide. Great for families and beginner surfers. The Beach House bar is listed in the Times' top 20 beach bars in the UK.",
              variant: "dark",
            },
            {
              icon: "🏖️",
              title: "Crackington Haven — 10 miles",
              body: "Tucked away on the North Cornwall coast, Crackington is a hidden gem known for its dramatic cliffs and rugged beauty. The Coombe Barton Inn and Haven Beach Cafe serve excellent food including the best crab sandwiches around.",
            },
            {
              icon: "🌊",
              title: "South West Coast Path — 2 miles",
              body: "The 630-mile South West Coast Path passes just 2 miles from the farm. The section between Hartland Point and Bude is among the most spectacular in England — dramatic sea stacks, hidden coves and clifftop views.",
              variant: "violet",
            },
          ]}
        />

        <h3 className={styles.subHeading}>Attractions &amp; days out</h3>
        <div className={styles.attrGrid}>
          {ATTRACTIONS.map((a) => (
            <div key={a.name} className={styles.attrCard}>
              <div className={styles.attrDistance}>{a.distance}</div>
              <div className={styles.attrName}>{a.name}</div>
              <p className={styles.attrBody}>{a.body}</p>
              <a href={a.href} target="_blank" rel="noreferrer" className={styles.attrLink}>
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>

      <CtaStrip
        title="Make the most of North Cornwall."
        body="Book your stay at Woodlands Manor Farm — the perfect base."
      />
    </>
  );
}
