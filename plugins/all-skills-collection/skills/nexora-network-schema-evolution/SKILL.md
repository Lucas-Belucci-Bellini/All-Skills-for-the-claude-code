---
name: nexora-network-schema-evolution
description: "Evolves network message schemas without misinterpreting fields across client/server versions."
---

# nexora network schema evolution

## Purpose

Use this workflow for NEXORA-scale engine work when network protocol schema evolution. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define required and optional fields per message version.
2. reserve stable field IDs.
3. specify unknown-field behavior.
4. gate incompatible capabilities during handshake.
5. test old/new peer fixtures.
6. preserve numeric and enum compatibility.
7. validate payload bounds before decoding.
8. document transition windows.
9. add compatibility tests to CI.

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

Compatible peers exchange messages correctly and incompatible semantics are rejected before gameplay mutation.

Do not reuse removed field IDs or silently reinterpret enum values.

## Trigger examples

- **Positive:** A code change or incident directly involves network protocol schema evolution and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
