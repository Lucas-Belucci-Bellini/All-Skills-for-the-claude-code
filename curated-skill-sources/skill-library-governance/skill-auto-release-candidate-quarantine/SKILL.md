---
name: skill-auto-release-candidate-quarantine
description: "Keeps unvalidated skills separate from approved distribution. Use when AI-generated changes are uploaded before approval."
---

# Automated Release Candidate Quarantine

## Purpose

candidate ID, quality state, storage layout, broker eligibility policy, and release process

## Required inputs

Define a distinct candidate namespace and prevent ordinary clients from resolving draft/quarantined content.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Test direct ID fetch, fuzzy search, cached results, and package generation to verify quarantine boundaries.
3. A quarantine policy and negative-access test report.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not expose draft candidates as approved merely to let agents try them in production. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not expose draft candidates as approved merely to let agents try them in production.

## Boundaries and failure handling

A new skill proposal needs testing before general distribution. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The skill is already approved and its release digest is fixed.
- **Negative:** undefined
