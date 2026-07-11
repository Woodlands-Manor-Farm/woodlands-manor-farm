import type { Metadata } from "next";
import {
  AboutSubnav,
  CtaStrip,
  InfoCardGrid,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

export const metadata: Metadata = {
  title: "Farm Holidays in Cornwall — Stay on a Real Cornish Farm",
  description:
    "Farm holidays in Bude, North Cornwall — stay on a real Cornish farm with free animal feeding twice a week, pony experiences, alpacas, pigs, goats and chickens, plus a heated indoor pool and cottages sleeping 2 to 12.",
  alternates: { canonical: "/on-the-farm/" },
};

export default function Page() {
  return (
    <>
      <InfoHero
        image="/images/farm/meadow-woodlands-sign.jpg"
        alt="The Woodlands sign in the meadow at Woodlands Manor Farm"
        eyebrow="Woodlands Manor Farm · On the Farm"
        title={
          <>
            Life on <em>the farm</em>
          </>
        }
        description="A proper farm holiday in Cornwall — free animal feeding, pony experiences, heated indoor pool, games room, woodland walks and a peaceful valley two miles from Bude's beaches."
      />
      <AboutSubnav activeHref="/on-the-farm/" />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>Everything on site</p>
        <h2 className={styles.sectionTitle}>
          A farm built for <em>holidays</em>
        </h2>
        <p className={styles.sectionBody}>
          Woodlands has slowly grown — over twenty years — into a proper holiday farm. Every
          facility you see has been added because guests asked for it, or because Andy and Ruth
          wanted you to have it. Nothing here is an extra; nothing is up-sold.
        </p>

        <h3 className={styles.subHeading}>What&rsquo;s included with every stay</h3>
        <InfoCardGrid
          cards={[
            {
              icon: "🏊",
              title: "Heated indoor pool",
              body: "Maintained at 30°C all year. Open 8am to 8pm daily, free to all guests, no booking required. The pool that gets us through the winter half-terms.",
            },
            {
              icon: "🎮",
              title: "Games room",
              body: "Pool table, table tennis, foosball, giant Connect Four, darts and a full soft play area for the youngest. The most-used facility on rainy days.",
              variant: "violet",
            },
            {
              icon: "♨️",
              title: "Hot tub",
              body: "Communal hot tub on the terrace — perfect for sundowners after a day on the coast path.",
              variant: "gold",
            },
            {
              icon: "🌿",
              title: "Bluebell woodland",
              body: "An ancient woodland walk on the farm — carpeted in bluebells April and May. Beautiful in any season, and your dog will love it.",
              variant: "dark",
            },
            {
              icon: "⚽",
              title: "Playing field & playground",
              body: "Flat playing field with five-a-side goals, swings, slide and a proper playground. Plenty of space for kite-flying, rounders and family football.",
            },
            {
              icon: "⚡",
              title: "EV charging",
              body: "Type 2 EV charger on site — free for guests to use. Plug in when you arrive and you&rsquo;ll be ready to go.",
              variant: "violet",
            },
          ]}
        />

        <h3 className={styles.subHeading}>A real farm holiday — meet the animals</h3>
        <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
          Woodlands is a farm that&rsquo;s home to ponies, alpacas, pygmy goats, pigs, sheep,
          rabbits, chickens and Growler the farm cat. Ruth&rsquo;s Feed the Animals session is
          free for every guest, twice a week — Sundays at 8.30am and Wednesdays at 8am. Can&rsquo;t
          make those times? Just ask Ruth or Andy about joining an evening session when the
          animals are put to bed — shorter, but you still get to meet everyone.
        </p>

        <h3 className={styles.subHeading}>Farm experiences, tailored to you</h3>
        <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
          Beyond the free feeding sessions, we offer paid experiences that we&rsquo;ll happily
          tailor around your family. The firm favourite is the Pony Experience: children learn
          how to look after a pony, do the grooming themselves, take a pony for a walk around the
          farm — and yes, the little ones usually dress Lulu up as a unicorn. Bring a camera.
          Alpaca walking is another guest favourite. Ask when you book, or just have a word with
          Ruth when you arrive.
        </p>
      </div>

      <CtaStrip
        title="See the farm for yourself"
        body="Book your stay and meet the animals on day one."
      />
    </>
  );
}
