---
name: skill-auto-test-run-evidence-pack
description: "Collects verifiable test evidence for a candidate skill release. Use when CI/runtime checks run across several environments."
---

# Automated Skill Test Evidence Pack

## Purpose

test plan, runner versions, raw results, fixtures, candidate digest, and redaction policy

## Required inputs

Record each check's tool/version, candidate digest, status, and evidence location.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Separate passed, failed, skipped, blocked, and flaky results, preserving redacted logs and reproduction steps.
3. A test evidence pack linked to the exact candidate with result summaries.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not mark skipped or unobserved tests as passed, and never include secrets in outputs. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not mark skipped or unobserved tests as passed, and never include secrets in outputs.

## Boundaries and failure handling

A skill release needs traceable evidence before promotion. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** No candidate exists and no tests are run.
- **Negative:** undefined
