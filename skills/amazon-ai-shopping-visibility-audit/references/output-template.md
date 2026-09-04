# Output template

Use this structure for the complete report. Add category-specific detail when useful, but keep the evidence and scoring columns intact.

```markdown
# AI Shopping Visibility Audit — [Brand/Product]

Date: [YYYY-MM-DD]
ASIN/URL: [value]
Marketplace: [marketplace]
Audited variant: [variant/size/count/color]
Category: [category]
Audit mode: [Visible listing / Source packet / Listing + exports]

## Executive summary

- [What the listing answers well]
- [Question count and coverage diagnostic]
- [Largest contradiction or gap]
- [Highest-leverage fix]
- [Important evidence limitation]

## Product fact base

| Fact | Source | Confidence | Variant-specific | Time-sensitive | Notes |
|---|---|---:|---:|---:|---|
| [fact] | [source] | High/Medium/Low | Yes/No | Yes/No | [notes] |

## Natural-language buyer questions

Scoring: `3 = directly answered`; `2 = substantially but incompletely answered`; `1 = weak, ambiguous, buried, or contradicted`; `0 = unanswered`; `N/A = not applicable`.

| # | Buyer question | Intent | Current answer coverage | Priority |
|---:|---|---|---:|---|
| 1 | [question] | [fit/value/etc.] | 0–3/N/A | High/Medium/Low |

## Coverage diagnostic

- Applicable questions: [count]
- Average coverage: [x.x]/3
- Coverage percentage: [xx%]
- Priority-weighted question coverage: [xx% or Not calculated]

## Surface coverage

| Buyer question | Title | Bullets | A+/description | Images | Q&A | Reviews | Specs/attributes | Gap |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| [question] | 0–3/N/A | 0–3/N/A | 0–3/N/A | 0–3/N/A | 0–3/N/A | 0–3/N/A | 0–3/N/A | [gap] |

## Highest-value gaps

1. **[Gap]** — [Commercial reason, evidence state, and best destination for the fix.]

## Contradictions and verification gates

| Issue | Source A | Source B | Why it matters | Required decision |
|---|---|---|---|---|
| [conflict] | [source] | [source] | [impact] | [verification] |

## Exact rewrites

### Title notes

[Recommendation, source, and explicit exclusions.]

### Bullet rewrites

1. **[LEAD-IN]** — [Source-backed copy.]

Sources: [sources]
Gates: [if any]

### A+ / description copy

#### [Module name]

**Headline:** [headline]

**Body:** [body]

Sources: [sources]

### Q&A additions

**Q: [question]**  
**A:** [answer]  
**Source:** [source]

For blocked answers, write `Do not publish yet` and state the missing evidence.

### Image / infographic callouts

These are optional expansion candidates, not replacements for a core image stack.

| Priority | Buyer question/gap | Callout copy | Source | Confidence | Suggested treatment | Claim risk |
|---:|---|---|---|---|---|---|
| 1 | [gap] | [short copy] | [source] | High/Medium/Low | [direction] | [risk] |

### Attribute / spec additions

| Attribute | Draft value | Source | Confidence | Action |
|---|---|---|---:|---|
| [attribute] | [value] | [source] | High/Medium/Low | Add/Correct/Verify |

## Recommended execution order

1. [Fact verification or contradiction resolution]
2. [Catalog or copy correction]
3. [Content publication recommendation]
4. [Creative handoff]
5. [Recapture and re-audit]

## Caveats

This audit estimates AI shopping assistant readiness from visible and product-provided data. It does not access Amazon's proprietary models, ranking systems, or recommendation logic.

[Add source, review, time-sensitivity, and audit-mode limitations.]
```

