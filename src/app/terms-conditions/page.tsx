import type { Metadata } from "next";
import { LegalPage, legalStyles as s } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Booking terms and conditions for stays at Woodlands Manor Farm in Bude, Cornwall.",
  alternates: { canonical: "/terms-conditions/" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Woodlands Manor Farm · Legal"
      title="Terms &"
      titleAccent="conditions"
      lastUpdated="21 September 2026"
      intro={
        <p style={{ marginBottom: 32 }}>
          Your booking constitutes a contract of hire between you as the hirer and Woodlands
          Manor Farm Holidays Ltd (company number 13474637), trading as Woodlands Manor Farm, and is subject to the following conditions. To place a booking you must
          be over 18. You must ensure that everyone in your party complies with these Conditions
          of Hire.
        </p>
      }
      sections={[
        {
          id: "arrival",
          title: "Arrival & departure",
          content: (
            <p>
              The booking is from <strong>4pm on the day of arrival</strong> to{" "}
              <strong>10am on the day of departure</strong> unless otherwise agreed in writing
              with Woodlands Manor Farm.
            </p>
          ),
        },
        {
          id: "payment",
          title: "Payment & booking",
          content: (
            <>
              <p>
                Your deposit, balance due date and payment schedule are displayed in the
                booking engine before you confirm your reservation. Please refer to those
                details and your booking confirmation.
              </p>
              <div className={s.note}>
                All bookings are provisional until the hire fees are paid as shown in the booking engine and the
                owners have confirmed receipt. Provisional bookings are held for 3 days unless
                agreed otherwise by the owners.
              </div>
            </>
          ),
        },
        {
          id: "cancellation",
          title: "Cancellation",
          content: (
            <>
              <p>
                If you cancel your booking at any point after you have paid your deposit,{" "}
                <strong>your deposit is not refundable</strong>.
              </p>
              <p>
                If we have not received full payment by the due date shown in your booking confirmation,
                we will assume that you have cancelled your booking.
              </p>
              <p>
                If you cancel your booking once you have made full payment, we will only provide a
                refund if we are able to re-let the cottage. Any refund will be based on the new
                letting price, less your deposit.
              </p>
              <div className={s.warn}>
                ⚠ We strongly recommend that you take out holiday cancellation insurance.
              </div>
            </>
          ),
        },
        {
          id: "our-rights",
          title: "Our rights",
          content: (
            <>
              <p>
                We reserve the right not to hand over the cottage to anyone who in our opinion is
                not suitable to take charge, in which case we will refund the hire charges in full
                and the contract is discharged.
              </p>
              <p>We reserve the right to enter the cottages at any time during the period of hire.</p>
            </>
          ),
        },
        {
          id: "our-obligations",
          title: "Our obligations",
          content: (
            <>
              <p>
                If you tell us about anything that is not working while you are here, we undertake
                to repair or replace it with due diligence, or to make alternative arrangements.
              </p>
              <p>
                We are not liable to any claim should we be unable to do so for reasons outside
                our control, and we cannot be held responsible for the failure of public services
                such as electricity, water etc.
              </p>
            </>
          ),
        },
        {
          id: "your-obligations",
          title: "Your obligations",
          content: (
            <>
              <p>By making a booking, you agree to:</p>
              <ul>
                <li>
                  Limit the maximum number of people occupying the cottage to that stated on our
                  website, except by prior written agreement.
                </li>
                <li>
                  Be responsible for the cottage and take good care of it, leaving it clean and
                  tidy at the end of the hire period. You are responsible for extra cleaning costs
                  if necessary.
                </li>
                <li>
                  Return anything moved from one cottage to another, if your party hired more than
                  one cottage.
                </li>
                <li>
                  Ensure there is no unreasonable amount of noise within or around the cottage,
                  particularly at night, in the interests of other guests on the farm.
                </li>
                <li>
                  Tell us promptly about any failure, loss or damage to any electrical or other
                  equipment or fitment.
                </li>
                <li>
                  Pay us the cost of repairing or replacing, at our discretion, any loss or damage
                  caused to the cottage or equipment during your stay.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "smoking",
          title: "Smoking & vaping",
          content: (
            <p>
              Smoking and vaping are <strong>not permitted</strong> in the cottages or any other
              buildings, including the games room, swimming pool and agricultural sheds.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Liability",
          content: (
            <>
              <p>
                We are not responsible for the death or any injury to you, your guests or third
                parties, for loss or damage to belongings, cars or contents, or any other personal
                possessions.
              </p>
              <p>
                <strong>Parents are responsible for the safety of their children at all times.</strong>{" "}
                This includes at the swimming pool (which has no lifeguard), the playing field,
                the games room and when near the farm animals.
              </p>
            </>
          ),
        },
        {
          id: "governing-law",
          title: "Governing law",
          content: (
            <p>
              The contract of hire is governed by English Law and subject to the exclusive
              jurisdiction of the English courts.
            </p>
          ),
        },
      ]}
    />
  );
}
