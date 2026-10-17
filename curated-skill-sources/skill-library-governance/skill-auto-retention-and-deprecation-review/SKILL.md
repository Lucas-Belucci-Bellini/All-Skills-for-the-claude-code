---
name: skill-auto-retention-and-deprecation-review
description: "Evaluates whether skills remain supportable as APIs and tools change. Use during periodic catalog maintenance."
---

# Automated Skill Retention and Deprecation Review

## Purpose

quality/usage evidence, last validated versions, dependencies, compatibility matrix, and owner policy

## Required inputs

Identify stale references, unsupported commands, untested platforms, low-value overlap, and missing maintainers.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Recommend retain, revalidate, deprecate, replace, or merge-for-review with impact and migration requirements.
3. A lifecycle review queue with evidence and safe next steps.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not delete a skill because telemetry is absent; unknown usage is not proof of no value. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not delete a skill because telemetry is absent; unknown usage is not proof of no value.

## Boundaries and failure handling

A skill references an old API or platform feature and needs review. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The skill has current evidence and no maintenance trigger is due.
- **Negative:** undefined
