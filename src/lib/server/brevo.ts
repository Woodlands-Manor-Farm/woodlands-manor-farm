import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SITE } from "@/lib/constants/seo";

export type BrevoEnvironment = {
  BREVO_API_KEY?: string;
  BREVO_DOI_TEMPLATE_ID?: string;
  BREVO_SENDER_EMAIL?: string;
};

export async function getBrevoEnvironment(): Promise<BrevoEnvironment> {
  // Next.js development/Node hosting; secrets are never exposed to client code.
  if (process.env.BREVO_API_KEY) return {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_DOI_TEMPLATE_ID: process.env.BREVO_DOI_TEMPLATE_ID,
    BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
  };
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env as BrevoEnvironment;
  } catch {
    return {};
  }
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function formResponse(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Reject cross-site posts, oversized payloads and malformed JSON before any email is sent. */
export async function readFormRequest(request: Request): Promise<Record<string, unknown> | null> {
  if (request.headers.get("origin") !== new URL(request.url).origin) return null;
  if (!request.headers.get("content-type")?.startsWith("application/json")) return null;
  if (Number(request.headers.get("content-length") ?? 0) > 12000) return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12000) { await reader.cancel(); return null; }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown> : null;
  } catch {
    return null;
  }
}

export function textField(data: Record<string, unknown>, key: string, max: number): string | null {
  const value = data[key];
  if (value === undefined || value === null) return "";
  if (typeof value !== "string" || value.length > max) return null;
  return value.trim();
}

export async function requestDoubleOptIn(
  email: string,
  env: BrevoEnvironment,
  send: typeof fetch = fetch,
) {
  const templateId = Number(env.BREVO_DOI_TEMPLATE_ID);
  if (!env.BREVO_API_KEY || !Number.isSafeInteger(templateId) || templateId < 1) {
    return formResponse({ error: "Newsletter signup is temporarily unavailable. Please try again later." }, 503);
  }
  try {
    const response = await send("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        includeListIds: [3], // Woodlands Newsletter: membership follows email confirmation.
        templateId,
        redirectionUrl: `${SITE.url}/newsletter/confirmed/`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    // Do not treat duplicates or provider errors as a successful confirmation request.
    if (response.status !== 201) {
      return formResponse({ error: "We couldn’t request your confirmation email. Please try again later." }, response.status === 429 ? 429 : 502);
    }
    return formResponse({ status: "confirmation_required" });
  } catch {
    return formResponse({ error: "We couldn’t reach our email service. Please try again later." }, 502);
  }
}

export type Enquiry = { name: string; email: string; phone: string; topic: string; message: string };

export async function deliverEnquiry(enquiry: Enquiry, env: BrevoEnvironment, send: typeof fetch = fetch) {
  const sender = env.BREVO_SENDER_EMAIL;
  if (!env.BREVO_API_KEY || !sender || !EMAIL_PATTERN.test(sender)) {
    return formResponse({ error: `The message service is temporarily unavailable. Please email ${SITE.contact.email} or call ${SITE.contact.phoneDisplay}.` }, 503);
  }
  try {
    const response = await send("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: { email: sender, name: SITE.name },
        to: [{ email: SITE.contact.email, name: "Ruth and Andy" }],
        replyTo: { email: enquiry.email, name: enquiry.name },
        subject: `Website enquiry: ${enquiry.topic || "General enquiry"}`,
        textContent: `Name: ${enquiry.name}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone || "Not supplied"}\nTopic: ${enquiry.topic || "General enquiry"}\n\n${enquiry.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (response.status !== 201) throw new Error("Email provider did not accept enquiry");
    const result = await response.json() as { messageId?: string };
    if (!result.messageId) throw new Error("No delivery reference returned");
    return formResponse({ status: "accepted" });
  } catch {
    return formResponse({ error: `We couldn’t confirm your message was sent. Please email ${SITE.contact.email} or call ${SITE.contact.phoneDisplay}.` }, 502);
  }
}
