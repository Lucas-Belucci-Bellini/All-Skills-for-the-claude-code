---
name: skill-auto-publish-readiness
description: "Determines whether a reviewed candidate meets release requirements. Use before updating the approved catalog or distribution bundle."
---

# Automated Skill Publish Readiness Gate

## Purpose

candidate revision, required check results, approval record, provenance status, and release policy

## Required inputs

Reconcile mandatory gates with observed CI/runtime evidence and explicit exceptions.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Block promotion for failed gates, missing approval, unknown provenance, or inconsistent catalog metadata.
3. A publish-readiness decision with passed, failed, blocked, and review-required checks.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce a model confidence score cannot replace required human approval or a failed test. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

A model confidence score cannot replace required human approval or a failed test.

## Boundaries and failure handling

A candidate skill passed review and is considered for release. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** Required validation is pending or the change remains a draft.
- **Negative:** undefined
