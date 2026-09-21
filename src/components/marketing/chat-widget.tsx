"use client";

import { useCallback, useState } from "react";
import { NEWSLETTER } from "@/lib/constants/newsletter";

/**
 * Brevo Conversations live chat — gated so nothing loads (and no cookie is
 * set) until the visitor actually clicks the bubble. We render our own
 * launcher; the first click injects Brevo's script and opens the chat, after
 * which Brevo's own launcher/window takes over.
 */
export function ChatWidget() {
  const [activated, setActivated] = useState(false);

  const openChat = useCallback(() => {
    const id = NEWSLETTER.brevoConversationsId;
    if (!id) return;

    const w = window as unknown as {
      BrevoConversations?: ((...args: unknown[]) => void) & { q?: unknown[] };
      BrevoConversationsID?: string;
    };

    if (!activated) {
      // Standard Brevo install snippet — only runs now, on first click.
      w.BrevoConversationsID = id;
      w.BrevoConversations =
        w.BrevoConversations ||
        function (...args: unknown[]) {
          (w.BrevoConversations!.q = w.BrevoConversations!.q || []).push(args);
        };
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://conversations-widget.brevo.com/brevo-conversations.js";
      document.head?.appendChild(s);
      setActivated(true);
    }

    // Queued until the script loads, then opens the chat window.
    w.BrevoConversations?.("openChat", true);
  }, [activated]);

  // No ID configured, or Brevo's own launcher has taken over — render nothing.
  if (!NEWSLETTER.brevoConversationsId || activated) return null;

  return (
    <button
      type="button"
      aria-label="Open live chat"
      onClick={openChat}
      className="fixed bottom-6 right-6 z-[500] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-violet)] text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-violet)]"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </button>
  );
}
