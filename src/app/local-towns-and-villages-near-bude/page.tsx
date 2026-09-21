import type { Metadata } from "next";
import { AboutSubnav, CtaStrip, InfoHero, infoStyles as styles } from "@/components/info/info-shell";

type Place = {
  name: string;
  meta?: string;
  body: string;
  directions: string;
};

const TOWNS: Place[] = [
  {
    name: "Bude",
    meta: "≈ 6 miles · Our nearest town",
    body: "Our nearest large town, right on the coast, mixing contemporary style with old-fashioned charm. There are plenty of independent shops and a wide choice of restaurants, coffee shops and pubs to suit every budget. Take time to stroll along the canal — it has one of only two lock gates in the whole of the UK that open straight into the sea. Bude has two beaches: Crooklets, perfect for surfers, and Summerleaze, ideal for families, with its famous sea-water pool alongside. The golf club sits above the town with glorious views out to sea.",
    directions:
      "Turn right out of our drive back along the lane to the A39. Turn right and follow the signs to Bude. As you enter the town you’ll see a ‘Welcome to Bude’ sign — turn left here to park at the Visitor Centre pay & display and walk along the canal past the artisan shops in the old canal buildings; or turn right at the roundabout for the town centre, where you’ll usually find parking along the roads.",
  },
  {
    name: "Bodmin",
    meta: "≈ 1 hour · Bodmin Jail & Shire Hall",
    body: "Famous for its moors, but with plenty to do in the town too. Bodmin Jail is well worth a visit, as is the Shire Hall’s courtroom experience, where you take a seat as a member of the jury in a re-creation of a real Victorian murder trial. In 1844, on the wind-swept slopes of Rough Tor on Bodmin Moor, the body of local girl Charlotte Dymond was found — a murder that has intrigued people ever since. You weigh the evidence and decide whether the accused, Matthew Weeks, is guilty, before a tour of the original holding cells where prisoners awaited their fate: transportation, hard labour, or death by hanging.",
    directions:
      "Turn right out of our drive back along the lane to the A39. Turn right and stay on the A39. Just past Camelford, take the B3266 signposted Bodmin and follow the signs all the way into the town. About an hour’s drive.",
  },
  {
    name: "Boscastle",
    meta: "≈ 14 miles · National Trust harbour",
    body: "One of the few remaining unspoilt harbour villages in Cornwall, set in an Area of Outstanding Natural Beauty within the parish of Forrabury and Minster. The National Trust cares for the medieval harbour and surrounding coastline. Once a busy trading port with Wales, Bristol and the south of England, the little harbour now shelters a handful of fishing boats. A lovely valley heads inland, where a path follows a fast-flowing stream to several hidden churches and the little-known connection between North Cornwall and the writer Thomas Hardy. The village is perhaps best remembered for the dramatic flash floods of August 2004, the worst in local memory.",
    directions:
      "Turn right out of our drive back along the lane to the A39. Turn right and stay on the A39 for about 12 miles, then just after Wainhouse Corner take the B3263 signposted Tintagel and Boscastle.",
  },
  {
    name: "Clovelly",
    meta: "Just over the Devon border · Admission charge · Steep cobbles",
    body: "The cobbled, traffic-free high street of this world-famous fishing village tumbles down a 400-foot cliff, past whitewashed cottages festooned with flowers, to a tiny working port. It’s famous for its donkeys, which traditionally carried goods up the hill while sledges brought things down, and has links to Charles Kingsley, Turner, Dickens and even the Spanish Armada. The New Inn in the heart of the village and the Red Lion by the quay serve good food, and there’s a gift shop, tearoom and a café and shop back at the visitor centre. Unusually, the village has been privately owned by the same family since 1738, who keep it in mid-19th-century style using traditional materials and craftsmanship — part of the entrance fee funds that work.",
    directions:
      "Turn right out of our drive back along the lane to the A39. Turn left and follow the road for about 10 miles to the roundabout, where signs point left for Clovelly. It’s a very steep slope down to the harbour, so sturdy footwear is advised. Admission charges apply — check current prices before you visit.",
  },
  {
    name: "Tintagel",
    meta: "≈ 12 miles · King Arthur legend",
    body: "A pretty town famous for its association with the legend of King Arthur and the Knights of the Round Table. There’s plenty to see, including the visitor centre, the Pixie House, the medieval Old Post Office (National Trust) and a great Cornish pasty shop or two. Tintagel Castle, on its dramatic headland, is owned by the Duchy of Cornwall and cared for by English Heritage.",
    directions:
      "Turn right out of our drive back along the lane to the A39. Turn right and stay on the A39 for about 12 miles, then just after Wainhouse Corner take the B3263 signposted Tintagel and Boscastle.",
  },
  {
    name: "Port Isaac",
    meta: "≈ 31 miles · Doc Martin & Poldark",
    body: "An attractive fishing village since the 14th century, its narrow winding streets lined with old white-washed cottages. In more recent years it has been the location for the television series Doc Martin and Poldark. Park at the top of the village and walk down through the lanes to the working harbour, where fishing and scenic boat trips run in the summer months. There’s a good fish-and-chip shop at the top of the hill and plenty of restaurants and cafés specialising in the local catch of the day.",
    directions:
      "Turn right out of our drive back along the lane to the A39 and follow signs towards Camelford. Just before Camelford, take the B3314 signposted Port Isaac. About 31 miles from us.",
  },
  {
    name: "Padstow",
    meta: "≈ 32 miles · Rick Stein’s harbour town",
    body: "Known to locals as ‘Padstein’, thanks to chef Rick Stein’s many establishments here. Nestling on the beautiful Camel estuary, this working port wears a holiday hat well: a colourful harbour ringed by pastel-washed medieval houses, with excellent boutiques and independent shops filling the little lanes. Relax at peaceful Harbour Cove with its sandy beach and estuary views, or take the ferry across to Rock and the hushed church of St Enodoc, where Sir John Betjeman is buried. No fewer than seven bays lie within a five-minute drive. It gets very busy in summer, so a good tip is to park in Rock and catch the passenger ferry across.",
    directions:
      "Turn right out of our drive back along the lane to the A39. Turn right and stay on the A39 for about 32 miles, following signs to Wadebridge, then follow signs to Padstow just before you reach the town.",
  },
  {
    name: "Newquay",
    meta: "≈ 40 miles · Surf resort & family beaches",
    body: "Cornwall’s best-known surfing resort, with excellent beaches and wide, family-friendly bays. Boat trips run from the harbour, from half-day pleasure cruises to a full day’s sea fishing. Just up the coast at Watergate Bay you’ll find Jamie Oliver’s former restaurant Fifteen’s old home and a string of beachfront eateries.",
    directions:
      "Turn right out of our drive back along the lane to the A39. Turn right and stay on the A39 for about 40 miles, following signs to Wadebridge and then St Columb Major. At the roundabout, take the A392 signposted Newquay.",
  },
];

