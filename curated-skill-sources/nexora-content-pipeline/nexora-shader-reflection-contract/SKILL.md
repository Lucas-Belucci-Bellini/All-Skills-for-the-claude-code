---
name: nexora-shader-reflection-contract
description: "Validates compiled shader interfaces against renderer expectations before pipeline creation."
---

# nexora shader reflection contract

## Purpose

Use this workflow for NEXORA-scale engine work when shader reflection and pipeline interface validation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define required descriptor, buffer, vertex, and push-constant interfaces.
2. reflect compiled shader outputs.
3. compare names or stable IDs, types, offsets, and stage visibility.
4. validate alignment and device limits.
5. include interface hashes in pipeline cache keys.
6. reject incompatible programs before submission.
7. test missing and extra bindings.
8. emit source-linked diagnostics.
9. version the interface contract.

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

Only shader programs matching the renderer interface reach pipeline creation.

Do not rely on debug names alone when layout identity is structural. Avoid using mismatched buffers after a warning-only validation.

## Trigger examples

- **Positive:** A code change or incident directly involves shader reflection and pipeline interface validation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
