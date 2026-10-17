---
name: skill-auto-maintainer-review-prompt
description: "Generates focused review questions from a skill diff and its risk class. Use when a candidate requires human decisions."
---

# Automated Maintainer Review Prompt

## Purpose

diff, gap request, overlap report, risk classification, and test evidence

## Required inputs

Identify maintainer decisions on scope uniqueness, safety, provenance, compatibility, and release eligibility.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Order questions by impact and include exact evidence needed to decide each item.
3. A concise review checklist separating blockers from optional improvements.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not ask a maintainer to rubber-stamp a change or hide unresolved blockers. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not ask a maintainer to rubber-stamp a change or hide unresolved blockers.

## Boundaries and failure handling

A generated skill candidate is ready for human review. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The patch is mechanical and no policy or behavior decision remains.
- **Negative:** undefined