export const metadata: Metadata = {
  title: "Local Towns & Villages near Bude",
  description:
    "The best towns and villages to explore from Woodlands Manor Farm, Bude — Bude, Boscastle, Tintagel, Padstow, Port Isaac, Clovelly and more, with directions from the farm.",
  alternates: { canonical: "/local-towns-and-villages-near-bude/" },
};

function PlaceList({ places }: { places: Place[] }) {
  return (
    <div style={{ display: "grid", gap: 28, marginTop: 8, marginBottom: 40 }}>
      {places.map((p) => (
        <div
          key={p.name}
          style={{
            background: "#fff",
            border: "1px solid rgba(127,151,137,0.15)",
            borderRadius: 4,
            padding: "24px 26px",
          }}
        >
          <h3 className={styles.subHeading} style={{ marginTop: 0, marginBottom: p.meta ? 4 : 10 }}>
            {p.name}
          </h3>
          {p.meta ? (
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-violet)",
                marginBottom: 12,
              }}
            >
              {p.meta}
            </div>
          ) : null}
          <p className={styles.sectionBody} style={{ marginBottom: 16 }}>
            {p.body}
          </p>
          <div
            style={{
              borderLeft: "3px solid var(--color-warm-stone)",
              padding: "10px 0 10px 16px",
              fontSize: 13.5,
              lineHeight: 1.75,
              fontWeight: 300,
              color: "var(--color-text-mid)",
              background: "rgba(173,191,185,0.08)",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-deep-green)",
                marginBottom: 4,
                fontWeight: 500,
              }}
            >
              Directions from the farm
            </span>
            {p.directions}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <InfoHero
        image="/images/bude/bude-sea-pool.jpg"
        alt="Bude sea pool and coastline in North Cornwall"
        eyebrow="Woodlands Manor Farm · Bude, Cornwall"
        title={
          <>
            Local towns
            <br />
            <em>&amp; villages</em>
          </>
        }
        description="From our nearest town at Bude to Cornwall's prettiest harbour villages, here are the places we love to explore — each with directions straight from the farm gate."
      />
      <AboutSubnav activeHref="/local-towns-and-villages-near-bude/" />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>Out and about</p>
        <h2 className={styles.sectionTitle}>
          Towns &amp; villages to <em>explore</em>
        </h2>
        <p className={styles.sectionBody}>
          North Cornwall and the north Devon border are dotted with characterful towns and unspoilt
          fishing villages, from Rick Stein’s Padstow to the cobbled lanes of Clovelly — most within
          an easy drive of Woodlands.
        </p>
        <PlaceList places={TOWNS} />
      </div>

      <CtaStrip
        title="Explore North Cornwall from Woodlands."
        body="Book your stay — the perfect base for coast, countryside and Cornwall’s prettiest villages."
      />
    </>
  );
}
