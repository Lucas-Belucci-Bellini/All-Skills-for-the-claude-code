---
name: skill-auto-canary-update-rollout
description: "Rolls an approved skill update out gradually before wider distribution. Use when a skill change could affect many agent clients."
---

# Automated Canary Update Rollout

## Purpose

approved version, eligible test clients, rollback trigger, telemetry signals, and rollout policy

## Required inputs

Select a small authorized canary cohort while preserving exact version pins for other clients.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Observe fetch failures, routing regressions, task outcomes, and safety signals against declared thresholds before expansion.
3. A rollout record with cohort, observed metrics, go/no-go decision, and rollback status.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not expose private client content or silently update pinned projects during canary rollout. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not expose private client content or silently update pinned projects during canary rollout.

## Boundaries and failure handling

A behavior-changing skill release is approved for controlled rollout. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The change is a nonbehavioral correction and policy allows a regular update.
- **Negative:** undefined
