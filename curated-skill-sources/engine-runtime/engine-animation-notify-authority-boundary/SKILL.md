---
name: engine-animation-notify-authority-boundary
description: "Define and validate the invariants, lifecycle behavior, compatibility rules and regression coverage for animation notify authority boundary. Use when animation notify authority boundary must be implemented, audited, debugged or made reliable across supported engine configurations."
---

# Animation Notify Authority Boundary

## Goal

Define and validate the invariants, lifecycle behavior, compatibility rules and regression coverage for animation notify authority boundary.

## When to use

Use when animation notify authority boundary must be implemented, audited, debugged or made reliable across supported engine configurations.

## Inputs to inspect

Inspect implementation, owning subsystem interfaces, configuration and version metadata, relevant logs or traces, target platforms, and existing regression fixtures. Identify the source of truth before proposing a change.

## Workflow

1. Map the subsystem boundary and list the state, resources, dependencies and external contracts that influence **Animation Notify Authority Boundary**.
2. State required invariants, ordering rules, ownership boundaries and failure behavior; distinguish documented guarantees from assumptions.
3. Reproduce the normal path and edge cases, including teardown, cancellation, invalid input and version/platform variation where applicable.
4. Add a focused fixture or automated assertion for **Animation Notify Authority Boundary**; capture the smallest deterministic reproducer for any failure.
5. Measure correctness, performance and recovery behavior; compare with a baseline and document trade-offs before selecting a fix.
6. Re-run targeted regression checks and summarize remaining unknowns rather than treating missing evidence as success.

## Validation checklist

- [ ] Inputs, assumptions, supported versions and platform scope are recorded.
- [ ] Boundary and failure paths are tested, not only the happy path.
- [ ] A regression fixture protects the main invariant.
- [ ] Performance or resource impact is measured when relevant.
- [ ] Compatibility, recovery and rollback implications are documented.

## Required output

An evidence-backed assessment of **Animation Notify Authority Boundary**, the relevant invariants, a prioritized implementation or fix plan, a regression fixture/checklist, and unresolved assumptions.

## Boundaries and failure handling

Do not apply broad refactors or destructive migrations without a baseline and rollback path. Do not claim tests, benchmarks or runtime checks passed unless their outputs were observed. If repository evidence is incomplete, state exactly what is missing and avoid presenting an assumption as verified fact.
