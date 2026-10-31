---
name: nexora-mod-api-compatibility-gate
description: "Prevents incompatible mods from calling engine APIs with changed semantics or ABI expectations."
---

# nexora mod api compatibility gate

## Purpose

Use this workflow for NEXORA-scale engine work when mod API versioning and compatibility gates. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define public API version and compatibility policy.
2. classify breaking versus additive changes.
3. validate mod-declared API ranges before initialization.
4. version serialized extension data separately from runtime APIs.
5. provide migration adapters where supportable.
6. test old and new mod fixtures.
7. emit actionable rejection diagnostics.
8. track deprecated calls.
9. document native ABI constraints and trust levels.

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

Unsupported mods are rejected or adapted explicitly before they can mutate world state.

Do not claim ABI stability for an undocumented native interface. Avoid running partially initialized incompatible mods.

## Trigger examples

- **Positive:** A code change or incident directly involves mod API versioning and compatibility gates and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
