# Capitol Facility Services — Website

Marketing website for **Capitol Facility Services**, an Austin-based facility services company serving businesses, property managers, and project teams across Texas. Static HTML/CSS/JS — no build step, no dependencies, no backend.

---

## Project Structure

```
capitol-facility-services-rebuild/
├── index.html              # Home
├── services.html           # Facility Services
├── service-areas.html      # Service Areas (interactive TX map)
├── about.html              # About
├── partner.html            # Partner With Us (intake form)
├── contact.html            # Contact (full project form)
├── assets/
│   ├── css/styles.css      # Single stylesheet (design tokens, components, dark mode, responsive)
│   ├── js/site.js          # Theme toggle, mobile nav, active nav, mailto form helper
│   └── img/                # Logo + photography
└── qa-*.png                # Playwright QA screenshots (desktop + mobile, all 6 pages)
```

All pages link to the same shared `styles.css` and `site.js`. No frameworks, no localStorage/sessionStorage (sandbox restriction observed).

---

## Pages

| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Hero, services preview, "Standards" quality strip, areas teaser, partner band, secondary CTA |
| Services | `services.html` | Full service catalog: janitorial first, floor care (hybrid with sub-cards: VCT, carpet, tile&grout, epoxy, concrete staining, pressure washing), post-construction, painting (main + add-on), supplies, custom |
| Service Areas | `service-areas.html` | Custom hand-drawn SVG Texas map with 5 clickable markers (Austin primary, DFW, Waco, Houston, San Antonio) + marker popover cards for nearby local areas |
| About | `about.html` | Company-focused: operations-led opening, passion for cleanliness, belief industry can improve through standards/structure/communication/accountability |
| Partner With Us | `partner.html` | Property managers + construction GCs + facility managers; intake form (company, role, contact, market, property/project type, services needed, timeline, notes) |
| Contact | `contact.html` | Title "Facility Support Starts Here", full intake form with all required fields, mailto compose with fallback |

---

## Design Decisions

### Color & Palette
Light theme uses a warm white base (`#faf8f3`) with deep navy (`#14254a`) primary and a muted red accent (`#b8313a`) — both colors pulled directly from the existing Capitol logo. Dark theme swaps to `#0d121f` background with luminous variants of the same hues. This avoids the generic "cleaning company blue" look while staying corporate and trustworthy.

### Typography
- **Display**: General Sans (600/700)
- **Body**: Satoshi (400/500/600)

Both served via Fontshare CDN. Chosen because they read as professional and slightly editorial without competing visually with the existing serif "CAPITOL" wordmark in the logo. No Google Fonts dependency.

### Logo
The supplied `Scene-1 (12).gif` (1920×1080) was cropped to a 240×240 circular treatment using ffmpeg + palette filter, preserving the animation. A static 480×480 PNG of the first frame is included as a fallback and a 64×64 favicon was extracted for browser tabs.

### Header
Logo is displayed as a larger circular animated mark + brand name "Capitol Facility Services" — **no subtitle, no tagline**. Centered nav links: Home, Services, Service Areas, About, Partner With Us, Contact. Right side: theme toggle + small "Get Started" CTA (links to contact.html). On mobile (≤880px), nav collapses behind a hamburger toggle that opens a full-height side panel.

### Dark Mode
Driven by an explicit `data-theme="light|dark"` attribute on `<html>`. The site now defaults to the light theme first, and the toggle switches in-memory only — **no localStorage** (sandbox restriction).

### Interactive Texas Map
A custom-tuned SVG path approximates the Texas silhouette (panhandle and east jag toward Houston). Five city markers are clickable and each opens a small card on the map with nearby local areas and commercial corridors. Markets data lives in an inline `<script>` data dictionary on the Service Areas page.

External map embeds (Google Maps, Mapbox, etc.) were avoided because they require API keys or violate the no-build-step constraint.

---

## Copy Decisions

Per spec, the site **avoids the phrase "Commercial Janitorial · Texas"** and any heavy-handed "commercial only" language. Instead, the commercial-only focus is implied throughout by referring consistently to "businesses," "commercial spaces," "property managers," "facility managers," "construction teams," and so on.

The home page hero is fixed copy:
- H1: *The right cleaning partner makes every space feel ready.*
- Sub: *From recurring janitorial service to floor care, painting, post-construction cleaning, and supplies, Capitol gives businesses a service partner they can trust.*
- CTAs: *Get Started* expands on hover/focus into *Request Walkthrough* and *Submit Form* → contact.html, *View Services* → services.html
- Trust strip: Quick Response · QA Inspections · Client Satisfaction · Insured Service
- Locator: *Built in Austin. Ready for Texas facilities.*

