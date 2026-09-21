import type { Metadata } from "next";
import Link from "next/link";
import { AboutSubnav, CtaStrip, InfoHero, infoStyles as styles } from "@/components/info/info-shell";

type Place = {
  name: string;
  meta?: string;
  body: string;
  directions: string;
};

const BEACHES: Place[] = [
  {
    name: "Crooklets & Summerleaze, Bude",
    meta: "≈ 6 miles · Lifeguards in summer",
    body: "Bude has two town beaches. Crooklets is popular with surfers, while Summerleaze is a lovely family beach with a café — Life’s a Beach — that’s great for breakfasts and snacks throughout the day. Summerleaze is also home to the famous tidal sea pool. Both beaches have lifeguards on patrol in summer.",
    directions:
      "Turn right out of our driveway back along the lane and turn right onto the A39 through Kilkhampton, following signs for Bude. Once in Bude there are signs directing you to both beaches.",
  },
  {
    name: "Duckpool",
    meta: "≈ 2 miles · National Trust · Free parking · Dog-friendly",
    body: "Our nearest beach — a dramatic, rocky little inlet popular with surfers (it’s named not for ducks, but for where witches were once “ducked”). At high tide there isn’t much beach; at low tide sand is uncovered, though recent winter storms have left it rockier than it once was. A stream flows out to the sea here — the mouth of the very stream that runs through our woods. There are rock pools to explore, and for the energetic, steep cliff walks either side of the inlet reward you with fantastic coastline views. Toilets in the car park; no charges apply.",
    directions:
      "Turn left out of our driveway and take the second left, signposted Coombe Valley. Follow the road down into a little hamlet, drive through the ford, and at the junction turn left and immediately right.",
  },
  {
    name: "Sandymouth",
    meta: "≈ 4 miles · National Trust · Café · Lifeguards in summer",
    body: "Just south of Duckpool, and probably the best sandy beach in the area — our family’s favourite. When the tide is out there’s a huge expanse of sand and lots of rock pools; when it’s in there’s no sand at all, so it’s worth checking the tide timetable before you go. There are two waterfalls, and a café selling food, drinks and ice creams. It’s a slightly steep walk back up to the car park. National Trust car park charges apply if you’re not a member.",
    directions:
      "Turn right out of our driveway back along the lane and turn right onto the A39 through Kilkhampton. Just on the outskirts of Kilkhampton village — about 500 yards past the school on the right — a brown tourist sign directs you to Sandymouth. Follow the signs.",
  },
  {
    name: "Welcombe Mouth",
    meta: "Just over the Devon border · National Trust · No facilities",
    body: "A great spot for exploring if you can navigate the bumpy lane to reach it — and it never seems to get too crowded. Dramatic rock formations and a lovely waterfall flowing out to sea. At high tide there’s no sand, but when the tide is out there are great rock pools and plenty of sand. National Trust and free to visit, though there are no facilities at the beach.",
    directions:
      "Turn right out of our driveway back along the lane and turn left onto the A39 towards Bideford. About 3 miles along, a brown tourist sign directs you left down a lane to Welcombe Mouth — keep following the signs for about 2 miles.",
  },
  {
    name: "Widemouth Bay",
    meta: "≈ 8 miles · Golden sand · Beginner surf",
    body: "One of the most popular beaches in North Cornwall, with vast expanses of golden sand at low tide — perfect for families and beginner surfers, with a gentle shelving beach and surf schools in the summer. There are cafés and shops at the beach, and The Beach House bar has been listed among the Times’ top 20 beach bars in the UK.",
    directions:
      "Turn right out of our driveway back along the lane to the A39 and follow the signs to Bude. Carry on south through the town on the coast road, following the brown tourist signs for Widemouth Bay a few miles beyond Bude.",
  },
  {
    name: "Crackington Haven",
    meta: "≈ 10 miles · Dramatic cliffs · Beach café & inn",
    body: "A hidden gem tucked into the North Cornwall coast, framed by some of the highest cliffs in Cornwall and known for its rugged, dramatic beauty. Sand and rock pools appear at low tide, with the coast path climbing spectacularly away on either side. The Coombe Barton Inn and the Haven Beach Café both serve excellent food — including some of the best crab sandwiches around.",
    directions:
      "Turn right out of our driveway back along the lane to the A39. Turn right and follow the A39 south for about 10 miles, then take the signposted turning for Crackington Haven and follow the lane down to the cove.",
  },
];

