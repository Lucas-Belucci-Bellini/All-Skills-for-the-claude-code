---
name: skill-auto-version-bump-policy
description: "Maps semantic changes to version increments. Use when maintaining immutable releases for skills and packages."
---

# Automated Skill Version Bump Policy

## Purpose

current version, semantic diff, compatibility impact, and versioning rules

## Required inputs

Classify changes as patch, minor, breaking, security withdrawal, or metadata-only according to published policy.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Check skill and package versions independently and update dependent manifests only where required.
3. A version decision with reason, new identifier, and dependency impact.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not bump versions merely to imply quality or force consumers off a pin. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not bump versions merely to imply quality or force consumers off a pin.

## Boundaries and failure handling

A skill changes its required inputs or output contract. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** No released artifact or versioned consumer depends on the changed file.
- **Negative:** undefined
