import type { Metadata } from "next";
import Link from "next/link";
import { InfoHero, infoStyles as styles } from "@/components/info/info-shell";

export const metadata: Metadata = {
  title: "Newsletter confirmation",
  description: "Thank you for confirming your Woodlands Manor Farm newsletter subscription.",
  alternates: { canonical: "/newsletter/confirmed/" },
  robots: { index: false, follow: true },
};

export default function NewsletterConfirmedPage() {
  return <>
    <InfoHero image="/images/farm/bluebell-woodland.jpg" alt="Bluebell woodland at Woodlands Manor Farm"
      eyebrow="Woodlands Manor Farm" title={<>Thanks for <em>confirming</em></>}
      description="We look forward to sharing farm news and offers with you. You can unsubscribe using the link in any newsletter." />
    <div className={styles.pageContent}><Link href="/">Back to Woodlands Manor Farm →</Link></div>
  </>;
}
