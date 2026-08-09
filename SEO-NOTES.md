# SEO Notes — FJ Security Solutions Rebuild

## 1. Why this rebuild happened (read this first)

Search Console data (1 May – 31 July 2026) showed 775 impressions but only
33 clicks, most of which the client confirmed were his own visits. Real
external click volume was effectively zero. Five causes, all addressed in
this rebuild:

1. **Split domain authority** — the homepage was appearing under three
   separate URLs (`https://fjsecuritysolutions.com.au/`,
   `https://www.fjsecuritysolutions.com.au/`, and the `http://` version),
   splitting 92% of all impressions across three competing entries instead
   of consolidating into one.
2. **Zero impressions on every service and suburb page.** On inspection,
   the existing service/suburb pages didn't contain thin marketing copy —
   they contained meta-commentary about their own SEO process ("this page
   focuses on one of the strongest opportunities in the current search
   data"). That's not something a customer searching for a CCTV installer
   would ever want to read, and it's a stronger explanation for the zero
   impressions than thin content alone. Every page has been rewritten with
   genuine, customer-facing copy.
3. **The branded term "fj security" ranked position 7.3**, behind
   competitors named JJ, JD and JB Security — a sign Google wasn't
   confident which entity was "the" FJ Security Solutions.
4. **Zero structured data anywhere** — no rich results, no FAQ snippets,
   no local business presence in search.
5. **~44% of impressions were junk** from 30+ countries with no
   relevance to a Logan trade business, pointing to weak local entity
   signals.

## 2. DNS / canonical consolidation — ACTION REQUIRED (client, not code)

The rebuilt site's `sitemap.xml`, every canonical tag, every internal link,
every Open Graph URL and every JSON-LD `url`/`@id` now consistently use
**`https://fjsecuritysolutions.com.au`** (apex, https, non-www) — verified
by grep across the whole build (see Section 6). This matches what the
*existing* sitemap.xml on the live site already declared, which means the
three-URL split is a **DNS/hosting configuration issue, not a code issue**
— no amount of on-page work fixes it. At the registrar, you (or whoever
manages DNS) need to:

1. Confirm the apex domain (`fjsecuritysolutions.com.au`) has **A records**
   pointing at GitHub Pages' IP addresses:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. Confirm the `www` subdomain has a **CNAME record** pointing at
   `<username>.github.io` (or wherever the Pages site resolves), so `www`
   **redirects to the apex** rather than resolving as an independent,
   separately-crawlable site. If `www` is currently serving its own copy
   of the site instead of redirecting, that's the direct cause of the
   www-variant impressions in Search Console.
3. In the GitHub repository's **Settings → Pages**, confirm "Enforce
   HTTPS" is turned on, so the `http://` variant 301-redirects to
   `https://` instead of serving content directly.
4. The `CNAME` file in this project root already contains
   `fjsecuritysolutions.com.au` (apex, no www) — don't change this to a
   `www.` value or GitHub Pages will start serving the wrong canonical
   host.

None of this can be done from the codebase — it needs registrar/DNS
access.

## 3. Titles & meta descriptions (all 16 pages)

All titles are under 60 characters, all descriptions are 140–158
characters, and every description is unique (verified programmatically,
zero duplicates).

| URL | Title | Description |
|---|---|---|
| /  | FJ Security Solutions \| Logan CCTV & Alarm Installer | Licensed, locally owned CCTV, alarm, intercom and data cabling installer serving Logan, Brisbane and the Gold Coast. Hikvision & Dahua. Call 0410 740 669. |
| /services.html | Security Installation Services \| Logan, Brisbane, GC | CCTV, alarm, intercom and WiFi/data cabling installation services for Logan, Brisbane and the Gold Coast. Compare options and request a free quote. |
| /service-areas.html | Service Areas \| Logan, Brisbane & Gold Coast Installer | FJ Security Solutions covers Logan, Brisbane and the Gold Coast, plus surrounding South East Queensland suburbs. Find your local area page here. |
| /about.html | About FJ Security Solutions \| Logan Installer | FJ Security Solutions is a locally owned, licensed and insured security installer serving Logan, Brisbane and the Gold Coast. Meet the team. |
| /contact.html | Contact FJ Security Solutions \| Free Quote | Call 0410 740 669 or send a quote request to FJ Security Solutions for CCTV, alarms, intercoms or data cabling across Logan, Brisbane & Gold Coast. |
| /cctv-installation.html | CCTV Installation Logan \| Licensed Installer, Free Quote | CCTV installation for Logan, Brisbane & Gold Coast homes & businesses. Hikvision & Dahua, NVR storage, app viewing. Licensed & insured. Call 0410 740 669. |
| /alarm-systems.html | Alarm Systems Logan \| Wired, Wireless & Hybrid Installer | Alarm system installation for Logan, Brisbane & Gold Coast. Wired, wireless & hybrid options for homes & businesses. Licensed & insured. Call 0410 740 669. |
| /intercom-installation.html | Intercom Installation Logan \| Door & Gate Systems | Video intercom installation for doors and gates in Logan, Brisbane & Gold Coast. App access, homes and businesses. Licensed & insured. Call 0410 740 669. |
| /wifi-data-cabling.html | WiFi & Data Cabling Logan \| Structured Network Cabling | Structured cabling and network setups for Logan, Brisbane & Gold Coast homes and businesses, built to support CCTV and connected devices. Call 0410 740 669. |
| /logan.html | Security Systems Logan \| CCTV, Alarms & Intercoms | CCTV, alarm, intercom and data cabling installer based in Logan, covering Springwood, Beenleigh, Loganholme, Park Ridge & more. Call 0410 740 669. |
| /brisbane.html | CCTV Installation Brisbane \| Alarms & Intercoms | CCTV, alarm, intercom and data cabling installation across Brisbane, from Sunnybank to Chermside. Queenslander-friendly cabling. Call 0410 740 669. |
| /gold-coast.html | CCTV Installation Gold Coast \| Alarms & Intercoms | CCTV, alarm, intercom and data cabling installer covering the Gold Coast, from Southport to Coomera and Pimpama. Licensed & insured. Call 0410 740 669. |
| /cctv-installation-logan.html | CCTV Installation Logan \| Security Cameras, Free Quote | CCTV installation across Logan — Underwood, Slacks Creek, Park Ridge & Jimboomba. Hikvision & Dahua, NVR storage. Licensed installer. Call 0410 740 669. |
| /alarm-systems-logan.html | Alarm Systems & Repairs Logan \| Free Quote | Alarm system installation and repairs across Logan. Wired, wireless & hybrid, plus servicing existing panels. Licensed installer. Call 0410 740 669. |
| /cctv-installation-brisbane.html | CCTV Installation Brisbane \| Queenslanders & Units | CCTV camera installation across Brisbane, including Queenslanders and townhouses. Hikvision & Dahua, NVR storage. Licensed installer. Call 0410 740 669. |
| /cctv-installation-gold-coast.html | CCTV Installation Gold Coast \| Homes & High-Rise | CCTV camera installation across the Gold Coast, from high-rise units to new estate homes. Hikvision & Dahua. Licensed installer. Call 0410 740 669. |

## 4. Search Console actions — ACTION REQUIRED (client)

1. In Search Console, submit the updated `sitemap.xml`
   (`https://fjsecuritysolutions.com.au/sitemap.xml`) under **Sitemaps**.
2. Use **URL Inspection → Request Indexing** on the nine pages that
   previously showed zero impressions: `cctv-installation.html`,
   `alarm-systems.html`, `intercom-installation.html`,
   `wifi-data-cabling.html`, `logan.html`, `brisbane.html`,
   `gold-coast.html`, plus the four new pages once they're live.
3. Once DNS is fixed (Section 2), add and verify all host variants
   (`https://`, `https://www.`) as properties in Search Console if not
   already, so you can confirm traffic actually consolidates onto the
   apex over the following weeks rather than just assuming it worked.
4. Expect a lag of days to a few weeks before re-crawled pages show
   updated impressions — this isn't instant.

## 5. Structured data implemented

Every page carries static (non-JS-injected) JSON-LD, validated
structurally against schema.org shapes:

- **`SecuritySystemInstaller`** (LocalBusiness) on all 16 pages, sharing
  one consistent `@id` (`https://fjsecuritysolutions.com.au/#business`) so
  Google ties every mention back to a single entity — this is the direct
  fix for "fj security" losing to JJ/JD/JB Security on brand search.
- **`Service`** on the 4 core service pages and 4 service×suburb pages.
- **`FAQPage`** on every page with visible FAQ content — paired 1:1 with
  real `<details>/<summary>` markup in the HTML, so the schema always
  matches what's actually crawlable and visible (never injected by
  JavaScript).
