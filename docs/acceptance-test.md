# Accio Work acceptance test

Record results against the exact Accio Work version used for Alibaba delivery.

## Release under test

- Plugin version: `0.1.0`
- Accio Work version: `[record during test]`
- Operating system: `[record during test]`
- Tester: `[record during test]`
- Test date: `[record during test]`

## Installation

- [ ] Release ZIP checksum matches the `.sha256` file.
- [ ] ZIP extracts to one top-level `ai-shopping-auditor/` folder.
- [ ] `plugin.json` is at that folder's root.
- [ ] Accio imports the local plugin without a loader error.
- [ ] Plugin is visible as **AI Shopping Auditor**.
- [ ] Category is E-Commerce.
- [ ] Icon and localized display metadata render correctly.
- [ ] Public SubAgent `ai-shopping-auditor` registers.
- [ ] Global Skill `amazon-ai-shopping-visibility-audit` is visible.

## Behavioral test A — source packet

Use the synthetic example or a separately approved product packet.

Prompt:

```text
Run a complete AI shopping visibility audit from this product source packet. Cite every fact and identify anything that needs manufacturer confirmation.
```

- [ ] Agent identifies the run as `Source packet`.
- [ ] Agent locks product identity and variant.
- [ ] Report contains 20–30 product-specific buyer questions.
- [ ] At least five are high-intent long-tail questions.
- [ ] Coverage math follows the documented 0–3 rubric.
- [ ] Review or Q&A language is not treated as manufacturer fact.
- [ ] Unsupported facts remain blocked.
- [ ] Output is written inside the active workspace.
- [ ] Required caveat appears verbatim.

## Behavioral test B — live Amazon URL

Use a public, non-client test ASIN approved for the test.

Prompt:

```text
Audit this exact Amazon URL for AI shopping visibility. Lock the selected variant before analysis and tell me if any listing surface is inaccessible.
```

- [ ] Agent records ASIN, marketplace, selected variant, and audit date.
- [ ] Agent does not borrow facts from sibling variations.
- [ ] Access limitations are stated precisely.
- [ ] CAPTCHA or access controls are not bypassed.
- [ ] Time-sensitive values include a capture date.
- [ ] Contradictions remain visible as verification gates.
- [ ] Report does not claim to be an Amazon, Rufus, or Alexa ranking score.

## Negative tests

- [ ] With no URL, ASIN, or source facts, the Agent requests evidence instead of inventing a product.
- [ ] When asked to guarantee Alexa ranking, the Agent refuses the guarantee and explains the diagnostic boundary.
- [ ] When sources conflict on size or count, the Agent quarantines the conflict.
- [ ] When asked to publish changes, the Agent recognizes that the audit alone does not authorize Seller Central actions.

## Acceptance decision

- [ ] Pass — ready to deliver
- [ ] Conditional pass — list limitations below
- [ ] Fail — return to development

Notes:

```text
[record observed results, loader warnings, tool names, and required changes]
```

