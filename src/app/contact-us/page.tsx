import type { Metadata } from "next";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Woodlands Manor Farm, phone, email, address, directions and the contact form.",
  alternates: { canonical: "/contact-us/" },
};

export default function Page() {
  return <ContactClient />;
}
