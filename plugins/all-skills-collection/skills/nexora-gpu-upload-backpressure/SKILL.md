---
name: nexora-gpu-upload-backpressure
description: "Controls GPU upload queues so texture, mesh, and buffer uploads cannot overwhelm frame time or memory."
---

# nexora gpu upload backpressure

## Purpose

Use this workflow for NEXORA-scale engine work when GPU upload queues and frame budgets. Inspect the actual code and document unknowns; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, target platforms, resource budgets, and compatibility requirements.
- Existing tests, logs, representative fixtures, and reproduction steps where available.
- Known risks and unresolved assumptions.

## Workflow

1. Measure queue depth and bytes in flight.
2. define per-frame and total-memory budgets.
3. prioritize visible and near-visible assets.
4. apply backpressure to producers.
5. avoid blocking the render thread on worker completion.
6. expose queue wait and upload latency metrics.
7. test bursts, device stalls, and cancellation.
8. benchmark representative scenes.
9. document fallback quality when the budget is exhausted.

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

Queue depth and upload memory stay bounded under bursts, with predictable degradation rather than frame collapse.

Do not drop required uploads silently or wait on GPU work while holding locks needed by completion callbacks.

## Trigger examples

- **Positive:** A code change or incident directly involves GPU upload queues and frame budgets and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The request is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The task is only documentation/content work with no runtime, reliability, or code behavior impact.
