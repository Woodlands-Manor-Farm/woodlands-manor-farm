import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CtaStrip,
  InfoCardGrid,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

const BAILEY_PHOTOS = [
  {
    src: "/images/farm/dog-bailey-bluebells.jpg",
    alt: "Bailey, the Woodlands Bernedoodle, in the bluebell woodland",
  },
  {
    src: "/images/farm/dog-bailey-meadow.jpg",
    alt: "Bailey sitting in the open meadow in his harness",
  },
  {
    src: "/images/farm/dog-bailey-family.jpg",
    alt: "A family woodland walk with Bailey at Woodlands Manor Farm",
  },
  {
    src: "/images/farm/dog-bailey-grass.jpg",
    alt: "Bailey relaxing in the long grass on the farm",
  },
];

export const metadata: Metadata = {
  title: "Dog Friendly Holiday Cottages in Bude, Cornwall",
  description:
    "Dog friendly holiday cottages and glamping yurts in Bude, North Cornwall. All nine properties welcome well-behaved dogs — 15 acres of off-lead woodland, an open meadow, dog-friendly beaches at Sandymouth and Duckpool, and dog-friendly pubs nearby. £25 per dog.",
  alternates: { canonical: "/dog-friendly-holiday-cottages-bude/" },
  openGraph: {
    title: "Dog Friendly Holiday Cottages in Bude, Cornwall — Woodlands Manor Farm",
    description:
      "All nine cottages and yurts welcome well-behaved dogs. 15 acres of off-lead woodland, open meadow, and dog-friendly beaches on the doorstep.",
    images: ["/images/farm/bluebell-woodland.jpg"],
  },
};

export default function DogFriendlyPage() {
  return (
    <>
      <InfoHero
        image="/images/farm/bluebell-woodland.jpg"
        alt="Bluebell woodland walk at Woodlands Manor Farm — 15 acres of off-lead dog walking"
        eyebrow="Woodlands Manor Farm · Bude, Cornwall"
        title={
          <>
            Dog friendly <em>holidays</em>
          </>
        }
        description="Every cottage and yurt at Woodlands welcomes well-behaved dogs — with 15 acres of woodland, an open meadow and dog-friendly beaches minutes away, this is their holiday too."
      />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>Dogs welcome — properly welcome</p>
        <h2 className={styles.sectionTitle}>
          A farm holiday your dog will <em>never forget</em>
        </h2>
        <p className={styles.sectionBody}>
          All nine of our holiday cottages and both glamping yurts welcome well-behaved dogs, with
          no maximum per booking — bring the whole pack. It&rsquo;s £25 per dog per stay. Our own
          Bernedoodle, Bailey, will tell you there&rsquo;s no better place to be a dog: fifteen
          acres of ancient woodland to explore off the lead, an open meadow for zoomies, and some
          of Cornwall&rsquo;s best dog-friendly beaches ten minutes down the road.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginTop: 28,
          }}
        >
          {BAILEY_PHOTOS.map((p) => (
            <div
              key={p.src}
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 900px) 22vw, 45vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 13,
            color: "var(--color-text-mid)",
            fontWeight: 300,
            fontStyle: "italic",
            marginTop: 10,
          }}
        >
          Bailey, our Bernedoodle — chief woodland officer.
        </p>

        <h3 className={styles.subHeading}>Room to run</h3>
        <InfoCardGrid
          cards={[
            {
              icon: "🌳",
              title: "15-acre woodland — off lead",
              body: "Our ancient bluebell woodland is yours to explore, and dogs can run free. Carpeted in bluebells through April and May, sniff-heaven all year round.",
            },
            {
              icon: "🌾",
              title: "Open meadow — off lead",
              body: "A big open meadow where dogs can go off the lead and properly stretch their legs, morning and evening.",
              variant: "violet",
            },
            {
              icon: "⚽",
              title: "Playing field — on lead",
              body: "Dogs are welcome on the playing field on a lead, as children share this space. The enclosed field is great for a calmer mooch.",
              variant: "gold",
            },
            {
              icon: "🐮",
              title: "Around the farm — on lead",
              body: "Leads on around the farmyard and courtyard please — the ponies, alpacas, goats and chickens live close by, and they're nosy.",
              variant: "dark",
            },
          ]}
        />

        <h3 className={styles.subHeading}>Dog-friendly beaches &amp; walks</h3>
        <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
          <strong>Sandymouth and Duckpool</strong> — our two nearest beaches — welcome dogs all
          year round, and both are spectacular: National Trust coastline, rock pools and huge
          sands at low tide. Bude&rsquo;s town beaches have summer restrictions, so{" "}
          <a
            href="https://www.visitbude.info/dog-friendly-beaches-in-bude/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--color-violet)" }}
          >
            check the latest times on Visit Bude
          </a>{" "}
          before you go. For walks from the farm gate, ask Ruth — her top tips are{" "}
          <strong>Rookery Wood, Stowe Woods and Kilkhampton Common</strong>, all walkable from
          Woodlands. And every local pub is dog friendly: Bailey particularly recommends the
          burgers at <Link href="/bush-inn-morwenstow-best-pub-cornwall/" style={{ color: "var(--color-violet)" }}>The Bush Inn at Morwenstow</Link>.
        </p>

        <h3 className={styles.subHeading}>The house rules</h3>
        <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
          A few simple things so every guest — two- and four-legged — has a great stay. Please
          bring your dog&rsquo;s own bed and bowls, plus blankets to cover any furniture they like
          to sit on. Dogs aren&rsquo;t allowed in the bedrooms or on the beds. Full details are on
          our <Link href="/dog-rules/" style={{ color: "var(--color-violet)" }}>dog guidelines page</Link>,
          or just ask — we&rsquo;re dog people, we get it.
        </p>
      </div>

      <CtaStrip
        title="Bring the dog — book your stay"
        body="All nine properties are dog friendly. Best price guaranteed when you book direct."
      />
    </>
  );
}
