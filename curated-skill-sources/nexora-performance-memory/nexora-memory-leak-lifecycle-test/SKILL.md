---
name: nexora-memory-leak-lifecycle-test
description: "Detects resources that remain retained after worlds, scenes, mods, or devices are unloaded."
---

# nexora memory leak lifecycle test

## Purpose

Use this workflow for NEXORA-scale engine work when resource leaks across load/unload cycles. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define the expected resource baseline after each lifecycle transition.
2. inventory handles, tasks, subscriptions, GPU allocations, and file descriptors.
3. run repeated load/unload cycles.
4. force completion of known asynchronous work.
5. compare retained counts and memory slopes.
6. isolate legitimate caches from leaks.
7. capture ownership diagnostics for survivors.
8. test cancellation and failure paths.
9. add a repeatable regression test.

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

Repeated lifecycle cycles return to a stable bounded baseline with unexplained survivors identified.

Do not require exact zero memory when allocators or caches legitimately retain pages. Document expected warm-cache behavior.

## Trigger examples

- **Positive:** A code change or incident directly involves resource leaks across load/unload cycles and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
