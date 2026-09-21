import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AboutSubnav,
  CtaStrip,
  InfoCardGrid,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";
import { FarmVideo } from "@/components/ui/farm-video";

const ANIMALS = [
  {
    name: "Wilma",
    species: "Fell Pony",
    bio: "The head of the herd — a beautiful Fell pony who keeps the whole herd in order, yet kindly looks out for little Lulu, her best friend.",
    img: "/images/animals/wilma-fell-pony.jpg",
  },
  {
    name: "Lulu",
    species: "Mini Shetland Pony",
    bio: "The kindest, sweetest mini pony you will ever meet. She never tires of meeting little people, loves to be groomed and made a fuss of. Lulu loves the summer season — she particularly enjoys the pony experience sessions, where she gets to be made extremely beautiful and go on walks with the children.",
    img: "/images/farm/lulu-pony.jpg",
  },
  {
    name: "Merlin",
    species: "Welsh Cob",
    bio: "The elder statesman of the herd, but very much a youngster at heart. A lovely boy, but can be a little grumpy if not fed first or given the respect he deserves, or his daily hay. His favourite pastime is galloping through fields — that is when he is at his happiest.",
    img: "/images/animals/merlin-welsh-cob.jpg",
  },
  {
    name: "Lady",
    species: "Pony",
    bio: "One of our much-loved ponies — gentle, steady and always happy to say hello on the Feed the Animals tour with Ruth.",
    img: "/images/animals/lady-pony.jpg",
  },
  {
    name: "Zap & Sparky",
    species: "Pygmy Goats",
    bio: "Often seen playing chase in the field. They love the feed the animals routine with guests, where they get lots of fuss and are fed by hand. Pure entertainment — watch them tackle the adventure course with treats for motivation.",
    img: "/images/farm/feeding-goats.jpg",
  },
  {
    name: "Napoleon, Henry & Erebus",
    species: "Alpacas",
    bio: "The three amigos — the most inquisitive animals on the farm. Napoleon is a Suri Alpaca with a beautiful dreadlock fleece. Erebus and Henry are Huacaya Alpacas who look like massive teddy bears. They love carrots (finely cut — only bottom teeth!) and will come over to say hello to everyone.",
    img: "/images/animals/alpacas-woodlands.jpg",
  },
  {
    name: "Lucas & Layla",
    species: "Kune Kune Pigs",
    bio: "Brother and sister — firm favourites on the feed the animals rounds. Playful, kind and love a tummy tickle or a mud bath in summer. Lucas is very good at escaping his pen to find longer grass, while Layla stays behind and enjoys the peace and quiet.",
    img: "/images/farm/feeding-pigs.jpg",
  },
  {
    name: "Cutie Pie, Z, Twinkle & Rosario",
    species: "Sheep",
    bio: "Rosario is a survivor — hand-reared after a difficult birth and now more like a dog than a sheep. Cutie Pie was the cutest of the 2022 lambs. Z has always been the odd one out — we love her for it.",
    img: "/images/farm/feeding-sheep.jpg",
  },
  {
    name: "Ralf & Molly",
    species: "Rabbits",
    bio: "Ralf is a Mini Lop and Molly is a Lion Lop. Best of friends who sleep curled around one another. We are convinced Ralf is the brother of Peter Rabbit — he loves carrots and is constantly plotting an escape into the allotment.",
    img: "/images/animals/ralf-molly-rabbits.jpg",
  },
  {
    name: "Growler",
    species: "Farm Cat — Chief Ratter",
    bio: "Growler adopted us in 2022, making his way over from a nearby farm. Spoilt rotten ever since. Loves his status as chief ratter but most of all loves fuss and sitting on people's laps. Very happy indeed.",
    img: "/images/animals/growler-cat.jpg",
  },
  {
    name: "Chick Chick",
    species: "Chicken",
    bio: "A true legend of the farm. Chick Chick does her rounds every single day, visiting all the other animals and pinching a little bit of food along the way — and she still rewards us with an amazing, lovely egg too.",
    img: "/images/animals/chick-chick.jpg",
  },
];

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
              icon: "🍖",
              title: "High-end BBQ",
              body: "Each cottage comes complete with a high-end BBQ, and all the cottages are surrounded by stunning valley views and outdoor space for relaxing and outdoor dining.",
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
          Woodlands is home to ponies, alpacas, pygmy goats, Kune Kune pigs, sheep, rabbits,
          chickens and Growler the farm cat — every one with a name, a personality and a story.
          Ruth&rsquo;s Feed the Animals session is free for every guest, twice a week — Sundays at
          8.30am and Wednesdays at 8am. No booking needed; just turn up. Can&rsquo;t make those
          times? Ask Ruth or Andy about joining an evening session when the animals are put to bed.
        </p>

        <div className={styles.animalGrid}>
          {ANIMALS.map((animal) => (
            <div key={animal.name} className={styles.animalCard}>
              <div className={styles.animalCardImg}>
                <Image src={animal.img} alt={animal.name} fill sizes="(min-width: 900px) 33vw, 100vw" />
              </div>
              <div className={styles.animalCardBody}>
                <div className={styles.animalName}>{animal.name}</div>
                <div className={styles.animalSpecies}>{animal.species}</div>
                <p className={styles.animalBio}>{animal.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className={styles.subHeading}>Farm experiences, tailored to you</h3>
        <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
          Beyond the free feeding sessions, we offer paid experiences that we&rsquo;ll happily
          tailor around your family. The firm favourite is the Pony Experience: children learn
          how to look after a pony, do the grooming themselves, take a pony for a walk around the
          farm — and yes, the little ones usually dress Lulu up as a unicorn. Bring a camera.
          Alpaca walking is another guest favourite.{" "}
          <Link href="/experiences-weddings-events/" className={styles.inlineLink}>
            See all our experiences
          </Link>
          , or just have a word with Ruth when you arrive.
        </p>
      </div>

      <section style={{ background: "var(--color-deep-green)", padding: "64px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", paddingBottom: 28, textAlign: "center" }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-cream)",
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            A little preview
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(22px, 2.6vw, 32px)",
              color: "var(--color-cream)",
              fontWeight: 400,
            }}
          >
            See a Feed the Animals morning
          </h2>
        </div>
        <FarmVideo
          videoId="nypjKJONHBE"
          start={8}
          poster="/images/farm/feeding-goats.jpg"
          posterAlt="Guests feeding the goats on the Feed the Animals tour at Woodlands Manor Farm"
          title="Feed the Animals — Woodlands Manor Farm"
          subtitle="Watch the preview"
        />
      </section>

      <CtaStrip
        title="See the farm for yourself"
        body="Book your stay and meet the animals on day one."
      />
    </>
  );
}
