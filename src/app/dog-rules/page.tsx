import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, legalStyles as s } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Dog Rules",
  description:
    "Our dog policy at Woodlands Manor Farm — well-behaved dogs are very welcome in every cottage and yurt.",
  alternates: { canonical: "/dog-rules/" },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Woodlands Manor Farm · Pet policy"
      title="Bringing"
      titleAccent="your dog"
      lastUpdated="January 2025"
      intro={
        <>
          <p style={{ marginBottom: 16 }}>
            Well-behaved dogs are very welcome at Woodlands Manor Farm in every one of our
            cottages and yurts. We have farm animals, woodland walks and miles of dog-friendly
            Cornish coastline — see our{" "}
            <Link href="/dog-friendly-holiday-cottages-bude/">dog friendly holidays page</Link> for
            everything your dog can look forward to. Below is what we ask in return.
          </p>
          <div className={s.note} style={{ marginBottom: 32 }}>
            🐕 £25 per dog per stay. Well-behaved dogs welcomed — no maximum per booking.
          </div>
        </>
      }
      sections={[
        {
          id: "general",
          title: "General rules",
          content: (
            <ul>
              <li>Dogs must be kept on a lead at all times around the farm — we have free-range animals.</li>
              <li>Please clean up after your dog throughout the farm and on local walks.</li>
              <li>
                Dogs are <strong>not permitted</strong> in the swimming pool, games room or
                children&rsquo;s soft play area.
              </li>
              <li>
                Please don&rsquo;t leave your dog unattended in the cottage. If you need to be out
                without them, talk to us — we may be able to help.
              </li>
              <li>Dogs are not allowed on furniture or beds. Please bring your own dog bed.</li>
            </ul>
          ),
        },
        {
          id: "around-animals",
          title: "Around the farm animals",
          content: (
            <>
              <p>
                Many guests bring dogs that have never been around livestock. The first time
                seeing alpacas, sheep or pigs can be exciting — please:
              </p>
              <ul>
                <li>Always keep your dog on a lead near the animal paddocks.</li>
                <li>Don&rsquo;t allow your dog to bark at, chase or stress the animals.</li>
                <li>Take care around chickens — they wander freely in the courtyard.</li>
                <li>If your dog has a strong prey drive, give the animal areas a wide berth.</li>
              </ul>
              <div className={s.warn}>
                ⚠ Worrying livestock is a criminal offence. The farmer is legally entitled to
                shoot any dog caught attacking sheep — please don&rsquo;t put us in that
                position.
              </div>
            </>
          ),
        },
        {
          id: "walks",
          title: "Walks from the farm",
          content: (
            <>
              <p>
                You can walk straight from the farm onto a dog-friendly woodland path. From there
                a short walk takes you to footpaths along the Coombe Valley and onto the South
                West Coast Path.
              </p>
              <ul>
                <li>Bluebell woodland walk — on the farm, year-round, dogs off lead allowed.</li>
                <li>Coombe Valley walk — 2 miles to Duckpool Beach (dog-friendly all year).</li>
                <li>Coast path — Duckpool to Sandymouth is one of our favourite local walks.</li>
              </ul>
            </>
          ),
        },
        {
          id: "what-we-provide",
          title: "What we provide",
          content: (
            <ul>
              <li>Dog towels in the boot room of every cottage</li>
              <li>An outdoor tap for muddy-paw rinses</li>
              <li>List of dog-friendly local pubs and beaches in your welcome pack</li>
              <li>Water bowls available on request</li>
            </ul>
          ),
        },
        {
          id: "what-to-bring",
          title: "What to bring",
          content: (
            <ul>
              <li>Your dog&rsquo;s bed</li>
              <li>Dog food &amp; bowls</li>
              <li>Lead, harness, poop bags</li>
              <li>Crate if your dog uses one</li>
            </ul>
          ),
        },
        {
          id: "if-things-go-wrong",
          title: "If something goes wrong",
          content: (
            <p>
              If your dog has an accident, breaks something or causes damage — please tell us. We
              know it happens. We&rsquo;d much rather hear about it on the day than discover it
              after you&rsquo;ve left.
            </p>
          ),
        },
      ]}
    />
  );
}
