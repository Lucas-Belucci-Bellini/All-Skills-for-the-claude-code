---
name: skill-auto-generated-copy-integrity
description: "Checks generated skill bundles against canonical sources. Use after every source batch or before release."
---

# Automated Generated Copy Integrity

## Purpose

canonical source trees, generated bundle roots, file modes, and sync output

## Required inputs

Compare source and bundle subtrees byte-for-byte and compare executable modes where relevant.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Report missing, extra, mismatched, or namespaced files and block release until required parity is restored.
3. A parity report with exact paths, hashes, and failed checks.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not edit generated bundles by hand as a permanent source-of-truth fix. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not edit generated bundles by hand as a permanent source-of-truth fix.

## Boundaries and failure handling

A new skill batch has matching source and plugin package directories. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** No generated distribution copy exists for the artifact being reviewed.
- **Negative:** undefined
