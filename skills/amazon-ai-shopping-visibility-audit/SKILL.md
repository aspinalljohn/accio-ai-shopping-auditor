---
name: amazon-ai-shopping-visibility-audit
displayName: AI Shopping Visibility Audit
displayDescription: Audits Amazon listings through buyer questions and produces source-backed content fixes.
description: Use when auditing an Amazon ASIN or source packet for AI shopping visibility, buyer-question coverage, and gap-closing rewrites. Do not use for proprietary ranking claims, Seller Central publishing, or legal approval.
version: 0.1.0
tool_triggers:
  - tool: web_fetch
    args:
      url: '/amazon\.[^/]+\/(?:dp|gp\/product)\/[A-Z0-9]{10}/i'
---

# Amazon AI Shopping Visibility Audit

Evaluate how clearly an Amazon listing answers natural-language buying questions. Build the evidence base first, score answer coverage second, and draft exact fixes third.

## Prerequisites

Require at least one of:

- an Amazon listing URL or ASIN; or
- a source packet containing reliable product facts, listing copy, screenshots, reviews, Q&A, specifications, packaging, or product images.

If neither is available, request one. Do not start by inventing a representative product.

## Positioning

Use `AI shopping visibility`, `AI shopping assistant readiness`, or `Alexa Shopping readiness`.

Do not claim:

- guaranteed Amazon, Rufus, or Alexa ranking;
- access to proprietary Amazon models, recommendation logic, or internal data;
- Amazon approval or certification; or
- legal, medical, regulatory, or compliance approval.

## Run modes

Choose and disclose one:

1. **Visible listing** — evidence captured from a live Amazon page.
2. **Source packet** — evidence supplied by the user without dependable live-page capture.
3. **Listing + exports** — live listing plus supplied reviews, Q&A, catalog, or specification exports.

If live Amazon access is blocked, do not bypass CAPTCHA, login, bot protection, paywalls, or access controls. Continue from supplied materials when sufficient; otherwise request screenshots or an export.

## Required workflow

1. Lock the exact ASIN, marketplace, visible variant, pack/count, and audit date. Quarantine conflicting variant facts rather than merging them.
2. Build a product fact base with a source and confidence level for every material fact.
3. Read [references/evidence-and-claims.md](references/evidence-and-claims.md) before interpreting claims, reviews, or conflicts.
4. Read [references/question-taxonomy.md](references/question-taxonomy.md), then generate 20–30 product-specific buyer questions. Include at least five high-intent long-tail questions.
5. Read [references/scoring-method.md](references/scoring-method.md), then score each question across title, bullets, description/A+, images, Q&A, reviews, and specs/attributes.
6. Identify the 8–12 gaps with the greatest effect on purchase confidence, returns, discoverability, or differentiation.
7. Draft exact, source-backed improvements for the appropriate surfaces: title notes, bullets, A+ copy, Q&A, attributes, and 1–3 optional image callouts.
8. Use [references/output-template.md](references/output-template.md) for the report structure.
9. Run [references/qa-checklist.md](references/qa-checklist.md) before completion.

## Output

Write into the active workspace, not the plugin directory. Default to:

```text
outputs/ai-shopping-audits/{asin-or-product-slug}-{yyyy-mm-dd}/
```

Create:

- `ai-shopping-visibility-audit.md`
- `source-listing-capture.md` when live evidence was captured
- `source-screenshots/` and `source-images/` only when those assets actually exist

Do not create empty evidence folders.

## Operating boundaries

- Cite the source for every proposed factual statement.
- Label review-derived language as shopper perception or review theme.
- Preserve unresolved contradictions as explicit gates.
- Treat price, rating, review count, stock, badges, and seller information as time-sensitive.
- Image callouts are optional downstream creative candidates; they do not replace a core image stack.
- An audit may recommend changes but must not publish them or alter Seller Central without a separate user request and authorization.

End every report with this caveat:

> This audit estimates AI shopping assistant readiness from visible and product-provided data. It does not access Amazon's proprietary models, ranking systems, or recommendation logic.

