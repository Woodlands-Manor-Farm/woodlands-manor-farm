import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AboutSubnav,
  CtaStrip,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

const ATTRACTIONS = [
  {
    distance: "6 miles",
    name: "The Castle, Bude",
    body: "Bude's historic castle beside the canal, built in the 1830s by local inventor Sir Goldsworthy Gurney — famously on a raft of sand. Now a heritage centre with a museum telling Bude's story, an art gallery, gift shop and a café with lovely canal views.",
    href: "https://www.thecastlebude.co.uk/",
  },
  {
    distance: "6 miles",
    name: "Bude Sea Pool",
    body: "A much-loved semi-natural tidal sea pool below the cliffs at Summerleaze Beach. Free to use and cared for by a local charity, it's one of the finest and safest spots for a sea swim whatever the weather.",
    href: "https://www.budeseapool.org/",
  },
  {
    distance: "6 miles",
    name: "Teylu Glass",
    body: "A friendly glass studio in Bude running creative glass workshops for all ages (5+), alongside a gallery of beautiful handmade pieces. Book a hands-on class or simply browse for a special, locally-made gift — a perfect rainy-day activity.",
    href: "https://www.teyluglass.co.uk/",
  },
  {
    distance: "6 miles",
    name: "Budehaven Recreation Ground",
    body: "A much-loved recreation ground in the heart of Bude, run as a charitable trust since 1923. Tennis and squash courts, crazy golf, putting, bowls, table tennis and a café — great affordable family fun right by the town and beaches.",
    href: "https://budehavenrec.com/",
  },
  {
    distance: "18 miles",
    name: "Cornwall at War Museum",
    body: "Set on the historic WWII airfield at Davidstow, this volunteer-run museum houses aircraft, vehicles, uniforms and memorabilia telling the story of Cornwall at war. A fascinating day out for history enthusiasts.",
    href: "https://cornwallatwarmuseum.co.uk/",
  },
  {
    distance: "20 miles",
    name: "The Big Sheep",
    body: "A multi-award-winning family theme park just over the Devon border near Bideford. Sheep racing, duck trials, live shows, big rides and a huge indoor play barn — a brilliant full day out whatever the weather.",
    href: "https://thebigsheep.co.uk/",
  },
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
    distance: "28 miles",
    name: "Bodmin Steam Railway",
    body: "Cornwall's premier steam railway — a 13-mile round trip through stunning scenery. Christmas specials with Santa, dining services and murder mystery events on selected dates.",
    href: "https://bodminrailway.co.uk/",
  },
];

export const metadata: Metadata = {
  title: "Things to Do in Bude",
  description:
    "Family days out, gardens, castles and attractions within easy reach of Woodlands Manor Farm, Bude — Andy and Ruth's personal picks across North Cornwall and North Devon.",
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
          Woodlands is perfectly located on the North Cornwall / North Devon border, within easy
          reach of England&rsquo;s finest coastline, gardens and family attractions. For the coast
          itself, see our guide to{" "}
          <Link href="/beaches-and-walks-near-bude/" className={styles.inlineLink}>
            local beaches &amp; walks
          </Link>
          ; for characterful places to explore, our{" "}
          <Link href="/local-towns-and-villages-near-bude/" className={styles.inlineLink}>
            local towns &amp; villages
          </Link>
          . Below are Andy and Ruth&rsquo;s personal picks for days out and attractions.
        </p>

        <div className={styles.imageBand}>
          {[
            { src: "/images/bude/beach-duckpool-thrift.jpg", alt: "Sea thrift in bloom above a wild North Cornwall beach near Bude" },
            { src: "/images/bude/bude-sea-pool-swimmers.jpg", alt: "Swimmers enjoying Bude Sea Pool at Summerleaze Beach" },
            { src: "/images/bude/summerleaze-summer-beach.jpg", alt: "Families on the golden sand at Summerleaze Beach, Bude in summer" },
          ].map((img) => (
            <div key={img.src} className={styles.imageBandItem}>
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 33vw, 100vw" />
            </div>
          ))}
        </div>

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
