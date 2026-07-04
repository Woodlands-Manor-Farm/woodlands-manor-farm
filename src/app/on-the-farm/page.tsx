import type { Metadata } from "next";
import {
  AboutSubnav,
  CtaStrip,
  InfoCardGrid,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

export const metadata: Metadata = {
  title: "On the Farm",
  description: "Daily farm life at Woodlands — animals, gardens, pool and what to expect from a stay.",
  alternates: { canonical: "/on-the-farm/" },
};

export default function Page() {
  return (
    <>
      <InfoHero
        image="/images/home/c2909c0800e4042d.jpg"
        alt="On the farm at Woodlands Manor Farm"
        eyebrow="Woodlands Manor Farm · On the Farm"
        title={
          <>
            Life on <em>the farm</em>
          </>
        }
        description="Heated indoor pool, games room, woodland walks, playing field, hot tub and farm animals — all included with your stay, all on site."
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
              body: "Maintained at 31°C all year. Open 8am to 8pm daily, free to all guests, no booking required. The pool that gets us through the winter half-terms.",
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
              body: "Communal hot tub on the terrace — perfect for sundowners after a day on the coast path. Yurt guests have private hot tubs too.",
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

        <h3 className={styles.subHeading}>The animals</h3>
        <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
          Three ponies, three alpacas, two pygmy goats, two pigs, four sheep, two rabbits, twelve
          chickens and Growler the farm cat. Ruth runs a Feed the Animals tour every Sunday and
          Wednesday morning — included free with your stay.
        </p>
      </div>

      <CtaStrip
        title="See the farm for yourself"
        body="Book your stay and meet the animals on day one."
      />
    </>
  );
}
