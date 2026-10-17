---
name: skill-auto-gap-triage-dedup
description: "Ranks incoming skill-gap reports and consolidates duplicates. Use when several agents report similar missing capabilities."
---

# Automated Gap Triage and Deduplication

## Purpose

current catalog, gap submissions, prior decisions, sanitized evidence, and recurrence counts

## Required inputs

Normalize the requested capability into atomic task, trigger, inputs, output, and verification requirements.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Compare exact scope and semantic neighbors, aggregate recurrence, and route the gap to new-skill, existing-skill revision, adapter bug, or insufficient evidence.
3. A deduplicated gap triage queue with disposition, priority evidence, and linked reports.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not create a new skill merely because a report uses different wording; preserve the original evidence and decision history. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not create a new skill merely because a report uses different wording; preserve the original evidence and decision history.

## Boundaries and failure handling

Many agents report that no skill covers a particular recipe-conflict workflow. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** A single valid skill already covers the workflow and only needs to be retrieved.
- **Negative:** undefined
