# SEO Audit and Implementation Log

## 1. Executive summary

This repository was a flat single-page GitHub Pages site with mixed canonical signals, thin site architecture, a sitemap made of fragment URLs, no dedicated service or location pages, weak branded prominence, and several UX and accessibility gaps.

The site has been rebuilt into a focused multi-page static structure for:

- Home
- Services overview
- CCTV installation
- Alarm systems
- Intercom installation
- WiFi and data cabling
- Service areas overview
- Logan
- Brisbane
- Gold Coast
- About
- Contact
- Custom 404 page

The implementation keeps the existing brand colours, logo, phone number, email address, service list and supplied imagery, while improving crawlability, local relevance, mobile usability, accessibility and conversion clarity.

The project was then refactored into a flat GitHub Pages-compatible file layout so the main site pages now live as root-level `.html` files rather than nested folders containing `index.html`.

Note: the Search Console spreadsheet file named `fjsecuritysolutions.com.au-Performance-on-Search-2026-06-14.xlsx` was not present in the workspace at audit time. The changes below were based on the Search Console findings provided in the brief.

## 2. Search Console findings

The supplied findings were treated as directional rather than statistically complete:

- Homepage signals were split across `https://www.fjsecuritysolutions.com.au/`, `http://fjsecuritysolutions.com.au/` and `https://fjsecuritysolutions.com.au/`.
- The preferred canonical domain should be `https://fjsecuritysolutions.com.au/`.
- Mobile impressions were higher than desktop, but mobile CTR was weaker.
- Branded query `fj security` was only averaging position `7.14`, so the business name needed stronger and more consistent prominence.
- Relevant non-branded query themes included:
  - `security systems logan`
  - `security installers near me`
  - `security alarm installation brisbane`
  - `cctv installation brisbane`
- Roughly half of impressions were outside Australia, so stronger Australian and South East Queensland relevance was needed.

## 3. Technical problems found

- The site was a single-page structure built around same-page anchors rather than crawlable pages.
- The homepage canonical pointed to the `www` version instead of the preferred non-`www` domain.
- Open Graph URLs and image references were aligned to `www`.
- The sitemap contained fragment URLs such as `/#services` and `/#contact`, which should not be indexed as standalone sitemap entries.
- The old site used the obsolete `keywords` meta tag.
- The header logo referenced a missing asset (`Fj Security Logo.jpg`) and relied on a fallback.
- Navigation, service-area discovery and SEO intent were too dependent on a single homepage.
- No dedicated 404 page existed in the repo.
- The old hero relied on a large autoplay background video, which was an avoidable performance cost.
- Mobile navigation lacked stronger accessibility states and keyboard handling.
- The repo had no mechanism to issue true hostname-level 301 redirects because deployment is GitHub Pages-based.

## 4. Files changed

- `index.html`
- `about.html`
- `contact.html`
- `services.html`
- `cctv-installation.html`
- `alarm-systems.html`
- `intercom-installation.html`
- `wifi-data-cabling.html`
- `service-areas.html`
- `logan.html`
- `brisbane.html`
- `gold-coast.html`
- `about-us.html`
- `contactus.html`
- `our-services.html`
- `styles.css`
- `main.js`
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- `icons.svg`
- `404.html`
- `apple-touch-icon.png`
- `icon-192.png`
- `icon-512.png`

### Flat GitHub Pages-compatible structure

The nested page structure was removed and replaced with a flat root-level page set:

- `index.html`
- `about.html`
- `contact.html`
- `services.html`
- `cctv-installation.html`
- `alarm-systems.html`
- `intercom-installation.html`
- `wifi-data-cabling.html`
- `service-areas.html`
- `logan.html`
- `brisbane.html`
- `gold-coast.html`
- `404.html`

This makes uploads and GitHub Pages publishing simpler while keeping the SEO-focused multi-page content model.

## 5. Pages created

Indexable pages:

