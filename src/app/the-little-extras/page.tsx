import type { Metadata } from "next";
import {
  AboutSubnav,
  CtaStrip,
  InfoCardGrid,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

export const metadata: Metadata = {
  title: "The Little Extras",
  description:
    "Welcome packs, breakfast hampers, a private chef, in-cottage spa treatments, grocery delivery and EV charging — the optional extras you can arrange before your stay.",
  alternates: { canonical: "/the-little-extras/" },
};

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

        <InfoCardGrid
          cards={[
            {
              icon: "🧺",
              title: "Welcome pack",
              body: "Tea, coffee, milk, sugar, herbs, salt and pepper waiting on the kitchen counter — included free with every stay. Add a Cornish cream tea or a bottle of Camel Valley fizz for £25.",
            },
            {
              icon: "🍳",
              title: "Breakfast hamper",
              body: "Local sourdough, free-range eggs, smoked bacon and a pint of fresh milk delivered for your first morning — £18 for two, £30 for four.",
              variant: "violet",
            },
            {
              icon: "🧑‍🍳",
              title: "Call for a Cook",
              body: "If you would like to have a lovely meal ready for your arrival or have a special event and would rather rely on the expertise of an outside caterer, we have an excellent private chef called Nicky who will deliver to your cottage.",
              variant: "gold",
              link: { href: "/menus/private-chef-menu.pdf", label: "View Nicky's sample menu (PDF)" },
            },
            {
              icon: "🛒",
              title: "Grocery Shopping",
              body: "If you wish to arrange for one of the supermarkets to deliver your food shopping to you at your cottage, then Tesco, Waitrose, Asda and Sainsbury's all offer this service. Our postcode is EX23 9HT should you require it.",
              variant: "dark",
            },
            {
              icon: "⚡",
              title: "EV charging",
              body: "Free type 2 EV charger on site for guests. Plug in when you arrive — no need to pre-book, just let us know if you'd like priority.",
            },
            {
              icon: "💆",
              title: "Spa Treatment",
              body: "Why not treat yourself or your partner to a bit of pampering during your stay with us? We have a qualified therapist called Leanne who offers a wide range of treatments. She can carry out the treatments in the comfort of your own cottage.",
              variant: "violet",
            },
            {
              icon: "👶",
              title: "Babies & toddlers",
              body: "We are extremely baby and child-friendly. We can provide a cot, highchair, baby bath, nappy bin, changing mat, bottle steriliser, plastic cutlery, bowls, plates and socket covers. For toddlers: bed guard, potty, step, toilet seat and booster seat. Just ask when booking.",
              variant: "gold",
            },
            {
              icon: "📶",
              title: "Super-fast broadband",
              body: "Woodlands Manor Farm has a super-fast broadband connection and complimentary WiFi throughout all cottages and yurts — strong enough for working, streaming and video calls at the same time.",
              variant: "dark",
            },
            {
              icon: "♻️",
              title: "Recycling on site",
              body: "We have recycling bins on site for glass, paper, cardboard and tin. We provide kitchen essentials to cut down on waste, and use eco-friendly cleaning products throughout.",
            },
          ]}
        />
      </div>

      <CtaStrip
        title="Add the extras when you book"
        body="Or call Andy & Ruth and we'll sort it for you."
      />
    </>
  );
}
