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
  formActionUrl:
    "https://85327b1a.sibforms.com/serve/MUIFACuLdg6JxeeKsHa2AMxDNeOZw0DKPPr879r-k06EhDzNXj2oS1-vugqK7Eqa6UOz-pjnPWbGeE3_cLyjLqVEmb4hSjn8od4eRkIQTHRV3AVmdGVu7zD8F3uN9hAWfWwl8F0gDuy_Sqw3On0ccYi8H4nqU86Tr_4u4C1mPiWiE3588sBUb4rw7TzM2nb79baNnRnSetPrd_yOZA==",
  brevoConversationsId: "",
  popupDelayMs: 8000,
  dismissCooldownDays: 30,
};