- `/`
- `/services.html`
- `/cctv-installation.html`
- `/alarm-systems.html`
- `/intercom-installation.html`
- `/wifi-data-cabling.html`
- `/service-areas.html`
- `/logan.html`
- `/brisbane.html`
- `/gold-coast.html`
- `/about.html`
- `/contact.html`

Non-indexable support pages:

- `/404.html`
- `/about-us.html`
- `/contactus.html`
- `/our-services.html`

## 6. Redirects implemented

Repo-controlled fallback handling:

- `/about-us.html` now redirects users to `about.html` via meta refresh and `window.location.replace`, with `noindex,follow`.
- `/contactus.html` now redirects users to `contact.html` via meta refresh and `window.location.replace`, with `noindex,follow`.
- `/our-services.html` now redirects users to `services.html` via meta refresh and `window.location.replace`, with `noindex,follow`.

Important limitation:

- These fallback pages are not true server-side `301` redirects.
- Because the site deploys through GitHub Pages, true hostname and path `301` redirects must be configured outside the repo.

### Required Cloudflare redirect rules

Use permanent redirects (`301`) and preserve query strings.

1. Hostname canonicalisation:
   - Source: `www.fjsecuritysolutions.com.au/*`
   - Destination: `https://fjsecuritysolutions.com.au/$1`

2. HTTP to HTTPS:
   - Source: `http://fjsecuritysolutions.com.au/*`
   - Destination: `https://fjsecuritysolutions.com.au/$1`

3. HTTP `www` to canonical:
   - Source: `http://www.fjsecuritysolutions.com.au/*`
   - Destination: `https://fjsecuritysolutions.com.au/$1`

4. Legacy about path:
   - Source: `fjsecuritysolutions.com.au/about-us*`
   - Destination: `https://fjsecuritysolutions.com.au/about.html`

5. Legacy contact path:
   - Source: `fjsecuritysolutions.com.au/contactus*`
   - Destination: `https://fjsecuritysolutions.com.au/contact.html`

6. Legacy services path:
   - Source: `fjsecuritysolutions.com.au/our-services*`
   - Destination: `https://fjsecuritysolutions.com.au/services.html`

If Cloudflare Redirect Rules are already in use, order the legacy path redirects before any broad catch-all logic that could create a second hop.

## 7. Metadata changes

- Added unique titles and meta descriptions for every indexable page.
- Standardised `lang="en-AU"` across all HTML pages.
- Standardised canonical URLs to non-`www` HTTPS.
- Removed the obsolete `keywords` meta tag from the homepage.
- Added or corrected Open Graph metadata for all indexable pages.
- Added or corrected Twitter card metadata for all indexable pages.
- Improved branded prominence for `FJ Security Solutions` in:
  - titles
  - header brand block
  - homepage content
  - footer
  - structured data
  - logo alt text

## 8. Structured data added

Implemented valid JSON-LD using only information already present in the project:

- `Organization`
- `LocalBusiness`
- `WebSite`
- `WebPage`
- `BreadcrumbList`
- `Service`

Structured data was added to:

- Homepage
- Services hub
- CCTV installation page

The schema uses a single consistent business name, canonical domain, phone number, email and service-area definition for Logan, Brisbane and the Gold Coast.

No street address, review stars, award claims, pricing, years-in-business claims or other unsupported business facts were added.

## 9. Performance improvements

- Replaced the autoplay hero video with a static hero image.
- Removed the external Font Awesome dependency and replaced it with a local SVG sprite.
- Added explicit image width and height attributes.
- Kept the main hero image eager and marked below-the-fold images as lazy-loaded.
- Added a web app manifest and touch icons using local assets.
- Reduced dependency on heavy same-page scripting.
- Simplified the experience to work without unnecessary JavaScript.
- Used a lighter interaction script for:
  - mobile navigation
  - FAQ state sync
  - reveal effects via `IntersectionObserver`
- Added reduced-motion safeguards in CSS.

## 10. UI and UX improvements

