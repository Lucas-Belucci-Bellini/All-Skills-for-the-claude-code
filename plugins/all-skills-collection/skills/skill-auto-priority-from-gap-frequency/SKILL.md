---
name: skill-auto-priority-from-gap-frequency
description: "Prioritizes gap reports using recurrence and impact. Use when multiple agents request missing capabilities."
---

# Automated Skill Gap Priority from Frequency

## Purpose

deduplicated gap IDs, counts, impact, urgency, evidence quality, and privacy-safe metadata

## Required inputs

Aggregate recurring requests by normalized capability while retaining traceability to sanitized evidence.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Score impact, blocked work, frequency, risk, and existing workarounds; document ties and human overrides.
3. A ranked queue with score components, recurrence evidence, and triage decisions.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not prioritize easy low-impact requests over critical security gaps based on count alone. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not prioritize easy low-impact requests over critical security gaps based on count alone.

## Boundaries and failure handling

Several agent sessions report the same missing workflow. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** Only one isolated request exists and no prioritization is needed.
- **Negative:** undefined
