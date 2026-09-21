# Brevo setup before launch

Prepared on 21 September 2026. The owner chose to configure Brevo later. This work changes the website integration; it does not configure or verify the Brevo account.

## What the website does

- Newsletter popup and footer POST to `/api/newsletter/` on the website. The server requests a Brevo double opt-in email for **list 3, Woodlands Newsletter**. It never creates a contact directly on that list.
- The consent checkbox starts unchecked and is required by both the browser and server. Only an email address is collected. After Brevo accepts the confirmation request, the website says **Check your inbox**, without claiming confirmed membership.
- Brevo controls confirmation, contact membership and email delivery. The confirmation landing page is `/newsletter/confirmed/`; visiting that page alone is not proof of subscription.
- The contact form POSTs to `/api/contact/`. Brevo sends the enquiry to **enquiries@woodlandsmanorfarm.co.uk** with the guest's email as Reply-To. It does not subscribe the guest to marketing.
- Missing configuration and provider failures show an error. The enquiry acknowledgement means Brevo accepted the message for delivery, not that it reached the inbox.

## Configure Brevo

1. In Contacts → Lists, verify that list **#3** is **Woodlands Newsletter**. Keep this list reserved for subscribers who have confirmed.
2. Authenticate the sending domain and verify the sender you want to use. Enable transactional email for the account.
3. Create and activate a transactional double opt-in template. Use clear wording asking the recipient to confirm Woodlands Newsletter signup, and a confirmation button whose target is **`{{ params.DOIurl }}`**. This is Brevo's confirmation link; do not replace it with the website's thank-you URL. Record the numeric template ID.
4. Create the server API key and configure the three values below in Cloudflare Workers → woodlands-manor-farm → Settings → Variables and Secrets. Keep the API key encrypted. Never add it to a `NEXT_PUBLIC_` variable, a client component or Git.
5. Add Cloudflare rate limiting for POST requests to `/api/newsletter/` and `/api/contact/` before opening the forms publicly. The code already rejects cross-origin requests, oversized bodies, invalid data and honeypot submissions; those checks do not prevent repeated valid-looking requests.

| Variable | Value |
| --- | --- |
| `BREVO_API_KEY` | Server API key from Brevo |
| `BREVO_DOI_TEMPLATE_ID` | Numeric ID of the activated double opt-in template |
| `BREVO_SENDER_EMAIL` | Verified sender, normally `enquiries@woodlandsmanorfarm.co.uk` |

For local development, use an ignored `.env.local` with `npm run dev`, or `.dev.vars` for Wrangler preview. Both are ignored by Git. `.env.example` documents the fields. The production code reads Cloudflare Worker bindings at runtime, so these do not have to be baked into the build.

The confirmation redirect is the production URL `https://woodlandsmanorfarm.co.uk/newsletter/confirmed/`. That path becomes available on the main domain when the new website is deployed there. If testing email confirmation before cutover, a redirect to the old site's 404 page does not itself prove confirmation failed; inspect Brevo list membership and logs. Test the final redirect again after cutover.

## Owner's end-to-end test

1. Use a fresh test address you control and submit the website form with the consent box checked.
2. Confirm the website says **Check your inbox** and the confirmation email arrives.
3. Before clicking, verify the address has not joined list #3 as a confirmed subscriber.
4. Click the confirmation button. Check **Contacts → Lists → Woodlands Newsletter (#3)** and the contact's confirmation/event history. Check the link cannot add another address or re-subscribe an unsubscribed contact without a new confirmation.
5. Retain Brevo's confirmation records as evidence, and verify that newsletters include a working unsubscribe link.
6. Test a separate enquiry through the contact form, confirm it arrives in the enquiries inbox, and that replying addresses the test guest.

No emails were sent or real subscribers added during implementation. Automated tests use fake provider responses. Confirm delivery and consent records in Brevo before treating either form as launch-ready.

## Reference

- [Brevo double opt-in endpoint](https://developers.brevo.com/reference/create-doi-contact)
- [Brevo signup and double opt-in guidance](https://help.brevo.com/hc/en-us/articles/208771869-Create-a-sign-up-form-in-Brevo)
