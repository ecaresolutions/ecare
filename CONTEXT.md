# PROJECT CONTEXT — Multilingual Agency Website

> This file is the **single source of truth** for the project. It lives in the repo root.
> Every phase prompt references it. If a phase prompt and this file ever disagree, **this file wins.**
> Do not silently revert any decision documented here.

---

## 1. Mission & constraints

A production-grade digital-agency website built to run **5+ years with minimal maintenance**. Optimise every decision for **longevity and low operational burden** over novelty. Non-negotiables: ultra-fast, lightweight, SEO-first, mobile-first, WCAG AA accessible, clean architecture, easy expansion, no bloated CMS, no WordPress, no Laravel *in the website stack*, no unmaintained dependencies.

---

## 2. Operating contract (applies to every phase)

1. **Work one phase at a time.** Each phase has its own prompt file. Finish a phase, report its Definition of Done, then stop and wait for "continue".
2. **No abandoned dependencies.** Always pick the actively maintained option.
3. **No placeholder logic in delivered code.** Everything shipped in a phase must compile, type-check, and run. Anything deferred goes in an explicit "Deferred" list — never a silent `// TODO` in a live code path.
4. **Stop and ask on real contradictions** or unsupported platform features; propose the recommended resolution. Otherwise proceed with the documented default and list assumptions.
5. **Realistic scope.** A 24-section production codebase is not one artifact. Architecture + scaffold first; per-section work in later phases.

---

## 3. Final technology decisions (these override the original loose spec)

| Concern | Decision | Why (do not revert) |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19**, strict TypeScript | Current LTS-grade baseline |
| Package manager | **pnpm** | Deterministic, fast |
| Styling | **Tailwind CSS v4** + **shadcn/ui** | shadcn supports v4; CSS-first config suits tokens |
| Content engine | **Velite** (primary). Optional **Fumadocs** for Docs+KB UI. | Contentlayer is **abandoned**; `contentlayer2` is bug-fix-only with uncertain future. Velite is Zod-based and maintained. |
| Hosting / runtime | **Cloudflare Workers via `@opennextjs/cloudflare`** | Cloudflare Pages + `next-on-pages` is **deprecated** for Next.js; OpenNext on Workers is the recommended path and supports Node runtime, App Router, ISR, image optimization. |
| Image optimization | `next/image` → **Cloudflare Images** via OpenNext (or Cloudflare Image Resizing loader) | Never fall back to `unoptimized` to make a build pass |
| i18n | **next-intl**, route-based (`/en`, `/bn`), `en` default | — |
| Search | **Pagefind**, build-time static index, **per-locale** | Indexes `en` and `bn` separately |
| Forms | **App Router route handler (Worker) + Cloudflare Turnstile + Resend**; contact/support forms may POST into FreeScout | No managed "Cloudflare Forms" product exists |
| Support backend | **FreeScout (self-hosted, external service)** via REST API module | FreeScout is Laravel, but it is a *separate service* — allowed. "No Laravel" = website stack only. |
| Analytics | **Plausible** | Lightweight, privacy-friendly |
| Spam / rate limiting | **Cloudflare WAF + Rate Limiting Rules + Turnstile** (edge layer) | Not in Next middleware |
| Tests | **Vitest** (unit), **Playwright** (e2e), **Lighthouse CI** (perf), **axe** (a11y) | Quality gate |
| CI/CD | **GitHub Actions → `wrangler deploy`** | Reproducible deploys |

### Resolved contradictions (state these back in Phase 0)
- Cloudflare Pages → **Cloudflare Workers (OpenNext)**
- Cloudflare Forms → **Worker route handler + Turnstile + FreeScout/Resend**
- Contentlayer → **Velite (+ optional Fumadocs)**
- "No Laravel" → website stack only; FreeScout (external) allowed
- "Static everywhere" → **mostly static + ISR + a few dynamic route handlers** (forms, ticket lookup, RSS, sitemaps). Pure `output: export` is rejected.
- Rate limiting → **edge/WAF**, not app code

---

## 4. Repository structure

```
/
├─ app/
│  └─ [locale]/                 # next-intl localized segment (en | bn)
│     ├─ (marketing)/           # home, services, industries, about, team,
│     │                         # testimonials, portfolio, case-studies,
│     │                         # careers, affiliates, contact
│     ├─ blog/
│     ├─ docs/[[...slug]]/
│     ├─ kb/
│     ├─ changelog/
│     ├─ support/               # support center, ticket submit, ticket status
│     ├─ legal/                 # privacy, terms, cookies, refund
│     ├─ sitemap-page/          # human sitemap
│     ├─ not-found.tsx          # custom 404
│     └─ error.tsx              # custom 500
│  ├─ api/                      # route handlers (Worker): contact, ticket-create,
│  │                            # ticket-status, rss, og-image
│  ├─ robots.ts
│  └─ sitemap.ts                # localized + hreflang
├─ components/ { ui, blocks, layout }
├─ content/
│  ├─ en/ { blog, docs, kb, changelog, team, testimonials, portfolio, case-studies, pages }
│  └─ bn/ { blog, docs, kb, changelog, team, testimonials, portfolio, case-studies, pages }
├─ messages/                    # next-intl UI strings: en.json, bn.json
├─ styles/ { tokens, themes, globals.css }
├─ lib/                         # velite client, seo, freescout client, schema builders
├─ velite.config.ts
├─ open-next.config.ts
├─ wrangler.toml
├─ next.config.ts
└─ tests/ { unit, e2e }
```

