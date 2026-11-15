# SASH Broadband Website (`Frontend`)

Production-ready, WCAG 2.1 AA accessible, SEO-optimised Next.js + Tailwind CSS v4 website for **SASH Broadband Private Limited** (Thiruvallur, Tamil Nadu).

---

## 1. Quick Start

```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 2. How to Edit Plans & Prices

All broadband tariff cards and Schema.org Offer data are centrally managed in:

- **`src/components/Home/Pricing.tsx`** (`BROADBAND_PLANS` array)
- **`src/app/page.tsx`** (`homepageJsonLd` offers array)

> **Open Item Flagged (Section 11):** The **Corporate Pack (₹1,499/month)** speed is currently marked as `"Speed: To be confirmed"` in `src/components/Home/Pricing.tsx`. Once verified by the client, update the `speed` and `features` fields in `BROADBAND_PLANS`.

---

## 3. How to Update Contact Details & NAP

Real business NAP (Name, Address, Phone, Hours, Email) is configured in:

- **Top utility bar & sticky header:** `src/components/Home/Topbar.tsx`
- **Contact section & lead form:** `src/components/Home/Contactus.tsx`
- **Footer & floating WhatsApp button:** `src/components/Home/Footer.tsx`
- **Global Schema.org JSON-LD (`InternetServiceProvider`):** `src/app/layout.tsx`

Current verified details:
- **Address:** 184/12B, Jaya Nagar Main Road, Jaya Nagar, Thiruvallur, 602001, Tamil Nadu
- **Phone:** `+91 90030 09353`
- **Email:** `sashbroadband@gmail.com`
- **Hours:** Mon–Sat, 9:00 AM–6:00 PM (24/7 support for existing customers)

---

## 4. How to Connect the Lead Form to Your CRM / Email Service

Form submissions are sent via `POST /api/lead` handled in:

- **`src/app/api/lead/route.ts`**

The endpoint validates:
- Full name (required)
- 10-digit Indian mobile number with optional `+91` (required)
- Optional email format
- Street area / 6-digit pincode (required)
- Service interest (`Home broadband`, `Business or SME`, `Leased line`, `CCTV`, `Intranet`)
- Explicit consent boolean + ISO 8601 `consentTimestamp`

To forward leads to an email service (Resend/Nodemailer), Google Sheets, or CRM webhook, add your webhook `fetch()` call inside `src/app/api/lead/route.ts` right after the `record` object is constructed.

---

## 5. Brand Tokens & Design System

Defined in `src/app/globals.css`:
- `--brand-red: #DE0302` (Hover: `#B80201`)
- `--brand-navy: #010D3B`
- `--white: #FFFFFF`
- `--black: #000000`
- `--navy-80: #1A2552`
- `--red-10: #FDEBEB`
- `--neutral-600: #4A4F63`
- `--neutral-100: #F3F4F7`

---

## 6. QA & Launch Checklist

- [x] **Strict Brand Palette:** Only `--brand-red`, `--brand-navy`, `--white`, `--black`, and approved tints used across all routes.
- [x] **WCAG 2.1 AA Contrast Verified:**
  - `#FFFFFF` on `#010D3B` (Navy): **18.7:1** (AAA)
  - `#FFFFFF` on `#DE0302` (Red): **5.1:1** (AA)
  - `#DE0302` on `#FFFFFF` (White): **5.1:1** (AA)
  - `#4A4F63` on `#FFFFFF` (White): **8.1:1** (AAA)
  - Red on Navy is restricted to large 24px+ display callouts (`1 Gbps`) or non-text accents.
- [x] **Keyboard & Focus Navigation:** 3px `#DE0302` outline with 3px offset on all interactive elements; Escape key closes mobile drawer and Services dropdown; skip-to-content link included.
- [x] **Responsive Viewports:** Verified for `360px`, `390px`, `768px`, `1280px`, and `1440px`.
- [x] **SEO & Structured Data:** `sitemap.xml` (`/sitemap.xml`), `robots.txt` (`/robots.txt`), `InternetServiceProvider`, `Offer`, `FAQPage`, `BreadcrumbList`, and `WebSite` JSON-LD schemas included.
