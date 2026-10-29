---
name: nexora-worldgen-stage-contract
description: "Defines stable inputs and outputs between terrain generation stages so changes remain testable and deterministic."
---

# nexora worldgen stage contract

## Purpose

Use this workflow for NEXORA-scale engine work when world generation stage architecture. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory generation stages and their input/output contracts.
2. separate pure data transforms from world mutation.
3. define stable seed derivation per stage.
4. version stage outputs used by persisted worlds.
5. declare dependencies and ordering.
6. test each stage with small fixtures.
7. verify parallel execution does not change outputs.
8. profile stage costs and memory.
9. document fallback when optional stages fail.

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

Each stage has explicit inputs, outputs, version semantics, and deterministic tests.

Do not let stages depend on hidden global random state or filesystem enumeration order.

## Trigger examples

- **Positive:** A code change or incident directly involves world generation stage architecture and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
