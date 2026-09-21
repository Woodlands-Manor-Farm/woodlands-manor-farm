import assert from "node:assert/strict";
import test from "node:test";
import { deliverEnquiry, readFormRequest, requestDoubleOptIn } from "../src/lib/server/brevo";
import { POST as newsletterPost } from "../src/app/api/newsletter/route";
import { POST as contactPost } from "../src/app/api/contact/route";

const env = { BREVO_API_KEY: "test-only-key", BREVO_DOI_TEMPLATE_ID: "42", BREVO_SENDER_EMAIL: "sender@example.com" };
const enquiry = { name: "Example Guest", email: "guest@example.com", phone: "", topic: "Booking enquiry", message: "Dates please" };
const neverSend: typeof fetch = async () => { throw new Error("Unexpected provider call"); };
function request(data: unknown, origin = "https://woodlandsmanorfarm.co.uk") {
  return new Request("https://woodlandsmanorfarm.co.uk/api/newsletter/", {
    method: "POST", headers: { origin, "Content-Type": "application/json" }, body: JSON.stringify(data),
  });
}

test("missing or invalid configuration fails clearly without sending", async () => {
  for (const config of [{}, { ...env, BREVO_DOI_TEMPLATE_ID: "0" }, { ...env, BREVO_DOI_TEMPLATE_ID: "NaN" }]) {
    assert.equal((await requestDoubleOptIn("guest@example.com", config, neverSend)).status, 503);
  }
  assert.equal((await deliverEnquiry(enquiry, {}, neverSend)).status, 503);
});

test("newsletter calls only double opt-in and selects list 3 after confirmation", async () => {
  let calls = 0;
  const fake: typeof fetch = async (url, init) => {
    calls++;
    assert.equal(url, "https://api.brevo.com/v3/contacts/doubleOptinConfirmation");
    assert.equal(init?.method, "POST");
    assert.deepEqual(JSON.parse(String(init?.body)), {
      email: "guest@example.com", includeListIds: [3], templateId: 42,
      redirectionUrl: "https://woodlandsmanorfarm.co.uk/newsletter/confirmed/",
    });
    return new Response(null, { status: 201 });
  };
  const result = await requestDoubleOptIn("guest@example.com", env, fake);
  assert.deepEqual(await result.json(), { status: "confirmation_required" });
  assert.equal(result.headers.get("cache-control"), "no-store");
  assert.equal(calls, 1);
});

test("provider errors, duplicates, rate limits and outages never become success", async () => {
  for (const status of [200, 400, 409, 429, 500]) {
    const response = await requestDoubleOptIn("guest@example.com", env, async () => new Response(null, { status }));
    assert.equal(response.status, status === 429 ? 429 : 502);
    assert.equal((await response.json()).status, undefined);
  }
  assert.equal((await requestDoubleOptIn("guest@example.com", env, async () => { throw new Error("timeout"); })).status, 502);
});

test("contact sends to the farm inbox with guest reply-to and requires a delivery reference", async () => {
  const fake: typeof fetch = async (url, init) => {
    assert.equal(url, "https://api.brevo.com/v3/smtp/email");
    const body = JSON.parse(String(init?.body));
    assert.equal(body.sender.email, "sender@example.com");
    assert.deepEqual(body.to, [{ email: "enquiries@woodlandsmanorfarm.co.uk", name: "Ruth and Andy" }]);
    assert.equal(body.replyTo.email, enquiry.email);
    assert.match(body.textContent, /Dates please/);
    return Response.json({ messageId: "test-reference" }, { status: 201 });
  };
  assert.deepEqual(await (await deliverEnquiry(enquiry, env, fake)).json(), { status: "accepted" });
  assert.equal((await deliverEnquiry(enquiry, env, async () => Response.json({}, { status: 201 }))).status, 502);
  assert.equal((await deliverEnquiry(enquiry, env, async () => new Response(null, { status: 400 }))).status, 502);
});

test("request guard rejects cross-site, oversized, malformed and non-object submissions", async () => {
  assert.equal(await readFormRequest(request({}, "https://other.example")), null);
  assert.equal(await readFormRequest(request({ message: "a".repeat(13000) })), null);
  assert.equal(await readFormRequest(request([])), null);
  assert.equal(await readFormRequest(request(null)), null);
  const malformed = new Request("https://woodlandsmanorfarm.co.uk/api/contact/", {
    method: "POST", headers: { origin: "https://woodlandsmanorfarm.co.uk", "content-type": "application/json" }, body: "{",
  });
  assert.equal(await readFormRequest(malformed), null);
  assert.deepEqual(await readFormRequest(request({ email: "guest@example.com" })), { email: "guest@example.com" });
});

test("newsletter route requires explicit consent and contact validates fields before sending", async () => {
  for (const data of [
    { email: "guest@example.com" }, { email: "guest@example.com", marketingConsent: "true" },
    { email: "bad", marketingConsent: true }, { email: "guest@example.com", marketingConsent: true, website: "spam" },
  ]) assert.equal((await newsletterPost(request(data))).status, 400);
  for (const data of [{}, { ...enquiry, message: "a".repeat(5001) }, { ...enquiry, website: "spam" }]) {
    assert.equal((await contactPost(request(data))).status, 400);
  }
});
