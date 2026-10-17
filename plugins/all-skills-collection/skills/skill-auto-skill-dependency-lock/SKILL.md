---
name: skill-auto-skill-dependency-lock
description: "Locks exact dependencies for a reproducible skill bundle. Use when composite workflows reference other skills or helpers."
---

# Automated Skill Dependency Lock

## Purpose

dependency graph, allowed version ranges, release policy, and package manifest

## Required inputs

Resolve each required dependency to immutable ID/version/digest and detect incompatible ranges or cycles.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Write a lock file and verify stability for an unchanged catalog snapshot.
3. A dependency lock and resolution report with unresolved requirements.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not let mutable latest references determine release content without recording the resolved digest. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not let mutable latest references determine release content without recording the resolved digest.

## Boundaries and failure handling

A composite workflow must reproduce the same dependency closure. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The skill is independent and declares no dependencies.
- **Negative:** undefined
