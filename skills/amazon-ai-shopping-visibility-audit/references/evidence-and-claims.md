# Evidence and claim rules

Read this reference before building the fact base or drafting changes.

## Evidence hierarchy

Prefer the most direct, current source for the exact audited variant:

1. Current manufacturer specification, compliance document, or current physical packaging supplied by the user.
2. Exact live Amazon ASIN and visible variant.
3. Current brand/manufacturer product page for the same variant.
4. User-supplied catalog exports, product briefs, or approved copy.
5. Amazon Q&A and reviews as shopper evidence.
6. Inference only when clearly labelled and never used as a proposed product fact.

Source precedence is contextual. A current physical label may outrank stale listing copy; a marketplace-specific size or pack count may outrank a generic brand page. Explain the decision when sources conflict.

## Fact-base fields

For each material fact record:

- fact;
- exact source;
- confidence: High, Medium, or Low;
- whether it is variant-specific;
- whether it is time-sensitive;
- contradiction or verification note.

## Variant lock

Lock the ASIN, marketplace, selected variation, size/count, color/flavor/style, and audit date before analysis. Do not borrow facts from sibling variations unless the source explicitly applies to all variants. Quarantine conflicting imagery, dimensions, ingredients, counts, claims, or model compatibility.

## Claim treatment

- Do not invent dimensions, materials, ingredients, compatibility, certifications, awards, origin, warranties, guarantees, clinical proof, or compliance attributes.
- Do not strengthen a source claim. `May help` cannot become `proven to`; `water resistant` cannot become `waterproof`.
- Do not use certification marks or regulated badges without documentation.
- Flag medical, health, safety, environmental, legal, and performance claims for substantiation.
- Keep negative findings visible. Do not solve an evidence problem with more persuasive copy.

## Reviews and Q&A

Reviews and Q&A reveal language, objections, fit patterns, and possible failure modes. They do not establish manufacturer facts.

Use formulations such as:

- `A recurring review theme is ...`
- `Some shoppers report ...`
- `This requires manufacturer confirmation before becoming listing copy.`

Never convert a single review into a generalized claim. Report sample limitations and distinguish Amazon-generated review summaries from individual review evidence.

## Time-sensitive evidence

Price, stock, coupons, badges, ratings, review counts, sales-volume labels, seller identity, fulfillment, and rank can change quickly. Record the capture date and do not turn them into durable product copy without a separate rationale.

## Contradictions

For each contradiction:

1. Show both statements and their sources.
2. Explain why the conflict affects buyer confidence or machine legibility.
3. Name the source-of-truth decision required.
4. Block any rewrite that depends on the unresolved fact.

