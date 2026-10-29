---
name: nexora-platform-path-canonicalization
description: "Normalizes and validates asset and save paths consistently across operating systems."
---

# nexora platform path canonicalization

## Purpose

Use this workflow for NEXORA-scale engine work when portable path canonicalization. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define logical path encoding independent of host separators.
2. reject traversal and unsupported components.
3. normalize Unicode according to a documented policy.
4. handle case sensitivity and reserved names.
5. resolve symlinks safely.
6. detect canonical collisions.
7. test long paths and non-ASCII names.
8. keep persisted paths platform-neutral.
9. document conversion errors.

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Changes preserve source/plugin byte parity and catalog uniqueness.
- [ ] Focused tests, formatting, and applicable static checks pass; skipped checks are listed.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Provide the decision and scope, invariants, code paths reviewed or changed, tests and results, compatibility implications, and unresolved risks.

## Boundaries and failure handling

Equivalent logical paths map consistently and unsafe or colliding paths are rejected.

Do not assume Unicode normalization or case behavior is identical across filesystems.

## Trigger examples

- **Positive:** A code change or incident directly involves portable path canonicalization and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
