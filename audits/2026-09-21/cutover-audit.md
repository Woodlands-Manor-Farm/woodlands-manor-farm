# Woodlands Manor Farm: final content and SEO cutover audit

**Reviewed:** 21 September 2026  
**Recommendation:** Hold the cutover until the launch gates below are closed.  
**Repository:** `09f70eb9337048a67312ceca2284f9683dd0c44a` on `main`  
**Preview:** [Cloudflare preview](https://woodlands-manor-farm.woodlands-manor-farm.workers.dev/)  
**Existing website:** [woodlandsmanorfarm.co.uk](https://woodlandsmanorfarm.co.uk/)

**Implementation update:** [Owner answers, batch 1](owner-answers-batch-1.md) records the confirmed property, capacity and dog-policy corrections now applied locally. The findings below remain the original audit snapshot.

The site has a sound technical base: the production build passes, key pages render useful content, booking calendars load, and the preview is correctly excluded from search. However, the contact form currently discards enquiries, several accommodation descriptions contradict one another, and some existing content would disappear or be redirected away at cutover. Those are material launch issues.

This audit created reports only. Application code, live content and DNS were not changed. No enquiries, newsletter subscriptions or paid bookings were submitted.

## Scope and evidence

| Check | Result |
|---|---|
| Preview HTML | 51 distinct directly served pages reviewed for headings, metadata, canonical URLs, links and content |
| Blog migration | 26 published WordPress posts compared with 24 local article files; 20 articles reachable at their original URLs |
| Existing URLs | All 88 URL entries in the five live WordPress sitemaps, plus 46 additional paths discovered in existing content |
| Initial preview crawl | 147 paths, including redirect variants, sitemap entries and a nonexistent URL |
| New sitemap | 51 entries; 47 return a direct 200, four redirect |
| Redirect configuration | All 23 configured mappings reach a 200 page; four mappings conflict with retained articles |
| External links | 182 distinct destinations checked; errors and uncertain results recorded separately |
| Referenced local assets | 264 distinct image/PDF assets return 200; all 311 tested rendered image-transform URLs also return 200 |
| Local production build | `npm run build` passed compilation, lint/type checks and route generation |
| Browser smoke checks | Homepage, booking calendar and mobile Lavender page; mobile calendar loaded with the correct property and no page-width overflow at 390px |

An HTTP 200 means the resource was served; a 404 means it was not found. A permanent redirect (301 or 308) sends visitors and search engines to a replacement URL. A canonical URL tells search engines which version of a page should be treated as the main one.

The accompanying CSVs provide page metadata, migration decisions and external-link evidence. Statuses reflect the audit time and can change. Source review covered all 24 article files and the main content data/templates; external factual verification was targeted at discrepancies, not every historical claim.

## 1. Launch gates

### L1. Make the contact form deliver enquiries

**Verified defect.** On `/contact-us/`, the submit handler only calls `preventDefault()` and `setSubmitted(true)`. There is no request, server action or delivery service. The visitor is nevertheless told “Thanks — we’ve got it” and promised a reply within the day.

**Evidence:** [contact-client.tsx](../../src/app/contact-us/contact-client.tsx), lines 28–40.

**Required:** Connect a working delivery endpoint and show success only after acceptance. Verify receipt in the intended inbox with a controlled test and test failure handling. If delivery cannot be ready, remove the form and use the existing email and telephone links for launch.

### L2. Agree one accurate accommodation specification

**Verified contradictions; the correct facts require owner confirmation.** Guests rely on floor levels, bed configurations and bathrooms when choosing accommodation. Both the listing and detail pages must agree with SuperControl and the actual properties.

| Property/topic | Conflicting statements | Required decision |
|---|---|---|
| Lavender | Listing says entirely on one level and two bathrooms. Detail lists first-floor bedrooms and one bathroom. | Confirm floor plan, bathroom count and connection to Jasmine. |
| Honeysuckle | Listing says ground floor/open plan. Detail puts the bedroom and bathroom on the first floor. | Confirm whether any stairs are required. |
| Rose | Listing promises a ground-floor bedroom and bathroom. Detail puts all four bedrooms upstairs; ground-floor list only names a cloakroom. | Correct floor-by-floor layout. |
| The Stables | Description says two bedrooms, both en suite. Statistics show one bathroom; layout describes a family bathroom. | Confirm two bathrooms/en suites and bed configurations. |
| Jasmine | Listing says three doubles and a connecting bookcase door to Lavender. Detail says one king plus two twins and omits the connection. | Confirm zip-and-link options and connected booking arrangement. |
| The Coach House | Bathroom image description says a shower room; layout specifies a bath with shower over. | Confirm the actual bathroom specification. |
| Both yurts | Property pages say king-size; About and the launch article say super-king. | Confirm bed dimensions and use the same wording. |
| Group capacity | Nine property capacities total 46; group/offer copy advertises 44. | Confirm the permitted saleable maximum; do not assume the sum is the approved group capacity. |
| Accommodation count | Dog-friendly landing page says nine cottages **and** two yurts. | Correct to seven cottages and two yurts if that remains the inventory. |

**Evidence:** [listing-content.ts](../../src/lib/data/listing-content.ts), [property-content.ts](../../src/lib/data/property-content.ts), `/bude-holiday-cottages/`, the nine property pages and `/dog-friendly-holiday-cottages-bude/`.

Use one shared source for guest capacities, bedrooms, bathrooms and bed arrangements, including the machine-readable property data used by search engines.

### L3. Preserve existing content and resolve redirect conflicts

**Verified defects.** These four articles still exist in the repository and appear in the new sitemap/blog navigation, but permanent redirects intercept them:

| Existing article URL | Preview destination |
|---|---|
| `/woodlands-manor-farm-local-beaches/` | `/things-to-do-in-bude/` |
| `/local-surf-schools-bude/` | `/things-to-do-in-bude/` |
| `/fishing-in-and-around-bude/` | `/things-to-do-in-bude/` |
| `/whats-on-in-bude-cornwall-february-half-term/` | `/news/` |

The destinations do not reproduce the full articles. Prefer restoring the existing article URLs and correcting their stale links. If consolidation is intentional, preserve the useful content in an equivalent destination and remove redirected URLs from the sitemap and article cards.

The live June 2026 article `/woodlands-manor-farm-wins-a-tripadvisor-travellers-choice-award-2026/` is missing entirely and returns 404 on preview. Restore it with its original URL, date and media.

The other missing post, `/win-a-weekend-at-woodlands-manor-farm/`, is an expired competition. Choose an explicit outcome: retain a clearly closed archive, redirect to a genuinely equivalent successor, or intentionally retire it with 404/410 after checking its search visits and incoming links. Expired content does not automatically need a redirect.

Four useful aliases still work on the old website but become 404 on preview:

| Old alias | Suggested mapping, matching the current live destination |
|---|---|
| `/elementor-10201/` | `/bude-holiday-cottages/` |
| `/about/` | `/on-the-farm/` |
| `/competition/` | `/special-offers/` |
| `/what-to-do-woodlands/` | `/about-woodlands-manor-farm-holiday-cottages-with-a-pool/` |

Also review the 43 category, tag and author URLs in the existing sitemaps. All return 404 on preview. Many may be safe to retire, but search and backlink data are needed to prioritise them. Do not redirect every removed URL to the homepage.

Media needs a migration decision too: the old chef-menu PDF, beauty-treatment PDF and a sampled WordPress image URL return 404. The chef menu has a new working destination, `/menus/private-chef-menu.pdf`; confirm it is the intended replacement before mapping it. Inventory valuable old `/wp-content/uploads/` URLs from search data and the old media export. This audit sampled legacy media and did not test every historical upload.

**Evidence:** [next.config.ts](../../next.config.ts), lines 18–64; [sitemap.ts](../../src/app/sitemap.ts); `migration-map.csv`.

Google recommends mapping changed URLs and media, using relevant permanent redirects and retaining redirects for at least a year. Submit the new sitemap after launch. The domain is staying the same, so a Search Console Change of Address is not needed. [Google site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

### L4. Confirm offers, dog rules and booking terms

**Owner decisions, not proven false statements.** The new site makes specific promises that could not be verified against booking-system configuration or an approved policy document.

| Area | Evidence requiring agreement |
|---|---|
| Special offers | Up to 20% late availability within 14 days; 10% for seven nights or more; up to 15% returning guests; spring breaks from £495 for four nights with wine; off-peak breaks from £325 for three nights. Confirm eligible units, dates, exclusions and discount combinations. Also clarify whether booking three properties really grants the advertised exclusive-use group rate. |
| Offer wording | “All applied automatically” conflicts with offers requiring a code or call. The spring offer says currently available during a September audit without identifying a future year. |
| Extras | Breakfast hampers £18/£30, £25 treats, free Type 2 EV charging, and pony experience from £35 with specified age/duration/season. These need current supplier and owner confirmation. |
| Dogs | Old site says maximum two per cottage; new rules say no maximum per booking. New pages disagree on furniture and where dogs may be off lead. |
| Contracting business | Booking terms use “Woodlands Manor Farm Ltd”; footer/privacy/website terms use “Woodlands Manor Farm Holidays Ltd”, company number 13474637. Confirm and standardise the correct legal entity. |
| Booking conditions | Confirm 33% deposit, eight-week balance date, cancellation and liability wording against the actual booking contract. The broad death/injury waiver warrants a qualified review before publication. |

The old WordPress terms contain unrelated template material, so they are not a reliable source for the new contract. Use the business's approved terms and actual booking rules.

**Evidence:** `/special-offers/`, `/the-little-extras/`, `/on-the-farm/`, `/dog-rules/`, `/dog-friendly-holiday-cottages-bude/`, `/terms-conditions/`, `/website-terms/`, `/privacy/`; `content-decisions.csv`.

### L5. Finish analytics privacy controls and verify newsletter delivery

**Analytics:** Google Analytics loads automatically and calls `gtag('config', …)` without a consent/preference mechanism. Its script was observed before interaction. The privacy notice directs visitors to browser settings or Google's add-on, rather than a site control.

Before launch, either implement the appropriate consent controls or disable this tracking pending review. Current ICO guidance includes a limited statistical-purpose exception; relying on it requires meeting its conditions, explaining the purpose and offering a simple, free means of objecting. The repository provides no evidence that this configuration meets those conditions. Browser settings alone do not establish that requirement. [Current ICO exceptions guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/).

**Newsletter:** The configured Brevo submission uses `fetch(..., { mode: 'no-cors' })`. Its opaque response cannot be inspected, yet any resolved request displays “you’re on the list”. This is a verified weakness in success/error handling, not proof every signup fails. Verify a controlled opt-in through to list entry and confirmation email; use a provider-supported confirmation flow or a server endpoint that can validate the result. Keep the existing unchecked marketing opt-in.

**Evidence:** [google-analytics.tsx](../../src/components/marketing/google-analytics.tsx), [newsletter-form.tsx](../../src/components/marketing/newsletter-form.tsx), lines 38–45 and 93–119. Also exclude the preview hostname from production analytics reporting.

### L6. Correct misleading local advice and broken booking-related links

**Verified content defects:**

- `/things-to-do-in-bude/` calls Bude Sea Pool safe “whatever the weather”. Remove this blanket assurance and link to current conditions. The operator warns against swimming when the sea washes over the walls around high tide. [Bude Sea Pool conditions](https://www.budeseapool.org/live-conditions/).
- `/places-to-eat-in-bude/`: three destinations have unresolved hostnames (`www.oliveandco-bude.co.uk`, `www.sandymouthcafe.co.uk`, `www.coombebartoninn.com`); `thebushinn.co.uk` failed the HTTPS check. Verified alternatives include [The Bush Inn](https://www.thebushinnmorwenstow.com/), [Sandymouth Café](https://sandymouth.com/) and [The Coombe Barton Inn](https://coombebarton.co.uk/). Recheck each card's description and distance when replacing its link.
- The Olive & Co business located in this audit identifies itself at Siblyback Lake near Liskeard. Confirm which venue the Bude card intends to recommend before changing its URL. [Olive & Co's own website](https://www.olivecocafe.com/about-us).
- `www.teyluglass.co.uk` does not resolve, and the Visit Cornwall Boscastle URL returns 404. Replace with verified current destinations or remove the links.
- Five reachable articles still link to `wmfarmprod.wpenginepowered.com`; four of those visible links lead to missing cottage/yurt pages. Replace all legacy-host article links with the correct site-relative URLs, including those in the four currently redirected article files.
- The family-holidays article links to `www.woodlandsmanorfarm.ci.uk`; change it to the real site. The October 2024 half-term article's “head to our blog” link is an encoded sentence and resolves to a 404. The restaurants article contains the Bush Inn URL pasted twice into one link, also a 404.

`external-link-checks.csv` contains every checked external destination and source page. A 403, timeout or transport error is marked uncertain unless independently confirmed. These results must not be described as all being broken links.

## 2. Editorial and SEO improvements

Complete the first two rows before launch; the remaining improvements can follow the launch gates.

| Priority | Finding | Action |
|---|---|---|
| Before launch | Cycling article displays `#gallery-1` CSS and a WordPress source comment as ordinary text. | Delete this migration residue from `content/blog/discover-the-breathtaking-cycling-routes-of-north-cornwall.md:14`; check the article after rebuilding. |
| Before launch | Glamping article presents Plymouth as an arrival airport. | Remove this travel suggestion and confirm current routes to operating airports. Council records describe the airport's closure in 2011. [Plymouth council record](https://democracy.plymouth.gov.uk/documents/s140669/Minutes%20of%20Previous%20Meeting.pdf). |
| Soon | Booking.com award article uses “Traveller(s') Choice”, which is confused with the Tripadvisor award name. | Correct the title, body, excerpt and relevant alt text to the award actually received. Booking.com calls its scheme Traveller Review Awards. Preserve the existing slug. [Booking.com announcement](https://news.booking.com/traveller-review-awards-2026-celebrate-181-million-partners-worldwide-and-reveal-the-most-welcoming-destinations-for-the-year-ahead/). |
| Soon | Past event articles retain future-tense invitations; latest migrated news is May 2026, and the glamping article mixes 2024 text with a 2025 slug. | Mark date-bound pieces as archives and link to current verified information; update evergreen guidance without changing established URLs unnecessarily. Restore the newer June award article first. |
| Soon | Literary-festival article promises animal feeding each morning; other pages specify Sunday/Wednesday. | Apply the agreed schedule consistently. |
| Soon | Offers and farm page contain literal `he&rsquo;ll` / `you&rsquo;ll` in JavaScript strings. Other small errors include “marekting”, “local stories” and “ake a dip”. | Correct the text and visually proof the rebuilt pages. |
| Soon | Outdoor guides recommend particular swimming spots and cycling routes without verified access/route details. | Check against venue rules and official route maps before continuing to recommend them; avoid blanket safety claims. Permission for the individual sites was not established in this audit. |
| Soon | All 50 non-home pages inherit the homepage Twitter title; Open Graph page URL is missing on 32 pages, while 18 non-home pages use the homepage URL. | Set page-specific social titles, descriptions, URLs and appropriate images. These affect shared-link previews; the HTML canonical tags are a separate system. |
| Soon | Several property search descriptions are very short and seven cottage titles omit Bude/Cornwall. | Add useful location and differentiators such as pool, beds and dog policy where accurate. Character counts are guidance, not a ranking rule. |
| Soon | Resort schema reports 116 reviews, homepage copy 115 and reviews page 121. The coded coordinates are labelled approximate and differ from the linked Maps place by about 1.6 km. | Use one sourced review count and the verified business location. Current code: `50.8924,-4.5283`; linked Maps place: `50.8857761,-4.5085812`. |
| Later | VacationRental structured data is valid JSON but lacks required fields for Google's dedicated rental presentation, including identifier, coordinates and contained accommodation occupancy; only one image is supplied per property. | If this search feature is a goal, check programme eligibility and implement the complete supported model. This is not a barrier to ordinary indexing. [Google rental structured-data requirements](https://developers.google.com/search/docs/appearance/structured-data/vacation-rental). |
| Later | Static sitemap dates are set to the current build date; blog dates use publication rather than actual modification. | Use meaningful modification dates or omit optional dates. |
| Later | Old reviews alias serves a 200 page with canonical pointing to `/reviews/`. | Consider a permanent redirect to simplify the duplicate. The existing canonical already signals the preferred URL. |

The site already has relevant pages for cottages with a pool near Bude, dog-friendly stays and yurts in North Cornwall. Improve their accuracy and preserve the established useful guides before commissioning more SEO articles. Keyword volumes, competitive difficulty and ranking opportunity were not measured.

## 3. What already works

- Every one of the 51 directly served HTML pages has one main heading, a title, a description and one canonical URL. Fifty are self-canonical; the reviews alias points to `/reviews/`.
- Preview responses carry `X-Robots-Tag: noindex, nofollow`, correctly keeping the workers.dev copy out of search. This header is host-dependent in middleware. A local request with the production hostname did not carry it.
- The three legal pages intentionally use a page-level noindex directive and are absent from the sitemap. This is not a launch defect.
- The new `/sitemap.xml` and robots file exist, reference the production domain and cover core accommodation/content pages. Remove the four redirecting entries as described above.
- A deliberately nonexistent preview URL returns a real 404, rather than a successful page that merely looks like an error.
- The referenced images and menu PDF load, image alternative-text attributes exist, and image optimisation responses tested successfully.
- General and property-specific SuperControl calendars load. The mobile Lavender calendar identifies the expected property. No purchase or end-to-end booking was attempted.
- Contact telephone, email, address and navigation are present; core commercial pages are rendered in the HTML, rather than depending on a crawler running the booking widget.
- Current live HTTP/www variants redirect to HTTPS without www. DNS already contains a Google verification record; absence of the old verification meta tag on preview alone is not evidence Search Console ownership will be lost.

## 4. Cutover acceptance checklist

### Before changing traffic

- [ ] L1: real enquiry arrives in the monitored inbox; failure does not show success, or the form is replaced with working contact links.
- [ ] L2/L4: owners approve property specifications, total capacity, dog rules, offers, extras and the correct booking terms; pages agree with SuperControl.
- [ ] L3: latest award article restored; four article redirects resolved; alias/media mappings and intentional retirements recorded; sitemap contains only the intended direct canonical pages.
- [ ] L5: analytics controls match the chosen privacy approach; newsletter subscription and confirmation are demonstrated with a controlled address, or newsletter capture is removed for launch.
- [ ] L6/editorial: misleading safety/travel advice, legacy booking links, malformed URLs and visible migration debris corrected.
- [ ] Booking: verify a representative cottage and yurt date selection, price, party size, extras and checkout handoff. Confirm pricing and terms without placing an unintended real booking.
- [ ] Save the old site/media export and current DNS configuration; retain a rollback target and the ability to restore it.
- [ ] Export existing Search Console landing pages/clicks and important incoming links to prioritise the remaining old URL decisions. Record current analytics baseline.

### Immediately after routing the production domain

- [ ] HTTPS works on apex and www; HTTP and www permanently redirect to the chosen HTTPS apex and preserve paths. The local app itself did not redirect www, so the deployment/edge rule needs verification.
- [ ] Public pages on the real domain return 200, the correct production canonical and **no unintended noindex** in either headers or HTML. Keep the preview excluded.
- [ ] Test homepage, each property, booking page, contact route, restored award article, old redirects and a random 404 from outside the deployment environment.
- [ ] Fetch robots and sitemap from the real domain; submit `/sitemap.xml` in the existing Search Console property and inspect representative URLs.
- [ ] Check enquiry delivery, newsletter confirmation, booking handoff and analytics behaviour once on the real hostname.
- [ ] Confirm mail DNS records were preserved and the website's public email still receives mail.

### After launch

Review Search Console indexing, 404s, landing-page traffic and booking/enquiry conversion over the following days and weeks. Retain useful redirects for at least a year. Investigate specific losses against the saved baseline; no audit can guarantee unchanged rankings during migration.

## Limits of this sign-off

This is a content, migration and technical SEO audit of the public preview and repository, compared with public WordPress data. OpenSEO was unavailable, so direct HTTP crawls, source inspection and browser checks were used. There was no Search Console, backlink database, private SuperControl configuration or approved commercial-policy document available. Consequently, traffic/backlink value, offer validity and private delivery configuration were not verified.

Production-domain routing, TLS and crawler headers on the new host can only be confirmed once that domain reaches it (or via an equivalent deployment test). No Lighthouse or field Core Web Vitals assessment, exhaustive device/accessibility test, independent property inspection or legal certification was performed. The legal and commercial items above identify discrepancies and decisions requiring the appropriate owner or adviser.

The audit is complete; launch readiness remains conditional on closing the gates and passing the production checks.
