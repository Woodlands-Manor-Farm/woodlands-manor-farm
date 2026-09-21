import assert from "node:assert/strict";
import test from "node:test";
import { CONSENT_MAX_AGE, isProductionHost, readAnalyticsChoice } from "../src/lib/analytics/consent";

test("consent starts undecided and expires after 180 days", () => {
  const now = 1800000000000;
  for (const value of [null, "garbage", "{}", JSON.stringify({ choice: "accepted", savedAt: now + 1 }), JSON.stringify({ choice: "accepted", savedAt: now - CONSENT_MAX_AGE })]) {
    assert.equal(readAnalyticsChoice(value, now), null);
  }
  for (const choice of ["accepted", "declined"]) {
    assert.equal(readAnalyticsChoice(JSON.stringify({ choice, savedAt: now - 1000 }), now), choice);
  }
});

test("production analytics is never enabled for preview or local hosts", () => {
  assert.equal(isProductionHost("woodlandsmanorfarm.co.uk"), true);
  assert.equal(isProductionHost("www.woodlandsmanorfarm.co.uk"), true);
  for (const host of ["localhost", "127.0.0.1", "woodlands-manor-farm.woodlands-manor-farm.workers.dev", "woodlandsmanorfarm.co.uk.example.com"]) {
    assert.equal(isProductionHost(host), false);
  }
});