The About page is company-focused (not founder-driven), opens on operations, and directly states the team's passion for cleanliness and belief that the industry can improve through better structure, standards, communication, and accountability. Tone is established and confident — not "we're a brand new startup."

Partner With Us is positioned for **property managers, construction GCs, and facility managers hiring a service vendor** — not subcontractors applying for work. The three columns explicitly call this out.

---

## Forms — Behavior

Both forms (`partner.html` and `contact.html`) use a shared `composeMailto(formId, to, subject, statusId)` helper in `site.js`:

1. On submit, collects all form fields via `FormData` (including all checked checkboxes for multi-value fields).
2. Builds a readable `mailto:` URL with field labels and values in the body.
3. Triggers `window.location.href = mailto:...` to open the visitor's email client.
4. Shows an in-page fallback status block with the email address as a clickable link, in case the mailto handler doesn't fire (e.g. webmail without a registered handler).

The destination address is `contact@capitolfacilityservices.com` (no phone number on the site — the contact form asks for the visitor's phone instead).

### Contact form fields
Name, company, email, phone, preferred contact method (radio: Email / Phone / Either), facility type (single select), services needed (12 checkboxes), square footage (optional), preferred service date (calendar input), market (dropdown), details (textarea).

Service checkbox list: day porter, office cleaning, post-construction, VCT strip & wax, concrete staining, interior painting, pressure washing, carpet cleaning, epoxy floor coatings, tile & grout, janitorial supply servicing, other.

Facility types: educational, warehouse/production/manufacturing or industrial, medical, office, commercial multi-tenant, showroom, construction/project, other.

Timeline is now handled by a calendar/date input where applicable instead of a dropdown.

---

## Photography — Sources & Licenses

Images come from a mix of Unsplash and Wikimedia Commons. Unsplash images are licensed under the [Unsplash License](https://unsplash.com/license), and Wikimedia Commons files are used according to the license shown on their file pages. Attribution is included here for transparency.

| File | Source URL | License | Notes |
|---|---|---|---|
| `hero-lobby-replacement.jpg` | https://unsplash.com/photos/modern-lobby-with-elevators-and-reception-desk-b08Pe9MV_eU | Unsplash License | Polished commercial lobby, used in home hero |
| `hero-corridor.jpg` | https://unsplash.com/photos/photo-1497366754035-f200968a6e72 | Unsplash License | Modern glass corridor, available but not used in current home hero |
| `interior-lobby.jpg` | https://unsplash.com/photos/photo-1604328698692-f76ea9498e76 | Unsplash License | Bright lobby, used on janitorial blocks |
| `floor-care-organic.jpg` | https://unsplash.com/photos/adding-cleaning-powder-to-a-mop-bucket-DyM3Cv1r4I0 | Unsplash License | Mop and bucket detail, used on floor-care section |
| `floor-care-replacement.jpg` | https://unsplash.com/photos/photo-1669101602108-fa5ba89507ee | Unsplash License | Previous floor-care option, available but not used |
| `floor-polished.jpg` | https://unsplash.com/photos/photo-1486406146926-c627a92ad1ab | Unsplash License | Office towers, available but not used for floor care |
| `floor-care-real.jpg` | https://commons.wikimedia.org/wiki/File:Factory_Cat_Magnum_Floor_Scrubber_at_Pentagon_station.jpg | Wikimedia Commons | Real floor scrubber photo, used on floor-care section |
| `project-work-real.jpg` | Wikimedia Commons / Geograph | Wikimedia Commons-compatible license | Real construction/project-site photo, used on project work section |
| `painting-real.jpg` | Wikimedia Commons | Wikimedia Commons-compatible license | Real professional painting photo, used on painting section |
| `supplies-real.jpg` | Wikimedia Commons | Wikimedia Commons-compatible license | Real janitorial closet/supplies photo, used on supplies section |
| `facility-needs-real.jpg` | Wikimedia Commons | Wikimedia Commons-compatible license | Real facility maintenance photo, used on custom facility needs section |
| `about-real.jpg` | Wikimedia Commons | Wikimedia Commons-compatible license | Real industrial/facility operations photo, used on about page |
| `austin-skyline.jpg` | https://unsplash.com/photos/photo-1531218150217-54595bc2b934 | Unsplash License | Austin skyline at dusk, used on home areas teaser |
| `project-work-organic.jpg` | https://unsplash.com/photos/a-stiff-bristled-brush-on-a-concrete-floor-p5NKub2JdgM | Unsplash License | Push broom on concrete, used on project work section |
| `painting-organic.jpg` | https://unsplash.com/photos/a-man-painting-a-wall-with-a-paint-roller-bsI70yO-5eU | Unsplash License | Painter at work, used on painting section |
| `supplies-organic.jpg` | https://unsplash.com/photos/a-bathroom-stall-with-a-sink-and-soap-dispenser-ShHN1q5C_no | Unsplash License | Commercial restroom dispenser detail, used on supplies section |
| `facility-needs-organic.jpg` | https://unsplash.com/s/photos/facility-maintenance | Unsplash License | Facility maintenance task, used on other facility needs section |
| `details-supplies.jpg` | https://unsplash.com/photos/photo-1581578731548-c64695cc6952 | Unsplash License | Previous supplies option, available but not used |
| `construction-site.jpg` | https://unsplash.com/photos/photo-1503387762-592deb58ef4e | Unsplash License | Previous project work option, available but not used |
| `office-detail.jpg` | https://unsplash.com/photos/photo-1497215842964-222b430dc094 | Unsplash License | Previous custom-services option, available but not used |
| `paint-roller.jpg` | https://unsplash.com/photos/photo-1562259949-e8e7689d7828 | Unsplash License | Previous painting option, available but not used |
| `meeting-quality.jpg` | https://unsplash.com/photos/photo-1556761175-5973dc0f32e7 | Unsplash License | Interior meeting space, used on about page |
| `warehouse.jpg` | https://unsplash.com/photos/photo-1553413077-190dd305871c | Unsplash License | Available, not used in current build |
| `pressure-wash.jpg` | https://unsplash.com/photos/photo-1581244277943-fe4a9c777189 | Unsplash License | Available, not used in current build |
| `medical-clean.jpg` | https://unsplash.com/photos/photo-1538108149393-fbbd81895907 | Unsplash License | Available, not used in current build |

**Logo asset**: `logo-animated.gif` and `logo-static.png` are derived from the user-supplied `Scene-1 (12).gif` in `/home/user/workspace/logo_assets/`. Rights are the user's.

No AI-generated imagery, no stock-house photos, no watermarked content, no Pinterest scrapes.

---

## QA Performed

Playwright (Chromium) screenshots captured at two viewports for all six pages:

- Desktop: 1366×900
- Mobile: 390×844, deviceScaleFactor 2

Files: `qa-{index,services,service-areas,about,partner,contact}-{desktop,mobile}.png`, plus `qa-home-light.png` / `qa-home-dark.png` for theme verification and `qa-mobile-nav-open.png` for hamburger menu verification.

### Manual checks
- All 6 nav links resolve correctly across pages.
- Active nav state highlights the current page.
- Theme toggle works with light as the default.
- Mobile hamburger opens full-height nav panel with solid background.
- All form fields render with real `<label>` elements and visible focus states.
- Interactive TX map: markers update on-map popover cards.
- Semantic HTML throughout (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<form>`).

### Bug fixed during QA
The first mobile nav implementation collapsed because the ancestor `.site-header` uses `backdrop-filter: blur(...)`, which creates a containing block for fixed-positioned descendants. The fix: set an explicit `height: calc(100vh - 64px)` on the open mobile menu instead of relying on `inset`. Background now renders as a solid full-height panel.

---

## Known Limitations

- **No backend.** Forms submit via `mailto:` only. If the visitor has no registered mail handler, a fallback message provides the email address as a clickable link.
- **No analytics, no cookies, no tracking.** Add later if desired.
- **No localStorage / sessionStorage.** Theme choice is in-memory only and resets per page load, with light mode as the default. This is a sandbox constraint that may be removed in production.
- **Texas map is a stylized hand-drawn SVG**, not a geographically precise outline. Suitable for marketing; not a navigation tool.
- A few unused photo filenames are historical from earlier drafts. Current service-section photos should visually match the section they represent.
- The animated logo GIF is ~600KB. Acceptable for the prominence it gets; could be re-encoded to WebM/MP4 for further savings if needed.

---

## Handoff / Deploy

This project is static — every page is fully self-contained HTML referencing relative `assets/` paths. Any static host (S3 + CloudFront, Netlify, Vercel, GitHub Pages, plain nginx) will serve it without configuration.

To deploy from this sandbox, the parent agent should call `deploy_website()` pointing at this project root. No build step, no env vars.

To preview locally: `python3 -m http.server` from the project root, then open `http://localhost:8000`.

### Things to update before going live
1. Replace `contact@capitolfacilityservices.com` if a different inbox is preferred.
2. Add real testimonials / client logos once available.
3. Consider replacing the mailto form with a real form handler (Formspree, Netlify Forms, a small Lambda) when the site moves off the sandbox.
4. Add Open Graph / Twitter Card meta tags with a branded social-share image.
5. Register a favicon set (currently a single PNG; iOS/Android icons would round it out).

---

## Git

Initialized in this directory. To see history: `git log --oneline`.
