# AI Shopping Auditor for Accio Work

An Accio Work plugin created by John Aspinall that audits Amazon listings through natural-language buyer questions, scores how clearly listing surfaces answer them, and produces source-backed content recommendations.

## What it delivers

- An evidence-backed product fact base locked to the exact ASIN and variant
- 20–30 natural-language buyer questions, including high-intent long-tail questions
- Coverage scoring across title, bullets, A+, images, Q&A, reviews, and attributes
- Prioritized commercial gaps and contradiction flags
- Exact rewrite recommendations for listing copy, Q&A, attributes, and optional image callouts
- Explicit source, confidence, and claim-risk handling

The output is a content-readiness diagnostic. It is not an Amazon, Rufus, or Alexa ranking score and does not access proprietary Amazon systems.

## Accio Work package

```text
plugin.json
prompt.md
skills/
  amazon-ai-shopping-visibility-audit/
    SKILL.md
    display.txt
    references/
    examples/
subagents/
  ai-shopping-auditor/
    prompt.md
resources/
  icon.svg
  banner.svg
  recommend.json
  i18n.json
```

`plugin.json` exposes one global Skill and one public SubAgent. The SubAgent loads the core Skill in `systemPrompt` mode; detailed methodology is progressively disclosed through references.

## Installation in Accio Work

1. Download the ZIP attached to the latest GitHub Release.
2. Open Accio Work.
3. Go to **Settings → Plugins → Import local plugin**.
4. Select the extracted plugin folder containing `plugin.json`.
5. If Accio does not refresh immediately, disable and re-enable the plugin or restart Accio Work.
6. Confirm that **AI Shopping Auditor** and the **AI Shopping Visibility Audit** capability are visible.

The plugin has no required Connector, account authorization, CLI, or API key.

## Use

Start with one of these prompts:

```text
Run a complete AI shopping visibility audit for Amazon ASIN B0XXXXXXXXX.
```

```text
Audit the attached listing screenshots and product specification sheet. Clearly label anything that needs manufacturer confirmation.
```

```text
Find the highest-intent buyer questions this listing fails to answer, then draft exact source-backed fixes.
```

## Inputs

At least one of:

- Amazon URL or ASIN
- Listing screenshots or exports
- Product specification or compliance sheet
- Current packaging and product images
- Listing copy, A+ content, Q&A, or review export

The plugin can continue from supplied materials when live Amazon access is blocked. It will not bypass CAPTCHA, login, bot protection, or other access controls.

## Local validation

Requires Node.js 20+ and the standard `zip`/`unzip` utilities.

```bash
node scripts/validate-package.mjs
bash scripts/build-release.sh
```

The validator checks the manifest, SubAgent and Skill wiring, required metadata, JSON resources, internal references, portability, character limits, and prohibited placeholders. The build script creates a minimal Accio import ZIP plus a SHA-256 checksum under `dist/`.

## Status

Version `0.1.0` is the Alibaba pilot package. Static validation and ZIP integrity are automated. Runtime import and end-to-end execution inside the current Accio Work build must be recorded separately using [the acceptance test](docs/acceptance-test.md).

## Ownership

Copyright © 2026 John Aspinall. All rights reserved. This repository is private and unlicensed unless a separate written agreement states otherwise.

