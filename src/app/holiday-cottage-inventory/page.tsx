import type { Metadata } from "next";
import {
  AboutSubnav,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

export const metadata: Metadata = {
  title: "Holiday Cottage Inventory",
  description:
    "Every appliance, utensil and amenity provided in our self-catering cottages and yurts at Woodlands Manor Farm.",
  alternates: { canonical: "/holiday-cottage-inventory/" },
};

const KITCHEN = [
  "Electric kettle & toaster",
  "Coffee pot / cafetière",
  "Saucepans (large, medium, small) with lids",
  "Large pasta / stock pot",
  "Frying pan",
  "Casserole dish & lid",
  "Oven roasting tray & baking sheet",
  "Pie dish & cake tin",
  "Chopping boards (×4)",
  "Kitchen scales",
  "Mixing bowl & salad bowl with servers",
  "Colander & grater",
  "Ladle, slotted spoon & fish slice",
  "Wooden spoon & whisk",
  "Bread knife, carving knife & fork",
  "Small vegetable knife",
  "Knife sharpener & garlic press",
  "Potato masher & peeler",
  "Tin opener, corkscrew & bottle opener",
  "Scissors",
  "Rolling pin",
  "Measuring jug",
  "Oven gloves & tea towels (×2)",
  "Tray & bread bin",
  "Orange juice squeezer",
  "Ice cube tray",
  "Butter dish, sugar basin, milk jug",
];

const DINING = [
  "Dinner plate (large & small)",
  "Cereal / soup bowl",
  "Fork, knife & dessert spoon",
  "Soup spoon & teaspoon",
  "Tea cup & saucer",
  "Coffee mug",
  "Wine glass",
  "Beer glass & tumbler",
  "Egg cup",
];

const HOUSEHOLD = [
  "2 rolls lavatory paper per WC",
  "Bin liners & disposal bags",
  "Dishwasher powder (where applicable)",
  "Hand soap / dispenser",
  "General purpose cleaner",
  "Washing up liquid & J cloths",
  "Washing machine powder / liquid",
  "Toilet cleaner",
];

const PER_BED = [
  "Mattress protector",
  "2 pillows per person + protectors",
  "1 duvet",
  "Bed linen (changed for stays of 2+ weeks)",
];

const BATHROOM = [
  "1 bath towel & 1 hand towel per person",
  "Bath mat",
  "Disposal bin",
  "Lavatory brush & container",
  "Mirror",
];

const APPLIANCES = [
  "Hair-dryer",
  "Iron & ironing board",
  "Vacuum cleaner",
  "Washing up bowl",
  "Dustpan & brush & broom",
  "Floor mop",
  "Laundry basket & clothes airer",
  "Fire blanket & fire extinguisher",
  "Smoke detectors",
  "Carbon monoxide tester (where applicable)",
];

const WOODBURNERS = [
  "First basket of logs provided",
  "Fire guard & fire irons",
  "Safety matches & fire lighters",
];

const MISC = [
  "4 coat hangers per person",
  "Clothes pegs & washing line",
  "Torch & batteries",
  "Recycling containers",
  "Shaver point / adapter plug",
  "Flower vase & door mat",
  "Pre-arrival information email",
];

export default function Page() {
  return (
    <>
      <InfoHero
        image="/images/about/f768b622b6cab139.jpg"
        alt="Holiday cottage inventory at Woodlands Manor Farm"
        eyebrow="Woodlands Manor Farm · Inventory"
        title={
          <>
            Cottage <em>inventory</em>
          </>
        }
        description="Every appliance, utensil and amenity provided in our self-catering cottages and yurts."
      />
      <AboutSubnav activeHref="/holiday-cottage-inventory/" />

      <section className={styles.band} style={{ background: "#fff" }}>
        <div className={styles.bandInner} style={{ maxWidth: 1100 }}>
          <p className={styles.eyebrow}>Full list of what&rsquo;s provided</p>
          <h2 className={styles.sectionTitle}>
            Cottage <em>inventory</em>
          </h2>
          <p className={styles.sectionBody} style={{ marginBottom: 40 }}>
            At Woodlands Manor Farm we provide a full inventory in every cottage and yurt. From
            hairdryer to pie dish, we aim to provide everything you need. The list below shows
            what is included so you can decide what to bring.
          </p>

          <div className={styles.invGrid}>
            <div className={styles.invCol}>
              <h3>Kitchen, one per property</h3>
              <ul>
                {KITCHEN.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.invCol}>
              <h3>Dining, per person (+ 2 spare)</h3>
              <ul>
                {DINING.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Household items (initial supply)</h3>
              <ul>
                {HOUSEHOLD.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Per bed</h3>
              <ul>
                {PER_BED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.invCol}>
              <h3>Bathroom</h3>
              <ul>
                {BATHROOM.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Appliances</h3>
              <ul>
                {APPLIANCES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Wood-burners (where applicable)</h3>
              <ul>
                {WOODBURNERS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Miscellaneous</h3>
              <ul>
                {MISC.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.noteBox}>
            <div>
              <p className={styles.noteBoxLabel}>Please bring</p>
              <p className={styles.noteBoxText}>
                Beach towels · Cot bedding (if needed) · Dog beds, bowls &amp; leads · Any
                specific toiletries or personal items
              </p>
            </div>
            <div>
              <p className={styles.noteBoxLabel}>On-site farm facilities</p>
              <p className={styles.noteBoxText}>
                Heated indoor pool · Games room · EV charger · Laundry · Super-fast broadband
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
