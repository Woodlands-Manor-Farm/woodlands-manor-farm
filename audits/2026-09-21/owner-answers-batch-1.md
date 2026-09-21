# Owner answers: batch 1

Received and applied locally on 21 September 2026. These confirmations supersede the corresponding unanswered facts in the original cutover audit.

## Confirmed facts applied

| Topic | Owner confirmation | Website changes |
|---|---|---|
| Lavender | All on one level; two bathrooms; sleeps four, or ten together with Jasmine through a secret bookcase door. | Corrected layout, bathroom count, description, highlights, listing and search/social descriptions. Individual booking capacity remains four. |
| Honeysuckle | All on the ground floor. | Corrected layout headings, description, subtitle, highlights and search/social descriptions. |
| Rose | Downstairs: one double bedroom and one bathroom. Upstairs: one double, two twins and one bathroom. | Corrected both floor lists, removed the conflicting extra bathroom claim, and updated description, listing and search/social descriptions. |
| Jasmine | Three double bedrooms; secret bookcase door from the ground-floor kitchen to Lavender; combined capacity ten. | Corrected bed configurations, added connecting-door information to the description/layout/highlights/image alternative text, and updated listing and search/social descriptions. Individual booking capacity remains six. |
| The Coach House | Shower only. | Replaced bath wording with a shower room and updated listing and search/social descriptions. |
| Both yurts | One super-king bed and two single beds. | Corrected descriptions, highlights, layouts, image alternative text, listing/search/social descriptions and the glamping article caption; regenerated bundled blog content. |
| Accommodation inventory | Seven cottages and two yurts. | Corrected the dog-friendly page's cottage count and made the mix explicit in group copy. |
| Farm capacity | 46 including the yurts; camp beds can be added if agreed in advance. | Corrected the listing banner, events and offer copy; shared standard capacity is calculated from the nine property records. Camp beds are advertised only by prior agreement. |
| Dogs | £25 per dog; more than two must be agreed in advance; not on sofas or upstairs; leads around the farm. | Shared the confirmed rules across property information and both dog pages; removed unlimited-dog, sofa-cover and off-lead claims from the dog landing page, rules and metadata. Retained the existing per-stay charging basis confirmed in the question answered. |

The owner used “Jasmin” once and “Jasmine” in the next answer. The website's established “Jasmine Cottage” spelling and URLs are retained.

“Dogs on leads around farm” has been applied to the farm's woodland and meadow as well as the yard. No on-site off-lead exceptions have been advertised.

## Still awaiting answers

- The Stables bathroom count and bed configurations.
- Any further exceptions or details for the dog policy, including leaving dogs unattended.
- Camp-bed limits, charges or property restrictions, if these should be advertised. The site currently asks guests to agree arrangements in advance.
- Seasonal availability, activity schedules, pool details, offers, extras and current supplier menus.
- Correct legal entity and approved booking terms.
- Enquiry delivery details, newsletter configuration, analytics preference and relevant account access.
- Deliberate content removals, the expired competition and the intended Olive & Co venue.

This batch resolves the confirmed facts above. Other launch findings in the original audit remain open, including contact-form delivery, migration gaps, tracking and newsletter verification. These are local code changes; publishing is a separate step.

## Verification

- `npm run build` passed compilation, lint/type checks and generation of all 59 build routes.
- Inspected the generated HTML for the seven affected property pages, both listing pages, events, offers and both dog pages. Confirmed corrected layouts, bed details, group capacity and rules in the rendered output and relevant metadata.
- Individual structured-data guest capacities remain four for Lavender, six for Jasmine and four for each yurt; the connected-cottage option does not inflate individual occupancy.
- Searched the application and article source for the old 44-guest figure, unlimited-dog wording, off-lead claims and incorrect cottage count; no remaining matches.
- `git diff --check` passed.
