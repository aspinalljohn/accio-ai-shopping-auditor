# Architecture

## Product surface

The named **AI Shopping Auditor** SubAgent is the one-click specialist users interact with. Its prompt defines the input contract, completion behavior, and high-level safety boundaries.

## Method layer

The `amazon-ai-shopping-visibility-audit` Skill owns the audit method. Its compact entrypoint is injected into the SubAgent system prompt. Detailed question generation, evidence handling, scoring, report structure, and QA are stored as linked references and loaded only when needed.

## Discovery layer

The Skill is listed in `plugin.json → skillIds`, making it global to external Agents that reference the plugin. A narrow `web_fetch` URL trigger provides a fallback discovery path for direct Amazon product-page fetches. The SubAgent does not depend on that trigger because the Skill is injected explicitly.

The trigger must be rechecked against the actual tool names emitted by the target Accio Work build. If its browser or fetch tool uses another name, update the trigger after observing a real run.

## Data access

Version 0.1.0 has no blocking Connector. It accepts public listing evidence or user-supplied source material. This keeps installation simple and avoids representing third-party listing data as complete when Amazon blocks or varies page access.

If Alibaba later requires stable structured capture, add an optional Connector only after:

1. the Connector ID and authentication contract are confirmed;
2. two or three representative audits expose the exact native-tool failure modes;
3. `usage` points Agents to the bundled Skill; and
4. the Connector remains non-blocking unless the plugin cannot function without it.

## Mutation boundary

The plugin audits and recommends. It does not modify Seller Central, upload images, publish copy, message third parties, or perform account actions. Those are separate workflows requiring separate user intent and authorization.

