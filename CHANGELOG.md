# 📝 Ecare Platform Changelog

All notable changes to the **Ecare** digital agency project are documented here. 

This changelog follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standard and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## 🚀 [1.0.0] - 2026-07-05
> **Production Launch & Workspace Optimization**

### ✨ Added
- **🌍 Internationalization (i18n):** Full multilingual routing configured for English (`/en`) and Bengali (`/bn`) locales using `next-intl`.
- **🔄 Next.js 16 Proxy Middleware:** Configured the application middleware in [proxy.ts](file:///d:/ecare/ecare/proxy.ts) to adapt to the new Next.js 16/Turbopack proxy standard.

### 🎨 Changed
- **💅 Harmonized Brand Styles:** Refactored background wrappers, promo banners, and modal dialogs to dynamic primary brand colors instead of hardcoded tailwind blues/purples.

### 🗑️ Removed
- **🧹 Workspace Cleanup:**
  - Deleted empty folders (`New folder`).
  - Removed internal source files for the WooCommerce plugin (`ezy-checkout` root directory) as the plugin builds directly into a ZIP archive.
  - Removed standard boilerplate assets (`file.svg`, `globe.svg`, `window.svg`).
  - Removed redundant lockfiles (`package-lock.json` in favor of `pnpm-lock.yaml`).
  - Removed local database setup scripts in `scratch/`.

---

## 💬 [0.6.0] - 2026-07-04
> **Interactive Real-Time Support Chat**

### ✨ Added
- **💬 Live Support Widget:** Created a multilingual client chat widget with direct integration into the contact endpoints.
- **🖥️ Admin Support Console:** Designed a real-time polling panel in the admin dashboard to manage active chat sessions.
- **👁️ Route Visibility Rules:** Programmed the client chat bubble to automatically hide on all `/admin` routes.

---

## 🛠️ [0.5.0] - 2026-07-02
> **Page Builder Enhancements & Guest Flows**

### ✨ Added
- **📂 Collapsible Showcase Editor:** Grouped showcase sections in collapsible panels in the page editor to optimize vertical space.
- **📋 Duplicate/Delete Modals:** Replaced browser default confirmation alerts with styled, accessible custom dialog modals.
- **⚡ Guest Auto-Registration:** Enabled automatic customer session creation and background registration upon guest checkouts.
- **✏️ Editable consulting banners:** Homepage and About page consulting sections are now fully manageable via the administration panel.

---

## 💳 [0.4.0] - 2026-06-28
> **Payment Gateway & Order Invoicing**

### ✨ Added
- **🇧🇩 bKash Gateway Integration:** Integrated tokenized bKash payment processing flow.
- **⚙️ Credential Managers:** Added secure database-backed bKash credential management in the admin settings dashboard.
- **📦 Digital Downloads:** Added file upload support for plugin ZIP packages inside the admin dashboard.
- **🔑 License Key Engine:** Created automatic license generation triggers upon order completions.
- **✉️ Clean Email Invoicing:** Configured clean SMTP receipt dispatch templates optimized without problematic characters.

---

## 🎥 [0.3.0] - 2026-06-25
> **Media Showcase & Testimonials**

### ✨ Added
- **📱 Shorts Video Slider:** Developed an endless loop autoplaying carousel slider for vertical video formats (YouTube Shorts) without navigation controls or snaps.
- **🎥 Simplified Testimonials:** Restricted testimonials to video embeds, removing raw text description fields for cleaner visual output.
- **🖼️ Product Icon Uploads:** Configured file uploads for custom brand icons and mapped them directly into navigation bars.

---

## 🎨 [0.2.0] - 2026-06-18
> **Visual Tokens & Page Scaffold**

### ✨ Added
- **🎨 Tailwind v4 Theme:** Configured core colors and styling variables for the digital agency interface.
- **🔔 Offer Banners:** Added dynamic high-contrast floating promotional popups.
- **🛒 Ezy Checkout Landing Page:** Initialized the WooCommerce plugin landing page along with its respective database model matching routes.

---

## 🏗️ [0.1.0] - 2026-06-10
> **Project Foundation**

### ✨ Added
- **⚡ Core Stack Setup:** Bootstrapped the application using Next.js 16, React 19, TypeScript, and pnpm.
- **🗄️ Database Adaptors:** Implemented cached Mongoose connection routines to safeguard database pools in serverless deployment worker environments.

---

[1.0.0]: https://github.com/SozibAlahi1/ecare/releases/tag/v1.0.0
[0.6.0]: https://github.com/SozibAlahi1/ecare/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/SozibAlahi1/ecare/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/SozibAlahi1/ecare/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/SozibAlahi1/ecare/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/SozibAlahi1/ecare/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/SozibAlahi1/ecare/commits/main
