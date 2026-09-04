# Scoring method

Use this method for consistent coverage diagnostics. It measures how clearly available listing surfaces answer buyer questions. It is not a marketplace ranking score.

## Surface scores

Score each relevant surface for each question:

- `3` — directly answered with clear, source-backed detail.
- `2` — substantially answered but incomplete, indirect, or missing one decision-critical detail.
- `1` — weak, scattered, ambiguous, buried, or contradicted.
- `0` — not answered.
- `N/A` — the surface is not relevant or not available in the audit mode.

Surfaces:

1. Title
2. Bullets
3. Description/A+
4. Images and image text
5. Q&A
6. Reviews
7. Specs/attributes

Do not treat review coverage as seller-controlled coverage. A review may show that the question is discussed while still indicating a listing gap.

## Question-level coverage

Assign one `Current Answer Coverage` score per buyer question based on the strongest reliable seller-controlled answer, adjusted downward for contradictions or severe discoverability problems.

- A direct bullet answer may justify `3` even if other surfaces are blank.
- A fact present only in reviews normally cannot exceed `2` and remains a seller-controlled gap.
- Conflicting high-authority surfaces normally cap coverage at `1` or `2`, depending on severity.
- An unsupported answer is not coverage; score it `0` and flag the claim.

## Overall diagnostic

Exclude `N/A` questions.

```text
average coverage = sum(question coverage scores) / applicable question count
coverage percentage = sum(question coverage scores) / (3 × applicable question count) × 100
```

Round the average to one decimal place and the percentage to a whole number. Show both the numerator and denominator or the applicable question count.

## Priority-weighted diagnostic

Use only when it helps distinguish commercially important gaps:

```text
High = 3
Medium = 2
Low = 1

weighted percentage = sum(question score × priority weight)
                      / sum(3 × priority weight) × 100
```

Label it `Priority-weighted question coverage`, never `Alexa score`, `Rufus score`, or `Amazon score`.

## Gap priority

Classify each question High, Medium, or Low using:

- purchase-decision impact;
- return or dissatisfaction risk;
- frequency or salience in reviews/Q&A;
- differentiation value;
- search intent;
- source confidence; and
- feasibility of a source-backed fix.

The highest-value gap list should not simply repeat every zero. Prefer gaps that are commercially material and realistically fixable. Separate content fixes from fact-verification or operational fixes.

## Confidence

- **High:** direct and current evidence for the exact variant.
- **Medium:** indirect, older, brand-level, or repeated shopper evidence.
- **Low:** isolated shopper evidence, unclear variant, unresolved contradiction, or inference.

A high-priority question can still have low-confidence evidence. That means the first recommendation is fact verification, not copywriting.