---

## 5. i18n architecture

- Locales: `en` (default), `bn`. Routes: `/`, `/en/...`, `/bn/...`.
- `next-intl` middleware for detection + redirect; UI strings in `/messages/{locale}.json`.
- MDX content localized by folder; each Velite doc carries a `locale` field derived from path.
- **Fallback policy:** missing `bn` doc → show `en` with a visible "not yet translated" notice and correct `hreflang`. Never 404, never silently swap language.
- SEO: `hreflang` alternates everywhere, localized title/meta/OG/JSON-LD, per-locale sitemap entries, localized RSS.

---

## 6. Content model (Velite/Zod) — minimum frontmatter per collection

- **blog**: `title, slug, excerpt, date, updated?, author(ref→team), categories[], tags[], featuredImage, readingTime(computed), draft, locale, seo{title,description,ogImage}`
- **docs**: `title, slug, order, group, version, toc(computed), prev/next(computed), locale`
- **kb**: `title, slug, category, related[], helpfulId, locale`
- **changelog**: `version(semver), date, type(added|changed|fixed|removed|security), title, body, locale`
- **team**: `name, role, slug, avatar, bio, skills[], socials{}, locale`
- **testimonials**: `author, company, logo?, avatar?, quote, rating?, videoUrl?, locale`
- **portfolio**: `title, slug, category, cover, gallery[], caseStudy(ref?), locale`
- **case-studies**: `title, slug, client, industry, challenge, solution, results[], metrics{}, locale`

Bad frontmatter **fails the build** — no silent skips.

---

## 7. Design system & theme

- Token layers: brand colors (primary, secondary, accent, success, warning, error, full neutral scale) → semantic mapping (`--color-bg`, `--color-fg`, `--color-muted`, `--color-border`…) → Tailwind v4 theme extension.
- Themes: light, dark, **system detection**, persistence, **zero-flash** (inline blocking script before paint), WCAG AA contrast per token pair.
- **White-label ready:** brand presets swappable via one token file + `data-brand` attribute. No hardcoded hex outside `/styles/tokens`.
- Theme-aware code blocks (Shiki dual-theme) and theme-aware illustrations.

---

## 8. SEO architecture

JSON-LD builders in `/lib/seo`: Organization, Website, Breadcrumb, Article, FAQ, SoftwareApplication (changelog), Person (team). Plus canonical, OG, Twitter cards, `hreflang`, localized `sitemap.ts`, `robots.ts`. Validate JSON-LD in Phase 6.

---

## 9. Forms & support (FreeScout)

- **Contact/lead** → route handler → Turnstile verify → FreeScout conversation (or Resend) → accessible success/fail states.
- **Ticket submit** → FreeScout REST `/conversations` with attachments.
- **Ticket status** → route handler lookup by **ticket number + email** only (no listing others' tickets); edge rate-limited. FreeScout's native customer-status UX is weak — this is a custom thin layer.
- **Knowledge Base** = in-repo MDX (`/content/*/kb`), Pagefind-searchable; links into support flow (KB → "still need help?" → ticket). FreeScout's own KB is not the source of truth.
- SLA + escalation rendered as static content.
- Secrets (FreeScout key, Resend key, Turnstile secret) via Worker secrets/env. Never committed.

---

## 10. Security

Strict security headers + CSP (allow only Plausible, Turnstile, FreeScout origin), Turnstile on all public forms, Zod server-side validation on every route handler, Cloudflare WAF + Rate Limiting Rules (documented), zero secrets in client bundles.

---

## 11. Performance budgets (enforced via Lighthouse CI)

- Lighthouse ≥ 95 (Perf/SEO/Best-Practices/A11y) on Home, Blog post, Docs page, Contact.
- CWV: LCP < 2.0s, INP < 200ms, CLS < 0.1.
- Server Components by default; each Client Component must be justified in a comment.
- Static + ISR by default; dynamic only for the §9 handlers.

---

## 12. Definition of Done (every phase)

Type-checks (strict) · passes ESLint/Prettier · phase tests green · **builds with the OpenNext Cloudflare adapter** · deploys to a Workers preview. Each phase ends with: ✅ what shipped, 📋 assumptions, ⏭️ deferred items.

---

## 13. Phase index

| Phase | File | Goal |
|---|---|---|
| 0 | `phase-0-foundation.md` | Repo, tooling, i18n shell, theme, OpenNext deploy pipeline |
| 1 | `phase-1-design-system.md` | Tokens, themes, core blocks |
| 2 | `phase-2-content-engine.md` | Velite collections + schemas + sample content |
| 3 | `phase-3-marketing-pages.md` | Home + all marketing pages |
| 4 | `phase-4-content-sections.md` | Blog, Docs, KB, Changelog + Pagefind |
| 5 | `phase-5-support-system.md` | FreeScout, ticket submit/status, SLA |
| 6 | `phase-6-seo.md` | JSON-LD, metadata, sitemaps, hreflang |
| 7 | `phase-7-hardening.md` | Security, CSP, Lighthouse CI, a11y |
| 8 | `phase-8-finish.md` | Legal, 404/500, QA, runbook |
