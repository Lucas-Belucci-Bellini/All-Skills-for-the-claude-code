---
name: skill-auto-revoke-bad-version
description: "Defines how an unsafe or broken skill version is removed from latest-approved resolution. Use after confirmed integrity, security, or severe regression failure."
---

# Automated Revocation of Bad Skill Versions

## Purpose

version ID/digest, evidence, authorization policy, cache state, and rollback version

## Required inputs

Confirm the affected immutable version and decide whether policy requires deprecation, blocking, or revocation.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Remove it from eligible resolution, notify compatible adapters, and verify clients cannot fetch it as current latest.
3. A revocation record with evidence, affected version, propagation status, and verified replacement if available.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not destroy audit history or silently substitute a different version for an exact pin. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not destroy audit history or silently substitute a different version for an exact pin.

## Boundaries and failure handling

A released skill is confirmed unsafe or severely broken. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** A draft has never been distributed and can remain quarantined.
- **Negative:** undefined
