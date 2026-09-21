# Owner answers: batch 2

Applied locally on 21 September 2026, on top of main at `325fb2f`. This supplements the original cutover audit and supersedes the corresponding pending items in batch 1. Changes have not been committed, pushed or deployed in this batch.

## Changes made

| Topic | Applied |
| --- | --- |
| Dog rules | £25 per dog per stay; more than two by prior agreement; no sofas, beds or upstairs. Leads around the farm and playing field; off lead in meadow and woodland while under control. Never left unattended; arrange dog sitting and walks with Ruth and Andy in advance. Shared policy appears on property information and dog pages. |
| Invented extras | Removed breakfast hampers and the cream-tea/fizz upgrade. Retained the existing standard welcome pack. |
| EV charging | Replaced free charging claims with instructions to download the app shown on the charger and pay the stated price, including the contact page. No app name or tariff was invented. |
| Pony experience | £25 per half hour, ages 3+, maximum two children per session, no limit on accompanying adults, available all year, advance booking. Updated farm, animals and experiences pages. |
| Animal feeding | Wednesdays 8am and Sundays 8.30am, free to all Woodlands guests, advance booking. Updated relevant pages, shared property information and the feeding article. |
| Pool | Retained the stated year-round 8am–8pm opening and approximately 30°C temperature. |
| Chef and treatments | Converted the supplied 2026 Word menu to a readable one-page PDF and replaced the old download. Nicky's copy now describes chilled delivery, at least 24 hours' notice and a £45 minimum order. Added clear spa wording for Leanne/The Hideaway Lounge, advance booking and the £50 minimum appointment. The supplied treatments PDF matches the existing tracked PDF exactly. |
| Business and payments | Corrected the booking terms to Woodlands Manor Farm Holidays Ltd, company 13474637, trading as Woodlands Manor Farm. Removed the printed deposit percentage and balance schedule; readers are directed to the booking engine and confirmation. |
| Contact details | Updated the shared telephone number and article mentions to Andy's 07887 944 161. Enquiries remain enquiries@woodlandsmanorfarm.co.uk. |
| Contact form | Replaced the simulated success with a server endpoint that sends through Brevo. Fixed recipient is the enquiries inbox; Reply-To is the guest. Missing setup and failed requests give an honest error and direct contact details. |
| Newsletter | Prepared Brevo double opt-in for list #3, Woodlands Newsletter. Server requires explicit marketing consent and requests the confirmation email. Removed opaque cross-origin submissions and false success. Visitors see “Check your inbox”, with membership only after confirmation. Setup is deferred at the user's request. |
| Analytics | Retained G-0ZPYCREFWT, loading only on the production domain after accepting analytics. Added equal accept/necessary-only choices, a footer settings button, withdrawal and local consent storage. Preview and local hosts do not load production GA. Updated the privacy description to match the forms and analytics behaviour. |
| Retained articles | Restored the June 2026 Tripadvisor article, original URL/date and local image. Removed redirects hiding four retained articles. Corrected links pointing to the old WordPress staging host. All 25 retained articles are in the sitemap and return 200. |
| Expired competition | Both `/win-a-weekend-at-woodlands-manor-farm/` and `/competition/` return 410 with a clear closed notice, no entry form and noindex. Neither appears in the sitemap. The import script also excludes the retired competition. |
| Archives | Six dated event/guide articles are labelled Archive in news listings and carry a notice that their dates/programmes/offers have passed, linking to current planning pages. Their original URLs and content remain available. |
| Restaurant | Changed the intended recommendation to The Olive Tree with https://www.olivetreebude.co.uk/. |
| Legacy links | Added three missing page aliases and permanent redirects from the old chef/treatment PDF paths to the supplied current menus. |

## Source handling

The owner messages are the controlling instructions. The three supplied documents were read as reference material. In particular, Paw Law allows covered sofas, but the newer explicit instruction prohibits sofas: the website follows the newer instruction. The old document was therefore not published unchanged as a competing policy.

The chef PDF was rendered and visually inspected after conversion. The treatment PDF was visually inspected because its content is scanned rather than selectable text.

## Verification completed

- `npm run build`: passed compilation, lint, types and 66 prerendered build routes.
- `npx opennextjs-cloudflare build`: passed and produced the Worker bundle. Existing compatibility-date advisory remains.
- `npx tsx --test tests/*.test.ts`: all eight tests passed. Includes confirmation-only list behaviour, fixed enquiry recipient, failed/duplicate provider responses, missing secrets, request validation, consent expiry and production host checks. All provider calls were mocked.
- Local Cloudflare Worker: all 25 retained articles return 200 with their own production canonical; both competition paths return 410/noindex without a form; five new redirects return 301 and reach 200 destinations; sitemap includes retained posts and excludes retired competition/confirmation landing.
- Local browser: contact and newsletter submissions with no configured provider show unavailable errors; no fake success. Cookie choices can be reopened, survive reload and do not load GA on localhost even when accepted.
- `git diff --check`: passed.

Route evidence: [owner-batch-2-checks.json](owner-batch-2-checks.json).

## Still needed before treating the site as ready for cutover

- Configure Brevo and complete real confirmation/delivery tests. The user explicitly chose to do account setup later. See [Brevo setup](../../docs/brevo-setup.md). No real email or signup was sent during this work.
- Owner's replacement offers wording (point 5), Stables bathroom/bed confirmation, and the remaining booking/cancellation/liability terms. The payment answer does not approve the rest of the contract wording.
- Verify the existing GA/Search Console accounts and real production events after deployment. An ID in code and a working consent control do not prove account ownership or reporting.
- Complete the original audit's remaining migration/media, operational and cutover checks. This batch is not a complete second audit and does not certify unreviewed historical articles or third-party offers as current.

## Subsequent GitHub merge

Merged seven newer GitHub commits through `774b153` (PR #112) into the local work. Retained the incoming combined About pages, animal profiles/video, area content and direct chef/spa booking contacts. Carried the owner-confirmed feeding/pony details into the combined farm page, and kept the invented hamper/cream-tea offers removed. Both retired standalone About URLs retain the incoming 301 redirects.

After merging, the production build passed with 64 prerendered routes, all eight existing tests passed, and the generated HTML/redirect manifest confirmed the merged content. Verified that every previously untracked file and all local tracked changes outside the four merged paths were preserved byte-for-byte. The pre-merge stash is retained as a safety backup. Combined changes remain uncommitted.
