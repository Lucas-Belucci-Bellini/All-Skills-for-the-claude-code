---
name: nexora-content-load-order-independence
description: "Ensures content registries and mod assets resolve identically regardless of filesystem or package enumeration order."
---

# nexora content load order independence

## Purpose

Use this workflow for NEXORA-scale engine work when content loading order and deterministic registries. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify all order-dependent registration and override paths.
2. sort inputs by stable identifiers.
3. resolve dependencies before registration.
4. define precedence for intentional overrides.
5. detect duplicate IDs and ambiguous ordering.
6. test randomized package enumeration.
7. compare registry hashes across runs.
8. ensure diagnostics report both conflicting owners.
9. preserve explicit user priority where supported.

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

Equivalent content sets produce identical registry results regardless of incidental enumeration order.

Do not use first-found behavior as precedence. Make intentional overrides explicit and auditable.

## Trigger examples

- **Positive:** A code change or incident directly involves content loading order and deterministic registries and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
