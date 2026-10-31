---
name: nexora-simulation-render-snapshot-boundary
description: "Separates authoritative simulation state from render interpolation snapshots to prevent data races and visual feedback into gameplay."
---

# nexora simulation render snapshot boundary

## Purpose

Use this workflow for NEXORA-scale engine work when simulation/render thread boundary. Inspect the actual code and document unknowns; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, target platforms, resource budgets, and compatibility requirements.
- Existing tests, logs, representative fixtures, and reproduction steps where available.
- Known risks and unresolved assumptions.

## Workflow

1. Identify authoritative state ownership and the render-facing data contract.
2. publish immutable or safely synchronized snapshots at defined tick boundaries.
3. include tick/version metadata.
4. interpolate only presentation values.
5. prevent render code from mutating simulation state.
6. define behavior when rendering falls behind.
7. test concurrent reads and delayed frames.
8. instrument snapshot age and copy cost.
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

Rendering consumes coherent snapshots and cannot alter authoritative gameplay state; stale snapshot behavior is explicit.

Do not share mutable ECS/world references across threads without a documented synchronization contract. Avoid unbounded snapshot queues.

## Trigger examples

- **Positive:** A code change or incident directly involves simulation/render thread boundary and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation/content work with no runtime, reliability, or code behavior impact.
