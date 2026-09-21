import { EMAIL_PATTERN, formResponse, getBrevoEnvironment, readFormRequest, requestDoubleOptIn, textField } from "@/lib/server/brevo";

export async function POST(request: Request) {
  const data = await readFormRequest(request);
  if (!data) return formResponse({ error: "Invalid signup request." }, 400);
  const email = textField(data, "email", 254);
  if (data.website || data.marketingConsent !== true || !email || !EMAIL_PATTERN.test(email)) {
    return formResponse({ error: "Enter a valid email address and confirm you want to receive our newsletter." }, 400);
  }
  return requestDoubleOptIn(email, await getBrevoEnvironment());
}
