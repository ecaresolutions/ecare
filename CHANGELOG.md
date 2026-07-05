# Changelog

All notable changes to the Ecare project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-07-05

This is the initial production release of the Ecare digital agency platform. It consolidates all features built during development into a stable, cleaned-up base.

### Added
- **Project Structure**: Created Next.js 16 (App Router) + React 19 codebase with TypeScript, Tailwind v4 styling, and Velite markdown content engine.
- **Multilingual Support (i18n)**: Fully integrated `next-intl` routing middleware (`proxy.ts`) supporting English (`en`) and Bengali (`bn`) locales.
- **Database Architecture**: Implemented MongoDB connection wrappers with schema caching to prevent serverless execution hangs.
- **Dynamic Page Builder**:
  - Implemented dynamic landing page creation, deletion, and duplication from the admin dashboard panel.
  - Added drag-and-drop-like showcase components collapsible on the admin panel editor.
  - Linked database fields to dynamically configure CTA (Call-to-Action) text and target URLs.
- **Ezy Checkout Showcase**:
  - Added a dedicated WooCommerce plugin showcase page.
  - Developed custom responsive video cards supporting autoplay, mute/unmute toggles, and circular endless loop sliders for YouTube Shorts.
  - Added dynamic unique feature grids, replacing standard CSS box shadows with clean flat layouts conforming to brand color guidelines.
- **bKash Tokenized Payment Integration**:
  - Configured secure API connections to bKash tokenized checkout pathways.
  - Enabled database-configurable merchant credential keys securely mapped via the admin dashboard.
  - Replaced legacy SVGs with optimized WebP payment provider assets.
- **Licensing & Checkout System**:
  - Developed a database-backed order system with automatic license key generation for purchases.
  - Configured download management matching product ZIP file uploads on admin panels.
  - Enabled guest checkout auto-registration to seamlessly create user sessions upon checkout completion.
  - Integrated SMTP email invoice delivery without problematic characters or emojis.
- **Real-Time Live Chat**:
  - Implemented a custom interactive live support chat widget with multilingual translation.
  - Developed client-to-admin message synchronization via optimized polling endpoints.
  - Added an admin live support console to manage active customer support threads.

### Changed
- **Styling**: Refactored promotional banners, offer popups, and highlight features to use the dynamic brand colors instead of hardcoded tailwind blues/purples.
- **Currency & Pricing Model**: Set store currency directly to Bangladeshi Taka (BDT) and simplified payment calculations by removing tax rows.

### Fixed
- **Authentication**: Resolved guest registration fields to correctly handle telephone inputs and preserve active sessions.
- **Slug Matching**: Resolved database slug query mismatches between `ezy-checkout` and `/ezy-checkout`.
- **Carousel Animation**: Fixed snap animations and transition threshold errors in loopback carousels.

### Removed
- **Unused Files**:
  - Removed empty `New folder` at root.
  - Removed root WordPress plugin code folder `ezy-checkout` (codebase is compiled dynamically into `ezy-checkout-pro.zip`).
  - Removed boilerplate SVGs (`file.svg`, `globe.svg`, `window.svg`).
  - Cleaned up local database migration/seed scripts in the `scratch` directory.
  - Removed redundant `package-lock.json` in favor of `pnpm-lock.yaml`.

---

[1.0.0]: https://github.com/SozibAlahi1/ecare/releases/tag/v1.0.0