const WALKS: Place[] = [
  {
    name: "Woodlands Walk — Short Circular",
    meta: "On the farm · Starts by the pond",
    body: "We’re lucky to have 15 acres of our own woodland, with a couple of walks straight from the farm. This is the shorter circular route.",
    directions:
      "Start at the gate near the pond (‘Woodland Walk’). Go through into the field and take a diagonal left over the brow of the hill to a large wooden gate. Go through and follow the track down to the ford. Dog-leg immediately right (don’t cross the ford) along a track for about ½ mile until you reach a new large metal gate and a dug-out area — this marks the end of our land. Go through and turn right up a steep slope that bears round to the right. At the top, go through the gate into a large field. Keep right (there are often cows here — harmless but sometimes inquisitive, so walk quietly and calmly) and you’ll see a stile in the right-hand corner. Cross it and you’re back on our land behind the swimming pool. Bear left around the pool building and through the metal gate into the complex.",
  },
  {
    name: "Woodlands to Kilkhampton",
    meta: "On the farm · ≈ 50 mins one way",
    body: "The longer of our two woodland walks, following the footpath all the way into the village of Kilkhampton.",
    directions:
      "Head back up the driveway; on the right you’ll see a metal gate with a ‘Woodland Walk’ signpost. Go through into the field and take a diagonal left over the brow of the hill to a large wooden gate. Follow the track down to the ford, dog-leg immediately right (don’t cross the ford) along a wide track for about ½ mile to a new large metal gate and dug-out area — the end of our land. Go through, turn left down the slope and over the stream, then take the stile on the right. Follow the woodland footpath markers; the path eventually ends at the back road into Kilkhampton, opposite Uphill Cottage. Turn left and walk up the hill to the village (about 50 minutes one way). Retrace your steps back to Woodlands.",
  },
  {
    name: "Hawker’s Hut, Morwenstow",
    meta: "Circular · via the Bush Inn",
    body: "A short, interesting circular walk starting at St John’s Church, Morwenstow. It takes in Hawker’s Hut — a clifftop shelter built by the 19th-century vicar Robert Hawker — then up the Tidna Valley and back via the Bush Inn. The churchyard is fascinating too: Hawker insisted that seamen washed up on the foreshore be given Christian burials there. He also built the Vicarage, with chimneys modelled on the church towers of his former parishes; its grounds contain St John’s Well, dating from the 11th century and still used for baptisms.",
    directions:
      "By car, turn right out of our drive back along the lane to the A39. Turn left and follow signs to the Bush Inn / Rectory Farm Tea Rooms, and park outside the tea rooms. Between the tea rooms and the church is an information board with maps in a wooden box — take one, follow the circular route, and please return it to the box for the next person.",
  },
  {
    name: "Coombe Valley to Duckpool",
    meta: "≈ 1 hour each way · Hilly, can be muddy",
    body: "A beautiful walk through some of the loveliest parts of the valley. It’s quite hilly and can get muddy in wet weather — but well worth it.",
    directions:
      "Start in our field with the big barn and walk diagonally to the far-left corner. Go through the little metal gate hidden in the hedge and turn left onto the lane. Take the first lane left, signposted Kilkhampton, and follow it for about ½ mile to Sanctuary Farm on the right. Turn right down the farm track, past the farm and cottages, to a gate with footpath markers. Follow the markers all the way; they bring you out behind a cottage in the hamlet of Coombe. Cross the ford using the little footbridge and follow the lane to a junction. Turn left, then immediately right, signed to Duckpool, and follow the lane down to the beach. To return: retrace your steps up from the beach and back through Coombe; once over the ford, turn left past a cottage and stay on the lane (rather than the footpath), up the hill through open farmland, past Endslee Farm, over a cattle grid, and on to Lee Barton Farm. At the T-junction bear right and continue until you reach the little metal gate in our field. About an hour each way — a little more coming back, as it’s uphill!",
  },
  {
    name: "Bude Canal & Widemouth Bay",
    meta: "Easy · Mostly flat",
    body: "An easy, mostly-flat walk along the canal path, with a café and wildlife centre at the far end for the obligatory cup of tea and slice of cake. To make it a circular walk, follow the sign along the canal to the Widemouth Bay coastal path via the community woodlands, then at Widemouth turn right along the coast road following signs back into Bude. We have a copy of this walk in the office.",
    directions:
      "Park in the Visitor Centre pay & display car park, then head inland to the right of the Visitor Centre along the canal path.",
  },
  {
    name: "South West Coast Path",
    meta: "Nearest access ≈ 2 miles · National trail",
    body: "The 630-mile South West Coast Path passes just a couple of miles from the farm, and the stretch between Hartland Point and Bude is among the most spectacular in all of England — dramatic sea stacks, hidden coves, waterfalls and clifftop views the whole way. Walk as much or as little as you like, from a short there-and-back along the cliffs to a full day’s coastal hike.",
    directions:
      "Our nearest access is at Duckpool (see above): turn left out of our driveway and take the second left, signposted Coombe Valley, following the road down to the beach. You can also join the path at Sandymouth, Crooklets or Summerleaze in Bude. The cliffs are steep and unfenced in places, so wear sturdy footwear and take care near the edge.",
  },
];

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
  title: "Beaches, Walks & Local Towns near Bude",
  description:
    "Explore North Cornwall from Woodlands Manor Farm, Bude — the best beaches, coast-path and woodland walks, and characterful towns and villages like Boscastle, Tintagel, Padstow and Clovelly, all with directions from the farm.",
  alternates: { canonical: "/beaches-and-walks-near-bude/" },
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
        image="/images/bude/beach-duckpool-thrift.jpg"
        alt="Wild North Cornwall beach with sea thrift in bloom near Bude"
        eyebrow="Woodlands Manor Farm · Bude, Cornwall"
        title={
          <>
            Explore
            <br />
            <em>the area</em>
          </>
        }
        description="North Cornwall's finest beaches, coast-path and woodland walks, and characterful towns and villages — all within easy reach, with directions straight from the farm gate."
      />
      <AboutSubnav activeHref="/beaches-and-walks-near-bude/" />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>On the doorstep</p>
        <h2 className={styles.sectionTitle}>
          Beaches near <em>Woodlands</em>
        </h2>
        <p className={styles.sectionBody}>
          From our nearest wild inlet at Duckpool to the golden family sands of Sandymouth, some of
          the best of the North Cornwall coast is within a few miles of the farm. Scroll on for our
          favourite{" "}
          <a href="#towns" className={styles.inlineLink}>
            towns &amp; villages
          </a>{" "}
          too, or see our{" "}
          <Link href="/things-to-do-in-bude/" className={styles.inlineLink}>
            days out &amp; attractions
          </Link>
          .
        </p>
        <PlaceList places={BEACHES} />

        <h2 className={styles.sectionTitle}>
          Walks from <em>the farm</em>
        </h2>
        <p className={styles.sectionBody}>
          Two walks start right here on our own 15 acres, and there are beautiful valley and coastal
          routes close by. <strong>Please close all gates behind you.</strong>
        </p>
        <PlaceList places={WALKS} />

        <h2 id="towns" className={styles.sectionTitle} style={{ scrollMarginTop: 120 }}>
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
        body="Book your stay — the perfect base for beaches, coast path and countryside."
      />
    </>
  );
}
