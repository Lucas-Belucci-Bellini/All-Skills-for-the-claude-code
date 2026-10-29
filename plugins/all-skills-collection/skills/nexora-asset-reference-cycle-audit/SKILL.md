---
name: nexora-asset-reference-cycle-audit
description: "Detects cyclic references among prefabs, scenes, materials, and other content records before loading."
---

# nexora asset reference cycle audit

## Purpose

Use this workflow for NEXORA-scale engine work when asset and prefab reference cycles. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Build a typed reference graph.
2. classify legal runtime cycles versus illegal construction-time recursion.
3. detect cycles with a bounded graph algorithm.
4. report a concrete cycle path and owning assets.
5. distinguish strong ownership from weak references.
6. test self-reference and multi-node cycles.
7. prevent recursive loading from exhausting stack or memory.
8. define lazy resolution where supported.
9. add cycle fixtures to CI.

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

Illegal cycles are diagnosed before runtime loading and permitted cycles have explicit resolution semantics.

Do not reject legal runtime references indiscriminately. Prevent recursive loaders from growing without bound.

## Trigger examples

- **Positive:** A code change or incident directly involves asset and prefab reference cycles and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
