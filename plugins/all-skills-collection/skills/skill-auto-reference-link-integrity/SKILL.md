---
name: skill-auto-reference-link-integrity
description: "Checks links and local references in skill packages. Use before packaging skills with reference docs, scripts, assets, or external URLs."
---

# Automated Skill Reference Link Integrity

## Purpose

canonical files, relative-link rules, allowed link protocols, and package root

## Required inputs

Resolve local paths relative to their documented owner and verify referenced files exist within the expected package.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Check unsafe traversal, missing assets, malformed URLs, and references that point to generated-only paths.
3. A reference integrity report with broken targets and severity.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not fetch arbitrary network targets or execute referenced scripts as part of a link check. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not fetch arbitrary network targets or execute referenced scripts as part of a link check.

## Boundaries and failure handling

A new skill links to references and helper scripts. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The skill has no references or linked resources.
- **Negative:** undefined
