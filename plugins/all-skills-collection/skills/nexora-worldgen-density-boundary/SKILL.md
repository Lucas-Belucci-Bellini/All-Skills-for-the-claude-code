---
name: nexora-worldgen-density-boundary
description: "Prevents terrain density fields from producing cracks or inconsistent surfaces at chunk boundaries."
---

# nexora worldgen density boundary

## Purpose

Use this workflow for NEXORA-scale engine work when terrain density fields and chunk seams. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define coordinate sampling conventions and boundary inclusion rules.
2. ensure neighboring chunks evaluate shared samples consistently.
3. specify interpolation precision and quantization.
4. derive randomness from world coordinates and seed.
5. test negative coordinates and exact chunk edges.
6. compare adjacent border samples.
7. generate diagnostic slices for failures.
8. verify LOD transitions use compatible field semantics.
9. add seam regression fixtures.

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

Adjacent chunks agree on shared field samples and seams can be reproduced from a seed.

Do not sample shared borders using chunk-local random sequences. Document any intentionally approximate LOD boundary.

## Trigger examples

- **Positive:** A code change or incident directly involves terrain density fields and chunk seams and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