- Rebuilt the site into a true multi-page information architecture.
- Added a professional brand-led header with stronger business-name visibility.
- Reworked the homepage into a clearer hero, services, process, service-area and FAQ flow.
- Added dedicated local landing pages for Logan, Brisbane and Gold Coast.
- Added focused service pages instead of relying on one homepage section.
- Added a mobile sticky action bar for:
  - Call
  - Get a Quote
- Improved CTA clarity sitewide.
- Added a custom branded 404 page with service links, CTA buttons and phone access.
- Reworked the service-area presentation from a disconnected suburb block into useful location pages and grouped coverage content.

## 11. Accessibility improvements

- Added a working skip link.
- Used semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Added visible focus states.
- Added mobile navigation button semantics:
  - proper `<button>`
  - `aria-controls`
  - `aria-expanded`
- Added keyboard support for the mobile menu, including `Escape` close.
- Standardised one `H1` per indexable page.
- Added descriptive alt text to meaningful images.
- Preserved decorative icon handling through inline SVG and text labels.
- Added reduced-motion handling.
- Checked responsive overflow at `320`, `360`, `390`, `430` and `768` widths on key pages.

## 12. Remaining items requiring manual action

- Configure true `301` canonical hostname and legacy-path redirects in Cloudflare or equivalent DNS/proxy tooling. GitHub Pages cannot enforce all of these from this repo alone.
- If you want a genuine on-site quote form, add a safe backend or third-party form endpoint. The repo only contained phone/email contact methods, so no form endpoint was invented.
- Supply any real business trust assets you want surfaced later, such as:
  - licence details
  - project photography
  - case studies
  - review sources
  - additional verified service-area details
- If the Search Console export file should also live in the repo, add it so future audits can reference the raw data directly.

## 13. Recommended Search Console actions after deployment

- Submit the new sitemap: `https://fjsecuritysolutions.com.au/sitemap.xml`
- Inspect the canonical homepage URL: `https://fjsecuritysolutions.com.au/`
- Request indexing for:
  - homepage
  - services hub
  - CCTV page
  - Logan page
  - Brisbane page
  - Gold Coast page
- Confirm Google-selected canonical URLs for homepage and key service pages.
- Monitor Page Indexing for legacy URLs and duplicate canonical issues.
- Monitor Core Web Vitals after the static hero/video removal and layout changes are live.
- Compare mobile and desktop CTR after enough post-deployment data accumulates.
- Track branded and non-branded queries separately, especially:
  - `fj security`
  - `security systems logan`
  - `security installers near me`
  - `security alarm installation brisbane`
  - `cctv installation brisbane`

## 14. Recommended Google Business Profile actions

- Confirm the business name exactly matches `FJ Security Solutions`.
- Confirm the phone number and website URL match the canonical site.
- Ensure Logan, Brisbane and Gold Coast service areas are accurately represented.
- Add real project photos that match CCTV, alarm, intercom and cabling work.
- Add service descriptions that align with the new site structure.
- Encourage real reviews and respond to them from the business profile account.

## 15. Indexable page table

