---
name: nexora-engine-startup-phase-gates
description: "Makes engine startup phases explicit so dependent subsystems cannot run before configuration, assets, jobs, and platform services are ready."
---

# nexora engine startup phase gates

## Purpose

Use this workflow for NEXORA-scale engine work when engine initialization and partial-startup failure. Inspect the actual code and document unknowns; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, target platforms, resource budgets, and compatibility requirements.
- Existing tests, logs, representative fixtures, and reproduction steps where available.
- Known risks and unresolved assumptions.

## Workflow

1. Inventory startup dependencies and ownership.
2. define named phases and required postconditions.
3. validate configuration and paths before allocating expensive resources.
4. start workers only after their dependencies are ready.
5. roll back already-created resources on failure.
6. prevent public APIs from exposing partially initialized state.
7. test failures at every phase.
8. ensure shutdown handles partial initialization.
9. Document rollback or safe fallback behavior..

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Source and bundle copies are byte-identical.
- [ ] Focused tests and static checks pass, or skipped checks are reported honestly.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Report the decision, invariants, code paths reviewed or changed, tests and results, performance/compatibility implications, and unresolved risks.

## Boundaries and failure handling

Startup either reaches a declared ready state or fails with a phase-specific diagnostic and releases owned resources.

Do not use arbitrary sleeps to hide ordering bugs. Avoid publishing global handles before their initialization contract is satisfied.

## Trigger examples

- **Positive:** A code change or incident directly involves engine initialization and partial-startup failure and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation/content work with no runtime, reliability, or code behavior impact.
