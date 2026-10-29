---
name: nexora-allocation-hotpath-audit
description: "Finds avoidable allocations in frame-critical and tick-critical code paths."
---

# nexora allocation hotpath audit

## Purpose

Use this workflow for NEXORA-scale engine work when hot-path allocations and frame-time spikes. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Select representative hot paths from profiles.
2. record allocation count and bytes per invocation.
3. identify temporary collections and string formatting.
4. reserve capacities where estimates are reliable.
5. reuse buffers only with explicit ownership.
6. avoid hidden global pools that retain unbounded memory.
7. benchmark before and after.
8. test reentrancy and concurrency.
9. document trade-offs and allocation budgets.

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

Changes reduce measured allocation pressure without introducing stale state or excessive retained capacity.

Do not optimize based on guesswork. Avoid shared mutable scratch buffers across concurrent calls.

## Trigger examples

- **Positive:** A code change or incident directly involves hot-path allocations and frame-time spikes and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
