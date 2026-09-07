import type { Metadata } from "next";
import Image from "next/image";
import {
  AboutSubnav,
  CtaStrip,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";
import m from "@/components/marketing/marketing.module.css";

export const metadata: Metadata = {
  title: "The Little Extras",
  description:
    "Welcome packs, breakfast hampers, a private chef, in-cottage spa treatments, grocery delivery and EV charging — the optional extras you can arrange before your stay.",
  alternates: { canonical: "/the-little-extras/" },
};

// NOTE: card images are stand-ins reused from elsewhere on the site —
// to be replaced with dedicated photos for each extra.
const EXTRAS = [
  {
    img: "/images/rose-cottage/rose-kitchen.jpg",
    alt: "Welcome pack essentials in a cottage kitchen at Woodlands Manor Farm",
    type: "Included",
    name: "Welcome pack",
    body: "Tea, coffee, milk, sugar, herbs, salt and pepper waiting on the kitchen counter — included free with every stay. Add a Cornish cream tea or a bottle of Camel Valley fizz for £25.",
    detail: "Free with every stay",
  },
  {
    img: "/images/jasmine-cottage/jasmine-dining.jpg",
    alt: "Breakfast laid out in a cottage dining room at Woodlands Manor Farm",
    type: "Pre-order",
    name: "Breakfast hamper",
    body: "Local sourdough, free-range eggs, smoked bacon and a pint of fresh milk delivered for your first morning — £18 for two, £30 for four.",
    detail: "£18 for two · £30 for four",
  },
  {
    img: "/images/the-manor-house/manor-dining-room.jpg",
    alt: "A dining table set for a meal at Woodlands Manor Farm",
    type: "Private chef",
    name: "Call for a Cook",
    body: "If you would like to have a lovely meal ready for your arrival or have a special event and would rather rely on the expertise of an outside caterer, we have an excellent private chef called Nicky who will deliver to your cottage.",
    link: { href: "/menus/private-chef-menu.pdf", label: "View Nicky's sample menu (PDF)" },
  },
  {
    img: "/images/the-coach-house/coach-lounge-kitchen.jpg",
    alt: "A cottage kitchen at Woodlands Manor Farm",
    type: "Delivered",
    name: "Grocery Shopping",
    body: "If you wish to arrange for one of the supermarkets to deliver your food shopping to you at your cottage, then Tesco, Waitrose, Asda and Sainsbury's all offer this service. Our postcode is EX23 9HT should you require it.",
    detail: "Postcode: EX23 9HT",
  },
  {
    img: "/images/home/farm-courtyard-cottages.jpg",
    alt: "The courtyard and cottages at Woodlands Manor Farm",
    type: "On site",
    name: "EV charging",
    body: "Free type 2 EV charger on site for guests. Plug in when you arrive — no need to pre-book, just let us know if you'd like priority.",
    detail: "Free · Type 2 connector",
  },
  {
    img: "/images/home/c2909c0800e4042d.jpg",
    alt: "The heated indoor pool at Woodlands Manor Farm",
    type: "Pamper",
    name: "Spa Treatment",
    body: "Why not treat yourself or your partner to a bit of pampering during your stay with us? We have a qualified therapist called Leanne who offers a wide range of treatments. She can carry out the treatments in the comfort of your own cottage.",
    detail: "In the comfort of your cottage",
  },
  {
    img: "/images/farm/playing-field-slide.jpg",
    alt: "Children playing at Woodlands Manor Farm",
    type: "Family",
    name: "Babies & toddlers",
    body: "We are extremely baby and child-friendly. We can provide a cot, highchair, baby bath, nappy bin, changing mat, bottle steriliser, plastic cutlery, bowls, plates and socket covers. For toddlers: bed guard, potty, step, toilet seat and booster seat. Just ask when booking.",
    detail: "Just ask when booking",
  },
  {
    img: "/images/the-manor-house/manor-snug.jpg",
    alt: "A cottage sitting room at Woodlands Manor Farm",
    type: "Included",
    name: "Super-fast broadband",
    body: "Woodlands Manor Farm has a super-fast broadband connection and complimentary WiFi throughout all cottages and yurts — strong enough for working, streaming and video calls at the same time.",
    detail: "Complimentary WiFi throughout",
  },
  {
    img: "/images/farm/bluebell-woodland.jpg",
    alt: "The woodland at Woodlands Manor Farm",
    type: "Eco",
    name: "Recycling on site",
    body: "We have recycling bins on site for glass, paper, cardboard and tin. We provide kitchen essentials to cut down on waste, and use eco-friendly cleaning products throughout.",
    detail: "Glass · paper · card · tin",
  },
];

export default function Page() {
  return (
    <>
      <InfoHero
        image="/images/blog-template/6acc248ff59e6e43.jpg"
        alt="The little extras at Woodlands Manor Farm"
        eyebrow="Woodlands Manor Farm · Optional extras"
        title={
          <>
            The little <em>extras</em>
          </>
        }
        description="Welcome packs, breakfast hampers, a private chef, in-cottage spa treatments, grocery delivery and EV charging — the small things you can arrange before you arrive."
      />
      <AboutSubnav activeHref="/the-little-extras/" />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>Pre-book before you arrive</p>
        <h2 className={styles.sectionTitle}>
          Make your stay <em>easier</em>
        </h2>
        <p className={styles.sectionBody}>
          Some things make a holiday — a welcome pack waiting for you, a private chef cooking
          dinner, a spa treatment in your cottage, the shopping already in the fridge. Add these
          when you book, or drop us a line and we&rsquo;ll sort it.
        </p>

        <div className={m.experienceGrid}>
          {EXTRAS.map((e) => (
            <article key={e.name} className={m.expCard}>
              <div className={m.expCardImg}>
                <Image src={e.img} alt={e.alt} fill sizes="(min-width: 900px) 33vw, 100vw" />
              </div>
              <div className={m.expCardBody}>
                <div className={m.expType}>{e.type}</div>
                <div className={m.expName}>{e.name}</div>
                <p className={m.expBody}>{e.body}</p>
                <div className={m.expDetail}>
                  {e.link ? (
                    <a
                      href={e.link.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--color-violet)", textDecoration: "none", fontWeight: 500 }}
                    >
                      {e.link.label} →
                    </a>
                  ) : (
                    e.detail
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CtaStrip
        title="Add the extras when you book"
        body="Or call Andy & Ruth and we'll sort it for you."
      />
    </>
  );
}