- **`BreadcrumbList`** on all 15 non-home pages, matching the visible
  breadcrumb trail in the markup.
- **`WebSite`** + **`Organization`** on the homepage only.

**Two fields are placeholders you should confirm, not fabricated facts:**
- `openingHoursSpecification` is currently set to Mon–Fri 07:00–17:00,
  Sat 08:00–13:00 as a reasonable default for a trade installer — replace
  with your actual hours (or "by appointment" framing) if different.
- `priceRange` is set to `"$$"` (a generic moderate-price indicator) since
  no real pricing data was supplied — this is safe to leave as-is or
  adjust once you have a view on how it should read.

**`sameAs` is intentionally omitted from the JSON-LD** rather than filled
with placeholder URLs (a fake or empty URL in `sameAs` can fail schema
validation and does more harm than leaving it out). Each page has an HTML
comment `<!-- sameAs: add Google Business Profile, Facebook and Instagram
URLs here once available -->` right after the LocalBusiness script block
— add the real property once you have:
- Google Business Profile URL
- Facebook Page URL
- Instagram profile URL

## 6. Canonical consistency — verified

Every page has a single self-referencing canonical tag pointing at
`https://fjsecuritysolutions.com.au/<page>` (apex, https, non-www). The
whole build was grepped for stray `http://` or `www.` references — see
verification results in the final project summary.

## 7. NAP consistency

Identical business name, phone (`tel:+61410740669`, displayed as
`0410 740 669`), email and service-area text appear in plain crawlable
HTML in the footer of every page (not an image, not JS-injected).
`lang="en-AU"` and `geo.region`/`geo.placename` meta tags are present on
every page, and copy uses Australian spelling throughout.

## 8. Google Business Profile — the single biggest lever outside the code

**If FJ Security Solutions doesn't already have a Google Business Profile,
setting one up is very likely the highest-impact action available,
full stop** — bigger than anything achievable on the website alone. It's
the primary driver of the local map pack, which is where most "near me"
and suburb-based searches actually get answered on mobile (the device
where FJ's own data showed the best ranking position but the lowest
share of impressions). Whatever NAP details go on the GBP listing must
match this website exactly.

## 9. Home-base address — open question

No address is published on the site or used in structured data, per the
brief (a wrong or guessed address actively damages local SEO). If there's
a home-base address you're willing to publish, and it can be matched
exactly to a Google Business Profile listing, adding it would meaningfully
strengthen local ranking signals. If the business is genuinely
service-area-only with no address to publish, that's a legitimate and
fully supported configuration (used throughout this build) — just
confirm which applies.

## 10. Social / sameAs URLs needed

Once available, supply:
- Google Business Profile URL
- Facebook Page URL
- Instagram profile URL

These get added to the `sameAs` array noted in Section 5.
