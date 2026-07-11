import Script from "next/script";
import { NEWSLETTER } from "@/lib/constants/newsletter";

/**
 * Brevo Conversations live-chat bubble. Renders nothing until
 * `NEWSLETTER.brevoConversationsId` is set (see lib/constants/newsletter.ts).
 */
export function ChatWidget() {
  if (!NEWSLETTER.brevoConversationsId) return null;

  return (
    <Script id="brevo-conversations" strategy="lazyOnload">
      {`
        (function(d, w, c) {
          w.BrevoConversationsID = ${JSON.stringify(NEWSLETTER.brevoConversationsId)};
          w[c] = w[c] || function() { (w[c].q = w[c].q || []).push(arguments); };
          var s = d.createElement('script');
          s.async = true;
          s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
          if (d.head) d.head.appendChild(s);
        })(document, window, 'BrevoConversations');
      `}
    </Script>
  );
}
