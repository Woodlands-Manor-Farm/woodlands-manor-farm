/**
 * Newsletter & chat configuration.
 *
 * The signup popup and the footer signup form both post to `formActionUrl`.
 * Until it is filled in, the popup and footer form stay hidden — so this is
 * safe to deploy before the mailing-list account is ready. To preview the
 * popup design without a form URL, visit any page with `?newsletter=preview`.
 *
 * Supported providers — paste the embedded-form action URL from either:
 *
 * — Brevo (recommended — chat, popups and email in one system):
 *   Contacts → Forms → create a form → share → the URL in the form's
 *   `action="…sibforms.com/serve/…"` attribute.
 *
 * — Mailchimp:
 *   Audience → Signup forms → Embedded forms → the URL in the form's
 *   `action="…list-manage.com/subscribe/post?u=…&id=…"` attribute.
 *
 * For Brevo's live-chat widget, paste the Conversations ID from
 * Brevo → Conversations → Settings → Chat widget (the value assigned to
 * `BrevoConversationsID` in their install snippet) into `brevoConversationsId`.
 */
export const NEWSLETTER: {
  formActionUrl: string;
  brevoConversationsId: string;
  /** How long a visitor browses before the popup appears (ms). */
  popupDelayMs: number;
  /** After dismissing, don't show the popup again for this many days. */
  dismissCooldownDays: number;
} = {
  formActionUrl: "",
  brevoConversationsId: "",
  popupDelayMs: 8000,
  dismissCooldownDays: 30,
};