| URL | Title | Meta description | H1 | Primary search intent | Canonical URL |
| --- | --- | --- | --- | --- | --- |
| `/` | Home Security Systems Logan \| FJ Security Solutions | FJ Security Solutions installs CCTV, alarm systems, intercoms and data cabling for homes and businesses across Logan, Brisbane and the Gold Coast. | Home Security Systems Logan | Branded local home security | https://fjsecuritysolutions.com.au/ |
| `/services.html` | Security Installation Services \| FJ Security Solutions | Explore CCTV, alarm systems, intercom installation and WiFi/data cabling from FJ Security Solutions across Logan, Brisbane and the Gold Coast. | Security Installation Services | Service overview and internal navigation | https://fjsecuritysolutions.com.au/services.html |
| `/cctv-installation.html` | CCTV Installation Logan & Brisbane \| FJ Security Solutions | Professional CCTV installation with Hikvision and Dahua options, NVR storage and mobile viewing for homes and businesses across Logan, Brisbane and the Gold Coast. | CCTV Installation for Logan, Brisbane and the Gold Coast | CCTV installation enquiries | https://fjsecuritysolutions.com.au/cctv-installation.html |
| `/alarm-systems.html` | Alarm System Installation Logan \| FJ Security Solutions | Wired, wireless and hybrid alarm system installation for homes and businesses across Logan, Brisbane and the Gold Coast. | Alarm System Installation for Homes and Businesses | Alarm system installation enquiries | https://fjsecuritysolutions.com.au/alarm-systems.html |
| `/intercom-installation.html` | Intercom Installation Logan \| FJ Security Solutions | Intercom installation for doors and gates with mobile app communication, tailored for homes and businesses across Logan, Brisbane and the Gold Coast. | Intercom Installation with Mobile Access | Intercom installation enquiries | https://fjsecuritysolutions.com.au/intercom-installation.html |
| `/wifi-data-cabling.html` | WiFi & Data Cabling Logan \| FJ Security Solutions | Structured cabling and network setup for reliable security and connectivity across Logan, Brisbane and the Gold Coast. | Reliable Connectivity for Security and Everyday Use | WiFi and data cabling enquiries | https://fjsecuritysolutions.com.au/wifi-data-cabling.html |
| `/service-areas.html` | Security Installers in Logan, Brisbane & Gold Coast | See where FJ Security Solutions works across South East Queensland, including Logan, Brisbane, the Gold Coast and surrounding suburbs. | Security Installation Across South East Queensland | Regional service coverage | https://fjsecuritysolutions.com.au/service-areas.html |
| `/logan.html` | Security Systems Logan \| CCTV, Alarms & Intercoms | Security system installation for Logan homes and businesses, including CCTV, alarm systems, intercoms and data cabling. | Security Systems for Logan Homes and Businesses | Logan security installation | https://fjsecuritysolutions.com.au/logan.html |
| `/brisbane.html` | Security Systems Brisbane \| CCTV, Alarms & Intercoms | FJ Security Solutions installs CCTV, alarm systems, intercoms and data cabling for Brisbane homes and businesses. | Security System Installation Across Brisbane | Brisbane security installation | https://fjsecuritysolutions.com.au/brisbane.html |
| `/gold-coast.html` | Security Systems Gold Coast \| CCTV, Alarms & Intercoms | Professional CCTV, alarm, intercom and data cabling installation for Gold Coast homes and businesses. | Security System Installation for the Gold Coast | Gold Coast security installation | https://fjsecuritysolutions.com.au/gold-coast.html |
| `/about.html` | About FJ Security Solutions | Learn about FJ Security Solutions, a licensed and insured security installation business servicing Logan, Brisbane and the Gold Coast. | About FJ Security Solutions | Business identity and trust | https://fjsecuritysolutions.com.au/about.html |
| `/contact.html` | Contact FJ Security Solutions \| Security Quotes | Call or email FJ Security Solutions for CCTV, alarm system, intercom and data cabling quotes across Logan, Brisbane and the Gold Coast. | Contact FJ Security Solutions | Quote and phone enquiries | https://fjsecuritysolutions.com.au/contact.html |

## 16. Final deployment checklist

- [ ] Upload the updated static site files.
- [ ] Confirm GitHub Pages is still publishing the repository root correctly.
- [ ] Keep the custom domain as `fjsecuritysolutions.com.au`.
- [ ] Configure the Cloudflare `301` rules listed above.
- [ ] Confirm `https://fjsecuritysolutions.com.au/robots.txt` loads correctly.
- [ ] Confirm `https://fjsecuritysolutions.com.au/sitemap.xml` loads correctly.
- [ ] Check the new `/404.html` through a non-existent URL on production.
- [ ] Confirm the canonical homepage source renders `https://fjsecuritysolutions.com.au/`.
- [ ] Confirm there are no internal links to `http` or `www`.
- [ ] Submit the sitemap in Search Console.
- [ ] Request indexing for the homepage and the new core service/location pages.
