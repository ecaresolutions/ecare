# Changelog

All notable changes to the Ecare project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-06-10
### Added
- **Project Setup**: Initialized project using Next.js 16 (App Router) + React 19 codebase with TypeScript and pnpm.
- **Database Connection**: Added MongoDB database connection utility (`dbConnect`) with automatic connection caching to prevent overloading connections in serverless environments.
- **Dynamic Routing**: Set up basic Next.js routing structure and dynamic rendering strategy for `services` and `careers` pages.

---

## [0.2.0] - 2026-06-18
### Added
- **Theme & Brand Colors**: Configured Tailwind CSS v4 design tokens and brand colors for Ecare theme.
- **Offer Popup**: Integrated dynamic offer popup banner with support for customized theme styling.
- **Ezy Checkout Showcase**: Added the WooCommerce plugin page shell (`/ezy-checkout`) with dynamic overview tabs and layout adjustments.

---

## [0.3.0] - 2026-06-25
### Added
- **YouTube Shorts Carousel**: Designed a custom looping slider for video showcase without showing scroll snap layout dots or like buttons.
- **Testimonial Embeds**: Added video URL embed support in testimonials, allowing custom video reviews in the admin panel.
- **Product Icon Uploads**: Added custom icon upload functionality for products and bound icons to header menus.

---

## [0.4.0] - 2026-06-28
### Added
- **bKash Tokenized Payment**: Integrated the official bKash Tokenized Payment Gateway with credential settings in the admin panel.
- **BDT Currency**: Adjusted payments model to transact in direct BDT currency without USD multipliers and removed tax display fields.
- **Order & Licensing System**: Added a database-backed order system that automatically generates secure license keys and sends SMTP invoices.
- **Product Downloads**: Configured ZIP file upload inputs in the product manager to let customers download plugins directly from their dashboard.

---

## [0.5.0] - 2026-07-02
### Added
- **Collapsible Admin Panels**: Structured page-editor admin panels into collapsible grids for showcase sections.
- **Page Management Actions**: Integrated duplicating and deleting landing pages via custom Dialog modals (replacing default browser prompts).
- **Auto-Registration**: Programmed guest auto-registration on payment triggers, easing checkout flows for new customers.
- **Dynamic CTA Configs**: Made homepage/about consulting banner text and buttons fully editable from the administration dashboard.

---

## [0.6.0] - 2026-07-04
### Added
- **Real-Time Live Chat**: Developed an interactive client live chat widget and admin dashboard support console synchronized via HTTP polling.
- **Admin Visibility**: Added visibility rules to automatically hide the client-side live chat bubble on all administrative routes.

---

## [1.0.0] - 2026-07-05
### Added
- **Multilingual Support**: Fully configured next-intl localized routing rules for `/en` and `/bn` languages.
- **Next.js 16 Proxy Convention**: Registered `proxy.ts` as the standard application middleware/locale handler conforming to Next.js 16 deprecation changes.

### Changed
- **Styling Harmonization**: Refactored promotional banners, popups, and highlight features to use the dynamic theme primary brand colors.

### Removed
- **Unnecessary Boilerplates**: Cleaned up empty folders, unused standard Next.js SVGs, local `scratch` scripts, and redundant lockfiles (`package-lock.json`).

---

[1.0.0]: https://github.com/SozibAlahi1/ecare/releases/tag/v1.0.0
[0.6.0]: https://github.com/SozibAlahi1/ecare/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/SozibAlahi1/ecare/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/SozibAlahi1/ecare/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/SozibAlahi1/ecare/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/SozibAlahi1/ecare/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/SozibAlahi1/ecare/commits/main
