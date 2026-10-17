---
name: skill-auto-update-approval-record
description: "Records who or what authorized a skill update and what was approved. Use when automated promotion has gated decisions."
---

# Automated Skill Update Approval Record

## Purpose

candidate digest, approver identity/role, approval policy, CI results, and release scope

## Required inputs

Bind approval to the exact candidate digest and intended scope rather than a mutable branch label.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Validate approver authority, independent review requirements, expiry, and whether the candidate changed after approval.
3. An approval record tied to the candidate digest and test evidence.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not infer approval from silence or a checkmark produced by the authoring agent. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not infer approval from silence or a checkmark produced by the authoring agent.

## Boundaries and failure handling

A tested skill change is ready for a maintainer's release decision. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** No release or gated promotion is being considered.
- **Negative:** undefined
