---
name: nexora-property-test-world-invariants
description: "Uses property-based tests to verify world-coordinate, chunk, and persistence invariants across broad input ranges."
---

# nexora property test world invariants

## Purpose

Use this workflow for NEXORA-scale engine work when property testing world and chunk invariants. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. List invariants independent of specific examples.
2. define generators for valid and near-invalid coordinates and chunk states.
3. constrain generated sizes to reproducible resource limits.
4. preserve failing seeds and shrunk cases.
5. test round-trip conversions and state transitions.
6. include negative and extreme boundaries.
7. run the same properties against reference implementations where possible.
8. classify flaky or environment-dependent properties.
9. turn discovered failures into fixed regression cases.

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

Generated cases exercise documented invariants and every failure can be replayed from a saved seed or fixture.

Do not use unbounded generators that make CI nondeterministic in duration. A passing property suite does not prove untested invariants.

## Trigger examples

- **Positive:** A code change or incident directly involves property testing world and chunk invariants and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
