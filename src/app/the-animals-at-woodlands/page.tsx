import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AboutSubnav,
  CtaStrip,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";
import { BOOK_HREF } from "@/lib/constants/nav";

const ANIMALS = [
  {
    name: "Pringle",
    species: "Pure Dartmoor Pony",
    bio: "Pringle wins the cheekiest animal on the farm award, hands down. A special pure Dartmoor pony who spent his first 6 months with the herd on the moors. Known for picking up anything not locked down, knocking fences down and winding up every other animal on the farm with his playful antics.",
    img: "/images/animals/d2e104531205804a.jpg",
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
    bio: "The elder statesman of the herd and the boss. A lovely boy but can be a little grumpy if not fed first or given the respect he deserves. His favourite pastime is galloping through fields — that is when he is at his happiest.",
    img: "/images/animals/d2e104531205804a.jpg",
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
    img: "/images/animals/37f845543e54531f.jpg",
  },
  {
    name: "Lucas & Layla",
    species: "Kune Kune Pigs",
    bio: "Brother and sister — firm favourites on the feed the animals rounds. Playful, kind and love a tummy tickle or a mud bath in summer. Lucas is very good at escaping his pen to find longer grass, while Layla stays behind and enjoys the peace and quiet.",
    img: "/images/farm/feeding-pigs.jpg",
  },
  {
    name: "Cutie Pie, Little Z, Twinkle & Rosario",
    species: "Sheep",
    bio: "Rosario is a survivor — hand-reared after a difficult birth and now more like a dog than a sheep. Cutie Pie was the cutest of the 2022 lambs. Little Z has always been the odd one out — we love her for it.",
    img: "/images/farm/feeding-sheep.jpg",
  },
  {
    name: "Ralf & Molly",
    species: "Rabbits",
    bio: "Ralf is a Mini Lop and Molly is a Lion Lop. Best of friends who sleep curled around one another. We are convinced Ralf is the brother of Peter Rabbit — he loves carrots and is constantly plotting an escape into the allotment.",
    img: "/images/animals/d2e104531205804a.jpg",
  },
  {
    name: "Growler",
    species: "Farm Cat — Chief Ratter",
    bio: "Growler adopted us in 2022, making his way over from a nearby farm. Spoilt rotten ever since. Loves his status as chief ratter but most of all loves fuss and sitting on people's laps. Very happy indeed.",
    img: "/images/animals/d2e104531205804a.jpg",
  },
];

export const metadata: Metadata = {
  title: "Meet the Farm Animals — Free Feed the Animals Sessions",
  description:
    "Meet the alpacas, ponies, pygmy goats, Kune Kune pigs, sheep, rabbits and Growler the farm cat at Woodlands Manor Farm, Bude. Free Feed the Animals sessions every Sunday (8.30am) and Wednesday (8am) for all guests.",
  alternates: { canonical: "/the-animals-at-woodlands/" },
};

export default function Page() {
  return (
    <>
      <InfoHero
        image="/images/animals/d2e104531205804a.jpg"
        alt="The animals at Woodlands Manor Farm"
        eyebrow="Woodlands Manor Farm · The Animals"
        title={
          <>
            Meet the <em>animals</em>
          </>
        }
        description="From Pringle the cheeky Dartmoor pony to Growler the farm cat — every animal at Woodlands has a name, a personality, and a story."
      />
      <AboutSubnav activeHref="/the-animals-at-woodlands/" />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>Ruth &amp; the animals</p>
        <h2 className={styles.sectionTitle}>
          Meet the <em>family</em>
        </h2>
        <p className={styles.sectionBody}>
          We love all our animals on the farm — they are part of the Woodlands Manor Farm family.
          Come and meet them all on the Feed the Animals tour with Ruth — free for every guest,
          every Sunday at 8.30am and Wednesday at 8am. No booking needed — just turn up. Can&rsquo;t
          make the mornings? Ask Ruth or Andy about joining an evening session when the animals
          are put to bed.
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
      </div>

      <section
        style={{
          background: "#4a6459",
          padding: "64px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 48,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--color-warm-stone)",
              marginBottom: 10,
            }}
          >
            Sundays &amp; Wednesdays with Ruth
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--color-cream)",
              fontWeight: 400,
              marginBottom: 8,
            }}
          >
            Feed the Animals tour
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(247,244,239,0.65)",
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            Every Sunday at 8.30am and Wednesday at 8am, Ruth takes cottage and yurt guests on a
            tour of all the animals — free with every stay. You will feed, groom and get up close
            with the ponies, alpacas, goats, pigs, sheep, rabbits and chickens. No booking needed
            — just meet in the courtyard on the morning. This is consistently the most-mentioned
            highlight in guest reviews. For something extra, ask about the Pony Experience —
            grooming, pony walks and dressing Lulu up as a unicorn.
          </p>
        </div>
        <Link
          href="/experiences-weddings-events/"
          style={{
            background: "var(--color-violet)",
            color: "#FEFEFE",
            padding: "14px 28px",
            textDecoration: "none",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            borderRadius: 2,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Book an experience
        </Link>
      </section>

      <CtaStrip
        title="Ready to meet them?"
        body="Book a stay — and join the next Feed the Animals tour with Ruth."
        ctaHref={BOOK_HREF}
      />
    </>
  );
}
