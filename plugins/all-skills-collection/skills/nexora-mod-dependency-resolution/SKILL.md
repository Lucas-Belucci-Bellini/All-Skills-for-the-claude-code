---
name: nexora-mod-dependency-resolution
description: "Resolves mod dependencies and version constraints deterministically before world loading."
---

# nexora mod dependency resolution

## Purpose

Use this workflow for NEXORA-scale engine work when mod dependency solver and compatibility checks. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Parse mod manifests with strict schema validation.
2. normalize semantic versions and ranges.
3. detect missing and incompatible dependencies.
4. compute a stable topological order.
5. detect cycles and conflicting singleton providers.
6. report the minimal conflict set.
7. distinguish optional from required dependencies.
8. test shuffled installation order and version edge cases.
9. persist the resolved mod set with world metadata.

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

The same mod set resolves identically regardless of filesystem order and conflicts are diagnosed before load.

Do not silently upgrade or remove required mods. Never execute mod initialization before dependency resolution succeeds.

## Trigger examples

- **Positive:** A code change or incident directly involves mod dependency solver and compatibility checks and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
