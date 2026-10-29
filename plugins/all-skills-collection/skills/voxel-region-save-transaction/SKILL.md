---
name: voxel-region-save-transaction
description: "Defines atomic region persistence so interrupted writes cannot silently corrupt neighboring chunks or erase the last valid save."
---

# Make region saves crash-safe

## Purpose

Use this workflow when changing region layout, write protocol, checksums, and recovery fixtures in a voxel engine such as NEXORA or another large world-simulation codebase. Make lifecycle, data ownership, determinism, and recovery behavior explicit before optimizing.

## Required inputs

- Relevant chunk/world data structures, owning modules, and the current diff.
- Existing tests, save fixtures, job scheduling rules, and performance constraints.
- A reproducible bug, planned change, or acceptance criteria.
- Known compatibility and data-loss risks; mark unknowns instead of assuming them.

## Workflow

1. Trace the data path from request or mutation through worker jobs and derived data to persistence or rendering.
2. Define invariants for ownership, versioning, ordering, boundaries, cancellation, and failure recovery that apply to this change.
3. Inspect concurrency and invalidation paths, including unload/reload, neighboring chunks, duplicate requests, and shutdown where relevant.
4. Implement the smallest change that preserves existing save compatibility and public behavior. Use explicit states or version tokens where stale work can complete late.
5. Add regression fixtures for the reported defect and adversarial cases at chunk boundaries, under repeated requests, and during partial failure.
6. Validate determinism by repeating the same input and comparing stable outputs where determinism is required.
7. Run focused tests, formatting, linting, and the repository's documented validation commands. Record unrun checks and their blockers.
8. Review memory lifetime, bounded work queues, save recovery, diagnostics, and migration implications before reporting completion.

## Validation checklist

- [ ] Ownership and state transitions are documented or obvious from the code.
- [ ] Stale or duplicate work cannot overwrite newer state.
- [ ] Boundary and failure cases have regression coverage.
- [ ] Persistence changes preserve a recoverable last-known-good state.
- [ ] Deterministic behavior is tested when it is part of the contract.
- [ ] Tests and static checks pass, or failures are reported accurately.
- [ ] No unbounded queue, unbounded retry, or hidden destructive fallback was introduced.

## Required output

Report the invariant being protected, code paths changed, tests/fixtures added, commands and results, performance implications, save compatibility risks, and remaining uncertainties. Mark status as validated, partially validated, or blocked.

## Boundaries and failure handling

Do not assume a specific ECS, renderer, storage format, or job system exists until inspected. Do not delete or rewrite existing world data during migration without an explicit backup/recovery strategy. If a benchmark or integration test cannot run, say so instead of inventing results.

## Trigger examples

- **Positive:** Chunk lifecycle, world generation, persistence, meshing, or scheduling changes need explicit correctness contracts.
- **Positive:** A regression appears only at chunk boundaries, under concurrent requests, or after interrupted writes.
- **Negative:** A task does not involve world data, chunk jobs, or persistence behavior.
- **Negative:** The request asks to optimize without a measurable symptom or acceptance criterion.
