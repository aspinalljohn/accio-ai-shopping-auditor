---
name: amazon-ai-shopping-visibility-audit
description: Audit an Amazon ASIN or product source packet for AI shopping assistant visibility by generating natural-language buyer questions, scoring whether listing surfaces answer them, and drafting exact gap-closing rewrites. Use when the user mentions Alexa Shopping, AI shopping visibility, conversational shopping, natural-language buyer questions, or listing gap audit.
---

# Amazon AI Shopping Visibility Audit

Audit an Amazon listing the way an AI shopping assistant-aware buyer would interrogate it: natural-language questions first, listing evidence second, exact rewrite recommendations third.

Use durable positioning:
- Preferred: AI shopping visibility, AI shopping assistant readiness, Alexa Shopping readiness.
- Avoid: guaranteed Alexa Shopping ranking, Alexa Shopping ranking score, direct Alexa Shopping interrogation, Amazon-approved optimization.

## Inputs

At least one:
- Amazon listing URL or ASIN
- Product source packet with title, bullets, A+ copy, specs, packaging, reviews, Q&A, or product photos

Optional:
- Product category
- Competitor ASINs or URLs
- Review export
- Q&A export
- Spec sheet or compliance sheet
- Brand/product website URL
- Target customer
- Price band
- Target use cases
- Output folder

If no listing, source packet, or product facts are available, ask for one. Otherwise proceed and document assumptions.

## Autonomous Browser Capture

When the user provides an Amazon URL or ASIN, do not ask the user to manually collect listing details first.

1. Normalize ASINs to an Amazon product URL when needed.
2. Try normal page/listing inspection first.
3. If direct access is blocked, incomplete, or unreliable, use available browser/computer-use tooling to open the listing in the user's browser session and capture visible evidence.
4. Capture only what a normal browser session can view. Do not bypass CAPTCHA, login prompts, bot checks, paywalls, access controls, or Amazon restrictions.
5. Save a local source snapshot before analysis:
   - `source-listing-capture.md`
   - `source-screenshots/`
   - `source-images/`
6. Capture these visible surfaces when available:
   - title, brand, price band, rating/review count
   - bullets/about-this-item
   - product details/spec tables
   - variation names and visible variant facts
   - main image and secondary image text/themes
   - A+ content sections visible on page
   - visible Q&A and review themes
   - storefront/brand link and any visible manufacturer details
7. Cite browser-captured facts as `browser capture` in output tables.

If browser automation is unavailable or the page is blocked by CAPTCHA/login/access controls, stop and ask for screenshots, exports, or a product source packet.

## References

Read `references/question-taxonomy.md` before generating the buyer-question set.

## Output Folder

Default:
- Client known: `02 aspi/clients/[Client Name]/ai-shopping/[ASIN or product-slug] - [YYYY-MM-DD]/`
- General/no client named: `02 aspi/amazon-research/ai-shopping/[ASIN or product-slug] - [YYYY-MM-DD]/`

Create:
- `ai-shopping-visibility-audit.md`

## Workflow

1. Capture listing evidence first when an Amazon URL/ASIN is provided, using Autonomous Browser Capture if direct access is blocked or incomplete.
2. Build the product fact base from available sources:
   - title, brand, category, price band, variant, size/count, materials/ingredients/specs
   - bullets, description, A+ content, current Q&A, review themes, image text if available
   - source-backed claims and unsupported/risky claims
3. If a live listing is available, inspect the visible page and any accessible review/Q&A/A+ details. If Amazon access is blocked even in browser capture mode, use provided screenshots/exports and say so.
4. Generate 20-30 natural-language buyer questions:
   - include fit/use-case questions, price/value questions, compatibility, material/ingredient, setup/care, durability, comparison, gifting, objections, and edge cases
   - include 5 high-intent long-tail prompts like "good for [specific user/use case] under [price]?"
5. Score answer coverage for each question across surfaces:
   - Title
   - Bullets
   - Description/A+
   - Images/image text
   - Q&A
   - Reviews
   - Specs/attributes
6. Use this score scale:
   - `3 = directly answered with clear source-backed detail`
   - `2 = partially answered or implied`
   - `1 = weak, scattered, or ambiguous`
   - `0 = not answered`
   - `N/A = not relevant to this product`
