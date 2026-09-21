import { deliverEnquiry, EMAIL_PATTERN, formResponse, getBrevoEnvironment, readFormRequest, textField } from "@/lib/server/brevo";

export async function POST(request: Request) {
  const data = await readFormRequest(request);
  if (!data || data.website) return formResponse({ error: "Invalid enquiry." }, 400);
  const name = textField(data, "name", 120);
  const email = textField(data, "email", 254);
  const phone = textField(data, "phone", 50);
  const topic = textField(data, "topic", 100);
  const message = textField(data, "message", 5000);
  if (!name || !email || !EMAIL_PATTERN.test(email) || !message || phone === null || topic === null) {
    return formResponse({ error: "Please provide your name, a valid email address and a message of up to 5,000 characters." }, 400);
  }
  return deliverEnquiry({ name, email, phone, topic, message }, await getBrevoEnvironment());
}