7. Identify the top 8-12 gaps that matter most commercially.
8. Draft exact rewrites:
   - title notes when applicable, not title stuffing
   - bullet rewrites
   - A+ module copy blocks
   - Q&A additions
   - infographic callouts as append-only image expansion candidates
   - attribute/spec additions when source-backed
9. Add a demo-safe caveat:
   - This audit estimates AI shopping assistant readiness from visible/product-provided data. It does not access Amazon's proprietary models, ranking systems, or recommendation logic.

## Source-Backed Claim Rules

- Use only facts from listing, packaging, source packet, brand site, spec sheet, review/Q&A evidence, or user-provided materials.
- Do not invent dimensions, materials, compatibility, certifications, ingredients, clinical proof, warranties, guarantees, awards, origin claims, or compliance attributes.
- For review-derived language, phrase as shopper perception or review theme, not as a guaranteed product fact.
- Flag regulated or risky claims instead of polishing them into stronger language.

## Image Callout Handoff Rules

Image and infographic callouts are a handoff to `amazon-image-stack`, not a replacement for its standard image stack structure.

- Treat callouts as optional expansion images that come after the core six-image stack.
- Rank callouts by commercial importance, source confidence, and whether the current image stack fails to answer the buyer question.
- Default to 1-3 strongest expansion candidates unless the user requests more.
- Do not recommend image callouts for gaps better solved in bullets, Q&A, attributes, or A+ copy.
- Each callout must include the buyer question or gap it answers, source, confidence, suggested visual treatment, and claim-risk notes.
- Never let audit callouts silently supersede the core image story. If upload slots are limited, recommend a prioritized upload order separately.

## Output Template

```markdown
# AI Shopping Visibility Audit - [Brand/Product]

Date: [YYYY-MM-DD]
ASIN/URL: [value]
Category: [category]
Audit Type: [Visible listing / Source packet / Listing + exports]

## Executive Summary

[3-5 bullets on what the listing answers well, where AI-style shopper questions break down, and the highest-value fix.]

## Product Fact Base

| Fact | Source | Confidence | Notes |
|---|---|---:|---|
| [fact] | [listing/spec/review/etc.] | High/Medium/Low | [notes] |

## Natural-Language Buyer Questions

| # | Buyer Question | Intent | Current Answer Coverage | Priority |
|---:|---|---|---:|---|
| 1 | [question] | [fit/use/comparison/etc.] | [0-3/N/A] | High/Med/Low |

## Surface Coverage

| Question | Title | Bullets | A+/Description | Images | Q&A | Reviews | Specs/Attributes | Gap |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| [question] | 0-3 | 0-3 | 0-3 | 0-3 | 0-3 | 0-3 | 0-3 | [gap] |

## Highest-Value Gaps

1. [Gap] - [why it matters commercially]

## Exact Rewrites

### Bullet Rewrites

- Current: [copy or missing]
- Recommended: [source-backed rewrite]
- Source: [source]

### A+ / Description Copy

[module or section copy]

### Q&A Additions

Q: [question]
A: [answer]
Source: [source]

### Image / Infographic Callouts

These are append-only candidates for `amazon-image-stack`; they should become `image-08.png` and onward unless the user explicitly requests a slot-constrained carousel.

| Priority | Buyer Question / Gap | Callout Copy | Source | Confidence | Suggested Visual Treatment | Claim Risk | Recommended Slot |
|---:|---|---|---|---|---|---|---|
| 1 | [question/gap] | [short mobile-readable callout] | [source] | High/Medium/Low | [visual direction] | [none/soften/unsupported] | image-08 |

### Attribute / Spec Additions

| Attribute | Draft Value | Source | Confidence |
|---|---|---|---|
| [attribute] | [value] | [source] | High/Medium/Low |

## Caveats

This is an AI shopping visibility audit based on available listing and source data. It does not access Amazon's proprietary AI shopping assistant, ranking system, or recommendation logic.
```

## When To Ask Questions

Ask only if:
- no listing/source data is available
- the product category is ambiguous and category materially changes the question set
- the user asks for exact compliance/legal review
- the requested rewrite needs facts that are missing or unsupported
